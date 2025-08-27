"use server";

import { BillingPlan, stripePricingTokens } from "@/constants/billing";
import { kv } from "@/lib/redis";
import { stripeInstance } from "@/lib/stripe";
import { GenericObject } from "@/lib/types";

export async function fulfillCheckout(sessionID: string) {
  const lockKey = `lock:checkout:${sessionID}`;
  const fulfillmentKey = `fulfillment:${sessionID}`;

  const mainPipeline = kv.main.pipeline();
  const stripePipeline = kv.stripe.pipeline();

  try {
    const locked = await kv.main.set(lockKey, "locked", {
      nx: true,
      ex: 30,
    });
    if (!locked) return { ok: false };

    const existingFulfillment = await kv.stripe.json.get(fulfillmentKey);
    if (existingFulfillment) return { ok: false };

    const checkoutSession = await stripeInstance.checkout.sessions.retrieve(
      sessionID,
      { expand: ["line_items"] }
    );

    if (checkoutSession.payment_status !== "paid") return { ok: false };

    const { customer, subscription, metadata } = checkoutSession;
    const { email, plan } = metadata as GenericObject<string>;

    const priceID = checkoutSession.line_items?.data[0].price?.id;

    if (!plan || !(plan in stripePricingTokens)) return { ok: false };
    const expectedPriceID = stripePricingTokens[plan as BillingPlan];

    if (priceID !== expectedPriceID) return { ok: false };

    const fulfillmentData = {
      sessionID,
      status: "fulfilled",
      timestamp: new Date().toISOString(),
      priceID,
      customer,
      subscription,
      metadata,
    };

    const userKey = `user-${email}`;
    const customerID = JSON.stringify(customer);
    const subscriptionID = JSON.stringify(subscription);

    stripePipeline.json.set(fulfillmentKey, "$", fulfillmentData);
    mainPipeline.json.set(userKey, "$.plan", JSON.stringify(plan));
    mainPipeline.json.set(userKey, "$.stripe_customer_id", customerID);
    mainPipeline.json.set(userKey, "$.stripe_subscription_id", subscriptionID);

    stripePipeline.del(lockKey);
    await mainPipeline.exec();
    await stripePipeline.exec();

    return { ok: true, plan: plan };
  } catch (error) {
    return { ok: false };
  }
}

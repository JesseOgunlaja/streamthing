"use server";

import { stripePricingTokens } from "@/constants/billing";
import { redis, redis_stripe } from "@/lib/redis";
import { stripeInstance } from "@/lib/stripe";
import { GenericObject } from "@/lib/types";
import { isPropertyInObject } from "@/lib/utils";

export async function fulfillCheckout(sessionID: string) {
  const lockKey = `lock:checkout:${sessionID}`;
  const fulfillmentKey = `fulfillment:${sessionID}`;

  const mainRedisPipeline = redis.pipeline();
  const stripeRedisPipeline = redis_stripe.pipeline();

  try {
    const locked = await redis_stripe.set(lockKey, "locked", {
      nx: true,
      ex: 30,
    });
    if (!locked) return { ok: false };

    const existingFulfillment = await redis_stripe.json.get(fulfillmentKey);
    if (existingFulfillment) return { ok: false };

    const checkoutSession = await stripeInstance.checkout.sessions.retrieve(
      sessionID,
      { expand: ["line_items"] }
    );

    if (checkoutSession.payment_status !== "paid") return { ok: false };

    const { customer, subscription, metadata } = checkoutSession;
    const { email, plan, type } = metadata as GenericObject<string>;

    const priceID = checkoutSession.line_items?.data[0].price?.id;

    if (!isPropertyInObject(stripePricingTokens, plan)) return { ok: false };
    if (!isPropertyInObject(stripePricingTokens[plan], type))
      return { ok: false };

    const expectedPriceID = stripePricingTokens[plan][type];

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

    stripeRedisPipeline.json.set(fulfillmentKey, "$", fulfillmentData);
    mainRedisPipeline.json.set(userKey, "$.plan", JSON.stringify(plan));
    mainRedisPipeline.json.set(userKey, "$.stripe_customer_id", customerID);
    mainRedisPipeline.json.set(
      userKey,
      "$.stripe_subscription_id",
      subscriptionID
    );

    stripeRedisPipeline.del(lockKey);
    await mainRedisPipeline.exec();
    await stripeRedisPipeline.exec();

    return { ok: true, plan: plan };
  } catch (error) {
    return { ok: false };
  }
}

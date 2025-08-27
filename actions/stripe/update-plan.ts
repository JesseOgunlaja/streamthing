"use server";

import { BillingPlan, stripePricingTokens } from "@/constants/billing";
import { serversByRegion } from "@/constants/constants";
import { isSignedIn } from "@/lib/auth";
import { formatTimestamp } from "@/lib/lib";
import { kv } from "@/lib/redis";
import { stripeInstance, StripeTypes } from "@/lib/stripe";
import { cookies } from "next/headers";

async function getSubscription(customerID: string) {
  const subscriptions = await stripeInstance.subscriptions.list({
    customer: customerID,
  });
  const subscription = subscriptions.data[0];

  return subscription as StripeTypes.Subscription & { plan: StripeTypes.Plan };
}

export async function getSubscriptionRenewDate() {
  try {
    const access_token = (await cookies()).get("access_token")?.value || "";
    const { user, signedIn } = await isSignedIn(access_token);
    if (!signedIn) return "Unauthorized";

    if (user.plan === "Hobby") return "No subscription";

    const subscription = await getSubscription(user.stripe_customer_id);
    const renewing = formatTimestamp(subscription.current_period_end);

    return renewing as `${number}/${number}`;
  } catch (err) {
    return "An unexpected error occurred, please try again";
  }
}

export async function updateSubscriptionPlan(newPlan: BillingPlan) {
  try {
    const access_token = (await cookies()).get("access_token")?.value || "";
    const { user, signedIn } = await isSignedIn(access_token);
    if (!signedIn) return "Unauthorized";

    const subscription = await getSubscription(user.stripe_customer_id);
    const newPlanID = stripePricingTokens[newPlan];

    await Promise.all([
      kv.main.json.set(`user-${user.email}`, "$.plan", JSON.stringify(newPlan)),
      stripeInstance.subscriptions.update(subscription.id, {
        cancel_at_period_end: false,
        proration_behavior: "create_prorations",
        items: [
          {
            id: subscription.items.data[0].id,
            plan: newPlanID,
          },
        ],
      }),
    ]);

    const uniqueRegions = new Set(user.servers.map((server) => server.region));
    Array.from(uniqueRegions).forEach((region) => {
      fetch(`${serversByRegion[region]}/reset-user-cache/${user.id}`, {
        method: "POST",
      });
    });

    return "Success";
  } catch {
    return "An unexpected error occurred, please try again";
  }
}

export async function cancelSubscription() {
  try {
    const access_token = (await cookies()).get("access_token")?.value || "";
    const { user, signedIn } = await isSignedIn(access_token);
    if (!signedIn) return "Unauthorized";

    const subscription = await getSubscription(user.stripe_customer_id);
    await stripeInstance.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });

    return "Success";
  } catch {
    return "An unexpected error occurred, please try again";
  }
}

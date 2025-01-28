"use server";

import {
  BillingMethod,
  BillingPlan,
  stripePricingTokens,
} from "@/constants/billing";
import { isSignedIn } from "@/lib/auth";
import { env } from "@/lib/env";
import { stripeInstance } from "@/lib/stripe";
import { cookies } from "next/headers";

export async function createCheckoutSession(
  plan: BillingPlan,
  type: BillingMethod
) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) return "Unauthorized";

  const session = await stripeInstance.checkout.sessions.create({
    ui_mode: "embedded",
    payment_method_types: ["card"],
    metadata: {
      plan,
      type,
      email: user.email,
    },
    subscription_data: {
      metadata: {
        email: user.email,
      },
    },
    line_items: [
      {
        price: stripePricingTokens[plan][type],
        quantity: 1,
      },
    ],
    mode: "subscription",
    allow_promotion_codes: true,
    return_url: `${env.NEXT_PUBLIC_BASE_URL}/purchase-plan/success?code={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret as string;
}

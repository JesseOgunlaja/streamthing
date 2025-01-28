import { fulfillCheckout } from "@/actions/stripe/fulfill-checkout";
import { onSubscriptionCancelled } from "@/actions/stripe/subscription-cancelled";
import { env } from "@/lib/env";
import { StripeTypes, stripeInstance } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: StripeTypes.Event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      const session = event.data.object as StripeTypes.Checkout.Session;
      await fulfillCheckout(session.id);
      break;

    case "customer.subscription.deleted":
      const subscription = event.data.object as StripeTypes.Subscription;
      await onSubscriptionCancelled(subscription);
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

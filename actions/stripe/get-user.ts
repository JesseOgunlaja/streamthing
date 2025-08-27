"use server";

import { monthNames } from "@/constants/constants";
import { formatTimestamp } from "@/lib/lib";
import { stripeInstance, StripeTypes } from "@/lib/stripe";

export async function getStripeUserData(
  customerID: string,
  subscriptionID: string
) {
  try {
    const subscription = await stripeInstance.subscriptions.retrieve(
      subscriptionID,
      {
        expand: ["default_payment_method"],
      }
    );

    const paymentMethods = await stripeInstance.paymentMethods.list({
      customer: customerID,
    });

    const activeMethod =
      subscription.default_payment_method as StripeTypes.PaymentMethod;

    const methods = paymentMethods.data.map((method) => {
      return {
        active: activeMethod.id === method.id,
        type: "card",
        id: method!.id,
        brand: method.card!.brand,
        exp: `${monthNames[method.card!.exp_month - 1]}, ${
          method.card!.exp_year
        }`,
        number: `•••• •••• •••• ${method.card!.last4}`,
      } as const;
    });

    const renewing = formatTimestamp(subscription.current_period_end);

    return {
      methods,
      subscription: {
        renewing,
      },
    };
  } catch {
    return {
      methods: [],
      subscription: {
        renewing: "N/A",
      },
    };
  }
}

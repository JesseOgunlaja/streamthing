"use server";

import { isSignedIn } from "@/lib/auth";
import { encryptString } from "@/lib/encryption";
import { env } from "@/lib/env";
import { stripeInstance } from "@/lib/stripe";
import { cookies } from "next/headers";

export async function getNewPaymentMethodClientSecret() {
  try {
    const access_token = (await cookies()).get("access_token")?.value || "";
    const { user, signedIn } = await isSignedIn(access_token);
    if (!signedIn) return "Unauthorized";

    const { stripe_customer_id: customer } = user;

    const success_message = encodeURIComponent(
      encryptString("Successfully added payment method")
    );
    const session = await stripeInstance.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      customer,
      setup_intent_data: {
        metadata: {
          customer,
        },
      },
      metadata: {
        customer,
      },
      mode: "setup",
      return_url: `${env.NEXT_PUBLIC_BASE_URL}/dashboard?success_message=${success_message}`,
    });

    return session.client_secret as string;
  } catch (err) {
    return String(err);
  }
}

export async function removePaymentMethod(methodID: string) {
  try {
    const access_token = (await cookies()).get("access_token")?.value || "";
    const { signedIn, user } = await isSignedIn(access_token);

    if (!signedIn)
      return {
        ok: false,
        message: "Unauthorized",
      };

    const { default_payment_method: activeMethodID } =
      await stripeInstance.subscriptions.retrieve(user.stripe_subscription_id);

    if (methodID === activeMethodID) {
      return {
        ok: true,
        message: "Your active payment method can't be removed",
      };
    }

    await stripeInstance.paymentMethods.detach(methodID);

    return { ok: true, message: "Successfully removed payment method" };
  } catch (err) {
    return {
      ok: false,
      message: `${err}`,
    };
  }
}

export async function changeActiveMethod(methodID: string) {
  try {
    const access_token = (await cookies()).get("access_token")?.value || "";
    const { signedIn, user } = await isSignedIn(access_token);
    if (!signedIn) return { ok: false, message: "Unauthorized" };

    await stripeInstance.subscriptions.update(user.stripe_subscription_id, {
      default_payment_method: methodID,
      cancel_at_period_end: false,
      proration_behavior: "create_prorations",
    });

    return {
      ok: true,
      message:
        "Successfully updated the payment method for all future invoices",
    };
  } catch (err) {
    return {
      ok: false,
      message: `${err}`,
    };
  }
}

export async function getPaymentMethods() {
  try {
    const access_token = (await cookies()).get("access_token")?.value || "";
    const { signedIn, user } = await isSignedIn(access_token);

    if (!signedIn) {
      return {
        ok: false,
        message: "Unauthorized",
        data: "",
      };
    }

    const paymentMethods = await stripeInstance.paymentMethods.list({
      customer: user.stripe_customer_id,
    });

    return {
      ok: true,
      message: "Success",
      data: paymentMethods.data.map(({ id, type }) => {
        return {
          id,
          type,
        };
      }),
    };
  } catch (err) {
    return {
      ok: false,
      message: `${err}`,
      data: "",
    };
  }
}

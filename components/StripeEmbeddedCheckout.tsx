"use client";

import { createCheckoutSession } from "@/actions/stripe/create-checkout";
import { BillingPlan } from "@/constants/billing";
import { env } from "@/lib/env";
import styles from "@/styles/purchase-plan.module.css";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface PropsType {
  plan: BillingPlan;
}

const StripeEmbeddedCheckout = ({ plan }: PropsType) => {
  const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const options = {
    fetchClientSecret: () => {
      return createCheckoutSession(plan);
    },
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripe} options={options}>
      <EmbeddedCheckout id={styles.checkout} />
    </EmbeddedCheckoutProvider>
  );
};

export default StripeEmbeddedCheckout;

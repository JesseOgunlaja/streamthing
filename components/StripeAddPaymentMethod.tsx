"use client";

import { getNewPaymentMethodClientSecret } from "@/actions/stripe/payment-methods";
import { env } from "@/lib/env";
import styles from "@/styles/purchase-plan.module.css";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const StripeAddPaymentMethod = () => {
  const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const options = {
    fetchClientSecret: () => {
      return getNewPaymentMethodClientSecret();
    },
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripe} options={options}>
      <EmbeddedCheckout id={styles.checkout} />
    </EmbeddedCheckoutProvider>
  );
};

export default StripeAddPaymentMethod;

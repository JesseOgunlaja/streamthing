"use client";

import StripeEmbeddedCheckout from "@/components/StripeEmbeddedCheckout";
import {
  BillingMethod,
  BillingPlan,
  stripePricingTokens,
} from "@/constants/billing";
import styles from "@/styles/purchase-plan.module.css";
import { notFound, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const billingMethod = searchParams.get("planType");
  const plan = searchParams.get("plan");

  if (
    !plan ||
    !billingMethod ||
    !(plan in stripePricingTokens) ||
    (billingMethod !== "monthly" && billingMethod !== "annual")
  ) {
    notFound();
  }

  return (
    <div id={styles["checkout-page"]}>
      <StripeEmbeddedCheckout
        planType={billingMethod as BillingMethod}
        plan={plan as BillingPlan}
      />
    </div>
  );
};

export default Page;

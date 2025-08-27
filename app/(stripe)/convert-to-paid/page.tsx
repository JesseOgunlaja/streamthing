"use client";

import StripeEmbeddedCheckout from "@/components/StripeEmbeddedCheckout";
import { BillingPlan, stripePricingTokens } from "@/constants/billing";
import styles from "@/styles/purchase-plan.module.css";
import { notFound, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan");

  if (!plan || !(plan in stripePricingTokens)) notFound();

  return (
    <div id={styles["checkout-page"]}>
      <StripeEmbeddedCheckout plan={plan as BillingPlan} />
    </div>
  );
};

export default Page;

"use client";

import StripeEmbeddedCheckout from "@/components/StripeEmbeddedCheckout";
import { useUser } from "@/components/UserStateProvider";
import {
  BillingMethod,
  BillingPlan,
  stripePricingTokens,
} from "@/constants/billing";
import styles from "@/styles/purchase-plan.module.css";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ExtendedBillingMethod =
  | BillingMethod
  | "pending-monthly"
  | "pending-annual";

const Page = () => {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [billingMethod, setBillingMethod] =
    useState<ExtendedBillingMethod>("monthly");

  useEffect(() => {
    if (billingMethod.includes("pending")) {
      setBillingMethod(billingMethod.replace("pending-", "") as BillingMethod);
    }
  }, [billingMethod]);

  if (user.plan !== "Pending") return router.push("/dashboard");

  const plan = searchParams.get("plan") as string | undefined;
  if (!plan || !(plan in stripePricingTokens)) return notFound();

  return (
    <div id={styles["checkout-page"]}>
      <div className={styles["payment-types"]}>
        <div>
          <label htmlFor="monthly-payment-type">Monthly</label>
          <input
            defaultChecked
            onClick={() => setBillingMethod("pending-monthly")}
            type="radio"
            name="payment-type"
            id="monthly-payment-type"
          />
        </div>
        <div>
          <label htmlFor="annual-payment-type">Annual</label>
          <input
            onClick={() => setBillingMethod("pending-annual")}
            type="radio"
            name="payment-type"
            id="annual-payment-type"
          />
        </div>
      </div>
      {billingMethod === "monthly" || billingMethod === "annual" ? (
        <StripeEmbeddedCheckout
          planType={billingMethod}
          plan={plan as BillingPlan}
        />
      ) : null}
    </div>
  );
};

export default Page;

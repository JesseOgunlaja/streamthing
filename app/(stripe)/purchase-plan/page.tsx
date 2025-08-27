"use client";

import StripeEmbeddedCheckout from "@/components/StripeEmbeddedCheckout";
import { useUser } from "@/components/UserStateProvider";
import { BillingPlan, stripePricingTokens } from "@/constants/billing";
import styles from "@/styles/purchase-plan.module.css";
import { notFound, useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (user.plan !== "Pending") return router.push("/dashboard");

  const plan = searchParams.get("plan") as string | undefined;
  if (!plan || !(plan in stripePricingTokens)) notFound();

  return (
    <div id={styles["checkout-page"]}>
      <StripeEmbeddedCheckout plan={plan as BillingPlan} />
    </div>
  );
};

export default Page;

"use client";

import { useUser } from "@/components/UserStateProvider";
import styles from "@/styles/protected/settings/page.module.css";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useStripeData } from "./StripeDataProvider";

const SubscriptionDetails = () => {
  const user = useUser();
  const { data: stripeData, isLoading } = useStripeData();

  return (
    <div className={styles["subscription-details-container"]}>
      <div className={styles["top-section"]}>
        <p className={styles["section-title"]}>Subscription details</p>
        <p>Details about the plan you&apos;re currently on</p>
        <hr />
        {isLoading ? (
          <>
            <Skeleton count={3} containerClassName={styles.skeleton} />
          </>
        ) : (
          <div className={styles["subscription-details"]}>
            <p>Plan: {user.plan}</p>
            <p>Plan type: {stripeData.subscription.planType}</p>
            <p>Renewing: {stripeData.subscription.renewing}</p>
          </div>
        )}
      </div>
      <div className={styles["bottom-section"]}>
        <hr />
        <p>
          Update the plan you&apos;re on{" "}
          <Link href="/update-plan">Update plan</Link>
        </p>
      </div>
    </div>
  );
};

export default SubscriptionDetails;

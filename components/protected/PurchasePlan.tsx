import { subscriptionPlansArray } from "@/constants/plans";
import styles from "@/styles/protected/not-chosen-plan.module.css";
import PricingCard from "../PricingCard";
import PurchasePlanLink from "./PurchasePlanLink";

const PurchasePlan = () => {
  return (
    <main id={styles.main}>
      <h1 className={styles.title}>You haven&apos;t chosen a plan yet</h1>
      <div className={styles["pricing-cards"]}>
        {subscriptionPlansArray.map((plan) => (
          <PurchasePlanLink key={plan.title} planTitle={plan.title}>
            <PricingCard styles={styles} {...plan} />
          </PurchasePlanLink>
        ))}
      </div>
    </main>
  );
};

export default PurchasePlan;

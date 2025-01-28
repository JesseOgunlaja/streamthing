import { getSubscriptionRenewDate } from "@/actions/stripe/update-plan";
import PricingCard from "@/components/PricingCard";
import UpdatePlanButton from "@/components/protected/UpdatePlanButton";
import { UpdatePlanContextProvider } from "@/components/protected/UpdatePlanContext";
import { subscriptionPlansArray } from "@/constants/plans";
import styles from "@/styles/protected/update-plan.module.css";

export default async function Page() {
  const renewDate = await getSubscriptionRenewDate();

  return (
    <main id={styles.main}>
      <h1 className={styles.title}>Update your plan</h1>
      <div className={styles["pricing-cards"]}>
        {subscriptionPlansArray.map((plan) => (
          <UpdatePlanContextProvider
            key={plan.title}
            plan={plan.title}
            renewDate={renewDate}
          >
            <UpdatePlanButton>
              <PricingCard styles={styles} {...plan} />
            </UpdatePlanButton>
          </UpdatePlanContextProvider>
        ))}
      </div>
    </main>
  );
}

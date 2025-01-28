import styles from "@/styles/protected/settings/page.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import BillingCardDetails from "./BillingCardDetails";
import SubscriptionDetails from "./SubscriptionDetails";

const BillingSettings = () => {
  return (
    <div className={styles["billing-details"]}>
      <BillingCardDetails />
      <SubscriptionDetails />
    </div>
  );
};

export default BillingSettings;

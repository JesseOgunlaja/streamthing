import { BillingPlan } from "@/constants/billing";
import { KB } from "@/constants/constants";
import { subscriptionPlans } from "@/constants/plans";
import { UsageData, UserType } from "@/lib/types";
import styles from "@/styles/protected/home/servers/server-usage.module.css";
import UsageSlider from "../UsageSlider";

interface PropsType {
  usageData: UsageData;
  user: UserType;
}

const ServerUsage = ({ usageData, user }: PropsType) => {
  const userLimits = subscriptionPlans[user.plan as BillingPlan].limits;

  return (
    <article className={styles.usageBars}>
      <div className={styles.usageBar}>
        <p>Live connections</p>
        <UsageSlider
          usage={usageData.connections < 0 ? 0 : usageData.connections}
          max={userLimits.connections}
        />
      </div>
      <div className={styles.usageBar}>
        <p>Peak connections today</p>
        <UsageSlider
          usage={usageData.peakConnections}
          max={userLimits.connections}
        />
      </div>
      <div className={styles.usageBar}>
        <p>Messages sent today</p>
        <UsageSlider usage={usageData.messages} max={userLimits.messages} />
      </div>
      <div className={styles.usageBar}>
        <p>Largest message today</p>
        <UsageSlider
          usage={Number((usageData.maxMessageSize / KB).toFixed(5))}
          suffix={"KB"}
          max={userLimits.maxMessageSize}
        />
      </div>
    </article>
  );
};

export default ServerUsage;

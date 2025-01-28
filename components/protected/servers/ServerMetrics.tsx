import { MB } from "@/constants/constants";
import { UsageData } from "@/lib/types";
import styles from "@/styles/protected/home/servers/server-usage.module.css";

interface PropsType {
  usageData: UsageData;
}

const ServerMetrics = ({ usageData }: PropsType) => {
  return (
    <article className={styles.metrics}>
      <p className={styles.metric}>
        Total connections made today: {usageData.connectionsToday}
      </p>
      <p className={styles.metric}>
        Total data sent today:{" "}
        {usageData.dataTransfer ? (usageData.dataTransfer / MB).toFixed(5) : 0}{" "}
        MB
      </p>
      <p className={styles.metric}>
        Average messages sent per connection:{" "}
        {Math.floor(usageData.messages / usageData.connectionsToday) || 0}
      </p>
      <p className={styles.metric}>
        Average message size:{" "}
        {usageData.messages
          ? (usageData.dataTransfer / usageData.messages).toFixed(5)
          : 0}{" "}
        KB
      </p>
    </article>
  );
};

export default ServerMetrics;

import styles from "@/styles/utils/usage-slider.module.css";

interface PropsType {
  max: number;
  usage: number;
  suffix?: string;
}

export default function UsageSlider({ max, usage, suffix }: PropsType) {
  const percentage = Math.round((usage / max) * 100);

  return (
    <div className={styles["progress-bar"]}>
      <div className={styles["bar-fill"]}>
        <div
          style={{ width: `${percentage}%` }}
          className={styles["bar-progress"]}
        ></div>
      </div>
      <div className={styles["bar-text"]}>
        <p>
          <span>
            {usage} {suffix}
          </span>{" "}
          of {max} {suffix}
        </p>
        <p>
          <span>{`${percentage}%`}</span> of limit
        </p>
      </div>
    </div>
  );
}

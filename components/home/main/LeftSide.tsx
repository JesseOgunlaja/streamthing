import styles from "@/styles/home/page.module.css";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
const LeftSide = () => {
  return (
    <article className={styles["left-side"]}>
      <div className={styles["descriptions-container"]}>
        <p className={styles.slogan}>
          Pusher alternative for developers by developers
        </p>
        <h1 className={styles["big-description"]}>
          <Balancer>
            Your <span>WebSocket</span> platform for Node JS and beyond
          </Balancer>
        </h1>
        <p className={styles["small-description"]}>
          {/* Streamthing offers lightning-fast and effortlessly configurable
            WebSocket servers tailored to meet your requirements, ensuring swift
            deployment and enhanced real-time features for your application.  */}
          {/* Streamthing provides lightning-fast WebSocket servers that are
            incredibly easy to configure. What makes it different? - its
            simplicity, allowing developers to quickly implement real-time
            functionality in their apps. */}
          Developers deserve better than Pusher. That&apos;s why we created
          Streamthing, an easier and more cost-effective alternative. Whether
          you&apos;re creating a chat app or a real-time dashboard, we&apos;ll
          meet your needs.
        </p>
      </div>
      <div className={styles["get-started"]}>
        <p className={styles["get-started-text"]}>
          See what you can build with Streamthing today.
        </p>
        <div className={styles["buttons"]}>
          <Link href="/signup" className={styles["get-started-button"]}>
            Get your free account now
          </Link>
          <Link
            className={styles.documentation}
            href="https://docs.streamthing.dev"
          >
            <BookOpenText /> Documentation
          </Link>
        </div>
      </div>
    </article>
  );
};

export default LeftSide;

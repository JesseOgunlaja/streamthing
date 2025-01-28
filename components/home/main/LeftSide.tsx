import styles from "@/styles/home/page.module.css";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
const LeftSide = () => {
  return (
    <article className={styles["left-side"]}>
      <div className={styles["descriptions-container"]}>
        <p className={styles.slogan}>
          Pusher alternative for developer by developers
        </p>
        <h1 className={styles["big-description"]}>
          <Balancer>
            Your <span>WebSocket</span> platform for Node JS and beyond
          </Balancer>
        </h1>
        <br />
        <p className={styles["small-description"]}>
          <Balancer>
            Streamthing offers lightning fast and effortlessly configurable
            WebSocket servers tailored to meet your requirements, ensuring swift
            deployment and enhanced realtime features for your application.
          </Balancer>
        </p>
      </div>
      <br />
      <div className={styles["get-started"]}>
        <p className={styles["get-started-text"]}>
          <Balancer>See what you can build with Streamthing today.</Balancer>
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

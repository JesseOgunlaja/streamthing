import TitleLink from "@/components/TitleLink";
import styles from "@/styles/opengraph.module.css";
import Balancer from "react-wrap-balancer";

const Page = () => {
  return (
    <div className={styles.page}>
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
          deployment and seamless performance optimization for your streaming
          needs.
        </Balancer>
      </p>
      <TitleLink />
    </div>
  );
};

export default Page;

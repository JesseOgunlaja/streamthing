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
        {/* <Balancer> */}
        Developers deserve better than Pusher. That&apos;s why we created
        Streamthing, an easier and more cost-effective alternative. Whether
        you&apos;re creating a chat app or a real-time dashboard,
        <br /> we&apos;ll meet your needs.
        {/* </Balancer> */}
      </p>
      <TitleLink />
    </div>
  );
};

export default Page;

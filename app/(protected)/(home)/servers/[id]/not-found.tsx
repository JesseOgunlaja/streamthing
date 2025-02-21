import styles from "@/styles/utils/not-found.module.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <div id={styles.notFound}>
      <main style={{ marginTop: "160px" }}>
        <p>
          I&apos;m sorry but we couldn&apos;t find this server.
          <br /> Please check the URL and try again.
        </p>
        <Link href="/dashboard">Dashboard</Link>
      </main>
    </div>
  );
};

export default NotFound;

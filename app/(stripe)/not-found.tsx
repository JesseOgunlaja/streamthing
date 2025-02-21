import Navbar from "@/components/navbar/Navbar";
import styles from "@/styles/utils/not-found.module.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <div id={styles.notFound}>
      <Navbar />
      <main style={{ marginTop: "50px" }}>
        <p>
          I&apos;m sorry but we couldn&apos;t find this page.
          <br /> Please check the URL and try again.
        </p>
        <Link href="/">Homepage</Link>
      </main>
    </div>
  );
};

export default NotFound;

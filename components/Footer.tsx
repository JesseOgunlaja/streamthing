import styles from "@/styles/utils/footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <p>&copy; 2025 Streamthing. All rights reserved.</p>
        </li>
        <li>
          <Link href="/terms-of-service.html" prefetch={false}>
            Terms
          </Link>
          <hr />
          <Link href="/privacy-policy.html" prefetch={false}>
            Privacy
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

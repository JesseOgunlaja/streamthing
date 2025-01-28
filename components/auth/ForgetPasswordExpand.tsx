import styles from "@/styles/utils/forget-password-expand.module.css";
import Link from "next/link";

const ForgetPasswordExpand = () => {
  return (
    <Link tabIndex={-1} href="/forget-password" id={styles.container}>
      ?
    </Link>
  );
};

export default ForgetPasswordExpand;

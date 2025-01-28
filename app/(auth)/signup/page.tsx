import SignUpForm from "@/components/auth/SignUpForm";
import GitHubButton from "@/components/GitHubButton";
import styles from "@/styles/auth-form.module.css";
import Link from "next/link";

const Page = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>Sign up</h1>
        <GitHubButton type="signup" />
        <hr className={styles.separator} />
        <SignUpForm />
        <p>
          Already have an account? <Link href="/signin">Sign in</Link>
        </p>
      </div>
      <p id={styles.disclaimer}>
        By clicking Sign up, you agree to the{" "}
        <Link href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>
      </p>
    </main>
  );
};

export default Page;

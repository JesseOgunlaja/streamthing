import SignInForm from "@/components/auth/SignInForm";
import GitHubButton from "@/components/GitHubButton";
import styles from "@/styles/auth-form.module.css";
import Link from "next/link";

const Page = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>Sign in</h1>
        <GitHubButton />
        <hr className={styles.separator} />
        <SignInForm />
        <p>
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
      <p id={styles.disclaimer}>
        By clicking Sign in, you agree to the{" "}
        <Link href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>
      </p>
    </main>
  );
};

export default Page;

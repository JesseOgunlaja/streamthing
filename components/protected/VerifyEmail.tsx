"use client";

import { resendVerificationEmail } from "@/actions/auth/send-email";
import { useUser } from "@/components/UserStateProvider";
import { promiseToast } from "@/lib/lib";
import styles from "@/styles/protected/verify-email.module.css";
import { Mail } from "lucide-react";

const VerifyEmail = () => {
  const user = useUser();

  async function resendEmail() {
    const promise = new Promise((resolve, reject) => {
      resendVerificationEmail().then((data) => {
        const { message, ok } = data;

        if (ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise);
  }

  return (
    <main id={styles.main}>
      <div className={styles.container}>
        <Mail />
        <h1>Please verify your email</h1>
        <p>
          You&apos;re almost there! We sent an email to <br />
          <span>{user.email}</span>
        </p>
        <p>
          Just click on the link in the email to complete your signup. <br /> If
          you don&apos;t see it you might need to <span>check your spam</span>{" "}
          folder
        </p>
        <p>Still can&apos;t find it. No problem.</p>
        <button onClick={resendEmail}>Resend Verification Email</button>
      </div>
    </main>
  );
};

export default VerifyEmail;

"use client";

import { sendResetPasswordEmail } from "@/actions/auth/reset-password";
import { promiseToast } from "@/lib/lib";
import { FormSubmit } from "@/lib/types";
import { getFormValues } from "@/lib/utils";
import styles from "@/styles/auth-form.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function formSubmit(e: FormSubmit) {
    e.preventDefault();

    if (pending) return;
    setPending(true);

    const formValues = getFormValues(e);
    const promise = new Promise((resolve, reject) => {
      sendResetPasswordEmail(formValues.email).then((data) => {
        const { message, ok } = data;

        if (ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise, {
      successFunction: () => router.push("/signin"),
      errorFunction: () => setPending(false),
    });
  }

  return (
    <form onSubmit={formSubmit} className={styles.form}>
      <label htmlFor="forget-password-new-password">Account email</label>
      <input
        id="forget-password-new-password"
        name="email"
        placeholder="johndoe@gmail.com"
        type="text"
      />
      <input value="Submit" type="submit" />
    </form>
  );
};

export default ForgetPasswordForm;

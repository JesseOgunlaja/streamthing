"use client";

import { signup } from "@/actions/auth/signup";
import { promiseToast } from "@/lib/lib";
import { FormSubmit } from "@/lib/types";
import { getFormValues } from "@/lib/utils";
import { credentialsSchemas } from "@/lib/zod/utils";
import styles from "@/styles/auth-form.module.css";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

type formValueType = "email" | "password";

const SignUpForm = () => {
  const router = useRouter();
  const emailErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);
  const [pending, setPending] = useState(false);

  const errorRefs = {
    email: emailErrorRef,
    password: passwordErrorRef,
  };

  function formChange(e: ChangeEvent<HTMLFormElement>) {
    checkFormValue(e.target.name as formValueType);
  }

  function checkFormValue(formValueType: formValueType) {
    const errorRef = errorRefs[formValueType].current;
    const formInput = errorRef?.previousSibling as HTMLInputElement;
    const result = credentialsSchemas[formValueType].safeParse(formInput.value);

    errorRef!.textContent = result.error?.issues[0].message || "";
    return result.success;
  }

  async function formSubmit(e: FormSubmit) {
    e.preventDefault();

    if (pending) return;

    const formValues = getFormValues(e);
    if (!checkFormValue("email") || !checkFormValue("password")) return;

    setPending(true);
    const promise = new Promise((resolve, reject) => {
      signup(formValues.email, formValues.password).then((data) => {
        const { message, ok } = data;

        if (ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise, {
      successFunction: () => {
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      },
      errorFunction: () => setPending(false),
    });
  }

  return (
    <form
      onChange={formChange}
      onSubmit={formSubmit}
      autoComplete="off"
      className={styles.form}
    >
      <label htmlFor="signup-email">Email</label>
      <input placeholder="your.name@email.com" type="text" name="email" />
      <p className={styles["error-message"]} ref={emailErrorRef}></p>
      <label htmlFor="signup-password">Password</label>
      <input name="password" placeholder="•••••••••" type="password" />
      <p className={styles["error-message"]} ref={passwordErrorRef}></p>
      <input disabled={pending} value="Sign up" type="submit" />
    </form>
  );
};

export default SignUpForm;

"use client";

import { editEmail } from "@/actions/user/edit-email";
import { useUser } from "@/components/UserStateProvider";
import { promiseToast } from "@/lib/lib";
import { FormSubmit } from "@/lib/types";
import styles from "@/styles/protected/settings/page.module.css";
import { useState } from "react";
import { toast } from "sonner";

const EditEmail = () => {
  const user = useUser();
  const [email, setEmail] = useState(user.email);
  const [pending, setPending] = useState(false);

  function formSubmit(e?: FormSubmit) {
    e?.preventDefault();

    if (pending) return;
    if (email === user.email) return toast.error("This is already your email");

    setPending(true);

    const promise = new Promise((resolve, reject) => {
      editEmail(email).then((res) => {
        const message = res.message as string;
        if (res.ok) {
          resolve(message);
        } else {
          reject(message);
        }
      });
    });

    promiseToast(promise, {
      successFunction: () => setPending(false),
      errorFunction: () => setPending(false),
    });
  }

  return (
    <div className={styles.section}>
      <div className={styles["main-section"]}>
        <p className={styles["section-title"]}>Email</p>
        <p className={styles["section-description"]}>
          Here you can update the email address you sign in with
        </p>
        <form onSubmit={formSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </form>
      </div>
      <hr />
      <div className={styles.footer}>
        <p>Emails must be verified for you to log in with them.</p>
        <button disabled={pending} onClick={() => formSubmit()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditEmail;

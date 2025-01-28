"use client";

import { addPassword } from "@/actions/user/add-password";
import { promiseToast } from "@/lib/lib";
import { FormSubmit } from "@/lib/types";
import styles from "@/styles/protected/settings/page.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [pending, setPending] = useState(false);

  function formSubmit(e?: FormSubmit) {
    e?.preventDefault();

    if (pending) return;

    if (newPassword === "") {
      return toast.error("Password required");
    }

    setPending(true);
    const promise = new Promise((resolve, reject) => {
      addPassword(newPassword).then((res) => {
        const message = res.message as string;
        if (res.ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise, {
      successFunction: () => {
        router.refresh();
        setPending(false);
      },
      errorFunction: () => setPending(false),
    });
  }

  return (
    <div className={styles.section}>
      <div className={styles["main-section"]}>
        <p className={styles["section-title"]}>Password</p>
        <p className={styles["section-description"]}>
          Here you can add a password that you can use to log in
        </p>
        <form onSubmit={formSubmit}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </form>
      </div>
      <hr />
      <div className={styles.footer}>
        <p>Please use 8 characters minimum and 64 characters maximum.</p>
        <button disabled={pending} onClick={() => formSubmit()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPassword;

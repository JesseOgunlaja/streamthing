"use client";

import { editPassword } from "@/actions/user/edit-password";
import { promiseToast } from "@/lib/lib";
import { FormSubmit } from "@/lib/types";
import styles from "@/styles/protected/settings/page.module.css";
import { useState } from "react";
import { toast } from "sonner";

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pending, setPending] = useState(false);

  function formSubmit(e?: FormSubmit) {
    e?.preventDefault();

    if (pending) return;

    if (oldPassword === "" || newPassword === "") {
      return toast.error("Password required");
    }

    setPending(true);
    const promise = new Promise((resolve, reject) => {
      editPassword(oldPassword, newPassword).then((res) => {
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
        <p className={styles["section-title"]}>Password</p>
        <p className={styles["section-description"]}>
          Here you can update the password you log in with
        </p>
        <form onSubmit={formSubmit}>
          <label>Old password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label>New password</label>
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

export default EditPassword;

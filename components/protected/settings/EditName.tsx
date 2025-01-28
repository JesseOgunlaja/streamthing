"use client";

import { editName } from "@/actions/user/edit-name";
import { useUser } from "@/components/UserStateProvider";
import { promiseToast } from "@/lib/lib";
import { FormSubmit } from "@/lib/types";
import styles from "@/styles/protected/settings/page.module.css";
import { useState } from "react";

const EditName = () => {
  const user = useUser();
  const [name, setName] = useState(user.name);
  const [pending, setPending] = useState(false);

  function formSubmit(e?: FormSubmit) {
    e?.preventDefault();

    if (pending) return;
    // if (name === user.name) return toast.error("This is already your name");

    setPending(true);

    const promise = new Promise((resolve, reject) => {
      editName(name).then((res) => {
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
        <p className={styles["section-title"]}>Display name</p>
        <p className={styles["section-description"]}>
          Here you can update your display name
        </p>
        <form onSubmit={formSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </form>
      </div>
      <hr />
      <div className={styles.footer}>
        <p>Please use no more than 32 characters </p>
        <button disabled={pending} onClick={() => formSubmit()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditName;

"use client";

import styles from "@/styles/protected/settings/page.module.css";
import { useState } from "react";
import DeleteAccountDialog from "./DeleteAccountDialog";

const DeleteAccount = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div id={styles["delete-account"]} className={styles.section}>
      <div className={styles["main-section"]}>
        <p className={styles["section-title"]}>Delete Account</p>
        <p className={styles["section-description"]}>
          Permanently delete your account and all data associated with it.
          <br /> This action cannot be undone, so please continue with caution.
        </p>
        <button onClick={() => setDialogOpen(true)}>Delete Account</button>
      </div>
      <DeleteAccountDialog
        close={() => setDialogOpen(false)}
        open={dialogOpen}
      />
    </div>
  );
};

export default DeleteAccount;

"use client";

import { resetServerPassword } from "@/actions/servers/reset-password";
import { closeDialog, promiseToast } from "@/lib/lib";
import { GenericFunction, Server } from "@/lib/types";
import styles from "@/styles/protected/home/servers/server-settings.module.css";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface PropsType {
  server: Server;
  isOpen?: boolean;
  onClose?: GenericFunction;
}

const ResetServerPasswordDialog = ({
  server,
  isOpen = false,
  onClose,
}: PropsType) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  function closeFn() {
    closeDialog(dialogRef.current);
    if (onClose) onClose();
  }

  function resetPassword() {
    const promise = new Promise((resolve, reject) => {
      resetServerPassword(server.id).then((res) => {
        const message = res.message;
        if (res.ok) {
          resolve(message);
        } else {
          reject(message);
        }
      });
    });

    promiseToast(promise, {
      successFunction: () => {
        closeFn();
        router.refresh();
      },
    });
  }

  return (
    <dialog
      open={isOpen}
      ref={dialogRef}
      className={styles.dialog}
      onClick={(e) => e.preventDefault()}
      id="reset-server-password-dialog"
    >
      <div className={styles.container}>
        <p>Reset server password</p>
        <p>
          Are you sure you want to reset the server password?
          <br />
          This cannot be undone.
        </p>
        <div className={styles.buttons}>
          <button onClick={closeFn}>Cancel</button>
          <button onClick={resetPassword}>Reset</button>
        </div>
      </div>
    </dialog>
  );
};

export default ResetServerPasswordDialog;

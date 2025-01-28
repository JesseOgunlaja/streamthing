"use client";

import { deleteServer } from "@/actions/servers/delete";
import { closeDialog, promiseToast } from "@/lib/lib";
import { GenericFunction, Server } from "@/lib/types";
import styles from "@/styles/protected/home/servers/server-settings.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";

interface PropsType {
  server: Server;
  isOpen?: boolean;
  onClose?: GenericFunction;
}

const DeleteServerDialog = ({ server, isOpen = false, onClose }: PropsType) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  function closeFn() {
    closeDialog(dialogRef.current);
    if (onClose) onClose();
  }

  function deleteServerFn() {
    const promise = new Promise((resolve, reject) => {
      deleteServer(server.id).then((res) => {
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
        if (pathname === "/servers") router.refresh();
        else router.push("/servers");
      },
    });
  }

  return (
    <dialog
      open={isOpen}
      ref={dialogRef}
      className={styles.dialog}
      onClick={(e) => e.preventDefault()}
      id="delete-server-dialog"
    >
      <div className={styles.container}>
        <p>Delete &quot;{server.name}&quot;</p>
        <p>
          <span>Are you sure you want to delete this app?</span>
          <br />
          <span>This cannot be undone.</span>
        </p>
        <div className={styles.buttons}>
          <button onClick={closeFn}>Cancel</button>
          <button onClick={deleteServerFn}>Delete</button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteServerDialog;

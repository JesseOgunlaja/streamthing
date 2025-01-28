"use client";

import { editServerName } from "@/actions/servers/edit-name";
import { closeDialog, promiseToast } from "@/lib/lib";
import { FormSubmit, GenericFunction, Server } from "@/lib/types";
import styles from "@/styles/protected/home/servers/server-settings.module.css";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface PropsType {
  server: Server;
  isOpen?: boolean;
  onClose?: GenericFunction;
}

const RenameServerDialog = ({ server, isOpen = false, onClose }: PropsType) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [newName, setNewName] = useState(server.name);
  const router = useRouter();

  function closeFn() {
    closeDialog(dialogRef.current);
    if (onClose) onClose();
  }

  function renameServer(e?: FormSubmit) {
    if (e) e.preventDefault();

    const promise = new Promise((resolve, reject) => {
      editServerName(server.id, newName).then((res) => {
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
      id="edit-server-name-dialog"
      className={styles.dialog}
      ref={dialogRef}
      onClick={(e) => e.preventDefault()}
    >
      <form onSubmit={renameServer}>
        <label htmlFor="edit-server-name">New name</label>
        <input
          autoComplete="off"
          id="edit-server-name"
          value={newName}
          autoFocus
          onChange={(e) => setNewName(e.target.value)}
          type="text"
        />
        <div className={styles.buttons}>
          <button type="reset" onClick={closeFn}>
            <X />
          </button>
          <button type="button" onClick={() => renameServer()}>
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default RenameServerDialog;

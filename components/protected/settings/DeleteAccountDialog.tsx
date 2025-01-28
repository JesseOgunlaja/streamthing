import { deleteAccount } from "@/actions/user/delete-account";
import { promiseToast } from "@/lib/lib";
import { GenericFunction } from "@/lib/types";
import styles from "@/styles/protected/settings/delete-account-dialog.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PropsType {
  close: GenericFunction;
  open: boolean;
}

const DeleteAccountDialog = ({ close, open }: PropsType) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");

  function confirmDeleteAccount() {
    setPending(true);

    const promise = new Promise((resolve, reject) => {
      deleteAccount().then((res) => {
        const { message, ok } = res;
        if (ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise, {
      successFunction: () => {
        router.refresh();
        close();
      },
      errorFunction: () => setPending(false),
    });
  }

  return (
    <dialog className={styles.dialog} open={open}>
      <div className={styles.container}>
        <p>Delete Account</p>
        <p>
          When you delete your account, all your servers and data will be
          permanently erased.
        </p>
        <p>
          This action cannot be undone, and you will lose access to all your
          servers permanently
        </p>
        <hr />
        <label htmlFor="delete-account-input">
          To verify, type <span>delete my account</span> below:
        </label>
        <input
          id="delete-account-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <hr />
        <footer>
          <button onClick={close}>Cancel</button>
          <button
            onClick={confirmDeleteAccount}
            disabled={pending || input !== "delete my account"}
          >
            Delete Account
          </button>
        </footer>
      </div>
    </dialog>
  );
};

export default DeleteAccountDialog;

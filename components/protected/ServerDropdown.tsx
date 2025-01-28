import { openDialog } from "@/lib/lib";
import styles from "@/styles/protected/home/layout/layout.module.css";
import { Ellipsis, RefreshCw, SquarePen, Trash2 } from "lucide-react";

const ServerDropdown = () => {
  return (
    <div className={styles.dropdown}>
      <Ellipsis tabIndex={0} />
      <div className={styles.popup}>
        <button onClick={() => openDialog("edit-server-name-dialog")}>
          <SquarePen /> Rename server
        </button>
        <button onClick={() => openDialog("reset-server-password-dialog")}>
          <RefreshCw /> Reset password
        </button>
        <button onClick={() => openDialog("delete-server-dialog")}>
          <Trash2 /> Delete server
        </button>
      </div>
    </div>
  );
};

export default ServerDropdown;

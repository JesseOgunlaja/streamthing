import { getUserFromHeaders } from "@/lib/server-utils";
import styles from "@/styles/protected/settings/page.module.css";
import AddPassword from "./AddPassword";
import EditPassword from "./EditPassword";
import LinkedAccounts from "./LinkedAccounts";

const AuthSettings = async () => {
  const user = await getUserFromHeaders();
  return (
    <div className={styles.sections}>
      {user.password ? <EditPassword /> : <AddPassword />}
      <LinkedAccounts />
    </div>
  );
};

export default AuthSettings;

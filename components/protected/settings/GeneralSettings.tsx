import styles from "@/styles/protected/settings/page.module.css";
import DeleteAccount from "./DeleteAccount";
import EditEmail from "./EditEmail";
import EditName from "./EditName";
import EditProfilePicture from "./EditProfilePicture";

const GeneralSettings = () => {
  return (
    <div className={styles.sections}>
      <EditProfilePicture />
      <EditName />
      <EditEmail />
      <DeleteAccount />
    </div>
  );
};

export default GeneralSettings;

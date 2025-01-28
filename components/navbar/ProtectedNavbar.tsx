import styles from "@/styles/protected/navbar.module.css";
import TitleLink from "../TitleLink";
import ProtectedNavbarDropdown from "./ProtectedNavbarDropdown";

const ProtectedNavbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li id={styles.title}>
          <TitleLink link="/dashboard" />
        </li>
        <ProtectedNavbarDropdown />
      </ul>
    </nav>
  );
};

export default ProtectedNavbar;

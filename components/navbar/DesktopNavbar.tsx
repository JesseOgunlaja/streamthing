import { UserType } from "@/lib/types";
import styles from "@/styles/navbar/desktop-navbar.module.css";
import Link from "next/link";
import TitleLink from "../TitleLink";
import ToggleTheme from "../ToggleTheme";
import ProtectedNavbarDropdown from "./ProtectedNavbarDropdown";

interface PropsType {
  signedIn: boolean;
  user: UserType | undefined;
}

const DesktopNavbar = async ({ signedIn, user }: PropsType) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li id={styles.title}>
          <TitleLink link="/home" />
        </li>
        {signedIn ? (
          <ProtectedNavbarDropdown user={user} />
        ) : (
          <>
            <li id={styles["toggle-theme"]}>
              <ToggleTheme />
            </li>
            <li id={styles.separator}>
              <hr />
            </li>

            <li id={styles["sign-in"]}>
              <Link href="/signin">Sign in</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default DesktopNavbar;

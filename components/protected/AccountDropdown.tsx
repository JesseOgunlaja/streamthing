import styles from "@/styles/protected/dropdown.module.css";
import { BookOpenText, Home, LayoutGrid, Settings } from "lucide-react";
import Link from "next/link";
import ToggleTheme from "../ToggleTheme";
import LogoutButton from "./LogoutButton";

const AccountDropdown = () => {
  return (
    <div className={styles.dropdown}>
      <ul>
        <li>
          <Link href="/dashboard">
            Dashboard <LayoutGrid />{" "}
          </Link>
        </li>
        <li>
          <Link href="/settings">
            Settings <Settings />
          </Link>
        </li>
        <li className={styles.separator}></li>
        <li>
          <button>
            Theme <ToggleTheme />
          </button>
        </li>
        <li className={styles.separator}></li>
        <li>
          <Link target="_blank" href="/home">
            Home Page <Home />
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://docs.streamthing.dev">
            Documentation <BookOpenText />
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
        <li className={styles.separator}></li>
        <li id={styles["update-button"]}>
          <Link href="/update-plan">Update plan</Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountDropdown;

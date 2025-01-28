"use client";

import { UserType } from "@/lib/types";
import styles from "@/styles/navbar/mobile-navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import TitleLink from "../TitleLink";
import ToggleTheme from "../ToggleTheme";
import HamburgerMenu from "./HamburgerMenu";
import ProtectedNavbarDropdown from "./ProtectedNavbarDropdown";

interface PropsType {
  signedIn: boolean;
  user: UserType | undefined;
}

const MobileNavbar = ({ signedIn, user }: PropsType) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbarVisibility = () => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.style.overflowY = !isNavbarVisible ? "hidden" : "auto";
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles["top-bar"]}>
        <li id={styles.title}>
          <TitleLink />
        </li>
        {signedIn ? (
          <ProtectedNavbarDropdown user={user} />
        ) : (
          <li id={styles["hamburger-menu"]}>
            <HamburgerMenu
              stateValue={isNavbarVisible}
              onClick={toggleNavbarVisibility}
            />
          </li>
        )}
      </ul>
      <ul
        className={`${styles["navbar-items"]} ${
          isNavbarVisible ? styles.visible : ""
        }`}
      >
        <li id={styles["sign-up"]}>
          <Link href="/signup">Sign up</Link>
        </li>
        <li id={styles["sign-in"]}>
          <Link href="/signin">Sign in</Link>
        </li>
        <li>
          <button>
            <span>Appearance</span>
            <ToggleTheme />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;

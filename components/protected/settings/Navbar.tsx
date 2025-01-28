"use client";

import styles from "@/styles/protected/settings/navbar.module.css";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface PropsType {
  tab: string;
}

const SettingsNavbar = ({ tab }: PropsType) => {
  const navbarRef = useRef<HTMLElement>(null);
  function determineActiveClass(page: string) {
    return tab === page ? styles.active : "";
  }

  useEffect(() => {
    const navbar = navbarRef.current!;

    function setClassName() {
      const mediaQuery = window.matchMedia("(max-width: 1199px)");
      if (mediaQuery.matches) {
        navbar.classList.add(styles["initial-state"]);
        setTimeout(() => {
          navbar.classList.remove(styles["initial-state"]);
        }, 250);
      }
    }

    setClassName();
    window.addEventListener("resize", setClassName);

    return () => {
      window.removeEventListener("resize", setClassName);
    };
  }, []);

  return (
    <nav ref={navbarRef} className={styles["initial-state"]} id={styles.nav}>
      <ul>
        <li tabIndex={0} className={determineActiveClass("general")}>
          <Link tabIndex={0} href="/settings?tab=general">
            General
          </Link>
        </li>
        <li tabIndex={0} className={determineActiveClass("authentication")}>
          <Link tabIndex={0} href="/settings?tab=authentication">
            Authentication
          </Link>
        </li>
        <li tabIndex={0} className={determineActiveClass("billing")}>
          <Link tabIndex={0} href="/settings?tab=billing">
            Billing
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SettingsNavbar;

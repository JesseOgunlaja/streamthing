"use client";

import styles from "@/styles/protected/home/layout/layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  function determineActiveClass(path: string) {
    return pathname === path ? styles.active : "";
  }

  return (
    <nav id={styles.nav}>
      <ul>
        <li className={determineActiveClass("/dashboard")}>
          <Link href="/dashboard">Overview</Link>
        </li>
        <li className={determineActiveClass("/servers")}>
          <Link href="/servers">Servers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

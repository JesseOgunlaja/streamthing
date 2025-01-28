"use client";

import styles from "@/styles/navbar/hamburger-menu.module.css";
import { useEffect, useRef } from "react";

interface PropsType {
  onClick: () => void;
  stateValue: boolean;
}

const HamburgerMenu = ({ onClick, stateValue }: PropsType) => {
  const checkbox = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (checkbox.current) {
      checkbox.current.checked = stateValue;
    }
  }, [stateValue]);
  return (
    <>
      <input
        ref={checkbox}
        onChange={onClick}
        type="checkbox"
        id="toggle-navbar-visibility-checkbox"
        className={styles["checkbox"]}
      />
      <label htmlFor="toggle-navbar-visibility-checkbox">
        <div className={styles["hamburger"]}>
          <span className={styles["bar-1"]}></span>
          <span className={styles["bar-2"]}></span>
          <span className={styles["bar-3"]}></span>
          <span className={styles["bar-4"]}></span>
        </div>
      </label>
    </>
  );
};

export default HamburgerMenu;

"use client";

import { UserType } from "@/lib/types";
import styles from "@/styles/protected/dropdown.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../UserStateProvider";
import AccountDropdown from "../protected/AccountDropdown";

interface PropsType {
  user?: UserType;
}

const ProtectedNavbarDropdown = ({ user: userProp }: PropsType) => {
  const userState = useUser();
  const user = userProp || userState;
  const dropdownElement = useRef<HTMLLIElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const { current: dropdown } = dropdownElement;

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (isFocused && !dropdown?.contains(target)) setIsFocused(false);
    }

    document.addEventListener("mousedown", onClick);

    if (isFocused) dropdown?.classList.add(styles.focus);
    else dropdown?.classList.remove(styles.focus);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, [isFocused]);

  return (
    <li
      ref={dropdownElement}
      className={styles["dropdown-container"]}
      onClick={() => setIsFocused((current) => !current)}
    >
      <Image
        alt="Your profile picture"
        src={user.profilePicture}
        height={45}
        width={45}
        priority
        loading="eager"
      />
      <AccountDropdown />
    </li>
  );
};

export default ProtectedNavbarDropdown;

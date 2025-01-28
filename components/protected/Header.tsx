"use client";

import { closeDialog, openDialog } from "@/lib/lib";
import { UserType } from "@/lib/types";
import { hasExceededServerLimit } from "@/lib/utils";
import styles from "@/styles/protected/home/layout/layout.module.css";
import { HardDrive, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useUser } from "../UserStateProvider";
import CreateServerForm from "./CreateServerForm";
import ServerDropdown from "./ServerDropdown";

function getPageTitle(pathname: string, user: UserType) {
  if (pathname === "/dashboard") {
    return {
      title: "Dashboard",
      element: "Create server",
    } as const;
  } else if (pathname === "/servers") {
    return {
      title: "Servers",
      element: "Create server",
    } as const;
  } else if (/^\/servers\/\d+$/.test(pathname)) {
    const id = pathname.split("/")[2];
    return {
      title: user.servers.find((server) => server.id === id)?.name,
      element: "Dropdown",
    } as const;
  } else if (pathname === "/settings") {
    return {
      title: "Account settings",
      element: "None",
    } as const;
  }

  return {
    title: "Dashboard",
    element: "Create server",
  } as const;
}

const Header = () => {
  const user = useUser();
  const isOverServerLimit = hasExceededServerLimit(user);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { title, element } = getPageTitle(pathname, user);

  return (
    <>
      <header id={styles.header}>
        <h1>
          {title === "Dashboard" ? <LayoutGrid /> : <HardDrive />}
          {title}
        </h1>
        {element === "Dropdown" && <ServerDropdown />}
        {element === "Create server" && !isOverServerLimit && (
          <button onClick={() => openDialog(dialogRef.current)}>
            Create server
          </button>
        )}
      </header>
      <dialog ref={dialogRef}>
        <CreateServerForm closeDialog={() => closeDialog(dialogRef.current)} />
      </dialog>
    </>
  );
};

export default Header;

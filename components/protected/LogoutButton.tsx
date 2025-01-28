"use client";

import { logout } from "@/actions/auth/logout";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  async function buttonClick() {
    await logout();
    router.replace("/signin");
  }

  return (
    <button onClick={buttonClick}>
      Logout <LogOut />
    </button>
  );
};

export default LogoutButton;

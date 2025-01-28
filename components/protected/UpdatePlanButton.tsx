"use client";

import { Children } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "../UserStateProvider";
import { usePlanData } from "./UpdatePlanContext";
import UpdatePlanDialog from "./UpdatePlanDialog";

interface PropsType {
  children: Children;
}

const UpdatePlanButton = ({ children }: PropsType) => {
  const user = useUser();
  const { plan } = usePlanData();
  const [open, setOpen] = useState(false);

  function onClick() {
    if (user.plan === plan) return toast.error("Already on this plan");
    setOpen(true);
  }

  return (
    <>
      <button onClick={onClick}>{children}</button>
      {open && <UpdatePlanDialog open close={() => setOpen(false)} />}
    </>
  );
};

export default UpdatePlanButton;

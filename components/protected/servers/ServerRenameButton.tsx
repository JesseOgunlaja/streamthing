"use client";

import { Server } from "@/lib/types";
import { SquarePen } from "lucide-react";
import { MouseEvent, useState } from "react";
import RenameServerDialog from "./RenameServerDialog";

interface PropsType {
  server: Server;
}

const ServerRenameButton = ({ server }: PropsType) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  function onClick(e: MouseEvent) {
    e.preventDefault();
    setDialogVisible(true);
  }

  return (
    <>
      <button onClick={onClick}>
        <SquarePen /> Rename server
      </button>
      {dialogVisible && (
        <RenameServerDialog
          onClose={() => setDialogVisible(false)}
          isOpen
          server={server}
        />
      )}
    </>
  );
};

export default ServerRenameButton;

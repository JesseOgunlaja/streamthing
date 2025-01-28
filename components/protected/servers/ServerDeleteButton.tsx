"use client";

import { Server } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { MouseEvent, useState } from "react";
import DeleteServerDialog from "./DeleteServerDialog";

interface PropsType {
  server: Server;
}

const ServerDeleteButton = ({ server }: PropsType) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  function onClick(e: MouseEvent) {
    e.preventDefault();
    setDialogVisible(true);
  }

  return (
    <>
      <button onClick={onClick}>
        <Trash2 /> Delete server
      </button>
      {dialogVisible && (
        <DeleteServerDialog
          onClose={() => setDialogVisible(false)}
          isOpen
          server={server}
        />
      )}
    </>
  );
};

export default ServerDeleteButton;

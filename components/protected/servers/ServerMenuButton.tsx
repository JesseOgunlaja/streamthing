"use client";

import { EllipsisVertical } from "lucide-react";

const ServerMenuButton = () => {
  return <EllipsisVertical onClick={(e) => e.preventDefault()} tabIndex={0} />;
};

export default ServerMenuButton;

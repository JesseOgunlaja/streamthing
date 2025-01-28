"use client";

import styles from "@/styles/protected/home/servers/server.module.css";
import { Copy } from "lucide-react";
import { MouseEvent } from "react";

interface PropsType {
  name: string;
  value: string;
  copyValue?: string;
  hidden?: boolean;
}

const ServerCredential = ({ name, value, hidden, copyValue }: PropsType) => {
  function copyToClipboard(e: MouseEvent) {
    try {
      navigator.clipboard.writeText(copyValue || value);
      const svg = e.target as SVGElement;
      const span = svg.nextSibling as HTMLSpanElement;
      span.textContent = "Copied";
      span.style.setProperty("--right-offset", "-28.25px");
      svg.addEventListener("mouseleave", () => {
        setTimeout(() => {
          span.style.setProperty("--right-offset", "-22px");
          span.textContent = "Copy";
        }, 200);
      });
    } catch {}
  }

  return (
    <div className={styles.credential}>
      <p>{name}</p>
      <p>
        {hidden ? "•••••••••" : value}
        <Copy onClick={copyToClipboard} />
        <span>Copy</span>
      </p>
    </div>
  );
};

export default ServerCredential;

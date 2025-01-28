"use client";

import { getCookie } from "@/lib/cookies";
import { isValidTheme } from "@/lib/theme";
import { Theme } from "@/lib/types";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

interface PropsType {
  initialTheme: Theme;
}

const ToastProvider = ({ initialTheme }: PropsType) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTheme = getCookie("theme");
      if (isValidTheme(newTheme)) setTheme(newTheme);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Toaster
      richColors
      duration={3000}
      position="top-right"
      style={{ zIndex: 10000 }}
      closeButton
      theme={theme}
    />
  );
};

export default ToastProvider;

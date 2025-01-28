"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../StateProvider";

interface PropsType {
  lightHtml: string;
  darkHtml: string;
}

const CodeBlockContent = ({ lightHtml, darkHtml }: PropsType) => {
  const { theme } = useTheme();
  const [html, setHtml] = useState(theme === "dark" ? darkHtml : lightHtml);

  useEffect(() => {
    setHtml(theme === "dark" ? darkHtml : lightHtml);
  }, [theme]);

  return (
    <div data-theme={theme} dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

export default CodeBlockContent;

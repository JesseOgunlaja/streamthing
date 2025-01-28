"use client";

import { Children } from "@/lib/types";
import { createContext, useContext, useState } from "react";

interface PropsType {
  children: Children;
  nonce: string;
  theme: string;
}

interface ContextType {
  theme: string;
  toggleTheme: () => void;
}

const NonceContext = createContext("");
const ThemeContext = createContext<ContextType>({
  theme: "",
  toggleTheme: () => "",
});

export const useNonce = () => useContext(NonceContext);
export const useTheme = () => useContext(ThemeContext);

const StateProvider = ({
  children,
  nonce,
  theme: startingTheme,
}: PropsType) => {
  const [theme, setTheme] = useState(startingTheme);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
    </ThemeContext.Provider>
  );
};

export default StateProvider;

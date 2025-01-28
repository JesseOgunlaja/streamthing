import { setCookie } from "./cookies";
import { Theme } from "./types";

export function isValidTheme(theme: unknown): theme is "dark" | "light" {
  return theme === "dark" || theme === "light";
}

export function getCurrentBrowserTheme() {
  return document.body.classList.contains("dark-theme") ? "dark" : "light";
}

export function setCookieTheme(theme: string) {
  setCookie("theme", theme, 365);
}

export function setBrowserTheme(theme: Theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  }
}

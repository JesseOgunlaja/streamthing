import { setCookie } from "./cookies";
import { Theme } from "./types";

export function isValidTheme(theme: unknown): theme is "dark" | "light" {
	return theme === "dark" || theme === "light";
}

export function getCurrentBrowserTheme() {
	const { classList } = document.body;
	if (classList.contains("dark-theme")) return "dark";
	else if (classList.contains("light-theme")) return "light";
	else return null;
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

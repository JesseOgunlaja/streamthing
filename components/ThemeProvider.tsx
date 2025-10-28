"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "@/lib/cookies";
import {
	getCurrentBrowserTheme,
	setBrowserTheme,
	setCookieTheme,
} from "@/lib/theme";
import { Children, NonNullableProperties, ThemeType } from "@/lib/types";

interface PropsType {
	children: Children;
}

interface ContextType {
	theme: ThemeType | null;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ContextType>({
	theme: null,
	toggleTheme: () => "",
});

export const useTheme = () => {
	return useContext(ThemeContext) as NonNullableProperties<ContextType>;
};

const ThemeProvider = ({ children }: PropsType) => {
	const [theme, setTheme] = useState<ThemeType | null>(null);

	useEffect(() => {
		const themeCookie = getCookie("theme");
		if (themeCookie === "dark" || themeCookie === "light") {
			setTheme(themeCookie);
		} else {
			setTheme("light");
		}
	}, []);

	useEffect(() => {
		function updateTheme() {
			if (!theme) return;

			setCookieTheme(theme);
			setBrowserTheme(theme);
		}

		if (!getCurrentBrowserTheme()) updateTheme();
		else document.startViewTransition(updateTheme).ready;
	}, [theme]);

	function toggleTheme() {
		setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
	}

	if (!theme) return null;

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;

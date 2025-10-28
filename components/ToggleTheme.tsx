"use client";

import { getCurrentBrowserTheme } from "@/lib/theme";
import styles from "@/styles/navbar/toggle-theme.module.css";
import "@/styles/utils/toggle-theme.css";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const ToggleTheme = () => {
	const { theme, toggleTheme } = useTheme();
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(theme === "dark");

	async function changeTheme() {
		setIsDarkTheme(getCurrentBrowserTheme() === "dark");
		toggleTheme();
	}

	return (
		<div id="toggle-theme-container" className={styles.container}>
			<input
				aria-label="Toggle theme"
				onChange={changeTheme}
				checked={isDarkTheme}
				type="checkbox"
				className={styles.checkbox}
			/>
			<label
				aria-label="Toggle theme"
				onClick={changeTheme}
				className={styles["checkbox-label"]}
			>
				<span className={styles.ball}>
					<Sun id={styles.sun} />
					<Moon id={styles.moon} />
				</span>
			</label>
		</div>
	);
};

export default ToggleTheme;

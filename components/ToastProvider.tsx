"use client";

import { Toaster } from "sonner";
import { useTheme } from "./ThemeProvider";

const ToastProvider = () => {
	const { theme } = useTheme();

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

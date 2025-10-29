import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import Favicon from "@/components/Favicon";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";
import { env } from "@/lib/env";
import { LayoutPropsType } from "@/lib/types";
import "./globals.css";
import { Provider as BalancerProvider } from "react-wrap-balancer";

const poppins = Poppins({
	weight: ["400", "500", "600", "700", "800", "900"],
	subsets: ["latin-ext"],
});

export const metadata: Metadata = {
	title: {
		default: "Streamthing",
		template: "Streamthing | %s",
	},
	metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
	description: "Your WebSocket platform for Node JS",
	keywords: [
		"Streamthing",
		"WebSocket",
		"Node JS",
		"Jesse Ogunlaja",
		"WebSockets",
		"WebSocket Server",
	],
	authors: [
		{
			name: "Jesse Ogunlaja",
		},
	],
	openGraph: {
		title: "Streamthing",
		description:
			"A WebSocket platform for Node JS. Built with a focus on scalability and performance, our servers incorporate cutting edge technologies to provide lightning fast speeds and seamless deployment.",
		images: ["https://streamthing.dev/opengraph.png"],
		locale: "en_GB",
	},
	creator: "Jesse Ogunlaja",
};

export default function RootLayout({ children }: LayoutPropsType) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<Favicon />
				<Analytics />
				<AuthProvider />
				<SpeedInsights />
				<ThemeProvider>
					<ToastProvider />
					<BalancerProvider>{children}</BalancerProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

import AuthProvider from "@/components/AuthProvider";
import Favicon from "@/components/Favicon";
import StateProvider from "@/components/StateProvider";
import ToastProvider from "@/components/ToastProvider";
import { env } from "@/lib/env";
import { LayoutPropsType } from "@/lib/types";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies, headers } from "next/headers";
import { Provider as BalancerProvider } from "react-wrap-balancer";
import "./globals.css";

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
    images: ["/opengraph.png"],
    locale: "en_GB",
  },
  creator: "Jesse Ogunlaja",
};

export default async function RootLayout({ children }: LayoutPropsType) {
  const cookiesInstance = await cookies();
  const headersInstance = await headers();
  const themeCookie = cookiesInstance.get("theme")?.value || "";
  const nonce = headersInstance.get("x-nonce") as string;

  const theme = themeCookie === "dark" ? themeCookie : "light";

  return (
    <html lang="en">
      <body className={`${poppins.className} ${theme}-theme`}>
        <Analytics />
        <SpeedInsights />
        <BalancerProvider>
          <StateProvider nonce={nonce} theme={themeCookie}>
            <ToastProvider initialTheme={theme} />
            <AuthProvider />
            <Favicon />
            {children}
          </StateProvider>
        </BalancerProvider>
      </body>
    </html>
  );
}

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { GenericObject } from "../lib/types";

export const regions = {
  eus: "Frankfurt, Germany",
} as GenericObject<string>;

export const serversByRegion = {
  eus: "https://eus.streamthing.dev",
} as GenericObject<string>;

export const KB = 1024;
export const MB = 1024 * 1024;

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const cardCompanies = [
  "Alipay",
  "Amex",
  "Code",
  "CodeFront",
  "Diners",
  "Discover",
  "Elo",
  "Generic",
  "Hiper",
  "Hipercard",
  "Jcb",
  "Maestro",
  "Mastercard",
  "Mir",
  "Unionpay",
  "Visa",
];

export const access_token_config = {
  sameSite: "lax",
  httpOnly: true,
  secure: true,
  maxAge: 60,
} satisfies Partial<ResponseCookie>;

export const redirectPages = ["/", "/signin", "/signup"];
export const protectedPages = [
  "/dashboard",
  "/servers",
  "/servers/[id]",
  "/purchase-plan",
  "/purchase-plan/success",
  "/add-payment-method",
  "/settings",
  "/update-plan",
  "/convert-to-paid",
];

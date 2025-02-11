import { headers } from "next/headers";
import { cache } from "./cache";
import { env } from "./env";
import { kv } from "./redis";
import { GenericValue, UserType } from "./types";

export const getUserFromHeaders = cache(async () => {
  return JSON.parse((await headers()).get("user") as string) as UserType;
});

export async function getPathname() {
  return (await headers())
    .get("referer")
    ?.replace(env.NEXT_PUBLIC_BASE_URL, "")
    .split("?")[0];
}

export async function getSearchParams() {
  return new URLSearchParams(
    (await headers()).get("referer")?.split("?")[1] as string
  );
}

export async function setUserValue(
  key: string,
  path: string,
  value: GenericValue
) {
  await kv.main.json.set(`user-${key}`, path, value);
}

export async function getIP() {
  const headersInstance = await headers();
  return (
    headersInstance.get("CF-Connecting-IP") ||
    headersInstance.get("x-forwarded-for") ||
    "127.0.0.1"
  );
}

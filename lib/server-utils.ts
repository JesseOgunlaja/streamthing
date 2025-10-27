import { cookies, headers } from "next/headers";
import { decodeJWT, readIdentifier } from "./auth";
import { env } from "./env";
import { getUserByEmail, kv } from "./redis";
import { GenericValue, UserType } from "./types";
import { AccessTokenJWTSchema } from "./zod/jwt";

export async function getUserFromHeaders() {
  const fetchedUser = JSON.parse(
    (await headers()).get("user") as string
  ) as UserType | null;
  if (fetchedUser) return fetchedUser;

  const { identifier } = AccessTokenJWTSchema.parse(
    await decodeJWT((await cookies()).get("access_token")?.value as string)
  );
  const { email } = await readIdentifier(identifier);
  return (await getUserByEmail(email)) as UserType;
}

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
export const VM_FETCH_CONFIG = {
  method: "POST",
  headers: {
    authorization: env.SERVER_ADMIN_PASSWORD,
  },
} satisfies RequestInit;

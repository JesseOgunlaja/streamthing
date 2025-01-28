import { headers } from "next/headers";
import React from "react";
import { env } from "./env";
import { redis } from "./redis";
import { GenericValue, UserType } from "./types";

let user: UserType | null = null;

export const getUserFromHeaders = React.cache(async () => {
  const fetchedUser = JSON.parse(
    (await headers()).get("user") as string
  ) as UserType | null;
  if (fetchedUser) user = fetchedUser;
  return user as UserType;
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
  await redis.json.set(`user-${key}`, path, value);
}

export async function getIP() {
  return (await headers()).get("x-forwarded-for") || "127.0.0.1";
}

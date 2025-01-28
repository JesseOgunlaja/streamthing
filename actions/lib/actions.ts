"use server";

import { cookies } from "next/headers";
import { isSignedIn } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { GenericValue } from "@/lib/types";

export async function setUserValue(path: string, value: GenericValue) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  await redis.json.set(`user-${user.email}`, path, value);

  return {
    ok: true,
    message: "Success",
  };
}

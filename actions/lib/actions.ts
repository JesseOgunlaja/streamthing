"use server";

import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { GenericValue } from "@/lib/types";
import { cookies } from "next/headers";

export async function setUserValue(path: string, value: GenericValue) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  await kv.main.json.set(`user-${user.email}`, path, value);

  return {
    ok: true,
    message: "Success",
  };
}

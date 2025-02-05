"use server";

import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { NameSchema } from "@/lib/zod/user";
import { isValid } from "@/lib/zod/utils";
import { cookies } from "next/headers";

export async function editName(newName: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);

  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const zodResult = isValid(NameSchema, newName, true);
  if (!zodResult.success) {
    return {
      ok: false,
      message: zodResult.error,
    };
  }

  await kv.main.json.set(
    `user-${user.email}`,
    "$.name",
    JSON.stringify(newName)
  );

  return {
    ok: true,
    message: "Successfully updated display name",
  };
}

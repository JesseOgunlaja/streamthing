"use server";

import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { PasswordSchema } from "@/lib/zod/user";
import { isValid } from "@/lib/zod/utils";
import { compare as comparePasswords, hash as hashPassword } from "bcryptjs";
import { cookies } from "next/headers";

export async function editPassword(oldPassword: string, newPassword: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const zodResult = isValid(PasswordSchema, newPassword, true);
  if (!zodResult.success) {
    return {
      ok: false,
      message: zodResult.error,
    };
  }

  if (!(await comparePasswords(oldPassword, user.password))) {
    return {
      ok: false,
      message: "Incorrect password",
    };
  }

  const hashedPassword = await hashPassword(newPassword, 10);
  kv.main.json.set(
    `user-${user.email}`,
    "$.password",
    JSON.stringify(hashedPassword)
  );

  return {
    ok: true,
    message: "Successfully updated password",
  };
}

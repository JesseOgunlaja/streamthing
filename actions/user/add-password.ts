"use server";

import { cookies } from "next/headers";
import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { PasswordSchema } from "@/lib/zod/user";
import { isValid } from "@/lib/zod/utils";
import { hash as hashPassword } from "bcryptjs";

export async function addPassword(password: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);

  if (!signedIn)
    return {
      ok: false,
      message: "Unauthorized",
    };

  if (!isValid(PasswordSchema, password))
    return {
      ok: false,
      message: "Invalid password",
    } as const;

  if (user.password)
    return {
      ok: false,
      message: "Password already exists",
    };

  const hashedPassword = await hashPassword(password, 10);

  await kv.main.json.set(`user-${user.email}`, "$", {
    ...user,
    auth: [...user.auth, "Internal"],
    password: hashedPassword,
  });

  return {
    ok: true,
    message: "Password added",
  } as const;
}

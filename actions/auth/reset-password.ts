"use server";

import { signJWT } from "@/lib/auth";
import { env } from "@/lib/env";
import { getUserByEmail, kv } from "@/lib/redis";
import { generateRandomNumbers } from "@/lib/utils";
import { PasswordSchema } from "@/lib/zod/user";
import { isValid } from "@/lib/zod/utils";
import { hash as hashPassword } from "bcryptjs";
import { sendEmail } from "../lib/utils";

export async function sendResetPasswordEmail(email: string) {
  const user = await getUserByEmail(email);
  if (!user || !user.auth.includes("Internal")) {
    return {
      ok: true,
      message:
        "If an account exists with that email, you will receive an email to reset your password.",
    };
  }

  const code = generateRandomNumbers(10);
  const promiseResults = await Promise.all([
    kv.temp.set(`reset-password-${email}`, code, {
      ex: 60 * 60,
    }),
    signJWT({ email: email, code, type: "reset password" }, "1h"),
  ]);

  const jwt = promiseResults[1];

  await sendEmail(email, "Reset password request", {
    link: `${env.NEXT_PUBLIC_BASE_URL}/reset-password?code=${jwt}`,
    linkText: "Reset password",
    descriptionText: "You can reset your password by clicking the button below",
  });

  return {
    ok: true,
    message:
      "If an account exists with that email, you will receive an email to reset your password.",
  };
}

export async function resetPassword(
  code: string,
  email: string,
  password: string
) {
  const redisCode = await kv.temp.get(`reset-password-${email}`);
  if (String(redisCode) !== code) {
    return {
      ok: false,
      message: "Invalid code",
    };
  }

  const zodResult = isValid(PasswordSchema, password, true);
  if (!zodResult.success) {
    return {
      ok: false,
      message: zodResult.error,
    };
  }

  const hashedPassword = await hashPassword(password, 10);

  await kv.temp.del(`reset-password-${email}`);
  await kv.main.json.set(
    `user-${email}`,
    "$.password",
    JSON.stringify(hashedPassword)
  );

  return {
    ok: true,
    message: "Password reset successfully",
  };
}

"use server";

import { isSignedIn, signJWT } from "@/lib/auth";
import { env } from "@/lib/env";
import { EmailSchema } from "@/lib/zod/user";
import { isValid } from "@/lib/zod/utils";
import { waitUntil } from "@vercel/functions";
import { cookies } from "next/headers";
import { sendEmail } from "../lib/utils";

export async function editEmail(email: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);

  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const zodResult = isValid(EmailSchema, email, true);
  if (!zodResult.success) {
    return {
      ok: false,
      message: zodResult.error,
    };
  }

  const jwt = await signJWT(
    { user, newEmail: email, type: "update email" },
    "1h"
  );

  waitUntil(
    sendEmail(email, "update email", {
      link: `${env.NEXT_PUBLIC_BASE_URL}/set-new-email?jwt=${jwt}`,
    })
  );

  return {
    ok: true,
    message: "Successfully sent email",
  };
}

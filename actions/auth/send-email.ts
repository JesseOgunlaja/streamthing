"use server";

import { isSignedIn, signJWT } from "@/lib/auth";
import { env } from "@/lib/env";
import { RateLimitError, rateLimit } from "@/lib/ratelimit";
import { cookies } from "next/headers";
import { after } from "next/server";
import { sendEmail } from "../lib/utils";

export async function resendVerificationEmail() {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);
  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  rateLimit({
    name: "resend-verification-email",
    key: user.email,
    limit: 2,
    duration: 1,
    errorResponse: {
      ok: false,
      message: "Too many requests, try again later",
    },
  });

  const { email } = user;

  try {
    const jwt = await signJWT({ email, type: "verify email" }, "1h");

    const BASE_URL = env.NEXT_PUBLIC_BASE_URL;
    const link = `${BASE_URL}/verify-email?jwt=${jwt}`;

    after(
      sendEmail(email, "Verify your email", {
        link,
      })
    );

    return {
      ok: true,
      message: "Successfully sent email",
    };
  } catch (err) {
    if (err instanceof RateLimitError) {
      return {
        ok: false,
        message: "Ratelimited, please try again later",
      };
    }

    return {
      ok: false,
      message: "An unexpected error occurred, please try again",
    };
  }
}

"use server";

import { createSessionId, setSessionCookie, signJWT } from "@/lib/auth";
import { rateLimitByIP } from "@/lib/ratelimit";
import { getUserByEmail } from "@/lib/redis";
import { compare as comparePasswords } from "bcryptjs";

export async function signin_internal(email: string, password: string) {
  rateLimitByIP({
    name: "sign-in",
    limit: 5,
    duration: 10,
    errorResponse: {
      ok: false,
      message: "Too many requests, try again later",
    },
    limitOnErrorsOnly: true,
  });

  const user = await getUserByEmail(email);
  if (!user || !user.auth.includes("Internal")) {
    return {
      ok: false,
      message: "Invalid credentials",
    };
  }

  const isPasswordCorrect = await comparePasswords(password, user.password);
  if (!isPasswordCorrect) {
    return {
      ok: false,
      message: "Invalid credentials",
    };
  }

  const sessionID = await createSessionId(email, user.id, "Internal");
  const jwt = await signJWT({
    sessionID,
    type: "session",
  });

  await setSessionCookie(jwt, sessionID);

  return {
    ok: true,
    message: "Valid credentials",
  } as const;
}

"use server";

import { createSessionId, setSessionCookie, signJWT } from "@/lib/auth";
import { rateLimitByIP, RateLimitError } from "@/lib/ratelimit";
import { getUserByEmail } from "@/lib/redis";
import { compare as comparePasswords } from "bcryptjs";

export async function signin_internal(email: string, password: string) {
  try {
    const ratelimit = await rateLimitByIP({
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
      ratelimit.incrementRatelimit();
      return {
        ok: false,
        message: "Invalid credentials",
      };
    }

    const isPasswordCorrect = await comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      ratelimit.incrementRatelimit();
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
  } catch (err) {
    if (err instanceof RateLimitError) {
      return {
        ok: false,
        message: "Ratelimited, please try again later",
      };
    }

    return {
      ok: false,
      message: "Invalid credentials",
    };
  }
}

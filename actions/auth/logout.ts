"use server";

import { decodeJWT } from "@/lib/auth";
import { redis_sessions } from "@/lib/redis";
import { SessionJWTSchema } from "@/lib/zod/jwt";
import { cookies } from "next/headers";

export async function logout() {
  const cookiesInstance = await cookies();
  try {
    const session = cookiesInstance.get("session")?.value as string;

    const { sessionID } = SessionJWTSchema.parse(await decodeJWT(session));
    await redis_sessions.del(sessionID);

    cookiesInstance.delete("session");
    cookiesInstance.delete("access_token");
  } catch {
    cookiesInstance.delete("session");
    cookiesInstance.delete("access_token");
  }
}

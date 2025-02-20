import { access_token_config } from "@/constants/constants";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "./cache";
import {
  decryptString,
  encryptString,
  jumbleStrings,
  unjumbleStrings,
} from "./encryption";
import { env } from "./env";
import { getUserByEmail, kv } from "./redis";
import { getIP } from "./server-utils";
import { SessionData } from "./types";
import { generateUUID } from "./utils";
import { AccessTokenJWTSchema, SessionJWTSchema } from "./zod/jwt";
const secret = new TextEncoder().encode(env.JWT_SIGNING_KEY);

export async function signJWT(
  payload: Record<string, unknown>,
  duration = "30d"
) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(duration)
    .sign(secret);
}

export async function decodeJWT(jwt: string) {
  const decoded = await jwtVerify(jwt, secret);
  return decoded.payload as Record<string, string>;
}

export async function setSessionCookie(jwt: string, sessionID?: string) {
  const cookiesInstance = await cookies();
  cookiesInstance.set({
    name: "session",
    value: jwt,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
  if (sessionID) {
    cookiesInstance.set({
      name: "access_token",
      value: await createAccessToken(sessionID),
      ...access_token_config,
    });
  }
}

export async function createSessionId(
  email: string,
  id: string,
  auth: "Internal" | "GitHub"
) {
  const sessionID = generateUUID();
  const KVPipeline = kv.sessions.pipeline();
  KVPipeline.json.set(sessionID, "$", {
    email,
    id,
    auth,
    createdAt: new Date(Date.now()).toISOString(),
    ip: await getIP(),
    active: true,
  });
  KVPipeline.expire(sessionID, 7 * 24 * 60 * 60);
  await KVPipeline.exec();
  return sessionID;
}

export async function readSessionID(id: string) {
  const sessionData = (await kv.sessions.json.get(id)) as SessionData;
  if (!sessionData.active) throw new Error("Session deleted");
  return { email: sessionData.email, id: sessionData.id };
}

export async function readIdentifier(identifier: string) {
  const [id, email] = unjumbleStrings(decryptString(identifier));
  return { id, email };
}

export async function isSignedIn(access_token: string | undefined) {
  try {
    if (!access_token) return { signedIn: false } as const;

    const { identifier } = AccessTokenJWTSchema.parse(
      await decodeJWT(access_token)
    );
    const { id, email } = await readIdentifier(identifier);

    const user = await getUserByEmail(email);

    if (!user) throw new Error("Unauthorized");
    if (user.id !== id) throw new Error("Unauthorized");

    return { signedIn: true, user } as const;
  } catch {
    return { signedIn: false } as const;
  }
}

export const cachedIsSignedIn = cache(isSignedIn, { duration: 3 });

export async function createAccessToken(session: string | undefined) {
  try {
    if (!session) throw new Error();

    const { sessionID } = SessionJWTSchema.parse(await decodeJWT(session));
    const { id, email } = await readSessionID(sessionID);

    const access_token = await signJWT(
      {
        identifier: encryptString(jumbleStrings(id, email)),
        type: "access_token",
      },
      "60s"
    );
    return access_token;
  } catch {
    return "";
  }
}

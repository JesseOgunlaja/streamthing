"use server";

import { createSessionId, setSessionCookie, signJWT } from "@/lib/auth";
import { env } from "@/lib/env";
import { getUserByEmail, kv } from "@/lib/redis";
import { UserType } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { EmailSchema, PasswordSchema } from "@/lib/zod/user";
import { isValid } from "@/lib/zod/utils";
import { hash as hashPassword } from "bcryptjs";
import { after } from "next/server";
import { createProfilePicture } from "../lib/lib";
import { sendEmail } from "../lib/utils";

export async function signup(email: string, password: string) {
  if (!isValid(EmailSchema, email) || !isValid(PasswordSchema, password)) {
    return {
      ok: false,
      message: "Invalid email or password",
    } as const;
  }

  const user = await getUserByEmail(email);

  if (user) {
    return {
      ok: false,
      message: "User already exists",
    } as const;
  }

  const id = generateUUID();
  console.log(email);
  console.log(email[0]);
  const { imageURL, imageID } = await createProfilePicture(email[0], id);

  kv.main.json.set(
    `user-${email}`,
    "$",
    {
      email,
      name: email.split("@")[0],
      id,
      password: await hashPassword(password, 10),
      verified: false,
      auth: ["Internal"],
      githubID: "",
      githubLogin: "",
      servers: [],
      plan: "Pending",
      profilePicture: imageURL,
      profilePictureID: imageID,
      stripe_subscription_id: "",
      stripe_customer_id: "",
    } satisfies UserType,
    { nx: true }
  );

  const sessionID = await createSessionId(email, id, "Internal");
  const jwt = await signJWT({
    sessionID,
    type: "session",
  });
  await setSessionCookie(jwt, sessionID);

  const verifyEmailJWT = await signJWT({ email, type: "verify email" }, "1h");
  const link = `${env.NEXT_PUBLIC_BASE_URL}/verify-email?jwt=${verifyEmailJWT}`;

  after(
    sendEmail(email, "Verify your account", {
      link,
    })
  );

  return {
    ok: true,
    message: "User registered",
  } as const;
}

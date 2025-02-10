"use server";

import { createSessionId, setSessionCookie, signJWT } from "@/lib/auth";
import { getUserByEmail, kv } from "@/lib/redis";
import { GenericObject, UserType } from "@/lib/types";
import { generateUUID } from "@/lib/utils";
import { getGithubDetails } from "../lib/github";

async function setSession(email: string, id: string) {
  const sessionID = await createSessionId(email, id, "GitHub");
  const jwt = await signJWT({
    sessionID,
    type: "session",
  });

  await setSessionCookie(jwt, sessionID);
}

export async function signUpWithGithub(code: string) {
  try {
    const { email, name, avatar_url, github_id, github_login } =
      await getGithubDetails(code);

    const existingEntry = (await kv.main.json.get(`github-${github_id}`)) as
      | GenericObject<string>
      | undefined;

    if (existingEntry) {
      const { email, id } = existingEntry;
      await setSession(email, id);
      return { ok: true, message: "Valid credentials" };
    }

    const currentUser = await getUserByEmail(email);
    const KVPipeline = kv.main.pipeline();
    const newUserID = generateUUID();

    if (currentUser) {
      KVPipeline.json.set(`user-${email}`, "$", {
        ...currentUser,
        auth: [...currentUser.auth, "GitHub"],
        githubID: github_id,
        githubLogin: github_login,
      });
    } else {
      KVPipeline.json.set(`user-${email}`, "$", {
        name,
        email,
        id: newUserID,
        githubID: github_id,
        githubLogin: github_login,
        profilePicture: avatar_url,
        profilePictureID: "",
        auth: ["GitHub"],
        password: "",
        plan: "Pending",
        verified: true,
        stripe_customer_id: "",
        stripe_subscription_id: "",
        servers: [],
      } satisfies UserType);
    }
    KVPipeline.json.set(`github-${github_id}`, "$", {
      email,
      id: currentUser?.id || newUserID,
    });

    await KVPipeline.exec();
    await setSession(email, currentUser?.id || newUserID);

    return { ok: true, message: "Valid credentials" };
  } catch {
    return {
      ok: false,
      message: "An unexpected error occurred, please try again",
    };
  }
}

"use server";

import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { UserType } from "@/lib/types";
import { cookies } from "next/headers";

export async function unlinkGitHub() {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);

  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  if (user.auth.every((method) => method === "GitHub")) {
    return {
      ok: false,
      message: "Password needs to be added before unlinking GitHub",
    };
  }

  const KVPipeline = kv.main.pipeline();
  KVPipeline.json.set(`user-${user.email}`, "$", {
    ...user,
    auth: user.auth.filter((auth) => auth !== "GitHub"),
    githubID: "",
    githubLogin: "",
  } satisfies UserType);
  KVPipeline.del(`github-${user.githubID}`);
  await KVPipeline.exec();

  return {
    ok: true,
    message: "Success",
  };
}

"use server";

import { cookies } from "next/headers";
import { isSignedIn } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { UserType } from "@/lib/types";

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

  const redisPipeline = redis.pipeline();
  redisPipeline.json.set(`user-${user.email}`, "$", {
    ...user,
    auth: user.auth.filter((auth) => auth !== "GitHub"),
    githubID: "",
    githubLogin: "",
  } satisfies UserType);
  redisPipeline.del(`github-${user.githubID}`);
  await redisPipeline.exec();

  return {
    ok: true,
    message: "Success",
  };
}

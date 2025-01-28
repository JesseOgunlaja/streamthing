"use server";

import { cookies } from "next/headers";
import { isSignedIn } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { getGithubDetails } from "../lib/github";

export async function linkGitHub(code: string) {
  const access_token = (await cookies()).get("access_token")?.value || "";
  const { user, signedIn } = await isSignedIn(access_token);

  if (!signedIn) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const { github_id, github_login } = await getGithubDetails(code);

  const redisPipeline = redis.pipeline();
  redisPipeline.json.set(`user-${user.email}`, "$", {
    ...user,
    auth: [...user.auth, "GitHub"],
    githubID: github_id,
    githubLogin: github_login,
  });

  redisPipeline.json.set(`github-${github_id}`, "$", {
    email: user.email,
    id: user.id,
  });
  await redisPipeline.exec();

  return {
    ok: true,
    message: "Success",
  };
}

"use server";

import { isSignedIn } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { cookies } from "next/headers";
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

  const KVPipeline = kv.main.pipeline();
  KVPipeline.json.set(`user-${user.email}`, "$", {
    ...user,
    auth: [...user.auth, "GitHub"],
    githubID: github_id,
    githubLogin: github_login,
  });

  KVPipeline.json.set(`github-${github_id}`, "$", {
    email: user.email,
    id: user.id,
  });
  await KVPipeline.exec();

  return {
    ok: true,
    message: "Success",
  };
}

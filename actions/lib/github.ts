import { env } from "@/lib/env";
import { GenericObject } from "@/lib/types";

export async function getGithubDetails(code: string) {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      client_id: env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_SECRET,
    }),
  });
  const data = await res.text();
  const access_token = data.split("=")[1].slice(0, -6);

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const { id: github_id, avatar_url, name, login } = await userResponse.json();

  const emailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const emailData = await emailResponse.json();
  const email = emailData.filter((email: GenericObject) => email.primary)[0]
    .email;

  return {
    email,
    name,
    avatar_url,
    github_id: String(github_id),
    github_login: login,
  };
}

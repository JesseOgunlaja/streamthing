"use client";

import { env } from "@/lib/env";
import styles from "@/styles/utils/github-button.module.css";
import Link from "next/link";
import GitHubSVG from "./GitHubSVG";

interface PropsType {
  type?: "signin" | "signup";
}

const GitHubButton = ({ type = "signin" }: PropsType) => {
  const BASE_URL = env.NEXT_PUBLIC_BASE_URL;
  const BASE_GITHUB_URL = "https://github.com/login/oauth/authorize";
  const SCOPE = `scope=${env.NEXT_PUBLIC_GITHUB_OAUTH_SCOPES}`;
  const CLIENT_ID = `client_id=${env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}`;
  const GITHUB_OAUTH_URL = `${BASE_GITHUB_URL}?${SCOPE}&${CLIENT_ID}&redirect_uri=${BASE_URL}/signin`;

  return (
    <Link href={GITHUB_OAUTH_URL} className={styles.link}>
      <GitHubSVG fillColor="var(--bg-color)" />
      <p>Sign {type === "signin" ? "in" : "up"} with GitHub</p>
    </Link>
  );
};

export default GitHubButton;

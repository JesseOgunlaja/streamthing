"use client";

import { linkGitHub } from "@/actions/user/link-github";
import { unlinkGitHub } from "@/actions/user/unlink-github";
import GitHubSVG from "@/components/GitHubSVG";
import { useUser } from "@/components/UserStateProvider";
import useGitHubOAuth from "@/hooks/useGitHubOAuth";
import { env } from "@/lib/env";
import { promiseToast } from "@/lib/lib";
import styles from "@/styles/protected/settings/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LinkedAccounts = () => {
  const router = useRouter();
  const user = useUser();
  const [pending, setPending] = useState(false);
  const { githubID, githubLogin } = useUser();

  useGitHubOAuth(linkGitHub, {
    successFunction: router.refresh,
  });

  const BASE_URL = env.NEXT_PUBLIC_BASE_URL;
  const BASE_GITHUB_URL = "https://github.com/login/oauth/authorize";
  const SCOPE = `scope=${env.NEXT_PUBLIC_GITHUB_OAUTH_SCOPES}`;
  const CLIENT_ID = `client_id=${env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID}`;
  const GITHUB_OAUTH_URL = `${BASE_GITHUB_URL}?${SCOPE}&${CLIENT_ID}&redirect_uri=${BASE_URL}/settings?tab=authentication`;

  function unlinkAccount() {
    if (pending) return;

    if (user.auth.every((method) => method === "GitHub")) {
      return toast.error("Password needs to be added before unlinking GitHub");
    }

    setPending(true);

    const promise = new Promise((resolve, reject) => {
      unlinkGitHub().then((data) => {
        const { ok, message } = data;
        if (ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise, {
      successFunction: () => {
        setPending(false);
        router.refresh();
      },
      errorFunction: () => setPending(false),
    });
  }

  return (
    <div className={styles.section}>
      <div className={styles["main-section"]}>
        <p className={styles["section-title"]}>Linked accounts</p>
        <p className={styles["section-description"]}>
          Link an account so you have multiple ways to sign in.
        </p>
        <div className={styles["linked-account"]}>
          <GitHubSVG />
          {githubID ? (
            <p>
              Github: {githubLogin} (ID: {githubID})
            </p>
          ) : (
            <p>GitHub</p>
          )}
          {githubID ? (
            <button disabled={pending} onClick={unlinkAccount}>
              Unlink account
            </button>
          ) : (
            <Link href={GITHUB_OAUTH_URL}>Link account</Link>
          )}
        </div>
      </div>
      <hr />
      <div className={styles.footer}>
        <p>
          Link additional accounts for easier sign in, and unlink them anytime
          you choose.
        </p>
      </div>
    </div>
  );
};

export default LinkedAccounts;

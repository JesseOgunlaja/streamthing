import { createSessionId, decodeJWT, signJWT } from "@/lib/auth";
import { encryptString } from "@/lib/encryption";
import { kv } from "@/lib/redis";
import { stripeInstance } from "@/lib/stripe";
import { GenericObject, UserType } from "@/lib/types";
import { NewEmailVerificationJWTSchema } from "@/lib/zod/jwt";
import styles from "@/styles/utils/verification-email.module.css";
import { Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PropsType {
  searchParams: Promise<GenericObject>;
}

export default async function Page({ searchParams }: PropsType) {
  let sessionJWT: string | null = null;
  try {
    const jwt = (await searchParams).jwt as string;
    const decodedJWT = NewEmailVerificationJWTSchema.parse(
      await decodeJWT(jwt)
    );

    const { user, newEmail } = decodedJWT;
    const key = `user-${user.email}`;
    const newEmailString = JSON.stringify(newEmail);

    const KVPipeline = kv.main.pipeline();
    KVPipeline.json.set(key, "$", {
      ...user,
      email: newEmail,
      servers: user.servers.map((server) => ({ ...server, owner: newEmail })),
    } satisfies UserType);
    user.servers.forEach((server) => {
      KVPipeline.json.set(`server-${server.id}`, "$.owner", newEmailString);
    });
    if (user.githubID) {
      KVPipeline.json.set(`github-${user.githubID}`, "$.email", newEmailString);
    }
    KVPipeline.rename(key, `user-${newEmail}`);

    sessionJWT = await signJWT({
      sessionID: await createSessionId(newEmail, user.id, "Internal"),
      type: "session",
    });

    await Promise.all([
      KVPipeline.exec(),
      stripeInstance.subscriptions.update(user.stripe_subscription_id, {
        metadata: { email: newEmail },
      }),
    ]);
  } catch (err) {
    return (
      <main id={styles.main}>
        <div className={styles.container}>
          <Mail />
          <h1>Invalid Verification Code</h1>
          <p>
            We&apos;re sorry, but the verification code you entered is invalid.
          </p>
          <p>
            This could have happened because the link has <span>expired</span>,
            or you might have entered the link <span>incorrectly</span>.
          </p>
          <p>
            Still not working, go to your dashboard to get your link resent.
          </p>
          <Link replace href="/dashboard">
            Redirect to Dashboard{" "}
          </Link>
        </div>
      </main>
    );
  }

  const successMessage = encodeURIComponent(
    encryptString("Successfully verified new email")
  );
  redirect(
    `/dashboard?success_message=${successMessage}&auth=params&session=${sessionJWT}`
  );
}

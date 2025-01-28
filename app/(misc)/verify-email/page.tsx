import { decodeJWT } from "@/lib/auth";
import { setUserValue } from "@/lib/server-utils";
import { GenericObject } from "@/lib/types";
import { EmailVerificationJWTSchema } from "@/lib/zod/jwt";
import styles from "@/styles/utils/verification-email.module.css";
import { Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PropsType {
  searchParams: Promise<GenericObject>;
}

export default async function Page({ searchParams }: PropsType) {
  try {
    const jwt = (await searchParams).jwt as string;
    const decodedJWT = EmailVerificationJWTSchema.parse(await decodeJWT(jwt));

    await setUserValue(decodedJWT.email, "$.verified", true);
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

  redirect("/home");
}

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { decodeJWT } from "@/lib/auth";
import { kv } from "@/lib/redis";
import { GenericObject } from "@/lib/types";
import { ResetPasswordJWTSchema } from "@/lib/zod/jwt";
import styles from "@/styles/auth-form.module.css";
import { notFound } from "next/navigation";

interface PropsType {
  searchParams: Promise<GenericObject<string>>;
}

const Page = async ({ searchParams }: PropsType) => {
  try {
    const jwt = (await searchParams).code;
    const { email, code } = ResetPasswordJWTSchema.parse(await decodeJWT(jwt));
    const DBCode = await kv.temp.get(`reset-password-${email}`);
    if (String(DBCode) !== code) throw new Error("Invalid code");

    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Reset password</h1>
          <hr className={styles.separator} />
          <ResetPasswordForm email={email} code={code} />
        </div>
      </main>
    );
  } catch (err) {
    notFound();
  }
};

export default Page;

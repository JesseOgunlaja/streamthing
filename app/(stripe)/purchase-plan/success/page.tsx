import { fulfillCheckout } from "@/actions/stripe/fulfill-checkout";
import ErrorComponent from "@/components/ErrorComponent";
import RedirectCountdown from "@/components/RedirectCountdown";
import { GenericObject } from "@/lib/types";
import styles from "@/styles/purchase-plan.module.css";

interface PropsType {
  searchParams: Promise<GenericObject>;
}

const Page = async ({ searchParams }: PropsType) => {
  const code = (await searchParams).code as string | undefined;
  if (!code) return;

  const { ok, plan } = await fulfillCheckout(code);

  if (!ok)
    return (
      <ErrorComponent
        toastErrorText="An unexpected error occurred"
        redirectPath="/dashboard"
        id={styles.main}
      />
    );

  return (
    <main id={styles.success}>
      <p>Thanks for subscribing to the {plan} plan</p>
      <p>
        You will be redirected to the dashboard page in{" "}
        <RedirectCountdown time={5} redirectPath="/dashboard" />
      </p>
    </main>
  );
};

export default Page;

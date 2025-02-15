import { getPaymentMethods } from "@/actions/stripe/payment-methods";
import ErrorComponent from "@/components/ErrorComponent";
import StripeAddPaymentMethod from "@/components/StripeAddPaymentMethod";
import { getUserFromHeaders } from "@/lib/server-utils";
import styles from "@/styles/purchase-plan.module.css";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getUserFromHeaders();
  if (user.plan === "Pending" || !user.verified) return redirect("/dashboard");

  const allowed = (await getPaymentMethods()).data.length < 3;
  const successMessage = "Successfully added payment method";

  return (
    <div id={styles["checkout-page"]}>
      {allowed ? (
        <StripeAddPaymentMethod />
      ) : (
        <ErrorComponent
          toastErrorText="You can only have up to 3 payment methods"
          redirectPath={`/dashboard?success_message=${successMessage}`}
          id={styles.blocked}
        />
      )}
    </div>
  );
};

export default Page;

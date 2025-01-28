import {
  cancelSubscription,
  updateSubscriptionPlan,
} from "@/actions/stripe/update-plan";
import { BillingMethod } from "@/constants/billing";
import { encryptString } from "@/lib/encryption";
import { promiseToast } from "@/lib/lib";
import { GenericFunction } from "@/lib/types";
import styles from "@/styles/protected/update-plan.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "../UserStateProvider";
import { usePlanData } from "./UpdatePlanContext";
import UpdatePlanDialogContent from "./UpdatePlanDialogContent";

interface PropsType {
  open: boolean;
  close: GenericFunction;
}

const UpdatePlanDialog = ({ open, close }: PropsType) => {
  const router = useRouter();
  const user = useUser();
  const { plan } = usePlanData();
  const [billingType, setBillingType] = useState<BillingMethod>("monthly");

  function confirmClick() {
    if (plan === user.plan) {
      return toast.error("You're already on this plan");
    }

    if (!user.stripe_customer_id) {
      return router.push(
        `/convert-to-paid?plan=${plan}&planType=${billingType}`
      );
    }

    updatePlan();
  }

  function updatePlan() {
    const promise = new Promise((resolve, reject) => {
      if (plan === "Hobby") {
        cancelSubscription().then((message) => {
          message === "Success" ? resolve(message) : reject(message);
        });
      } else {
        updateSubscriptionPlan(plan, billingType).then((message) => {
          message === "Success" ? resolve(message) : reject(message);
        });
      }
    });

    promiseToast(promise, {
      successFunction: () => {
        const successMessage = encryptString(
          `Successfully moved to ${plan} plan`
        );
        router.push(`/dashboard?success_message=${successMessage}`);
      },
    });
  }

  return (
    <dialog open={open}>
      <div className={styles.container}>
        <p className={styles["dialog-title"]}>Update Plan</p>
        <UpdatePlanDialogContent
          billingType={billingType}
          setBillingType={setBillingType}
        />
        <div className={styles["buttons"]}>
          <button onClick={close}>Cancel</button>
          <button onClick={confirmClick}> Confirm</button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdatePlanDialog;

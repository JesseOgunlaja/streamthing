"use client";

import { subscriptionPlans } from "@/constants/plans";
import styles from "@/styles/protected/update-plan.module.css";
import Balancer from "react-wrap-balancer";
import { useUser } from "../UserStateProvider";
import { usePlanData } from "./UpdatePlanContext";

const UpdatePlanDialogContent = () => {
  const user = useUser();
  const { plan, renewDate } = usePlanData();

  if (plan === "Hobby") {
    return (
      <>
        <p>
          <Balancer preferNative={false} ratio={0.5}>
            If you switch to the hobby plan, you will still have access to{" "}
            {user.plan} plan features until {renewDate}.
          </Balancer>
        </p>
        <p className={styles["hobby-warning"]}>
          <Balancer preferNative={false} ratio={0.85}>
            WARNING:
            <br /> At {renewDate} if more than one server is present all excess
            servers will be deleted.
          </Balancer>
        </p>
      </>
    );
  } else {
    return (
      <>
        <p>
          <Balancer preferNative={false} ratio={0.85}>
            Are you sure you want to move to the {plan} plan (£
            {`${subscriptionPlans[plan].monthlyPrice}`}/month)
          </Balancer>
        </p>
      </>
    );
  }
};

export default UpdatePlanDialogContent;

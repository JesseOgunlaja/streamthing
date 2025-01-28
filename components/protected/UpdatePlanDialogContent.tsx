"use client";

import { BillingMethod } from "@/constants/billing";
import { subscriptionPlans } from "@/constants/plans";
import styles from "@/styles/protected/update-plan.module.css";
import { Dispatch, SetStateAction } from "react";
import Balancer from "react-wrap-balancer";
import { useUser } from "../UserStateProvider";
import { usePlanData } from "./UpdatePlanContext";

interface PropsType {
  billingType: BillingMethod;
  setBillingType: Dispatch<SetStateAction<BillingMethod>>;
}

const UpdatePlanDialogContent = ({
  billingType,
  setBillingType,
}: PropsType) => {
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
        <div className={styles["payment-types"]}>
          <div>
            <label htmlFor="monthly-payment-type">Monthly</label>
            <input
              defaultChecked
              onClick={() => setBillingType("monthly")}
              type="radio"
              name="payment-type"
              id="monthly-payment-type"
            />
          </div>
          <div>
            <label htmlFor="annual-payment-type">Annual</label>
            <input
              onClick={() => setBillingType("annual")}
              type="radio"
              name="payment-type"
              id="annual-payment-type"
            />
          </div>
        </div>
        <p>
          <Balancer preferNative={false} ratio={0.85}>
            Are you sure you want to move to the {billingType} {plan} plan (£
            {`${subscriptionPlans[plan][`${billingType}Price`]}`}/
            {billingType === "monthly" ? "month" : "year"})
          </Balancer>
        </p>
      </>
    );
  }
};

export default UpdatePlanDialogContent;

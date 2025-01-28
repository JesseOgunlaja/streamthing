"use client";

import { PlanType } from "@/constants/plans";
import { createContext, useContext } from "react";

export const PlanDataContext = createContext<{
  renewDate: string;
  plan: PlanType;
}>({
  renewDate: "",
  plan: "" as PlanType,
});

export const usePlanData = () => useContext(PlanDataContext);

interface PropsType {
  plan: PlanType;
  renewDate: string;
  children: React.ReactNode;
}

export const UpdatePlanContextProvider = ({
  children,
  plan,
  renewDate,
}: PropsType) => {
  return (
    <PlanDataContext.Provider value={{ plan, renewDate }}>
      {children}
    </PlanDataContext.Provider>
  );
};

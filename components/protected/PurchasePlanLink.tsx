"use client";

import { setUserValue } from "@/actions/lib/actions";
import { Children } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface PropsType {
  planTitle: string;
  children: Children;
}

const PurchasePlanLink = ({ planTitle, children }: PropsType) => {
  const router = useRouter();

  async function checkIfFreePlan(e: MouseEvent) {
    if (planTitle === "Hobby") {
      e.preventDefault();
      await setUserValue("$.plan", JSON.stringify("Hobby"));
      router.refresh();
    }
  }

  return (
    <Link
      onClick={checkIfFreePlan}
      target="_blank"
      href={`/purchase-plan?plan=${planTitle}`}
    >
      {children}
    </Link>
  );
};

export default PurchasePlanLink;

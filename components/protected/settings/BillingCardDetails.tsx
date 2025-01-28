"use client";

import { cardCompanies } from "@/constants/constants";
import { capitalizeFirstLetter } from "@/lib/utils";
import styles from "@/styles/protected/settings/page.module.css";
import "@uploadthing/react/styles.css";
import { Check, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";
import Skeleton from "react-loading-skeleton";
import { PaymentIcon, PaymentType } from "react-svg-credit-card-payment-icons";
import { toast } from "sonner";
import PaymentMethodDropdown from "./PaymentMethodDropdown";
import { useStripeData } from "./StripeDataProvider";

function getValidCardBrand(brand: string) {
  return cardCompanies.includes(brand) ? (brand as PaymentType) : "Generic";
}

const BillingCardDetails = () => {
  const { data: stripeData, isLoading } = useStripeData();

  function linkClick(e: MouseEvent) {
    if (!isLoading && stripeData.methods.length === 0) {
      toast.error(
        "You must update to a paid plan before adding a payment method"
      );
      e.preventDefault();
    }
  }

  return (
    <div className={styles["payment-methods"]}>
      <div className={styles["top-section"]}>
        <p className={styles["section-title"]}>Payment methods</p>
        <p>Payments for all invoices are made using the active card.</p>
        <hr />
        {isLoading ? (
          <>
            <Skeleton count={3} containerClassName={styles.skeleton} />
          </>
        ) : stripeData.methods.length === 0 ? (
          <p>No payment methods added</p>
        ) : (
          <div className={styles["method-details-wrapper"]}>
            {stripeData.methods.map((method) => (
              <div key={method.id} className={styles["method-details"]}>
                <PaymentIcon
                  format="logo"
                  type={getValidCardBrand(capitalizeFirstLetter(method.brand))}
                />
                <p>{method.brand.toUpperCase()}</p>
                <p>{method.number}</p>
                {method.active && (
                  <p id={styles["active-method"]}>
                    <Check /> Active
                  </p>
                )}
                <p>Valid till {method.exp}</p>
                <EllipsisVertical tabIndex={0} />
                <PaymentMethodDropdown method={method} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles["bottom-section"]}>
        <hr />
        <p>
          Add a payment method which can be used to pay for your future
          invoices. Maximum 3.
          {(stripeData?.methods.length || 0) < 3 ? (
            <Link
              onClick={linkClick}
              target="_blank"
              href="/add-payment-method"
            >
              Add method
            </Link>
          ) : (
            <span>Limit reached</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default BillingCardDetails;

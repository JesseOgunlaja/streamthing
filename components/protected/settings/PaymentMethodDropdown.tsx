import {
  changeActiveMethod,
  removePaymentMethod,
} from "@/actions/stripe/payment-methods";
import { promiseToast } from "@/lib/lib";
import { PaymentMethod } from "@/lib/types";
import styles from "@/styles/protected/settings/page.module.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useStripeData } from "./StripeDataProvider";

interface PropsType {
  method: PaymentMethod;
}

const PaymentMethodDropdown = ({ method }: PropsType) => {
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { refresh } = useStripeData();

  useEffect(() => {
    const updatePosition = () => {
      const dropdownElement = dropdownRef.current!;
      const menuElement = dropdownElement.previousSibling as HTMLElement;
      const rect = menuElement.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 10,
        right: window.innerWidth - rect.right + 10,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  function setMethodAsActive() {
    if (method.active) {
      return toast.error("This payment method is already active");
    }

    const promise = new Promise((resolve, reject) => {
      changeActiveMethod(method.id).then((data) => {
        const { message, ok } = data;

        if (ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise, {
      successFunction: refresh,
    });
  }

  function removeMethod() {
    if (method.active) {
      return toast.error("You can't delete your active payment method");
    }

    const promise = new Promise((resolve, reject) => {
      removePaymentMethod(method.id).then((data) => {
        const { message, ok } = data;

        if (ok) resolve(message);
        else reject(message);
      });
    });

    promiseToast(promise, {
      successFunction: refresh,
    });
  }

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      style={{
        top: `${dropdownPosition.top}px`,
        right: `${dropdownPosition.right}px`,
      }}
    >
      <button onClick={setMethodAsActive}>Set as active</button>
      <button onClick={removeMethod}>Remove</button>
    </div>
  );
};

export default PaymentMethodDropdown;

"use client";

import { getStripeUserData } from "@/actions/stripe/get-user";
import {
  Children,
  GenericFunction,
  PaymentMethod,
  UserType,
} from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

interface PropsType {
  user: UserType;
  children: Children;
}

interface BaseContext {
  refresh: GenericFunction;
}

interface StripeData {
  methods: PaymentMethod[];
  subscription: {
    renewing: string;
  };
}

interface DefinedStripeContext extends BaseContext {
  isLoading: false;
  data: StripeData;
}

interface UndefinedStripeContext extends BaseContext {
  isLoading: true;
  data: null;
}

type StripeDataContextType = DefinedStripeContext | UndefinedStripeContext;

const StripeDataContext = createContext({
  isLoading: true,
  data: null,
} as StripeDataContextType);
export const useStripeData = () => useContext(StripeDataContext);

const StripeDataProvider = ({ user, children }: PropsType) => {
  const [context, setContext] = useState<StripeDataContextType>({
    isLoading: true,
    refresh,
    data: null,
  });

  useEffect(() => {
    getStripeUserData(
      user.stripe_customer_id,
      user.stripe_subscription_id
    ).then((data) => {
      setContext({
        data,
        refresh,
        isLoading: false,
      });
    });
  }, []);

  function refresh() {
    getStripeUserData(
      user.stripe_customer_id,
      user.stripe_subscription_id
    ).then((data) => {
      setContext({
        data,
        refresh,
        isLoading: false,
      });
    });
  }

  return (
    <StripeDataContext.Provider value={context}>
      {children}
    </StripeDataContext.Provider>
  );
};

export default StripeDataProvider;

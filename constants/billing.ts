export const stripePricingTokens = {
  Startup: {
    monthly: "price_1QmCkNRxbjJYXH6tY2WIc2JD",
    annual: "price_1QmCkNRxbjJYXH6tnNip8S67",
  },
  Premium: {
    monthly: "price_1QmCkJRxbjJYXH6tpM5z3SZH",
    annual: "price_1QmCkJRxbjJYXH6tL1kt69js",
  },
  Enterprise: {
    monthly: "price_1QmCkPRxbjJYXH6tyeLGCIXj",
    annual: "price_1QmCkPRxbjJYXH6t4WFZX5E7",
  },
};

export type BillingPlan = keyof typeof stripePricingTokens;
export type BillingMethod = "monthly" | "annual";
export type StripeClientSecrets = typeof stripePricingTokens;

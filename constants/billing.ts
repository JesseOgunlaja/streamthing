export const stripePricingTokens = {
  Startup: "price_1S0ju0RxbjJYXH6tiK1AYB8Y",
  Premium: "price_1S0jvwRxbjJYXH6tB5ptSbfA",
};

export type BillingPlan = keyof typeof stripePricingTokens;
export type StripeClientSecrets = typeof stripePricingTokens;

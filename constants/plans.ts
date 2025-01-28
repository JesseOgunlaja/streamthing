import { Building2, Gem, Star, Store } from "lucide-react";

export const subscriptionPlans = {
  Hobby: {
    title: "Hobby",
    monthlyPrice: "0",
    annualPrice: "0",
    description:
      "The perfect plan for enthusiasts wishing to make small projects.",
    limits: {
      connections: 1000,
      messages: 100000,
      maxMessageSize: 15,
      servers: 1,
    },
    Logo: Star,
  },
  Startup: {
    title: "Startup",
    monthlyPrice: "14.99",
    annualPrice: "150",
    description: "The perfect plan for small production ready apps.",
    limits: {
      connections: 10000,
      messages: 500000,
      maxMessageSize: 15,
      servers: "Unlimited",
    },
    Logo: Store,
  },
  Premium: {
    title: "Premium",
    monthlyPrice: "39.99",
    annualPrice: "400",
    description: "The perfect plan for those wishing to venture further.",
    limits: {
      connections: 25000,
      messages: 1000000,
      maxMessageSize: 15,
      servers: "Unlimited",
    },
    Logo: Gem,
  },
  Enterprise: {
    title: "Enterprise",
    monthlyPrice: "99.99",
    annualPrice: "1000",
    description: "For making massive real-world ready applications.",
    limits: {
      connections: 100000,
      messages: 5000000,
      maxMessageSize: 15,
      servers: "Unlimited",
    },
    Logo: Building2,
  },
} as const;

export const subscriptionPlansArray = Object.values(subscriptionPlans);
export type PlanType = keyof typeof subscriptionPlans;

import { Gem, Star, Store } from "lucide-react";

export const subscriptionPlans = {
  Hobby: {
    title: "Hobby",
    monthlyPrice: "0",
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
    monthlyPrice: "9.99",
    description: "The perfect plan for small production ready apps.",
    limits: {
      connections: 10000,
      messages: 1000000,
      maxMessageSize: 15,
      servers: "Unlimited",
    },
    Logo: Store,
  },
  Premium: {
    title: "Premium",
    monthlyPrice: "19.99",
    description: "The perfect plan for those wishing to venture further.",
    limits: {
      connections: 50000,
      messages: 5000000,
      maxMessageSize: 15,
      servers: "Unlimited",
    },
    Logo: Gem,
  },
} as const;

export const subscriptionPlansArray = Object.values(subscriptionPlans);
export type PlanType = keyof typeof subscriptionPlans;

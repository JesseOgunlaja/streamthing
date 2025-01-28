import stripe from "stripe";
import { env } from "./env";

export type { Stripe as StripeTypes } from "stripe";
export const stripeInstance = new stripe(env.STRIPE_SECRET_KEY);

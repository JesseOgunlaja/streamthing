import { Redis } from "@upstash/redis";
import { env } from "./env";
import { UserType } from "./types";

export const redis = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
});

export const redis_ratelimit = new Redis({
  url: env.REDIS_RATELIMIT_URL,
  token: env.REDIS_RATELIMIT_TOKEN,
});

export const redis_stripe = new Redis({
  url: env.REDIS_STRIPE_URL,
  token: env.REDIS_STRIPE_TOKEN,
});

export const redis_temp = new Redis({
  url: env.REDIS_TEMP_URL,
  token: env.REDIS_TEMP_TOKEN,
});

export const redis_sessions = new Redis({
  url: env.REDIS_SESSIONS_URL,
  token: env.REDIS_SESSIONS_TOKEN,
});

export async function getUserByEmail(email: string) {
  return (await redis.json.get(`user-${email}`)) as UserType | undefined;
}

import { Redis } from "@upstash/redis";
import { env } from "./env";
import { UserType } from "./types";

export const kv = {
  main: new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
  }),
  stripe: new Redis({
    url: env.REDIS_STRIPE_URL,
    token: env.REDIS_STRIPE_TOKEN,
  }),
  temp: new Redis({
    url: env.REDIS_TEMP_URL,
    token: env.REDIS_TEMP_TOKEN,
  }),
  sessions: new Redis({
    url: env.REDIS_SESSIONS_URL,
    token: env.REDIS_SESSIONS_TOKEN,
  }),
};

export async function getUserByEmail(email: string) {
  return (await kv.main.json.get(`user-${email}`)) as UserType | undefined;
}

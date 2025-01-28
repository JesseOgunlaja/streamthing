import { Ratelimit } from "@upstash/ratelimit";
import { redis_ratelimit } from "./redis";
import { getIP } from "./server-utils";
import { GenericFunction, GenericObject } from "./types";

interface RateLimitConfig<T = Record<string, unknown>> {
  name: string;
  limit: number;
  duration: number;
  errorResponse: T;
  limitOnErrorsOnly?: boolean;
}

export class RateLimitError extends Error {
  constructor(public _response: unknown) {
    super("Rate limit exceeded");
    this.name = "Ratelimit Error";
  }
}

export async function rateLimitByIP<F extends GenericObject>(
  config: RateLimitConfig<F>
): Promise<F | null> {
  const ip = await getIP();
  return rateLimitByKey(() => ip, config);
}

export async function rateLimitByKey<F extends GenericObject>(
  keyExtractor: GenericFunction<string>,
  config: RateLimitConfig<F>
): Promise<F | null> {
  const key = keyExtractor();
  const isRateLimited = await checkIfRateLimited(key, config);

  if (isRateLimited) {
    return config.errorResponse;
  }

  if (!config.limitOnErrorsOnly) {
    await incrementRateLimitCount(key, config);
  }

  return null;
}

export async function incrementRateLimitCount(
  key: string,
  config: RateLimitConfig
) {
  const entryKey = `${key}-${config.name}`;

  const rateLimit = new Ratelimit({
    redis: redis_ratelimit,
    limiter: Ratelimit.fixedWindow(config.limit, `${config.duration} m`),
  });

  await rateLimit.limit(entryKey);
}

export async function checkIfRateLimited(
  key: string,
  config: RateLimitConfig
): Promise<boolean> {
  const entryKey = `${key}-${config.name}`;

  const rateLimit = new Ratelimit({
    redis: redis_ratelimit,
    limiter: Ratelimit.fixedWindow(config.limit, `${config.duration} m`),
  });

  const { remaining } = await rateLimit.getRemaining(entryKey);

  return remaining < 1;
}

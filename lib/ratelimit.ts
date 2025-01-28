import { getIP } from "./server-utils";
import { GenericObject } from "./types";

interface RateLimitConfig<T = Record<string, unknown>> {
  name: string;
  limit: number;
  duration: number;
  errorResponse: T;
  limitOnErrorsOnly?: boolean;
  key: string;
}

interface RateLimitEntry {
  key: string;
  lastReset: number;
  count: number;
}

const rateLimitEntries: RateLimitEntry[] = [];

export class RateLimitError extends Error {
  constructor(public _response: unknown) {
    super("Rate limit exceeded");
    this.name = "Ratelimit Error";
  }
}

function incrementRateLimitCount(key: string, config: RateLimitConfig) {
  const entryKey = `${key}-${config.name}`;
  const currentEntry = rateLimitEntries.find((entry) => entry.key === entryKey);
  const rateLimitDuration = config.duration * 60 * 1000;

  if (!currentEntry) {
    rateLimitEntries.push({
      key: entryKey,
      lastReset: Date.now(),
      count: 1,
    });
    return;
  }

  const hasRateLimitExpired =
    Date.now() - currentEntry.lastReset > rateLimitDuration;
  if (hasRateLimitExpired) {
    currentEntry.count = 1;
    currentEntry.lastReset = Date.now();
    return;
  }

  currentEntry.count += 1;
}

function checkIfRateLimited(key: string, config: RateLimitConfig) {
  const entryKey = `${key}-${config.name}`;
  const currentEntry = rateLimitEntries.find((entry) => entry.key === entryKey);
  return currentEntry ? currentEntry.count >= config.limit : false;
}

export function rateLimit<F extends GenericObject>(config: RateLimitConfig<F>) {
  const key = config.key;
  const isRateLimited = checkIfRateLimited(key, config);

  if (isRateLimited) {
    throw new RateLimitError(config.errorResponse);
  }

  if (!config.limitOnErrorsOnly) {
    incrementRateLimitCount(key, config);
    return;
  }

  return {
    incrementOnError: () => {
      incrementRateLimitCount(key, config);
    },
  };
}

export async function rateLimitByIP<T extends GenericObject>(
  config: Omit<RateLimitConfig<T>, "key">
) {
  const ip = await getIP();
  rateLimit({ ...config, key: ip });
}

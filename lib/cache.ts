/* eslint-disable @typescript-eslint/no-explicit-any */
const globalCache = new Map();

interface CacheConfig {
  duration?: number;
  name?: string;
}

export function cache<T extends (..._args: any[]) => Promise<any>>(
  fn: T,
  config?: CacheConfig
) {
  const key = config?.name || fn.name;
  if (!globalCache.has(key)) globalCache.set(key, new Map());
  const cacheMap = globalCache.get(key);

  return async function (...params: Parameters<T>) {
    const cacheKey = `${params.join("BREAK")}`;
    const now = Date.now();
    const existingEntry = cacheMap.get(cacheKey);
    if (existingEntry?.expiry > now) return existingEntry.result;

    const result = await fn(...params);
    cacheMap.set(cacheKey, {
      result,
      expiry: now + (config?.duration ?? 5) * 1000,
    });
    globalCache.set(key, cacheMap);
    return result;
  } as T;
}

export function clearCache(key: string) {
  globalCache.delete(key);
}

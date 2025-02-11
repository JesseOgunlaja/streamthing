/* eslint-disable @typescript-eslint/no-explicit-any */
export function cache<T extends (..._args: any[]) => Promise<any>>(
  fn: T,
  duration?: number
) {
  if (duration) return cacheWithDuration(fn, duration) as T;
  else return cacheWithoutDuration(fn) as T;
}

export function cacheWithoutDuration<
  T extends (..._args: any[]) => Promise<any>,
>(fn: T) {
  const cacheMap = new Map();
  return async function (...params: Parameters<T>) {
    const cacheKey = `${params.join("BREAK")}`;
    if (cacheMap.has(cacheKey)) return cacheMap.get(cacheKey);

    const result = await fn(...params);
    cacheMap.set(cacheKey, result);
    return result;
  };
}

export function cacheWithDuration<T extends (..._args: any[]) => Promise<any>>(
  fn: T,
  duration: number
) {
  const cacheMap = new Map();
  return async function (...params: Parameters<T>) {
    const cacheKey = `${params.join("BREAK")}`;
    const now = Date.now();
    const existingEntry = cacheMap.get(cacheKey);
    if (existingEntry?.expiry > now) return existingEntry.result;

    const result = await fn(...params);
    cacheMap.set(cacheKey, { result, expiry: now + duration * 1000 });
    return result;
  };
}

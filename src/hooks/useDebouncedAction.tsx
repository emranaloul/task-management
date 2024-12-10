/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';

export function useDebouncedPromise<T extends (...args: any[]) => any>(fn: T) {
  const timerRef = useRef<number | null>(null);
  const delay = 400;
  const debouncedFunction = useCallback(
    (...args: Parameters<T>): Promise<ReturnType<T>> => {
      return new Promise((resolve, reject) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(async () => {
          try {
            const result = await Promise.resolve(fn(...args));
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, delay);
      });
    },
    [fn]
  );

  return debouncedFunction;
}

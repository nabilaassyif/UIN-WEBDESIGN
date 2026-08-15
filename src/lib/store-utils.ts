'use client';

import { useSyncExternalStore } from 'react';

/**
 * Minimal zustand-style store factory so the app doesn't need an extra
 * dependency just for the accessibility/theme widgets.
 *
 * Usage:
 *   const useMyStore = createStore<MyState>((set, get) => ({ ...initial state + actions }));
 *   const value = useMyStore((s) => s.someField);
 *   const whole = useMyStore(); // no selector -> whole state
 */
export function createStore<T extends object>(
  createState: (
    set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
    get: () => T
  ) => T
) {
  let state: T;
  const listeners = new Set<() => void>();

  const setState = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
    const next = typeof partial === 'function' ? (partial as (state: T) => Partial<T>)(state) : partial;
    state = { ...state, ...next };
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  state = createState(setState, getState);

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  function useStore<U = T>(selector: (state: T) => U = (s) => s as unknown as U): U {
    return useSyncExternalStore(
      subscribe,
      () => selector(state),
      () => selector(state)
    );
  }

  return useStore;
}

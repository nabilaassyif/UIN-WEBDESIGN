'use client';

import { useSyncExternalStore } from 'react';

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

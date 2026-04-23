'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { createStore, type StateCreator, type StoreApi } from 'zustand/vanilla';

// stateCreator returns only the client-only initial state, but its set/get
// see the FULL state (server fields included) so actions can refresh /
// patch / optimistically update server data too.
type StateInit<TServer extends object, TClient extends object> = (
  set: StoreApi<TServer & TClient>['setState'],
  get: StoreApi<TServer & TClient>['getState'],
  store: StoreApi<TServer & TClient>,
) => TClient;

// Per-page store factory. The loader fetches all server data; stateCreator
// declares client-only state + actions. Provider seeds via initialData
// (SSR) or invokes the loader itself (CSR fallback).
export function defineContextStore<TServer extends object, TClient extends object>(
  loader: () => Promise<TServer | null>,
  stateCreator: StateInit<TServer, TClient>,
) {
  type State = TServer & TClient;
  type Store = StoreApi<State>;
  const Ctx = createContext<Store | null>(null);

  function makeStore(seed: TServer | null): Store {
    const store = createStore<State>(((set, get, api) => stateCreator(set, get, api) as State) satisfies StateCreator<State>);
    if (seed) store.setState(seed as Partial<State>);
    return store;
  }

  function Provider({
    initialData,
    placeholder = null,
    children,
  }: {
    initialData: TServer | null;
    placeholder?: ReactNode;
    children: ReactNode;
  }) {
    const [store] = useState<Store>(() => makeStore(initialData));
    const [ready, setReady] = useState(!!initialData);

    useEffect(() => {
      if (initialData) return;
      let cancelled = false;
      loader().then((data) => {
        if (cancelled || !data) return;
        store.setState(data as Partial<State>);
        setReady(true);
      });
      return () => {
        cancelled = true;
      };
    }, [initialData, store]);

    if (!ready) return <>{placeholder}</>;
    return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
  }

  // Pareto-style destructure-subscribe. Only enumerable data keys install a
  // useSyncExternalStore — function-typed keys (actions) are stable refs and
  // returned directly. Consumers must destructure the same keys in the same
  // order every render (rules-of-hooks).
  function useStore(): State {
    const store = useContext(Ctx);
    if (!store) throw new Error('useStore must be used within its Provider');
    const state = store.getState() as Record<string, unknown>;

    return Object.entries(state).reduce((proxy, [key, value]) => {
      if (typeof value === 'function') {
        (proxy as Record<string, unknown>)[key] = value;
      } else {
        Object.defineProperty(proxy, key, {
          enumerable: true,
          get() {
            return useSyncExternalStore(
              store.subscribe,
              () => (store.getState() as Record<string, unknown>)[key],
              () => (store.getState() as Record<string, unknown>)[key],
            );
          },
        });
      }
      return proxy;
    }, {} as State);
  }

  return { Provider, useStore };
}

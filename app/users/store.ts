'use client';

import { defineContextStore } from '@/lib/defineContextStore';
import { loadUsers, type User } from '@/lib/api';

export interface UsersServer {
  users: User[];
  loadedAt: number;
}

interface UsersClient {
  query: string;
  setQuery: (q: string) => void;
}

export const { Provider, useStore } = defineContextStore<UsersServer, UsersClient>(
  loadUsers,
  (set, get) => ({
    query: '',
    setQuery: (q) => {
      if (get().query === q) return;
      set({ query: q });
    },
  }),
);

'use client';

import { defineContextStore } from '@/lib/defineContextStore';
import { loadArticles, type Article } from '@/lib/api';

export interface ArticlesServer {
  articles: Article[];
  featuredIds: number[];
  loadedAt: number;
}

interface ArticlesClient {
  showOnlyFeatured: boolean;
  toggleFeaturedFilter: () => void;
}

export const { Provider, useStore } = defineContextStore<ArticlesServer, ArticlesClient>(
  loadArticles,
  (set, get) => ({
    showOnlyFeatured: false,
    toggleFeaturedFilter: () => set({ showOnlyFeatured: !get().showOnlyFeatured }),
  }),
);

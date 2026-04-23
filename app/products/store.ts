'use client';

import { defineContextStore } from '@/lib/defineContextStore';
import { loadProducts, type Product, type Category } from '@/lib/api';

export interface ProductsServer {
  products: Product[];
  categories: Category[];
  loadedAt: number;
}

interface ProductsClient {
  selectedCategoryId: number | null;
  selectCategory: (id: number | null) => void;
}

export const { Provider, useStore } = defineContextStore<ProductsServer, ProductsClient>(
  loadProducts,
  (set, get) => ({
    selectedCategoryId: null,
    selectCategory: (id) => {
      if (get().selectedCategoryId === id) return;
      set({ selectedCategoryId: id });
    },
  }),
);

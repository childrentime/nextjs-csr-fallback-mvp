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
  buyOne: (productId: number) => void;
}

export const { Provider, useStore } = defineContextStore<ProductsServer, ProductsClient>(
  loadProducts,
  (set, get) => ({
    selectedCategoryId: null,
    selectCategory: (id) => {
      if (get().selectedCategoryId === id) return;
      set({ selectedCategoryId: id });
    },
    // Action mutates the `products` array — a server-side field. Possible
    // because StateInit's set/get are typed for TServer & TClient.
    buyOne: (productId) =>
      set({
        products: get().products.map((p) =>
          p.id === productId && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p,
        ),
      }),
  }),
);

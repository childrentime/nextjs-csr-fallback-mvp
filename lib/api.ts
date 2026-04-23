import { CSR_HEADER, CSR_ON } from './csr-constants';

// Server uses internal DNS (k8s service / sidecar / loopback); browser uses
// public domain. Set INTERNAL_API_URL + NEXT_PUBLIC_API_URL in production.
const INTERNAL_API_URL = process.env.INTERNAL_API_URL ?? 'http://localhost:4000';
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function call<T>(path: string): Promise<T> {
  const baseUrl = typeof window === 'undefined' ? INTERNAL_API_URL : PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API ${res.status} ${path}`);
  return res.json();
}

export type Product = { id: number; name: string; price: number; stock: number; categoryId: number };
export type Category = { id: number; name: string };
export type User = { id: number; name: string; email: string; role: string };
export type Article = { id: number; title: string; author: string; publishedAt: string };

export const fetchProducts = (): Promise<{ products: Product[] }> => call('/products');
export const fetchCategories = (): Promise<{ categories: Category[] }> => call('/categories');
export const fetchUsers = (): Promise<{ users: User[] }> => call('/users');
export const fetchArticles = (): Promise<{ articles: Article[] }> => call('/articles');
export const fetchFeatured = (): Promise<{ ids: number[] }> => call('/featured');

// Page loaders. Server-side with `?__csr` returns null (layout sends null
// to <Provider>, which mounts blank, then store refetches client-side).
function createLoader<T>(fetcher: () => Promise<T>): () => Promise<T | null> {
  return async () => {
    if (typeof window === 'undefined') {
      const { headers } = await import('next/headers');
      if ((await headers()).get(CSR_HEADER) === CSR_ON) return null;
    }
    return fetcher();
  };
}

export const loadProducts = createLoader(async () => {
  const [p, c] = await Promise.all([fetchProducts(), fetchCategories()]);
  return { products: p.products, categories: c.categories, loadedAt: Date.now() };
});

export const loadUsers = createLoader(async () => {
  const u = await fetchUsers();
  return { users: u.users, loadedAt: Date.now() };
});

export const loadArticles = createLoader(async () => {
  const [a, f] = await Promise.all([fetchArticles(), fetchFeatured()]);
  return { articles: a.articles, featuredIds: f.ids, loadedAt: Date.now() };
});

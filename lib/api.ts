import { CSR_HEADER, CSR_ON } from './csr-constants';

// Same-origin /api routes co-deployed with the Next.js app. Server-side
// fetch needs an absolute URL; client-side uses relative paths.
function baseUrl(): string {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3030}`;
}

async function call<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl()}/api${path}`, { cache: 'no-store' });
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
// to <Provider>, which mounts the placeholder, then store refetches client-side).
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

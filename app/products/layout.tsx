import { loadProducts } from '@/lib/api';
import { Provider } from './store';
import Placeholder from './placeholder';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const initialData = await loadProducts();
  return (
    <Provider initialData={initialData} placeholder={<Placeholder />}>
      {children}
    </Provider>
  );
}

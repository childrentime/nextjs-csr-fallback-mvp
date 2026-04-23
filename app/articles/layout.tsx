import { loadArticles } from '@/lib/api';
import { Provider } from './store';
import Placeholder from './placeholder';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const initialData = await loadArticles();
  return (
    <Provider initialData={initialData} placeholder={<Placeholder />}>
      {children}
    </Provider>
  );
}

'use client';

import { useMemo } from 'react';
import { useStore } from './store';
import { list, row, meta } from '../_components/styles';

export default function Page() {
  const { products, categories, selectedCategoryId, selectCategory } = useStore();

  const filtered = useMemo(
    () => (selectedCategoryId ? products.filter((p) => p.categoryId === selectedCategoryId) : products),
    [products, selectedCategoryId],
  );

  return (
    <section>
      <Meta />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button onClick={() => selectCategory(null)} style={tag(selectedCategoryId === null)}>
          全部
        </button>
        {categories.map((c) => (
          <button key={c.id} onClick={() => selectCategory(c.id)} style={tag(selectedCategoryId === c.id)}>
            {c.name}
          </button>
        ))}
      </div>
      <ul style={list}>
        {filtered.map((p) => (
          <li key={p.id} style={row}>
            <span>{p.name}</span>
            <span style={{ color: '#fbbf24' }}>¥{p.price}</span>
            <span style={{ color: '#9ca3af', fontSize: 12 }}>剩 {p.stock}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Independent consumer reads only loadedAt + counts; filter button clicks
// don't re-render it (destructure-subscribe).
function Meta() {
  const { loadedAt, products, categories } = useStore();
  return (
    <div style={meta}>
      取数 {new Date(loadedAt).toLocaleTimeString()} · {products.length} 个商品 / {categories.length} 个分类
    </div>
  );
}

const tag = (active: boolean): React.CSSProperties => ({
  padding: '4px 10px',
  borderRadius: 999,
  background: active ? '#2563eb' : '#1f2937',
  color: active ? '#fff' : '#cbd5e1',
  fontSize: 12,
  border: 'none',
  cursor: 'pointer',
});

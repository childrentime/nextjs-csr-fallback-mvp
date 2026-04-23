'use client';

import { useMemo } from 'react';
import { useStore } from './store';
import { list, row, meta } from '../_components/styles';

export default function Page() {
  const { articles, featuredIds, loadedAt, showOnlyFeatured, toggleFeaturedFilter } = useStore();

  const featured = useMemo(() => new Set(featuredIds), [featuredIds]);
  const visible = useMemo(
    () => (showOnlyFeatured ? articles.filter((a) => featured.has(a.id)) : articles),
    [articles, showOnlyFeatured, featured],
  );

  return (
    <section>
      <div style={meta}>
        取数 {new Date(loadedAt).toLocaleTimeString()} · 共 {articles.length} 篇 / 推荐 {featuredIds.length} 篇
      </div>
      <label style={toggle}>
        <input type="checkbox" checked={showOnlyFeatured} onChange={toggleFeaturedFilter} />
        <span>只看推荐</span>
      </label>
      <ul style={list}>
        {visible.map((a) => (
          <li key={a.id} style={row}>
            <span>
              {featured.has(a.id) && <span style={badge}>推荐</span>}
              {a.title}
            </span>
            <span style={{ color: '#9ca3af', fontSize: 12 }}>{a.author}</span>
            <span style={{ color: '#9ca3af', fontSize: 12 }}>{a.publishedAt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const toggle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  marginBottom: 12,
  fontSize: 13,
  color: '#cbd5e1',
  cursor: 'pointer',
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 6px',
  borderRadius: 4,
  background: '#7c2d12',
  color: '#fed7aa',
  fontSize: 10,
  marginRight: 6,
  verticalAlign: 'middle',
};

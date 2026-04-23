import type { CSSProperties } from 'react';

export const card: CSSProperties = {
  padding: 12,
  borderRadius: 8,
  background: '#111827',
  border: '1px solid #1f2937',
  marginBottom: 16,
  fontSize: 14,
  lineHeight: 1.6,
};

export const list: CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'grid',
  gap: 8,
};

export const row: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  gap: 12,
  alignItems: 'center',
  padding: '12px 16px',
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 6,
};

export const meta: CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  marginBottom: 8,
};

export const empty: CSSProperties = {
  padding: 24,
  textAlign: 'center',
  background: '#111827',
  borderRadius: 8,
  color: '#fbbf24',
};

// Skeleton primitive: a gray bar of given width/height for placeholder UIs.
export const bar = (width: number | string, height: number | string = 14): CSSProperties => ({
  display: 'inline-block',
  width,
  height,
  background: '#1f2937',
  borderRadius: 4,
});

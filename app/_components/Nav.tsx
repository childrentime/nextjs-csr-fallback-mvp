'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { CSSProperties } from 'react';
import { CSR_QUERY, CSR_ON } from '@/lib/csr-constants';

const pages = [
  { href: '/', label: '首页' },
  { href: '/products', label: '商品 (2 接口)' },
  { href: '/users', label: '用户 (1 接口)' },
  { href: '/articles', label: '文章 (2 接口)' },
];

const csrSuffix = `?${CSR_QUERY}=${CSR_ON}`;

export default function Nav() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const isCsr = sp.has(CSR_QUERY);

  // Preserve mode across page navigations.
  const decorate = (href: string) => (isCsr ? `${href}${csrSuffix}` : href);
  const toggleHref = isCsr ? pathname : `${pathname}${csrSuffix}`;

  // Page links use <Link> (soft navigation, fast). Mode toggle uses <a>
  // (full reload) so the SSR↔CSR transition is visibly a fresh request
  // rather than a client-side route swap.
  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', gap: 8 }}>
        {pages.map((p) => (
          <Link key={p.href} href={decorate(p.href)} style={pathname === p.href ? activeLink : link}>
            {p.label}
          </Link>
        ))}
      </div>
      <a href={toggleHref} style={toggleStyle(isCsr)}>
        {isCsr ? '🟡 CSR · 点击切回 SSR' : '🟢 SSR · 点击切到 CSR 降级'}
      </a>
    </nav>
  );
}

const navStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  paddingBottom: 12,
  borderBottom: '1px solid #1f2937',
};

const link: CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  background: '#1f2937',
  color: '#fff',
  textDecoration: 'none',
  fontSize: 14,
};

const activeLink: CSSProperties = { ...link, background: '#2563eb' };

const toggleStyle = (csr: boolean): CSSProperties => ({
  padding: '6px 12px',
  borderRadius: 6,
  background: csr ? '#78350f' : '#064e3b',
  color: '#fff',
  textDecoration: 'none',
  fontSize: 13,
});

import { Suspense } from 'react';
import Nav from './_components/Nav';
import ModeBanner from './_components/ModeBanner';

export const metadata = { title: 'SSR / CSR Fallback MVP' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          margin: 0,
          padding: 24,
          background: '#0b0d12',
          color: '#e5e7eb',
        }}
      >
        <main style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{ marginTop: 0 }}>SSR / CSR Fallback Demo</h1>
          <Suspense fallback={null}>
            <Nav />
          </Suspense>
          <ModeBanner />
          {children}
        </main>
      </body>
    </html>
  );
}

import { NextResponse, type NextRequest } from 'next/server';
import { CSR_QUERY, CSR_HEADER, CSR_ON } from '@/lib/csr-constants';

export function middleware(req: NextRequest) {
  if (!req.nextUrl.searchParams.has(CSR_QUERY)) return NextResponse.next();
  const headers = new Headers(req.headers);
  headers.set(CSR_HEADER, CSR_ON);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico).*)'],
};

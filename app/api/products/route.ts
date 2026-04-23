import { NextResponse } from 'next/server';
import { products, delay } from '@/lib/mock';

export async function GET() {
  await delay();
  return NextResponse.json({ products });
}

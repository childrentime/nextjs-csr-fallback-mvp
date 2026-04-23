import { NextResponse } from 'next/server';
import { categories, delay } from '@/lib/mock';

export async function GET() {
  await delay();
  return NextResponse.json({ categories });
}

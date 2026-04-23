import { NextResponse } from 'next/server';
import { articles, delay } from '@/lib/mock';

export async function GET() {
  await delay();
  return NextResponse.json({ articles });
}

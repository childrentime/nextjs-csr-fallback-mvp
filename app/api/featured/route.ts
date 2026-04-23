import { NextResponse } from 'next/server';
import { featured, delay } from '@/lib/mock';

export async function GET() {
  await delay();
  return NextResponse.json(featured);
}

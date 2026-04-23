import { NextResponse } from 'next/server';
import { users, delay } from '@/lib/mock';

export async function GET() {
  await delay();
  return NextResponse.json({ users });
}

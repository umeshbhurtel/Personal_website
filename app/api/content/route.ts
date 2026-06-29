export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getSiteContent, setSiteContent } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(await getSiteContent());
}

export async function PUT(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const current = await getSiteContent();
  await setSiteContent({ ...current, ...body });
  return NextResponse.json({ success: true });
}

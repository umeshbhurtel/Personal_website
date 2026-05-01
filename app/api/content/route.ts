import { NextResponse } from 'next/server';
import { getSiteContent, setSiteContent } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(getSiteContent());
}

export async function PUT(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const current = getSiteContent();
  setSiteContent({ ...current, ...body });
  return NextResponse.json({ success: true });
}

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getResearchData, setResearchData } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(await getResearchData());
}

export async function PUT(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  await setResearchData(body);
  return NextResponse.json({ success: true });
}

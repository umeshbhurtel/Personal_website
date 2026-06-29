export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getProjects, setProjects } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(await getProjects());
}

export async function PUT(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  await setProjects(body);
  return NextResponse.json({ success: true });
}

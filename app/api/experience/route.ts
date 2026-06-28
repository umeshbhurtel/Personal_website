import { NextResponse } from 'next/server';
import { getExperience, setExperience } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(getExperience());
}

export async function PUT(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  setExperience(body);
  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import { verifyAdminPassword, createSessionCookie, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 });
  }

  const ok = await verifyAdminPassword(password);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = createSessionCookie();
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE_NAME(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return res;
}

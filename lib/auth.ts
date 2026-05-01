import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const SESSION_COOKIE = 'ub_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  return process.env.SESSION_SECRET ?? 'fallback-insecure-secret-change-me';
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

function createToken(): string {
  const ts = Date.now().toString();
  return `${ts}.${sign(ts)}`;
}

function verifyToken(token: string): boolean {
  const [ts, sig] = token.split('.');
  if (!ts || !sig) return false;
  if (Date.now() - parseInt(ts, 10) > SESSION_TTL_MS) return false;
  const expected = sign(ts);
  try {
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  const cookie = cookies().get(SESSION_COOKIE);
  if (!cookie) return false;
  return verifyToken(cookie.value);
}

export function createSessionCookie(): string {
  return createToken();
}

export function SESSION_COOKIE_NAME(): string {
  return SESSION_COOKIE;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const stored = process.env.ADMIN_PASSWORD ?? 'umesh2025';
  // Support both plain text (for .env.local) and bcrypt hash
  if (stored.startsWith('$2')) {
    return bcrypt.compare(password, stored);
  }
  return password === stored;
}

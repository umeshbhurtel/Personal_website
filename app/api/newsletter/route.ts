import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Subscriber { email: string; createdAt: string; }

const FILE = path.join(process.cwd(), 'data', 'newsletter.json');

function read(): Subscriber[] {
  if (!fs.existsSync(FILE)) return [];
  try { return JSON.parse(fs.readFileSync(FILE, 'utf-8')); } catch { return []; }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email?.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 });
    }
    const list = read();
    if (list.find((s) => s.email === email.trim())) {
      return NextResponse.json({ message: 'Already subscribed!' });
    }
    list.push({ email: email.trim(), createdAt: new Date().toISOString() });
    fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

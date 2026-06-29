export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';
import { getCVData, setCVData } from '@/lib/db';

export async function GET() {
  return NextResponse.json(await getCVData());
}

export async function POST(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cv');
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, 'cv.pdf');
  await writeFile(filePath, buffer);

  const cvData = { path: '/uploads/cv/cv.pdf', originalName: file.name, uploadedAt: new Date().toISOString() };
  await setCVData(cvData);

  return NextResponse.json(cvData);
}

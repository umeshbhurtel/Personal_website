import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';

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

  // Sanitize filename
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'case-studies');
  const filePath = path.join(uploadDir, filename);

  await writeFile(filePath, buffer);

  return NextResponse.json({
    pdfPath: `/uploads/case-studies/${filename}`,
    pdfName: file.name,
  });
}

import { NextResponse } from 'next/server';
import { getAllCaseStudies, saveCaseStudy } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const list = getAllCaseStudies().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, slug, description, tags, pdfPath, pdfName, published } = body;

  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
  }

  const cs = {
    id: crypto.randomUUID(),
    title: title.trim(),
    slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
    description: description?.trim() ?? '',
    tags: Array.isArray(tags) ? tags : [],
    pdfPath: pdfPath ?? '',
    pdfName: pdfName ?? '',
    published: Boolean(published),
    createdAt: new Date().toISOString(),
  };

  saveCaseStudy(cs);
  return NextResponse.json(cs, { status: 201 });
}

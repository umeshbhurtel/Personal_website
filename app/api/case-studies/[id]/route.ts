import { NextResponse } from 'next/server';
import { getCaseStudyById, saveCaseStudy, deleteCaseStudy } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const cs = await getCaseStudyById(params.id);
  if (!cs) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cs);
}

export async function PUT(req: Request, { params }: Params) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await getCaseStudyById(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const updated = {
    ...existing,
    title: body.title?.trim() ?? existing.title,
    slug: body.slug?.trim().toLowerCase().replace(/\s+/g, '-') ?? existing.slug,
    description: body.description?.trim() ?? existing.description,
    tags: Array.isArray(body.tags) ? body.tags : existing.tags,
    pdfPath: body.pdfPath ?? existing.pdfPath,
    pdfName: body.pdfName ?? existing.pdfName,
    published: body.published !== undefined ? Boolean(body.published) : existing.published,
  };

  await saveCaseStudy(updated);
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await deleteCaseStudy(params.id);
  return NextResponse.json({ success: true });
}

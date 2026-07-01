export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getBlogPostById, saveBlogPost, deleteBlogPost } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const post = await getBlogPostById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: Params) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await getBlogPostById(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const updated = {
    ...existing,
    title: body.title?.trim() ?? existing.title,
    slug: body.slug?.trim().toLowerCase().replace(/\s+/g, '-') ?? existing.slug,
    excerpt: body.excerpt?.trim() ?? existing.excerpt,
    content: body.content ?? existing.content,
    tags: Array.isArray(body.tags) ? body.tags : existing.tags,
    readTime: body.readTime?.trim() ?? existing.readTime,
    published: body.published !== undefined ? Boolean(body.published) : existing.published,
    date: body.date ?? existing.date,
  };

  await saveBlogPost(updated);
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await deleteBlogPost(params.id);
  return NextResponse.json({ success: true });
}

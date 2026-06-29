export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getAllBlogPosts, saveBlogPost } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const posts = (await getAllBlogPosts()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, content, tags, readTime, published, date } = body;

  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
  }

  const post = {
    id: crypto.randomUUID(),
    title: title.trim(),
    slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
    excerpt: excerpt?.trim() ?? '',
    content: content?.trim() ?? '',
    tags: Array.isArray(tags) ? tags : [],
    readTime: readTime?.trim() ?? '5 min read',
    published: Boolean(published),
    date: date ?? new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  };

  await saveBlogPost(post);
  return NextResponse.json(post, { status: 201 });
}

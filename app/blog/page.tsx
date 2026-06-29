import Link from 'next/link';
import { getPublishedBlogPosts } from '@/lib/db';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog — Umesh Bhurtel',
  description: 'Research, technology, and global work trends. Written by Umesh Bhurtel.',
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-max flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Back home
          </Link>
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,229,176,0.3)', color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            UB
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-max">
          <div className="mb-14">
            <span className="section-label">Research Log</span>
            <h1 className="mt-4 mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              All <em style={{ color: 'var(--accent)' }}>Writing</em>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.75 }}>
              Technology, research methodology, global work trends, and what I&apos;m learning — no noise. Just insight.
            </p>
          </div>

          <div className="flex items-center justify-end mb-8">
            <span className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {posts.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="blog-card p-6 h-full flex flex-col cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{post.date}</span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="mb-3 flex-1" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>{post.title}</h2>
                    <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">{post.tags.map((tag) => <span key={tag} className="tag-chip">{tag}</span>)}</div>
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>Read <ArrowRight size={12} /></span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

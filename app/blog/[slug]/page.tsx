import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPostBySlug } from '@/lib/db';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Umesh Bhurtel`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  };
}

export default function PostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post || !post.published) notFound();

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container-max flex items-center justify-between h-16">
          <Link href="/blog" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> All posts
          </Link>
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,229,176,0.3)', color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            UB
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-max" style={{ maxWidth: '760px' }}>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => <span key={tag} className="tag-chip">{tag}</span>)}
          </div>

          <h1 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-primary)', lineHeight: 1.2 }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 pb-8 mb-10" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              <Calendar size={14} /> {post.date}
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              <Clock size={14} /> {post.readTime}
            </div>
            <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              by <span style={{ color: 'var(--text-secondary)' }}>Umesh Bhurtel</span>
            </span>
          </div>

          <article className="prose-custom">
            <MDXRemote source={post.content} />
          </article>

          <div className="mt-14 pt-8 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
            <Link href="/blog" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Back to blog
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm flex items-center gap-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                <Share2 size={14} /> Share:
              </span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://umeshbhurtel.com/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-lg hover:opacity-80" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                X / Twitter
              </a>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl flex items-start gap-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold" style={{ background: 'var(--accent-dim)', border: '2px solid rgba(0,229,176,0.3)', color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
              UB
            </div>
            <div>
              <div className="font-medium mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>Umesh Bhurtel</div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                IT Researcher &amp; R&D Associate at Logictive Solutions. Based in Bhaktapur, Nepal.
              </p>
              <a href="https://linkedin.com/in/umeshbhurtel-8b7b04299" target="_blank" rel="noopener noreferrer" className="inline-flex mt-2 text-xs hover:opacity-80" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                Connect on LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

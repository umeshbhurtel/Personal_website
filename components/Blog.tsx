'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/db';

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="py-20 md:py-28 lg:py-36" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          06 / Blog
        </motion.span>

        <div className="flex flex-wrap items-end justify-between gap-4 mt-4 mb-4">
          <motion.h2
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Latest <em style={{ color: 'var(--accent)' }}>writing.</em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium transition-colors group"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
            >
              All posts
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="mb-10 max-w-lg"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          I write about technology, research methodology, global work trends, and what I&apos;m
          learning — twice a month. No noise. Just insight.
        </motion.p>

        {posts.length === 0 && (
          <div className="py-12 text-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
            No published posts yet. Add posts from the{' '}
            <a href="/admin/blog" style={{ color: 'var(--accent)', textDecoration: 'none' }}>admin panel</a>.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <motion.article
                  className="blog-card p-6 h-full flex flex-col cursor-pointer"
                  whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.78rem' }}>
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.78rem' }}>
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-3 flex-1" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {post.title}
                  </h3>

                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          {/* Glow accent */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: 300, height: 1,
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            opacity: 0.4, pointerEvents: 'none',
          }} />

          <h3 className="mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
            Stay in the loop
          </h3>
          <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
            Twice a month. Research, tech, and what I&apos;m learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            />
            <button className="btn-primary" style={{ borderRadius: 12, padding: '0.6rem 1.25rem' }}>
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

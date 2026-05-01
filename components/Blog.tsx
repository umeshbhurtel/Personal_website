'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

const posts = [
  {
    slug: 'precision-farming-nepal',
    date: 'April 15, 2026',
    title: "Why Nepal's Smallholder Farmers Need Precision Agriculture Now",
    tags: ['AgriTech', 'Nepal', 'Research'],
    readTime: '6 min read',
    excerpt:
      "Nepal's agricultural sector employs over 60% of its population, yet productivity remains far below regional averages. Precision farming technologies — IoT soil sensors, drone monitoring, satellite NDVI mapping — are no longer just for large-scale farms. Here's what the research shows, and why timing matters.",
  },
  {
    slug: 'taas-vs-eor-global-talent',
    date: 'April 1, 2026',
    title: 'TaaS vs. EOR: What Global Companies Get Wrong About Remote Talent',
    tags: ['Remote Work', 'TaaS', 'Global Teams'],
    readTime: '5 min read',
    excerpt:
      'Technology-as-a-Service and Employer-of-Record models are reshaping how global companies access talent. But most hiring managers conflate the two — and it\'s costing them speed, compliance, and quality. Here\'s how to think about it clearly.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Blog() {
  return (
    <section id="blog" className="py-28 md:py-36" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          06 / Blog
        </motion.span>

        <div className="flex flex-wrap items-end justify-between gap-4 mt-4 mb-4">
          <motion.h2
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Latest <em style={{ color: 'var(--accent)' }}>writing.</em>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              All posts <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="mb-10 max-w-lg"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          I write about technology, research methodology, global work trends, and what I&apos;m
          learning — twice a month. No noise. Just insight.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article className="blog-card p-6 h-full flex flex-col cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      {post.date}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    className="mb-3 flex-1"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.35 }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm mb-4"
                    style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                    <span
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}
                    >
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="mt-12 rounded-xl p-8 text-center"
          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3
            className="mb-2"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-primary)' }}
          >
            Stay in the loop
          </h3>
          <p
            className="mb-6 text-sm"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            Twice a month. Research, tech, and what I&apos;m learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            />
            <button
              className="px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{
                background: 'var(--accent)',
                color: '#0A0A0F',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
              }}
            >
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

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import type { CaseStudy } from '@/lib/db';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  if (studies.length === 0) return null;

  return (
    <section id="case-studies" className="py-28 md:py-36" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          05 / Case Studies
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
            In-depth <em style={{ color: 'var(--accent)' }}>research.</em>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/case-studies"
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              All case studies <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studies.map((cs, i) => (
            <motion.div
              key={cs.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Link href={`/case-studies/${cs.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  className="card-hover rounded-xl p-6 h-full flex flex-col cursor-pointer"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,229,176,0.2)' }}
                    >
                      <FileText size={16} style={{ color: 'var(--accent)' }} />
                    </span>
                    <h3
                      className="flex-1"
                      style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.3 }}
                    >
                      {cs.title}
                    </h3>
                  </div>

                  {cs.description && (
                    <p className="text-sm mb-4 flex-1" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {cs.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                    <span
                      className="flex items-center gap-1 text-xs font-medium flex-shrink-0"
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
      </div>
    </section>
  );
}

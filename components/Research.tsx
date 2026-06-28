'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import type { ResearchData } from '@/lib/db';


export default function Research({ data }: { data: ResearchData }) {
  return (
    <section id="research" className="py-20 md:py-28 lg:py-36" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          04 / Research
        </motion.span>

        <motion.h2
          className="mt-4 mb-5"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          What I <em style={{ color: 'var(--accent)' }}>investigate.</em>
        </motion.h2>

        <motion.p
          className="mb-12 max-w-2xl"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.02rem' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Research is at the core of what I do. I approach problems with structured methodology —
          whether it&apos;s evaluating a technology market, writing a grant proposal, or analyzing
          global workforce trends.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {data.areas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
              style={{
                borderRadius: 14, padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderLeft: '2px solid var(--accent)',
                cursor: 'default',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,230,167,0.2), 0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,230,167,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start gap-4">
                <motion.span
                  className="text-2xl flex-shrink-0 mt-0.5"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {area.icon}
                </motion.span>
                <div>
                  <h3 className="mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    {area.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Award size={18} style={{ color: 'var(--accent)' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              Credentials &amp; Education
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                className="flex flex-col gap-3 p-4 sm:p-5 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(0,230,167,0.3)',
                  boxShadow: '0 0 0 1px rgba(0,230,167,0.1), 0 12px 32px rgba(0,0,0,0.4), 0 0 24px rgba(0,230,167,0.06)',
                  transition: { duration: 0.25 },
                }}
              >
                {/* Icon box */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'var(--accent-dim)',
                  border: '1px solid rgba(0,230,167,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                }}>
                  {cert.icon}
                </div>

                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                    {cert.label}
                  </div>
                  {cert.note && (
                    <div className="mt-1 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                      {cert.note}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

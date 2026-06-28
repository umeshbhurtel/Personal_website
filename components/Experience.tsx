'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import type { ExperienceItem } from '@/lib/db';

export default function Experience({ experiences }: { experiences: ExperienceItem[] }) {
  return (
    <section id="experience" className="py-20 md:py-28 lg:py-36" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          02 / Experience
        </motion.span>

        <motion.h2
          className="mt-4 mb-14"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Where I&apos;ve <em style={{ color: 'var(--accent)' }}>worked.</em>
        </motion.h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute"
            style={{
              left: '10px', top: 12, bottom: 12, width: 1,
              background: 'linear-gradient(to bottom, var(--accent), var(--border) 80%, transparent)',
            }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative pl-10 md:pl-14"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute"
                  style={{
                    left: 0, top: 6,
                    width: 21, height: 21, borderRadius: '50%',
                    background: exp.current ? 'var(--accent)' : 'var(--bg-card)',
                    border: `2px solid ${exp.current ? 'var(--accent)' : 'var(--text-muted)'}`,
                    zIndex: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {exp.current && (
                    <>
                      <span className="absolute timeline-dot-ping w-full h-full rounded-full" style={{ background: 'rgba(0,230,167,0.3)' }} />
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#09090B', display: 'block' }} />
                    </>
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, boxShadow: '0 0 0 1px rgba(0,230,167,0.25), 0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,230,167,0.08)' }}
                  transition={{ duration: 0.25 }}
                  style={{
                    borderRadius: 14, padding: '1.5rem 1.75rem',
                    background: 'var(--bg-card)',
                    border: `1px solid ${exp.current ? 'rgba(0,230,167,0.25)' : 'var(--border)'}`,
                    boxShadow: exp.current ? '0 0 30px rgba(0,230,167,0.04)' : 'none',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span style={{
                            padding: '0.15rem 0.6rem', borderRadius: 4,
                            fontSize: '0.7rem', fontWeight: 600,
                            background: 'var(--accent-dim)', color: 'var(--accent)',
                            fontFamily: 'var(--font-body)', border: '1px solid rgba(0,230,167,0.2)',
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            Current
                          </span>
                        )}
                      </div>
                      <div className="mt-1 font-medium" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col sm:text-right gap-3 sm:gap-1 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm sm:justify-end" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                        <Calendar size={12} /> {exp.period}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm sm:justify-end" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                        <MapPin size={12} /> {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-2">
                    {exp.points.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

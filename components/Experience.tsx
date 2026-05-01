'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Logictive Solutions',
    role: 'Associated Research & Development',
    period: 'May 2025 – Present',
    location: 'Bhaktapur, Nepal (Remote-capable)',
    current: true,
    points: [
      'Lead R&D initiatives across TaaS, EOR, and AI/ML domains',
      'Produce research documentation, all-hands presentations, and strategic content',
      'Conduct bid evaluations using structured Go/No-Go frameworks for global RFPs',
      'Contribute to LinkedIn thought leadership, product launches, and ISO 27001 processes',
      'Develop LinkedIn carousel content and infographics on global technology trends',
    ],
  },
  {
    company: 'Logictive Solutions',
    role: 'Research & Development Intern',
    period: 'Feb 2025 – Apr 2025',
    location: 'Kathmandu, Nepal',
    current: false,
    points: [
      'Supported R&D output including pitch decks and competitive analysis reports',
      'Assisted in UGC/influencer strategy content and Product Hunt campaigns',
      'Learned structured research documentation standards in a fast-paced tech environment',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-28 md:py-36"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          02 / Experience
        </motion.span>

        <motion.h2
          className="mt-4 mb-14"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Where I&apos;ve <em style={{ color: 'var(--accent)' }}>worked.</em>
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-3 md:left-5 top-0 bottom-0 w-px"
            style={{ background: 'var(--border)' }}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                className="relative pl-10 md:pl-16"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute top-1.5 flex items-center justify-center"
                  style={{
                    left: '0',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: exp.current ? 'var(--accent)' : 'var(--bg-secondary)',
                    border: `2px solid ${exp.current ? 'var(--accent)' : 'var(--border)'}`,
                    zIndex: 2,
                    marginLeft: '-4px',
                  }}
                >
                  {exp.current && (
                    <span
                      className="absolute w-2 h-2 rounded-full"
                      style={{ background: '#0A0A0F' }}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className="card-hover rounded-xl p-6 md:p-8"
                  style={{
                    background: 'var(--bg-primary)',
                    border: `1px solid ${exp.current ? 'rgba(0,229,176,0.2)' : 'var(--border)'}`,
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.2rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              background: 'var(--accent-dim)',
                              color: 'var(--accent)',
                              fontFamily: 'var(--font-body)',
                              border: '1px solid rgba(0,229,176,0.2)',
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <div
                        className="mt-1 font-medium"
                        style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                      >
                        {exp.company}
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div
                        className="flex items-center gap-1.5 justify-end text-sm"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                      >
                        <Calendar size={13} />
                        {exp.period}
                      </div>
                      <div
                        className="flex items-center gap-1.5 justify-end text-sm"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                      >
                        <MapPin size={13} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-2">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}
                      >
                        <span
                          className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full"
                          style={{ background: 'var(--accent)' }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

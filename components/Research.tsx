'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const researchAreas = [
  {
    icon: '🌾',
    title: 'AgriTech & Precision Farming',
    description:
      "Researching how IoT sensors, drone imagery, and satellite data can improve crop yields for Nepal's smallholder farming communities — where 60% of the population still depends on agriculture.",
  },
  {
    icon: '🤖',
    title: 'AI/ML Annotation & Data Pipelines',
    description:
      'Investigating practical applied AI: how quality training data is sourced, annotated, and validated — and what the global market for AI data services looks like for emerging economies.',
  },
  {
    icon: '🌐',
    title: 'Global Talent Models',
    description:
      'Studying Technology-as-a-Service and Employer-of-Record frameworks that enable remote talent acquisition across jurisdictions — with a focus on Nepal-to-West talent corridors.',
  },
  {
    icon: '💡',
    title: 'Decision Support Systems',
    description:
      'Exploring rule-based inference engines and expert systems for domains with limited digital penetration — insurance, agriculture policy, and public service delivery.',
  },
  {
    icon: '🖥️',
    title: 'Potential of a GPU Centre in Nepal',
    description:
      'Researching the economic and technical feasibility of establishing a shared GPU compute centre in Nepal — examining power infrastructure, cooling requirements, hydropower advantages, AI workload demand, and the potential to position Nepal as a regional hub for affordable ML training and inference services.',
  },
];

const certifications = [
  { label: 'PV Foundations Cohort #9', icon: '🏅' },
  { label: 'AWS Academy Cloud Foundations (Capstone-level)', icon: '☁️' },
  { label: 'B.Sc. (Hons.) IT — Asia Pacific University', note: 'In Progress, 2026', icon: '🎓' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Research() {
  return (
    <section id="research" className="py-28 md:py-36" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          04 / Research
        </motion.span>

        <motion.h2
          className="mt-4 mb-6"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What I <em style={{ color: 'var(--accent)' }}>investigate.</em>
        </motion.h2>

        <motion.p
          className="mb-12 max-w-2xl"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Research is at the core of what I do. I approach problems with structured methodology —
          whether it&apos;s evaluating a technology market, writing a grant proposal, or analyzing
          global workforce trends.
        </motion.p>

        {/* Research area cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {researchAreas.map((area, i) => (
            <motion.div
              key={area.title}
              className="card-hover rounded-xl p-6"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--accent)',
              }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{area.icon}</span>
                <div>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-primary)' }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Award size={18} style={{ color: 'var(--accent)' }} />
            <h3
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)' }}
            >
              Credentials &amp; Education
            </h3>
          </div>

          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.label}
                className="flex items-center gap-4 p-4 rounded-lg"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
              >
                <span className="text-xl">{cert.icon}</span>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                    {cert.label}
                  </div>
                  {cert.note && (
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
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

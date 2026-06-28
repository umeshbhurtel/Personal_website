'use client';

import { motion, type Variants } from 'framer-motion';
import type { SkillsData } from '@/lib/db';

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const pillVariant: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

function PillGroup({ skills }: { skills: string[] }) {
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {skills.map((skill) => (
        <motion.span key={skill} className="skill-pill" variants={pillVariant}>
          {skill}
        </motion.span>
      ))}
    </motion.div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <h3 className="mb-5 flex items-center gap-3" style={{
      fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)',
    }}>
      <span style={{ flexShrink: 0, width: 20, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
      {label}
    </h3>
  );
}

export default function Skills({ data }: { data: SkillsData }) {
  return (
    <section id="skills" className="py-20 md:py-28 lg:py-36" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          05 / Skills
        </motion.span>

        <motion.h2
          className="mt-4 mb-12"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          What I <em style={{ color: 'var(--accent)' }}>bring to the table.</em>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <SectionLabel label="AI, LLM & Data Tools" />
            <PillGroup skills={data.aiLlm} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <SectionLabel label="Research & Product" />
            <PillGroup skills={data.researchProduct} />
          </motion.div>
        </div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <SectionLabel label="Professional" />
          <PillGroup skills={data.professional} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <SectionLabel label="Languages" />
          <div className="flex flex-wrap gap-3">
            {data.languages.map(({ lang, level }) => (
              <motion.div
                key={lang}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                whileHover={{ borderColor: 'rgba(0,230,167,0.35)', y: -2, transition: { duration: 0.2 } }}
              >
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{lang}</span>
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  {level}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

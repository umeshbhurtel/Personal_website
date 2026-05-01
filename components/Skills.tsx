'use client';

import { motion } from 'framer-motion';

const aiLlmSkills = [
  'Prompt Engineering',
  'LLM Evaluation Methodology',
  'API Basics',
  'Python & R',
  'SQL',
  'Statistics',
  'Excel',
];

const researchProductSkills = [
  'Research Design',
  'Research Report Writing',
  'Product Analysis',
  'Product Framework',
];

const professionalSkills = [
  'Technical Writing',
  'Bid Evaluation',
  'Strategic Presentations',
  'Content Strategy',
  'Cross-Cultural Collaboration',
  'Project Management',
  'LinkedIn Thought Leadership',
  'Remote Team Coordination',
  'APA 7 Academic Writing',
  'Workshop Facilitation',
];

const languages = [
  { lang: 'English', level: 'Professional' },
  { lang: 'Nepali', level: 'Native' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function PillGroup({ skills, delay = 0 }: { skills: string[]; delay?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <motion.span
          key={skill}
          className="skill-pill"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: delay + i * 0.05 }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <h3
      className="mb-5 flex items-center gap-3"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}
    >
      <span className="flex-shrink-0 w-6 h-px" style={{ background: 'var(--accent)' }} />
      {label}
    </h3>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          05 / Skills
        </motion.span>

        <motion.h2
          className="mt-4 mb-12"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What I <em style={{ color: 'var(--accent)' }}>bring to the table.</em>
        </motion.h2>

        {/* Top row — AI/Tools + Research/Product */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <SectionLabel label="AI, LLM & Data Tools" />
            <PillGroup skills={aiLlmSkills} delay={0.2} />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <SectionLabel label="Research & Product" />
            <PillGroup skills={researchProductSkills} delay={0.26} />
          </motion.div>
        </div>

        {/* Professional */}
        <motion.div
          className="mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          <SectionLabel label="Professional" />
          <PillGroup skills={professionalSkills} delay={0.32} />
        </motion.div>

        {/* Languages */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <SectionLabel label="Languages" />
          <div className="flex flex-wrap gap-3">
            {languages.map(({ lang, level }) => (
              <div
                key={lang}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                  {lang}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{ background: 'var(--accent-dim)', color: 'var(--accent)', fontFamily: 'var(--font-body)' }}
                >
                  {level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

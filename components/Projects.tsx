'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/lib/db';

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const statusColors: Record<string, { bg: string; color: string }> = {
  'In Development': { bg: 'rgba(0,230,167,0.08)',    color: 'var(--accent)' },
  'Research Phase': { bg: 'rgba(100,150,255,0.08)',  color: '#8BAEFF' },
  'Research Complete': { bg: 'rgba(100,150,255,0.08)', color: '#8BAEFF' },
  'Completed': { bg: 'rgba(255,255,255,0.05)',        color: 'var(--text-muted)' },
};

function ProjectCard({ project, large = false }: { project: ProjectItem; large?: boolean }) {
  const statusStyle = statusColors[project.status] ?? statusColors['Completed'];
  return (
    <motion.div
      className="rounded-2xl p-5 sm:p-6 md:p-7 h-full flex flex-col"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
      whileHover={{
        y: -6,
        borderColor: 'rgba(0,230,167,0.3)',
        boxShadow: '0 0 0 1px rgba(0,230,167,0.12), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,230,167,0.07)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
        <span style={{
          padding: '0.15rem 0.6rem', borderRadius: 4,
          fontSize: '0.7rem', fontWeight: 600, whiteSpace: 'nowrap',
          fontFamily: 'var(--font-body)',
          background: statusStyle.bg, color: statusStyle.color,
        }}>
          {project.status}
        </span>
      </div>

      <h3 className="mb-3" style={{ fontFamily: 'var(--font-heading)', fontSize: large ? '1.4rem' : '1.15rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>
        {project.title}
      </h3>

      <p className="flex-1 mb-4 text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.78 }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => (
          <span key={t} style={{
            padding: '0.15rem 0.55rem', borderRadius: 4,
            fontSize: '0.7rem', fontFamily: 'var(--font-body)', fontWeight: 500,
            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}>
            {t}
          </span>
        ))}
      </div>

      {project.link && project.linkLabel && (
        <motion.a
          href={project.link}
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
          whileHover={{ gap: '0.65rem', opacity: 0.85 }}
          transition={{ duration: 0.2 }}
        >
          {project.linkIcon === 'github' ? <GithubIcon size={14} /> : <ExternalLink size={14} />}
          {project.linkLabel}
        </motion.a>
      )}
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: ProjectItem[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest     = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-28 lg:py-36" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          03 / Projects
        </motion.span>

        <motion.h2
          className="mt-4 mb-12"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Things I&apos;ve <em style={{ color: 'var(--accent)' }}>built &amp; researched.</em>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <ProjectCard project={project} large />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.09, ease: [0.4, 0, 0.2, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

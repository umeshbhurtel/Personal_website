'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const projects = [
  {
    title: 'FixIt Bazaar',
    tags: ['FYP', 'Web App', 'ASP.NET'],
    description:
      'A web-based marketplace for home repair and maintenance services in Nepal. Built with ASP.NET Web Forms, Bootstrap 5, and SQL Server LocalDB. Features a role-based system for clients, service providers, and admins — with booking management, service listings, profile dashboards, and admin controls.',
    tech: ['ASP.NET Web Forms', 'SQL Server', 'Bootstrap 5', 'C#'],
    status: 'In Development',
    link: '#',
    linkLabel: 'GitHub',
    icon: <GithubIcon size={14} />,
    featured: true,
  },
  {
    title: 'Insurance Plan Recommendation DSS',
    tags: ['FYP Proposal', 'Research', 'Java'],
    description:
      'A web-based Decision Support System for insurance plan selection in Nepal, using rule-based inference to guide users through personalized plan matching. Designed for underserved insurance markets with limited digital literacy.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'],
    status: 'Research Phase',
    link: '#',
    linkLabel: 'View Proposal',
    icon: <ExternalLink size={14} />,
    featured: true,
  },
  {
    title: 'Precision Farming in Nepal',
    tags: ['Research', 'AgriTech', 'Nepal'],
    description:
      "Conducted in-depth research into precision farming technologies and their applicability for Nepal's smallholder farmers. Investigated IoT soil sensors, satellite NDVI mapping, drone-based crop monitoring, and variable-rate application systems — analysing technical viability, cost barriers, connectivity constraints, and cooperative delivery models suited to Nepal's hill and Terai farming contexts.",
    tech: ['IoT Sensors', 'NDVI / Remote Sensing', 'AgriTech', 'Research Documentation'],
    status: 'Research Complete',
    link: null,
    linkLabel: null,
    icon: null,
    featured: false,
  },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  'In Development': { bg: 'rgba(0,229,176,0.08)', color: 'var(--accent)' },
  'Research Phase': { bg: 'rgba(100,150,255,0.08)', color: '#8BAEFF' },
  'Research Complete': { bg: 'rgba(100,150,255,0.08)', color: '#8BAEFF' },
  'Completed': { bg: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ProjectCard({ project, large = false }: { project: typeof projects[0]; large?: boolean }) {
  const statusStyle = statusColors[project.status] ?? statusColors['Completed'];

  return (
    <div
      className="card-hover rounded-xl p-6 md:p-7 h-full flex flex-col"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
        <span
          className="px-2.5 py-0.5 rounded text-xs font-medium whitespace-nowrap"
          style={{ background: statusStyle.bg, color: statusStyle.color, fontFamily: 'var(--font-body)' }}
        >
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mb-3"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: large ? '1.4rem' : '1.15rem',
          color: 'var(--text-primary)',
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="flex-1 mb-4 text-sm"
        style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}
      >
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded"
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontFamily: 'monospace',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Link */}
      {project.link && project.linkLabel && (
        <a
          href={project.link}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {project.icon} {project.linkLabel}
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 md:py-36" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          03 / Projects
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
          Things I&apos;ve <em style={{ color: 'var(--accent)' }}>built &amp; researched.</em>
        </motion.h2>

        {/* Featured — 2 large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <ProjectCard project={project} large />
            </motion.div>
          ))}
        </div>

        {/* Rest — smaller 3-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

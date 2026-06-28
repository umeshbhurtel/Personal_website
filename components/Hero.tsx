'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

const rotateTitles = [
  'AI/ML Researcher',
  'R&D Associate',
  'Product Strategist',
  'Technology Analyst',
  'Research Consultant',
];

const terminalLines = [
  { delay: 400,  text: '> initializing profile...' },
  { delay: 1000, text: '> name: "Umesh Bhurtel"' },
  { delay: 1600, text: '> discipline: "Research & Development"' },
  { delay: 2300, text: '> focus: [' },
  { delay: 2800, text: '    "AI/ML Research & Evaluation",' },
  { delay: 3200, text: '    "Product Research & Strategy",' },
  { delay: 3600, text: '    "Emerging Technology Analysis",' },
  { delay: 4000, text: '    "Business & Market Research"' },
  { delay: 4400, text: '  ]' },
  { delay: 5000, text: '> status: "Available to help businesses make smarter, research-backed decisions"' },
  { delay: 5800, text: '> location: "Bhaktapur, Nepal 🇳🇵 · Remote-first"' },
  { delay: 6500, text: '> ready.' },
];

function RotatingTitle() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % rotateTitles.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ height: '1.25em', overflow: 'hidden', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          style={{ color: 'var(--accent)', fontStyle: 'italic', display: 'block' }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {rotateTitles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    terminalLines.forEach(({ delay, text }) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, text]);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        borderRadius: 16, padding: '20px 22px',
        fontFamily: '"Cascadia Code", "Fira Code", monospace',
        fontSize: '0.78rem',
        background: 'rgba(9,9,11,0.96)',
        border: '1px solid var(--border)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,230,167,0.05)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,230,167,0.4), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Traffic lights */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57', display: 'block' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E', display: 'block' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840', display: 'block' }} />
        <span style={{ marginLeft: 8, fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
          research_profile.sh
        </span>
      </div>

      <div
        ref={containerRef}
        style={{ maxHeight: '220px', overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              color: line.startsWith('>') ? 'var(--accent)' : 'var(--text-secondary)',
              lineHeight: 1.65,
              whiteSpace: 'pre',
            }}
          >
            {line}
          </motion.div>
        ))}
        {visibleLines.length > 0 && (
          <span className="cursor-blink" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>&#x258C;</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Hero({
  tagline = 'IT Researcher & R&D Associate',
  description = 'I research technology, build systems, and document insights that help organizations make better decisions. Based in Nepal — working globally.',
}: {
  tagline?: string;
  description?: string;
}) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{ background: 'var(--gradient-hero)', overflow: 'hidden' }}
    >
      {/* Ambient orbs */}
      <div className="orb-1 absolute pointer-events-none" aria-hidden="true" style={{
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,230,167,0.07) 0%, transparent 70%)',
        top: -150, left: -250,
      }} />
      <div className="orb-2 absolute pointer-events-none" aria-hidden="true" style={{
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(51,207,255,0.05) 0%, transparent 70%)',
        bottom: -80, right: -80,
      }} />

      <div className="container-max w-full pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.3rem 0.9rem', borderRadius: 999,
                background: 'var(--accent-dim)', border: '1px solid rgba(0,230,167,0.2)',
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600,
                color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                {tagline}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                fontWeight: 600, lineHeight: 1.05,
                letterSpacing: '-0.02em', color: 'var(--text-primary)',
              }}>
                Umesh<br />
                <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Bhurtel</em>
              </h1>

              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)',
                fontWeight: 400, marginTop: '0.7rem', marginBottom: '1.5rem',
                color: 'var(--text-secondary)',
              }}>
                <RotatingTitle />
              </div>
            </motion.div>

            <motion.p
              className="mb-8 max-w-md"
              style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
            >
              <Link href="#projects" className="btn-primary">
                Explore Research <ArrowRight size={15} />
              </Link>
              <a href="/uploads/cv/cv.pdf" download className="btn-secondary">
                <Download size={14} /> Download CV
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-6 sm:gap-8 mt-8 md:mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.72 }}
            >
              {[
                { value: '5+', label: 'Years Research' },
                { value: '15+', label: 'Projects' },
                { value: '8+', label: 'Research Areas' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, color: 'var(--accent)', lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — terminal */}
          <TerminalWidget />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          aria-hidden="true"
        >
          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.18em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
            scroll
          </span>
          <motion.div
            style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

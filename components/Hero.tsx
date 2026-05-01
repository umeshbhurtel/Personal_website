'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

const terminalLines = [
  { delay: 300, text: '> initializing profile...' },
  { delay: 900, text: '> name: "Umesh Bhurtel"' },
  { delay: 1500, text: '> role: "R&D Associate @ Logictive Solutions"' },
  { delay: 2200, text: '> focus: [' },
  { delay: 2700, text: '    "Precision Farming Tech",' },
  { delay: 3100, text: '    "AI/ML Research",' },
  { delay: 3500, text: '    "TaaS Models",' },
  { delay: 3900, text: '    "Remote Collaboration"' },
  { delay: 4300, text: '  ]' },
  { delay: 4900, text: '> status: "Open to remote opportunities"' },
  { delay: 5500, text: '> location: "Bhaktapur, Nepal 🇳🇵"' },
  { delay: 6100, text: '> ready.' },
];

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
    <div
      className="rounded-xl p-5 font-mono text-sm w-full"
      style={{
        background: 'rgba(10,10,15,0.95)',
        border: '1px solid var(--border)',
        boxShadow: '0 0 40px rgba(0,229,176,0.06), 0 20px 60px rgba(0,0,0,0.5)',
        maxHeight: '340px',
      }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-2 text-xs" style={{ color: 'var(--text-muted)' }}>research_profile.json</span>
      </div>

      {/* Terminal content */}
      <div
        ref={containerRef}
        className="overflow-y-auto space-y-1"
        style={{ maxHeight: '260px', scrollbarWidth: 'none' }}
      >
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              color: line.startsWith('>') ? 'var(--accent)' : 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {line}
          </motion.div>
        ))}

        {visibleLines.length > 0 && visibleLines.length < terminalLines.length + 1 && (
          <span className="cursor-blink" style={{ color: 'var(--accent)' }}>▌</span>
        )}

        {visibleLines.length >= terminalLines.length && (
          <div style={{ marginTop: '0.5rem' }}>
            <span className="cursor-blink" style={{ color: 'var(--accent)' }}>▌</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero({
  tagline = 'IT Researcher & R&D Associate',
  description = "I research technology, build systems, and document insights that help organizations make better decisions. Based in Nepal — working globally.",
}: {
  tagline?: string;
  description?: string;
}) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Ambient orbs */}
      <div
        className="orb-1 absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,176,0.06) 0%, transparent 70%)',
          top: '-100px',
          left: '-200px',
        }}
        aria-hidden="true"
      />
      <div
        className="orb-2 absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,176,0.04) 0%, transparent 70%)',
          bottom: '-80px',
          right: '-100px',
        }}
        aria-hidden="true"
      />

      <div className="container-max w-full pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="section-label">{tagline}</span>
            </motion.div>

            <motion.h1
              className="mt-4 mb-6 leading-none"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'var(--text-primary)',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              Umesh<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Bhurtel</em>
            </motion.h1>

            <motion.p
              className="mb-8 max-w-md"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <Link
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all"
                style={{
                  background: 'var(--accent)',
                  color: '#0A0A0F',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                View My Work <ArrowRight size={16} />
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all"
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <BookOpen size={16} /> Read the Blog
              </Link>
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <TerminalWidget />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          aria-hidden="true"
        >
          <span className="text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>scroll</span>
          <div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

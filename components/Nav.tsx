'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Research',     href: '#research' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact',      href: '#contact' },
];

const sectionIds = ['about', 'experience', 'projects', 'research', 'skills', 'blog', 'contact'];

export default function Nav() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-35% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href.startsWith('#')) return active === href.slice(1);
    return false;
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          backgroundColor: scrolled ? 'rgba(9,9,11,0.80)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <nav className="container-max flex items-center justify-between" style={{ height: scrolled ? '60px' : '72px', transition: 'height 0.3s ease' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 9,
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,230,167,0.3)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.04em',
              }}
            >
              UB
            </motion.span>
            <span className="hidden sm:block text-sm" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Umesh Bhurtel
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active_ = isActive(link.href);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="nav-link-hover text-sm transition-colors duration-200"
                    style={{
                      color: active_ ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: active_ ? 500 : 400,
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = active_ ? 'var(--text-primary)' : 'var(--text-secondary)')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="/uploads/cv/cv.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm font-medium transition-all"
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 999,
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              ↓ CV
            </motion.a>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="nav-cta-pulse flex items-center gap-2 text-sm font-medium"
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 999,
                  background: 'var(--accent-dim)',
                  border: '1px solid rgba(0,230,167,0.35)',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-body)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                Available
              </Link>
            </motion.div>
          </div>

          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-secondary)', background: 'var(--bg-glass)', border: '1px solid var(--border)' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: 'var(--bg-primary)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="container-max flex items-center justify-between" style={{ height: 64 }}>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 9,
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,230,167,0.3)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700, fontSize: '0.85rem',
              }}>UB</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg"
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-glass)', border: '1px solid var(--border)' }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </motion.button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', textDecoration: 'none' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <a
                  href="/uploads/cv/cv.pdf"
                  download
                  className="px-6 py-3 rounded-full text-sm font-medium"
                  style={{
                    background: 'var(--bg-glass)', border: '1px solid var(--border)',
                    color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', textDecoration: 'none',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  ↓ Download CV
                </a>
                <Link
                  href="#contact"
                  className="px-6 py-3 rounded-full text-sm font-medium"
                  style={{
                    background: 'var(--accent-dim)', border: '1px solid rgba(0,230,167,0.35)',
                    color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  Available for Remote Work
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

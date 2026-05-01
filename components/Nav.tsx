'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <nav className="container-max flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,229,176,0.3)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em',
              }}
            >
              UB
            </span>
            <span
              className="hidden sm:block text-sm font-medium"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
            >
              Umesh Bhurtel
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/cv"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              ↓ CV
            </Link>
            <Link
              href="#contact"
              className="nav-cta-pulse flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,229,176,0.4)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              Available for Remote Work
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--text-secondary)', background: 'var(--bg-glass)', border: '1px solid var(--border)' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="container-max flex items-center justify-between h-16">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,229,176,0.3)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-body)',
              }}
            >
              UB
            </span>
            <button
              className="p-2 rounded-lg"
              style={{ color: 'var(--text-secondary)', background: 'var(--bg-glass)', border: '1px solid var(--border)' }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-2xl transition-colors"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cv"
              className="px-6 py-3 rounded-full text-sm font-medium"
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
              }}
              onClick={() => setMobileOpen(false)}
            >
              ↓ Download CV
            </Link>
            <Link
              href="#contact"
              className="mt-2 px-6 py-3 rounded-full text-sm font-medium"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,229,176,0.4)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
              }}
              onClick={() => setMobileOpen(false)}
            >
              Available for Remote Work
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

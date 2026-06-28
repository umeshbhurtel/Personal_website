'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '◈' },
  { label: 'Blog Posts', href: '/admin/blog', icon: '✦' },
  { label: 'Case Studies', href: '/admin/case-studies', icon: '⬡' },
  { label: 'Site Content', href: '/admin/content', icon: '✏' },
  { label: 'Experience', href: '/admin/experience', icon: '◎' },
  { label: 'Projects', href: '/admin/projects', icon: '⬖' },
  { label: 'Research', href: '/admin/research', icon: '◉' },
  { label: 'Skills', href: '/admin/skills', icon: '◇' },
  { label: 'CV / Resume', href: '/admin/cv', icon: '↓' },
  { label: 'Submissions', href: '/admin/submissions', icon: '✉' },
];

const s = {
  shell: {
    minHeight: '100vh',
    display: 'flex',
    background: '#0A0A0F',
    color: '#fff',
    fontFamily: '"DM Sans", Arial, sans-serif',
  } as React.CSSProperties,
  sidebar: {
    width: '220px',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.02)',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  logo: {
    padding: '0 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    marginBottom: '12px',
  } as React.CSSProperties,
  logoText: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#00E5B0',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  },
  logoSub: { fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' },
  navLink: (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 20px',
    fontSize: '13px',
    fontWeight: active ? 600 : 400,
    color: active ? '#00E5B0' : 'rgba(255,255,255,0.55)',
    background: active ? 'rgba(0,229,176,0.07)' : 'transparent',
    borderRight: active ? '2px solid #00E5B0' : '2px solid transparent',
    textDecoration: 'none',
    transition: 'all 0.15s',
  }),
  main: {
    flex: 1,
    padding: '32px 36px',
    maxWidth: '900px',
  } as React.CSSProperties,
  logoutBtn: {
    margin: '16px 20px 0',
    padding: '8px 16px',
    fontSize: '12px',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '6px',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    textAlign: 'left' as const,
    width: 'calc(100% - 40px)',
  },
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return <>{children}</>;

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div style={s.shell}>
      <aside style={s.sidebar}>
        <div style={s.logo}>
          <div style={s.logoText}>UB Admin</div>
          <div style={s.logoSub}>Portfolio CMS</div>
        </div>

        <nav>
          {navItems.map((item) => {
            const active = item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} style={s.navLink(active)}>
                <span style={{ fontSize: '11px', opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ flex: 1 }} />

        <div>
          <Link
            href="/"
            target="_blank"
            style={{ ...s.logoutBtn, display: 'block', textDecoration: 'none', marginBottom: '6px' }}
          >
            ↗ View Site
          </Link>
          <button style={s.logoutBtn} onClick={logout}>
            ← Log out
          </button>
        </div>
      </aside>

      <main style={s.main}>{children}</main>
    </div>
  );
}

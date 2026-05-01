import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getAllBlogPosts, getAllCaseStudies, getAllContacts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  if (!isAuthenticated()) redirect('/admin/login');

  const posts = getAllBlogPosts();
  const cases = getAllCaseStudies();
  const contacts = getAllContacts();

  const stats = [
    { label: 'Blog Posts', value: posts.length, published: posts.filter((p) => p.published).length, href: '/admin/blog', color: '#00E5B0' },
    { label: 'Case Studies', value: cases.length, published: cases.filter((c) => c.published).length, href: '/admin/case-studies', color: '#818CF8' },
    { label: 'Form Submissions', value: contacts.length, published: null, href: '/admin/submissions', color: '#FB923C' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Dashboard</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
        Welcome back, Umesh. Here&apos;s an overview of your portfolio.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
        {stats.map((s) => (
          <a key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              padding: '20px',
            }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: s.color }}>{s.value}</div>
              {s.published !== null && (
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
                  {s.published} published
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '16px',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>Recent Submissions</h3>
        {contacts.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>No submissions yet.</p>
        ) : (
          contacts.slice(0, 3).map((c) => (
            <div key={c.id} style={{
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              fontSize: '13px',
            }}>
              <span style={{ color: '#fff', fontWeight: 500 }}>{c.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 8px' }}>—</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{c.email}</span>
              <span style={{ float: 'right', color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          { label: '+ New Blog Post', href: '/admin/blog' },
          { label: '+ New Case Study', href: '/admin/case-studies' },
          { label: 'Edit Site Content', href: '/admin/content' },
        ].map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            style={{
              padding: '9px 18px',
              background: 'rgba(0,229,176,0.1)',
              border: '1px solid rgba(0,229,176,0.25)',
              borderRadius: '8px',
              color: '#00E5B0',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
}

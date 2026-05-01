'use client';

import { useState, useEffect } from 'react';

interface Contact {
  id: string; name: string; email: string; subject: string; message: string; createdAt: string;
}

export default function AdminSubmissions() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/submissions').then((r) => r.json()).then((d) => {
      if (Array.isArray(d)) setContacts(d);
    });
  }, []);

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Contact Submissions</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '28px' }}>
        {contacts.length} total submission{contacts.length !== 1 ? 's' : ''}
      </p>

      {contacts.length === 0 ? (
        <div style={{ padding: '32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}>
          No submissions yet.
        </div>
      ) : (
        contacts.map((c) => (
          <div key={c.id} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px', marginBottom: '10px', overflow: 'hidden',
          }}>
            <button
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              style={{
                width: '100%', padding: '14px 20px', background: 'transparent', border: 'none',
                cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              <span style={{ fontSize: '18px', color: '#FB923C' }}>✉</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: '14px' }}>{c.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                  {c.email} {c.subject && `· ${c.subject}`}
                </div>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                {new Date(c.createdAt).toLocaleString()}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
                {expanded === c.id ? '▲' : '▼'}
              </span>
            </button>

            {expanded === c.id && (
              <div style={{ padding: '0 20px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ marginTop: '14px', fontSize: '13px', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap' }}>
                  {c.message}
                </div>
                <a
                  href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject || 'Your message')}`}
                  style={{
                    display: 'inline-flex', marginTop: '12px', padding: '8px 16px',
                    background: 'rgba(0,229,176,0.1)', border: '1px solid rgba(0,229,176,0.25)',
                    borderRadius: '7px', color: '#00E5B0', textDecoration: 'none', fontSize: '12px', fontWeight: 600,
                  }}
                >
                  Reply via Email ↗
                </a>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

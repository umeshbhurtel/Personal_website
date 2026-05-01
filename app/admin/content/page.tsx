'use client';

import { useState, useEffect } from 'react';

interface Content {
  hero_tagline: string;
  hero_description: string;
  about_para1: string;
  about_para2: string;
  about_para3: string;
  about_quote: string;
  contact_availability: string;
}

const FIELDS: { key: keyof Content; label: string; multiline?: boolean }[] = [
  { key: 'hero_tagline', label: 'Hero Tagline (below your name)' },
  { key: 'hero_description', label: 'Hero Description', multiline: true },
  { key: 'about_para1', label: 'About — Paragraph 1', multiline: true },
  { key: 'about_para2', label: 'About — Paragraph 2', multiline: true },
  { key: 'about_para3', label: 'About — Paragraph 3', multiline: true },
  { key: 'about_quote', label: 'About — Pull Quote', multiline: true },
  { key: 'contact_availability', label: 'Contact Availability Text' },
];

const inputStyle = {
  width: '100%', padding: '10px 12px', boxSizing: 'border-box' as const,
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none', lineHeight: 1.6,
};

export default function AdminContent() {
  const [content, setContent] = useState<Content>({
    hero_tagline: '', hero_description: '',
    about_para1: '', about_para2: '', about_para3: '',
    about_quote: '', contact_availability: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then((d) => setContent((c) => ({ ...c, ...d })));
  }, []);

  async function save() {
    setSaving(true); setMsg('');
    const res = await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
    setMsg(res.ok ? 'Saved! Restart dev server to see changes on the homepage.' : 'Error saving');
    setSaving(false);
  }

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Site Content</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '28px' }}>
        Edit the text content of your homepage sections here.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
        {FIELDS.map(({ key, label, multiline }) => (
          <div key={key}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '7px' }}>
              {label}
            </label>
            {multiline ? (
              <textarea
                style={{ ...inputStyle, height: '90px', resize: 'vertical' }}
                value={content[key]}
                onChange={(e) => setContent((c) => ({ ...c, [key]: e.target.value }))}
              />
            ) : (
              <input
                style={inputStyle}
                value={content[key]}
                onChange={(e) => setContent((c) => ({ ...c, [key]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={save}
          disabled={saving}
          style={{
            padding: '10px 24px', background: '#00E5B0', color: '#0A0A0F',
            border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {msg && <span style={{ fontSize: '13px', color: msg.startsWith('Saved') ? '#00E5B0' : '#f87171' }}>{msg}</span>}
      </div>

      <div style={{ marginTop: '24px', padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
        💡 After saving, these changes apply to the homepage. In development, the page auto-refreshes.
      </div>
    </div>
  );
}

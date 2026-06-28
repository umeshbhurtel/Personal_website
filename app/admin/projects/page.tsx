'use client';

import { useState, useEffect } from 'react';
import type { ProjectItem } from '@/lib/db';

const inp: React.CSSProperties = { width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const ta: React.CSSProperties = { ...inp, resize: 'vertical', minHeight: '80px' };
const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '5px' };
const removeBtn: React.CSSProperties = { padding: '4px 10px', fontSize: '11px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '4px', color: '#f87171', cursor: 'pointer' };

function newProject(): ProjectItem {
  return { id: Date.now().toString(), title: '', tags: [], description: '', tech: [], status: 'In Development', featured: false };
}

export default function AdminProjects() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { fetch('/api/projects').then(r => r.json()).then(setItems); }, []);

  function update(id: string, field: keyof ProjectItem, value: unknown) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  async function save() {
    setSaving(true); setMsg('');
    const res = await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
    setMsg(res.ok ? 'Saved! Changes are now live.' : 'Error saving');
    setSaving(false);
  }

  const statuses = ['In Development', 'Research Phase', 'Research Complete', 'Completed'];

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Projects</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Manage the projects shown on the homepage. Featured projects appear larger.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        {items.map((proj, idx) => (
          <div key={proj.id} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Project {idx + 1}</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={proj.featured} onChange={e => update(proj.id, 'featured', e.target.checked)} />
                  Featured
                </label>
                <button style={removeBtn} onClick={() => setItems(prev => prev.filter(p => p.id !== proj.id))}>Remove</button>
              </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={lbl}>Title</label>
              <input style={inp} value={proj.title} onChange={e => update(proj.id, 'title', e.target.value)} />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={lbl}>Description</label>
              <textarea style={ta} value={proj.description} onChange={e => update(proj.id, 'description', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <label style={lbl}>Tags (comma-separated)</label>
                <input style={inp} value={proj.tags.join(', ')} onChange={e => update(proj.id, 'tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="FYP, Web App" />
              </div>
              <div>
                <label style={lbl}>Tech Stack (comma-separated)</label>
                <input style={inp} value={proj.tech.join(', ')} onChange={e => update(proj.id, 'tech', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="React, Node.js" />
              </div>
              <div>
                <label style={lbl}>Status</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={proj.status} onChange={e => update(proj.id, 'status', e.target.value)}>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Link Icon</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={proj.linkIcon ?? ''} onChange={e => update(proj.id, 'linkIcon', e.target.value || undefined)}>
                  <option value="">None</option>
                  <option value="github">GitHub</option>
                  <option value="external">External Link</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Link URL</label>
                <input style={inp} value={proj.link ?? ''} onChange={e => update(proj.id, 'link', e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <label style={lbl}>Link Label</label>
                <input style={inp} value={proj.linkLabel ?? ''} onChange={e => update(proj.id, 'linkLabel', e.target.value)} placeholder="GitHub / View Proposal" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setItems(prev => [...prev, newProject()])} style={{ marginBottom: '20px', padding: '9px 20px', fontSize: '13px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
        + Add Project
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={save} disabled={saving} style={{ padding: '10px 24px', background: '#00E5B0', color: '#0A0A0F', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {msg && <span style={{ fontSize: '13px', color: msg.startsWith('Saved') ? '#00E5B0' : '#f87171' }}>{msg}</span>}
      </div>
    </div>
  );
}

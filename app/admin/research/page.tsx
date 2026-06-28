'use client';

import { useState, useEffect } from 'react';
import type { ResearchData, ResearchArea, Certification } from '@/lib/db';

const inp: React.CSSProperties = { width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' };
const ta: React.CSSProperties = { ...inp, resize: 'vertical', minHeight: '80px' };
const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '5px' };
const card: React.CSSProperties = { padding: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', marginBottom: '12px' };
const removeBtn: React.CSSProperties = { padding: '4px 10px', fontSize: '11px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '4px', color: '#f87171', cursor: 'pointer' };

function newArea(): ResearchArea { return { id: Date.now().toString(), icon: '🔬', title: '', description: '' }; }
function newCert(): Certification { return { id: Date.now().toString(), icon: '🏅', label: '', note: '' }; }

const defaultData: ResearchData = { areas: [], certifications: [] };

export default function AdminResearch() {
  const [data, setData] = useState<ResearchData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/research').then(r => r.json()).then(setData);
  }, []);

  function updateArea(id: string, field: keyof ResearchArea, value: string) {
    setData(prev => ({ ...prev, areas: prev.areas.map(a => a.id === id ? { ...a, [field]: value } : a) }));
  }

  function updateCert(id: string, field: keyof Certification, value: string) {
    setData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c) }));
  }

  async function save() {
    setSaving(true); setMsg('');
    const res = await fetch('/api/research', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setMsg(res.ok ? 'Saved! Changes are now live.' : 'Error saving');
    setSaving(false);
  }

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Research & Credentials</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Edit the &quot;What I investigate&quot; section and credentials.</p>

      <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: 'rgba(255,255,255,0.8)' }}>Research Areas</h2>
      {data.areas.map((area, i) => (
        <div key={area.id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Area {i + 1}</span>
            <button style={removeBtn} onClick={() => setData(prev => ({ ...prev, areas: prev.areas.filter(a => a.id !== area.id) }))}>Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={lbl}>Icon</label>
              <input style={inp} value={area.icon} onChange={e => updateArea(area.id, 'icon', e.target.value)} placeholder="🔬" />
            </div>
            <div>
              <label style={lbl}>Title</label>
              <input style={inp} value={area.title} onChange={e => updateArea(area.id, 'title', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={lbl}>Description</label>
            <textarea style={ta} value={area.description} onChange={e => updateArea(area.id, 'description', e.target.value)} />
          </div>
        </div>
      ))}
      <button onClick={() => setData(prev => ({ ...prev, areas: [...prev.areas, newArea()] }))} style={{ marginBottom: '28px', padding: '8px 18px', fontSize: '12px', background: 'rgba(0,229,176,0.08)', border: '1px solid rgba(0,229,176,0.2)', borderRadius: '6px', color: '#00E5B0', cursor: 'pointer' }}>
        + Add Research Area
      </button>

      <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: 'rgba(255,255,255,0.8)' }}>Credentials & Education</h2>
      {data.certifications.map((cert, i) => (
        <div key={cert.id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Credential {i + 1}</span>
            <button style={removeBtn} onClick={() => setData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== cert.id) }))}>Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={lbl}>Icon</label>
              <input style={inp} value={cert.icon} onChange={e => updateCert(cert.id, 'icon', e.target.value)} placeholder="🏅" />
            </div>
            <div>
              <label style={lbl}>Label</label>
              <input style={inp} value={cert.label} onChange={e => updateCert(cert.id, 'label', e.target.value)} />
            </div>
            <div>
              <label style={lbl}>Note (optional)</label>
              <input style={inp} value={cert.note ?? ''} onChange={e => updateCert(cert.id, 'note', e.target.value)} placeholder="In Progress, 2026" />
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => setData(prev => ({ ...prev, certifications: [...prev.certifications, newCert()] }))} style={{ marginBottom: '28px', padding: '8px 18px', fontSize: '12px', background: 'rgba(0,229,176,0.08)', border: '1px solid rgba(0,229,176,0.2)', borderRadius: '6px', color: '#00E5B0', cursor: 'pointer' }}>
        + Add Credential
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

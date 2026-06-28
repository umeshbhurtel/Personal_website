'use client';

import { useState, useEffect } from 'react';
import type { ExperienceItem } from '@/lib/db';

const inp: React.CSSProperties = {
  width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
  color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box',
};
const ta: React.CSSProperties = { ...inp, resize: 'vertical', minHeight: '70px' };
const label: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '5px' };

function newExp(): ExperienceItem {
  return { id: Date.now().toString(), company: '', role: '', period: '', location: '', current: false, points: [''] };
}

export default function AdminExperience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/experience').then(r => r.json()).then(setItems);
  }, []);

  function update(id: string, field: keyof ExperienceItem, value: unknown) {
    setItems(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  }

  function updatePoint(id: string, pi: number, value: string) {
    setItems(prev => prev.map(e => {
      if (e.id !== id) return e;
      const pts = [...e.points];
      pts[pi] = value;
      return { ...e, points: pts };
    }));
  }

  function addPoint(id: string) {
    setItems(prev => prev.map(e => e.id === id ? { ...e, points: [...e.points, ''] } : e));
  }

  function removePoint(id: string, pi: number) {
    setItems(prev => prev.map(e => e.id === id ? { ...e, points: e.points.filter((_, i) => i !== pi) } : e));
  }

  function remove(id: string) {
    setItems(prev => prev.filter(e => e.id !== id));
  }

  async function save() {
    setSaving(true); setMsg('');
    const res = await fetch('/api/experience', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(items) });
    setMsg(res.ok ? 'Saved! Changes are now live.' : 'Error saving');
    setSaving(false);
  }

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Experience</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Manage your work history shown on the homepage.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
        {items.map((exp, idx) => (
          <div key={exp.id} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Entry {idx + 1}</span>
              <button onClick={() => remove(exp.id)} style={{ padding: '4px 10px', fontSize: '11px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '4px', color: '#f87171', cursor: 'pointer' }}>Remove</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={label}>Company</label>
                <input style={inp} value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} />
              </div>
              <div>
                <label style={label}>Role / Title</label>
                <input style={inp} value={exp.role} onChange={e => update(exp.id, 'role', e.target.value)} />
              </div>
              <div>
                <label style={label}>Period</label>
                <input style={inp} value={exp.period} onChange={e => update(exp.id, 'period', e.target.value)} placeholder="May 2025 – Present" />
              </div>
              <div>
                <label style={label}>Location</label>
                <input style={inp} value={exp.location} onChange={e => update(exp.id, 'location', e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ ...label, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" checked={exp.current} onChange={e => update(exp.id, 'current', e.target.checked)} />
                Mark as current position
              </label>
            </div>

            <div>
              <label style={label}>Bullet Points</label>
              {exp.points.map((pt, pi) => (
                <div key={pi} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <textarea style={{ ...ta, minHeight: '50px', flex: 1 }} value={pt} onChange={e => updatePoint(exp.id, pi, e.target.value)} />
                  <button onClick={() => removePoint(exp.id, pi)} style={{ flexShrink: 0, padding: '4px 8px', fontSize: '12px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '4px', color: '#f87171', cursor: 'pointer' }}>×</button>
                </div>
              ))}
              <button onClick={() => addPoint(exp.id)} style={{ marginTop: '4px', padding: '5px 12px', fontSize: '12px', background: 'rgba(0,229,176,0.08)', border: '1px solid rgba(0,229,176,0.2)', borderRadius: '4px', color: '#00E5B0', cursor: 'pointer' }}>+ Add point</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setItems(prev => [...prev, newExp()])} style={{ marginBottom: '20px', padding: '9px 20px', fontSize: '13px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
        + Add Experience
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

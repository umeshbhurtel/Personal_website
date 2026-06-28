'use client';

import { useState, useEffect } from 'react';
import type { SkillsData } from '@/lib/db';

const inp: React.CSSProperties = { padding: '7px 11px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontSize: '13px', outline: 'none' };
const lbl: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' };
const removeBtn: React.CSSProperties = { padding: '3px 8px', fontSize: '12px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '4px', color: '#f87171', cursor: 'pointer' };
const addBtn: React.CSSProperties = { padding: '5px 12px', fontSize: '12px', background: 'rgba(0,229,176,0.08)', border: '1px solid rgba(0,229,176,0.2)', borderRadius: '4px', color: '#00E5B0', cursor: 'pointer', marginTop: '8px' };

const defaultData: SkillsData = { aiLlm: [], researchProduct: [], professional: [], languages: [] };

function PillEditor({ skills, onChange }: { skills: string[]; onChange: (s: string[]) => void }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
        {skills.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input style={{ ...inp, width: '140px' }} value={s} onChange={e => { const n = [...skills]; n[i] = e.target.value; onChange(n); }} />
            <button style={removeBtn} onClick={() => onChange(skills.filter((_, j) => j !== i))}>×</button>
          </div>
        ))}
      </div>
      <button style={addBtn} onClick={() => onChange([...skills, ''])}>+ Add Skill</button>
    </div>
  );
}

export default function AdminSkills() {
  const [data, setData] = useState<SkillsData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { fetch('/api/skills').then(r => r.json()).then(setData); }, []);

  async function save() {
    setSaving(true); setMsg('');
    const res = await fetch('/api/skills', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setMsg(res.ok ? 'Saved! Changes are now live.' : 'Error saving');
    setSaving(false);
  }

  const section: React.CSSProperties = { padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', marginBottom: '16px' };

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Skills</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Manage the skill pills shown in each category on the homepage.</p>

      <div style={section}>
        <label style={lbl}>AI, LLM & Data Tools</label>
        <PillEditor skills={data.aiLlm} onChange={v => setData(p => ({ ...p, aiLlm: v }))} />
      </div>

      <div style={section}>
        <label style={lbl}>Research & Product</label>
        <PillEditor skills={data.researchProduct} onChange={v => setData(p => ({ ...p, researchProduct: v }))} />
      </div>

      <div style={section}>
        <label style={lbl}>Professional</label>
        <PillEditor skills={data.professional} onChange={v => setData(p => ({ ...p, professional: v }))} />
      </div>

      <div style={section}>
        <label style={lbl}>Languages</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.languages.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input style={{ ...inp, width: '130px' }} placeholder="Language" value={l.lang} onChange={e => { const n = [...data.languages]; n[i] = { ...n[i], lang: e.target.value }; setData(p => ({ ...p, languages: n })); }} />
              <input style={{ ...inp, width: '130px' }} placeholder="Level" value={l.level} onChange={e => { const n = [...data.languages]; n[i] = { ...n[i], level: e.target.value }; setData(p => ({ ...p, languages: n })); }} />
              <button style={removeBtn} onClick={() => setData(p => ({ ...p, languages: p.languages.filter((_, j) => j !== i) }))}>×</button>
            </div>
          ))}
          <button style={{ ...addBtn, alignSelf: 'flex-start' }} onClick={() => setData(p => ({ ...p, languages: [...p.languages, { lang: '', level: '' }] }))}>+ Add Language</button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={save} disabled={saving} style={{ padding: '10px 24px', background: '#00E5B0', color: '#0A0A0F', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {msg && <span style={{ fontSize: '13px', color: msg.startsWith('Saved') ? '#00E5B0' : '#f87171' }}>{msg}</span>}
      </div>
    </div>
  );
}

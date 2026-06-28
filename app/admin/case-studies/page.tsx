'use client';

import { useState, useEffect, useCallback } from 'react';

interface CaseStudy {
  id: string; title: string; slug: string; description: string;
  tags: string[]; pdfPath: string; pdfName: string; published: boolean;
}

const empty = (): Omit<CaseStudy, 'id'> => ({
  title: '', slug: '', description: '', tags: [], pdfPath: '', pdfName: '', published: true,
});

const s = {
  btn: (variant: 'primary' | 'danger' | 'ghost'): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 600,
    border: 'none', cursor: 'pointer',
    background: variant === 'primary' ? '#00E5B0' : variant === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.06)',
    color: variant === 'primary' ? '#0A0A0F' : variant === 'danger' ? '#EF4444' : 'rgba(255,255,255,0.7)',
  }),
  input: {
    width: '100%', padding: '9px 12px', boxSizing: 'border-box' as const,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '7px', color: '#fff', fontSize: '13px', outline: 'none',
  },
  label: { display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '6px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px 20px', marginBottom: '10px' },
};

export default function AdminCaseStudies() {
  const [list, setList] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState(empty());
  const [tagsInput, setTagsInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const res = await fetch('/api/case-studies');
    setList(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  function startNew() { setEditing(null); setForm(empty()); setTagsInput(''); }
  function startEdit(c: CaseStudy) {
    setEditing(c);
    setForm({ title: c.title, slug: c.slug, description: c.description, tags: c.tags, pdfPath: c.pdfPath, pdfName: c.pdfName, published: c.published });
    setTagsInput(c.tags.join(', '));
  }

  function slugify(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  async function uploadPdf(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) {
      setForm((f) => ({ ...f, pdfPath: data.pdfPath, pdfName: data.pdfName }));
      setMsg('PDF uploaded!');
    } else {
      setMsg(data.error ?? 'Upload failed');
    }
    setUploading(false);
  }

  async function save() {
    setSaving(true); setMsg('');
    const payload = { ...form, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean) };
    const url = editing ? `/api/case-studies/${editing.id}` : '/api/case-studies';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) { setMsg('Saved!'); setEditing(null); setForm(empty()); setTagsInput(''); load(); }
    else { const d = await res.json(); setMsg(d.error ?? 'Error'); }
    setSaving(false);
  }

  async function del(id: string) {
    if (!confirm('Delete this case study?')) return;
    await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700 }}>Case Studies</h1>
        <button style={s.btn('primary')} onClick={startNew}>+ New Case Study</button>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px', color: editing ? '#818CF8' : '#00E5B0' }}>
          {editing ? `Editing: ${editing.title}` : 'New Case Study'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label style={s.label}>Title *</label>
            <input style={s.input} value={form.title} onChange={(e) => {
              const t = e.target.value;
              setForm((f) => ({ ...f, title: t, slug: editing ? f.slug : slugify(t) }));
            }} placeholder="Case study title" />
          </div>
          <div>
            <label style={s.label}>Slug *</label>
            <input style={s.input} value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="url-slug" />
          </div>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={s.label}>Description</label>
          <textarea style={{ ...s.input, height: '100px', resize: 'vertical' }} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="What is this case study about?" />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={s.label}>Tags (comma separated)</label>
          <input style={s.input} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Research, AI, Nepal" />
        </div>

        {/* PDF Upload */}
        <div style={{ marginBottom: '14px' }}>
          <label style={s.label}>PDF Upload</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{
              padding: '9px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '7px', fontSize: '13px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
            }}>
              {uploading ? 'Uploading…' : 'Choose PDF File'}
              <input type="file" accept="application/pdf" style={{ display: 'none' }} onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadPdf(file);
              }} />
            </label>
            {form.pdfName && (
              <span style={{ fontSize: '12px', color: '#00E5B0' }}>
                ✓ {form.pdfName}
              </span>
            )}
          </div>
        </div>

        {/* Publish toggle — prominent */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '8px', background: form.published ? 'rgba(0,229,176,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.published ? 'rgba(0,229,176,0.3)' : 'rgba(255,255,255,0.1)'}`, marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: form.published ? '#00E5B0' : 'rgba(255,255,255,0.5)' }}>
              {form.published ? '🟢 Live — visible on homepage & case studies page' : '⚫ Draft — hidden from site'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Toggle to show or hide this case study on your website</div>
          </div>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            Publish
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
          {editing && <button style={s.btn('ghost')} onClick={startNew}>Cancel</button>}
          <button style={s.btn('primary')} onClick={save} disabled={saving || uploading}>
            {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
          </button>
        </div>

        {msg && <div style={{ marginTop: '12px', fontSize: '13px', color: msg === 'Saved!' || msg.includes('uploaded') ? '#00E5B0' : '#f87171' }}>{msg}</div>}
      </div>

      <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: 'rgba(255,255,255,0.6)' }}>All Case Studies ({list.length})</h2>
      {list.map((c) => (
        <div key={c.id} style={s.card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{c.title}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>
                /{c.slug} · {c.pdfName || 'No PDF'} · {c.tags.join(', ')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: c.published ? 'rgba(0,229,176,0.1)' : 'rgba(255,255,255,0.05)', color: c.published ? '#00E5B0' : 'rgba(255,255,255,0.3)' }}>
                {c.published ? 'Live' : 'Draft'}
              </span>
              {c.pdfPath && <a href={c.pdfPath} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#818CF8' }}>PDF ↗</a>}
              <button style={s.btn('ghost')} onClick={() => startEdit(c)}>Edit</button>
              <button style={s.btn('danger')} onClick={() => del(c.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';

interface Post {
  id: string; title: string; slug: string; excerpt: string;
  content: string; tags: string[]; readTime: string;
  published: boolean; date: string;
}

const emptyPost = (): Omit<Post, 'id'> => ({
  title: '', slug: '', excerpt: '', content: '',
  tags: [], readTime: '5 min read', published: false,
  date: new Date().toISOString().split('T')[0],
});

const s = {
  btn: (variant: 'primary' | 'danger' | 'ghost'): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: '7px', fontSize: '13px', fontWeight: 600,
    border: 'none', cursor: 'pointer',
    background: variant === 'primary' ? '#00E5B0'
      : variant === 'danger' ? 'rgba(239,68,68,0.1)'
      : 'rgba(255,255,255,0.06)',
    color: variant === 'primary' ? '#0A0A0F'
      : variant === 'danger' ? '#EF4444'
      : 'rgba(255,255,255,0.7)',
  }),
  input: {
    width: '100%', padding: '9px 12px', boxSizing: 'border-box' as const,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '7px', color: '#fff', fontSize: '13px', outline: 'none',
  },
  label: { display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '6px' },
  card: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', padding: '16px 20px', marginBottom: '10px',
  },
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(emptyPost());
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    setPosts(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  function startNew() {
    setEditing(null);
    setForm(emptyPost());
    setTagsInput('');
  }

  function startEdit(p: Post) {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, tags: p.tags, readTime: p.readTime, published: p.published, date: p.date });
    setTagsInput(p.tags.join(', '));
  }

  function slugify(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  async function save() {
    setSaving(true);
    setMsg('');
    const payload = { ...form, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean) };
    const url = editing ? `/api/blog/${editing.id}` : '/api/blog';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      setMsg('Saved!');
      setEditing(null);
      setForm(emptyPost());
      setTagsInput('');
      load();
    } else {
      const d = await res.json();
      setMsg(d.error ?? 'Error saving');
    }
    setSaving(false);
  }

  async function del(id: string) {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700 }}>Blog Posts</h1>
        <button style={s.btn('primary')} onClick={startNew}>+ New Post</button>
      </div>

      {/* Editor Form */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px', color: editing ? '#818CF8' : '#00E5B0' }}>
          {editing ? `Editing: ${editing.title}` : 'New Post'}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label style={s.label}>Title *</label>
            <input style={s.input} value={form.title} onChange={(e) => {
              const t = e.target.value;
              setForm((f) => ({ ...f, title: t, slug: editing ? f.slug : slugify(t) }));
            }} placeholder="Post title" />
          </div>
          <div>
            <label style={s.label}>Slug *</label>
            <input style={s.input} value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="url-friendly-slug" />
          </div>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={s.label}>Excerpt</label>
          <textarea style={{ ...s.input, height: '70px', resize: 'vertical' }} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Short description for listing page" />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={s.label}>Content (Markdown)</label>
          <textarea style={{ ...s.input, height: '300px', resize: 'vertical', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6 }} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Write your post in Markdown..." />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label style={s.label}>Tags (comma separated)</label>
            <input style={s.input} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="AI, Research, Nepal" />
          </div>
          <div>
            <label style={s.label}>Read Time</label>
            <input style={s.input} value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))} placeholder="5 min read" />
          </div>
          <div>
            <label style={s.label}>Date</label>
            <input style={s.input} type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
            Published (visible on site)
          </label>
          <div style={{ flex: 1 }} />
          {editing && <button style={s.btn('ghost')} onClick={startNew}>Cancel</button>}
          <button style={s.btn('primary')} onClick={save} disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Update Post' : 'Create Post'}
          </button>
        </div>

        {msg && <div style={{ marginTop: '12px', fontSize: '13px', color: msg === 'Saved!' ? '#00E5B0' : '#f87171' }}>{msg}</div>}
      </div>

      {/* Posts List */}
      <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px', color: 'rgba(255,255,255,0.6)' }}>All Posts ({posts.length})</h2>
      {posts.map((p) => (
        <div key={p.id} style={s.card}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.title}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>
                /{p.slug} · {p.date} · {p.tags.join(', ')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: p.published ? 'rgba(0,229,176,0.1)' : 'rgba(255,255,255,0.05)', color: p.published ? '#00E5B0' : 'rgba(255,255,255,0.3)' }}>
                {p.published ? 'Live' : 'Draft'}
              </span>
              <button style={s.btn('ghost')} onClick={() => startEdit(p)}>Edit</button>
              <button style={s.btn('danger')} onClick={() => del(p.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

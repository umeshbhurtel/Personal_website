'use client';

import { useState, useEffect, useRef } from 'react';

interface CVData {
  path: string;
  originalName: string;
  uploadedAt: string;
}

export default function AdminCV() {
  const [current, setCurrent] = useState<CVData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/cv').then(r => r.json()).then(d => { if (d?.path) setCurrent(d); });
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { setMsg('Only PDF files are allowed.'); return; }

    setUploading(true); setMsg('');
    const fd = new FormData();
    fd.append('file', file);

    const res = await fetch('/api/cv', { method: 'POST', body: fd });
    if (res.ok) {
      const data = await res.json();
      setCurrent(data);
      setMsg('CV uploaded successfully! Visitors will now download your new CV.');
    } else {
      const err = await res.json();
      setMsg(err.error ?? 'Upload failed');
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div style={{ color: '#fff', fontFamily: '"DM Sans", Arial, sans-serif' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>CV / Resume</h1>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '28px' }}>
        Upload your CV as a PDF. The &quot;↓ CV&quot; button on your site will always serve the latest uploaded file.
      </p>

      {current && (
        <div style={{ padding: '16px 20px', background: 'rgba(0,229,176,0.06)', border: '1px solid rgba(0,229,176,0.2)', borderRadius: '10px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current CV</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{current.originalName}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
            Uploaded {new Date(current.uploadedAt).toLocaleString()}
          </div>
          <a
            href={current.path}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: 'rgba(0,229,176,0.1)', border: '1px solid rgba(0,229,176,0.3)', borderRadius: '6px', color: '#00E5B0', fontSize: '13px', textDecoration: 'none' }}
          >
            ↗ Preview current CV
          </a>
        </div>
      )}

      <div
        style={{ padding: '36px', border: '2px dashed rgba(255,255,255,0.12)', borderRadius: '12px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}
        onClick={() => inputRef.current?.click()}
      >
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>📄</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
          {uploading ? 'Uploading…' : 'Click to upload PDF'}
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>PDF only. Previous CV will be replaced.</div>
        <input ref={inputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
      </div>

      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        style={{ padding: '10px 24px', background: '#00E5B0', color: '#0A0A0F', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer' }}
      >
        {uploading ? 'Uploading…' : current ? 'Replace CV' : 'Upload CV'}
      </button>

      {msg && (
        <div style={{ marginTop: '14px', fontSize: '13px', color: msg.includes('success') ? '#00E5B0' : '#f87171' }}>
          {msg}
        </div>
      )}
    </div>
  );
}

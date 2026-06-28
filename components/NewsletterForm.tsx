'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setState('success');
        setMsg(data.message ?? 'Subscribed! Thanks for joining.');
        setEmail('');
      } else {
        setState('error');
        setMsg(data.error ?? 'Something went wrong.');
      }
    } catch {
      setState('error');
      setMsg('Network error. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={state === 'loading' || state === 'success'}
        className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none"
        style={{
          background: 'var(--bg-primary)',
          border: `1px solid ${state === 'success' ? 'var(--accent)' : 'var(--border)'}`,
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
        }}
      />
      <button
        type="submit"
        disabled={state === 'loading' || state === 'success'}
        className="px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap"
        style={{
          background: state === 'success' ? 'rgba(0,229,176,0.15)' : 'var(--accent)',
          color: state === 'success' ? 'var(--accent)' : '#0A0A0F',
          fontFamily: 'var(--font-body)',
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
          border: state === 'success' ? '1px solid var(--accent)' : 'none',
          opacity: state === 'loading' ? 0.7 : 1,
        }}
      >
        {state === 'loading' ? 'Subscribing…' : state === 'success' ? '✓ Subscribed' : 'Subscribe'}
      </button>
      {state === 'error' && (
        <p className="w-full text-xs mt-1" style={{ color: '#f87171', fontFamily: 'var(--font-body)' }}>{msg}</p>
      )}
    </form>
  );
}

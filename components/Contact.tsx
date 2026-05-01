'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: 'var(--text-primary)',
  fontSize: '14px',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const d = await res.json();
        setErrorMsg(d.error ?? 'Something went wrong.');
        setState('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setState('error');
    }
  }

  return (
    <section id="contact" className="py-28 md:py-36" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          07 / Contact
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-6">
          {/* Left — copy + info */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Let&apos;s work{' '}
              <em style={{ color: 'var(--accent)' }}>together.</em>
            </h2>

            <p className="mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Open to remote opportunities in research, data analysis, or R&D-adjacent roles — primarily
              with teams in the <strong style={{ color: 'var(--text-primary)' }}>USA and Australia</strong>.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: <Mail size={16} />, label: 'Email', value: 'umeshbhurtel122@gmail.com', href: 'mailto:umeshbhurtel122@gmail.com' },
                { icon: <LinkedinIcon size={16} />, label: 'LinkedIn', value: 'linkedin.com/in/umeshbhurtel-8b7b04299', href: 'https://linkedin.com/in/umeshbhurtel-8b7b04299' },
                { icon: <MapPin size={16} />, label: 'Location', value: 'Bhaktapur, Nepal (UTC+5:45)', href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm truncate block" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                      >{value}</a>
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              className="mt-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,229,176,0.25)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
                Open to remote roles — Response within 24hrs
              </span>
            </motion.div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="rounded-2xl p-8" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <h3 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                Send a message
              </h3>

              {state === 'success' ? (
                <div className="py-12 text-center">
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✓</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>
                    Message sent!
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setState('idle')}
                    className="mt-6 px-5 py-2 rounded-lg text-sm"
                    style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>
                        Name *
                      </label>
                      <input
                        style={inputStyle}
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        required
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,176,0.4)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>
                        Email *
                      </label>
                      <input
                        style={inputStyle}
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,176,0.4)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>
                      Subject
                    </label>
                    <input
                      style={inputStyle}
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      placeholder="What's this about?"
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,176,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>
                      Message *
                    </label>
                    <textarea
                      style={{ ...inputStyle, height: '130px', resize: 'vertical' }}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,176,0.4)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    />
                  </div>

                  {state === 'error' && (
                    <div style={{ fontSize: '13px', color: '#f87171', fontFamily: 'var(--font-body)' }}>
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-opacity"
                    style={{
                      background: 'var(--accent)',
                      color: '#0A0A0F',
                      border: 'none',
                      cursor: state === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: state === 'sending' ? 0.7 : 1,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <Send size={15} />
                    {state === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

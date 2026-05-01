'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const stats = [
  { value: '1.5+', label: 'Years', sub: 'Professional R&D Experience' },
  { value: '6+', label: 'Projects', sub: 'Shipped & In Progress' },
  { value: '2×', label: '/month', sub: 'Research Blog Posts' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="relative mb-6"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div
        className="relative overflow-hidden rounded-2xl w-full"
        style={{
          aspectRatio: '1 / 1',
          maxWidth: '280px',
          border: '1px solid var(--border)',
          boxShadow: '0 0 0 1px var(--accent-dim), 0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        {!imgError ? (
          <Image
            src="/umesh-photo.jpg"
            alt="Umesh Bhurtel"
            fill
            className="object-cover object-top"
            sizes="280px"
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback monogram if photo not yet added */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '5rem',
                color: 'var(--accent)',
                opacity: 0.5,
              }}
            >
              UB
            </span>
          </div>
        )}

        {/* Accent corner overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
        />
      </div>

      {/* Available badge */}
      <div
        className="absolute -bottom-3 -right-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid rgba(0,229,176,0.3)',
          color: 'var(--accent)',
          fontFamily: 'var(--font-body)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
        Open to remote work
      </div>
    </motion.div>
  );
}

export default function About({
  para1 = "I'm Umesh Bhurtel — an IT researcher and R&D Associate with a background that spans technology, data analysis, and even field engineering. Currently completing my B.Sc. (Hons.) in Information Technology at Techspire College (in academic collaboration with Asia Pacific University), I bring a rare combination of academic rigor and hands-on experience.",
  para2 = "At Logictive Solutions, I lead research initiatives, produce data-driven insights, and contribute to R&D strategy across global technology initiatives — covering AI/ML annotation, Technology-as-a-Service (TaaS), Employer-of-Record (EOR) frameworks, and enterprise decision platforms. My work has an international scope: supporting clients and partners across Nepal, the UK, and the USA.",
  para3 = "Before tech, I supervised infrastructure projects and conducted land surveys — an experience that gave me a structured, ground-level perspective on problem solving that I carry into every research project today.",
  quote = "Currently based in Bhaktapur, Nepal. Open to full-time remote roles in research, product, data, or R&D-adjacent positions — particularly with US and Australian organizations.",
}: {
  para1?: string;
  para2?: string;
  para3?: string;
  quote?: string;
}) {
  return (
    <section id="about" className="py-28 md:py-36" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-max">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          01 / About
        </motion.span>

        <motion.h2
          className="mt-4 mb-10"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          The story behind <em style={{ color: 'var(--accent)' }}>the research.</em>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Text content */}
          <motion.div
            className="lg:col-span-7 space-y-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{para1}</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{para2}</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{para3}</p>
            <p
              className="mt-6 pl-4 py-1"
              style={{ fontStyle: 'italic', color: 'var(--accent)', borderLeft: '2px solid var(--accent)', lineHeight: 1.8 }}
            >
              {quote}
            </p>
          </motion.div>

          {/* Right column — photo + stats */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-start gap-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <ProfilePhoto />

            {stats.map((stat, i) => (
              <motion.div
                key={stat.sub}
                className="card-hover rounded-xl p-6 flex items-center gap-5 w-full"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                }}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
              >
                <div>
                  <div
                    className="leading-none"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2.5rem',
                      color: 'var(--accent)',
                    }}
                  >
                    {stat.value}
                    <span
                      className="ml-1"
                      style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <div
                    className="mt-1 text-sm"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                  >
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Location badge */}
            <div
              className="rounded-xl p-4 flex items-center gap-3 w-full"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid rgba(0,229,176,0.2)',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🇳🇵</span>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
                  Bhaktapur, Nepal
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  UTC+5:45 · Available remotely
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

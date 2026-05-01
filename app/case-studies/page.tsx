import Link from 'next/link';
import { getPublishedCaseStudies } from '@/lib/db';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Case Studies — Umesh Bhurtel',
  description: 'Research case studies and reports by Umesh Bhurtel.',
};

export default function CaseStudiesPage() {
  const cases = getPublishedCaseStudies();

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container-max flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Back home
          </Link>
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,229,176,0.3)', color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            UB
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-max">
          <div className="mb-14">
            <span className="section-label">Research Output</span>
            <h1 className="mt-4 mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              Case <em style={{ color: 'var(--accent)' }}>Studies</em>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.75 }}>
              In-depth research reports, analysis documents, and case studies. Download the PDFs or read the summaries.
            </p>
          </div>

          {cases.length === 0 ? (
            <div className="py-20 text-center" style={{ color: 'var(--text-muted)' }}>
              <FileText size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p>No case studies published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.map((cs) => (
                <Link key={cs.slug} href={`/case-studies/${cs.slug}`} style={{ textDecoration: 'none' }}>
                  <article
                    className="card-hover rounded-xl p-7 h-full flex flex-col cursor-pointer"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span style={{ color: 'var(--accent)', opacity: 0.8 }}><FileText size={20} /></span>
                      <div className="flex flex-wrap gap-1.5">
                        {cs.tags.map((tag) => <span key={tag} className="tag-chip">{tag}</span>)}
                      </div>
                    </div>

                    <h2 className="mb-3 flex-1" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      {cs.title}
                    </h2>

                    <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {cs.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {cs.pdfPath ? (
                        <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                          📄 PDF available
                        </span>
                      ) : <span />}
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
                        View <ArrowRight size={12} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

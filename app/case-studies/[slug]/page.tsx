import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseStudyBySlug } from '@/lib/db';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) return {};
  return { title: `${cs.title} — Umesh Bhurtel`, description: cs.description };
}

export default async function CaseStudyPage({ params }: Props) {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs || !cs.published) notFound();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-max flex items-center justify-between h-16">
          <Link href="/case-studies" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> All case studies
          </Link>
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,229,176,0.3)', color: 'var(--accent)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
            UB
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-24 min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-max" style={{ maxWidth: '860px' }}>
          <div className="flex flex-wrap gap-2 mb-6">{cs.tags.map((tag) => <span key={tag} className="tag-chip">{tag}</span>)}</div>
          <h1 className="mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text-primary)', lineHeight: 1.2 }}>{cs.title}</h1>
          {cs.description && <p className="mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '620px', fontSize: '1.05rem' }}>{cs.description}</p>}

          {cs.pdfPath && (
            <div className="mb-10 flex flex-wrap gap-3">
              <a href={cs.pdfPath} download={cs.pdfName || true} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90" style={{ background: 'var(--accent)', color: '#0A0A0F', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                <Download size={15} /> Download PDF
              </a>
              <a href={cs.pdfPath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border)', color: 'var(--text-primary)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                <FileText size={15} /> Open in browser
              </a>
            </div>
          )}

          {cs.pdfPath ? (
            <div style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>📄 {cs.pdfName || 'Document'}</div>
              <iframe src={cs.pdfPath} style={{ width: '100%', height: '75vh', border: 'none', display: 'block' }} title={cs.title} />
            </div>
          ) : (
            <div style={{ padding: '48px', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-muted)' }}>
              <FileText size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p>PDF document not yet attached.</p>
            </div>
          )}

          <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            <Link href="/case-studies" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'inline-flex' }}>
              <ArrowLeft size={14} /> All case studies
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

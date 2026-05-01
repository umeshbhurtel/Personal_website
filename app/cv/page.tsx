'use client';

import { useEffect } from 'react';

export default function CVPage() {
  useEffect(() => {
    document.title = 'Umesh Bhurtel – CV';
  }, []);

  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: 'Inter', Arial, sans-serif; background: #f4f4f5; color: #111; }

        .cv-page {
          max-width: 820px;
          margin: 40px auto;
          background: #fff;
          padding: 52px 56px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
          border-radius: 4px;
        }

        /* Print button bar */
        .print-bar {
          max-width: 820px;
          margin: 0 auto 16px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 0 4px;
        }
        .btn-print {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
        }
        .btn-print:hover { background: #333; }
        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: transparent;
          color: #555;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          text-decoration: none;
        }
        .btn-back:hover { background: #f9fafb; }

        /* CV Header */
        .cv-header { border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 24px; }
        .cv-name { font-size: 32px; font-weight: 700; letter-spacing: -0.5px; color: #0a0a0a; line-height: 1; }
        .cv-title { font-size: 15px; font-weight: 500; color: #4b5563; margin-top: 6px; }
        .cv-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 18px;
          margin-top: 12px;
          font-size: 12.5px;
          color: #374151;
        }
        .cv-contact a { color: #374151; text-decoration: none; }
        .cv-contact span { display: flex; align-items: center; gap: 5px; }

        /* Sections */
        .cv-section { margin-bottom: 22px; }
        .cv-section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0a0a0a;
          border-bottom: 1.5px solid #e5e7eb;
          padding-bottom: 5px;
          margin-bottom: 14px;
        }

        /* Summary */
        .cv-summary { font-size: 13.5px; line-height: 1.75; color: #374151; }

        /* Experience */
        .exp-block { margin-bottom: 16px; }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 4px; }
        .exp-role { font-size: 14px; font-weight: 600; color: #0a0a0a; }
        .exp-company { font-size: 13px; font-weight: 500; color: #2563eb; }
        .exp-meta { font-size: 12px; color: #6b7280; text-align: right; }
        .exp-meta-line { display: block; }
        .exp-bullets { margin-top: 7px; padding-left: 16px; }
        .exp-bullets li {
          font-size: 13px;
          line-height: 1.7;
          color: #374151;
          margin-bottom: 3px;
        }

        /* Education */
        .edu-block { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 4px; }
        .edu-degree { font-size: 14px; font-weight: 600; color: #0a0a0a; }
        .edu-school { font-size: 13px; color: #374151; margin-top: 2px; }
        .edu-note { font-size: 12px; color: #6b7280; margin-top: 2px; }
        .edu-date { font-size: 12px; color: #6b7280; text-align: right; white-space: nowrap; }

        /* Skills */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .skill-group-label { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }
        .skill-list { font-size: 12.5px; color: #4b5563; line-height: 1.65; }

        /* Projects */
        .project-block { margin-bottom: 14px; }
        .project-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 4px; }
        .project-title { font-size: 13.5px; font-weight: 600; color: #0a0a0a; }
        .project-status { font-size: 11px; color: #6b7280; font-style: italic; }
        .project-tech { font-size: 11.5px; color: #2563eb; margin-top: 1px; font-weight: 500; }
        .project-desc { font-size: 12.5px; color: #4b5563; line-height: 1.65; margin-top: 4px; }

        /* Certs */
        .cert-list { list-style: none; }
        .cert-list li {
          font-size: 13px;
          color: #374151;
          padding: 4px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cert-list li::before { content: '▪'; color: #2563eb; flex-shrink: 0; }

        /* Research */
        .research-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .research-tag {
          font-size: 12px;
          padding: 3px 10px;
          border: 1px solid #d1d5db;
          border-radius: 3px;
          color: #374151;
        }

        /* Languages */
        .lang-row { display: flex; gap: 24px; }
        .lang-item { font-size: 13px; color: #374151; }
        .lang-level { font-size: 11px; color: #6b7280; margin-left: 4px; }

        /* Print styles */
        @media print {
          @page {
            size: A4;
            margin: 18mm 16mm;
          }
          body { background: #fff !important; }
          .print-bar { display: none !important; }
          .cv-page {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
          }
          .exp-block, .project-block { page-break-inside: avoid; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      `}</style>

      {/* Print/Back bar */}
      <div className="print-bar">
        <a href="/" className="btn-back">← Back to Portfolio</a>
        <button className="btn-print" onClick={handlePrint}>
          ↓ Download PDF
        </button>
      </div>

      <div className="cv-page">

        {/* ── HEADER ───────────────────────────────────────────── */}
        <header className="cv-header">
          <div className="cv-name">Umesh Bhurtel</div>
          <div className="cv-title">IT Researcher &amp; R&amp;D Associate | AI/ML Research · Data Analysis · Remote</div>
          <div className="cv-contact">
            <span>📍 Bhaktapur, Nepal (UTC+5:45)</span>
            <span>✉ <a href="mailto:gpt@logictive.solutions">gpt@logictive.solutions</a></span>
            <span>🌐 Open to Remote · US &amp; Australia preferred</span>
          </div>
        </header>

        {/* ── PROFESSIONAL SUMMARY ─────────────────────────────── */}
        <section className="cv-section">
          <div className="cv-section-title">Professional Summary</div>
          <p className="cv-summary">
            IT researcher and R&amp;D Associate with 1.5+ years of hands-on experience in AI/ML research,
            technology analysis, and strategic documentation for global technology organizations.
            Skilled in leading end-to-end research initiatives, producing data-driven insights, and
            contributing to enterprise decision-making frameworks across TaaS, EOR, and AI/ML domains.
            Proficient in Python, SQL, prompt engineering, and LLM evaluation. Experienced in cross-functional
            collaboration with US and UK stakeholders. Currently pursuing B.Sc. (Hons.) in Information
            Technology. Seeking remote IT, research, data, or product-adjacent roles.
          </p>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <section className="cv-section">
          <div className="cv-section-title">Professional Experience</div>

          <div className="exp-block">
            <div className="exp-header">
              <div>
                <div className="exp-role">Research &amp; Development Associate</div>
                <div className="exp-company">Logictive Solutions</div>
              </div>
              <div className="exp-meta">
                <span className="exp-meta-line">May 2025 – Present</span>
                <span className="exp-meta-line">Bhaktapur, Nepal (Remote-capable)</span>
              </div>
            </div>
            <ul className="exp-bullets">
              <li>Lead R&amp;D initiatives across Technology-as-a-Service (TaaS), Employer-of-Record (EOR), and AI/ML annotation domains, delivering structured research outputs to international stakeholders.</li>
              <li>Produce research documentation, strategic presentations, and all-hands meeting content used in company-wide decision-making processes.</li>
              <li>Conduct bid evaluations using structured Go/No-Go frameworks for global RFPs, improving proposal quality and win-rate targeting.</li>
              <li>Support ISO 27001 information security processes, product launches, and cross-functional knowledge sharing initiatives.</li>
              <li>Develop LinkedIn thought leadership content, data-driven infographics, and carousel assets covering global technology and workforce trends.</li>
              <li>Collaborate across Nepal, UK, and US time zones in a fully remote research environment.</li>
            </ul>
          </div>

          <div className="exp-block">
            <div className="exp-header">
              <div>
                <div className="exp-role">Research &amp; Development Intern</div>
                <div className="exp-company">Logictive Solutions</div>
              </div>
              <div className="exp-meta">
                <span className="exp-meta-line">Feb 2025 – Apr 2025</span>
                <span className="exp-meta-line">Kathmandu, Nepal</span>
              </div>
            </div>
            <ul className="exp-bullets">
              <li>Supported R&amp;D output including pitch decks, competitive analysis reports, and market landscape research.</li>
              <li>Assisted in UGC/influencer strategy content production and coordinated Product Hunt launch campaigns.</li>
              <li>Applied structured research documentation standards and APA 7 academic writing conventions in a fast-paced technology environment.</li>
            </ul>
          </div>

          <div className="exp-block">
            <div className="exp-header">
              <div>
                <div className="exp-role">Field Supervisor &amp; Land Survey Technician</div>
                <div className="exp-company">Infrastructure &amp; Survey Projects</div>
              </div>
              <div className="exp-meta">
                <span className="exp-meta-line">Prior to 2025</span>
                <span className="exp-meta-line">Nepal</span>
              </div>
            </div>
            <ul className="exp-bullets">
              <li>Supervised infrastructure project execution and performed land surveys, building structured problem-solving skills applied in current research work.</li>
            </ul>
          </div>
        </section>

        {/* ── EDUCATION ────────────────────────────────────────── */}
        <section className="cv-section">
          <div className="cv-section-title">Education</div>
          <div className="edu-block">
            <div>
              <div className="edu-degree">B.Sc. (Hons.) in Information Technology</div>
              <div className="edu-school">Techspire College — in academic collaboration with Asia Pacific University</div>
              <div className="edu-note">Relevant Coursework: Decision Support Systems · Database Management · Software Engineering · Information Systems · Data Structures</div>
            </div>
            <div className="edu-date">Expected 2026</div>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <section className="cv-section">
          <div className="cv-section-title">Technical &amp; Professional Skills</div>
          <div className="skills-grid">
            <div>
              <div className="skill-group-label">Technical / Data</div>
              <div className="skill-list">Python · R · SQL · Microsoft Excel · Prompt Engineering · LLM Evaluation Methodology · API Integration · Statistics</div>
            </div>
            <div>
              <div className="skill-group-label">Research &amp; Product</div>
              <div className="skill-list">Research Design · Research Report Writing · Competitive Analysis · Product Analysis · Product Frameworks · Market Research</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div className="skill-group-label">Professional</div>
              <div className="skill-list">Technical Writing · APA 7 Academic Writing · Bid Evaluation · Strategic Presentations · Content Strategy · Project Management</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div className="skill-group-label">Collaboration &amp; Tools</div>
              <div className="skill-list">Remote Team Coordination · Cross-Cultural Collaboration · Workshop Facilitation · LinkedIn Thought Leadership · ISO 27001 Awareness</div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <section className="cv-section">
          <div className="cv-section-title">Key Projects</div>

          <div className="project-block">
            <div className="project-header">
              <div className="project-title">FixIt Bazaar — Home Services Marketplace</div>
              <div className="project-status">In Development</div>
            </div>
            <div className="project-tech">ASP.NET Web Forms · C# · SQL Server · Bootstrap 5</div>
            <div className="project-desc">
              Web-based marketplace for home repair and maintenance services in Nepal. Implements a
              role-based system for clients, service providers, and administrators with booking management,
              service listings, profile dashboards, and admin controls.
            </div>
          </div>

          <div className="project-block">
            <div className="project-header">
              <div className="project-title">Insurance Plan Recommendation Decision Support System</div>
              <div className="project-status">Research Phase</div>
            </div>
            <div className="project-tech">Java · Spring Boot · MySQL · Thymeleaf</div>
            <div className="project-desc">
              Web-based DSS using rule-based inference to guide users through personalized insurance
              plan selection in Nepal&apos;s underserved digital markets. Designed for users with limited
              digital literacy.
            </div>
          </div>

          <div className="project-block">
            <div className="project-header">
              <div className="project-title">Precision Farming Technologies in Nepal — Research Study</div>
              <div className="project-status">Complete</div>
            </div>
            <div className="project-tech">IoT Sensors · NDVI / Satellite Remote Sensing · AgriTech</div>
            <div className="project-desc">
              In-depth research on precision farming applicability for Nepal&apos;s smallholder farmers.
              Investigated IoT soil sensors, satellite NDVI mapping, drone-based monitoring, and
              variable-rate application systems — analysing cost barriers and cooperative delivery models.
            </div>
          </div>
        </section>

        {/* ── RESEARCH AREAS ───────────────────────────────────── */}
        <section className="cv-section">
          <div className="cv-section-title">Research Domains</div>
          <div className="research-tags">
            <span className="research-tag">AI/ML Annotation &amp; Data Pipelines</span>
            <span className="research-tag">Technology-as-a-Service (TaaS)</span>
            <span className="research-tag">Employer-of-Record (EOR) Frameworks</span>
            <span className="research-tag">AgriTech &amp; Precision Farming</span>
            <span className="research-tag">Decision Support Systems</span>
            <span className="research-tag">GPU Infrastructure &amp; Cloud Compute</span>
            <span className="research-tag">Global Talent Models</span>
          </div>
        </section>

        {/* ── CERTIFICATIONS ───────────────────────────────────── */}
        <section className="cv-section">
          <div className="cv-section-title">Certifications &amp; Credentials</div>
          <ul className="cert-list">
            <li>AWS Academy Cloud Foundations — Capstone Level</li>
            <li>PV Foundations Cohort #9</li>
            <li>B.Sc. (Hons.) Information Technology — Asia Pacific University (In Progress, 2026)</li>
          </ul>
        </section>

        {/* ── LANGUAGES ────────────────────────────────────────── */}
        <section className="cv-section" style={{ marginBottom: 0 }}>
          <div className="cv-section-title">Languages</div>
          <div className="lang-row">
            <div className="lang-item">English <span className="lang-level">(Professional Proficiency)</span></div>
            <div className="lang-item">Nepali <span className="lang-level">(Native)</span></div>
          </div>
        </section>

      </div>

      {/* Bottom padding for screen view */}
      <div style={{ height: 48 }} />
    </>
  );
}

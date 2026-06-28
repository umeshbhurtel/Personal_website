# Umesh Bhurtel — Personal Portfolio

A premium, full-stack personal portfolio and CMS built with Next.js 14, TailwindCSS, and Framer Motion. Features a headless admin panel for managing all site content without touching code.

---

## Features

### Frontend
- **Premium dark design** — Playfair Display + Inter typography, `#09090B` base
- **Smooth scrolling** — Lenis-powered with spring easing
- **Loading screen** — Animated progress steps on first visit (sessionStorage skip on revisit)
- **Rotating hero titles** — AnimatePresence ticker cycling research roles
- **Dual custom cursor** — Dot + lagging ring with hover expand (desktop only)
- **Scroll progress bar** — Gradient indicator fixed at top of page
- **Staggered section reveals** — Framer Motion scroll-triggered animations
- **Interactive timeline** — Glowing animated dots for work experience
- **Box-style credentials grid** — Responsive 1→2→3 column credential cards
- **Animated stat counters** — Numbers count up on scroll in About section
- **Fully responsive** — Mobile (375px) / Tablet (768px) / Desktop (1280px+)

### Admin CMS (`/admin`)
- Blog posts — Create, edit, publish/draft, delete with Markdown support
- Case studies — Manage with PDF upload and publish toggle
- Experience — Edit job entries with bullet points and current-role flag
- Projects — Featured toggle, tech stack, tags, status, external links
- Research areas — Edit research topics, icons, descriptions
- Skills — Four skill category pill editors + language proficiency
- CV/Resume — PDF upload; visitors download the exact file from nav bar
- Site content — Hero tagline, description, About paragraphs — all editable
- Contact submissions — View all form submissions
- Cookie-based auth — HMAC-signed session, 7-day TTL

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | TailwindCSS 3 |
| Animations | Framer Motion 12 |
| Smooth scroll | Lenis |
| Icons | Lucide React |
| Content | JSON flat-file CMS (`/data/*.json`) |
| Auth | HMAC-signed cookies (no database) |
| Email | Nodemailer (contact form) |
| Language | TypeScript |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/umeshbhurtel/Personal_website.git
cd Personal_website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Yes | Admin panel login password |
| `SESSION_SECRET` | Yes | Secret key for signing session cookies (min 32 chars) |
| `SMTP_HOST` | Optional | SMTP server for contact form emails |
| `SMTP_PORT` | Optional | SMTP port (587 for TLS) |
| `SMTP_USER` | Optional | SMTP username / email |
| `SMTP_PASS` | Optional | SMTP password / app password |
| `CONTACT_TO` | Optional | Email address to receive contact form submissions |

Generate a strong session secret:

```bash
openssl rand -base64 32
```

> Never commit `.env.local` — it is listed in `.gitignore`.

---

## Project Structure

```
├── app/
│   ├── admin/              # Admin CMS panel (protected)
│   │   ├── blog/           # Blog post editor
│   │   ├── case-studies/   # Case study editor
│   │   ├── content/        # Hero / About content editor
│   │   ├── cv/             # CV PDF uploader
│   │   ├── experience/     # Work experience editor
│   │   ├── projects/       # Projects editor
│   │   ├── research/       # Research areas editor
│   │   └── skills/         # Skills editor
│   ├── api/                # REST API routes
│   ├── blog/               # Public blog pages
│   ├── case-studies/       # Public case study pages
│   ├── globals.css         # Global styles & design tokens
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Homepage (server component)
│
├── components/
│   ├── About.tsx           # About section with animated counters
│   ├── Blog.tsx            # Blog preview section
│   ├── CaseStudies.tsx     # Case studies preview section
│   ├── CustomCursor.tsx    # Dual-layer custom cursor
│   ├── Experience.tsx      # Animated timeline
│   ├── Hero.tsx            # Hero with rotating titles & terminal
│   ├── LoadingScreen.tsx   # First-visit loading animation
│   ├── Nav.tsx             # Floating glass navigation
│   ├── NewsletterForm.tsx  # Newsletter subscription form
│   ├── Projects.tsx        # Projects card grid
│   ├── Research.tsx        # Research areas + credentials
│   ├── ScrollProgress.tsx  # Scroll progress bar
│   ├── Skills.tsx          # Animated skill pills
│   └── SmoothScrollProvider.tsx  # Lenis smooth scroll
│
├── data/                   # Flat-file JSON content store
│   ├── blog.json           # Blog posts
│   ├── content.json        # Hero / About content
│   ├── research.json       # Research areas
│   └── skills.json         # Skills data
│
├── lib/
│   ├── auth.ts             # Session / auth helpers
│   └── db.ts               # JSON read/write helpers + default data
│
├── public/
│   ├── uploads/
│   │   ├── cv/             # Uploaded CV PDF (gitignored, keep .gitkeep)
│   │   └── case-studies/   # Uploaded PDFs (gitignored, keep .gitkeep)
│   └── assets/             # Static images
│
├── .env.example            # Environment variable template
└── tailwind.config.ts      # Tailwind configuration
```

---

## Admin Panel

Access the admin panel at `/admin`. Login password is set via `ADMIN_PASSWORD` in your environment.

| Path | Purpose |
|------|---------|
| `/admin/content` | Edit hero tagline, description, About paragraphs |
| `/admin/blog` | Write and publish blog posts |
| `/admin/case-studies` | Add case studies with PDF upload |
| `/admin/experience` | Update work history timeline |
| `/admin/projects` | Manage project cards |
| `/admin/research` | Edit research areas and credentials |
| `/admin/skills` | Update skill pills by category |
| `/admin/cv` | Upload your latest CV PDF |

All changes are live instantly — no build or restart required.

---

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

### Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in the Vercel dashboard
4. Deploy

> **Note on persistence:** The `/data` directory stores CMS content as JSON files. On Vercel's serverless platform, file writes do not persist between deployments. For production, replace the read/write functions in `lib/db.ts` with a database (PlanetScale, Supabase, MongoDB Atlas, etc.).

---

## License

Open source for learning and reference. If you use this as a base for your own portfolio, please credit the original.

---

*Built by [Umesh Bhurtel](https://github.com/umeshbhurtel) — Bhaktapur, Nepal*

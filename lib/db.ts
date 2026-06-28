import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readFile<T>(filename: string, fallback: T): T {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

function writeFile(filename: string, data: unknown) {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Types ────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  published: boolean;
  date: string;
  createdAt: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  pdfPath: string;
  pdfName: string;
  published: boolean;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export type SiteContent = Record<string, string>;

// ─── Blog ─────────────────────────────────────────────

export function getAllBlogPosts(): BlogPost[] {
  return readFile<BlogPost[]>('blog.json', []);
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getAllBlogPosts().find((p) => p.slug === slug) ?? null;
}

export function getBlogPostById(id: string): BlogPost | null {
  return getAllBlogPosts().find((p) => p.id === id) ?? null;
}

export function saveBlogPost(post: BlogPost) {
  const posts = getAllBlogPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.push(post);
  }
  writeFile('blog.json', posts);
}

export function deleteBlogPost(id: string) {
  const posts = getAllBlogPosts().filter((p) => p.id !== id);
  writeFile('blog.json', posts);
}

// ─── Case Studies ─────────────────────────────────────

export function getAllCaseStudies(): CaseStudy[] {
  return readFile<CaseStudy[]>('case-studies.json', []);
}

export function getPublishedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies()
    .filter((c) => c.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return getAllCaseStudies().find((c) => c.slug === slug) ?? null;
}

export function getCaseStudyById(id: string): CaseStudy | null {
  return getAllCaseStudies().find((c) => c.id === id) ?? null;
}

export function saveCaseStudy(cs: CaseStudy) {
  const list = getAllCaseStudies();
  const idx = list.findIndex((c) => c.id === cs.id);
  if (idx >= 0) {
    list[idx] = cs;
  } else {
    list.push(cs);
  }
  writeFile('case-studies.json', list);
}

export function deleteCaseStudy(id: string) {
  const list = getAllCaseStudies().filter((c) => c.id !== id);
  writeFile('case-studies.json', list);
}

// ─── Contacts ─────────────────────────────────────────

export function getAllContacts(): Contact[] {
  return readFile<Contact[]>('contacts.json', [])
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function saveContact(contact: Contact) {
  const list = readFile<Contact[]>('contacts.json', []);
  list.push(contact);
  writeFile('contacts.json', list);
}

// ─── Site Content ─────────────────────────────────────

export function getSiteContent(): SiteContent {
  return readFile<SiteContent>('content.json', {});
}

export function setSiteContent(data: SiteContent) {
  writeFile('content.json', data);
}

// ─── Experience ───────────────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  points: string[];
}

const defaultExperience: ExperienceItem[] = [
  {
    id: '1',
    company: 'Logictive Solutions',
    role: 'Associated Research & Development',
    period: 'May 2025 – Present',
    location: 'Bhaktapur, Nepal (Remote-capable)',
    current: true,
    points: [
      'Lead R&D initiatives across TaaS, EOR, and AI/ML domains',
      'Produce research documentation, all-hands presentations, and strategic content',
      'Conduct bid evaluations using structured Go/No-Go frameworks for global RFPs',
      'Contribute to LinkedIn thought leadership, product launches, and ISO 27001 processes',
      'Develop LinkedIn carousel content and infographics on global technology trends',
    ],
  },
  {
    id: '2',
    company: 'Logictive Solutions',
    role: 'Research & Development Intern',
    period: 'Feb 2025 – Apr 2025',
    location: 'Kathmandu, Nepal',
    current: false,
    points: [
      'Supported R&D output including pitch decks and competitive analysis reports',
      'Assisted in UGC/influencer strategy content and Product Hunt campaigns',
      'Learned structured research documentation standards in a fast-paced tech environment',
    ],
  },
];

export function getExperience(): ExperienceItem[] {
  const stored = readFile<ExperienceItem[]>('experience.json', []);
  return stored.length ? stored : defaultExperience;
}

export function setExperience(data: ExperienceItem[]) {
  writeFile('experience.json', data);
}

// ─── Research ─────────────────────────────────────────

export interface ResearchArea {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  icon: string;
  label: string;
  note?: string;
}

export interface ResearchData {
  areas: ResearchArea[];
  certifications: Certification[];
}

const defaultResearch: ResearchData = {
  areas: [
    { id: '1', icon: '🌾', title: 'AgriTech & Precision Farming', description: "Researching how IoT sensors, drone imagery, and satellite data can improve crop yields for Nepal's smallholder farming communities — where 60% of the population still depends on agriculture." },
    { id: '2', icon: '🤖', title: 'AI/ML Annotation & Data Pipelines', description: 'Investigating practical applied AI: how quality training data is sourced, annotated, and validated — and what the global market for AI data services looks like for emerging economies.' },
    { id: '3', icon: '🌐', title: 'Global Talent Models', description: 'Studying Technology-as-a-Service and Employer-of-Record frameworks that enable remote talent acquisition across jurisdictions — with a focus on Nepal-to-West talent corridors.' },
    { id: '4', icon: '💡', title: 'Decision Support Systems', description: 'Exploring rule-based inference engines and expert systems for domains with limited digital penetration — insurance, agriculture policy, and public service delivery.' },
    { id: '5', icon: '🖥️', title: 'Potential of a GPU Centre in Nepal', description: 'Researching the economic and technical feasibility of establishing a shared GPU compute centre in Nepal — examining power infrastructure, cooling requirements, hydropower advantages, AI workload demand, and the potential to position Nepal as a regional hub for affordable ML training and inference services.' },
  ],
  certifications: [
    { id: '1', icon: '🏅', label: 'PV Foundations Cohort #9' },
    { id: '2', icon: '☁️', label: 'AWS Academy Cloud Foundations (Capstone-level)' },
    { id: '3', icon: '🎓', label: 'B.Sc. (Hons.) IT — Asia Pacific University', note: 'In Progress, 2026' },
  ],
};

export function getResearchData(): ResearchData {
  const stored = readFile<ResearchData | null>('research.json', null);
  if (!stored) return defaultResearch;
  return {
    areas: stored.areas?.length ? stored.areas : defaultResearch.areas,
    certifications: stored.certifications?.length ? stored.certifications : defaultResearch.certifications,
  };
}

export function setResearchData(data: ResearchData) {
  writeFile('research.json', data);
}

// ─── Skills ───────────────────────────────────────────

export interface SkillsData {
  aiLlm: string[];
  researchProduct: string[];
  professional: string[];
  languages: { lang: string; level: string }[];
}

const defaultSkills: SkillsData = {
  aiLlm: ['Prompt Engineering', 'LLM Evaluation Methodology', 'API Basics', 'Python & R', 'SQL', 'Statistics', 'Excel'],
  researchProduct: ['Research Design', 'Research Report Writing', 'Product Analysis', 'Product Framework'],
  professional: ['Technical Writing', 'Bid Evaluation', 'Strategic Presentations', 'Content Strategy', 'Cross-Cultural Collaboration', 'Project Management', 'LinkedIn Thought Leadership', 'Remote Team Coordination', 'APA 7 Academic Writing', 'Workshop Facilitation'],
  languages: [{ lang: 'English', level: 'Professional' }, { lang: 'Nepali', level: 'Native' }],
};

export function getSkillsData(): SkillsData {
  const stored = readFile<SkillsData | null>('skills.json', null);
  if (!stored) return defaultSkills;
  return {
    aiLlm: stored.aiLlm?.length ? stored.aiLlm : defaultSkills.aiLlm,
    researchProduct: stored.researchProduct?.length ? stored.researchProduct : defaultSkills.researchProduct,
    professional: stored.professional?.length ? stored.professional : defaultSkills.professional,
    languages: stored.languages?.length ? stored.languages : defaultSkills.languages,
  };
}

export function setSkillsData(data: SkillsData) {
  writeFile('skills.json', data);
}

// ─── Projects ─────────────────────────────────────────

export interface ProjectItem {
  id: string;
  title: string;
  tags: string[];
  description: string;
  tech: string[];
  status: string;
  link?: string;
  linkLabel?: string;
  linkIcon?: 'github' | 'external';
  featured: boolean;
}

const defaultProjects: ProjectItem[] = [
  {
    id: '1',
    title: 'FixIt Bazaar',
    tags: ['FYP', 'Web App', 'ASP.NET'],
    description: 'A web-based marketplace for home repair and maintenance services in Nepal. Built with ASP.NET Web Forms, Bootstrap 5, and SQL Server LocalDB. Features a role-based system for clients, service providers, and admins — with booking management, service listings, profile dashboards, and admin controls.',
    tech: ['ASP.NET Web Forms', 'SQL Server', 'Bootstrap 5', 'C#'],
    status: 'In Development',
    link: '#',
    linkLabel: 'GitHub',
    linkIcon: 'github',
    featured: true,
  },
  {
    id: '2',
    title: 'Insurance Plan Recommendation DSS',
    tags: ['FYP Proposal', 'Research', 'Java'],
    description: 'A web-based Decision Support System for insurance plan selection in Nepal, using rule-based inference to guide users through personalized plan matching. Designed for underserved insurance markets with limited digital literacy.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf'],
    status: 'Research Phase',
    link: '#',
    linkLabel: 'View Proposal',
    linkIcon: 'external',
    featured: true,
  },
  {
    id: '3',
    title: 'Precision Farming in Nepal',
    tags: ['Research', 'AgriTech', 'Nepal'],
    description: "Conducted in-depth research into precision farming technologies and their applicability for Nepal's smallholder farmers.",
    tech: ['IoT Sensors', 'NDVI / Remote Sensing', 'AgriTech', 'Research Documentation'],
    status: 'Research Complete',
    featured: false,
  },
];

export function getProjects(): ProjectItem[] {
  const stored = readFile<ProjectItem[]>('projects.json', []);
  return stored.length ? stored : defaultProjects;
}

export function setProjects(data: ProjectItem[]) {
  writeFile('projects.json', data);
}

// ─── CV ───────────────────────────────────────────────

export interface CVData {
  path: string;
  originalName: string;
  uploadedAt: string;
}

export function getCVData(): CVData | null {
  return readFile<CVData | null>('cv.json', null);
}

export function setCVData(data: CVData) {
  writeFile('cv.json', data);
}

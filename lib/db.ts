import { getDb } from './mongodb';

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

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  points: string[];
}

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

export interface SkillsData {
  aiLlm: string[];
  researchProduct: string[];
  professional: string[];
  languages: { lang: string; level: string }[];
}

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

export interface CVData {
  path: string;
  originalName: string;
  uploadedAt: string;
}

// ─── Defaults ─────────────────────────────────────────

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

const defaultSkills: SkillsData = {
  aiLlm: ['Prompt Engineering', 'LLM Evaluation Methodology', 'API Basics', 'Python & R', 'SQL', 'Statistics', 'Excel'],
  researchProduct: ['Research Design', 'Research Report Writing', 'Product Analysis', 'Product Framework'],
  professional: ['Technical Writing', 'Bid Evaluation', 'Strategic Presentations', 'Content Strategy', 'Cross-Cultural Collaboration', 'Project Management', 'LinkedIn Thought Leadership', 'Remote Team Coordination', 'APA 7 Academic Writing', 'Workshop Facilitation'],
  languages: [{ lang: 'English', level: 'Professional' }, { lang: 'Nepali', level: 'Native' }],
};

const defaultProjects: ProjectItem[] = [
  {
    id: '1',
    title: 'FixIt Bazaar',
    tags: ['FYP', 'Web App', 'ASP.NET'],
    description: 'A web-based marketplace for home repair and maintenance services in Nepal. Built with ASP.NET Web Forms, Bootstrap 5, and SQL Server LocalDB. Features a role-based system for clients, service providers, and admins.',
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
    description: 'A web-based Decision Support System for insurance plan selection in Nepal, using rule-based inference to guide users through personalized plan matching.',
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

// ─── Helper ───────────────────────────────────────────

async function getDoc<T>(collection: string, defaultValue: T): Promise<T> {
  const db = await getDb();
  const doc = await db.collection(collection).findOne({ _key: 'main' });
  if (!doc) return defaultValue;
  const { _id, _key, ...rest } = doc;
  void _id; void _key;
  return rest as T;
}

async function setDoc(collection: string, data: unknown) {
  const db = await getDb();
  await db.collection(collection).updateOne(
    { _key: 'main' },
    { $set: { _key: 'main', ...(data as object) } },
    { upsert: true }
  );
}

async function getList<T>(collection: string, defaultValue: T[]): Promise<T[]> {
  const db = await getDb();
  const docs = await db.collection(collection).find({}).toArray();
  if (!docs.length) return defaultValue;
  return docs.map(({ _id, ...rest }) => { void _id; return rest as T; });
}

// ─── Blog ─────────────────────────────────────────────

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return getList<BlogPost>('blog', []);
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  const doc = await db.collection('blog').findOne({ slug });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  void _id;
  return rest as BlogPost;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const db = await getDb();
  const doc = await db.collection('blog').findOne({ id });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  void _id;
  return rest as BlogPost;
}

export async function saveBlogPost(post: BlogPost) {
  const db = await getDb();
  await db.collection('blog').updateOne({ id: post.id }, { $set: post }, { upsert: true });
}

export async function deleteBlogPost(id: string) {
  const db = await getDb();
  await db.collection('blog').deleteOne({ id });
}

// ─── Case Studies ─────────────────────────────────────

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return getList<CaseStudy>('caseStudies', []);
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const list = await getAllCaseStudies();
  return list
    .filter((c) => c.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const db = await getDb();
  const doc = await db.collection('caseStudies').findOne({ slug });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  void _id;
  return rest as CaseStudy;
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const db = await getDb();
  const doc = await db.collection('caseStudies').findOne({ id });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  void _id;
  return rest as CaseStudy;
}

export async function saveCaseStudy(cs: CaseStudy) {
  const db = await getDb();
  await db.collection('caseStudies').updateOne({ id: cs.id }, { $set: cs }, { upsert: true });
}

export async function deleteCaseStudy(id: string) {
  const db = await getDb();
  await db.collection('caseStudies').deleteOne({ id });
}

// ─── Contacts ─────────────────────────────────────────

export async function getAllContacts(): Promise<Contact[]> {
  const list = await getList<Contact>('contacts', []);
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveContact(contact: Contact) {
  const db = await getDb();
  await db.collection('contacts').insertOne({ ...contact });
}

// ─── Site Content ─────────────────────────────────────

export async function getSiteContent(): Promise<SiteContent> {
  return getDoc<SiteContent>('siteContent', {});
}

export async function setSiteContent(data: SiteContent) {
  await setDoc('siteContent', data);
}

// ─── Experience ───────────────────────────────────────

export async function getExperience(): Promise<ExperienceItem[]> {
  const stored = await getList<ExperienceItem>('experience', []);
  return stored.length ? stored : defaultExperience;
}

export async function setExperience(data: ExperienceItem[]) {
  const db = await getDb();
  await db.collection('experience').deleteMany({});
  if (data.length) await db.collection('experience').insertMany(data.map(d => ({ ...d })));
}

// ─── Research ─────────────────────────────────────────

export async function getResearchData(): Promise<ResearchData> {
  const stored = await getDoc<ResearchData | null>('research', null);
  if (!stored) return defaultResearch;
  return {
    areas: stored.areas?.length ? stored.areas : defaultResearch.areas,
    certifications: stored.certifications?.length ? stored.certifications : defaultResearch.certifications,
  };
}

export async function setResearchData(data: ResearchData) {
  await setDoc('research', data);
}

// ─── Skills ───────────────────────────────────────────

export async function getSkillsData(): Promise<SkillsData> {
  const stored = await getDoc<SkillsData | null>('skills', null);
  if (!stored) return defaultSkills;
  return {
    aiLlm: stored.aiLlm?.length ? stored.aiLlm : defaultSkills.aiLlm,
    researchProduct: stored.researchProduct?.length ? stored.researchProduct : defaultSkills.researchProduct,
    professional: stored.professional?.length ? stored.professional : defaultSkills.professional,
    languages: stored.languages?.length ? stored.languages : defaultSkills.languages,
  };
}

export async function setSkillsData(data: SkillsData) {
  await setDoc('skills', data);
}

// ─── Projects ─────────────────────────────────────────

export async function getProjects(): Promise<ProjectItem[]> {
  const stored = await getList<ProjectItem>('projects', []);
  return stored.length ? stored : defaultProjects;
}

export async function setProjects(data: ProjectItem[]) {
  const db = await getDb();
  await db.collection('projects').deleteMany({});
  if (data.length) await db.collection('projects').insertMany(data.map(d => ({ ...d })));
}

// ─── CV ───────────────────────────────────────────────

export async function getCVData(): Promise<CVData | null> {
  return getDoc<CVData | null>('cv', null);
}

export async function setCVData(data: CVData) {
  await setDoc('cv', data);
}

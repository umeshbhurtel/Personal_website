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

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import CaseStudies from '@/components/CaseStudies';
import Skills from '@/components/Skills';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import {
  getSiteContent,
  getExperience,
  getResearchData,
  getSkillsData,
  getProjects,
  getPublishedBlogPosts,
  getPublishedCaseStudies,
} from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [content, experiences, research, skills, projects, allBlogPosts, allCaseStudies] =
    await Promise.all([
      getSiteContent(),
      getExperience(),
      getResearchData(),
      getSkillsData(),
      getProjects(),
      getPublishedBlogPosts(),
      getPublishedCaseStudies(),
    ]);

  const blogPosts = allBlogPosts.slice(0, 2);
  const caseStudies = allCaseStudies.slice(0, 4);

  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Hero tagline={content.hero_tagline} description={content.hero_description} />
        <About
          para1={content.about_para1}
          para2={content.about_para2}
          para3={content.about_para3}
          quote={content.about_quote}
        />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Research data={research} />
        <CaseStudies studies={caseStudies} />
        <Skills data={skills} />
        <Blog posts={blogPosts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

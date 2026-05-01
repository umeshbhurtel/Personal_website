import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Skills from '@/components/Skills';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { getSiteContent } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Home() {
  const content = getSiteContent();

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
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

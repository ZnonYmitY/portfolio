import { useEffect, useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeAgent from './components/ResumeAgent';

function AppContent() {
  const [scrolled, setScrolled] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const openAgent = () => setAgentOpen(true);
    window.addEventListener('open-resume-agent', openAgent);
    return () => window.removeEventListener('open-resume-agent', openAgent);
  }, []);

  return (
    <div className="site-shell">
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact onAsk={() => setAgentOpen(true)} />
      </main>
      <Footer />
      <ResumeAgent open={agentOpen} onOpen={() => setAgentOpen(true)} onClose={() => setAgentOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

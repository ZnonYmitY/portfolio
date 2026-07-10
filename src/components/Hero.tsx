import { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const roles = t.hero.roles;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 60);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 35);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }
  }, [charIndex, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden px-6">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Corner decorators */}
      <div className="absolute top-20 left-8 w-12 h-12 border-l-2 border-t-2 border-cyan-500/20" />
      <div className="absolute top-20 right-8 w-12 h-12 border-r-2 border-t-2 border-cyan-500/20" />
      <div className="absolute bottom-20 left-8 w-12 h-12 border-l-2 border-b-2 border-cyan-500/20" />
      <div className="absolute bottom-20 right-8 w-12 h-12 border-r-2 border-b-2 border-cyan-500/20" />

      <div className="max-w-3xl w-full text-center z-10">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400/70 tracking-widest mb-8 border border-cyan-500/20 px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow inline-block" />
          {t.hero.status}
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-none">
          {t.hero.name}
          <span className="text-cyan-400 glow-text"> {t.hero.nameHighlight}</span>
        </h1>

        {/* Typing role */}
        <div className="h-10 flex items-center justify-center mb-8">
          <p className="font-mono text-lg md:text-xl text-gray-400">
            {displayed}
            <span className="cursor-blink text-cyan-400">|</span>
          </p>
        </div>

        {/* Short intro */}
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-sans">
          {t.hero.intro}
          {t.hero.location} <span className="text-gray-300">{t.hero.yourCity}</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="font-mono text-sm tracking-wider px-6 py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-200"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#contact"
            className="font-mono text-sm tracking-wider px-6 py-3 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-200"
          >
            {t.hero.cta2}
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6">
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:you@example.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-gray-600 hover:text-cyan-400 transition-colors duration-200"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-cyan-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={22} />
      </a>
    </section>
  );
}

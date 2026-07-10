import { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050a14]/90 backdrop-blur-md border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Terminal size={18} className="text-cyan-400" />
          <span className="text-cyan-400 font-mono text-sm tracking-wider group-hover:glow-text transition-all">
            {'<YourName />'}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-mono text-xs tracking-widest text-gray-400 hover:text-cyan-400 transition-colors duration-200 uppercase"
              >
                <span className="text-cyan-500/60 mr-1">{'>'}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center border border-gray-800 bg-white/[0.02]">
            {(['en', 'zh'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all ${
                  language === lang
                    ? 'bg-cyan-500/10 text-cyan-400 border-r border-gray-800'
                    : 'text-gray-500 hover:text-gray-300'
                } ${lang === 'zh' ? '' : ''}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href="/resume.pdf"
            className="text-xs font-mono tracking-wider text-cyan-400 border border-cyan-500/40 px-4 py-2 hover:bg-cyan-500/10 transition-all duration-200"
          >
            {t.nav.resume}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-cyan-400 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#050a14]/95 backdrop-blur-md border-b border-cyan-500/10 px-6 py-4">
          <div className="flex items-center border border-gray-800 bg-white/[0.02] mb-4">
            {(['en', 'zh'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 px-3 py-1.5 text-xs font-mono tracking-wider transition-all ${
                  language === lang
                    ? 'bg-cyan-500/10 text-cyan-400 border-r border-gray-800'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <ul className="flex flex-col gap-4">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest block"
                >
                  <span className="text-cyan-500/60 mr-2">{'>'}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

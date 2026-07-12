import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  return (
    <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-inner" aria-label="Primary navigation">
        <a href="#top" className="brand" aria-label="Avery Zhao home">
          <span className="brand-mark">YZ</span>
          <span className="brand-name">AVERY.ZHAO</span>
        </a>

        <div className="nav-links">
          {t.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>

        <div className="nav-actions">
          <div className="language-switch" aria-label="Language switcher">
            {(['zh', 'en'] as const).map((lang) => (
              <button key={lang} className={language === lang ? 'active' : ''} onClick={() => setLanguage(lang)}>
                {lang === 'zh' ? '中' : 'EN'}
              </button>
            ))}
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {t.nav.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </div>
      )}
    </header>
  );
}

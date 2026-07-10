import { Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="border-t border-gray-900 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-cyan-400/50" />
          <span className="font-mono text-xs text-gray-700">{'<YourName />'}</span>
        </div>
        <p className="font-mono text-xs text-gray-800">
          {new Date().getFullYear()} · {t.footer.designed}
        </p>
        <a
          href="#"
          className="font-mono text-xs text-gray-700 hover:text-cyan-400 transition-colors tracking-widest uppercase"
        >
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}

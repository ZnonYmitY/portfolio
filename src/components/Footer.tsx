import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()}</span>
      <span>{content[language].footer}</span>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  );
}

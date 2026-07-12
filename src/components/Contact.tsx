import { ArrowUpRight, Github, Sparkles } from 'lucide-react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact({ onAsk }: { onAsk: () => void }) {
  const { language } = useLanguage();
  const t = content[language].contact;
  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" />
      <div className="section-shell contact-inner">
        <p>{t.kicker}</p>
        <h2>{t.title}</h2>
        <span>{t.body}</span>
        <div>
          <button className="button button-primary" onClick={onAsk}><Sparkles size={17} />{t.agent}</button>
          <a className="button button-ghost" href="https://github.com/ZnonYmitY" target="_blank" rel="noreferrer"><Github size={17} />{t.github}<ArrowUpRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

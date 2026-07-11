import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="hero" id="top">
      <div className="hero-orbit" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit-dot" />
        <span>INSIGHT</span><span>MODEL</span><span>SYSTEM</span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow"><i />{t.hero.eyebrow}</p>
        <h1>
          <span>{t.hero.line1}</span>{' '}
          <strong>{t.hero.line2}</strong>
        </h1>
        <div className="hero-bottom">
          <p>{t.hero.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">{t.hero.primary}<ArrowDownRight size={17} /></a>
            <a className="button button-ghost" href="#about">{t.hero.secondary}<ArrowDownRight size={17} /></a>
          </div>
        </div>
      </div>
      <div className="hero-meta">
        <span>{t.hero.note}</span>
        <a href="https://github.com/ZnonYmitY" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={14} /></a>
      </div>
      <div className="signal-grid">
        {t.signals.map((signal) => (
          <article key={signal.label}>
            <strong>{signal.value}</strong>
            <span>{signal.label}</span>
            <small>{signal.meta}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

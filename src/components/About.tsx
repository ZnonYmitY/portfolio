import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeading from './SectionHeading';

export default function About() {
  const { language } = useLanguage();
  const t = content[language].about;
  return (
    <section className="section about-section" id="about">
      <div className="section-shell split-intro">
        <SectionHeading kicker={t.kicker} title={t.title} />
        <p className="section-lead">{t.body}</p>
      </div>
      <div className="section-shell principle-grid">
        {t.cards.map((card) => (
          <article key={card.index} className="principle-card">
            <span>{card.index}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

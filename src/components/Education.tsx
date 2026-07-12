import type { CSSProperties } from 'react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeading from './SectionHeading';

export default function Education() {
  const { language } = useLanguage();
  const t = content[language].education;
  return (
    <section className="section education-section" id="education">
      <div className="section-shell">
        <SectionHeading kicker={t.kicker} title={t.title} />
        <div className="education-layout">
          <div className="school-list">
            {t.schools.map((item) => (
              <article key={item.school}>
                <span className="school-rank">{item.rank}</span>
                <div><p>{item.period}</p><h3>{item.school}</h3><strong>{item.degree}</strong><small>{item.detail}</small></div>
              </article>
            ))}
          </div>
          <div className="capability-map">
            <p>{t.skillsTitle}</p>
            <div>{t.skills.map((skill, index) => <span key={skill} style={{ '--i': index } as CSSProperties}>{skill}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

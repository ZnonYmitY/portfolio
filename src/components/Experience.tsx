import { Check, CornerDownRight } from 'lucide-react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeading from './SectionHeading';

export default function Experience() {
  const { language } = useLanguage();
  const t = content[language].experience;
  return (
    <section className="section experience-section" id="experience">
      <div className="section-shell">
        <SectionHeading kicker={t.kicker} title={t.title} />
        <div className="experience-list">
          {t.items.map((item, index) => (
            <article className="experience-card" key={item.org}>
              <div className="experience-index">0{index + 1}</div>
              <div className="experience-main">
                <div className="experience-head">
                  <div><p>{item.org}</p><h3>{item.role}</h3></div>
                  <span>{item.period}</span>
                </div>
                <p className="experience-summary">{item.summary}</p>
                <ul>
                  {item.outcomes.map((outcome) => <li key={outcome}><Check size={15} />{outcome}</li>)}
                </ul>
                <div className="tag-row"><CornerDownRight size={15} />{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

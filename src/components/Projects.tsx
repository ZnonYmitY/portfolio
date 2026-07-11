import { ArrowUpRight } from 'lucide-react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import SectionHeading from './SectionHeading';

export default function Projects() {
  const { language } = useLanguage();
  const t = content[language].projects;
  return (
    <section className="section projects-section" id="projects">
      <div className="section-shell">
        <SectionHeading kicker={t.kicker} title={t.title} />
        <div className="projects-grid">
          {t.items.map((project, index) => (
            <article className={`project-card accent-${project.accent} ${index === 0 ? 'featured' : ''}`} key={project.name}>
              <div className="project-top"><span>{project.no}</span><i /></div>
              <p className="project-label">{project.label}</p>
              <h3>{project.name}</h3>
              <p className="project-body">{project.body}</p>
              <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {project.href && <a href={project.href} target="_blank" rel="noreferrer">{t.view}<ArrowUpRight size={16} /></a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

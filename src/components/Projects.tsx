import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { SectionLabel } from './About';
import { ExternalLink, Github, Star } from 'lucide-react';

export default function Projects() {
  const { ref, visible } = useReveal();
  const { language } = useLanguage();
  const t = translations[language];
  const allProjects = t.projects.items.map((item, i) => ({
    ...item,
    github: 'https://github.com',
    live: i % 3 !== 2 ? 'https://example.com' : null,
    stars: [342, 128, 89, 215, 56, 44][i],
    featured: i < 3,
  }));
  const featured = allProjects.filter(p => p.featured);
  const others = allProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref as React.RefObject<HTMLDivElement>}>
        <SectionLabel index="03" title={t.projects.title} />

        {/* Featured */}
        <div className={`reveal ${visible ? 'visible' : ''} mt-12 grid md:grid-cols-3 gap-4 mb-4`}>
          {featured.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        {/* Other */}
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((p) => (
            <ProjectCard key={p.title} project={p} small />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-gray-500 hover:text-cyan-400 transition-colors"
          >
            <Github size={14} />
            {t.projects.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  small = false,
}: {
  project: (typeof projects)[0];
  small?: boolean;
}) {
  return (
    <div className="border border-gray-800 bg-white/[0.02] p-5 hover:border-cyan-500/20 hover:bg-cyan-500/[0.03] transition-all duration-300 group flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <h3 className={`font-mono text-gray-200 group-hover:text-white transition-colors ${small ? 'text-sm' : 'text-base'}`}>
          {project.title}
        </h3>
        <div className="flex items-center gap-3 text-gray-600">
          {project.github && (
            <a href={project.github} aria-label="GitHub" className="hover:text-cyan-400 transition-colors">
              <Github size={14} />
            </a>
          )}
          {project.live && (
            <a href={project.live} aria-label="Live" className="hover:text-cyan-400 transition-colors">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <p className={`text-gray-500 font-sans leading-relaxed flex-1 ${small ? 'text-xs' : 'text-sm'}`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.tags.map(t => (
          <span key={t} className="text-xs font-mono text-cyan-500/60 bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/10">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1 text-gray-700 font-mono text-xs">
        <Star size={11} />
        {project.stars}
      </div>
    </div>
  );
}

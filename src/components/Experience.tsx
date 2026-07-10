import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { SectionLabel } from './About';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function Experience() {
  const { ref, visible } = useReveal();
  const { language } = useLanguage();
  const t = translations[language];
  const experiences = t.experience.items.map((item, i) => ({
    ...item,
    type: (i < 3 ? 'work' : 'edu') as const,
  }));

  return (
    <section id="experience" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto" ref={ref as React.RefObject<HTMLDivElement>}>
        <SectionLabel index="04" title={t.experience.title} />

        <div className={`reveal ${visible ? 'visible' : ''} mt-12 relative`}>
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/30 via-cyan-500/10 to-transparent hidden md:block ml-4" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="md:pl-14 relative group">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-5 w-8 h-8 border border-gray-800 bg-[#050a14] items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                  {exp.type === 'work'
                    ? <Briefcase size={12} className="text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                    : <GraduationCap size={12} className="text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                  }
                </div>

                <div className="border border-gray-800 bg-white/[0.02] p-6 hover:border-cyan-500/20 hover:bg-cyan-500/[0.03] transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-mono text-gray-100 text-sm">{exp.role}</h3>
                      <p className="font-sans text-cyan-400/70 text-sm mt-0.5">{exp.org}</p>
                    </div>
                    <span className="font-mono text-xs text-gray-600 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(t => (
                      <span key={t} className="text-xs font-mono text-gray-600 border border-gray-800 px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

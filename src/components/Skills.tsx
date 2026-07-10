import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { SectionLabel } from './About';

export default function Skills() {
  const { ref, visible } = useReveal();
  const { language } = useLanguage();
  const t = translations[language];
  const categories = t.skills.categories;

  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-5xl mx-auto" ref={ref as React.RefObject<HTMLDivElement>}>
        <SectionLabel index="02" title={t.skills.title} />

        <div className={`reveal ${visible ? 'visible' : ''} mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="border border-gray-800 bg-white/[0.02] p-5 hover:border-cyan-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-cyan-500/40 font-mono text-xs">{'{'}</span>
                <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400/80 group-hover:text-cyan-400 transition-colors">
                  {cat.label}
                </h3>
                <span className="text-cyan-500/40 font-mono text-xs">{'}'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono text-gray-500 bg-gray-900 border border-gray-800 px-2 py-1 hover:border-cyan-500/30 hover:text-gray-300 transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

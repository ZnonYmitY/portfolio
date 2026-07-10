import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { User, MapPin, Coffee, Code2 } from 'lucide-react';

export default function About() {
  const { ref, visible } = useReveal();
  const { language } = useLanguage();
  const t = translations[language];
  const iconMap = { Location: MapPin, Focus: Code2, Fuel: Coffee, Status: User, '位置': MapPin, '专注': Code2, '动力': Coffee, '状态': User };

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto" ref={ref as React.RefObject<HTMLDivElement>}>
        {/* Section header */}
        <SectionLabel index="01" title={t.about.title} />

        <div className={`reveal ${visible ? 'visible' : ''} grid md:grid-cols-2 gap-16 mt-12 items-start`}>
          {/* Text block */}
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed font-sans text-base">
              {t.about.intro}<span className="text-cyan-400">{t.about.introName}</span>{t.about.intro2}
            </p>
            <p className="text-gray-500 leading-relaxed font-sans text-base">
              {t.about.desc1}
            </p>
            <p className="text-gray-500 leading-relaxed font-sans text-base">
              {t.about.desc2}
            </p>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span className="text-cyan-500/60">{'>'}</span> {t.about.cta}
              </a>
            </div>
          </div>

          {/* Facts grid */}
          <div className="grid grid-cols-2 gap-3">
            {t.about.facts.map(({ label, value }) => {
              const Icon = iconMap[label as keyof typeof iconMap] || User;
              return (
                <div
                  key={label}
                  className="border border-gray-800 bg-white/[0.02] p-4 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 border-glow group"
                >
                  <Icon size={16} className="text-cyan-400/60 mb-3 group-hover:text-cyan-400 transition-colors" />
                  <p className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-sans text-sm text-gray-300">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  const { language } = useLanguage();

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-cyan-500/50 tracking-widest">{index}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
      <h2 className={`font-mono text-sm uppercase tracking-[0.3em] text-cyan-400 ${language === 'zh' ? 'tracking-wider' : ''}`}>
        {title}
      </h2>
      <div className="h-px w-8 bg-cyan-500/20" />
    </div>
  );
}

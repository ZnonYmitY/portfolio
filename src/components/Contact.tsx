import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { SectionLabel } from './About';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  const { ref, visible } = useReveal();
  const { language } = useLanguage();
  const t = translations[language];
  const socials = t.contact.socials.map((item, i) => ({
    ...item,
    icon: [Github, Linkedin, Twitter][i],
    href: ['https://github.com', 'https://linkedin.com', 'https://twitter.com'][i],
  }));

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center" ref={ref as React.RefObject<HTMLDivElement>}>
        <SectionLabel index="05" title={t.contact.title} />

        <div className={`reveal ${visible ? 'visible' : ''} mt-12`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.contact.heading} <span className="text-cyan-400 glow-text">{t.contact.headingHighlight}</span>
          </h2>
          <p className="text-gray-500 font-sans leading-relaxed mb-10 max-w-lg mx-auto">
            {t.contact.desc}
          </p>

          {/* Email CTA */}
          <a
            href="mailto:you@example.com"
            className="inline-flex items-center gap-3 font-mono text-sm tracking-wider px-8 py-4 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/70 transition-all duration-200 mb-12 border-glow"
          >
            <Mail size={16} />
            {t.contact.email}
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="font-mono text-xs text-gray-700 tracking-widest">{t.contact.or}</span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          {/* Social links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {socials.map(({ icon: Icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 px-5 py-3 border border-gray-800 hover:border-gray-600 text-gray-500 hover:text-gray-200 transition-all duration-200 w-48 group"
              >
                <Icon size={16} className="group-hover:text-cyan-400 transition-colors" />
                <div className="text-left">
                  <p className="font-mono text-xs text-gray-600 uppercase tracking-wider">{label}</p>
                  <p className="font-mono text-xs">{handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

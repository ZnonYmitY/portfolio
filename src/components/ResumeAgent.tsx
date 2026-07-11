import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUp, Bot, Loader2, Sparkles, UserRound, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { askResumeAgent } from '../resumeAgent';

interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  sources?: string[];
  mode?: 'remote' | 'local';
}

const ui = {
  zh: {
    title: 'Avery Twin',
    subtitle: '数字分身 · 基于公开简历事实',
    greeting: '你好，我是 Avery Twin。你可以直接问我做过什么、擅长什么，或哪些结果最有代表性。',
    prompts: ['你最有代表性的量化成果？', '介绍一下你的 Piasnews', '你为什么适合 AI 产品岗位？', '你在字节做了什么？'],
    placeholder: '问我一个问题…',
    local: '本地知识库',
    remote: 'Agent 在线',
    source: '依据',
    disclaimer: '我只回答简历中可验证的信息',
    open: 'Avery Twin',
  },
  en: {
    title: 'Avery Twin',
    subtitle: 'Digital twin · Grounded in résumé facts',
    greeting: "Hi, I'm Avery Twin. Ask what I've built, where I'm strongest, or which outcomes best represent my work.",
    prompts: ['What are your strongest metrics?', 'Tell me about your Piasnews project', 'Why are you a fit for AI product roles?', 'What did you do at ByteDance?'],
    placeholder: 'Ask me something…',
    local: 'Local knowledge',
    remote: 'Agent online',
    source: 'Sources',
    disclaimer: 'I answer only from verifiable résumé information',
    open: 'Avery Twin',
  },
} as const;

export default function ResumeAgent({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  const { language } = useLanguage();
  const t = ui[language];
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: 'assistant', text: t.greeting }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: Date.now(), role: 'assistant', text: t.greeting }]);
  }, [language, t.greeting]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = async (value: string) => {
    const clean = value.trim();
    if (!clean || loading) return;
    const userMessage: Message = { id: Date.now(), role: 'user', text: clean };
    setMessages((current) => [...current, userMessage]);
    setQuestion('');
    setLoading(true);
    const result = await askResumeAgent(clean, language);
    setMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', text: result.answer, sources: result.sources, mode: result.mode }]);
    setLoading(false);
  };

  const onSubmit = (event: FormEvent) => { event.preventDefault(); void submit(question); };

  if (!open) {
    return <button className="agent-fab" onClick={onOpen} aria-label={t.title}><Sparkles size={18} /><span>{t.open}</span><i /></button>;
  }

  return (
    <aside className="agent-panel" aria-label={t.title} aria-live="polite">
      <header className="agent-header">
        <div className="agent-avatar"><Bot size={19} /></div>
        <div><strong>{t.title}</strong><span><i />{t.subtitle}</span></div>
        <button onClick={onClose} aria-label="Close agent"><X size={18} /></button>
      </header>

      <div className="agent-feed" ref={feedRef}>
        {messages.map((message) => (
          <div className={`message ${message.role}`} key={message.id}>
            <div className="message-icon">{message.role === 'assistant' ? <Bot size={15} /> : <UserRound size={15} />}</div>
            <div className="message-content">
              <p>{message.text}</p>
              {message.sources && message.sources.length > 0 && (
                <div className="message-sources"><span>{t.source}</span>{message.sources.map((source) => <i key={source}>{source}</i>)}</div>
              )}
              {message.mode && <small>{message.mode === 'remote' ? t.remote : t.local}</small>}
            </div>
          </div>
        ))}
        {messages.length === 1 && (
          <div className="prompt-list">{t.prompts.map((prompt) => <button key={prompt} onClick={() => void submit(prompt)}>{prompt}<span>↗</span></button>)}</div>
        )}
        {loading && <div className="message assistant"><div className="message-icon"><Bot size={15} /></div><div className="typing"><i /><i /><i /></div></div>}
      </div>

      <form className="agent-input" onSubmit={onSubmit}>
        <input ref={inputRef} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.placeholder} maxLength={300} />
        <button type="submit" disabled={!question.trim() || loading} aria-label="Send question">
          {loading ? <Loader2 className="spin" size={18} /> : <ArrowUp size={18} />}
        </button>
      </form>
      <footer>{t.disclaimer}</footer>
    </aside>
  );
}

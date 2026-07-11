import type { Language } from './i18n';

export interface AgentAnswer {
  answer: string;
  sources: string[];
  mode: 'remote' | 'local';
}

interface KnowledgeItem {
  keywords: string[];
  answer: Record<Language, string>;
  sources: Record<Language, string[]>;
}

const knowledge: KnowledgeItem[] = [
  {
    keywords: ['介绍', '你是谁', '背景', 'about', 'who are', 'summary', 'profile'],
    answer: {
      zh: '我是赵盈盈，一名 AI 产品经理与实践者。本科就读于北京理工大学人工智能专业，硕士就读于新加坡国立大学 CS-AI。我在京东探索研究院做过 ToB AIGC 与数字人平台，现在字节跳动抖音资讯负责 C 端搜索与 AI 内容产品，覆盖从洞察、模型方案到工程落地的完整链路。',
      en: "I'm Avery Zhao, an AI product manager and hands-on builder with a B.Eng. in AI from BIT and an M.Sc. in CS-AI from NUS. I worked on B2B AIGC at JD Explore Academy and now own consumer search and AI content experiences for Douyin News at ByteDance.",
    },
    sources: { zh: ['个人简介', '教育背景', '工作经历'], en: ['Profile', 'Education', 'Experience'] },
  },
  {
    keywords: ['教育', '学校', '学历', '课程', 'nus', '新加坡国立', '北理', 'education', 'university', 'degree'],
    answer: {
      zh: '我于 2019—2023 年在北京理工大学完成人工智能本科，NLP 97、语音识别与合成 95，研究课题发表于 2024 IEEE GRSL；2024—2026 年在新加坡国立大学攻读 CS-AI（Industry 4.0）硕士，人工智能、软件架构、企业系统与云计算物联网等课程均绩 A。',
      en: 'I completed a B.Eng. in Artificial Intelligence at Beijing Institute of Technology (2019–2023), with research published in IEEE GRSL 2024, and am pursuing an NUS M.Sc. in CS-AI (Industry 4.0, 2024–2026), averaging grade A across AI, software architecture, enterprise systems and cloud IoT coursework.',
    },
    sources: { zh: ['教育背景'], en: ['Education'] },
  },
  {
    keywords: ['字节', '抖音', '搜索', '热点', '召回', 'query', 'bytedance', 'douyin', 'search', 'recall'],
    answer: {
      zh: '在字节跳动抖音资讯，我负责热点搜索出卡与热搜融合页 AI 体验。代表工作包括：设计热点事件主动泛化 Query 的策略链路，人工评估准确率 >90%，带来融合页 DAU +4.21%、UV +6.36%；推进热点向量召回与资讯意图模型，前期实验 DAU +11.20%、UV +22.07%。',
      en: 'At Douyin News, I own hot-topic search recall and the AI experience on search fusion pages. I designed proactive query expansion at >90% human-evaluated precision, lifting DAU 4.21% and UV 6.36%, and advanced vector recall plus news-intent modeling, with early experiments showing DAU +11.20% and UV +22.07%.',
    },
    sources: { zh: ['字节跳动 · 搜索'], en: ['ByteDance · Search'] },
  },
  {
    keywords: ['内容', 'harness', 'skill', '生成', 'rag', '视频解析', 'content', 'generation', 'video analysis'],
    answer: {
      zh: '在资讯 AI 内容方向，我推动 AI 总结首 Tab 外显，并用高质量 RAG 来源与富媒体必保策略提升体验：3 分率由 27.3% 提升至 77%，争议事件好内容引用量 +322%。我也把内容生成重构为 Harness + Skill 统一骨架，并独立搭建了“线索抽取—检索补证—事实校验—双稿生成—自动质检”的视频解析 Skill。',
      en: 'On AI news content, I moved summaries to the first tab and improved RAG sourcing and rich-media guarantees, raising the top-rating rate from 27.3% to 77% and quality-source citations by 322%. I also rebuilt generation as a Harness + Skill system and independently prototyped a fact-grounded news-video analysis Skill.',
    },
    sources: { zh: ['字节跳动 · 频道', '核心优势'], en: ['ByteDance · Content', 'Strengths'] },
  },
  {
    keywords: ['京东', '言犀', 'aigc', '数字人', '脚本', '混剪', 'jd', 'yanxi', 'video script'],
    answer: {
      zh: '在京东探索研究院言犀 AIGC 平台，我主导营销脚本风格多样化改造，沉淀 28 类风格组合，供应商评分提升近 1 分，支撑季度 171.59 万条视频脚本交付；同时规划“视频理解 + 片段匹配”的智能混剪链路并输出 Demo。',
      en: 'At JD Explore Academy’s Yanxi AIGC platform, I led marketing-script style diversification, creating 28 foundational combinations, improving vendor scores by nearly one point and supporting 1.7159 million quarterly scripts. I also designed and demoed an intelligent “video understanding + clip matching” pipeline.',
    },
    sources: { zh: ['京东 · AIGC 与数字人'], en: ['JD · AIGC & Digital Humans'] },
  },
  {
    keywords: ['piasnews', 'f1', '皮亚斯特里', '自动化', '粉丝', 'fan', 'automation', 'news agent'],
    answer: {
      zh: 'Piasnews 是我为 F1 车手粉丝设计的资讯产品：多源发现、去重分类、可信度标注和日报生成被封装为 Agent Skill，同时提供公开网页降低使用门槛。系统由 GitHub Actions 每 6 小时更新，无托管后端，可持续发布并支持人工审核。',
      en: 'Piasnews is my F1 fan-news product, combining multi-source discovery, deduplication, trust labeling and brief generation in an Agent Skill, plus a public website for broader access. GitHub Actions refresh it every six hours without a hosted backend, while preserving a human review path.',
    },
    sources: { zh: ['AI 自研项目 · Piasnews'], en: ['Independent Project · Piasnews'] },
  },
  {
    keywords: ['项目', '作品', '自己做', '独立', 'portfolio', 'project', 'build', 'scentmuse', 'dri', '动画'],
    answer: {
      zh: '我的自研项目包括：F1 资讯 Agent 与日报网站 Piasnews、AI 情绪香水小程序 ScentMuse、AI DRI 学习指南网站，以及端到端 AI 剧情动画生成链路。共同特点是从具体用户痛点出发，把模型能力编排成可操作、可体验的产品。',
      en: 'My independent builds include Piasnews, the ScentMuse emotional-perfume mini program, an AI DRI learning site, and an end-to-end AI story-animation pipeline. Each starts from a concrete user problem and orchestrates model capability into an operable product experience.',
    },
    sources: { zh: ['AI 自研项目'], en: ['Independent Projects'] },
  },
  {
    keywords: ['优势', '能力', '技能', '适合', '为什么', 'strength', 'skill', 'fit', 'hire', 'good at'],
    answer: {
      zh: '我的核心优势是三点：一是对 AI 模型与工具保持高频、深度使用；二是能从洞察、选型、链路打通到效果调优完成端到端闭环；三是能在产品、算法、研发与运营之间做有效翻译。我尤其适合搜索/推荐、AI 内容生成、Agent 产品与多模态 AIGC 方向。',
      en: 'My core strengths are deep and current AI-tool fluency, end-to-end ownership from insight through tuning, and the ability to translate across product, algorithms, engineering and operations. I am particularly strong in search/recommendation, AI content, agent products and multimodal AIGC.',
    },
    sources: { zh: ['核心优势', '工作经历'], en: ['Strengths', 'Experience'] },
  },
  {
    keywords: ['指标', '数据', '结果', '成果', 'metric', 'number', 'impact', 'result'],
    answer: {
      zh: '我的部分可量化结果包括：热点向量召回实验 UV +22.07%、DAU +11.20%；热点主动泛化准确率 >90%；AI 总结 3 分率从 27.3% 提升至 77%；争议事件好内容引用量 +322%；优质正文日产能提升 4.48 倍；京东项目季度支撑 171.59 万条视频脚本。',
      en: 'My selected measurable outcomes include +22.07% UV and +11.20% DAU in an early vector-recall experiment; >90% query-expansion precision; top AI-summary ratings from 27.3% to 77%; quality-source citations +322%; daily quality article output 4.48×; and 1.7159 million quarterly video scripts at JD.',
    },
    sources: { zh: ['工作经历 · 量化结果'], en: ['Experience · Quantified outcomes'] },
  },
  {
    keywords: ['联系', '邮箱', '微信', 'github', 'contact', 'reach'],
    answer: {
      zh: '我当前公开的联系方式是 GitHub：github.com/ZnonYmitY。简历文档没有提供公开邮箱或微信，因此我不会猜测或生成未公开信息。',
      en: 'My current public contact is GitHub: github.com/ZnonYmitY. My résumé does not provide a public email or WeChat account, so I will not infer or invent one.',
    },
    sources: { zh: ['个人信息 · GitHub'], en: ['Profile · GitHub'] },
  },
];

const fallback: Record<Language, AgentAnswer> = {
  zh: {
    answer: '这个问题在当前简历资料里没有足够依据，我不想编造关于自己的答案。你可以问我的教育背景、字节/京东经历、量化成果、Piasnews 或核心优势。',
    sources: ['回答边界：仅使用已公开简历事实'],
    mode: 'local',
  },
  en: {
    answer: "I don't have enough evidence in my current résumé to answer that without guessing. Try asking about my education, ByteDance or JD work, quantified outcomes, Piasnews, or core strengths.",
    sources: ['Answer boundary: public résumé facts only'],
    mode: 'local',
  },
};

function localAnswer(question: string, language: Language): AgentAnswer {
  const normalized = question.toLowerCase().replace(/[?？!！,.，。]/g, ' ');
  let best: { item: KnowledgeItem; score: number } | null = null;

  for (const item of knowledge) {
    const score = item.keywords.reduce((total, keyword) => total + (normalized.includes(keyword.toLowerCase()) ? Math.max(2, keyword.length) : 0), 0);
    if (!best || score > best.score) best = { item, score };
  }

  if (!best || best.score === 0) return fallback[language];
  return { answer: best.item.answer[language], sources: best.item.sources[language], mode: 'local' };
}

export async function askResumeAgent(question: string, language: Language): Promise<AgentAnswer> {
  const endpoint = import.meta.env.VITE_RESUME_AGENT_ENDPOINT as string | undefined;
  if (!endpoint) return localAnswer(question, language);

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, language }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Agent endpoint returned ${response.status}`);
    const data = await response.json() as { answer?: string; sources?: string[] };
    if (!data.answer) throw new Error('Agent endpoint returned no answer');
    return { answer: data.answer, sources: data.sources ?? [], mode: 'remote' };
  } catch {
    return localAnswer(question, language);
  } finally {
    window.clearTimeout(timeout);
  }
}

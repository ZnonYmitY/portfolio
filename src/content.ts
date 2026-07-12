import type { Language } from './i18n';

export type Localized<T> = Record<Language, T>;

export const content = {
  zh: {
    nav: [
      { label: '关于', href: '#about' },
      { label: '经历', href: '#experience' },
      { label: '项目', href: '#projects' },
      { label: '教育', href: '#education' },
    ],
    hero: {
      eyebrow: '上载智能信仰者 · 北京',
      line1: '让想法，',
      line2: '长成产品。',
      intro: '我是赵盈盈，AI 产品经理与实践者。游走于搜索、资讯、AIGC 与 Agent 之间，把洞察、模型能力和工程链路连接成真实体验。',
      primary: '查看代表项目',
      secondary: '看看我如何工作',
      note: 'NUS CS-AI 硕士 · 北京理工大学人工智能本科',
    },
    signals: [
      { value: '+22.07%', label: '热搜融合页 UV', meta: '向量召回实验' },
      { value: '4.48×', label: '优质正文日产能', meta: '资讯点扩召' },
      { value: '171.59 万', label: '视频脚本季度交付', meta: '京东言犀 AIGC' },
      { value: '90%+', label: '热点泛化准确率', meta: '人工评估' },
    ],
    about: {
      kicker: '01 / OPERATING SYSTEM',
      title: '产品感，模型感，落地感。',
      body: '从 ToB AIGC 平台到 C 端资讯搜索，我习惯先定位真实摩擦，再把想法拆成可执行的策略、模型与工程链路。我的工作不是“给 AI 加一个入口”，而是让 AI 在业务中稳定地产生价值。',
      cards: [
        { index: 'A', title: 'AI 工具深度用户', body: '持续使用 GPT、Claude、Gemini、Codex、Cursor 与多模态生成工具，把新能力变成可验证的产品判断。' },
        { index: 'B', title: '端到端实践者', body: '从需求洞察、方案选型、链路打通到效果调优独立闭环；既做产品方案，也能 vibe coding 验证原型。' },
        { index: 'C', title: '复杂链路翻译者', body: '在算法、研发、运营之间对齐目标，把模型指标翻译成用户体验，把业务约束翻译成技术边界。' },
      ],
    },
    experience: {
      kicker: '02 / FIELD WORK',
      title: '在真实流量里，让 AI 变得更有用。',
      items: [
        {
          org: '字节跳动 · 抖音 · 资讯',
          role: '产品经理 · 产品工程师人才计划',
          period: '2026.01 — 至今',
          summary: '负责热点搜索出卡、热搜融合页 AI 体验与资讯 AI 内容供给，在高并发、强时效场景里平衡准召、质量与效率。',
          outcomes: [
            '主动泛化热点 Query，准确率 > 90%；融合页 DAU +4.21%、UV +6.36%',
            '推动向量召回与资讯意图模型建设；前期实验 DAU +11.20%、UV +22.07%',
            'AI 总结首 Tab 外显，3 分率从 27.3% 提升至 77%；争议事件好内容引用量 +322%',
            '将内容生成链路重构为 Harness + Skill 统一骨架，并搭建资讯视频解析 Skill',
          ],
          tags: ['Search', 'RAG', 'LLM', 'Harness', 'Agent Skill'],
        },
        {
          org: '京东 · 探索研究院',
          role: 'AI 产品实习生 · 言犀 AIGC 平台',
          period: '2025.04 — 2025.10',
          summary: '面向 ToB 营销内容生产，负责脚本风格多样化与智能混剪链路，连接多模态理解、生成与规模化交付。',
          outcomes: [
            '沉淀 28 类风格基础组合，供应商评分提升近 1 分',
            '支撑季度 171.59 万条视频脚本交付',
            '规划“视频理解 + 片段匹配”智能混剪链路并输出 Demo',
          ],
          tags: ['AIGC Platform', 'Prompt Design', 'Multimodal', 'ToB'],
        },
      ],
    },
    projects: {
      kicker: '03 / INDEPENDENT BUILDS',
      title: '把日常痛点，做成持续运行的系统。',
      view: '打开项目',
      items: [
        {
          no: '01',
          name: 'Piasnews',
          label: 'F1 粉丝资讯 Agent Skill 与自动化日报网站',
          body: '将多源资讯发现、去重分类、可信度标注与粉丝日报生成产品化。Agent Skill 服务个人深度使用，公开网页降低普通粉丝门槛；GitHub Actions 每 6 小时自动更新。',
          tags: ['Agent Skill', 'Automation', 'GitHub Actions', 'News Product'],
          href: 'https://znonymity.github.io/piasnews/',
          accent: 'lime',
        },
        {
          no: '02',
          name: 'ScentMuse',
          label: 'AI 情绪香水微信小程序',
          body: '把抽象情绪转译为香氛意象、个性化文案与视觉生成，基于 Coze 工作流和微信小程序完成端到端 Demo。',
          tags: ['Coze', 'Mini Program', 'Image Generation'],
          href: '',
          accent: 'coral',
        },
        {
          no: '03',
          name: 'DRI Website',
          label: 'AI DRI 指南针网站',
          body: '将培训内容产品化为可浏览、可测试、可协作编辑的多页面学习体验，并设计类 MBTI 自测交互。',
          tags: ['Learning Product', 'Interactive Web', 'Vibe Coding'],
          href: '',
          accent: 'blue',
        },
        {
          no: '04',
          name: 'AI 剧情动画',
          label: '端到端多模态内容编排',
          body: '串联剧本、关键帧、分镜视频、配音配乐与剪辑，以 LLM 对抗生成驱动剧情与视觉提示词，独立完成自动化成片。',
          tags: ['LLM', 'Video', 'Voice', 'Multimodal'],
          href: '',
          accent: 'violet',
        },
      ],
    },
    education: {
      kicker: '04 / FOUNDATION',
      title: '技术底座，与持续学习。',
      schools: [
        { school: '新加坡国立大学', degree: 'CS-AI（Industry 4.0）· 硕士', period: '2024 — 2026', detail: '人工智能、应用架构软件工程、企业系统架构、云计算物联网服务等课程均绩 A。', rank: 'QS #8' },
        { school: '北京理工大学', degree: '人工智能 · 本科', period: '2019 — 2023', detail: 'NLP 97、语音识别与合成 95；校科技协会副主席。研究课题发表于 2024 IEEE GRSL。', rank: '985' },
      ],
      skillsTitle: '能力坐标',
      skills: ['AI 产品设计', '搜索与推荐', 'RAG / 内容生成', 'Agent & Skill', '多模态 AIGC', 'Vibe Coding', '产品实验', '跨团队协作'],
    },
    contact: {
      kicker: '05 / NEXT SIGNAL',
      title: '如果你也在把 AI 变成真实产品，我们应该聊聊。',
      body: '可以先让 AI 简历帮你快速了解我的经历，也可以直接在 GitHub 查看正在发生的项目。',
      github: '访问 GitHub',
      agent: '与 Avery Twin 对话',
    },
    footer: '设计与构建 · 赵盈盈 / Avery Zhao',
  },
  en: {
    nav: [
      { label: 'About', href: '#about' },
      { label: 'Experience', href: '#experience' },
      { label: 'Projects', href: '#projects' },
      { label: 'Education', href: '#education' },
    ],
    hero: {
      eyebrow: 'UPLOADED-INTELLIGENCE BELIEVER · BEIJING',
      line1: 'Where ideas',
      line2: 'become products.',
      intro: "I'm Avery Zhao, an AI product manager and hands-on builder working across search, news, AIGC and agents — connecting product insight, model capability and engineering systems.",
      primary: 'Explore selected work',
      secondary: 'See how I work',
      note: 'NUS CS-AI M.Sc. · BIT Artificial Intelligence B.Eng.',
    },
    signals: [
      { value: '+22.07%', label: 'Search fusion UV', meta: 'vector recall experiment' },
      { value: '4.48×', label: 'Daily quality output', meta: 'news topic expansion' },
      { value: '1.7159M', label: 'Quarterly video scripts', meta: 'JD Yanxi AIGC' },
      { value: '90%+', label: 'Query expansion precision', meta: 'human evaluation' },
    ],
    about: {
      kicker: '01 / OPERATING SYSTEM',
      title: 'Product sense. Model sense. Shipping sense.',
      body: 'From a B2B AIGC platform to consumer news search, I start with real friction and turn it into executable strategy, model and engineering systems. My work is not about adding an AI entry point — it is about making AI reliably useful.',
      cards: [
        { index: 'A', title: 'AI power user', body: 'I continuously test GPT, Claude, Gemini, Codex, Cursor and multimodal tools, turning new capabilities into grounded product judgment.' },
        { index: 'B', title: 'End-to-end builder', body: 'I close the loop from insight and tool choice to system integration and tuning — writing product strategy and vibe-coding working prototypes.' },
        { index: 'C', title: 'Systems translator', body: 'I align algorithms, engineering and operations, translating model metrics into user experience and business constraints into technical boundaries.' },
      ],
    },
    experience: {
      kicker: '02 / FIELD WORK',
      title: 'Making AI useful under real traffic.',
      items: [
        {
          org: 'ByteDance · Douyin · News',
          role: 'Product Manager · Product Engineer Program',
          period: '2026.01 — Present',
          summary: 'Owning hot-topic search recall, AI answer experience and news content generation while balancing relevance, freshness, quality and efficiency.',
          outcomes: [
            'Built proactive query expansion at >90% precision; fusion-page DAU +4.21% and UV +6.36%',
            'Advanced vector recall and news-intent modeling; early experiment DAU +11.20% and UV +22.07%',
            'Moved AI summaries to the first tab; top-rating rate rose from 27.3% to 77%, quality-source citations +322%',
            'Rebuilt generation as a Harness + Skill system and prototyped a reusable news-video analysis Skill',
          ],
          tags: ['Search', 'RAG', 'LLM', 'Harness', 'Agent Skill'],
        },
        {
          org: 'JD · Explore Academy',
          role: 'AI Product Intern · Yanxi AIGC Platform',
          period: '2025.04 — 2025.10',
          summary: 'Worked on B2B marketing content, improving script diversity and designing an intelligent video remix pipeline across multimodal understanding and generation.',
          outcomes: [
            'Created 28 foundational style combinations and raised vendor quality scores by nearly one point',
            'Supported delivery of 1.7159 million video scripts in one quarter',
            'Designed a “video understanding + clip matching” pipeline and delivered a working demo',
          ],
          tags: ['AIGC Platform', 'Prompt Design', 'Multimodal', 'B2B'],
        },
      ],
    },
    projects: {
      kicker: '03 / INDEPENDENT BUILDS',
      title: 'Turning everyday friction into systems that keep running.',
      view: 'Open project',
      items: [
        { no: '01', name: 'Piasnews', label: 'F1 news Agent Skill & automated daily site', body: 'Productized multi-source discovery, deduplication, trust labeling and fan brief generation. An Agent Skill enables deep personal use while the public site lowers access barriers, refreshed every six hours with GitHub Actions.', tags: ['Agent Skill', 'Automation', 'GitHub Actions', 'News Product'], href: 'https://znonymity.github.io/piasnews/', accent: 'lime' },
        { no: '02', name: 'ScentMuse', label: 'AI emotional perfume mini program', body: 'Translates emotions into fragrance imagery, personalized copy and generated visuals through a Coze workflow and WeChat mini-program demo.', tags: ['Coze', 'Mini Program', 'Image Generation'], href: '', accent: 'coral' },
        { no: '03', name: 'DRI Website', label: 'AI DRI compass website', body: 'Productized training material into a browsable, testable and collaborative multi-page experience with an MBTI-like self assessment.', tags: ['Learning Product', 'Interactive Web', 'Vibe Coding'], href: '', accent: 'blue' },
        { no: '04', name: 'AI Story Animation', label: 'End-to-end multimodal orchestration', body: 'Connected story, keyframes, video, voice, music and editing into an automated pipeline driven by adversarial LLM ideation and visual prompting.', tags: ['LLM', 'Video', 'Voice', 'Multimodal'], href: '', accent: 'violet' },
      ],
    },
    education: {
      kicker: '04 / FOUNDATION',
      title: 'Technical grounding, continuous learning.',
      schools: [
        { school: 'National University of Singapore', degree: 'CS-AI (Industry 4.0) · M.Sc.', period: '2024 — 2026', detail: 'AI, software architecture, enterprise systems and cloud IoT coursework, all averaging grade A.', rank: 'QS #8' },
        { school: 'Beijing Institute of Technology', degree: 'Artificial Intelligence · B.Eng.', period: '2019 — 2023', detail: 'NLP 97, speech recognition 95; vice president of the science association. Research published in IEEE GRSL 2024.', rank: '985' },
      ],
      skillsTitle: 'Capability map',
      skills: ['AI Product', 'Search & Recommendation', 'RAG / Generation', 'Agent & Skill', 'Multimodal AIGC', 'Vibe Coding', 'Experimentation', 'Cross-functional Leadership'],
    },
    contact: {
      kicker: '05 / NEXT SIGNAL',
      title: "If you're turning AI into a real product, we should talk.",
      body: 'Start with the AI résumé for a quick, grounded read of my experience — or see what is currently shipping on GitHub.',
      github: 'Visit GitHub',
      agent: 'Talk to Avery Twin',
    },
    footer: 'Designed & built by Zhao Yingying / Avery Zhao',
  },
} as const;

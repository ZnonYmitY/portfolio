# Avery Zhao Portfolio / 赵盈盈个人网站

This is the bilingual personal portfolio for Zhao Yingying / Avery Zhao. It is built as a Vite + React + TypeScript site and includes an interactive resume Q&A window named **Avery Twin**.

这是赵盈盈 / Avery Zhao 的中英双语个人网站，使用 Vite + React + TypeScript 构建，并内置一个名为 **Avery Twin** 的问答式简历窗口。

## Links / 链接

- Repository / 代码仓库: https://github.com/ZnonYmitY/portfolio
- Current branch / 当前分支: https://github.com/ZnonYmitY/portfolio/tree/codex/rebuild-avery-portfolio
- Expected GitHub Pages URL / 预期 GitHub Pages 地址: https://znonymity.github.io/portfolio/

Note: GitHub Pages auto deployment has not been added in this branch. The Pages URL is the expected public address after this branch is merged and the site is manually built/deployed or GitHub Pages is configured.

注意：这个分支暂时没有加入 GitHub Pages 自动部署。上面的 Pages 地址是合并并手动构建/部署，或后续配置 GitHub Pages 后的预期访问地址。

## What This Site Contains / 网站内容

- A bilingual personal homepage in Chinese and English.
- A product-focused resume story around AI product work, search, news, AIGC, multimodal systems, and agent/skill building.
- Work experience sections for ByteDance Douyin News and JD Explore Academy.
- Independent project sections including Piasnews, ScentMuse, DRI Website, and AI story animation.
- Education and capability sections.
- **Avery Twin**, a resume-grounded Q&A panel that can answer questions from local resume facts or an optional internal agent endpoint.

---

- 中英双语个人主页。
- 围绕 AI 产品、搜索、资讯、AIGC、多模态系统和 Agent/Skill 构建的简历叙事。
- 字节跳动抖音资讯、京东探索研究院经历。
- Piasnews、ScentMuse、DRI Website、AI 剧情动画等自研项目。
- 教育背景与能力坐标。
- **Avery Twin** 问答式简历窗口，可基于本地简历事实回答问题，也可接入内部 Agent 服务。

## Local Development / 本地开发

Install dependencies:

```bash
npm install
```

Start local preview:

```bash
npm run dev
```

The dev server usually prints a local URL such as:

```text
http://localhost:5173/
```

安装依赖：

```bash
npm install
```

启动本地预览：

```bash
npm run dev
```

终端通常会输出类似下面的本地地址：

```text
http://localhost:5173/
```

## Validation / 检查命令

Before publishing or merging, run:

```bash
npm run typecheck
npm run lint
npm run build
```

发布或合并前建议运行：

```bash
npm run typecheck
npm run lint
npm run build
```

## Where To Edit Content / 内容在哪里修改

The site content is currently **not Markdown-driven**. Editing a Markdown file will not update the webpage unless a Markdown content pipeline is added later.

当前网站内容 **不是由 Markdown 驱动的**。如果只修改 `.md` 文件，网页不会自动变化，除非后续再接入 Markdown 内容管线。

Main editable content:

| What to change | File |
| --- | --- |
| Homepage copy, Chinese/English text, experience, projects, education, CTA | `src/content.ts` |
| Avery Twin local answers, keywords, answer boundaries, sources | `src/resumeAgent.ts` |
| Avery Twin UI text, greeting, suggested questions, placeholder | `src/components/ResumeAgent.tsx` |
| Layout and styling | `src/index.css` |
| Language state and supported languages | `src/i18n.ts` |

主要内容修改位置：

| 修改内容 | 文件 |
| --- | --- |
| 首页文案、中英文内容、经历、项目、教育、行动按钮 | `src/content.ts` |
| Avery Twin 本地回答、关键词、回答边界、依据来源 | `src/resumeAgent.ts` |
| Avery Twin 界面文案、开场白、推荐问题、输入框占位文案 | `src/components/ResumeAgent.tsx` |
| 页面布局与样式 | `src/index.css` |
| 语言状态和支持语言 | `src/i18n.ts` |

### Recommended Content Update Flow / 推荐修改流程

1. Edit `src/content.ts` first for normal resume/site copy.
2. Update both `zh` and `en` blocks together.
3. If the same fact should be answerable in Avery Twin, also update `src/resumeAgent.ts`.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Commit and push the branch.

---

1. 常规网站和简历文案优先修改 `src/content.ts`。
2. 同时维护 `zh` 和 `en` 两套内容。
3. 如果希望 Avery Twin 也能回答同一个事实，再同步修改 `src/resumeAgent.ts`。
4. 运行 `npm run typecheck`、`npm run lint`、`npm run build`。
5. 提交并推送分支。

## About Markdown / 关于 Markdown

There is currently no resume Markdown file that drives the website. If you want to maintain the resume as Markdown later, the recommended path is:

1. Add a content source such as `content/resume.zh.md` and `content/resume.en.md`.
2. Add a parser at build time.
3. Generate or import structured content into the React components.
4. Keep Avery Twin's knowledge base in sync with the same source.

当前没有一个直接驱动网页的简历 Markdown 文件。如果后续希望通过 Markdown 维护简历，推荐做法是：

1. 新增类似 `content/resume.zh.md` 和 `content/resume.en.md` 的内容源。
2. 在构建阶段加入 Markdown 解析。
3. 将解析后的结构化内容传给 React 组件。
4. 让 Avery Twin 的知识库也从同一份内容同步。

## Avery Twin / 问答式简历

Avery Twin has two modes.

Without extra configuration, it uses the local knowledge router in `src/resumeAgent.ts`. It answers from predefined resume facts, cites sources, and refuses unsupported questions.

With an internal backend, copy `.env.example` to `.env.local` and set:

```bash
VITE_RESUME_AGENT_ENDPOINT=https://your-internal-endpoint.example.com/ask
```

The endpoint should accept:

```json
{ "question": "What did you do at ByteDance?", "language": "en" }
```

and return:

```json
{ "answer": "...", "sources": ["ByteDance · Search"] }
```

Keep model-provider secrets on the server. Never put an API key in a `VITE_*` variable because Vite exposes those variables to the browser.

---

Avery Twin 有两种模式。

不做额外配置时，它使用 `src/resumeAgent.ts` 里的本地知识路由，只基于预设简历事实回答，展示依据来源，并拒答没有依据的问题。

如果要接入内部后端，把 `.env.example` 复制为 `.env.local`，并设置：

```bash
VITE_RESUME_AGENT_ENDPOINT=https://your-internal-endpoint.example.com/ask
```

接口应接收：

```json
{ "question": "你在字节做了什么？", "language": "zh" }
```

并返回：

```json
{ "answer": "...", "sources": ["字节跳动 · 搜索"] }
```

模型服务商密钥必须放在服务端。不要把 API Key 放进任何 `VITE_*` 变量，因为 Vite 会把这些变量暴露到浏览器。

## Manual Publishing / 手动发布说明

This branch does not include automatic GitHub Pages deployment. A manual publishing flow can be:

1. Merge this branch into the branch used by GitHub Pages.
2. Run `npm install` if dependencies changed.
3. Run `npm run build`.
4. Publish the generated `dist/` directory with your chosen Pages workflow.
5. Visit https://znonymity.github.io/portfolio/ and verify the visible site.

这个分支没有配置 GitHub Pages 自动部署。手动发布可以按下面流程：

1. 把这个分支合并到 GitHub Pages 使用的分支。
2. 如果依赖有变化，运行 `npm install`。
3. 运行 `npm run build`。
4. 用你选择的 Pages 流程发布生成的 `dist/` 目录。
5. 打开 https://znonymity.github.io/portfolio/ 检查线上页面。

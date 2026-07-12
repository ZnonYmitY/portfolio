# Avery Zhao Portfolio / 赵盈盈个人网站

This is the bilingual personal portfolio for Zhao Yingying / Avery Zhao. It is built as a Vite + React + TypeScript site and includes an interactive resume Q&A window named **Avery Twin**.

这是赵盈盈 / Avery Zhao 的中英双语个人网站，使用 Vite + React + TypeScript 构建，并内置一个名为 **Avery Twin** 的问答式简历窗口。

## Links / 链接

- Repository / 代码仓库: https://github.com/ZnonYmitY/portfolio
- Current branch / 当前分支: https://github.com/ZnonYmitY/portfolio/tree/codex/rebuild-avery-portfolio
- Website / 网站地址: https://znonymity.github.io/portfolio/
- GitHub Pages workflow / GitHub Pages 发布工作流: `.github/workflows/deploy-pages.yml`

GitHub Pages deployment is configured with GitHub Actions in this branch. After the branch is merged into `main`, every push to `main` will build and publish the site to the URL above. The workflow can also be started manually from GitHub Actions with `workflow_dispatch`.

这个分支已经配置了 GitHub Actions 自动发布。合并到 `main` 后，每次推送到 `main` 都会构建并发布到上面的网站地址；也可以在 GitHub Actions 页面手动触发 `workflow_dispatch`。

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

## GitHub Pages Deployment / GitHub Pages 发布

The site is configured for GitHub Pages project hosting at:

```text
https://znonymity.github.io/portfolio/
```

Deployment is handled by `.github/workflows/deploy-pages.yml`.

What the workflow does:

1. Runs on every push to `main`.
2. Can also be started manually from the GitHub Actions page.
3. Installs dependencies with `npm ci`.
4. Runs `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Uploads the generated `dist/` directory to GitHub Pages.

Because this is a Vite project hosted under `/portfolio/`, `vite.config.ts` sets:

```ts
base: '/portfolio/'
```

If the website shows GitHub's 404 page, check these first:

1. This branch has been merged into `main`.
2. Repository Settings → Pages is set to GitHub Actions.
3. The `Deploy GitHub Pages` workflow has completed successfully.
4. Visit the project URL again: https://znonymity.github.io/portfolio/

---

网站配置为 GitHub Pages 项目页，线上地址是：

```text
https://znonymity.github.io/portfolio/
```

发布由 `.github/workflows/deploy-pages.yml` 负责。

发布流程：

1. 每次推送到 `main` 时自动触发。
2. 也可以在 GitHub Actions 页面手动触发。
3. 使用 `npm ci` 安装依赖。
4. 执行 `npm run typecheck`、`npm run lint` 和 `npm run build`。
5. 将生成的 `dist/` 目录发布到 GitHub Pages。

因为这个 Vite 项目部署在 `/portfolio/` 路径下，`vite.config.ts` 中已设置：

```ts
base: '/portfolio/'
```

如果网站仍然显示 GitHub 的 404 页面，优先检查：

1. 当前分支是否已经合并到 `main`。
2. 仓库 Settings → Pages 是否设置为 GitHub Actions。
3. `Deploy GitHub Pages` workflow 是否执行成功。
4. 再打开项目地址：https://znonymity.github.io/portfolio/

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

## Manual Content Publishing / 手动内容发布

If you edit content locally, the publishing flow is:

1. Change the relevant source files, usually `src/content.ts` and `src/resumeAgent.ts`.
2. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
3. Commit and push the changes.
4. Merge into `main`.
5. Wait for the `Deploy GitHub Pages` workflow to complete.
6. Visit https://znonymity.github.io/portfolio/ and verify the visible site.

如果你在本地修改内容，发布流程是：

1. 修改对应源码，通常是 `src/content.ts` 和 `src/resumeAgent.ts`。
2. 运行 `npm run typecheck`、`npm run lint` 和 `npm run build`。
3. 提交并推送改动。
4. 合并到 `main`。
5. 等待 `Deploy GitHub Pages` workflow 执行完成。
6. 打开 https://znonymity.github.io/portfolio/ 检查线上页面。

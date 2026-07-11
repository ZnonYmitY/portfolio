# Avery Zhao · Personal Portfolio

A bilingual personal portfolio for Zhao Yingying / Avery Zhao, rebuilt around her AI product work in search, news, AIGC and agents.

## Local development

```bash
npm install
npm run dev
```

Validation:

```bash
npm run typecheck
npm run lint
npm run build
```

## Avery Twin

Avery Twin works in two modes:

- Without configuration, it uses a client-side, résumé-grounded knowledge router. It answers common questions, cites the résumé section used, and refuses unsupported questions.
- For an internal LLM/Agent service, copy `.env.example` to `.env.local` and set `VITE_RESUME_AGENT_ENDPOINT` to an internal HTTP endpoint.

The endpoint should accept:

```json
{ "question": "What did she do at ByteDance?", "language": "en" }
```

and return:

```json
{ "answer": "...", "sources": ["ByteDance · Search"] }
```

Keep model-provider secrets on the server. Never put an API key in a `VITE_*` variable because Vite exposes those variables to the browser.

# Mohan Maali — Portfolio

A fast, single-page developer portfolio with a built-in AI assistant and a live GitHub activity feed. Built with React 19, Vite 7, and Tailwind CSS v4, deployed on Vercel.

🔗 **Live:** https://mohan-maali.vercel.app

## Features

- **Single-page layout** — Hero, Services, Process, Tech Stack, Projects, Resume, Contact, and live Updates sections.
- **AI assistant** — a floating chat (Groq + Llama 3.3) that answers questions about my work, powered by a serverless `/api/chat` function.
- **Live GitHub feed** — recent commits, AI-polished, via `/api/github-updates` (cached 30 min).
- **Dark mode** — class-based theme with a persisted toggle.
- **Contact form** — wired to EmailJS, no backend required.
- **Motion** — Framer Motion throughout, with `prefers-reduced-motion` support.

## Tech Stack

| Area        | Tools                                          |
| ----------- | ---------------------------------------------- |
| Framework   | React 19, Vite 7                               |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`)          |
| Animation   | Framer Motion                                  |
| Icons       | lucide-react                                   |
| Email       | @emailjs/browser                               |
| AI          | Groq (Llama 3.3) via serverless functions      |
| Deployment  | Vercel                                         |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env   # then fill in the values below

# 3. Start the dev server (http://localhost:4000)
npm run dev
```

### Environment variables

Copy `.env.example` to `.env` and set:

| Variable                    | Used for                          |
| --------------------------- | --------------------------------- |
| `VITE_EMAILJS_SERVICE_ID`   | Contact form (EmailJS)            |
| `VITE_EMAILJS_TEMPLATE_ID`  | Contact form (EmailJS)            |
| `VITE_EMAILJS_PUBLIC_KEY`   | Contact form (EmailJS)            |
| `GROQ_API_KEY`              | AI chat (`/api/chat`)             |
| `GITHUB_TOKEN`              | GitHub updates feed (optional)    |

> The `/api/*` routes run as Vercel serverless functions in production and are emulated in dev via a Vite middleware plugin.

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start dev server on port 4000     |
| `npm run build`   | Production build to `dist/`       |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

## Project Structure

```
portfolio/
├── api/                    # Vercel serverless functions (chat, github-updates)
├── public/                 # Static assets (resume.pdf, images, favicon)
├── src/
│   ├── components/         # Page sections + reusable UI
│   ├── constants/          # portfolioData.js (single source of truth), aiContext.js
│   ├── App.jsx
│   └── main.jsx
└── index.html
```

All content (projects, skills, experience, links) lives in [`src/constants/portfolioData.js`](src/constants/portfolioData.js) — edit there to update the site.

## Deployment

Deployed on Vercel. Push to the default branch and Vercel builds `npm run build` and serves `dist/`. Set the environment variables above in the Vercel project settings.

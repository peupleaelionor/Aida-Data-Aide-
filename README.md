# AIDA — AI Data Aides

> Production-grade GovTech SaaS platform connecting citizens with government benefits worldwide.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red.svg)](https://nestjs.com/)

## Overview

AIDA is an AI-powered benefits discovery platform that helps citizens find, understand, and apply for government benefits in 15+ countries. Using advanced NLP and eligibility matching, AIDA reduces the time to benefits discovery from weeks to minutes.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), Tailwind CSS, shadcn/ui |
| Backend API | NestJS 10, Fastify, Swagger |
| Database | PostgreSQL 16 via Prisma ORM |
| Cache | Redis 7 |
| AI/ML | LangChain, OpenAI GPT-4o |
| Search | Meilisearch |
| Auth | NextAuth.js v4, JWT, Google OAuth |
| Payments | Stripe |
| Infra | Docker, Turborepo, pnpm workspaces |
| Deployment | Vercel (web), Railway/Fly.io (API) |

## Monorepo Structure

```
aida-monorepo/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   └── api/          # NestJS REST API
├── packages/
│   ├── database/     # Prisma schema & client
│   ├── ui/           # Shared React components
│   ├── auth/         # Auth utilities
│   ├── ai/           # LangChain helpers
│   ├── benefits-engine/ # Eligibility rules engine
│   ├── crawler/      # Gov portal scrapers
│   └── integrations/ # Stripe, Meilisearch
├── scripts/          # Dev & ops scripts
└── docker-compose.yml
```

## Quick Start

### Prerequisites
- Node.js ≥ 20
- pnpm ≥ 9
- Docker & Docker Compose

### Setup

```bash
# Clone and install dependencies
git clone https://github.com/your-org/aida-monorepo.git
cd aida-monorepo
pnpm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your credentials

# Start infrastructure
docker-compose up -d postgres redis meilisearch

# Run database migrations and seed
pnpm db:migrate
pnpm db:seed

# Start development servers
pnpm dev
```

Visit:
- **Web**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api

## Features

- 🤖 **AI Benefits Advisor** — Natural language Q&A about eligibility
- 🔍 **Smart Matching** — Rule-based + ML eligibility scoring
- 🌍 **Multi-country** — 15+ countries, 200+ benefit programs
- 📊 **Analytics Dashboard** — Track applications and outcomes
- 🔐 **GDPR Compliant** — Data export, deletion, consent management
- 💳 **Stripe Billing** — Free, Basic, Pro, Enterprise tiers
- 🕷️ **Auto-Crawling** — Keeps benefit data current

## License

MIT © AIDA Team

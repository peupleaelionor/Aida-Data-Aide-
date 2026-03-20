#!/bin/bash
set -e

echo "=== AIDA Setup ==="

command -v node >/dev/null 2>&1 || { echo "Node.js 20+ required"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "pnpm 9+ required. Install: npm install -g pnpm@9"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker required for local infrastructure"; exit 1; }

echo "[1/5] Installing dependencies..."
pnpm install

echo "[2/5] Copying environment file..."
[ ! -f .env ] && cp .env.example .env && echo "Created .env — please edit it with your credentials"

echo "[3/5] Starting infrastructure..."
docker-compose -f docker-compose.dev.yml up -d postgres redis meilisearch

echo "[4/5] Waiting for database..."
sleep 5

echo "[5/5] Running migrations and seed..."
pnpm --filter @aida/database db:generate
pnpm --filter @aida/database db:migrate
pnpm --filter @aida/database db:seed

echo ""
echo "=== Setup complete! ==="
echo "Run: pnpm dev"
echo "  Web:  http://localhost:3000"
echo "  API:  http://localhost:3001"
echo "  Docs: http://localhost:3001/api"

#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

if [ ! -f .env ]; then
  echo "No .env file found. Copying .env.example to .env..."
  cp .env.example .env
  echo "Please edit .env and set SECRET_KEY, then re-run this script."
  exit 1
fi

echo "Building and starting Prelegal..."
docker compose up --build -d

echo ""
echo "Prelegal is running at http://localhost:8000"
echo "Run scripts/stop-mac.sh to stop."

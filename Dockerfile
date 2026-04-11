# Stage 1: Build Next.js static export
FROM node:20-alpine AS frontend-builder
WORKDIR /build
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: FastAPI backend + static frontend
FROM python:3.12-slim
WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Install backend dependencies (copy full source so hatchling can build the package)
COPY backend/ ./backend/
RUN cd backend && uv pip install --system --no-cache .

# Copy frontend static build
COPY --from=frontend-builder /build/out ./static

# Create data directory for SQLite
RUN mkdir -p /app/data

EXPOSE 8000

ENV STATIC_DIR=/app/static
ENV DATABASE_URL=sqlite:////app/data/prelegal.db

WORKDIR /app/backend
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

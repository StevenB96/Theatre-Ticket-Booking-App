# ─── Stage 1: Builder (Debian-based Playwright) ───────────────────────────────
FROM mcr.microsoft.com/playwright:v1.53.0-noble AS builder
WORKDIR /app

# 1) Install & lock dependencies
COPY package.json package-lock.json ./
RUN set -eux; \
    npm ci --loglevel verbose

# 2) Install browsers & Playwright deps
RUN npx playwright install --with-deps

# 3) Copy app source and environment files
COPY . . 
COPY .env .env.development .env.production ./

# 4) Run migrations and seeds for dev environment
RUN set -eux; \
    echo "🔧 Running Migrations..." && \
    npm run migrate && \
    echo "🌱 Running Seeds..." && \
    npm run seed

# 5) Build Next.js app
RUN echo "🔨 Building Next.js app..." && npm run build

# 6) Optionally run tests (you had `npm run build` twice — assuming one should be `test`)
# RUN echo "🧪 Testing Next.js app..." && npm run test


# ─── Stage 2: Runner (Debian-slim Node) ────────────────────────────────────────
FROM node:lts-slim AS runner
WORKDIR /app

# 1) Install minimal system deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      dumb-init \
      sqlite3 \
      chromium \
      ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# 2) Copy production build and app files
COPY --from=builder /app/.next           ./.next
COPY --from=builder /app/public          ./public
COPY --from=builder /app/node_modules    ./node_modules
COPY --from=builder /app/package.json    ./package.json
COPY --from=builder /app/dev.sqlite3     ./dev.sqlite3
COPY --from=builder /app/.env            ./
COPY --from=builder /app/.env.development ./ 
COPY --from=builder /app/.env.production ./ 

# 3) Ensure SQLite is writable
RUN chmod 664 dev.sqlite3

# # 4) Set runtime environment
# ENV ENV=development
# ENV NODE_ENV=development

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start"]

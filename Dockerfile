# ─── Stage 1: Builder (Debian-based Playwright) ───────────────────────────────
FROM mcr.microsoft.com/playwright:v1.53.0-noble AS builder
WORKDIR /app

# 1) Install & lock dependencies
COPY package.json package-lock.json ./
RUN set -eux; \
    npm ci --loglevel verbose

# 2) Install browsers & Playwright deps
RUN npx playwright install --with-deps

# 3) Copy app source
COPY . .

# 4) Build Next.js app
RUN set -eux; \
    npm run build


# ─── Stage 2: Runner (Debian-slim Node) ───────────────────────────────────────
FROM node:lts-slim AS runner
WORKDIR /app

# 1) Install minimal system deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      dumb-init \
      ca-certificates \
      netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# 2) Copy production build and app files
COPY --from=builder /app/.next        ./.next
COPY --from=builder /app/public       ./public
COPY --from=builder /app/node_modules  ./node_modules
COPY --from=builder /app/package.json  ./package.json
COPY --from=builder /app/knexfile.js ./knexfile.js
COPY --from=builder /app/src ./src
COPY --from=builder /app/scripts ./scripts

# 3) Add entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 4) Runtime environment
ENV NODE_ENV=development
ENV PORT=49152

ENTRYPOINT ["dumb-init", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
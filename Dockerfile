# Stage 1: Builder
FROM mcr.microsoft.com/playwright:v1.53.0-noble AS builder

WORKDIR /app

# Install dependencies with proper lockfile handling
COPY package.json ./
COPY package-lock.json ./

RUN set -eux; \
  if [ -f package-lock.json ]; then \
    npm ci --loglevel verbose; \
  else \
    echo "❌ No lockfile found. Aborting." && exit 1; \
  fi

# Install Playwright dependencies and browsers
RUN npx playwright install --with-deps

# Copy source and environment config
COPY . .
COPY .env .env.development ./

# Run database migrations and seeds
RUN set -eux; \
  echo "🔧 Running Migrations..."; \
  npx knex migrate:latest --env development --verbose; \
  echo "🌱 Running Seeds..."; \
  npx knex seed:run --env development --verbose

# Build the app
RUN echo "🔨 Building Next.js app..." && npm run build

# Optional: Verify SQLite contents (development debugging only)
RUN apt-get update && apt-get install -y sqlite3; \
  echo "🔍 Tables:" && sqlite3 dev.sqlite3 ".tables"; \
  echo "🔍 Schema for 'show':" && sqlite3 dev.sqlite3 "PRAGMA table_info('show');"

# Stage 2: Runtime
FROM node:lts-alpine AS runner

WORKDIR /app

# Install required system packages
RUN apk add --no-cache \
  dumb-init \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

# Copy production build and dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dev.sqlite3 ./dev.sqlite3
COPY --from=builder /app/.env ./
COPY --from=builder /app/.env.development ./

# Set correct DB permissions
RUN chmod 664 dev.sqlite3

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start"]

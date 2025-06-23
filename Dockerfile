# Stage 1: deps + Playwright browsers (noble image with browsers)
FROM mcr.microsoft.com/playwright:v1.53.0-noble AS deps
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ];   then yarn --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
    else echo "Lockfile not found." && exit 1; fi

# Stage 2: run tests & build
FROM mcr.microsoft.com/playwright:v1.53.0-noble AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run migrate
RUN npm run seed
RUN npm run test
RUN npm run build

# Stage 3: production runner (slim Alpine)
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

# Install runtime dependencies (Chromium for Playwright if needed by your app)
RUN apk add --no-cache \
    dumb-init \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Copy built assets and runtime deps
COPY --from=builder /app/.next       ./.next
COPY --from=builder /app/public      ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENTRYPOINT ["dumb-init", "--"]
EXPOSE 3000
CMD ["npm", "start"]

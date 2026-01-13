# syntax=docker/dockerfile:1.7
#
# Next.js production image (Node >= 20.9 required by Next 16+)
#

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
# Cache npm downloads between builds (BuildKit)
RUN --mount=type=cache,target=/root/.npm \
    npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Cache Next.js build artifacts
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

FROM base AS runner
ENV NODE_ENV=production

# If your runtime needs these, uncomment (common for some native deps):
# RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["npm", "run", "start"]



# syntax=docker/dockerfile:1.7
# Base image
FROM node:20-bookworm-slim AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json package-lock.json ./
# Correct cache syntax
RUN --mount=type=cache,id=nattypay-npm,target=/root/.npm npm ci

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Correct cache syntax for Next.js
RUN --mount=type=cache,id=nattypay-next,target=/app/.next/cache npm run build

# Runner stage
FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["npm", "run", "start"]

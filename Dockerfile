# syntax=docker/dockerfile:1.7
#
# Next.js Production Dockerfile (Node >= 20.9 required)
#

# ---------------------------
# Base image
# ---------------------------
    FROM node:20-bookworm-slim AS base
    WORKDIR /app
    
    # ---------------------------
    # Dependencies stage
    # ---------------------------
    FROM base AS deps
    # Copy package files only for caching
    COPY package.json package-lock.json ./
    # Cache npm modules between builds
    RUN --mount=type=cache,target=/root/.npm npm ci
    
    # ---------------------------
    # Builder stage
    # ---------------------------
    FROM base AS builder
    # Copy node_modules from deps
    COPY --from=deps /app/node_modules ./node_modules
    # Copy the rest of the project
    COPY . .
    
    # Cache Next.js build artifacts
    RUN --mount=type=cache,target=/app/.next/cache \
        npm run build
    
    # ---------------------------
    # Runner stage
    # ---------------------------
    FROM node:20-bookworm-slim AS runner
    ENV NODE_ENV=production
    WORKDIR /app
    
    # Copy built files from builder
    COPY --from=builder /app/package.json /app/package-lock.json ./
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/next.config.ts ./next.config.ts
    
    EXPOSE 3000
    CMD ["npm", "run", "start"]
    
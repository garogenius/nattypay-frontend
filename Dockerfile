# syntax=docker/dockerfile:1.7

# ---------------------------
# Build arguments
# ---------------------------
    ARG NODE_VERSION=20
    ARG CACHE_KEY=nattypay
    
    # ---------------------------
    # Base image
    # ---------------------------
    FROM node:${NODE_VERSION}-bookworm-slim AS base
    WORKDIR /app
    
    # ---------------------------
    # Dependencies stage
    # ---------------------------
    FROM base AS deps
    ARG CACHE_KEY
    COPY package.json package-lock.json ./
    # Cache npm modules with proper BuildKit id
    RUN --mount=type=cache,id=s/${CACHE_KEY}-npm,target=/root/.npm npm ci
    
    # ---------------------------
    # Builder stage
    # ---------------------------
    FROM base AS builder
    ARG CACHE_KEY
    # Copy installed node_modules from deps
    COPY --from=deps /app/node_modules ./node_modules
    # Copy all project files
    COPY . .
    # Cache Next.js build artifacts with proper id
    RUN --mount=type=cache,id=s/${CACHE_KEY}-next,target=/app/.next/cache npm run build
    
    # ---------------------------
    # Runner stage
    # ---------------------------
    FROM node:${NODE_VERSION}-bookworm-slim AS runner
    ENV NODE_ENV=production
    WORKDIR /app
    
    # Copy built files from builder
    COPY --from=builder /app/package.json /app/package-lock.json ./
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/next.config.ts ./next.config.ts
    
    # Expose default Next.js port
    EXPOSE 3000
    
    # Start the app
    CMD ["npm", "run", "start"]
    
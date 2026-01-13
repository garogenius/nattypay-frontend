# syntax=docker/dockerfile:1.7
#
# Next.js production image (Node >= 20.9 required by Next 16+)
#

ARG NODE_VERSION=20.11.1
# Used to prefix BuildKit cache IDs in CI environments that enforce a cache-key prefix.
ARG CACHE_KEY=natty-pay

FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
#region agent log
RUN node -e "fetch('http://127.0.0.1:7243/ingest/5abb3048-c47c-471e-9437-af292579c9d4',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:process.env.DEBUG_RUN_ID||'run1',hypothesisId:'H1',location:'Dockerfile:deps',message:'Build args/env observed in deps stage',data:{CACHE_KEY:process.env.CACHE_KEY||null,NODE_VERSION:process.env.NODE_VERSION||null},timestamp:Date.now()})}).catch(()=>{});"
#endregion agent log
# Cache npm downloads between builds (BuildKit)
RUN --mount=type=cache,id=s/${CACHE_KEY}-npm/cache,target=/root/.npm \
    npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
#region agent log
RUN node -e "fetch('http://127.0.0.1:7243/ingest/5abb3048-c47c-471e-9437-af292579c9d4',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:process.env.DEBUG_RUN_ID||'run1',hypothesisId:'H2',location:'Dockerfile:builder',message:'Build args/env observed in builder stage',data:{CACHE_KEY:process.env.CACHE_KEY||null},timestamp:Date.now()})}).catch(()=>{});"
#endregion agent log
# Cache Next.js build artifacts
RUN --mount=type=cache,id=s/${CACHE_KEY}-next/cache,target=/app/.next/cache \
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



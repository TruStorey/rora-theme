# syntax=docker/dockerfile:1.7
# Build context: repository root (rora-theme/)

ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS base
RUN corepack enable
WORKDIR /repo

# ───── deps ─────
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/website/package.json apps/website/package.json
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ───── builder ─────
FROM base AS builder
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/website/node_modules ./apps/website/node_modules
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps ./apps
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter website build

# ───── runner ─────
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy the standalone server, static assets, and public dir.
COPY --from=builder --chown=nextjs:nodejs /repo/apps/website/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/website/.next/static ./apps/website/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/website/public ./apps/website/public

USER nextjs
EXPOSE 3000
CMD ["node", "apps/website/server.js"]

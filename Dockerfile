FROM node:18-alpine AS base

# Install libc6-compat due to potential native dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dependencies installation
FROM base as deps 
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm and pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." and exit 1; \
  fi

# Build the Next.js application
FROM base AS builder

# For building this is different since it is not normal to have API/DB access during builds
ARG MONGODB_URI

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NO_TELEMETRY 1

RUN yarn build

# Production image setup
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NO_TELEMETRY 1

# User and permissions setup
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copying necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV HOST="0.0.0.0"

CMD ["node", "server.js"]

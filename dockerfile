# Install dependencies only when needed
FROM node:22-alpine3.20 AS deps

WORKDIR /app

COPY package.json package-lock.json* ./ 

# NOTE: Cache node_modules (npm ci failed because of network failer use basefile instead)
RUN npm install

# Rebuild the source code only when needed
FROM node:22-alpine3.20 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM node:22-alpine3.20 AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

# NOTE: Use pm2 for better performance in production

EXPOSE 3000
CMD ["npm", "start"]

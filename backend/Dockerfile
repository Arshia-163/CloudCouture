# ── Stage 1: Build / install dependencies ──────────────────────────
FROM node:18-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# ── Stage 2: Production image ───────────────────────────────────────
FROM node:18-alpine
WORKDIR /app

# Copy only prod dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Remove .env from image — secrets come from AWS Secrets Manager at runtime
RUN rm -f .env

EXPOSE 4000

CMD ["node", "server.js"]

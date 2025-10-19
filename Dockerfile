# Multi-stage build for Next.js with LaTeX support

# Stage 1: Base image with LaTeX (cached separately)
FROM node:20-slim AS base-with-latex

# Install LaTeX (TeX Live) - this will be cached
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    texlive-xetex \
    latexmk \
    && rm -rf /var/lib/apt/lists/*

# Enable Corepack for Yarn 4
RUN corepack enable

# Stage 2: Dependencies
FROM base-with-latex AS deps

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* .yarnrc.yml* ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Stage 3: Builder
FROM base-with-latex AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG OPENAI_API_KEY
ARG OPENAI_PROMPT_ID

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV OPENAI_PROMPT_ID=${OPENAI_PROMPT_ID}

# Build the application (without turbopack for production)
RUN yarn build

# Stage 4: Runner
FROM base-with-latex AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

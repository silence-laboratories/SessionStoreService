########################
# Stage 1 - build image
########################
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci                      # ← installs dev deps too

COPY tsconfig.json ./
COPY src ./src
COPY .env.example .env

RUN npx tsc                     # outputs to /app/dist


########################
# Stage 2 - runtime image
########################
FROM node:20-alpine AS runner

WORKDIR /app

# prod-only deps
COPY package*.json ./
RUN npm ci --omit=dev

# compiled code
COPY --from=build /app/dist ./dist
# copy env (or mount at runtime)
COPY .env.example .env

EXPOSE 3008
CMD ["node", "dist/index.js"]

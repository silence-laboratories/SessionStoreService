FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci                      # ← installs dev deps too

COPY tsconfig.json ./
COPY src ./src
COPY .env.example .env

RUN npx tsc                     # outputs to /app/dist



FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY .env.example .env
COPY src src

EXPOSE 3008
CMD ["node", "dist/index.js"]

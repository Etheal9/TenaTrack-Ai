# Build stage
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/build ./build
COPY src/server.js .
COPY src/config ./src/config
COPY src/services/geminiService.js ./src/services

EXPOSE 5000
CMD ["node", "server.js"]
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port the NestJS app will run on (default is 3000 for NestJS)
ARG PORT=3000 ENV PORT=$PORT EXPOSE $PORT

# Command to start the NestJS application
CMD ["npm", "run", "start:prod"]
# этап сборки (build stage)
FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# этап production (production-stage)
FROM node:lts-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist /app/dist
EXPOSE 8080
CMD [ "http-server", "dist" ]

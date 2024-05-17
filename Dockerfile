# Build
FROM node:18-alpine as build
WORKDIR /opt
COPY --link package.json package-lock.json .
RUN npm install --production=false
COPY --link . .
RUN npm run build && npm prune

# Run
FROM node:18-alpine
ENV NODE_ENV=production
ENV PORT=8080
WORKDIR /opt
RUN apk update && apk add --no-cache curl ca-certificates
COPY --from=build /opt/.output /opt/.output
CMD [ "node", ".output/server/index.mjs" ]

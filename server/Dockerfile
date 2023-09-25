FROM node:18-slim as build-stage

# Install and build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Clean up
RUN rm -rf Dockerfile .dockerignore
RUN rm -rf tsconfig.json tsconfig.app.json tsconfig.spec.json
RUN rm -rf src
RUN npm uninstall @types/express
RUN npm uninstall typescript
RUN npm uninstall nodemon

FROM node:18-slim as run
WORKDIR /app
COPY --from=build-stage /app /
EXPOSE 5050
CMD [ "npm", "run", "start" ]
FROM node:lts-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git

RUN mkdir node_modules && chown -R node:node node_modules

USER node

COPY . .

EXPOSE 4321
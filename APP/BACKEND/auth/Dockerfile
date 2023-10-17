#!/bin/sh

FROM node:20-alpine3.17

RUN apk add --update alpine-sdk && apk add linux-headers
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

# Create the app directory and set it as the working directory
WORKDIR /app/backend/auth

# Define ARG variables with default values
ARG name=auth
ARG config=123
ARG service_token=0000
ARG port=3001
ARG node_env=development

# Copy only package.json and package-lock.json to optimize caching
COPY ./auth/package*.json /app/backend/auth

# copy sdk, will be used in {npm install}
COPY ./SDK /app/backend/SDK

# clear cache
RUN npm cache clean --force

RUN npm install -g npm@latest

RUN npm config set legacy-peer-deps true

# Install app dependencies
RUN npm i

# Copy the rest of the application code
COPY ./auth /app/backend/auth

# Set environment variables
ENV CONFIG=${config}
ENV SERVICE_TOKEN=${service_token}
ENV NAME=${name}
ENV PORT=${port}
ENV NODE_ENV=${node_env}

CMD if [ "${NODE_ENV}" = production ]; then \
    npm run prebuild && npm run build && npm run start:prod; \
else \
    npm run start:dev; \
fi

EXPOSE ${PORT}

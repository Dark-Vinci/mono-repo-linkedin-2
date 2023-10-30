#!/bin/sh

FROM node:20-alpine3.17 as sdk_build

RUN apk add --update alpine-sdk && apk add linux-headers
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

WORKDIR /
COPY ./SDK .

RUN npm cache clean --force

RUN npm install -g npm @latest

RUN npm config set legacy-peer-deps true

RUN npm i

RUN npm i -g typescript

RUN tsc

FROM node:20-alpine3.17

RUN apk add --update alpine-sdk && apk add linux-headers
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

WORKDIR /app/backend/gate

ARG name=gate
ARG config=123
ARG port=3001
ARG node_env=development
ARG service_token=1000

COPY ./gate/package*.json /app/backend/gate

COPY --from=sdk_build / /app/backend/SDK

RUN npm cache clean --force

RUN npm install -g npm @latest

RUN npm config set legacy-peer-deps true

RUN npm i --force

COPY ./gate /app/backend/gate

ENV CONFIG=${config}
ENV NODE_ENV=${node_env}
ENV PORT=${port}
ENV NAME=${name}
ENV SERVICE_TOKEN=${service_token}

CMD if []; then \
    npm run prebuild && npm run build && npm run start:prod; \
else \
    npm run start:dev \
fi

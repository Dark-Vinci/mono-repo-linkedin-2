#!/bin/sh

FROM node:20-alpine3.17

ARG port=3000
ARG node_env=development

WORKDIR /usr/frontend/app

COPY ./app/package*.json /usr/frontend/app

RUN npm i

COPY ./app /usr/frontend/app

ENV PORT $port
ENV NODE_ENV $node_env

CMD if [ "${NODE_ENV}" = production ]; then \
    npm run build && npm run prod; \
else \
    npm run start; \
fi

EXPOSE $PORT

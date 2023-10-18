#!/bin/sh

FROM node:20-alpine3.17

ARG PORT=3000

WORKDIR /usr/frontend/app

COPY ./app/package*.json /usr/frontend/app

RUN npm i

COPY ./app /usr/frontend/app

ENV PORT $PORT

CMD ["npm", "run", "start"]

EXPOSE $PORT

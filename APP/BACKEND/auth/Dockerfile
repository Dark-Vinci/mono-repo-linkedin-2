#!/bin/sh

FROM node:17-alpine3.15

# Define ARG variables with default values
ARG name=auth
ARG app_env=development
ARG config=123
ARG service_token=0000
ARG port=3001

# Set environment variables
ENV CONFIG=${config}
ENV APP_ENV=${app_env}
ENV SERVICE_TOKEN=${service_token}
ENV NAME=${name}
ENV PORT=${port}

# Create a non-root user (optional but recommended for security)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Create the app directory and set it as the working directory
WORKDIR /app/backend/auth

RUN ls -la

# Copy only package.json and package-lock.json to optimize caching
COPY ./auth/package*.json /app/backend/auth

# copy sdk, will be used in {npm install}
COPY ./SDK /app/backend/SDK

#RUN npm i node
#RUN npm install -g npm@latest
RUN npm cache clean --force

# Install app dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY ./auth /app/backend/auth

#COPY
# COPY source dest

CMD if [ ${APP_ENV} = production ]; \
    then \
    ["npm", "run", "prebuild"]; \
    ["npm", "run", "build"]; \
    ["npm", "run" "start:prod"]; \
    else \
    ["npm", "run" "start:dev"]; \
    fi

EXPOSE ${PORT}

# "build" stage - Install deps, copys sources, run build script
FROM node:alpine as build
ARG PACKAGE_NAME

RUN mkdir -p /home/www/packages/${PACKAGE_NAME}
WORKDIR /home/www/packages/${PACKAGE_NAME}/

COPY package.json .yarnrc /home/www/
COPY packages/${PACKAGE_NAME}/package.json yarn.lock ./
RUN yarn install --production=false

COPY tsconfig.json /home/www/
COPY packages/${PACKAGE_NAME}/ .
RUN yarn build

# "development" stage - Just copy all from "build" stage
FROM node:alpine as development
ARG PACKAGE_NAME

RUN mkdir -p /home/www/packages/${PACKAGE_NAME}
WORKDIR /home/www/packages/${PACKAGE_NAME}

COPY --from=build /home/www/ /home/www/
CMD ["yarn", "start"]

# "production-build" stage - Clear non-production deps and sources
FROM node:alpine as production-build
ARG PACKAGE_NAME

RUN mkdir /home/www
WORKDIR /home/www

COPY --from=build /home/www/packages/${PACKAGE_NAME}/ .
COPY --from=build /home/www/node_modules node_modules/
RUN \
  yarn install --frozen-lockfile --production && \
  rm -rf ./src tsconfig.json

# "production" stage - Copy compiled 
FROM node:alpine as production
ARG PACKAGE_NAME

RUN mkdir /home/www
WORKDIR /home/www/packages/${PACKAGE_NAME}

COPY --from=production-build /home/www/ /home/www/

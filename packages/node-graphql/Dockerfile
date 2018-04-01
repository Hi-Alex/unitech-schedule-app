FROM node:9-alpine as build

WORKDIR /tmp/.build/

COPY yarn.lock .
COPY ./packages/node-graphql/ .

RUN pwd && ls -a && \
  yarn install --production false && \
  yarn run build && \
  yarn install --production --force && \
  rm -rf src && \
  rm yarn.lock && \
  rm tsconfig.json && \
  rm package.json && \
  ls -a

# Copy final build from prev stage
FROM node:9-alpine
WORKDIR /home/www/

COPY --from=build /tmp/.build/ .

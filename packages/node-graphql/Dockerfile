FROM node:9-alpine as build

WORKDIR /tmp/.build/

COPY yarn.lock .
COPY ./packages/node-graphql/package.json .
RUN yarn install --production false
COPY ./packages/node-graphql/ .
RUN yarn run build && ls -a

# Copy final build from prev stage
FROM node:9-alpine
WORKDIR /home/www/

COPY --from=build /tmp/.build/ .

CMD ["node", "server/index.js"]

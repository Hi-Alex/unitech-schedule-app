FROM node:9-alpine

WORKDIR /tmp/.build/

COPY yarn.lock .
COPY ./packages/web/package.json .

RUN yarn install --production false

COPY ./packages/web ./

RUN ls -a

EXPOSE 3120
CMD ["yarn", "start"]

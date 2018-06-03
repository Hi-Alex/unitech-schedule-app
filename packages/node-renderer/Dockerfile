FROM node:alpine as development
WORKDIR /home/www/packages/client-web

COPY tsconfig.json package.json yarn.lock .yarnrc /home/www/
COPY packages/client-web/package.json .
RUN yarn install --production=false --frozen-lockfile

COPY packages/client-web/ .

CMD ["yarn", "start"]

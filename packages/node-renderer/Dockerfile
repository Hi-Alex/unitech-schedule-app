FROM node:alpine as development
WORKDIR /home/www/packages/client-web

COPY package.json yarn.lock .yarnrc /home/www/
COPY packages/client-web/package.json .
RUN yarn install --production=false --frozen-lockfile

COPY tsconfig.json /home/www/
COPY packages/client-web/ .

CMD ["yarn", "start", "--port", "80", "--host", "0.0.0.0"]

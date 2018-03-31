FROM node:9-alpine
RUN mkdir -p /home/www
WORKDIR /home/www
ADD package.json /home/www
RUN yarn install --production false
ADD tsconfig.json /home/www
ADD ./src /home/www/src
ADD ./graphql /home/www/graphql
RUN ls /home/www
RUN yarn run build && yarn install --production true

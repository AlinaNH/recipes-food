FROM node:12.18.3-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}    

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm build

COPY . .

EXPOSE 80 2121
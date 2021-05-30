FROM node:12.18.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_OPTIONS="--max-old-space-size=8192"

RUN npm run build:front:prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 80 2121
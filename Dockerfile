FROM node:12.18.3-alpine   

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 80 2121
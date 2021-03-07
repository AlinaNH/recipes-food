FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run build:front
RUN npm run typeorm:run

EXPOSE 80 2121
CMD ["node", "dist"]
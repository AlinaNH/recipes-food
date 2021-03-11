## Pre-requisite

- node 12+ LTS.

## Configuration

This project use .env file


## Installation

```bash
$ npm install
```

## Running the app in production mode

```
docker-compose up -d
```

## Running the app in development mode

```bash
#run database
docker-compose up -d postgres_db

# run frontend
$ npm run start:dev:front

# run backend
$ npm run start:dev

# run migrations
$ npm run typeorm:run
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Built with

[NestJS](https://nestjs.com/)
[React](https://reactjs.org/)

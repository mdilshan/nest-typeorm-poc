## Start the DB
```bash
$ docker-compose up
```
Database will be exposed via PORT 5432 & pgAdmin will be available under PORT 8888. Please refer to docker-compose.yml file for more information

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## License

Nest is [MIT licensed](LICENSE).

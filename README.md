## Start the DB
```bash
$ docker-compose up
```
Database will be exposed via PORT 5432 & pgAdmin will be available under PORT 8888. Please refer to docker-compose.yml file for more information

pgAdmin login credentials

```
PGADMIN_DEFAULT_EMAIL: test@pg.com
PGADMIN_DEFAULT_PASSWORD: root
```
NOTE: if you are using docker and when regisering the db server in pg-admin please use the value `host.docker.internal` as the host name. More details: https://stackoverflow.com/a/62133772/11306028

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

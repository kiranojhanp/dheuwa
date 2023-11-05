# Services

Provides services used by the app locally.

## Requirements

- docker

## Configuration

* Copy `.env.example` to `.env` and update the releveant values.

## Usage

### Start the services

```
docker compose up -d [service1 service2 ...]
```

where `service1`, `service2`, etc. are the services you want to use.

For example, to use `mariadb, `adminer`,` supertokens`, `mailhog`:

```
docker compose up -d mariadb adminer supertokens mailhog
```

Or to run all the services
```
make start
```

### Stop the services

```
make stop
```

### Cleanup the database to its initial state

Any modifications to the database records will be erased permanently.

```
make clean
```

### Dump the database

```
make export
```

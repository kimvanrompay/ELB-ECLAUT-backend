#!/bin/bash

if [ -f ../../.env.test ];
then export $(grep -v '^#' ../../.env.test | xargs)
else echo "No .env.test file found" && exit 1
fi

if [ -z "$POSTGRES_HOST" ];
then echo "POSTGRES_HOST is not set" && exit 1
fi

if [ -z "$POSTGRES_PORT" ];
then echo "POSTGRES_PORT is not set" && exit 1
fi

if [ -z "$POSTGRES_DB" ];
then echo "POSTGRES_DB is not set" && exit 1
fi

if [ -z "$POSTGRES_USER" ];
then echo "POSTGRES_USER is not set" && exit 1
fi

if [ -z "$POSTGRES_PASSWORD" ];
then echo "POSTGRES_PASSWORD is not set" && exit 1
fi

flyway -url=jdbc:postgresql://"$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB" \
  -user="$POSTGRES_USER" \
  -password="$POSTGRES_PASSWORD" \
  -defaultSchema=public \
  -schemas=public \
  -locations="filesystem:./scripts/migrations" \
  migrate

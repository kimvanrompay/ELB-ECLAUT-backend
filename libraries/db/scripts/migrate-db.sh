#!/bin/bash

if [ $# -eq 0 ]; then
  echo "No arguments supplied"
  exit
fi

echo 'Retrieving database credentials'
secret=$(aws secretsmanager get-secret-value --secret-id "$1" --region eu-west-1)
secretString=$(jq -r ".SecretString" <<<"${secret}")
echo 'Retrieved database credentials'

echo 'Starting database migrations'
flyway -url=jdbc:postgres://"$(jq -r ".host" <<<"${secretString}")" \
  -user="$(jq -r ".username" <<<"${secretString}")" \
  -password="$(jq -r ".password" <<<"${secretString}")" \
  -defaultSchema="$2"\
  -schemas="$2" \
  -locations="filesystem:./migrations" \
  migrate

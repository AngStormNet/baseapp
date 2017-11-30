#!/bin/bash

set -e

echo "Building frontend image."
docker-compose -f docker-compose.dev.yml build frontend

docker-compose -f docker-compose.dev.yml run frontend yarn install

echo "Building frontend assets."
docker-compose -f docker-compose.dev.yml run frontend ng build --env=prod

echo "Copying frontend deployable files to docker directory."
mkdir -p docker/director/dist
cp -r lipstick/dist/* docker/director/dist

echo "Copying backend deployable files to docker directory."
mkdir -p docker/pig/dist
cp pig/requirements.txt docker/pig
cp pig/entrypoint.sh docker/pig
cp pig/uwsgi.ini docker/pig
cp -r pig/src/* docker/pig/dist
rm -rf docker/pig/dist/scripts docker/pig/dist/cva/tests

# Create a self-signed cert for both the 'director' and 'backend' docker 
# images. The cert can be used in QA and CAT, but not in production.
country=US
state=VA
locality='Herndon'
organization='Raytheon Cyber Security'
organizationalunit='Customer Visibility Assessment'
commonname='localhost'
email=' '

openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout \
		docker/director/ssl/cva.key -out docker/director/ssl/cva.crt -subj \
		"/C=$country/ST=$state/L=$locality/O=$organization/OU=$organizationalunit/CN=$commonname/emailAddress=$email"

cp -r docker/director/ssl/* docker/pig/ssl/
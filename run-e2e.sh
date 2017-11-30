#!/bin/bash

set -e

# Create test data and run the end to end tests 
# Container Prefix
backend=`docker-compose -f docker-compose.dev.yml ps -q backend`
frontend=`docker-compose -f docker-compose.dev.yml ps -q frontend`

# Remove any left over test data
docker exec $backend /srv/app/manage.py runscript remove_test_data

# Create test data
echo '--- Creating test data...'
docker exec $backend /srv/app/manage.py runscript create_test_data

# Run e2e tests
echo '--- Running e2e tests...'
docker exec $frontend npm run e2e

# Remove test data
# Comment the next line if you want to manually inspect the data after testing
docker exec $backend /srv/app/manage.py runscript remove_test_data

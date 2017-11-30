#!/bin/bash
set -e

# Wait until the DB server is up.
until nc -z -w 2 db 5432; do sleep 1; done

# Start the redis server as a background process.
redis-server &

# Run the database migrations
yes yes | python manage.py migrate

# Start Celery worker to process tasks.
celery worker -A cva --uid www-data --loglevel=info --concurrency=2 &

# Start Celery beat to initiate scheduled tasks.
celery -A cva beat --pidfile= &

# Start supervisor which starts nginx web server
if [ "$DEBUG" = "1" ]; then
    python manage.py runserver 0.0.0.0:8000
    # /usr/bin/supervisord    # Could use this also, if needed.
else
    /usr/bin/supervisord
fi
    
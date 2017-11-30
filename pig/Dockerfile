# Development Dockerfile for ContentExchange API server.

FROM tiangolo/uwsgi-nginx:python3.5

# Force the binary layer of the stdout and stderr streams to be unbuffered.
# https://docs.python.org/3/using/cmdline.html
ENV PYTHONUNBUFFERED 1

# redis: Install the redis server, used by Celery scheduled tasks.
RUN wget http://download.redis.io/redis-stable.tar.gz
RUN tar xvzf redis-stable.tar.gz
RUN cd redis-stable && make && make install

# Copy the Nginx conf to use http on port 8000 to the dev Docker container.
COPY etc/nginx/conf.d/nginx.dev.conf /etc/nginx/conf.d/nginx.conf

# The API server is installed in this directory.
RUN mkdir -p /srv/app
WORKDIR /srv/app

# Install the application requirements in the Docker image.
RUN apt-get -y update \
    && apt-get -y install libldap2-dev python-dev libsasl2-dev netcat
ADD requirements.txt .
ADD test-requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r test-requirements.txt

# The application directory is linked to local source code in the .yml file
# See services: backend: volumes: - ./pig/src:/srv/app
# No need to install the app in development.
COPY uwsgi.ini /app

# Start the API server.
COPY entrypoint.sh /
CMD ["/entrypoint.sh"]

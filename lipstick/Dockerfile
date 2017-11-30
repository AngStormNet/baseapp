# Development Dockerfile for the frontend AngularJS 2 (ng2) server.
FROM node:7.10.0

# Install Google Chrome browser for the protractor e2e tests.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update
RUN apt-get install -y google-chrome-stable

# Install the java develoment kit, JDK, for the protractor e2e tests.
RUN apt-get -y install default-jdk xvfb

# Display and chrome settings for the protractor e2e tests.
ENV DISPLAY=:99.0
ENV CHROME_BIN=/usr/bin/google-chrome
# https://github.com/angular/protractor/issues/2419#issuecomment-213112857
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null
COPY Xvfb /etc/init.d/

# Install PhantomJS headless browser for the karma unit tests.
RUN npm install phantomjs-prebuilt
RUN npm install karma-phantomjs2-launcher

# Install AngularJS command line interface.
RUN npm install -g \@angular/cli

# The frontend application will be installed in this directory.
RUN mkdir -p /srv/app
WORKDIR /srv/app
COPY ./ ./

RUN npm install -g

COPY entrypoint.sh /
CMD ["/entrypoint.sh"]

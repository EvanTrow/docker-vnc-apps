# Pull base image.
FROM jlesage/baseimage-gui:ubuntu-20.04

# Install azure data studio
# ADD azuredatastudio-linux-1.36.2.deb .
RUN DEBIAN_FRONTEND=noninteractive apt-get update -qq
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install libasound2 wget curl git
RUN DEBIAN_FRONTEND=noninteractive curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
RUN DEBIAN_FRONTEND=noninteractive bash nodesource_setup.sh
RUN DEBIAN_FRONTEND=noninteractive apt-get install nodejs
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libgbm-dev gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# copy node project
COPY node-app /config/node-app

# Generate and install favicons.
RUN \
    APP_ICON_URL=https://www.textnow.com/favicon/android-icon-192x192.png && \
    install_app_icon.sh "$APP_ICON_URL"

# Copy the start script.
COPY startapp.sh /startapp.sh

# FileBrowser port
EXPOSE 8080

# Set the name of the application.
ENV APP_NAME="TextNow Bot"

VOLUME ['/config']
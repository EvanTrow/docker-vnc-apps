#!/bin/sh

# install node deps
cd /config/node-app/
npm install

# run node app
exec /usr/bin/node /config/node-app/index.js
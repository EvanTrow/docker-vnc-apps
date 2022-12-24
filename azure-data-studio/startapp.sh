#!/bin/sh
mkdir -p /config/azds/appdata
mkdir -p /config/azds/extensions
mkdir -p /config/filebrowser

filebrowser -a 0.0.0.0 --noauth -d /config/filebrowser/filebrowser.db -r / &

exec /usr/bin/azuredatastudio --user-data-dir=/config/azds/appdata/ --extensions-dir=/config/azds/extensions --disable-gpu --wait
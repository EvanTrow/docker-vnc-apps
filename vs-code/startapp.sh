#!/bin/sh
HOME="/config"

mkdir -p /config/vscode/appdata
mkdir -p /config/vscode/extensions

exec /usr/bin/code $FOLDER_PATH --no-sandbox --user-data-dir=/config/vscode/appdata/ --extensions-dir=/config/vscode/extensions --disable-gpu --wait
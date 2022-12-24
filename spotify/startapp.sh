#!/bin/sh
mkdir -p /config/spotify/cache

exec /usr/bin/spotify --cache-path=/config/spotify/cache --ui.hardware_acceleration=false
#!/bin/sh

HOME="/config"

_JAVA_OPTIONS="-Duser.home=${HOME}"  exec /usr/bin/java -jar /defaults/snowflake.jar

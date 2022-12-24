#!/bin/sh
mkdir -p /config/scrcpy/
export HOME=/config

adb connect 192.168.1.17:5555

sleep 5
adb devices
sleep 5

adb kill-server
adb start-server

adb connect 192.168.1.17:5555

exec scrcpy --select-tcpip
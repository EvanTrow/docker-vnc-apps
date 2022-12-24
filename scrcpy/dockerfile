# Pull base image.
FROM jlesage/baseimage-gui:ubuntu-20.04

# Install scrcpy
RUN DEBIAN_FRONTEND=noninteractive apt-get update -qq
# for Debian/Ubuntu
RUN apt install -y sudo ffmpeg libsdl2-2.0-0 adb wget \
                 gcc git pkg-config meson ninja-build libsdl2-dev \
                 libavcodec-dev libavdevice-dev libavformat-dev libavutil-dev \
                 libusb-1.0-0 libusb-1.0-0-dev
RUN git clone https://github.com/Genymobile/scrcpy
WORKDIR /tmp/scrcpy
RUN ./install_release.sh

# Generate and install favicons.
RUN \
    APP_ICON_URL=https://raw.githubusercontent.com/EvanTrow/docker-scrcpy/main/icon.png && \
    install_app_icon.sh "$APP_ICON_URL"

# Copy the start script.
COPY startapp.sh /startapp.sh

# Set the name of the application.
ENV APP_NAME="scrcpy"

# Metadata.
LABEL \
      org.label-schema.name="scrcpy" \
      org.label-schema.description="Docker container for scrcpy" \
      org.label-schema.vcs-url="https://github.com/EvanTrow/docker-scrcpy" \

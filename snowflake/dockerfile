# Pull base image.

FROM jlesage/baseimage-gui:alpine-3.16-v4.2.2

# Download snowflake
RUN \
    apk --no-cache add curl && \
    mkdir -p /defaults && \
    curl -# -L -o /defaults/snowflake.jar https://github.com/subhra74/snowflake/releases/download/v1.0.4/snowflake.jar

RUN \
    add-pkg \
    # Java jdk
    java-common \
    openjdk11-jre \
    # Needed by the init script.
    jq \
    # We need a font.
    ttf-dejavu \
    # For rtmpdump tool.
    rtmpdump


# Copy the start script.
COPY startapp.sh /startapp.sh

RUN export HOME="/config"

# Generate and install favicons.
RUN \
    APP_ICON_URL=https://gitlab.com/uploads/-/system/project/avatar/15815324/snowflake.png && \
    install_app_icon.sh "$APP_ICON_URL"

# Set the name of the application.
ENV APP_NAME="Snowflake SSH"
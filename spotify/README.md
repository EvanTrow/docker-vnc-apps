## **docker-spotify**

A docker container for [Spotify](https://spotify.com) via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)
-   Contains the official Spotify package
-   Supports audio device pass-through.
-   Uses a volume for persistent config.

### **Build:**

```
docker build -t evantrow/spotify .
```

### **Deploy:**

```
docker run -d -p 5800:5800 -p 5900:5900 --device /dev/snd evantrow/spotify:latest
```

### **Ports:**

-   5800/tcp - Web server for noVNC
-   5900/tcp - WebSocket / VNC

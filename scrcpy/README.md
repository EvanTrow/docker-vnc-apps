## **docker-scrcpy**

A docker container for [scrcpy](https://github.com/Genymobile/scrcpy) via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)
-   Contains the official scrcpy package

### **Build:**

```
docker build -t docker-scrcpy .
```

### **Deploy:**

```
docker run --rm -p 5800:5800 -p 5900:5900 docker-scrcpy:latest
```

### **Ports:**

-   5800/tcp - Web server for noVNC
-   5900/tcp - WebSocket / VNC

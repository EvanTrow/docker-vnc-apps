## **docker-azuredatastudio**

A docker container for [Azure Data Studio](https://github.com/microsoft/azuredatastudio) via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)
-   Contains the official Azure Data Studio package
-   Uses a volume for persistent config.

### **Build:**

```ps
docker build -t evantrow/azuredatastudio .
```

### **Deploy:**

```ps
docker run --rm -p 5800:5800 -p 5900:5900 -p 8080:8080 --cap-add=SYS_ADMIN evantrow/azuredatastudio:latest
```

### **Ports:**

-   5800/tcp - Web server for noVNC
-   5900/tcp - WebSocket / VNC
-   8080/tcp - [FileBrowser](https://filebrowser.org/)

## **MEGA Sync**

A docker container for [MEGA Sync](https://mega.io/desktop#download) via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)
-   Contains the official MEGA Sync app
-   Uses a volume for persistent config.

### **Build:**

```ps
docker build -t evantrow/megasync .
```

### **Deploy:**

```ps
docker run -d -p 5800:5800 -v /docker/megasync:/config evantrow/vscode
```

### **Ports:**

-   5800/tcp - Web server for noVNC

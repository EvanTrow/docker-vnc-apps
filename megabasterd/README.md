## **docker-megabasterd**

A docker container for [MegaBasterd](https://github.com/tonikelope/megabasterd) via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)

### **Build:**

```
docker build -t evantrow/megabasterd .
```

### **Deploy:**

```
docker run -d -p 5843:5843 -p 5943:5943 evantrow/megabasterd:latest
```

### **Ports:**

-   5843/tcp - Web server for noVNC
-   5943/tcp - WebSocket / VNC

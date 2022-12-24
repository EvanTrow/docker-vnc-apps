## **docker-snowflake**

A docker container for [Muon SSH](https://github.com/subhra74/snowflake) via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)

### **Build:**

```
docker build -t evantrow/snowflake .
```

### **Deploy:**

```
docker run -d -p 5800:5800 -p 5900:5900 evantrow/snowflake:latest
```

### **Ports:**

-   5800/tcp - Web server for noVNC
-   5900/tcp - WebSocket / VNC

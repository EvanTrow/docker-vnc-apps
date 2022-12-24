## **docker-textnow**

A docker container for [TextNow](https://www.textnow.com/) bot via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)
-   Uses [Puppeteer](https://www.npmjs.com/package/puppeteer) to login and send a text on a cron schedule
-   Config file for TestNow login and error email notifications (nodemailer)

### **Build:**

```ps
docker build -t evantrow/textnow .
```

### **Deploy:**

```ps
docker run --rm -p 5800:5800 -p 5900:5900 evantrow/textnow:latest
```

### **Ports:**

-   5800/tcp - Web server for noVNC
-   5900/tcp - WebSocket / VNC

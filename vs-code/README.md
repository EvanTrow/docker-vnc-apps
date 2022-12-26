## **vs code**

A docker container for [Visual Studio Code](https://code.visualstudio.com/) via noVNC.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)
-   Contains the official Visual Studio Code package
-   Uses a volume for persistent config.

### **Build:**

```ps
docker build -t evantrow/vscode .
```

### **Deploy:**

```ps
docker run -d -p 5800:5800 -p 3000:3000 --ipc=host --name=vscode -e FOLDER_PATH=/your_code_folder -v /docker/vs-code:/config -v /home/user/your_code_folder/:/your_code_folder evantrow/vscode
```

### **Ports:**

-   5800/tcp - Web server for noVNC
-   5900/tcp - WebSocket / VNC
-   3000/tcp - App port

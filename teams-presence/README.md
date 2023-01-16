## **docker-teams-presence**

A docker container for Microsoft Teams to get presence and set smart light via the Home Assistant API without the need for an Azure App.

### **Features:**

-   Based on [jlesage/docker-baseimage-gui](https://github.com/jlesage/docker-baseimage-gui)
-   Uses [Puppeteer](https://www.npmjs.com/package/puppeteer) to login and get Teams presence.

### **Build:**

```ps
docker build -t evantrow/teams-presence .
```

### **Deploy:**

```ps
docker run -d -p 5800:5800 \
    --name=teams-presence \
    -e HASS_URL=https://your.home.assistant.local \
    -e HASS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
    -e HASS_LIGHT_ID=office_light \
    -e TEAMS_BUSY_STATES=Busy,DoNotDisturb,InACall,InAConferenceCall,InAMeeting,Presenting,UrgentInterruptionsOnly \
    -e M365_USERNAME=user@example.com \
    -e M365_PASSWORD=your_password \
    -e M365_MFA_SECRET=your_mfa_secret \
    evantrow/teams-presence:latest
```

### **Ports:**

-   5800/tcp - Web server for noVNC
-   5900/tcp - WebSocket / VNC

``` mermaid
    sequenceDiagram
        participant Browser
        participant Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate Server
        Server -->> Browser: Returns HTML File
        deactivate Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate Server
        Server -->> Browser: Returns CSS File
        deactivate Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate Server
        Server -->> Browser: Returns JavaScript File
        deactivate Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate Server
        Server -->> Browser: Returns JSON File, Webpage rendered
        deactivate Server
```

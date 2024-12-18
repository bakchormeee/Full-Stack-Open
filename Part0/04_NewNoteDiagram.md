``` mermaid
    sequenceDiagram
        participant Browser
        participant Server

        Browser ->> Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate Server
        Server -->> Browser: Redirect Webpage
        deactivate Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate Server
        Server -->> Browser: HTML File returned
        deactivate Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate Server
        Server -->> Browser: CSS File Returned
        deactivate Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate Server
        Server -->> Browser: JavaScript File Returned
        deactivate Server

        Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate Server
        Server -->> Browser: JSON File Returned
        deactivate Server
```

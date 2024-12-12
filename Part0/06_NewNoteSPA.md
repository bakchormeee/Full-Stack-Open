``` mermaid
    sequenceDiagram
        participant Browser
        participant Server

        Browser ->> Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate Server
        Server -->> Browser: JSON File returned, Webpage updated without Redirect
        deactivate Server
```

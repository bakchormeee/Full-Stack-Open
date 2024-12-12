``` mermaid
    sequenceDiagram
        participant User
        participant Browser
        participant Server

        User ->> Browser: Click Button to Submit
        Browser ->> Server: Send User Input (HTTP Post Request)
        activate Server
        Server -->> Browser: HTTP Status Code 302 (URL Redirect)
        deactivate Server

        Browser ->> Server: GET redirect address
        activate Server
        Server -->> Browser: Webpage with form submission data made avaliable
        deactivate Server
```

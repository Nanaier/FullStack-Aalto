sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user enters new note content and clicks submit

    browser->>browser: Collect the note content and prepare a JSON object
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note, JSON object
    activate server
    server->>server: Save the new note
    server-->>browser: HTTP 302 Redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated note list [{ "content": "HTML is easy", "date": "2023-1-1" }, { "content": "New note content", "date": "2023-4-17" }]
    deactivate server

    Note right of browser: The browser executes the callback function that re-renders the notes with the new one included
  
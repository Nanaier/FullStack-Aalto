sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes a note and clicks the save button

    browser->>browser: JavaScript code executes the submit event handler

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Response status 201 Created
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated list of notes
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes with the new one
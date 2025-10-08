# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - heading "Livestream Timestamp App" [level=1] [ref=e4]
    - generic [ref=e6]:
      - generic [ref=e7]: Stream Name
      - textbox "Stream Name" [ref=e8]:
        - /placeholder: Enter stream name...
    - generic [ref=e9]:
      - generic [ref=e11]: 00:00:06
      - button "Stop Timer" [ref=e13] [cursor=pointer]
      - generic [ref=e14]:
        - generic [ref=e15]: Add Note
        - textbox "Add Note" [ref=e16]:
          - /placeholder: Enter your note here...
      - button "Add Note" [disabled] [ref=e18]
    - generic [ref=e20]:
      - button "Save Stream" [disabled] [ref=e21]
      - button "Export Notes" [ref=e22] [cursor=pointer]
      - link "View Archive" [ref=e23]:
        - /url: /archive
    - generic [ref=e24]:
      - heading "Notes List" [level=2] [ref=e25]
      - list [ref=e26]:
        - listitem [ref=e27]: 00:00:01 - Archived note
  - alert [ref=e28]
```
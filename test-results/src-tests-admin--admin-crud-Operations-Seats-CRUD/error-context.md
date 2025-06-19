# Page snapshot

```yaml
- complementary:
  - navigation:
    - text: Hello, admin
    - link "Users":
      - /url: /admin/users
    - link "Theatres":
      - /url: /admin/theatres
    - link "Shows":
      - /url: /admin/shows
    - link "Performances":
      - /url: /admin/performances
    - link "Seats":
      - /url: /admin/seats
    - link "Tickets":
      - /url: /admin/tickets
    - button "Log Out"
- main:
  - heading "Create Seat" [level=1]
  - text: "Theatre ID:"
  - spinbutton "Theatre ID:"
  - text: "Code:"
  - textbox "Code:"
  - text: "Zone:"
  - textbox "Zone:"
  - text: "Status:"
  - spinbutton "Status:"
  - button "Create"
  - button "Cancel"
- alert
- button "Open Next.js Dev Tools":
  - img
```
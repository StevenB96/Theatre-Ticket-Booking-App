# Page snapshot

```yaml
- complementary:
  - navigation:
    - text: Loading...
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
  - heading "Create Show" [level=1]
  - text: "Name:"
  - textbox "Name:"
  - text: "Status:"
  - spinbutton "Status:"
  - button "Create"
  - button "Cancel"
```
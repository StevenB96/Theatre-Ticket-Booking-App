# 🎭 Theatre Ticket Booking App

This project is a progressive learning platform built with Next.js 15, designed to demonstrate mastery of modern full-stack web development. It moves beyond standard frameworks by implementing a strictly decoupled architecture, a custom model-wrapping engine, and advanced automated developer tooling.

---

## 🚀 Key Skills Demonstrated
### 1. Layered "Clean" Architecture
The codebase follows a strictly decoupled approach to ensure maintainability:
*   **Data Layer (`/knex`):** Robust schema management and seeding.
*   **Domain Layer (`/library/db`):** Data Access Objects (DAOs) that encapsulate raw SQL queries.
*   **Application Layer (`/models`):** High-level business logic (e.g., `PerformanceModel`) that handles complex relational joins and calculated metrics like sell-out percentages.
*   **UI Layer (`/app`):** Modern React Server Components for performance and Server Actions for secure data mutations.

### 2. Custom Developer Tooling (The Scaffolding Engine)
The project features a **custom-built template engine** (`/modelBasedTemplating`) that demonstrates an understanding of "Developer Experience" (DX):
*   **Code Generation:** Automates the creation of Types, Database logic, API routes, and Admin UI pages for new entities via `npm run generate`.
*   **Standardisation:** Ensures that every new feature follows the same design patterns across all layers of the stack.

### 3. Data Visualisation & Analytics
The Admin portal transforms raw relational data into actionable insights using **Recharts**:
*   **Revenue Tracking:** Complex SQL aggregations visualised as Bar charts.
*   **Sales Performance:** Pie charts that dynamically calculate unsold inventory vs. bookings.
*   **Seating Visualiser:** A responsive visual map representing theatre zones and real-time seat occupancy.

### 4. Enterprise-Grade DevOps & Testing
*   **Playwright E2E Testing:** A comprehensive suite that tests the entire entity lifecycle, managing strict database dependencies (Theatres → Shows → Performances → Tickets).
*   **Multi-Stage Docker builds:** Optimised multi-stage `Dockerfile` that handles testing and building in a Playwright-ready environment before deploying to a slim production runner.

---

## 📌 Functional Overview
The application functions as a comprehensive management suite for theatre operations, split into three core areas:
*   **Venue & Event Management:** A full CRUD administrative interface for managing theatrical venues, shows, and individual performance schedules.
*   **Real-Time Analytics:** An insights dashboard that transforms raw relational data into visual metrics, such as revenue tracking and sell-out percentages.
*   **Inventory & Booking Logic:** An optimised seating visualiser and booking engine that handles real-time seat occupancy and complex relational joins.

---

## 🛠 Architecture

The codebase follows a layered approach:

* **Data Layer** (`@/knex/`)
  * Handles database migrations, seeds, and query builder setup with Knex.js.
* **Domain Layer** (`@/library/db/`)
  * Encapsulates low-level database operations and domain-specific data access logic.
* **Application Layer** (`@/models/`, `@/app/api/`)
  * Defines business models and Next.js API routes for CRUD operations.
* **UI Layer** (`@/app/admin`, `@/app/auth`)
  * Implements client-side and server-side rendered pages, forms, and tables using React and Next.js App Router.

---

## ⌨️ Scripts & Commands

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",         // Build then start for best performance
    "start": "next start",
    "lint": "next lint",
    "migrate": "knex migrate:latest --knexfile knexfile.js",
    "rollback": "knex migrate:rollback --knexfile knexfile.js",
    "seed": "knex seed:run --knexfile knexfile.js",
    "generate": "node modelBasedTemplating/generateAll.js",  // Development only
    "test": "playwright test"      // E2E tests for login/admin CRUD
  }
}
```

---

## 📂 Folder Structure

```plaintext
├── src/                        # Source Code Root
│   ├── app/                    # Next.js App Router (UI & Layouts)
│   │   ├── (auth)/             # Route Group: Auth (Login/Register)
│   │   ├── admin/              # Protected Management Dashboard
│   │   │   ├── analytics/      # Recharts implementation
│   │   │   ├── ticket-sales/   # Real-time seating visualiser
│   │   │   └── ...             # Entity CRUD modules
│   │   ├── layout.tsx          # Root layout with Google Fonts
│   │   └── page.tsx            # Protected home redirect
│   ├── api/                    # Backend API Route Handlers
│   ├── library/                # Core Infrastructure
│   │   ├── db/                 # DAO Layer (Domain-specific queries)
│   │   ├── auth.js             # Bcrypt utility logic
│   │   └── dbClient.ts         # Knex instance with env loading
│   ├── models/                 # Application/Business Logic Layer
│   ├── knex/                   # Database Migrations & Seeds
│   ├── tests/                  # Playwright E2E Specs
│   └── types/                  # TypeScript Interfaces
├── modelBasedTemplating/       # Custom Scaffolding Engine (Developer Tooling)
│   ├── templates/              # EJS-based code templates
│   └── generateAll.js          # CLI generator script
├── public/                     # Static Assets (SVGs)
├── knexfile.js                 # Database Configuration
├── Dockerfile                  # Multi-stage production build
└── package.json                # Project dependencies and scripts
```

---

## 🏁 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run migrations & seeds**
   ```bash
   npm run migrate
   npm run seed
   ```
3. **Start in dev mode**
   ```bash
   npm run dev
   ```
4. **Run tests**
   ```bash
   npm run test
   ```

---

## 🐳 Docker Support

- docker build --build-arg NODE_ENV=production -t stevenb1996/theatre-ticket-booking-app:latest .

<!-- The app can be run using docker compose and the example configuration found in .env.example.txt and .env.[].example.txt. In development mode (specified in .env), the app requires a .env.development file. Production support is planned but not tested.

Here are some relevant commands:
- `docker system prune -a --volumes -f; docker builder prune --all -f`
- `docker-compose build --no-cache --progress=plain; docker-compose up -d`
- `docker build --no-cache -t stevenb1996/theatre-ticket-booking-app:v1.0.1 .`
- `docker pull stevenb1996/theatre-ticket-booking-app:v1.0.1`
- `docker stop affectionate_bhabha`
- `docker rm affectionate_bhabha`
- `docker run -d --name affectionate_bhabha -p 49152:49152 stevenb1996/theatre-ticket-booking-app:v1.0.1`
- `docker rmi stevenb1996/theatre-ticket-booking-app:v1.0.0`

---

## 📝 License
[MIT](./LICENSE) -->
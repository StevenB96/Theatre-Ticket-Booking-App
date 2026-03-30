# 🎭 Theatre Ticket Booking App
### A Progressive, Full-Stack Next.js Architecture Study

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 Overview
This project is a progressive learning platform built with **Next.js 15**, designed to demonstrate mastery of full-stack web development. It moves beyond standard tutorials by implementing a strictly decoupled architecture, a custom model-wrapping logic, and advanced automated developer tooling.

The application allows administrators to manage theatrical venues, performances, and seating charts, while providing real-time data visualization and an optimized booking logic.

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
*   **Standardization:** Ensures that every new feature follows the same design patterns across all layers of the stack.

### 3. Data Visualization & Analytics
The Admin portal transforms raw relational data into actionable insights using **Recharts**:
*   **Revenue Tracking:** Complex SQL aggregations visualized as Bar charts.
*   **Sales Performance:** Pie charts that dynamically calculate unsold inventory vs. bookings.
*   **Seating Visualizer:** A responsive visual map representing theatre zones and real-time seat occupancy.

### 4. Enterprise-Grade DevOps & Testing
*   **Playwright E2E Testing:** A comprehensive suite that tests the entire entity lifecycle, managing strict database dependencies (Theatres → Shows → Performances → Tickets).
*   **Multi-Stage Docker builds:** Optimized multi-stage `Dockerfile` that handles testing and building in a Playwright-ready environment before deploying to a slim production runner.

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
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   ├── page.tsx
│   ├── Providers.tsx
│   ├── auth
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── admin
│   │   ├── layout.client.tsx
│   │   ├── layout.module.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── performances
│   │   │   ├── actions.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   ├── PerformanceTable.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── EditPerformanceForm.tsx
│   │   │   │   └── page.tsx
│   │   │   └── create/
│   │   │       ├── CreatePerformanceForm.tsx
│   │   │       └── page.tsx
│   │   └── ... (seats, shows, theatres, tickets, users)
├── api
│   └── ... (Next.js API routes mirroring admin resources)
├── knex
│   ├── migrations
│   └── seeds
├── library
│   ├── auth.js
│   ├── dbClient.ts
│   ├── functions.ts
│   └── db (domain-specific data modules)
├── models (business models)
├── tests (Playwright specs)
└── types (TypeScript interfaces)
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

The app can be run using docker compose and the example configuration found in .env.example.txt and .env.[].example.txt. In development mode (specified in .env), the app requires a .env.development file. Production support is planned but not tested.

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
[MIT](./LICENSE)
# Theatre Ticket Booking App
Progressive Learning Next.js Application

## Overview

This project is a progressive learning platform built with Next.js, designed to help you deepen your knowledge of full-stack web development. It emphasises clean architecture, performance optimisation, and best practices throughout the data, domain, application, and UI layers.

---

## Architecture

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

## Scripts & Commands

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

## Folder Structure

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

## Getting Started

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

## Docker Support

The app can be run using docker compose and the example configuration found in .env.example.txt and .env.[].example.txt. In development mode (specified in .env), the app requires a .env.development file. Production support is planned but not tested.

Here are some relevant commands:
- docker system prune -a --volumes -f; docker builder prune --all -f
- docker-compose build --no-cache --progress=plain; docker-compose up -d
- docker build --no-cache -t stevenb1996/theatre-ticket-booking-app:v1.0.1 .

- docker pull stevenb1996/theatre-ticket-booking-app:v1.0.1
- docker stop affectionate_bhabha
- docker rm affectionate_bhabha
- docker run -d \
  --name affectionate_bhabha \
  -p 49152:49152 \
  stevenb1996/theatre-ticket-booking-app:v1.0.1
- docker rmi stevenb1996/theatre-ticket-booking-app:v1.0.0

---

## Next Steps & Improvements

<!-- * **Modularise Shared Components**: Extract recurring UI elements (tables, forms, buttons) into a shared component library.
* **Type-Safe Data Access**: Integrate Zod or Yup for runtime schema validation in queries and API handlers.
* **Caching & Performance**: Add ISR/SSG for public pages, SWR/react-query for client-side caching in the admin UI.
* **Authentication Enhancements**: Implement role-based access control (RBAC) and multi-factor auth flows.
* **End-to-End CI/CD**: Automate builds, tests, migrations, and deployments using GitHub Actions or another CI provider.
* **GraphQL Gateway**: Explore introducing a GraphQL API layer for more flexible data fetching patterns. -->

---

## License

[MIT](./LICENSE)




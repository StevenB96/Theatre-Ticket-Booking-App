This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Knex Migrations and Seeds

Knex provides tools to manage your database schema (migrations) and to populate initial or test data (seeds).

### Creating and Running Migrations

Migrations are files that define changes to your database schema (e.g., create/drop tables).

To create a new migration, run:
npx knex migrate:make migration_name

Then to execute it, run:
npx knex migrate:latest

### Creating and Running Seeds

Seeds are scripts used to populate your database with initial data or sample data for development and testing. Unlike migrations, which change the structure of your database (tables, columns, etc.), seeds insert actual records into your tables.

To create a seed file, run:
npx knex seed:make seed_name

Then to execute it, run:
npx knex seed:run

## Check Directory Structure and Contents

function Show-Tree { param($p='.', $l=0) (Get-ChildItem $p -Force | Sort-Object @{Expression={$_.PSIsContainer};Descending=$true}, Name) | ForEach-Object { if ($_.PSIsContainer) { ('  '*$l)+'📁 '+$_.Name; Show-Tree $_.FullName ($l+1) } else { ('  '*($l+1))+ $_.Name; try { if ((Get-Content $_.FullName -Encoding Byte -TotalCount 1024 | Where-Object { $_ -gt 31 -or $_ -eq 9 -or $_ -eq 10 -or $_ -eq 13 }).Count -gt 0) { Get-Content $_.FullName -ErrorAction Stop | ForEach-Object { ('  '*($l+2)) + $_ } } else { ('  '*($l+2)) + '[Binary or non-text content skipped]' } } catch { ('  '*($l+2)) + '[Error reading file]' } } } }; Show-Tree






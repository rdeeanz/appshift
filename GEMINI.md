# AppShift - Project Overview

AppShift is a community-driven application directory designed to help users discover, compare, and track newly submitted software. It features a curated list of apps across various categories like Developer Tools, AI & LLM, Privacy, and more.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **CMS:** [Payload CMS 3.0](https://payloadcms.com/) (Beta)
- **Database:** PostgreSQL (via `@payloadcms/db-postgres`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a custom design system defined in `globals.css`
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme Management:** `next-themes`
- **Package Manager:** PNPM

## Architecture

The project is structured as a unified Next.js and Payload application:
- `/app/(app)`: Contains the frontend application logic and UI.
- `/app/(payload)`: Contains the Payload CMS admin panel.
- `/components/sections`: Reusable frontend UI components.
- `/lib`: Utility functions and shared logic (e.g., seeding script).
- `payload.config.ts`: Configuration for Payload collections, globals, and plugins.
- `payload-types.ts`: Automatically generated TypeScript types from Payload collections.

## Core Collections & Globals

### Collections
- **Users:** Authentication and role-based access control (Admin, Editor, User).
- **Apps:** The core directory of software with metadata (platforms, licenses, features, etc.).
- **Categories:** Grouping for apps with icons.
- **Media:** Uploads for images, screenshots, and hero assets.
- **Posts:** Blog posts and articles.

### Globals
- **Hero:** Configurable content for the landing page hero section.
- **Stats:** Data for the statistics bar.

## Getting Started

### Prerequisites
- Node.js (v20+)
- PostgreSQL database
- PNPM

### Environment Variables
Create a `.env` file with the following:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/appshift
PAYLOAD_SECRET=your_payload_secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Commands
- `pnpm dev`: Starts the development server for both Next.js and Payload.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Runs the built application.
- `pnpm seed`: Resets and seeds the database with initial sample data.
- `pnpm lint`: Runs ESLint for code quality checks.

## Development Conventions

- **Design System:** Rigorously follow the established design system in `app/(app)/globals.css`. Use the custom utility classes (e.g., `.app-card`, `.btn-primary`) and CSS variables for colors and spacing to ensure consistency.
- **Components:** Place new UI components in `components/sections` or appropriate subdirectories. Prioritize composition and reuse of existing components like `AppCard`.
- **Type Safety:** Always refer to `payload-types.ts` for Payload-related types. Ensure all new code is strictly typed.
- **Payload Schema:** All schema changes must be made in `payload.config.ts`. Run the build or dev script to update `payload-types.ts` after making changes.
- **ESLint & Styling:** Adhere to the project's ESLint configuration and maintain a clean, readable code style consistent with the existing codebase.

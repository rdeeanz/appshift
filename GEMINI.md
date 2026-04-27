# AppShift — Project Overview

AppShift is a community-driven platform for discovering newly submitted software, similar to directories like AlternativeTo. It features a curated list of applications across various categories, featured spotlights, and a blog.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **CMS:** [Payload CMS](https://payloadcms.com/) 3.84.1
- **Database:** PostgreSQL (via `@payloadcms/db-postgres`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Lucide React](https://lucide.dev/) for iconography
- **Theming:** `next-themes` for dark/light mode support
- **Editor:** Lexical Editor (integrated with Payload)

## Architecture

- `app/(app)`: Contains the main user-facing application (Marketing pages, Browse, Blog, Dashboard).
- `app/(payload)`: Contains the Payload CMS admin interface.
- `components/`: Organized UI components, primarily under `sections/`.
- `lib/`: Utility functions and shared logic, including the database seeding scripts.
- `payload.config.ts`: Central configuration for Payload collections (`users`, `apps`, `categories`, `media`, `posts`) and globals (`hero`, `stats`).

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- PostgreSQL database
- Environment variables: Create a `.env` file with:
  - `DATABASE_URL`: Connection string for your PostgreSQL instance.
  - `PAYLOAD_SECRET`: A secret string for Payload authentication.

### Building and Running

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Seed the database (Important for local development)
pnpm seed
```

## Development Conventions

### Content Management
- **Collections:**
  - `apps`: Core directory items. Includes metadata like license, platform, and featured status.
  - `categories`: Taxonomies for grouping apps.
  - `posts`: Blog content.
  - `users`: Auth-enabled collection for admin and editor roles.
- **Globals:**
  - `hero`: Configurable homepage hero section.
  - `stats`: Configurable statistics bar data.

### Styling & UI
- Use **Vanilla CSS** and **Tailwind CSS** for styling.
- Follow the established design system in `app/(app)/globals.css`.
- Prefer existing components in `components/sections/` for layout consistency.

### Seeding
The database can be populated with initial data using `pnpm seed`. This script (located in `lib/seed.ts`) clears existing data and creates a set of initial categories, apps, and blog posts, along with an admin user (`admin@appshift.io` / `password123`).

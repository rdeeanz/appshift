# AppShift Project Context

AppShift is a modern platform designed for discovering and sharing newly submitted applications. It features a sleek, high-performance web interface built with the latest React and Next.js technologies, integrated with a robust backend and authentication system.

## Project Architecture

The project is structured as a **pnpm monorepo**, allowing for efficient management of multiple packages and applications.

- **`apps/web`**: The main user-facing application built with **Next.js 15 (RC)** and **React 19 (RC)**. It uses **Prisma** for database access (Postgres) and **Tailwind CSS** for styling.
- **`packages/cms`**: A headless CMS built with **Payload CMS (v3 Beta)**. It is configured to use **MongoDB** via Mongoose, providing a flexible content management interface.
- **`prisma/`**: Contains the shared Prisma schema, which defines the relational data models (Postgres) for users, apps, categories, and site settings.

## Core Technologies

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom animations and glassmorphism effects.
- **Database**: 
  - **Relational**: PostgreSQL (via Prisma) for core application data and NextAuth.
  - **Document**: MongoDB (via Payload CMS) for content-heavy management.
- **Authentication**: NextAuth v5 (Beta) with GitHub OAuth provider.
- **Validation**: Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0
- **PostgreSQL**: Required for the web app.
- **MongoDB**: Required for the CMS package.

### Build and Run Commands

Execute these commands from the root directory:

- **Install Dependencies**: `pnpm install`
- **Development Mode**: `pnpm dev` (Runs all apps and packages in parallel)
- **Build All**: `pnpm build`
- **Linting**: `pnpm lint`
- **Database Operations** (Targeting the web app):
  - Push Schema: `pnpm db:push`
  - Generate Client: `pnpm db:generate`

## Development Conventions

- **Surgical Updates**: Prefer targeted edits to existing files using `replace` rather than rewriting entire files.
- **Type Safety**: Leverage TypeScript's strict typing. Avoid `any` and use Zod for runtime validation.
- **Component Structure**: 
  - Admin components are located in `apps/web/components/admin`.
  - Public UI sections are in `apps/web/components/sections`.
  - Shared utilities are in `apps/web/lib`.
- **Styling**: Adhere to the established Tailwind theme in `apps/web/tailwind.config.ts`. Use the `glass-gradient` and custom animations for consistent UI feel.
- **Database Changes**: Always update the `prisma/schema.prisma` first and run `pnpm db:push` or generate migrations as required.

## Roadmap & TODOs

- [ ] Complete the integration between Payload CMS and the Next.js frontend.
- [ ] Add missing components like `Header` in the admin area.
- [ ] Implement full CRUD for Apps and Categories within the admin dashboard.

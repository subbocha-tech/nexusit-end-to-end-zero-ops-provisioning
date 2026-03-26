# Cloudflare Workers React Starter Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/subbocha-tech/nexusit-end-to-end-zero-ops-provisioning)

A production-ready full-stack application template built on Cloudflare Workers. This template provides a scalable architecture using Durable Objects for stateful entities (Users and ChatBoards), Hono for API routing, and a modern React frontend with TanStack Query, shadcn/ui, and Tailwind CSS. Perfect for real-time apps like chat systems, with built-in indexing for efficient listing and pagination.

## Features

- **Durable Objects Entities**: One DO instance per User or ChatBoard, with automatic indexing for listing/pagination.
- **Real-time Chat**: Create chats, send messages, list users/chats/messages with cursor-based pagination.
- **Type-safe API**: Shared types between frontend and worker, with full CRUD operations.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom design system, dark mode, responsive layout.
- **State Management**: TanStack Query for data fetching/caching/mutations.
- **Error Handling**: Client-side error reporting to worker, global error boundaries.
- **Development Ready**: Hot reload, TypeScript, Vite bundling, Bun scripts.
- **Production Optimized**: Cloudflare assets handling, CORS, logging, health checks.

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects (GlobalDurableObject pattern)
- **Frontend**: React 18, Vite, TanStack Query, React Router, shadcn/ui, Tailwind CSS, Lucide icons
- **Utilities**: Zod (validation-ready), Immer, Framer Motion, Sonner (toasts)
- **Dev Tools**: Bun, TypeScript 5, ESLint, Wrangler
- **Styling**: Tailwind CSS (New York style), CSS variables, animations

## Quick Start

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Run Development Server**
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

3. **Build for Production**
   ```bash
   bun build
   ```

## Local Development

- **API Endpoints** (available at `/api/*`):
  - `GET /api/users` - List users (supports `?cursor` & `?limit`)
  - `POST /api/users` - Create user `{ name: string }`
  - `GET /api/chats` - List chats
  - `POST /api/chats` - Create chat `{ title: string }`
  - `GET /api/chats/:chatId/messages` - List messages
  - `POST /api/chats/:chatId/messages` - Send `{ userId: string, text: string }`
  - Delete endpoints for single/batch operations.

- **Frontend Customization**:
  - Edit `src/pages/HomePage.tsx` for your app's homepage.
  - Use `src/lib/api-client.ts` for API calls: `api<User[]>('/api/users')`.
  - Components in `src/components/ui/` (shadcn), hooks in `src/hooks/`.
  - Layouts: `AppLayout.tsx` includes optional sidebar.

- **Worker Customization**:
  - Add routes in `worker/user-routes.ts`.
  - Extend entities in `worker/entities.ts` using `IndexedEntity`.
  - Core utils in `worker/core-utils.ts` (do not modify).

- **Type Generation**:
  ```bash
  bun cf-typegen
  ```

- **Linting**:
  ```bash
  bun lint
  ```

## Deployment

Deploy to Cloudflare Workers with a single command:

```bash
bun deploy
```

This builds the frontend assets, bundles the worker, and deploys via Wrangler. Your app will be served globally with zero-cold-start latency.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/subbocha-tech/nexusit-end-to-end-zero-ops-provisioning)

Configure `wrangler.jsonc` for custom bindings/migrations if needed. Assets are automatically handled as a SPA.

## Architecture Overview

```
Cloudflare Workers (Hono API)
├── GlobalDurableObject (shared storage)
├── Indexes (prefix listing)
├── Entities: UserEntity, ChatBoardEntity
└── Routes: user-routes.ts

Static Assets (Vite/React)
├── TanStack Query ↔ API
├── shadcn/ui + Tailwind
└── Error Boundaries + Theme
```

## Shared Types

Types in `shared/types.ts` ensure frontend-worker consistency:
- `User`, `Chat`, `ChatMessage`, `ApiResponse<T>`.

## Seed Data

Mock data auto-seeds on first API call (`ensureSeed`). Customize in `shared/mock-data.ts` and `worker/entities.ts`.

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. `bun install && bun dev`.
4. Commit changes.
5. Open PR.

## License

MIT License. See [LICENSE](LICENSE) for details.
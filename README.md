# Hablytics

Hablytics reads the work someone actually produces (commits, pull requests, and eventually docs, messages, and other work artifacts) and uses AI to generate a personalized report on their workplace skills: what they are strong in, where the gaps are, and a concrete plan to close them.

It is built for college students through early career professionals. Users connect read only access to tools they already use, and Hablytics turns that activity into a report with four sections: a summary of current work patterns, hidden wins worth putting on a resume or in a review, growth opportunities split across technical, strategic, and soft skill categories, and networking targets already showing up in the data.

## Product tiers

- Free: connect one source, get a one time skill snapshot.
- Tracking ($12/month): full source access, weekly tracking reports, ongoing 30 day improvement plans.
- Benchmark ($15/month): everything in Tracking, plus peer benchmarking against others targeting similar roles.

## Tech stack

**Backend**
- Node.js (ESM), TypeScript
- Express 5
- Prisma 7 with PostgreSQL, using the `pg` driver and `@prisma/adapter-pg`
- JWT authentication (`jsonwebtoken`) with bcrypt password hashing
- Zod for request validation
- `express-rate-limit` for rate limiting
- Anthropic SDK for AI report generation (Claude)
- Octokit for the GitHub integration
- `@slack/web-api` for the Slack integration
- `tsx` for local development

**Frontend**
- Vite, React 19, TypeScript
- Tailwind CSS v4
- React Router

**Database and infrastructure**
- PostgreSQL, hosted on Supabase

## Project structure

```
backend/
  prisma/            schema and migrations
  src/
    config/           Prisma, Anthropic, Supabase, Slack, Stripe client setup
    controllers/       request handlers
    middleware/         auth, plan gating, rate limiting
    routes/            route definitions
    schemas/           zod validation schemas
    services/          external integrations (GitHub, Slack) and the AI pipeline
frontend/
  src/
    components/        shared UI and layout components
    pages/              route level pages, split into marketing and app
    lib/                small helpers and static config
    types/              shared TypeScript types
```

## Getting started

Requires Node 22 or later.

### Backend

```
cd backend
npm install
npx prisma generate
npm run dev
```

The dev server runs on the port set by `PORT` in `.env` and restarts automatically on file changes.

### Frontend

```
cd frontend
npm install
npm run dev
```

## Environment variables

Create a `.env` file in `backend/` with the following. None of these are committed to the repository.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string used at runtime |
| `DIRECT_URL` | Direct, non pooled Postgres connection used by Prisma for migrations |
| `JWT_SECRET` | Signs and verifies auth tokens |
| `PORT` | Port the Express server listens on |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app credentials, for the GitHub integration |
| `ANTHROPIC_API_KEY` | Claude API key, used to generate reports |
| `SLACK_TOKEN` | Slack API token, for the Slack integration |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | Supabase project credentials |

## API overview

All routes are prefixed with `/api`. Routes marked "auth" require a `Bearer` token from `/auth/login`.

**auth**
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/forgotpassword`
- `PUT /auth/resetpassword`

**users** (auth required)
- `GET /users/getuser/:id`
- `PUT /users/updateuser/:id`
- `DELETE /users/deleteuser/:id`
- `GET /users/:id/connections`
- `GET /users/:id/reports`

**workspaces** (auth required)
- `POST /workspaces/getReport`, runs the scan and generates a report

**reports** (auth required)
- `GET /reports`
- `GET /reports/:id`
- `DELETE /reports/:id`

**integrations**
- `GET /integrations/github/redirect` (auth required)
- `GET /integrations/github/callback`, public, called by GitHub

**audits** (auth required)
- `GET /audits/users/:id`
- `POST /audits/`
- `GET /audits/:id`

## Current status

This project is in active development. As of now:

- Auth, GitHub OAuth, AI report generation, and report management work end to end when called directly.
- The frontend UI is built for every planned screen but is not yet wired to the backend. There are no network calls from the frontend yet, and CORS is not configured on the backend.
- Disconnecting a connected source is not implemented yet.
- The 30 day plan and peer benchmarking features have no backend support yet.
- Billing is not implemented yet. A plan gating middleware exists but is not attached to any route.
- Slack integration fetches account data but does not yet read message content.

## Scripts

**backend**
- `npm run dev`, starts the API with automatic restarts
- `npx prisma generate`, regenerates the Prisma client after a fresh install or a schema change

**frontend**
- `npm run dev`, starts the Vite dev server
- `npm run build`, type checks and builds for production
- `npm run preview`, previews the production build locally

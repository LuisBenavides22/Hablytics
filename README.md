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

**integrations** (auth required except the callback)
- `GET /integrations`, lists the current user's connected sources
- `GET /integrations/github/redirect`
- `GET /integrations/github/callback`, public, called by GitHub
- `DELETE /integrations/deleteConnections`, disconnects a source

**audits** (auth required)
- `GET /audits/users/:id`
- `POST /audits/`
- `GET /audits/:id`

## Current status

This project is in active development. As of now:

- The GitHub flow works end to end, frontend included: connect via OAuth, list and disconnect sources, run a scan, and read the generated report.
- The rest of the frontend UI is built for every planned screen but is not yet wired to the backend beyond the GitHub flow above (Dashboard's stat tiles still show static data).
- The 30 day plan and peer benchmarking features have no backend support yet.
- Billing is not implemented yet. A plan gating middleware exists but is not attached to any route.
- Slack integration fetches account data but does not yet read message content.
- Caching with Redis is planned but not implemented yet.

## Backlog

- Move the JWT off the frontend. It currently lives in `localStorage`, which is readable by any JS on the page. Switch to an httpOnly cookie set by the backend: `authController` sets the cookie on login/signup instead of returning the token in the response body, `authenticate` reads it from `req.cookies`, and new `GET /auth/me` and `POST /auth/logout` endpoints replace the frontend's local read/clear of the token. The frontend drops `localStorage` and the manual `Authorization` header in favor of `credentials: 'include'` on every request. This also lets `GET /integrations/github/redirect` go back to a plain `res.redirect` instead of returning the URL as JSON for the frontend to navigate to manually, since a same-site cookie rides along on a normal browser navigation.

## Scripts

**backend**
- `npm run dev`, starts the API with automatic restarts
- `npx prisma generate`, regenerates the Prisma client after a fresh install or a schema change

**frontend**
- `npm run dev`, starts the Vite dev server
- `npm run build`, type checks and builds for production
- `npm run preview`, previews the production build locally

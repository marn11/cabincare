# CabinCare-Manager

CabinCare is a full-stack technical assessment project for tracking cabins and their maintenance tasks. Frontend is Next.js; backend is NestJS with PostgreSQL, all runnable via Docker.

## Quick start
1. Bootstrap everything with Docker (frontend + backend + Postgres): `./setup.sh` then `docker compose up --build`.
2. Open frontend: go to `http://localhost:3000`.
3. Backend will be running on `http://localhost:3001`.

## API (backend, NestJS)
- `POST /cabins` (multipart: name, location, image?): create cabin.
- `GET /cabins`: list cabins.
- `GET /cabins/:id`: get cabin by id.
- `PUT /cabins/:id` (multipart optional image, name, location): update cabin.
- `POST /tasks` (json: description, priority, status, cabin_id): create task for a cabin.
- `GET /tasks/:id`: list tasks for cabin `id`.
- `PUT /tasks/:id` (json: { status }): update task status.

## Architecture
- **Frontend**: Next.js app (App Router) served on port 3000, hits backend via `NEXT_PUBLIC_BACKEND_URL`.
- **Backend**: NestJS REST API on port 3001 exposing cabin and task endpoints.
- **Database**: PostgreSQL container with uploads persisted to `backend/uploads/` for images.
- **Docker**: `docker-compose.yml` orchestrates API + DB; frontend runs locally against the API.

## Design decisions
- Tasks are fetched per-cabin via `GET /tasks/:id` to keep dashboard queries scoped and simple (no aggregate join needed for the main view).
- Cabin create/update accepts multipart uploads so images can be stored on disk quickly without adding object storage complexity.
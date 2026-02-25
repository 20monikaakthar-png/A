# Mushfiqur OS

Mushfiqur OS is a monorepo for a web-based desktop experience with a dedicated backend API, infrastructure assets, and core documentation.

## Repository Layout

- `frontend/`: web desktop UI service
- `backend/`: API, authentication, and session management service
- `infra/`: Docker, reverse proxy, and deployment assets
- `docs/`: architecture, API, and threat model documents

## Local Development

### Prerequisites

- Node.js 20+
- npm 9+

### Install dependencies

```bash
npm install
```

### Start frontend + backend together

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Service Boundaries

- **frontend**
  - Renders the desktop-like web UI
  - Calls backend APIs over HTTP
  - Contains no privileged secret material
- **backend**
  - Owns authentication checks
  - Issues and validates session tokens
  - Exposes application APIs and health endpoints
- **infra**
  - Encapsulates runtime topology (containers + reverse proxy)
  - Handles edge routing from `/` to frontend and `/api` to backend
- **docs**
  - Captures architecture decisions and security posture

## Security Assumptions and Limitations

- Current auth/session handling is intentionally minimal for local development.
- Session state is in-memory and not suitable for multi-instance production deployments.
- Passwords are demo-only and not hashed; replace with a secure identity provider before production use.
- TLS is expected to terminate at an external edge/load balancer in production.
- CSRF, rate limiting, and stronger audit logging are not fully implemented in this starter scaffold.

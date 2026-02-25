# Architecture Overview

Mushfiqur OS is organized as a simple monorepo with clear service boundaries:

- Frontend: desktop-style web interface.
- Backend: API + auth + in-memory session state.
- Infra: containerized local runtime with reverse proxy.

## Request Flow

1. User reaches nginx proxy.
2. `/` routes to frontend.
3. `/api/*` routes to backend.
4. Backend validates auth token for protected session endpoint.

# API Reference

## Health
- `GET /health`
  - Returns backend health status.

## Auth
- `POST /api/auth/login`
  - Body: `{ "username": "admin", "password": "admin123" }`
  - Response: `{ "token": "<uuid>" }`

- `POST /api/auth/logout`
  - Header: `Authorization: Bearer <token>` (optional)
  - Response: `{ "message": "Logged out" }`

## Session
- `GET /api/session`
  - Header: `Authorization: Bearer <token>`
  - Response: `{ "session": { ... } }`

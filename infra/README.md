# Infrastructure

- `docker-compose.yml`: local container topology for frontend, backend, and nginx reverse proxy.
- `nginx/default.conf`: reverse proxy config routing:
  - `/` -> frontend
  - `/api` -> backend

Run from this directory:

```bash
docker compose up --build
```

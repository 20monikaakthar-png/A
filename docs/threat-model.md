# Threat Model (Initial)

## Assets
- Session tokens
- User credentials
- API availability

## Trust Boundaries
- Browser to reverse proxy
- Reverse proxy to backend
- Frontend to backend API calls

## Risks / Gaps
- Demo credentials in code
- In-memory sessions (no persistence/revocation strategy)
- No brute-force protection
- No CSRF mitigation on state-changing endpoints
- No end-to-end TLS in local compose

## Mitigations Planned
- Replace static credentials with external IdP
- Add persistent session store (e.g., Redis)
- Add rate limiting + login lockout
- Add CSRF protections/cookie hardening where applicable
- Enforce TLS and security headers at edge

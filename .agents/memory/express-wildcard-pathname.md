---
name: Express wildcard pathname
description: Preserving the original route when a wildcard middleware renders route-specific fallback HTML.
---

In a wildcard `app.use` fallback, derive route-specific rendering decisions from the pathname in `req.originalUrl`, not from `req.path`.

**Why:** Express can strip the mounted wildcard path while the middleware runs, making `req.path` appear as `/` and silently disabling route-specific HTML transformations in production.

**How to apply:** When a catch-all middleware serves an SPA document or other route-aware fallback, parse `req.originalUrl` against a local base URL and pass its pathname to the renderer.
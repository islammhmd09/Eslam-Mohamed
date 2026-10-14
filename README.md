# Personal brand site — Next.js + Supabase

## Architecture (layers, top to bottom)
| Layer | Where | Responsibility |
|---|---|---|
| Config (single source of truth) | `config/` | Sections, fields, upload rules |
| Presentation | `app/page.js`, `components/` | Public site + admin UI (view registry, generic form) |
| API (thin) | `app/api/` | Auth + parse request + call a service, via `route()` wrapper |
| Service | `lib/content-service.js` | Business rules: validate, save, clean up files, refresh site |
| Repository | `lib/repository.js` | Only code that talks to the database |
| Infrastructure | `lib/supabase/`, `lib/storage.js`, `lib/auth/` | DB client, file storage, sessions |

Patterns: schema-driven UI, repository, service layer, view registry (open/closed), higher-order route handler, signed direct uploads.

## Add a new section (e.g. "Projects")
Add ONE object to `config/sections.js`. The admin form, validation, file cleanup and public page all appear automatically.

## Security model
- `/admin` + `/api/admin/*` blocked by middleware AND re-checked inside every API handler.
- Table has RLS enabled with no policies; only the server's service-role key can touch it.
- Service-role key is server-only (`server-only` import guard).
- Uploads: type + size validated server-side, enforced again by the Supabase bucket.

## 20 prompts with explanations to finish the website

1) "Audit the repo and list all Firebase references to remove or replace."
   - Explain: Identify all imports, env vars, config files, and SDK calls; produce a checklist with file paths and suggested replacements.

2) "Propose a final $0/free stack (Next.js API, DB, auth, storage) for this project."
   - Explain: Recommend concrete services (e.g., Neon + Prisma + NextAuth + R2), why they fit, and required env vars.

3) "Create a migration plan to move data and auth from Firebase to the new stack."
   - Explain: Outline export/import steps, mapping of collections to tables, password handling, and cutover plan.

4) "Design the Prisma schema for users, devices, uploads, and events."
   - Explain: Provide a full schema with relations, indexes, and enums tailored for dashcam media.

5) "Generate Prisma migrations and instructions to apply them locally and in prod."
   - Explain: Include CLI commands, seeding strategy, and rollback notes.

6) "Set up NextAuth (Credentials) with bcrypt, sessions, and protected routes."
   - Explain: Show files to add/edit, session strategy (JWT vs DB), and middleware for route protection.

7) "Create auth API routes: register, login, logout, current session endpoint."
   - Explain: Define request/response shapes, validation with Zod, and error handling patterns.

8) "Add CRUD API for devices, uploads, and tags with input validation and pagination."
   - Explain: Provide route structures, query params for filter/sort, and pagination model.

9) "Set up storage (e.g., Cloudflare R2) and a signed-upload route for large files."
   - Explain: Show envs, IAM scope, signer code, and front-end upload flow (direct-to-storage).

10) "Build the upload UI with chunking/resume, progress bar, and retry logic."
    - Explain: Recommend a library or approach, max sizes, and UX for failures/timeouts.

11) "Create a media gallery (grid/list) with search, filters (date, device), and sorting."
    - Explain: Provide component structure, server queries, and empty/loading states.

12) "Add a video player page with thumbnails, keyboard shortcuts, and metadata display."
    - Explain: Choose player library, thumbnail generation plan, and accessibility shortcuts.

13) "Replace Firebase calls in the UI with fetch to our API routes (by file)."
    - Explain: List affected files and exact edits, ensuring no leftover Firebase imports or envs.

14) "Implement authorization and role checks (e.g., owner/admin) across API routes."
    - Explain: Define roles, middleware/guards, and test cases for access control.

15) "Add SEO: metadata per page, OpenGraph/Twitter tags, sitemap, robots, canonical URLs."
    - Explain: Provide code snippets and where to add them in the Next.js app.

16) "Integrate analytics (Plausible/Umami) and error monitoring (Sentry) safely."
    - Explain: Include minimal setup, production-only flags, and privacy notes.

17) "Harden security: validation, security headers, file type/size checks, and rate limiting."
    - Explain: Specify middleware and recommended defaults for each layer.

18) "Remove demo data, sample media, test accounts, and obsolete config/env vars."
    - Explain: Provide a targeted deletion list, DB cleanup queries, and storage purge steps.

19) "Run Lighthouse and fix performance, a11y, best-practices, and SEO action items."
    - Explain: Report scores, list issues, and propose exact fixes with priorities.

20) "Prepare production deploy: env vars, domain, redirects, cron jobs, backups."
    - Explain: Produce a deploy checklist, env matrix (dev/prod), and runbook for rollbacks.



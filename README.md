# Auto Bazaar Finds

A Next.js vehicle brokerage and sourcing platform backed by Supabase. It includes public inventory browsing, individual vehicle pages, Auto Bazaar Finds contact actions, seller intake, and a protected inventory administration area.

## Local setup

1. Install dependencies with `npm install`.
2. Create a Supabase project.
3. Run every SQL file in `supabase/migrations` in filename order in the Supabase SQL editor.
4. Copy the project URL and anonymous key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

5. In Supabase Authentication, create the administrator user.
6. Run the administrator assignment statement at the bottom of the migration, replacing the example email.
7. Start the app with `npm run dev`, then visit `/admin-login`.

## Verification

```bash
npm run lint
npm run build
```

## Main routes

- `/cars` — live public inventory
- `/cars/[id]` — vehicle details
- `/saved` and `/compare` — temporarily redirect to `/cars`
- `/sell` — seller information and WhatsApp intake
- `/source` — buyer vehicle-sourcing request
- `/admin-login` — administrator login
- `/admin` — protected dashboard and inventory management

Public pages read restricted views containing only safe listing fields. Owner contact, registration, and VIN data remain admin-only. Vehicle photos use expiring signed URLs. Database and Storage write access require a Supabase user whose `app_metadata.role` is `admin`.

# Diu Tourism

React + Express + Supabase (Postgres) tourism site for Diu, with a RAG-powered
chatbot (Claude + pgvector) and Supabase Auth (including working Google login).

## ⚠️ Before you do anything else: rotate two credentials

Your original project had two real secrets hardcoded directly in source:

1. **MySQL password** (`4268Mysql*` / `reus11rocks` / `123456`, spread across
   `db.js`, `routes/db.js`, `server.js`, `routes/google_auth.js`) — moot once
   you're on Supabase, but if this repo has ever been pushed to git (even
   privately), that password is in the history.
2. **A live Gmail app password** (`routes/send_email.js`) for
   `diutourismproject@gmail.com`. This one matters regardless of git history —
   it's a real, working credential. Go to your Google Account → Security →
   App Passwords, revoke it, and generate a fresh one for `EMAIL_APP_PASSWORD`
   below.

Also: the original `.gitignore` only ignored `.env.local` etc., **not `.env`
itself** — so if you ever ran `git add .` without checking, your `.env` may
already be committed. Check `git log --all --full-history -- .env` in your
old repo, and if it shows up, treat every value in it as compromised.

## What changed, structurally

```
DiuTourismUpdated/
├── client/            React frontend (Create React App — unchanged from
│                       your original build tool)
├── server/             Express backend, rebuilt on Supabase
├── render.yaml         Backend deploy config (Render)
└── vercel.json         Frontend deploy config (Vercel)
```

### Auth: from custom MySQL sessions to Supabase Auth

The old app had three auth paths, of which only one and a half worked:
custom email/password login (working, but plaintext passwords), a matching
admin login, and Google OAuth (**not actually wired in** — `google_auth.js`
was an orphaned boilerplate file with its own Express app and port that
`server.js` never imported).

Now: **Supabase Auth handles all of it.** The frontend calls
`supabase.auth.signInWithPassword()`, `signUp()`, and
`signInWithOAuth({ provider: 'google' })` directly
(`client/src/services/supabaseClient.js`). Every request to Express carries
the resulting JWT in an `Authorization: Bearer` header
(`client/src/services/api.js` attaches it automatically), and Express
verifies it in `server/middleware/auth.js`.

**Admin is no longer a separate login** — it's a flag on your Supabase
profile (`profiles.is_admin`). After your first real signup, promote yourself
in the Supabase SQL Editor:
```sql
update profiles set is_admin = true where id =
  (select id from auth.users where email = 'your-email@example.com');
```

### Database: from per-user/per-place MySQL tables to consolidated Postgres

Two anti-patterns from the original app are gone:

- **Event planner**: used to create a new `event_plan_<username>` MySQL
  table on every signup. Now one `event_plan_items` table, filtered by
  `user_id`. A Postgres trigger (`handle_new_user()` in `db/schema.sql`)
  seeds every new user's 12 default activities automatically — no more
  per-user schema changes at runtime.
- **Feedback**: used to create `<place>_feedback` / `<place>_replies` tables
  per attraction (`nagoa_feedback`, `chakratirth_replies`, etc.). Now one
  `feedback` and one `replies` table, filtered by a `place` column.

Every admin-editable table (`local_buses`, `state_buses`, `rickshaw`,
`contactus`, `public_toilets`) also got a real `id` primary key — several
had none before, which made deleting a specific row unreliable.

### Flights — new, admin-managed (not auto-fetched)

`Flights.js` was entirely commented out in your original app. It's rebuilt
now, following the exact same admin add/remove pattern your `StateBuses.js`
already used. This is admin-entered data, not pulled from the internet —
there's no free, reliable API covering Diu-specific flight routes (or
Gujarat state bus routes, for that matter). If you later find a paid
aviation API that actually covers your routes, `server/routes/transport.js`
and `server/routes/admin_activity.js` are where you'd wire it in.

### RAG chatbot

`server/services/embeddingService.js` (OpenAI embeddings) →
`retrievalService.js` (pgvector similarity search via the `match_knowledge()`
Postgres function) → `chatbotService.js` (Claude, grounded in whatever was
retrieved). Run `npm run seed:embeddings` in `server/` any time your
restaurants/hotels/buses/flights/toilets data changes, to keep the chatbot's
knowledge current.

## Other bugs fixed along the way

- `admin_activity.js` defined the contact form's submit route as
  `POST /contactUs` (capital U), but `ContactUs.js` on the frontend called
  `/admin_activity/contactus` (lowercase) — Express routes are
  case-sensitive, so the contact form silently 404'd on every submit.
- `admin_activity.js`'s `addFlight` inserted into a column called `airline`,
  which doesn't exist on the `flights` table (it's `flight_name`) — would
  have failed every time.
- `admin.js` inserted into a `password` column that doesn't exist on the
  `admin` table (it's `admin_password`).
- `hotel.js`'s POST handler inserted hotel form data into the `flights`
  table (copy-paste leftover) — dropped, since it wasn't called by the
  frontend anyway (hotel admin add/remove already went through
  `admin_activity.js` correctly).
- `Restaurants.js`'s add-restaurant form collected `openTime`/`closeTime`
  but the initial state never declared them and the backend expected
  `open_time`/`close_time` — hours silently never saved. Fixed to match.
- `DispNearUtility.js` (nearest public toilet map) read `place.lat`/
  `place.lng`, but is now fixed to match the schema's `latitude`/`longitude`.
- `Navbar.js` fired a trip-reminder email batch job on **every single
  homepage click**, for every visitor. That logic now lives in
  `server/routes/tripReminders.js`, meant to be hit once a day by a
  scheduled job instead.
- `RemoveFeedback.js` / `RemoveReply.js` were standalone admin forms whose
  field names didn't match what the backend expected (likely already
  broken). Retired in favor of the inline "Remove" buttons already on each
  attraction's feedback section, which use the feedback/reply's real `id`.

## Setup

### 1. Supabase project
1. Create a project at supabase.com.
2. SQL Editor → paste and run `server/db/schema.sql` in full.
3. Authentication → Providers → enable Google, add your OAuth client ID/secret
   (same Google Cloud OAuth app your old `google_auth.js` referenced, or a
   fresh one).
4. Authentication → URL Configuration → set your site URL and redirect URLs
   (`http://localhost:3000` for dev, your Vercel URL for production).
5. Project Settings → API → copy your Project URL, `anon` key, and
   `service_role` key.

### 2. Backend
```bash
cd server
cp .env.example .env   # fill in Supabase keys, ANTHROPIC_API_KEY,
                        # EMBEDDING_API_KEY, EMAIL_USER, EMAIL_APP_PASSWORD
npm install
npm run seed:embeddings   # populate the chatbot's knowledge base
npm run dev
```

### 3. Frontend
```bash
cd client
cp .env.example .env 2>/dev/null || true   # or edit .env directly
npm install
npm start
```

### 4. First admin
Sign up through the app once, then run the `update profiles set is_admin...`
SQL above with your email.

## Deployment

- **Frontend** → Vercel, root directory `client/` (see `vercel.json`).
- **Backend** → Render, root directory `server/` (see `render.yaml`). Set
  `CORS_ORIGIN` to your deployed frontend URL.
- **Database** → already hosted on Supabase — nothing to deploy.
- **Trip reminders** → `GET /trip-reminders` on your deployed backend needs
  to be hit once a day by a scheduler (Render Cron Job, GitHub Actions
  schedule, or similar) — it's not triggered automatically by anything.

## Old path → new path (for anything not covered above)

| Old | New | Why |
|---|---|---|
| `POST /login`, `POST /signup` | `supabase.auth.signInWithPassword()` / `signUp()` (frontend, no backend route) | Auth moved to Supabase |
| `GET /session`, `GET /login/session` | `useAuth()` from `AuthContext` | Session state now comes from Supabase's client SDK |
| `POST /logout` | `supabase.auth.signOut()` (frontend) | Same |
| `POST /login/update` | `PATCH /profile` | Renamed since `/login` no longer exists as a concept |
| `GET /adminLogin` | redirects to `/login` | Admin is a profile flag now, not a separate login |
| `POST /sendQueryEmail` (fired on every homepage click) | `GET /trip-reminders` (meant for a daily scheduled job) | Original behavior was almost certainly a bug |

Everything else (`/hotel`, `/restaurant`, `/transport/*`, `/msg/*`,
`/admin_activity/*`, `/eventplan`) kept its original path.
#   D i u - T o u r i s m - W e b s i t e  
 
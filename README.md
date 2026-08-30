# Translator Portfolio

A personal portfolio site for a professional translator/interpreter, built with
**Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, an **admin dashboard
backed by Supabase**, and a **Nodemailer**-powered contact form.

Design concept: a translator's world of certified documents, visa stamps and
sealed paperwork — a dark "ink" shell, parchment document cards, a wax-seal
gold accent, a stamp-ink green accent, and an animated interlinear gloss
(source line / translated line) in the hero.

Every piece of content on the public site — profile, stats, services,
languages, experience, certifications, portfolio projects, testimonials — is
editable from `/admin` and goes live **immediately** (no rebuild, no cache to
bust): the homepage is rendered on every request straight from Supabase.

---

## 1. Requirements

- Node.js 20+
- A free [Supabase](https://supabase.com) project
- An SMTP account for sending mail (Gmail with an App Password, or a
  transactional provider like Resend/SendGrid/Mailgun/Postmark)

## 2. Install

```bash
npm install
```

## 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the entire contents of
   [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates
   every table, Row Level Security policy, the `media` storage bucket, and a
   little seed data.
3. Go to **Authentication → Users → Add user** and create yourself an admin
   account (email + password). Anyone who can sign in through Supabase Auth
   can use `/admin` — so only create accounts for people you trust. There's
   no separate "admin" flag; every authenticated user is an admin.
4. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Set up email (Nodemailer)

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in the SMTP block. For Gmail:

1. Turn on 2-Step Verification on the Google account.
2. Create an **App Password**: <https://myaccount.google.com/apppasswords>.
3. Use that 16-character password as `SMTP_PASSWORD` (not your real Gmail
   password).

Any other SMTP provider works the same way — just set `SMTP_HOST`,
`SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`.

If you skip this step, the contact form still saves every message to
Supabase (visible in `/admin/messages`) — it just won't send an email.

## 5. Run it

```bash
npm run dev
```

- Public site: <http://localhost:3000>
- Admin dashboard: <http://localhost:3000/admin> (redirects to `/admin/login`)

Until you connect Supabase, the public site shows rich demo content so it
never looks broken or empty.

## 6. Deploy

Deploy to [Vercel](https://vercel.com) (or any Next.js host):

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the same environment variables from `.env.local` in the Vercel
   project settings.
4. Deploy.

No extra build step is needed for admin edits to appear — the homepage
fetches fresh data from Supabase on every request.

---

## Project structure

```
src/
  app/
    page.tsx                 Public homepage (fetches all content, force-dynamic)
    layout.tsx                Fonts + metadata
    api/contact/route.ts      Contact form endpoint (Zod validation + Nodemailer + Supabase)
    admin/
      login/page.tsx          Sign-in page
      (protected)/            Everything below requires a Supabase session
        layout.tsx             Sidebar shell + server-side auth check
        page.tsx                Dashboard overview (message counts, recent inbox)
        profile/                Edit the single profile record
        stats/                  CRUD: hero stat strip
        services/               CRUD: service cards
        languages/              CRUD: language pairs
        experience/             CRUD: career timeline
        education/              CRUD: academic history
        certifications/         CRUD: credentials
        projects/               CRUD: portfolio case studies
        references/             CRUD: professional references
        messages/               Read/delete contact-form submissions
  components/
    site/                     Public-facing sections (Hero, About, Services, ...)
    admin/                    Admin dashboard building blocks (CrudManager, ImageUploader, ...)
    ui/                       Small shared UI primitives (SectionHeading, CertifiedSeal, ...)
  lib/
    data.ts                   Reads content from Supabase, with demo-content fallback
    mailer.ts                 Nodemailer transport + email templates
    types.ts                  TypeScript types for every content table
    supabase/                 Browser client, server client, middleware session helper
supabase/
  schema.sql                  Tables, RLS policies, storage bucket, seed data
```

## How "instant" admin edits work

- The public homepage (`src/app/page.tsx`) sets `dynamic = "force-dynamic"`
  and `revalidate = 0`, so Next.js never caches it — every visit runs
  `getPortfolioContent()` fresh against Supabase.
- Admin pages write directly to Supabase from the browser
  (`@supabase/supabase-js`), governed by the Row Level Security policies in
  `supabase/schema.sql`: anyone can **read** published content, only a
  signed-in user can **write**.
- Uploaded photos go to a public Supabase Storage bucket called `media`.

## Customizing the design

All design tokens (colors, the ink/paper/seal system) live in
`src/app/globals.css` under `:root` and `@theme inline`. Fonts are set in
`src/app/layout.tsx` (Fraunces for display, IBM Plex Sans for body, IBM Plex
Mono for the small "stamp" labels).

## Notes

- The `messages` table stores every contact-form submission even if the
  outbound email fails to send, so nothing is ever lost.
- The contact form has a hidden honeypot field (`company`) to deter simple
  spam bots.
- `next.config.ts` allows `next/image` to load images from your Supabase
  Storage bucket automatically.

# Eventer — Accessibility Workshop App

A small, static **Events platform** used as the starting point for an accessibility
workshop. It is intentionally built with **many natural accessibility issues** for participants to find and fix.

> There is **no backend**. All data is dummy and stored in `localStorage`, seeded on
> first load.

## Tech stack

- Angular + TypeScript (standalone components)
- Tailwind CSS
- Angular Router
- Jest + jest-axe (accessibility-friendly unit/component testing)

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build       # production build (ng build)
npm run test        # run unit/component tests (jest)
npm run test:watch  # watch mode
```

## Demo accounts

Seeded automatically on first load (also shown on the login screen):

| Role  | Email               | Password   |
| ----- | ------------------- | ---------- |
| Admin | `admin@eventer.app` | `admin123` |
| User  | `demo@eventer.app`  | `demo123`  |

## Resetting the demo data

There is a discreet **`reset`** link in the footer. It wipes `localStorage`
(registrations, session) and reseeds the demo users and events — handy between
workshop runs.

## Pages

- **Register / Login** — account creation and sign-in.
- **Dashboard** — greeting, "My events", and an "Upcoming events" carousel.
- **Events** — filterable card list; each event has a detail page with a Buy Ticket flow.
  Three events fail on payment, one routes to a 404, the rest succeed.
- **Admin — Users** (admin only) — paginated, sortable table with row selection, bulk
  delete and per-user editing.
- **Admin — All events** (admin only) — full event list plus an Add Event form.

## Deploying (for devs during the workshop)

The app is a static SPA. On Netlify/Vercel:

- Build command: `npm run build`
- Publish directory: `dist/accessible-events/browser`
- Add an SPA fallback so client routes resolve, e.g. a `public/_redirects` file
  containing `/* /index.html 200` (Netlify). Files in `public/` are copied to the
  build output root.

## QA bug-log template

Use this format when logging accessibility bugs so results are consistent and comparable
across teams:

```
Title:        <short, specific summary>
Page/flow:    <where it happens>
Priority:     <Critical | High | Medium | Low>
Why priority: <impact on users / who is blocked>
WCAG rule:    <e.g. 1.1.1 Non-text Content, 2.1.1 Keyboard>
Steps:        1. ...
              2. ...
Expected:     <accessible behaviour>
Actual:       <what happens now>
```

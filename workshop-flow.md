# Accessibility Workshop — Flow (≈4h)

## Prerequisites (before the day)

- Everyone reads the accessibility wiki pages for their role (QA / dev).

## Teams

- Pairs of 1 QA + 1 dev. Adjust to teams of 3 if numbers are odd.

## Intro & Demos (~30 min)

1. **Intro (5 min):** what accessibility is, the workshop goal, how the day runs.
2. **App demo (5 min):** quick tour of all pages and main features.
3. **Code demo (10 min):** structure, libraries (Angular / TS / Tailwind / Angular Router), tools, where things live; take questions.
4. **Gabi's tool demo (5 min):** what it is, live demo, why it's useful.
5. **Gabi's linter (brief):** what it is and what it does.

## Setup (~30–40 min)

- **QAs:** test the shared demo link, **keyboard navigation only**. Log proper bugs: priority (with why, who's impacted), broken WCAG rule #, short repro. Ignore functional bugs.
- **Devs:** fork the repo, run locally, deploy the fork to Netlify/Vercel so the team can test fixes; skim the app + code and ask questions.

## Preparation (~30–40 min)

- **Both roles:** run axe DevTools and other browser tools → capture initial score and issues. Rules and tooling will be explained.
- Discuss why accessibility is **both** roles' responsibility.
- **Both roles:** filter the issues list found before and agree on issue priority together — what to fix first and why, how to reason about severity and order.

## Fixing (~1h30)

- **QAs:** continue testing/logging; validate fixes manually and with browser tools.
- **Devs:** fix → deploy → hand to QA to validate → repeat. Add `jest-axe` and write/update unit tests to catch accessibility issues.
- **Both roles:** tackle subjective/ambiguous rules together and agree on the right call for this use case.
- Run Gabi's linter + tool during this time. Support available throughout.

## Final hour (flex)

- Either continue fixing + validating, **or** introduce web screen readers and have teams test/fix screen-reader issues on 1-2 pre-picked pages.
- Avoid overloading the workshop with information - better to split in 2 if that makes sense.

**Total: ~4h**

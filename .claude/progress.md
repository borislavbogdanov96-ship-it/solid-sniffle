# Progress — solid-sniffle

## 2026-09-03 — Multiple budgets with side-by-side comparison

Extended the Budget tab so several budget builds can coexist and be compared.

**Added**
- `budgets` node; every category and expense now carries a `budgetId`.
- Scenario bar: switch budgets, new / duplicate / rename / set-as-main / delete.
- One scenario is the **main plan** (shared via `budgetSettings.mainBudgetId`)
  and is the only one that tracks payments; others render as projections with
  the payment and status fields hidden.
- Duplicate copies categories and expenses, re-pointing each copied expense at
  the copy's own categories; recorded payments are copied only on request.
- Compare view: categories down the side, scenarios across, a Spread column
  showing where the money actually differs, plus Total, vs-budget and
  vs-cheapest footer rows. Scrolls horizontally on mobile.
- Migration adopting pre-scenario budget data into a "Main plan" scenario.

**Verified** — 17/17 scenario checks, 17/17 acceptance checks, 15/15 regression
checks. The scenario suite covers isolation between budgets, duplication
re-pointing, main-plan promotion, the delete guard, comparison arithmetic, and a
simulated upgrade from the previous schema. All against the in-memory Firebase
mock; the live database was never touched.

**Fixed during testing** — creating a scenario rendered the bar with the previous
budget still selected, because the view id was set after the writes that trigger
the re-render.

**Still unverified** — visual styling (the sandbox proxy blocks the Tailwind and
Google Fonts CDNs).

## 2026-09-03 — Budget & Expenses tracker built

Implemented the full Budget spec inside `index.html` as a fourth view alongside
Overview / Tasks / Timeline.

**Added**
- `budgetCategories`, `expenses`, `budgetSettings` nodes under the existing
  Firebase Realtime DB room, each with an `on('value')` listener.
- Eight seed categories written on first load; settings seeded to
  25,000 EUR / EUR / threshold 100 / 51 guests.
- Dashboard: editable total budget and guest count, planned/spent/paid/remaining
  tiles, colour-coded progress bar, over-budget category badges.
- Category rows: inline-editable planned amount, mini progress bar, expand to
  the expenses inside, add-expense and delete-category actions.
- Expense form: fixed vs per-unit pricing toggle with live total preview,
  multi-payment list, auto-derived status, due date, notes, delete.
- `expenseTotal()` / `expensePaid()` as the single shared calculation used by
  both the live preview and every aggregate (spec §5).

**Verified** — 17/17 headless-browser checks pass, covering all 10 acceptance
criteria plus colour bands, dark mode, mobile layout and the
delete-category-moves-expenses-to-Other path. The test runs against an
in-memory Firebase mock so the couple's live database was never written to.

**Not verified** — the sandbox proxy blocks the Tailwind and Google Fonts CDNs,
so visual styling could not be confirmed in a real browser. Behaviour was tested
with a shim covering only the display utilities the logic depends on.

**Next** — Bobby opens the Budget tab against the real Firebase room and confirms
the seed data and layout look right.

# Progress — solid-sniffle

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

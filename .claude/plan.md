# Plan — Budget & Expenses Tracker

Source spec: `budgettrackerspec.en.md` (uploaded 2026-09-03).

## Scope
A new **Budget** tab in the existing wedding tracker (`index.html`) covering:
budget settings, categories with planned amounts, expenses with fixed or
per-unit pricing, multi-payment tracking, and overspend indicators.

## Steps
- [x] [main] Budget CSS tokens and component styles (bars, segmented toggle, dark mode)
- [x] [main] Budget nav tab, section shell, expense + category modals
- [x] [main] Data layer — RTDB refs, seed categories, shared total/paid utilities
- [x] [main] Dashboard + category list rendering
- [x] [main] Expense and category CRUD
- [x] [main] Acceptance-criteria verification in a headless browser
- [x] [main] Multiple budget builds: scenarios, duplication, main plan, comparison
- [ ] [main] Live verification by Bobby against the real Firebase room

## Out of scope (per spec §6)
Multi-currency, Google Sheets import, per-payer breakdown, due-date
notifications, PDF/Excel export.

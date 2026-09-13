# Decisions — Life OS

Append-only, newest first.

---

## 2026-09-13 — Relative-date views use hidden boolean formulas

**Decision.** Every dated database gets `Is today` / `Is this week` / `Is this month` (and Habit days `Last 10 days`) formula properties; views filter on them.
**Why.** The MCP View DSL only accepts fixed ISO dates in FILTER; relative filters would need weekly manual edits.
**Cost.** 1–4 extra properties on Tasks, Goals, Habit days, Transactions, Budgets, Recipes, Trainings. Hidden in views.

## 2026-09-13 — Place property: try `PLACE` in DDL, fall back to manual

**Decision.** Attempt `PLACE` on Trips and Locations at creation. If rejected, user adds the two properties in the UI and the script fills values.
**Why.** PLACE is not in the create-database type list but update-page can write place values, so support is ambiguous.

## 2026-09-13 — Vision board = Galleries with Role "Vision board"

**Decision.** No separate database; a gallery view filtered on Role.
**Why.** Same card shape as albums; keeps the count at 30.

## 2026-09-13 — Continuity lives in `.claude/life-os/`, not the top-level harness

**Decision.** Separate folder plus a session brief at `.claude/agentic-os/session-briefs/life-os.md`. Wedding-tracker files untouched.
**Why.** User instruction: entirely separate project.

## 2026-09-13 — No integration token; build through the Notion MCP connector

**Decision.** MCP create-view / update-view cover the Views API, so no `.env` token is created.
**Why.** Fewer secrets, fewer moving parts. Supersedes the handoff's conditional plan to create a token.

## 2026-09-13 — Recipes "Missing" is a rollup, not a formatted string

**Decision.** `Missing` on Recipes = rollup (show original) of Food storage `Missing name`, which is the item name when Status = Not in stock, else empty. Displays as "Eggs" / "Salmon, Spinach".
**Why.** The Notion API formula validator returned "Type error with formula" for every variant using `filter`/`map`/`current` or operating on a rollup of a formula (4 attempts). The UI editor accepts these, so the "Missing: Eggs" string formula is a 30-second manual step, listed in Phase 5.
**Supersedes.** SCHEMA.md §19 formula.

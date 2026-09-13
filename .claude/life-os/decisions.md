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

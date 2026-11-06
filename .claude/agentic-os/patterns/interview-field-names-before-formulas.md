# Interview for Exact Field Names Before Writing Data Logic

**Type:** process
**Trigger:** About to draft Tableau calculated fields, segment formulas, or warehouse query logic.
**Pattern:** Inferring field names, filter conditions, and identification criteria from context files alone produces wrong logic (e.g. segments built on `BIN + manufacturer` when the real identifier is `program`).
**Guardrail:** Interview the user for exact field names, filter conditions, and per-segment identification criteria **before** drafting any formula. Don't infer from context files alone.
**Seen:** EEA BIN migration Tableau formulas (2026-05-21).

# Resume — Life OS

**Read first.** This is the Notion "Life OS" build (merged rebuild of four
Templation templates). It is NOT the wedding tracker; do not use the top-level
`.claude/resume.md` for this work.

**State.** Capability audit done, schema spec written in `life-os/SCHEMA.md`,
waiting for the user's go on the full property list. Nothing has been created
in Notion yet.

**Tooling.** Notion MCP connector only (no integration token). Confirmed: views
creatable via `create-view`; buttons and database templates are not, and go on
a manual checklist in Phase 5. Views DSL has no relative-date filters, so dated
databases carry hidden `Is today / Is this week / Is this month` formulas.

**When resuming.** Check `progress.tsv` for how many databases exist, then fetch
the "Life OS" parent page (URL in `config.yaml` once created) before creating
anything, so nothing is duplicated.

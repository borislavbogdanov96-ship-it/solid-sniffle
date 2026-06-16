# Late Operational Requirements

**Type:** risk
**Trigger:** A feature is designed end-to-end on the happy path before ops, support, finance, or risk teams are consulted.
**Pattern:** Operational requirements (support tooling, reconciliation, manual-intervention flows, error/dispute handling, monitoring) arrive after the spec is "done," forcing rework or a gap at launch.
**Guardrail:** Before declaring a spec ready, ask the downstream owners what they need: support (how do they see/fix a stuck user?), finance (reconciliation/reporting), risk (limits/alerts), ops (manual overrides). Add an "Operational requirements" section to specs by default.
**Seen:** Generalized from the colleague's harness pattern library + recurring Nexo Card admin-tool needs (rebate tool, limit tracking).

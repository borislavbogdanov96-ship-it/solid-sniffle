# Missing Revert Mechanisms

**Type:** risk
**Trigger:** A change to a live artifact, config, or data — admin config, a published Confluence page, a roadmap, a deployed tool.
**Pattern:** The change has no rollback path. A delete-and-recreate (rather than update-in-place) loses history, embedded content, or state, and there's no clean way back.
**Guardrail:** **Incremental over rebuild** — update in place, never delete-and-recreate a live artifact. Before a live change, confirm there's a revert path (versioning, backup, append-only log). For generated artifacts, edit the *source* and rebuild rather than hand-editing output.
**Seen:** Operating rule in L0 ("incremental updates only"); reinforced by Confluence full-page-update content-loss risk (2026-04-09).

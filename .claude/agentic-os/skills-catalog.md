# Skills Catalog

Index of all active skills. Updated when new skills are built or existing ones change.

---

## Local Skills (.claude/skills/)

### google-apps-script-deploy
- **Trigger:** 'ship this', 'deploy', 'make a shareable link', 'publish the dashboard', 'host this HTML'
- **Loads from business-brain:** No
- **Reads Knowledge Center:** No
- **Hands off to:** — (returns the `/exec` link). Mandatory masking/sharing pre-check before any deploy

### wrap-up
- **Trigger:** Auto-detected session end (confirmed by user)
- **Loads from business-brain:** All files
- **Reads Knowledge Center:** No
- **Hands off to:** —

---

## Plugin Skills

| Plugin | Key Skills |
|---|---|
| superpowers | brainstorming, writing-plans, executing-plans, subagent-driven-development, systematic-debugging |
| skill-creator | skill-creator |
| figma | figma-implement-design, figma-generate-design, figma-use |
| claude-md-management | revise-claude-md, claude-md-improver |
| frontend-design | frontend-design |
| atlassian | search-company-knowledge, spec-to-backlog, triage-issue, generate-status-report |
| slack | summarize-channel, find-discussions, draft-announcement |

---

## PM Pipeline (Slash Command Sequence)

| # | Command | Produces |
|---|---|---|
| 01 | `/optimize-prompt` | Optimized prompt |
| 02 | `/agent-ideate` | Solution concepts |
| 03 | `/agent-idea-refinement` | Refined scope (INTERACTIVE ONLY) |
| 04+05 | `/competitors-research` + `/agent-prd` | Run in parallel |
| 06 | `/agent-design-brief` **or** `/agent-design-next` | Design fork: brief a design team, OR design it yourself (chain below) |
| 07 | `/agent-decision` | Decision doc |
| 08 | `/agent-jira` | JIRA tickets |
| 09 | `/agent-slack-summary` | Slack summary |

Navigator: **`/agent-pm-next`** — infers the current step from `docs/` and recommends the next command.

---

## Design-Craft Chain (Standalone — "design it yourself" mode)

Independent of the PM pipeline; invoke on demand. Mirrors `/agent-pm-next`: state is inferred from the `docs/design/` tree on disk — no state file. One binary completeness gate, no health score. Adapted from the PDOS framework — kept the states discipline, soft chaining, and on-disk navigation; dropped the Python state engine, weighted scoring, and formal ID registries as over-engineering.

| # | Command | Produces (`docs/design/…`) | Notes |
|---|---|---|---|
| — | `/agent-design-next` | (navigator) | Inspects tree, ✅/❌ table, recommends next, holds completeness gate, detects Mode A/B/C |
| 01 | `/agent-journey` | `journeys/` | Future journey + map always; current journey in Mode B/C. Interactive if user/goal unclear |
| 02 | `/agent-ux-spec` | `ux/` | Per-screen spec. Interactive entry point |
| 03 | `/agent-copy` | `copy/` | Per-screen final copy incl. error/empty/success |
| 04 | `/agent-states` | `states/` | The 9-state checklist (highest standalone value) |
| 05 | `/agent-analytics` | `analytics/` | Events / funnels / KPIs (upstream of `tableau-helper`) |
| 06 | (no prototype skill installed) | `prototype/` | **Conditional** — only if the feature has screens; build locally with whatever frontend tooling fits |
| 07 | `google-apps-script-deploy` skill | shareable `/exec` link (recorded in `.claude/deployment.md`) | **Optional, terminal** — ship a prototype snapshot to a shareable link for stakeholder sign-off. NOT part of the completeness gate. Build/iterate locally first; deploy at milestones, not per-iteration |

- **Parallel:** `/agent-copy` + `/agent-states` after UX; `/agent-analytics` alongside once journeys exist.
- **Logs:** each step appends dated bullets to `docs/design/decisions.md` and `assumptions.md` (lightweight, no IDs).
- **Loads from business-brain:** `context.md`, `conventions.md`, glossary.

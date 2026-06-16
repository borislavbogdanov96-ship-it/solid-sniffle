# Skills Catalog

Index of all active skills. Updated when new skills are built or existing ones change.

---

## Local Skills (.claude/skills/)

### admin-panel-prototype
- **Trigger:** 'prototype', 'admin panel mock', 'demo page', 'build a screen for'
- **Loads from business-brain:** `nexo-context.md`, `conventions.md`
- **Reads Knowledge Center:** No
- **Hands off to:** —

### jira-ticket-creator
- **Trigger:** 'create a ticket', 'JIRA ticket', 'file a task', 'write a story', 'BE task', 'FE story'
- **Loads from business-brain:** `team.md`, `conventions.md`
- **Reads Knowledge Center:** No
- **Hands off to:** —

### workflow-architect
- **Trigger:** User wants to design an AI workflow, automation pipeline, or multi-agent system
- **Loads from business-brain:** `nexo-context.md`, `team.md`
- **Reads Knowledge Center:** Yes — for deep product context when designing Nexo Card workflows
- **Hands off to:** —

### c-level-decision-request-standard
- **Trigger:** 'decision needed', 'restructure per the standard', 'I need to escalate', 'write a decision message', 'send to Antoni/Kosta', any decision/approval request
- **Flow:** Interview → Coach → Draft → Deliver (chat + Slack DM)
- **Loads from business-brain:** No
- **Reads Knowledge Center:** No
- **Hands off to:** Slack MCP (sends draft to user's own DM)

### spec-conflict-detector
- **Trigger:** 'review this spec', 'spec pre-flight', 'is this PRD ready', 'check for conflicts', 'before handoff' — any PRD/spec touching money, currency, limits/fees, jurisdiction, KYC tier, or issuer
- **Loads from business-brain:** `glossary.md` + Key Domain Terms
- **Reads Knowledge Center:** Yes — `nexo-card-state-april-2026.md`, `08-limits-fees/`, `01-providers/`, `02-card-modes/`
- **Hands off to:** — (outputs a Conflict Report). Pairs with `patterns/spec-drift.md`, `regulatory-surprises.md`, `vendor-surprises.md`

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
| 06 | `admin-panel-prototype` skill | `prototype/` | **Conditional** — only if the feature has screens |
| 07 | `google-apps-script-deploy` skill | shareable `/exec` link (recorded in `.claude/deployment.md`) | **Optional, terminal** — ship a prototype snapshot to a nexo.com link for stakeholder sign-off. NOT part of the completeness gate. Build/iterate locally first (Preview MCP); deploy at milestones, not per-iteration |

- **Parallel:** `/agent-copy` + `/agent-states` after UX; `/agent-analytics` alongside once journeys exist.
- **Logs:** each step appends dated bullets to `docs/design/decisions.md` and `assumptions.md` (lightweight, no IDs).
- **Loads from business-brain:** `nexo-context.md`, `conventions.md`, glossary. **Design system:** `nexo-design-system` for UX/prototype.

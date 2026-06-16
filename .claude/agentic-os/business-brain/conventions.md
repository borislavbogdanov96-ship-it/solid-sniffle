# Conventions — Delivery & Documentation

This file is a placeholder/template — fill in your own delivery cadence, tracker, and doc
destination. The structural conventions below (folder layout, design-craft chain, session
continuity) are generic and apply regardless of project.

## Delivery Process
<Your cadence — sprints? ad hoc? Tracker: Jira/Linear/Trello/GitHub Issues, project key if any>

## Document & Folder Structure

### Full feature / initiative (PM pipeline):
Create a folder containing the relevant outputs from the PM pipeline (`/optimize-prompt` →
`/agent-pm-next`) — PRD, competitor research, decision doc, etc. as needed. Use `/agent-pm-next`
to track where a run stands.

### Design-craft mode (designing it yourself, not briefing a designer):
Use the standalone design chain via `/agent-design-next`. Outputs live in their own tree, separate
from the PM pipeline's `docs/NN-*` numbering:
```
docs/design/
  journeys/  ux/  copy/  states/  analytics/  prototype/
  decisions.md  assumptions.md
```
Independent of the PM pipeline — at the PM design stage you fork between `/agent-design-brief`
(hand off to a design team) and `/agent-design-next` (do it yourself). State is inferred from the
folder on disk; no state engine.

**Shipping a prototype (optional, terminal):** once a prototype is built and iterated locally, use
the `google-apps-script-deploy` skill to publish a self-contained snapshot to a shareable link for
sign-off/sharing. This is stage 07 of the design-craft chain — **not a build step and not part of
the completeness gate**. Deploy at milestones, not per-iteration.

### After local completion:
<Where you push finished docs, if anywhere — Confluence/Notion/Google Docs space, or just keep local>

## Session Continuity
When executing any plan in a project, maintain a `.claude/` folder at the project root — the **6-file harness**:
- `plan.md` — current agreed plan
- `progress.md` — narrative progress, updated after every completed step
- `progress.tsv` — append-only structured log, one row per session (`date  type  metric  value  status`); never rewritten, only appended — template: `agentic-os/templates/progress.tsv`
- `decisions.md` — append-only decision log, newest first; reversals link to what they supersede
- `config.yaml` — project metadata (channels, stakeholders, vendors) — template: `agentic-os/templates/config.yaml`
- `resume.md` — plain English briefing for the next session

See the full layered model and the Rule of Two in `agentic-os/knowledge-architecture.md`. Full behavior rules in `CLAUDE.md` → Session Continuity.

## Available Skills & Tools

| Task | Use |
|------|-----|
| Write a PRD | `/agent-prd` command |
| PM pipeline navigation | `/agent-pm-next` command |
| Design-craft navigation | `/agent-design-next` command |
| Ship an HTML prototype/dashboard as a link | `google-apps-script-deploy` skill |
| Wrap up a session | `wrap-up` skill (auto-triggered) |

# Conventions — Delivery & Documentation

## Delivery Process
- 2-week sprints, frequent ad hoc work and context switching
- Quarterly planning (looking 2–3 quarters ahead, plans change often)
- JIRA project: **CARD**

## Document & Folder Structure

### Full feature / initiative:
Create a folder containing:
1. **Specs doc** — full details of the feature/initiative (primary engineering handoff doc)
2. **PRD** — use the `/agent-prd` skill template
3. **Competitor research** — include if relevant
4. **Design brief** — include if needed

### Admin tool only:
Create 1 detailed document describing the tool, ready for dev team handoff.

### Design-craft mode (designing it yourself, not briefing a designer):
Use the standalone design chain via `/agent-design-next`. Outputs live in their own tree, separate from the PM pipeline's `docs/NN-*` numbering:
```
docs/design/
  journeys/  ux/  copy/  states/  analytics/  prototype/
  decisions.md  assumptions.md
```
Independent of the PM pipeline — at the PM design stage you fork between `/agent-design-brief` (hand off) and `/agent-design-next` (do it yourself). State is inferred from the folder on disk; no state engine.

**Shipping a prototype (optional, terminal):** once a prototype is built and iterated locally (Preview MCP), use the `google-apps-script-deploy` skill to publish a self-contained snapshot to a shareable nexo.com `/exec` link for stakeholder sign-off. This is stage 07 of the design-craft chain — **not a build step and not part of the completeness gate**. Deploy at milestones, not per-iteration; default to `DOMAIN` (nexo.com) access.

### After local completion:
Push documentation to personal Confluence space: **Borislav Bogdanov**.

## Session Continuity
When executing any plan in a project, maintain a `.claude/` folder at the project root — the **6-file harness**:
- `plan.md` — current agreed plan
- `progress.md` — narrative progress, updated after every completed step
- `progress.tsv` — append-only structured log, one row per session (`date  type  metric  value  status`); never rewritten, only appended — template: `agentic-os/templates/progress.tsv`
- `decisions.md` — append-only decision log, newest first; reversals link to what they supersede
- `config.yaml` — project metadata (Slack channels, stakeholders, vendors, teams) — template: `agentic-os/templates/config.yaml`
- `resume.md` — plain English briefing for the next session

See the full layered model and the Rule of Two in `agentic-os/knowledge-architecture.md`. Full behavior rules in `.claude/CLAUDE.md` → Session Continuity.

## Available Skills & Tools

| Task | Use |
|------|-----|
| Admin panel HTML prototype | `admin-panel-prototype` skill |
| Create JIRA tickets (CARD project) | `jira-ticket-creator` skill |
| Write a PRD | `agent-prd` skill |
| Read/search Confluence | Atlassian MCP tools |
| Query data warehouse | `nexo-ai-bi` MCP → `query_data_warehouse_raw_primary` |
| Slack messages | Always draft for approval first, never send autonomously |
| Wrap up a session | `wrap-up` skill (auto-triggered) |

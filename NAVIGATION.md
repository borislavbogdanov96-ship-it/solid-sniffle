---
last_generated: 2026-06-16
scope: repo root
---

# NAVIGATION.md — solid-sniffle

This repo is two things layered on top of each other:
1. **The product** — a single-file wedding-planning web app (`index.html`).
2. **The Agentic OS** — Borislav's personal, repo-scoped Claude Code configuration (global context, subagents, skills, command pipelines), kept here so it loads identically on web/mobile/desktop.

## 1. Spatial Map

| Path | Purpose |
|---|---|
| `index.html` | The entire product: a single-file (HTML+CSS+JS) wedding task/Gantt tracker. No build step, no bundler — open/deploy as-is. |
| `PRODUCT.md` | Product brief for the app: users (Bobby & Nikol), purpose, brand personality, design principles, accessibility bar. Read before any UI/UX work on `index.html`. |
| `.mcp.json` | Repo-level MCP server config — currently registers `designparser` (design-rule evaluation tool, used by the `impeccable` skill). |
| `skills-lock.json` | Lockfile of externally-sourced skills (github-hashed) installed into `.agents/skills/` — taste/design skill pack from `leonxlnx/taste-skill` and `delphi-ai/animate-skill`. |
| `.agents/skills/` | The actual installed skill content referenced by `skills-lock.json` (design-taste variants, animate, brandkit, image-to-code, etc.) — installed copies, not source of truth (source is the lockfile's `source` field). |
| `.claude/` | Claude Code config root: hooks, settings, agents, commands, skills, and the Agentic OS context tree (see §1a). |
| `.gitignore` | Ignores Python bytecode (`__pycache__/`, `*.pyc`) — from the `ui-ux-pro-max` skill's Python scripts. |
| `.nojekyll` | Empty marker file — disables GitHub Pages' Jekyll processing, implying `index.html` may be served directly via GitHub Pages. |

### 1a. `.claude/` internal map

| Path | Purpose |
|---|---|
| `.claude/agentic-os/agent-behavior.md` | Session-start orientation, proactive-observation rules, wrap-up detection. Read every session per root `CLAUDE.md`. |
| `.claude/agentic-os/business-brain/` | `context.md` (placeholder), `team.md`, `glossary.md` (placeholder), `conventions.md` — personal/product context, loaded on relevance. |
| `.claude/agentic-os/knowledge-architecture.md` | The L0–L3 layered context model + Rule of Two (a fact moves up a layer the 2nd time it's needed elsewhere) + output-routing table. |
| `.claude/agentic-os/learnings.md` | Raw, append-only friction log, newest entry first, written by `wrap-up`. |
| `.claude/agentic-os/patterns/` | Deduplicated failure post-mortems (vendor surprises, spec drift, regulatory surprises, etc.) — a friction graduates here from `learnings.md` on its 2nd occurrence. `patterns/README.md` is the index. |
| `.claude/agentic-os/session-briefs/solid-sniffle.md` | Per-project session brief — narrative state for this project specifically (distinct from `.claude/resume.md`, which is the generic harness file). |
| `.claude/agentic-os/skill-backlog.md` | Candidate skills observed but not yet built. |
| `.claude/agentic-os/skills-catalog.md` | Index of all active skills/commands and what each produces — **the map of the command pipelines** (PM pipeline, design-craft chain, codebase nav). |
| `.claude/agentic-os/templates/` | `config.yaml` / `progress.tsv` templates for the 6-file session-continuity harness (see root `CLAUDE.md` → Session Continuity). |
| `.claude/agents/` | `sub-haiku.md`, `sub-sonnet.md`, `sub-opus.md` — the three model-routing subagent definitions referenced by root `CLAUDE.md`'s routing table. |
| `.claude/commands/` | Slash-command definitions: the PM pipeline (`agent-prd`, `agent-jira`, `agent-decision`, …), the design-craft chain (`agent-journey`, `agent-ux-spec`, `agent-states`, …), and `agent-navigation-map` (this file's generator). |
| `.claude/hooks/post-compaction-context.sh` | `SessionStart` hook (matcher: `compact`) — re-injects project context after a context-window compaction. |
| `.claude/skills/` | Locally-defined skills: `wrap-up` (session-end ritual), `google-apps-script-deploy` (ships an HTML prototype as a shareable Apps Script link), `emil-design-eng`, `impeccable` (large design-critique/live-edit toolkit with its own `scripts/` and `reference/` subtrees), `ui-ux-pro-max` (CSV-backed UI/UX reference data + Python scripts). |
| `.claude/resume.md` | Plain-English next-session briefing — generic harness file, read first when a `.claude/` folder is detected (per `agent-behavior.md`). |
| `.claude/settings.json` | Hook + statusline + MCP server wiring (`designparser`). |
| `.claude/statusline-command.sh` | Statusline script referenced by `settings.json`. |

`.claude/skills/impeccable/` and `.claude/skills/ui-ux-pro-max/` are the two subfolders that clear the "5+ subfolders, real internal structure" bar — see their own structure below rather than a separate file, since each is shallow enough to summarize inline:
- `impeccable/scripts/detector/` — a static-analysis + browser + visual antipattern detector (engines for HTML, regex/text, browser DOM, visual contrast), driven by `scripts/detector/cli/main.mjs`.
- `impeccable/scripts/live/` — a live-editing session system (insert UI, manual-edit tracking, Svelte/SvelteKit adapters, session store) orchestrated by the various `live-*.mjs` entry scripts in `scripts/`.
- `impeccable/reference/` — one markdown file per design-skill verb (`craft.md`, `polish.md`, `audit.md`, `harden.md`, etc.) — the vocabulary the `impeccable` skill operates with.
- `ui-ux-pro-max/data/` — CSV reference tables (colors, typography, layout patterns) plus a `stacks/` subfolder of per-framework CSVs (React, Vue, Svelte, SwiftUI, etc.), queried by `scripts/search.py` / `scripts/core.py`.

## 2. Structured Index

| Thing | Where | Purpose |
|---|---|---|
| App entry point | `index.html` | Whole app: markup, Tailwind CDN + custom CSS tokens, Firebase Realtime DB client, all JS logic — open in a browser to run it. |
| Firebase config/init | `index.html:680-689` | `firebase.initializeApp(...)`, project `bobby-nikol-wedding`, region `europe-west1`. This is where realtime sync to the couple's shared DB is wired. |
| Core render loop | `index.html:render()` ~line 1327 | Re-renders whichever section (overview/list/timeline) is active; called by every state-mutating function. |
| Task state helpers | `index.html` `status()`, `blockingDeps()`, `unlocks()`, `normDeps()` (~lines 806-839) | Dependency-graph logic: computes task status (done/active/blocked/overdue) and what a task blocks/unblocks. |
| Gantt rendering | `index.html` `renderGantt()`, `monthCols()`, `dateToX()` (~lines 1184-1283) | Desktop timeline/Gantt view — date-to-pixel mapping and month-column layout. |
| Mobile timeline | `index.html` `renderTimelineMobile()` ~line 1098 | Mobile-first alternate timeline rendering (per `PRODUCT.md`'s "mobile-first" requirement). |
| Add/Edit/Delete task | `index.html` `openAdd`, `submitAdd`, `openEdit`, `submitEdit`, `deleteTask` (~lines 1474-1515) | CRUD modals for tasks, synced via Firebase. |
| Dark mode | `index.html` `setDarkMode()` ~line 1378 | Manual + system-preference dark mode toggle (per `PRODUCT.md` accessibility section). |
| Product brief | `PRODUCT.md` | Source of truth for design intent — read before touching `index.html`'s UI. |
| Global agent config | `CLAUDE.md` (root) | Loads Agentic OS, communication prefs, model-routing rules, session-continuity harness, anti-hallucination protocol. |
| Session-start behavior | `.claude/agentic-os/agent-behavior.md` | Defines what happens automatically each session (brief read, proactive observation, wrap-up detection). |
| Command pipeline map | `.claude/agentic-os/skills-catalog.md` | The authoritative index of every slash command and skill and what it produces — check here before assuming a capability doesn't exist. |
| Navigation map generator | `.claude/commands/agent-navigation-map.md` | Defines this file's generation process (you're reading its output). |
| Session-end ritual | `.claude/skills/wrap-up/SKILL.md` | What runs at session close: updates `.claude/` harness files, refreshes this NAVIGATION.md (Step 4d) if it exists and files outside `.claude/` changed. |

## 3. Relationships

- **`index.html` ↔ Firebase**: the app is a thin client over a single Firebase Realtime Database (`bobby-nikol-wedding`). All task CRUD writes go straight to Firebase; there is no backend code in this repo — Firebase rules/config live outside the repo (not visible here).
- **`index.html` ↔ Tailwind CDN**: styling is Tailwind loaded from a CDN `<script>` tag plus a `<style>` block of custom CSS variables (oklch color tokens) — no Tailwind config file or build step exists in-repo.
- **`.nojekyll` + root `index.html`**: consistent with deploying this repo directly via GitHub Pages (root-level `index.html`, Jekyll disabled) — not confirmed by any workflow file in-repo, so treat as inferred.
- **`skills-lock.json` → `.agents/skills/`**: the lockfile pins external skill sources/hashes; `.agents/skills/` holds the actual fetched content. If skills seem stale, the lockfile is the source of truth, not the installed files.
- **Root `CLAUDE.md` → `.claude/agentic-os/agent-behavior.md` → rest of `.claude/agentic-os/`**: a strict load chain. `CLAUDE.md` is intentionally thin and defers to `agent-behavior.md` for session-start behavior, which in turn defers to `knowledge-architecture.md`, `business-brain/`, and `patterns/` only when relevant — this is deliberate token economy, not an oversight.
- **`.claude/commands/*` ↔ `.claude/agentic-os/skills-catalog.md`**: commands are the executable half; the catalog is the human-readable map of how they chain (PM pipeline, design-craft chain). When adding/removing a command, the catalog needs a matching update — it is not auto-derived.
- **`.claude/settings.json` ↔ `.mcp.json`**: both declare `designparser` as an MCP server (redundant/overlapping registration — `.mcp.json` is the project-level MCP config, `.claude/settings.json` also lists it under `mcpServers`). Per `.claude/agentic-os/learnings.md` (2026-06-16), this `designparser` entry was the subject of a real merge conflict between branches — treat any future edit to either file's `mcpServers` block as something to double-check against the other.
- **`impeccable` skill ↔ `designparser` MCP**: `impeccable/scripts/lib/design-parser.mjs` is the local-side bridge to the `designparser` MCP server registered in `.mcp.json`/`.claude/settings.json`.

## 4. Domain Knowledge

- **Product domain** (from `PRODUCT.md`): this is a personal tool for a real couple (Bobby & Nikol), wedding date 11 June 2027, Niagara Falls. It is not a generic SaaS template — design anti-references explicitly reject "generic wedding planner" and "SaaS dashboard" aesthetics. Any UI work should re-read `PRODUCT.md`'s five design principles first (calm intelligence, romantic overview/sharp tasks, unambiguous state, purposeful motion, personal-at-every-scale).
- **Why a single HTML file**: no build tooling, no package.json, no node_modules is present for the app itself — this appears to be a deliberate "open and it just works" personal-project choice rather than an oversight. Not explicitly documented as a decision anywhere in-repo; inferred from the absence of any build config.
- **Why two parallel config systems exist** (`.claude/` vs `.agents/`): `.claude/` is Claude Code's native config root (commands, skills, agents, hooks). `.agents/skills/` holds the same *kind* of content but sourced externally via `skills-lock.json` (a separate lockfile-based skill installer, not Claude Code's native skill loading). Both contribute skills available to the assistant; which one "wins" if names collide is not documented in-repo — flag as an open question if it ever matters.
- **The Agentic OS is reused infrastructure, not wedding-app-specific**: per `.claude/agentic-os/learnings.md`, this entire `.claude/agentic-os/` tree was genericized from a previous work context (Nexo Card) for personal reuse — `business-brain/context.md` and `glossary.md` are intentionally placeholders, not missing content. Don't try to "fix" them as if they're broken; they're meant to be filled in over time.
- **`NAVIGATION.md` lifecycle** (per `skills-catalog.md` and `agent-navigation-map.md`): this file is only ever *created* by `/agent-navigation-map` run manually; `wrap-up` Step 4d may *refresh* it automatically at session end but will never create one from scratch. If this file looks stale, either rerun the command or trust that `wrap-up` will catch it at the next session-end where non-`.claude/` files changed.

<!-- Agent protocol: after reading this file, if you're about to act on something it describes,
     spot-check with `ls`/`grep` first. If the file and the filesystem disagree, trust the
     filesystem — this index is generated, not hand-maintained, and may be stale.
     If it cost you 3+ directory hops or 5+ file reads to find something this file should have
     pointed to directly, log it as a friction entry in `.claude/agentic-os/learnings.md` (or
     wherever this project's learnings log lives) so the next regeneration fixes it — see
     `patterns/README.md` for the Rule of Two (a friction that recurs becomes a generalized
     pattern, not just a one-off note). -->

# Knowledge Architecture

How context, memory, and knowledge are layered, where each kind of file lives, and the rule by which knowledge climbs. Borrowed and adapted from a colleague's "Working Harness" field guide (reviewed 2026-06-16).

**Read this when:** deciding where a new fact, rule, file, or convention belongs — or when something feels duplicated across layers.

---

## The 4-Layer Context Model

Context is nested. The top is tiny and loads in every session; each layer below adds specificity only when work is actually happening there. Keep the always-on layer lean — every session pays its token cost.

| Layer | Where | Loaded | Holds |
|---|---|---|---|
| **L0 — Global identity** | `.claude/CLAUDE.md` + `agentic-os/` | Every session, everywhere | Who Borislav is, routing rules, anti-hallucination, the operating rules that never change. Deliberately short. |
| **L1 — Workspace conventions** | `Claude Code Projects/CLAUDE.md` | Sessions started in the workspace root | The zone map, the output-routing table, cross-cutting workspace patterns. |
| **L2 — Zone conventions** | `<Zone>/CLAUDE.md` (e.g. `Analytics/`, `Research/`, `Initiatives/`) | Sessions working in that zone | How that *kind* of work is done locally — folder sub-layout, mandatory provenance, naming. |
| **L3 — Project state** | `<project>/.claude/` (6-file harness) | When working that initiative | The live state of one initiative. See Session Continuity in `CLAUDE.md`. |

**Why it matters:** a single 5,000-line context file would be loaded in full for a one-line question. Layering keeps the always-on part lean and pulls depth in only where the work is. A terse instruction like "proceed" lands correctly because the room is already furnished by the right layers.

---

## The Rule of Two — how knowledge climbs

A fact, rule, or convention **moves up exactly one layer the *second* time it's needed outside its current home.**

- **Move it, don't copy it.** Leave a one-line tombstone behind so the trail is never lost (e.g. `> Moved to L1 routing table — 2026-06-16`).
- Promote **one layer at a time**, not straight to L0.
- This is a deliberate brake on both **duplication** (same fact in three places, drifting) and **premature generalization** (a one-off promoted to a global rule it doesn't deserve).

```
seen once → stays local
   ↓
needed again elsewhere → promote one layer up (+ tombstone)
```

**This is a convention, not a mechanism — nothing enforces it.** When you notice the same fact load from two homes, that's the trigger: promote it then, not "later." The same applies in reverse to the pattern library: a friction logged twice in `learnings.md` earns a generalized entry in `patterns/`.

---

## Output Routing — "where does this file go?"

Authoritative map for the `Claude Code Projects/` workspace. When a session produces a deliverable, route it here before writing so nothing scatters. (A summary copy lives in the workspace-root `CLAUDE.md` so it loads in-session.)

| Deliverable | Zone |
|---|---|
| Campaign/funnel/market analysis, dashboards, data provenance | `Analytics/` |
| PRDs, specs, competitor & vendor research, design briefs | `Research/` |
| A tracked initiative (multi-doc, has a `.claude/` harness) | `Initiatives/` |
| Admin-tool-only handoff docs | `Admin/` |
| Feature specs + feature-scoped admin prototypes | `Features/` |
| Infra / platform / tooling notes | `Infrastructure/` |
| Quarterly / roadmap / cross-initiative planning | `Planning/` |
| Prototypes, mockups, experiments not yet earning a home | `Playground/` |
| Product source-of-truth (read-only canon) | `_knowledge-center/` |
| The Agentic OS itself | `_agentic-os/` (mirror of `.claude/agentic-os/`) |

**Conventions (from the 2026-04-05 restructure):**
- Naming: `lowercase-kebab-case`, no brackets, no dates unless the date is the point.
- Each zone has an `_archive/` — completed work moves there, nothing is deleted.
- Feature folders may contain an `admin/` subfolder for feature-scoped admin prototypes.

---

## Memory & Pattern stores (the part that survives the conversation)

| Store | Where | What |
|---|---|---|
| **Auto-memory** | `.claude/projects/.../memory/` indexed by `MEMORY.md` | One fact per file w/ frontmatter (`type: user\|feedback\|project\|reference\|pattern`). Recalled by the harness. |
| **Learnings log** | `agentic-os/learnings.md` | Chronological per-session "worked well / friction / behavior change", newest first. Added by `wrap-up`. |
| **Pattern library** | `agentic-os/patterns/` | *Generalized* failure post-mortems distilled from repeated learnings — institutional memory that outlives any one project. See `patterns/README.md`. |

**Discipline:** corrections are written down the moment they happen, not at session end. `learnings.md` is the raw stream; `patterns/` is the deduplicated, generalized layer above it (Rule of Two applies — a friction seen twice earns a pattern).

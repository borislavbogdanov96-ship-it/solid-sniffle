# Global Claude Code Context — Borislav Bogdanov

## Agentic OS

The full context for this setup lives in:
`.claude/agentic-os/` (repo-scoped, so it loads in Claude Code on web/mobile too).

**At every session start:** Read `.claude/agentic-os/agent-behavior.md` — it contains session-start orientation, proactive observation rules, and wrap-up detection behavior.

**Business context files (load when relevant):**
- `.claude/agentic-os/business-brain/context.md` — product, role, strategic direction
- `.claude/agentic-os/business-brain/team.md` — team composition and contacts
- `.claude/agentic-os/business-brain/glossary.md` — full domain glossary
- `.claude/agentic-os/business-brain/conventions.md` — delivery process, doc structure, available skills

**Skills catalog:** `.claude/agentic-os/skills-catalog.md`

**Knowledge architecture:** `.claude/agentic-os/knowledge-architecture.md` — the 4-layer context model (L0 global → L1 workspace → L2 zone → L3 project), the **Rule of Two** (a fact moves up one layer the 2nd time it's needed outside its home; move-don't-copy + tombstone), and the output-routing table. Consult when deciding where a new fact/file/rule belongs.

**Pattern library:** `.claude/agentic-os/patterns/` — generalized failure post-mortems (vendor surprises, spec drift, regulatory surprises, tooling traps). Check `patterns/README.md` before repeating a class of task that has bitten before. `learnings.md` is the raw stream; `patterns/` is the deduplicated layer above it.

---

## Communication & Output Preferences

- **Concise and direct.** No fluff, no preamble, no restating what I just said.
- **Format to context.** Use tables when comparing, bullet points for lists, prose only when needed.
- **No unsolicited improvements.** Do only what was asked. Don't refactor, don't add extras.

---

## Model Routing

Three subagents keep the main context clean and route work to the cheapest capable model: `sub-haiku` (Haiku, read-only), `sub-sonnet` (Sonnet), `sub-opus` (Opus). Defined in `.claude/agents/`.

### Route at plan time — the mechanism

Routing decisions are made WHEN THE PLAN IS WRITTEN, not mid-flow. Deciding mid-session never happens — by then momentum and built-up context always win, and the work gets done inline. So: **every `TodoWrite` item carries a route tag in its text**, assigned up front.

```
- [ ] [haiku]  Pull the 3 source pages and extract the headings
- [ ] [sonnet] Draft the spec section
- [ ] [opus]   Audit tracking coverage across the codebase
- [ ] [main]   Create the Jira/Linear ticket  (external write — never delegate)
```

When a step starts, honor its tag: `[haiku]/[sonnet]/[opus]` → spawn that subagent; `[main]` → do it here. If a step has no tag, that's a bug — tag it before starting.

### Pattern triggers — match the verb, don't deliberate

| If the step is… | Route to |
|---|---|
| reading/grepping/listing files, extracting fields or quotes, classifying, formatting into a table/JSON/CSV, translating, summarizing <5pp | `[haiku]` |
| **drafting any doc/spec section, comparison write-up, content rewrite, UX copy, first-pass synthesis from a handful of sources, summary 5–50pp** | `[sonnet]` |
| analyzing a >20pp doc or deep Confluence tree, synthesizing across many sources, multi-file/multi-doc review, or a one-shot prototype from a locked spec | `[opus]` |

The middle tier is the workhorse — most drafting and rewriting belongs on `[sonnet]`, not in main.

### Always `[main]` (never delegate)

- Conversation context already built up here, or active back-and-forth iteration with me.
- Multi-step orchestration where intermediate results shape the next step; decisions about project direction.
- **Any external write** — Jira, Slack, Confluence, or equivalent. Needs my skills, continuity, sign-off.
- Preview verification (`preview_*`) and design-review loops.
- Iterative prototypes/mockups. (A locked-spec one-shot prototype → `[opus]`.)

### Precedence — read in order

1. **Skills win.** Check for a relevant skill BEFORE deciding to delegate. Skills decide *how*; routing only decides *which model* runs an already-scoped chunk. Never skip a skill to delegate.
2. **Anti-hallucination always applies** — to subagents too. They cite sources and return "not available" rather than guess.
3. The **main session is the system of record.** Delegation never updates `.claude/` continuity files or TodoWrite — that stays here.

### Rules

- **Don't up-tier out of caution.** Verbatim extraction and lookups stay on `[haiku]` even when the source is authoritative — careful ≠ Opus. Reserve `[opus]` for genuine multi-file/multi-doc reasoning. If uncertain between two tiers, pick the cheaper.
- Decide delegate-or-handle yourself, don't ask. Pass ALL needed context — subagents can't see this conversation.
- Sanity-check results before presenting; if off, fix or re-delegate (don't spin up verification agents). Keep delegation ONE level deep.

---

## How I Want Claude to Engage

### When exploring / describing a feature:
- **Interview me.** Ask clarifying questions to help refine scope, requirements, and intent.
- Help think it through — don't execute immediately.

### When preparing a handoff to engineering:
- **Surface gaps proactively.** Point out edge cases, open questions, missing requirements before finalizing.

---

## Key Domain Terms

Domain-specific terms live in `.claude/agentic-os/business-brain/glossary.md` — currently a placeholder. Fill it in as terms come up so Claude doesn't have to be re-taught them every session.

---

## Anti-Hallucination Protocol — STRICT

1. **Never make up data, numbers, dates, or facts.** Say "data not available" or "I don't know."
2. **No fabricated estimates.** Do not substitute general knowledge for missing source data.
3. **Cite sources** for all claims. If no source exists, say so explicitly.
4. **Quote first** when analysing documents — extract relevant quotes before reasoning.
5. **Ask for clarification** if a request is ambiguous. Do not guess.
6. **Show reasoning** step-by-step for complex analysis before giving a final answer.
7. **If unsure, say so.** Never hedge with plausible-sounding guesses.

---

## Tool & Connector Resilience

Every MCP connector / external tool call inherits one rule: **on failure → retry 3× with 2s / 5s / 10s backoff, then report.** A flaky API must not silently derail a session. When a tool is genuinely dead, **degrade to a named fallback** rather than guessing or fabricating:

| Dead tool | Fallback |
|---|---|
| Slack MCP | Draft the message for manual send — never invent the channel state |
| Browser (Chrome/Playwright) | `WebFetch` → `curl` (curl is in the `ask` list) |
| Jira MCP / auth missing | Copy-paste-ready ticket content (see `patterns/jira-auth-precheck.md`) |
| Confluence write | Local markdown draft + flag for manual publish |

A dead tool never becomes a reason to fabricate data — anti-hallucination still applies. CLI and desktop app keep **separate MCP registries**; a connector must be added in both to exist in both. (On web/mobile, MCP servers come from the repo's `.mcp.json`; user-level `~/.claude` MCP config does not carry over.)

---

## Session Continuity — Always Apply

When executing any plan in a project, maintain a `.claude/` folder at the project root. The harness is **6 files**:
- `plan.md` — current agreed plan
- `progress.md` — narrative progress, updated after every completed step
- `progress.tsv` — append-only structured log, one row per session: `date  type  metric  value  status` (machine-checkable, never hand-rewritten — only appended)
- `decisions.md` — append-only decision log, newest first; reversals link to what they supersede
- `config.yaml` — project metadata: Slack channels, stakeholders, vendors, teams (see `.claude/agentic-os/templates/config.yaml`)
- `resume.md` — plain English briefing for the next session

Behavior rules:
- Create `.claude/` and the core files before executing the first step. `config.yaml` + `progress.tsv` are templated from `.claude/agentic-os/templates/`.
- Update `progress.md`, `progress.tsv`, and `resume.md` after every completed step — not at the end.
- When the plan changes, log in `decisions.md` first, then update `plan.md`.
- When starting in a project with an existing `.claude/` folder, read `resume.md` first.
- Never re-execute steps already marked complete in `progress.md` / `progress.tsv`.
- Append-only files (`progress.tsv`, `decisions.md`) are never rewritten in place — incremental over rebuild (see `patterns/missing-revert-mechanisms.md`).

---

## Task Tracking — Always On

For ANY task with 2+ steps, you MUST call `TodoWrite` before starting with all planned steps as `pending`. Update each to `in_progress` when starting it, and `completed` when done.

**Every todo item MUST carry a route tag** (`[haiku]` / `[sonnet]` / `[opus]` / `[main]`) — see Model Routing → "Route at plan time." This is the moment routing is decided; an untagged item is incomplete.

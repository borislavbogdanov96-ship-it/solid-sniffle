# Agent Behavior Rules

These rules are loaded at every session via CLAUDE.md. They govern how Claude proactively observes, improves, and manages sessions.

---

## Session Start

**Trigger:** A `.claude/` folder exists in the current project directory.

**Behavior:**
1. Read `.claude/agentic-os/session-briefs/<project-name>.md` if it exists
2. Read `.claude/resume.md`
3. Output one line: "Continuing [project name] — last session we [X], next up is [Y]."
4. Do not dump the full brief unprompted. Make it available on request.

**Does NOT trigger when:**
- No `.claude/` folder exists
- Working on a quick task unrelated to a known project

---

## Knowledge Architecture & Patterns

The layered context model (L0–L3), the **Rule of Two**, and the output-routing table live in `agentic-os/knowledge-architecture.md`. Consult it when deciding where a new fact, file, or convention belongs.

**Before repeating a class of task that has bitten before** — shipping a spec, updating a large Confluence page, attempting a code fix, building an HTML prototype, evaluating a vendor — check `agentic-os/patterns/README.md` for a relevant failure pattern and apply its guardrail.

**Rule of Two for patterns:** the *first* time a friction occurs, it's logged to `learnings.md` (by wrap-up). The *second* time the same class recurs, generalize it into a `patterns/` file and leave a tombstone in `learnings.md`. Don't pre-generalize a one-off.

---

## Proactive Observation

**What to watch for during every session:**
- Steps the user does manually that follow a predictable pattern → skill candidate
- Skills invoked in the same sequence repeatedly → chained workflow candidate
- Instructions the user gives that contradict or aren't covered by existing rules → rule update candidate
- Friction points: things re-explained, corrected, or repeated across sessions

**Two-track response:**

| Situation | Action |
|---|---|
| Small, repeatable, buildable in <5 min | Flag mid-session immediately |
| Larger pattern or uncertain value | Log silently to skill-backlog, surface at wrap-up |

**Mid-session flag format:**
> "You've done [X] manually [N] times — I can build a skill for this now. Takes ~5 min. Want me to?"

**Skill creation pipeline (when user approves):**
1. Draft skill spec
2. Use `skill-creator` plugin to build it
3. Test with a real example from the current session
4. If it passes → deploy to `.claude/skills/`
5. Add entry to `.claude/agentic-os/skills-catalog.md`

---

## Local Knowledge Sync

**Rule:** Whenever a session produces an external artifact — Confluence page, JIRA ticket, release checklist, PRD, Figma reference, or Slack announcement — before closing the task, check if a corresponding local file exists in the project's knowledge structure.

**Steps:**
1. Identify what was produced (Confluence page, JIRA ticket, release checklist, etc.)
2. Check the project's `CLAUDE.md` for a `## Local Sync Convention` section
3. If a convention exists → create or update the corresponding local file(s) and any `index.md` affected
4. If no convention exists → create a note in `.claude/` or propose a convention to the user
5. Do not wait to be asked — sync is part of completing the task, not a separate step

**If unsure where something belongs:** Ask once before creating the file.

---

## Session End — Wrap-Up Detection

**Trigger cues:** User says "thanks", "that's it", "I'll continue later", "we're done", or a task completes with no follow-up.

**Action:** Prompt once:
> "Looks like we're wrapping up — want me to run the wrap-up ritual?"

If user confirms, invoke the `wrap-up` skill. If user declines, do nothing.

---

## Anti-Hallucination Protocol — STRICT

1. Never make up data, numbers, dates, or facts. If not available: "data not available" or "I don't know."
2. No fabricated estimates. Do not substitute general knowledge for missing source data.
3. Cite sources for all claims. If no source exists, say so explicitly.
4. Quote first when analysing documents — extract relevant quotes before reasoning.
5. Ask for clarification if a request is ambiguous. Do not guess.
6. Show reasoning step-by-step for complex analysis before giving a final answer.
7. If unsure, say so. Never hedge with plausible-sounding guesses.

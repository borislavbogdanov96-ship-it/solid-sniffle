---
name: wrap-up
description: "End-of-session ritual that captures learnings, syncs local knowledge files, logs skill opportunities, updates CLAUDE.md if needed, and writes a session brief for next time. Auto-triggered when Claude detects session-end cues (user says 'thanks', 'that's it', 'done for today', or a task completes with no follow-up). Claude prompts the user for confirmation before running."
---

# Wrap-Up Ritual

You run the end-of-session ritual. This is triggered when the user confirms they're done for the session.

## File Paths (always use absolute paths)

- Learnings log: `.claude/agentic-os/learnings.md`
- Skill backlog: `.claude/agentic-os/skill-backlog.md`
- Session briefs: `.claude/agentic-os/session-briefs/<project-name>.md`
- Project resume: `.claude/resume.md` (in current project directory)
- Global CLAUDE.md: `.claude/CLAUDE.md`

## Ritual Sequence

Run these steps in order. Do not skip any.

### Step 1 — Summarize the session

Produce a concise summary:
- What was worked on
- What was completed
- What remains open or unresolved

Present to user as a short bulleted list for confirmation before continuing.

### Step 1b — Routing check (one line)

Look back over the session's `TodoWrite` items and report delegation health in a single line:

> Routing: N of M delegatable steps were delegated (haiku ×_, sonnet ×_, opus ×_). [List any `[haiku]/[sonnet]/[opus]`-tagged step that was done in `[main]` instead.]

"Delegatable" = steps tagged `[haiku]/[sonnet]/[opus]`. Be honest — if a tagged step was handled inline, name it. If the session had no multi-step todo list, write "Routing: n/a (single-step session)." This line is the instrument that tells us whether plan-time tagging is working; do not pad or rationalize a low rate.

### Step 2 — Log learnings

Append to `.claude/agentic-os/learnings.md`:

```
## YYYY-MM-DD — [session topic in 5 words]
- **Worked well:** [what went smoothly — be specific]
- **Friction:** [what caused problems or slowed things down]
- **Behavior change:** [what Claude should do differently next time, if anything]
```

Only add a "Behavior change" line if there's a genuine change. Don't pad with "nothing to change."

### Step 3 — Update CLAUDE.md if needed

Check: did the user correct Claude's behavior during the session? Did any instruction turn out to be wrong or missing?

If yes → update `.claude/CLAUDE.md` directly. Be surgical — change only what needs changing.

If no → skip this step entirely.

### Step 4 — Local Knowledge Sync

This step is mandatory. It ensures that any external artifacts produced during the session have a corresponding local representation.

**4a — Identify external artifacts produced this session:**
Look back at the conversation and list anything created or meaningfully updated in an external system:
- Confluence pages (PRDs, specs, release checklists, proposals)
- JIRA tickets
- Figma files referenced or created
- Slack announcements sent
- Any other external document

**4b — Check for local coverage:**
For each artifact, check whether a corresponding local file was already created or updated during this session.

If the current project has a `## Local Sync Convention` section in its `CLAUDE.md` → use that mapping to determine where files should live.

If no convention exists → use best judgment based on project structure, or propose a simple convention to the user before creating files.

**4c — Fill any gaps:**
For each artifact without a local file:
1. Create the file in the correct folder
2. Mirror the key facts (title, date, overview, links, status) — do not copy verbatim, summarise concisely
3. Update the folder's `index.md` if one exists
4. If the change affects a root-level snapshot/status file for the project, update it too

If there are no gaps → note "Local sync: up to date" and move on. Do not pad.

---

### Step 5 — Board/Tracker Sync (optional)

If the project uses an external board or tracker (Monday, Trello, Linear, etc.) and a sync skill/MCP for it is configured, run it now with the session summary from Step 1 as context.

If no such tool is configured, or no external artifacts were produced this session → note "Board sync: n/a" and move on.

---

### Step 6 — Log skill opportunities

Review the session for patterns that could be automated. For each one, append to `.claude/agentic-os/skill-backlog.md`:

```
## YYYY-MM-DD — [short title]
- **What:** [what the skill would do]
- **Pattern:** [what triggered this idea — be specific about what you observed]
- **Priority:** quick-win / medium / large
- **Status:** pending
```

Only log genuine patterns. If nothing was observed, skip this step.

### Step 7 — Write session brief

Determine the project name from the current working directory or `.claude/` folder name.

Write to BOTH locations:
1. `.claude/agentic-os/session-briefs/<project-name>.md`
2. `.claude/resume.md` (in current project, if `.claude/` folder exists)

Brief format:
```
# Session Brief — [project name]
**Date:** YYYY-MM-DD
**Status:** [one line: what state the project is in]

## Context
[2-3 sentences: what this project is and why it matters]

## Last Session
[What was done, what decisions were made]

## Next Session
[Exactly what to pick up — be specific enough that no re-briefing is needed]

## Open Questions
[Anything unresolved that needs an answer before proceeding]
```

## After the Ritual

Output a one-line confirmation:
> "Wrap-up complete. Brief written to [path]. See you next session."

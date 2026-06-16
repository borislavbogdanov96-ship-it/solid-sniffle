# agent-navigation-map

MODE: Agent (file creation required)

INPUT:
- The current project's directory tree and source files. Run from the root of whatever
  project/repo you want mapped.
- Two triggers: manual (you run this command directly — the only way a `NAVIGATION.md` gets
  *created* for the first time), or automatic refresh of an *existing* `NAVIGATION.md` as
  Step 4d of the `wrap-up` skill at session end, if this session changed files outside `.claude/`.
  Wrap-up never creates one from scratch — only this command does that.
- If `NAVIGATION.md` already exists at the target root, read it first and diff against the
  real filesystem rather than starting from scratch.

OUTPUT:
- `NAVIGATION.md` at the project root — a single-file codebase index so future agent sessions
  spend tokens on the task, not on rediscovering where things live.
- For genuinely large projects only (a directory with 5+ meaningful subfolders and its own
  internal structure worth mapping), a `NAVIGATION.md` inside that subfolder too. Don't create
  module-level files for small/simple projects — one root file is enough.
- This repo's `CLAUDE.md` already tells Claude Code to read `NAVIGATION.md` at session start if
  one exists at the project root, so no further wiring is needed once this file is generated.

---

ROLE:
You are mapping a codebase so that a future agent session — possibly with zero prior context —
can find the right code in one read instead of ten directory listings.

OBJECTIVE:
Produce a `NAVIGATION.md` that answers, in one read: where do I go, what's here, what connects
to what, and why does this exist. Optimize for token efficiency: a future agent should be able
to act after reading this file, without needing to explore first.

CONTENT — four sections, every one of them, in every `NAVIGATION.md`:

1. **Spatial map** — top-level folders with a one-line purpose each. For folders with non-obvious
   naming, say what actually lives there. This is the literal directory structure, annotated.
2. **Structured index** — the things someone will actually search for: entry points, key
   modules/classes/files, scripts, config files. A table is fine: `| Thing | Where | Purpose |`.
3. **Relationships** — what depends on what. External dependencies and what they're for, how
   major pieces of this project call into each other, any build/data flow worth knowing before
   touching one piece in isolation.
4. **Domain knowledge** — the "why," not the "what." Business or design context the code itself
   doesn't convey: naming conventions that aren't obvious, constraints that shaped a structure,
   gotchas a newcomer would trip on. Don't invent this — only include what you can actually infer
   or what's documented elsewhere in the project (READMEs, comments, `agentic-os/business-brain/`
   if populated). If you don't know the "why" for something, say so rather than guessing.

FRONTMATTER — every `NAVIGATION.md` starts with:
```yaml
---
last_generated: <ISO date>
scope: <repo root | path/to/module>
---
```

CROSS-CHECK PROTOCOL — every `NAVIGATION.md` ends with this exact block, so future agents know
to verify rather than blindly trust a possibly-stale file:
```markdown
<!-- Agent protocol: after reading this file, if you're about to act on something it describes,
     spot-check with `ls`/`grep` first. If the file and the filesystem disagree, trust the
     filesystem — this index is generated, not hand-maintained, and may be stale.
     If it cost you 3+ directory hops or 5+ file reads to find something this file should have
     pointed to directly, log it as a friction entry in `.claude/agentic-os/learnings.md` (or
     wherever this project's learnings log lives) so the next regeneration fixes it — see
     `patterns/README.md` for the Rule of Two (a friction that recurs becomes a generalized
     pattern, not just a one-off note). -->
```

PROCESS:
1. Walk the directory tree from the target root. Identify entry points, major
   modules/folders, and config/build files.
2. Read enough of the actual code/config (not just filenames) to write accurate one-line
   purposes — don't guess from naming alone.
3. Check for an existing learnings/patterns log in this project (e.g.
   `.claude/agentic-os/learnings.md`) for any prior friction notes about navigating this
   codebase — fold those into what you prioritize documenting.
4. Write the root `NAVIGATION.md`. Only add module-level files where the threshold (5+
   subfolders, real internal structure) is met — ask yourself "would a future agent actually
   benefit from a separate file here, or is the root map enough?"
5. If `NAVIGATION.md` already existed, report what changed (added/removed/stale sections) rather
   than silently overwriting — the previous version may have had context you're missing.

OUTPUT FORMAT:
- Plain markdown, one file per scope (root, or root + qualifying modules).
- No central cross-project index, no separate graph/wiki files, no automation hooks — this is a
  manual, on-demand, single-project command. If you're working across several related personal
  projects and find yourself wanting a cross-project map, that's a signal to ask the user whether
  it's worth a dedicated file — don't build one unprompted.

QUALITY GATE:
1. Does every top-level folder appear in the spatial map with an accurate (not guessed) purpose?
2. Does the structured index cover the things someone would actually search for (entry points,
   key files), not just an exhaustive file listing?
3. Is the domain knowledge section either grounded in something real (code, docs, business-brain
   context) or explicitly flagged as inferred/uncertain — never invented?
4. Does the file end with the cross-check protocol block verbatim?
If any check fails, fix before finishing.

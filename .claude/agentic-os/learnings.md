# Learnings Log

Chronological, newest first. One entry per session, appended by the `wrap-up` skill.
This is the raw stream; a friction that recurs (Rule of Two) graduates into a generalized
file under `patterns/` with a tombstone left here.

Format:
```
## YYYY-MM-DD — [session topic in 5 words]
- **Worked well:** ...
- **Friction:** ...
- **Behavior change:** ...   (only if there's a genuine change)
```

---

## 2026-06-16 — Adopt Agentic OS, merge to main
- **Worked well:** Incremental adoption with an explicit go-ahead at each stage (genericizing Nexo content, installing the PM pipeline, building `/agent-navigation-map`, wiring wrap-up Step 4d) kept changes reviewable and avoided overreach. PR merge succeeded cleanly once the conflict was resolved.
- **Friction:** Merge conflict on `.claude/settings.json` — `main` had independently added a `designparser` MCP server after the branch diverged. The auto-mode permission classifier blocked writing the merged file because it looked like an unrequested MCP-server addition, even though it was just preserving existing `main` content; required an explicit `AskUserQuestion` to get sign-off before retrying. Also: no `TodoWrite` list was used for this session despite it being clearly multi-step.
- **Behavior change:** Before resolving a settings.json/MCP-server merge conflict, surface the conflicting entries to the user for an explicit decision before attempting the write — a bare "Merge" instruction doesn't implicitly authorize keeping unfamiliar MCP servers. Also: use `TodoWrite` with route tags for any session with 2+ distinct steps, including ops-style sessions (PRs, merges), not just build/design tasks.

<!-- Your entries start here. Empty on a fresh install. -->

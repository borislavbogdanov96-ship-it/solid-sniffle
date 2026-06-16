# Skill Backlog

Candidate skills spotted during sessions (proactive observation). Surfaced at wrap-up,
built with the `skill-creator` plugin when you approve.

Format:
```
## YYYY-MM-DD — [short title]
- **What:** what the skill would do
- **Pattern:** what triggered the idea (be specific)
- **Priority:** quick-win / medium / large
- **Status:** pending
```

---

## 2026-06-16 — Pre-merge conflict pre-check
- **What:** Before attempting `merge_pull_request`, diff the PR branch against the current base branch and flag any conflicting files (especially `.claude/settings.json` / MCP server entries) to the user proactively, instead of discovering the conflict only when the merge API call fails.
- **Pattern:** This session's PR merge failed with a 405 conflict on `.claude/settings.json` because `main` had drifted (a `designparser` MCP server was added there after the branch diverged) — only found out after the failed API call, then needed an extra round-trip to resolve and re-push.
- **Priority:** quick-win
- **Status:** pending

<!-- Empty on a fresh install. -->

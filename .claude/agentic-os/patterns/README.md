# Pattern Library

Generalized failure post-mortems — institutional memory that outlives any one project. This is the **deduplicated layer above `learnings.md`**: `learnings.md` is the raw chronological stream; a friction that recurs (Rule of Two) earns a generalized pattern here.

**Read this at the start of relevant work**, and consult before repeating a class of task that has bitten before (shipping a spec, updating Confluence, attempting a code fix, building an HTML prototype, evaluating a vendor).

**When a session hits friction:** if it's the first time, log it to `learnings.md`. If it's the **second** time the same class of problem appears, generalize it into a pattern file here and leave a tombstone in `learnings.md`.

## Index

| Pattern | Type | One-line guardrail |
|---|---|---|
| [vendor-surprises](vendor-surprises.md) | risk | Verify how the partner actually works before spec'ing against the docs |
| [spec-drift](spec-drift.md) | risk | Pin decisions in `decisions.md`; re-validate the spec when inputs change |
| [regulatory-surprises](regulatory-surprises.md) | risk | Surface jurisdiction / currency / licensing constraints up front |
| [late-operational-requirements](late-operational-requirements.md) | risk | Ask ops/support/finance what they need before, not after, build |
| [missing-revert-mechanisms](missing-revert-mechanisms.md) | risk | Every live change needs a rollback path; update in place, never delete-and-recreate |
| [preview-tooling-blocked](preview-tooling-blocked.md) | tooling | Local HTML → Preview MCP + `npx serve` + root `.claude/launch.json` |
| [innerhtml-blocked](innerhtml-blocked.md) | tooling | Build DOM with `textContent`/`createElement`, never `innerHTML` |
| [verify-repo-access-before-fix](verify-repo-access-before-fix.md) | process | Confirm the target repo is reachable before committing to a fix |
| [confluence-full-page-reread](confluence-full-page-reread.md) | process | Re-read large Confluence pages before pushing a full-body update |
| [interview-field-names-before-formulas](interview-field-names-before-formulas.md) | process | Get exact field names/filters before drafting data/Tableau logic |
| [jira-auth-precheck](jira-auth-precheck.md) | process | Check Jira MCP/auth availability before drafting a ticket |
| [shell-special-chars-in-paths](shell-special-chars-in-paths.md) | tooling | Escape `$ ( ) [ ]` in paths before `mv`/shell ops |

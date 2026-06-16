# Verify Repo Access Before Committing to a Fix

**Type:** process
**Trigger:** Offering or starting to implement a code fix in an external/unfamiliar service's codebase.
**Pattern:** Committing to "I can do this" before checking the repo is reachable — then discovering the target repo isn't in any accessible workspace/org, or the wrong fork/mirror was assumed. The fix was structurally impossible; the round trip was wasted.
**Guardrail:** Before offering/attempting a fix, verify the target repo is actually accessible — identify which workspace/org it lives in and confirm reachability up front. If unreachable, pivot to a well-specified ticket/issue instead of attempting the change.
**Seen:** Generalized from a prior work-context investigation.

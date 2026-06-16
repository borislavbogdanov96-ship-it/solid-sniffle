#!/usr/bin/env bash
# Post-compaction context recovery.
# Fires on SessionStart(matcher=compact). Re-injects the nearest .claude/resume.md
# and recent git activity so long sessions survive compaction (the conversation
# thread is summarized, but the durable project state is pulled back in).
# stdout is added to the model's context by the SessionStart hook.

input="$(cat 2>/dev/null || true)"

# Extract cwd from the hook's stdin JSON; fall back to $PWD.
dir="$(printf '%s' "$input" | sed -n 's/.*"cwd"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)"
[ -z "$dir" ] && dir="$PWD"

# Walk up the tree to the nearest .claude/resume.md
resume=""
d="$dir"
while [ -n "$d" ] && [ "$d" != "/" ]; do
  if [ -f "$d/.claude/resume.md" ]; then resume="$d/.claude/resume.md"; break; fi
  d="$(dirname "$d")"
done

echo "## Post-compaction recovery"
echo
if [ -n "$resume" ]; then
  echo "Re-injecting durable project state from: $resume"
  echo '```markdown'
  cat "$resume" 2>/dev/null || true
  echo '```'
else
  echo "(no .claude/resume.md found at or above $dir — nothing to re-inject)"
fi

# Recent git activity, only if this is a git work tree.
if git -C "$dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo
  echo "### Recent git activity"
  echo '```'
  git -C "$dir" log --oneline -10 2>/dev/null || true
  echo '```'
fi

exit 0

# Escape Shell-Special Characters in Paths

**Type:** tooling
**Trigger:** Running `mv`/`cp`/any shell op on folder or file names that may contain `$ ' ( ) [ ]` (e.g. a folder literally named `$5000` or similar).
**Pattern:** An unescaped `$5000` triggers shell variable expansion and the command fails; brackets/parens/quotes break globbing and quoting.
**Guardrail:** Before shell ops on a path, scan for `$ ' ( ) [ ]` and escape/quote them. Don't assume names are shell-safe. (Prefer dedicated file tools over shell where possible.)
**Seen:** Claude Code Projects restructure (2026-04-05).

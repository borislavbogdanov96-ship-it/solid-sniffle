# innerHTML Blocked by Security Hook

**Type:** tooling
**Trigger:** Writing/generating JS that updates the DOM in an HTML prototype or dashboard.
**Pattern:** A security hook blocks any `Write` containing `innerHTML` — even for static/trusted strings. Each occurrence costs a round trip to restructure.
**Guardrail:** Author DOM updates as `textContent` + `createElement` + `classList` from the start. Never reach for `innerHTML`, even for trusted markup.
**Seen:** 3-prototype suite (2026-06-12) — blocked twice.

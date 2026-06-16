# Preview Tooling Blocked (this machine)

**Type:** tooling
**Trigger:** Need to preview a local HTML prototype/dashboard.
**Pattern:** `file://`, `localhost:<port>`, and bare ports are all blocked by org Chrome policy; `python3 -m http.server --directory` fails with a sandbox PermissionError on the stock macOS Python 3.9. Each dead end burns a round trip.
**Guardrail:** Go straight to the **Preview MCP tool** with `npx serve`, configured via a `.claude/launch.json` at the **project root** (not the subfolder). For multi-page prototypes served by `serve`, resolve sub-page paths via a trailing-slash-tolerant base, not bare relative paths. Verify with DOM-assertion `preview_eval` if screenshots misbehave (1px viewport / blank-band artifacts → explicit `preview_resize`).
**Seen:** Limit-increase prototype (2026-06-12), 3-prototype suite (2026-06-12).

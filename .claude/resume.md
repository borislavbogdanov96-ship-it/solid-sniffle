# Session Brief — solid-sniffle

**Date:** 2026-11-05
**Status:** Invite + RSVP phase 1 built on `claude/nifty-einstein-gvgcxg`. Draft content; not yet tested against the real Firebase DB.

## Context
`solid-sniffle` = the couple's wedding tracker (`index.html`, vanilla + Firebase RTDB) + the Agentic OS config under `.claude/`. Decisions for the invite live in the Claude Doc "Одит Svatbichka + EventLink и tech stack" (https://claude.ai/artifact/6BBqPThw3qZj4v4FDrgZii).

## Latest
- `invite/index.html` — public invite + RSVP; `invite/admin.html` — +1 allow-list, responses, CSV; `invite/name-key.js` — shared name matching.
- Data path: `invites/bn-2027/{responses,plusOne,plusOneNames}` — separate from the tracker room.
- 36/36 headless checks with a mock backend (suite lived in the session scratchpad, not committed).

## Next Session
- Replace DRAFT content in the CONFIG block of `invite/index.html` (times, venue, address/map link, dress code, stay, gifts, letter), then set `draft: false` and regenerate `og.png`.
- Set RTDB rules: `responses` write-only for the public, `plusOne/$hash` readable per key only, admin paths behind auth. Without them anyone with the DB URL can read replies.
- Test one real submission on the deployed page; the sandbox could not reach Firebase.
- Custom domain: update absolute `og:image` / `og:url`.

## Open Questions
- Commit the e2e suite + mock to the repo (outside the public `invite/` folder)?
- Background music and photo gallery are in the doc's feature list but have no assets yet.

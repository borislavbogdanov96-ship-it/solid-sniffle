# Session Brief — solid-sniffle

**Date:** 2026-11-05
**Status:** Two parallel sessions today. Venue 3D planner (`venue.html`) is merged to main.
Invite + RSVP (`invite/`) is on `claude/nifty-einstein-gvgcxg`, PR open to main; draft content,
not yet tested against the real Firebase DB.

## Context
`solid-sniffle` = the couple's single-file wedding tracker (`index.html`, vanilla + Firebase RTDB)
plus Borislav's Agentic OS under `.claude/`. Sibling pages: `venue.html` (3D venue planner for
Bedouin Forest Residence, shares the tracker room) and `invite/` (public invite + RSVP, own path
`invites/bn-2027`). Invite decisions live in the Claude Doc "Одит Svatbichka + EventLink и tech stack"
(https://claude.ai/artifact/6BBqPThw3qZj4v4FDrgZii).

## Latest
- Invite: `invite/index.html` (public), `invite/admin.html` (+1 allow-list, responses, CSV),
  `invite/name-key.js` (shared name matching). 36/36 headless checks with a mock backend
  (suite in the session scratchpad, not committed).
- Venue: bird's-eye + walk modes, draggable places, day plan → places, tour, decoration items,
  ground drawing, day/golden/night.

## Next Session
Invite:
- Replace DRAFT content in the CONFIG block of `invite/index.html` (times, venue — likely
  "Bedouin Forest Residence" per the venue session, address/map link, dress code, stay, gifts,
  letter), set `draft: false`, regenerate `og.png`. Programme times could follow the venue
  session's draft moments.
- Set RTDB rules: `responses` write-only for the public, `plusOne/$hash` readable per key only,
  admin paths behind auth. Without them anyone with the DB URL can read replies.
- Send one real test reply on the deployed page, then delete it.
- Custom domain: update absolute `og:image` / `og:url`.
Venue:
- Check `scan.html` (7 real Gaussian-splat scans, 116 MB .ksplat in `venue-scans/`) on a real
  device: starting camera per scan, which scan shows which place, then name them.
- Set the Drive folder wedding/venue/beduin/3D back to Restricted (shared by link for download).
- Check venue.html frame rate on laptop and phone; Quality: fast if it stutters.
- Assign places to the draft moments (ceremony: forest vs waterfalls; welcome drink: courtyard vs
  forest; dinner: lawn vs forest slab). Party/first dance and end of night are missing.
- Correct pin positions on `venue.html` (guesses from satellite + drone photo).

## Open Questions
- Budget tab live check, acceptance-suite commit, auth — still open.
- Commit the invite e2e suite + mock (outside the public `invite/` folder)?
- Background music and photo gallery for the invite have no assets yet.
- NAVIGATION.md does not mention `venue.html`, `invite/` or the Budget view.

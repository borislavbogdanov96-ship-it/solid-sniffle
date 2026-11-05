# Progress — solid-sniffle

## 2026-11-05 (later) — Venue 3D: higher-fidelity rendering (option C), merged in PR #5

Physical sky + IBL, distant hills, leaf-card trees with wind, instanced grass
(masked under floors/drawings), reflective river, detail textures, night stars,
bloom and point lights; quality toggle (high desktop / fast phones). Verified by
single-frame headless renders (no GPU); real-device FPS not measured.

## 2026-11-05 (later) — Draft programme + photo-based detail

- "The day" now holds Bobby & Nikol's draft programme (12 moments, BG text,
  start–end times, notes). Places left empty where the draft doesn't decide.
  The old placeholder schedule is replaced automatically only if untouched.
- Model refined from 5 walk-through photos: stone lodge with glass front and
  dark plank hipped roof + chimney, parasols, string lights to lawn poles, log
  fire pit with log benches, thuja row, round gazebo, two caravans, gravel path,
  beech wood with leaf litter and stone edging around the forest slab.
- Verified in headless Chromium: migration old→new schedule, walk views of
  lawn / beech path / caravans, no page errors.

## 2026-11-05 — Venue 3D planner

New `venue.html`: interactive 3D model of Bedouin Forest Residence (Rositsa
river, road, lodge, residence, courtyard, lawn, forest slab, meadows, ~8k trees).

**Added**
- Bird's-eye orbit view and a Walk mode (drag to look, WASD / on-screen
  joystick, click ground to step there) — Street-View-style.
- 9 seeded places from the drone photo (BG + EN names), draggable, editable,
  with coloured areas painted on the ground.
- "The day": moments (time, name, place, notes) assigned to places; labels on
  the map show what happens where; "Walk through the day" camera tour.
- "Decorate": 17 placeable items (arch, 60 seats, aisle, round/long tables,
  bar, lounge, dance floor, stage, marquee, string lights, lanterns, fire pit,
  flowers, photo corner, sign with text, note pin) — move, rotate, scale,
  recolour, label, note, duplicate, delete; freehand drawing on the ground.
- Day / golden hour / night lighting (lights glow at night).
- Optional local overlay of the satellite screenshot on the ground.
- Sync via Firebase room `venue/`; localStorage fallback.
- "Venue 3D" link in the tracker's desktop toggle and mobile nav.

**Verified** — headless Chromium (SwiftShader, CDNs stubbed with local three
0.160.0, Firebase blocked → local mode): renders, tour, walk, night, item
placement, drawing; no page errors. Live Firebase sync not verified here.

## 2026-09-03 — Multiple budgets with side-by-side comparison

Extended the Budget tab so several budget builds can coexist and be compared.

**Added**
- `budgets` node; every category and expense now carries a `budgetId`.
- Scenario bar: switch budgets, new / duplicate / rename / set-as-main / delete.
- One scenario is the **main plan** (shared via `budgetSettings.mainBudgetId`)
  and is the only one that tracks payments; others render as projections with
  the payment and status fields hidden.
- Duplicate copies categories and expenses, re-pointing each copied expense at
  the copy's own categories; recorded payments are copied only on request.
- Compare view: categories down the side, scenarios across, a Spread column
  showing where the money actually differs, plus Total, vs-budget and
  vs-cheapest footer rows. Scrolls horizontally on mobile.
- Migration adopting pre-scenario budget data into a "Main plan" scenario.

**Verified** — 17/17 scenario checks, 17/17 acceptance checks, 15/15 regression
checks. The scenario suite covers isolation between budgets, duplication
re-pointing, main-plan promotion, the delete guard, comparison arithmetic, and a
simulated upgrade from the previous schema. All against the in-memory Firebase
mock; the live database was never touched.

**Fixed during testing** — creating a scenario rendered the bar with the previous
budget still selected, because the view id was set after the writes that trigger
the re-render.

**Still unverified** — visual styling (the sandbox proxy blocks the Tailwind and
Google Fonts CDNs).

## 2026-09-03 — Budget & Expenses tracker built

Implemented the full Budget spec inside `index.html` as a fourth view alongside
Overview / Tasks / Timeline.

**Added**
- `budgetCategories`, `expenses`, `budgetSettings` nodes under the existing
  Firebase Realtime DB room, each with an `on('value')` listener.
- Eight seed categories written on first load; settings seeded to
  25,000 EUR / EUR / threshold 100 / 51 guests.
- Dashboard: editable total budget and guest count, planned/spent/paid/remaining
  tiles, colour-coded progress bar, over-budget category badges.
- Category rows: inline-editable planned amount, mini progress bar, expand to
  the expenses inside, add-expense and delete-category actions.
- Expense form: fixed vs per-unit pricing toggle with live total preview,
  multi-payment list, auto-derived status, due date, notes, delete.
- `expenseTotal()` / `expensePaid()` as the single shared calculation used by
  both the live preview and every aggregate (spec §5).

**Verified** — 17/17 headless-browser checks pass, covering all 10 acceptance
criteria plus colour bands, dark mode, mobile layout and the
delete-category-moves-expenses-to-Other path. The test runs against an
in-memory Firebase mock so the couple's live database was never written to.

**Not verified** — the sandbox proxy blocks the Tailwind and Google Fonts CDNs,
so visual styling could not be confirmed in a real browser. Behaviour was tested
with a shim covering only the display utilities the logic depends on.

**Next** — Bobby opens the Budget tab against the real Firebase room and confirms
the seed data and layout look right.


## 2026-11-05 — Invite + RSVP (phase 1)
- Built `invite/index.html` (public, Bulgarian): hero with countdown, letter, programme timeline, venue + maps link + .ics, details, RSVP band, OG preview image (`invite/og.png`).
- RSVP modal implements every doc decision: name, attend/decline radios, menu (Стандартно/Вегетарианско), kids count, +1 only for allowed guests via hashed-name lookup; draft persists across reloads; failure keeps answers.
- Built `invite/admin.html`: live counts (people, menus, kids, declines), latest-reply-per-person table, CSV export, +1 allow-list.
- `invite/name-key.js`: shared normalisation (case-insensitive, official BG transliteration) + SHA-256 hash.
- Headless e2e with a localStorage Firebase mock: 36/36. Bugs fixed during verification: admin grid overflow on mobile, draft overwritten on load, nested choice spans on mobile, menu label overflow at 390px, timeline dot overlap, informal "ти" in success copy.
- Not verified: real Firebase writes (sandbox proxy blocks Firebase hosts) and RTDB security rules (not in repo).

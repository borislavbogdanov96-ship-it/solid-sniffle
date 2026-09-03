# Decisions — solid-sniffle

Append-only, newest first. A reversal links to the entry it supersedes.

---

## 2026-09-03 — Budget tracker follows the app's real stack, not the spec's assumed one

**Decision.** Build the Budget section as vanilla JS inside `index.html`, on
Firebase **Realtime Database**, rather than as React components on Firestore.

**Why.** The spec (§2, §4) assumes a React app with a `/components/budget/`
tree and Firestore collections. The actual app is a single 1,578-line
`index.html` — Tailwind via CDN, no build step, no bundler, and a Firebase
**Realtime DB** at `rooms/f3a9b2d7…/tasks`. Following the spec literally would
have meant introducing React, a bundler and a second database product for one
feature.

**What this changes vs. the spec.**
- Firestore collections → RTDB nodes under the same room:
  `budgetCategories`, `expenses`, `budgetSettings`.
- Auto-generated document ids → `push()` keys.
- Array fields (`paymentEntries`) round-trip through RTDB as objects, so they
  are normalised on read (same pattern the app already uses for `deps`).
- The `/components/budget/*.jsx` list became render functions with matching
  names (`renderBudgetDashboard`, `catRowHtml`, `expenseFormHtml`, …).
- `onSnapshot` → `ref.on('value')`; behaviour (live multi-device sync) is the same.

**Unchanged.** The data model field names, the pricing/aggregation rules, and
all 10 acceptance criteria.

**Open.** Spec §5 asks for auth-restricted access (Bobby and Nikol). The app has
no auth mechanism today — the room id is the only secret — so nothing was added.
Flagged, not solved.

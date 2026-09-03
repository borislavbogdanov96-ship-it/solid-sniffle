# Decisions — solid-sniffle

Append-only, newest first. A reversal links to the entry it supersedes.

---

## 2026-09-03 — Multiple budgets are independent copies, with one marked "main"

**Decision.** A budget scenario is a self-contained set of categories and
expenses. You switch between them, duplicate one to start another, and mark
exactly one as the **main plan**. Only the main plan tracks real payments;
every other scenario is a projection.

**Why.** Comparing "Venue A with its item list" against "Venue B with a
different list" is the actual use case — the lists genuinely differ, not just a
price here and there. A shared-baseline-plus-overrides model would have been
cheaper on storage but forces you to think in terms of diffs when what you want
is two whole plans side by side. Bobby chose independent builds explicitly.

**Consequences accepted.**
- A line item common to two scenarios (the photographer, say) exists twice and
  must be edited twice. That is the cost of independence, and it was the
  understood trade.
- Duplicating does **not** copy recorded payments by default — a deposit paid to
  one venue does not belong in another venue's projection. It is a checkbox on
  the duplicate dialog for the case where you do want them.
- The main plan cannot be deleted; promote another scenario first.
- `totalBudget` (25,000) and `guestCount` stay global, so every scenario is
  measured against the same constraint — which is what makes the comparison
  meaningful.

**Migration.** Categories and expenses written by the first version carry no
`budgetId`. On load they are adopted into a scenario named "Main plan" rather
than stranded or duplicated. Seeding and migration are deferred until the
`budgets`, `budgetCategories` and `expenses` snapshots have all arrived, because
they can land in any order and an early decision would seed a second set of
categories on top of the existing ones.

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

# Life OS — Hand-Finish Checklist

This workspace was built through the Notion API. A handful of things the API cannot create or set are listed below. Total time: ~30 minutes of clicking in the Notion UI.

## 1. Buttons (Notion button blocks; the API cannot create them)

Each dashboard has a "Fast actions" callout. Under it, add one Button block per action below (`/button` → Add page to → pick database → set property presets → Done).

**Home dashboard** — Fast actions callout:
- [ ] New task → Add page to Tasks, set Status = Not started, Due = today
- [ ] New project → Add page to Projects, set Status = In progress
- [ ] New note → Add page to Notes, set Date = today
- [ ] New expense → Add page to Transactions, set Kind = Expense, Date = today
- [ ] New habit day → Add page to Habit days, set Date = today, Name = today's date
- [ ] New trip → Add page to Trips, set Status = Idea
- [ ] New recipe → Add page to Recipes
- [ ] New training → Add page to Trainings, set Status = Planned, Date = today
- [ ] New contact → Add page to Contacts

**Second Brain dashboard** — Fast actions callout:
- [ ] New task → Add page to Tasks, set Status = Not started, Due = today
- [ ] New project → Add page to Projects, set Status = In progress
- [ ] New note → Add page to Notes, set Date = today
- [ ] New goal → Add page to Goals, set Status = In progress
- [ ] New paper → Add page to Papers, set Date = today

**Finance dashboard** — Fast actions callout:
- [ ] New expense → Add page to Transactions, set Kind = Expense, Date = today
- [ ] New income → Add page to Transactions, set Kind = Income, Date = today
- [ ] New transfer → Add page to Transfers, set Date = today
- [ ] New wallet → Add page to Wallets
- [ ] New budget → Add page to Budgets, set Month = first day of this month
- [ ] New subscription → Add page to Subscriptions, set Active = checked
- [ ] New debt → Add page to Debts, set Status = Active
- [ ] New asset → Add page to Assets
- [ ] New goal → Add page to Goals, set Domain = Finance

**Travel dashboard** — Fast actions callout:
- [ ] New trip → Add page to Trips
- [ ] New idea → Add page to Trips, set Status = Idea
- [ ] New location → Add page to Locations
- [ ] New schedule item → Add page to Schedule
- [ ] New gallery → Add page to Galleries
- [ ] New document → Add page to Documents

**Subscriptions database — "Pay" button property:**
- [ ] Open Subscriptions → Add property → Button → name it "Pay"
- [ ] Add action: Edit property → Paid → set to checked
- [ ] Add action: Edit property → Next payment → Date: add 1 month → condition: only if Cycle = Monthly
- [ ] If Notion won't let the action branch on Cycle, replace with two buttons instead: "Pay monthly" (Paid = checked, Next payment = add 1 month) and "Pay yearly" (Paid = checked, Next payment = add 1 year)

## 2. Database templates (the API cannot create them)

For each: open the database → click New ▾ next to the New button → + New template → name it → build the content → set as default template.

- [ ] **Trips → "Trip"**: copy the layout of the "Lisbon weekend" page (header callout + three linked Schedule views: board by day, timeline, by type — each currently filtered Trip = Lisbon weekend). In the template, change each view's filter to Trip contains → "this page" (the template page itself; Notion offers "this page" as a template filter option). Set "Trip" as the default template for the database.
- [ ] **Projects → "Project"**: add a linked Tasks view (filter Project contains this page, board grouped by Status) plus a linked Notes view.
- [ ] **Habit days → "Day"**: set title = today's date. The 5 tracking checkboxes are properties, so leave the page body for a short "Notes" heading.
- [ ] **Recipes → "Recipe"**: add headings Ingredients / Steps / Notes.
- [ ] **Trainings → "Training"**: add a table block with columns Exercise / Sets / Reps / Weight.
- [ ] **Goals → "Goal"**: add headings Why / Milestones / Linked tasks, with a linked Tasks view under "Linked tasks" filtered Goal contains this page.

## 3. Relative-date filters (12 views; the API only accepts fixed dates)

Click path for each: open the database → open the view → Filter → remove the existing fixed Date filter → add filter → pick the named formula property → "is checked".

- [ ] Tasks → Today view → filter on "Is today"
- [ ] Tasks → This week view → filter on "Is this week"
- [ ] Tasks → This month view → filter on "Is this month"
- [ ] Habit days → Today view → filter on "Is today"
- [ ] Habit days → Last 10 days view → filter on "Last 10 days"
- [ ] Transactions → Today view → filter on "Is today"
- [ ] Transactions → This week view → filter on "Is this week"
- [ ] Transactions → This month view → filter on "Is this month"
- [ ] Budgets → This month view → filter on "Is this month"
- [ ] Recipes → Menu today view → filter on "Is today"
- [ ] Trainings → This week view → filter on "Is this week"
- [ ] Goals → no change needed (Goals views filter on Period, not date)

The same fixed-date filters exist a second time, on the linked database views embedded inside the dashboards. Fix those with the same click path (open the linked view on the dashboard → Filter → remove the fixed date → add the same formula filter as above). The fixed dates currently in place are 13 Sep 2026 / 7–13 Sep 2026 / 1–30 Sep 2026 / 4–13 Sep 2026:

- [ ] Home dashboard → Tasks Today linked view → "Is today"
- [ ] Home dashboard → Tasks This week linked view → "Is this week"
- [ ] Home dashboard → Tasks This month linked view → "Is this month"
- [ ] Home dashboard → Habits today linked view → "Is today"
- [ ] Home dashboard → 10-day tracker linked view → "Last 10 days"
- [ ] Second Brain dashboard → Tasks All linked view → "Is today"/"Is this week"/"Is this month" as applicable
- [ ] Second Brain dashboard → Tasks By priority linked view → same as above
- [ ] Second Brain dashboard → Habits today linked view → "Is today"
- [ ] Finance dashboard → Monthly budgets linked view → "Is this month"
- [ ] Finance dashboard → Month budget chart linked view → "Is this month"
- [ ] Travel dashboard → no fixed-date linked views to fix

## 4. Formulas and displays

- [ ] Recipes → "Missing" is currently a rollup of out-of-stock ingredient names. Optional: add a new formula property named "Missing label" with exactly this formula:
  ```
  let(m, prop("Ingredients").filter(current.prop("Status") == "Not in stock").map(current.prop("Name")), if(empty(m), "All in stock", "Missing: " + join(m, ", ")))
  ```
- [ ] Swap "Missing" for "Missing label" in the Recipes → Menu today view
- [ ] Swap "Missing" for "Missing label" in the Recipes → By meal type view
- [ ] Swap "Missing" for "Missing label" in the Recipes → Gallery view
- [ ] Projects.Progress → open property → Edit property → Show as → Bar, range 0–1
- [ ] Goals.Progress → open property → Edit property → Show as → Bar, range 0–1
- [ ] Books.Progress → open property → Edit property → Show as → Bar, range 0–1
- [ ] Budgets.Progress → open property → Edit property → Show as → Bar (or Ring), range 0–1, tick "Show number" (so % overspend past 100% is visible)
- [ ] Debts.Progress → open property → Edit property → Show as → Bar, range 0–1
- [ ] Habit days.Progress → open property → Edit property → Show as → Bar, range 0–1
- [ ] Trips → "Map · ideas" view → add filter Status = Idea (map views ignore filters set through the API)
- [ ] Optional — hide helper properties in table views: Tasks (hide Is today, Is this week, Is this month), Transactions (hide Signed amount, Is today, Is this week, Is this month), Projects (hide Task count (n)), Food storage (hide Missing name), Budgets/Goals/Recipes/Trainings/Habit days (hide the "Is …" helper properties)

## 5. Covers, icons and images

- [ ] Life areas (8 pages) — add cover images (file properties exist, currently empty)
- [ ] Spheres (4 pages) — add cover images
- [ ] Books (6 pages) — add cover images
- [ ] Watchlist (8 pages) — add cover images
- [ ] Recipes (6 pages) — add cover images
- [ ] Galleries (6 pages) — add cover images
- [ ] Continents (6 pages) — add outline images
- [ ] Wallets (3 pages) — add icons
- [ ] Subscriptions (6 pages) — add logos
- [ ] Assets (5 pages) — add cover images
- [ ] Dashboard covers are currently Notion gradients chosen for light theme — if you use dark theme, pick a different gradient per dashboard (Home, Second Brain, Finance, Travel) for better contrast

## 6. Widgets

All six widgets are already embedded as Notion HTML attachments (they run inside Notion, no hosting needed): Home (clock, progress bars), Second Brain (clock, Pomodoro, progress bars, quote), Finance (clock, investment calculator), Travel (clock, weather for Sofia, quote).

- [ ] Open each dashboard once and confirm the embeds render; if an embed shows as a file card instead of a widget, click it → "Embed".
- [ ] Weather: confirm it reaches Open-Meteo from your browser (the build sandbox could not). If it stays on "Weather unavailable", replace the attachment with the hosted URL below.
- [ ] Optional hosted versions with query parameters (city, time zone, accent, 12-hour clock, currency): after merging branch `claude/notion-life-os-build-e3id13` into `main`, GitHub Pages serves `https://borislavbogdanov96-ship-it.github.io/solid-sniffle/life-os/widgets/<clock|progress|pomodoro|weather|quote|invest>.html?…` (parameter docs in `life-os/widgets/index.html`). Paste such a URL into a Notion embed block to replace an attachment.
- [ ] Spotify: on Home, Second Brain and Travel, paste a playlist link under the "Favourite music" callout and choose Embed.

## 7. Password manager

- [ ] Second Brain dashboard → "Passwords" callout → paste your password-manager link there (no Passwords database exists in this workspace, by design)

## Done when

- [ ] All Fast actions callouts (Home, Second Brain, Finance, Travel) have their buttons and each one adds a page with the right property presets
- [ ] Subscriptions has a working Pay button (or Pay monthly / Pay yearly pair)
- [ ] All 6 database templates exist and Trips → "Trip" is set as default
- [ ] All 12 relative-date views plus their dashboard-linked duplicates filter on "is checked" formulas, not fixed dates
- [ ] Progress bars/rings show on Projects, Goals, Books, Budgets, Debts, Habit days, and the Map · ideas view is filtered to Idea

# Life OS — Notion schema (build spec)

Source: Templation rebuild assessment (artifact 0c681608), "Deduplicated schema for a single build".
Target: one parent page **Life OS** in Borislav Bogdanov's Notion, 30 databases, created through the Notion MCP connector.

Conventions
- Title property is always `Name`.
- Money = `NUMBER FORMAT 'euro'`. Progress values are numbers 0–1 (or >1 for overspend); switching their display to **Bar** / **Ring** is a UI toggle (Phase 5 checklist).
- `STATUS` uses Notion's default options (Not started / In progress / Done) because the DDL cannot set status options. Custom lifecycles (trips, books, debts) use `SELECT`.
- Relative-date views ("Today", "This week", "This month", "Last 10 days") are driven by hidden boolean formulas because the Views DSL only accepts fixed ISO dates.
- `↔ X` = two-way relation; the synced property on the other side is named in parentheses.
- `Place` properties are attempted with type `PLACE`; if the DDL rejects it, fallback = add by hand in the UI, values filled by script.
- Habit names and select options are placeholders where the originals were not legible in the research; rename freely.

Formula syntax = Notion formula 2.0. `today()` = today at 00:00; `dateBetween(a, b, "days")` = a − b.

---

## Core

### 1. Life areas
| Property | Type |
|---|---|
| Name | TITLE |
| Cover | FILES |
| Description | RICH_TEXT |
| Goals / Projects / Tasks / Spheres / Papers / Documents | relations synced from those databases |
| Goals count, Projects count, Tasks count, Spheres count, Papers count, Documents count | ROLLUP(relation, Name, count) — added in post-pass |

### 2. Goals
| Property | Type |
|---|---|
| Name | TITLE |
| Domain | SELECT(Personal:blue, Finance:green, Travel:orange) |
| Period | SELECT(Week:gray, Month:blue, Year:purple) |
| Status | STATUS |
| Target | NUMBER FORMAT 'euro' |
| Current | NUMBER FORMAT 'euro' |
| Deadline | DATE |
| Life area | RELATION ↔ Life areas (Goals) |
| Tasks | synced from Tasks |
| Tasks total | ROLLUP(Tasks, Name, count) |
| Tasks done | ROLLUP(Tasks, Done, checked) |
| Progress | FORMULA `if(prop("Target") > 0, min(1, prop("Current") / prop("Target")), if(prop("Tasks total") == 0, 0, prop("Tasks done") / prop("Tasks total")))` |
| Is this month | FORMULA `not empty(prop("Deadline")) and month(prop("Deadline")) == month(now()) and year(prop("Deadline")) == year(now())` |

### 3. Projects
| Property | Type |
|---|---|
| Name | TITLE |
| Status | STATUS |
| Type | SELECT(Personal:blue, Work:gray, Learning:purple, Health:green, Finance:yellow, Travel:orange, Home:brown) |
| Priority | SELECT(High:red, Medium:yellow, Low:gray) |
| Dates | DATE |
| Cover | FILES |
| Life area | RELATION ↔ Life areas (Projects) |
| Tasks | synced from Tasks |
| Tasks total | ROLLUP(Tasks, Name, count) |
| Tasks done | ROLLUP(Tasks, Done, checked) |
| Progress | FORMULA `if(prop("Tasks total") == 0, 0, prop("Tasks done") / prop("Tasks total"))` |
| Tasks label | FORMULA `format(prop("Tasks done")) + "/" + format(prop("Tasks total"))` |

### 4. Tasks
| Property | Type |
|---|---|
| Name | TITLE |
| Done | CHECKBOX |
| Status | STATUS |
| Priority | SELECT(High:red, Medium:yellow, Low:gray) |
| Due | DATE |
| Project | RELATION ↔ Projects (Tasks) |
| Goal | RELATION ↔ Goals (Tasks) |
| Relative due | FORMULA `if(empty(prop("Due")), "", let(d, dateBetween(dateStart(prop("Due")), today(), "days"), ifs(d < 0, "Overdue " + format(-d) + "d", d == 0, "Today", d == 1, "Tomorrow", "In " + format(d) + " days")))` |
| Is today | FORMULA `formatDate(prop("Due"), "YYYY-MM-DD") == formatDate(now(), "YYYY-MM-DD")` |
| Is this week | FORMULA `not empty(prop("Due")) and week(prop("Due")) == week(now()) and year(prop("Due")) == year(now())` |
| Is this month | FORMULA `not empty(prop("Due")) and month(prop("Due")) == month(now()) and year(prop("Due")) == year(now())` |

### 5. Notes
| Property | Type |
|---|---|
| Name | TITLE |
| Type | SELECT(Idea:yellow, Journal:blue, Meeting:gray, Research:purple, Travel:orange) |
| Created | CREATED_TIME |
| Project | RELATION ↔ Projects (Notes) |
| Trip | RELATION ↔ Trips (Notes) |
| Topic | RELATION ↔ Topics (Notes) |

### 6. Habit days
| Property | Type |
|---|---|
| Name | TITLE (e.g. "Mon 14 Sep") |
| Date | DATE |
| Workout, Read, Meditate, Water, No sugar | CHECKBOX ×5 (placeholders) |
| Done | FORMULA `[prop("Workout"), prop("Read"), prop("Meditate"), prop("Water"), prop("No sugar")].filter(current).length()` |
| Progress | FORMULA `prop("Done") / 5` |
| Is today | FORMULA `formatDate(prop("Date"), "YYYY-MM-DD") == formatDate(now(), "YYYY-MM-DD")` |
| Last 10 days | FORMULA `let(d, dateBetween(today(), dateStart(prop("Date")), "days"), d >= 0 and d < 10)` |

## Knowledge

### 7. Spheres
| Name TITLE · Cover FILES · Life area RELATION ↔ Life areas (Spheres) · Topics (synced) · Topics count ROLLUP(Topics, Name, count) |

### 8. Topics
| Name TITLE · Sphere RELATION ↔ Spheres (Topics) · Papers (synced) · Notes (synced) · Papers count ROLLUP(Papers, Name, count) |

### 9. Papers
| Property | Type |
|---|---|
| Name | TITLE |
| Type | SELECT(Essay:blue, Web article:green, Guide:yellow, Research paper:purple) |
| URL | URL |
| Date | DATE |
| Preview | FILES |
| Topic | RELATION ↔ Topics (Papers) |
| Life area | RELATION ↔ Life areas (Papers) |

## Media

### 10. Books
| Property | Type |
|---|---|
| Name | TITLE |
| Author | RICH_TEXT |
| Status | SELECT(To read:gray, Reading:blue, On hold:yellow, Finished:green) |
| Format | SELECT(Paper:brown, E-book:blue, Audiobook:purple) |
| Genre | MULTI_SELECT(Fiction, Non-fiction, Business, Science, Self-help, History, Biography) |
| Rating | SELECT(★, ★★, ★★★, ★★★★, ★★★★★) |
| Pages | NUMBER |
| Pages read | NUMBER |
| Progress | FORMULA `if(prop("Pages") > 0, min(1, prop("Pages read") / prop("Pages")), 0)` |
| Link | URL |
| Cover | FILES |

### 11. Watchlist
| Property | Type |
|---|---|
| Name | TITLE |
| Status | SELECT(To watch:gray, Watching:blue, Finished:green, Dropped:red) |
| Type | SELECT(Movie:blue, Series:purple, Video:orange) |
| Genre | MULTI_SELECT(Drama, Comedy, Sci-fi, Thriller, Documentary, Animation, Action) |
| Platform | SELECT(Netflix:red, Prime:blue, Disney+:purple, HBO:gray, YouTube:orange, Cinema:brown) |
| Link | URL |
| Seasons | NUMBER |
| Duration (min) | NUMBER |
| Rating | SELECT(★ … ★★★★★) |
| Cover | FILES |

## Money

### 12. Wallets
| Property | Type |
|---|---|
| Name | TITLE |
| Type | SELECT(Cash:green, Bank:blue, Card:purple, Savings:yellow) |
| Initial balance | NUMBER euro |
| Icon | FILES |
| Transactions / Subscriptions / Transfers out / Transfers in | synced |
| Net transactions | ROLLUP(Transactions, Signed amount, sum) |
| Transfers in total | ROLLUP(Transfers in, Amount, sum) |
| Transfers out total | ROLLUP(Transfers out, Amount, sum) |
| Balance | FORMULA `prop("Initial balance") + prop("Net transactions") + prop("Transfers in total") - prop("Transfers out total")` |

### 13. Transactions
| Property | Type |
|---|---|
| Name | TITLE |
| Kind | SELECT(Expense:red, Income:green) |
| Amount | NUMBER euro |
| Category | SELECT(Food:orange, Transport:blue, Housing:brown, Health:green, Fun:pink, Shopping:purple, Salary:green, Freelance:yellow, Other:gray) |
| Date | DATE |
| Wallet | RELATION ↔ Wallets (Transactions) |
| Budget | RELATION ↔ Budgets (Transactions) |
| Signed amount | FORMULA `if(prop("Kind") == "Income", prop("Amount"), -prop("Amount"))` |
| Is today / Is this week / Is this month | FORMULA (same pattern as Tasks, on Date) |

### 14. Transfers
| Name TITLE · Amount NUMBER euro · Date DATE · From wallet RELATION ↔ Wallets (Transfers out) · To wallet RELATION ↔ Wallets (Transfers in) · Note RICH_TEXT |

### 15. Budgets
| Property | Type |
|---|---|
| Name | TITLE (e.g. "Food · Sep 2026") |
| Month | DATE |
| Category | SELECT (same options as Transactions.Category) |
| Limit | NUMBER euro |
| Transactions | synced |
| Spent | ROLLUP(Transactions, Amount, sum) |
| Progress | FORMULA `if(prop("Limit") > 0, prop("Spent") / prop("Limit"), 0)` (can exceed 1 = overspend) |
| Remaining | FORMULA `prop("Limit") - prop("Spent")` |
| Is this month | FORMULA on Month |

### 16. Subscriptions
| Property | Type |
|---|---|
| Name | TITLE |
| Amount | NUMBER euro |
| Cycle | SELECT(Monthly:blue, Yearly:purple) |
| Next payment | DATE |
| Paid | CHECKBOX |
| Active | CHECKBOX |
| Wallet | RELATION ↔ Wallets (Subscriptions) |
| Logo | FILES |
| Monthly cost | FORMULA `if(prop("Cycle") == "Yearly", prop("Amount") / 12, prop("Amount"))` |
| Renews in | FORMULA `if(empty(prop("Next payment")), "", format(dateBetween(dateStart(prop("Next payment")), today(), "days")) + " days")` |
| *Pay* | button (manual, Phase 5): set Paid ✓, Next payment += 1 cycle |

### 17. Debts
| Name TITLE · Creditor RICH_TEXT · Total NUMBER euro · Paid NUMBER euro · Deadline DATE · Status SELECT(Active:red, Paid:green) · Progress FORMULA `if(prop("Total") > 0, min(1, prop("Paid") / prop("Total")), 0)` · Remaining FORMULA `prop("Total") - prop("Paid")` |

### 18. Assets
| Name TITLE · Type SELECT(Mixed, Electronic, Real estate, Vehicle, Investment, Cash) · Quantity NUMBER · Unit value NUMBER euro · Total FORMULA `prop("Quantity") * prop("Unit value")` · Image FILES |

## Health

### 19. Recipes
| Property | Type |
|---|---|
| Name | TITLE |
| Meal type | SELECT(Breakfast:yellow, Lunch:green, Dinner:blue, Snack:orange) |
| Calories | NUMBER |
| Time (min) | NUMBER |
| Planned date | DATE (drives "Menu today") |
| Cover | FILES |
| Link | URL |
| Ingredients | RELATION ↔ Food storage (Recipes) |
| Missing | FORMULA `let(m, prop("Ingredients").filter(current.prop("Status") == "Not in stock").map(current.prop("Name")), if(m.length() == 0, "All in stock", "Missing: " + m.join(", ")))` |
| Is today | FORMULA on Planned date |

### 20. Food storage
| Name TITLE · Status SELECT(In stock:green, Not in stock:red) · Category SELECT(Vegetables, Fruit, Dairy, Meat, Fish, Grains, Spices, Drinks, Other) · Calories (per 100g) NUMBER · Price NUMBER euro · Quantity RICH_TEXT · Recipes (synced) |

### 21. Exercises
| Name TITLE · Muscle group SELECT(Chest, Back, Legs, Shoulders, Arms, Core, Cardio) · Working weight (kg) NUMBER · Equipment SELECT(Barbell, Dumbbell, Machine, Bodyweight, Cable) · Trainings (synced) |

### 22. Trainings
| Name TITLE · Date DATE · Status SELECT(Planned:gray, Done:green) · Type SELECT(Strength, Cardio, Mobility) · Exercises RELATION ↔ Exercises (Trainings) · Sets NUMBER · Reps NUMBER · Duration (min) NUMBER · Is this week FORMULA on Date |

## Travel

### 23. Trips
| Property | Type |
|---|---|
| Name | TITLE |
| Status | SELECT(Idea:gray, Planned:blue, Active:green, Visited:purple) |
| Dates | DATE (range) |
| Location | RICH_TEXT |
| Place | PLACE (attempted; fallback manual) |
| Country | RICH_TEXT |
| Type | SELECT(City break, Beach, Road trip, Hiking, Business, Family) |
| Budget | NUMBER euro |
| Cover | FILES |
| Continent | RELATION ↔ Continents (Trips) |
| Schedule / Locations / Galleries / Documents / Notes | synced |
| Spent | ROLLUP(Schedule, Cost, sum) |
| Budget left | FORMULA `prop("Budget") - prop("Spent")` |
| Duration (days) | FORMULA `if(empty(prop("Dates")), 0, dateBetween(dateEnd(prop("Dates")), dateStart(prop("Dates")), "days") + 1)` |
| Countdown | FORMULA `if(empty(prop("Dates")), "", let(s, dateBetween(dateStart(prop("Dates")), today(), "days"), let(e, dateBetween(dateEnd(prop("Dates")), today(), "days"), ifs(s > 0, "In " + format(s) + " days", e >= 0, "Now", "Done"))))` |

### 24. Schedule
| Name TITLE · Trip RELATION ↔ Trips (Schedule) · Day SELECT(Day 1 … Day 14) · Date DATE · Type SELECT(Food:orange, Activity:green, Transport:blue, Accommodation:purple) · Done CHECKBOX · Cost NUMBER euro · Time RICH_TEXT · Link URL |

### 25. Locations
| Name TITLE · Place PLACE (attempted) · Address RICH_TEXT · Type SELECT(City, Restaurant, Museum, Beach, Hotel, Viewpoint, Nature, Other) · Trip RELATION ↔ Trips (Locations) · Continent RELATION ↔ Continents (Locations) · Visited CHECKBOX · Rating SELECT(★ … ★★★★★) · Link URL · Cover FILES |

### 26. Continents
| Name TITLE · Outline FILES · Trips / Locations / Galleries (synced) · Trips count, Locations count, Galleries count ROLLUP(…, Name, count) |

### 27. Galleries
| Name TITLE · Cover FILES · Location RICH_TEXT · Role SELECT(Trip:blue, Family:pink, Friends:green, Nature:green, Food:orange, City:gray, Vision board:purple) · Date DATE · Trip RELATION ↔ Trips (Galleries) · Continent RELATION ↔ Continents (Galleries) |

(Vision board = Galleries filtered Role = "Vision board"; no separate database.)

### 28. Documents
| Name TITLE · Type SELECT(Passport, Visa, Insurance, Ticket, Booking, ID, Contract, Other) · Expiry DATE · File FILES · Trip RELATION ↔ Trips (Documents) · Life area RELATION ↔ Life areas (Documents) · Expiry status FORMULA `if(empty(prop("Expiry")), "", let(d, dateBetween(dateStart(prop("Expiry")), today(), "days"), ifs(d < 0, "Expired", d <= 90, "Expires in " + format(d) + " days", "Valid")))` |

## Reference

### 29. Contacts
| Name TITLE · Role SELECT(Family:pink, Friend:green, Work:blue, Doctor:red, Service:gray, Other) · Phone PHONE_NUMBER · Email EMAIL · Birthday DATE · Company RICH_TEXT · Photo FILES · Notes RICH_TEXT |

### 30. Tools
| Name TITLE · Type SELECT(App, Website, Extension, Service) · Category SELECT(Productivity, Design, Finance, Learning, Dev, Health, Other) · Payment SELECT(Free:green, Paid:red, Freemium:yellow) · Link URL · Icon FILES |

---

## Creation order (relation targets first)

1. Life areas, Continents, Wallets, Food storage, Exercises, Books, Watchlist, Contacts, Tools, Habit days, Debts, Assets, Budgets
2. Goals, Projects, Spheres
3. Tasks, Topics, Trips, Subscriptions, Transfers, Recipes, Trainings
4. Papers, Transactions, Notes, Schedule, Locations, Galleries, Documents
5. Post-pass (update-data-source): rollups + rollup-dependent formulas on Life areas, Continents, Spheres, Topics, Projects, Goals, Wallets, Budgets, Trips

## Seed data (Phase 1b)

Illustrative rows so every view renders; not the originals' exact rows (no live demo existed to copy from).
Life areas 8 · Goals 6 · Projects 5 · Tasks 14 · Notes 6 · Habit days 12 (today and 11 days back) · Spheres 4 · Topics 6 · Papers 6 · Books 6 · Watchlist 8 · Wallets 3 · Transactions 20 · Transfers 3 · Budgets 5 · Subscriptions 6 · Debts 3 · Assets 5 · Recipes 6 · Food storage 12 · Exercises 10 · Trainings 5 · Trips 6 · Schedule 12 · Locations 8 · Continents 6 · Galleries 6 · Documents 5 · Contacts 6 · Tools 8.

## Not in the schema (by decision)
- Passwords database — dropped; a password-manager link takes its dashboard slot.
- Analytics (Finance Tracker) — replaced by chart/number views over Transactions, Wallets, Subscriptions, Assets, Debts.

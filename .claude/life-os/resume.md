# Resume — Life OS

**Read first.** This is the Notion "Life OS" build (merged rebuild of four
Templation templates). It is NOT the wedding tracker; do not use the top-level
`.claude/resume.md` for this work.

**State (end of session 1, 2026-09-13).** Phases 1–5 delivered through the
Notion MCP connector: 30 databases, 218 seed rows, 133 database views,
4 dashboards + parent nav (77 linked views), 6 widgets embedded as Notion HTML
attachments, hand-finish checklist (`life-os/CHECKLIST.md`, also a page under
Life OS). Nothing outside the "Life OS" page was touched.

**Parent page.** https://app.notion.com/p/3da05f5050a58138a08bf12b3e60f1c4
Dashboards: Home 3da05f50-50a5-813f-9d63-d05b570ab5cb · Second Brain
3da05f50-50a5-818d-a5bb-d23477afdac6 · Finance 3da05f50-50a5-8124-8767-c7f4d2d7e148
· Travel 3da05f50-50a5-81c9-99c9-fea40273ef3e. All database/data-source IDs:
`life-os/notion-ids.md`; seed page IDs: `life-os/seed-ids.json`.

**Known connector limits (see decisions.md).** Formula validator rejects
lambdas (`filter/map/current`); View DSL drops filters on formula properties and
map-view filters; `<database data-source-url>` in page markdown is refused —
linked views are created with create-view(parent_page_id) and moved by
replace_content. Buttons and database templates cannot be created.

**What the user does next.** Work through the checklist page (≈30 min):
buttons, 6 templates, 12 relative-date filter swaps, bar displays, covers,
Spotify links, confirm widgets render (weather needs Open-Meteo reachable).

**If resuming to change anything.** Fetch the target page first; dashboards are
rewritten wholesale by replace_content, so re-fetch before editing.

# Re-read Large Confluence Pages Before Updating

**Type:** process
**Trigger:** Updating a large/complex Confluence page (200+ lines, embedded images, status lozenges, custom tables).
**Pattern:** Confluence updates require sending the **entire** page body — there's no partial/section update. A markdown round-trip can silently drop blob-URL images, custom `data-type` tags, or status lozenges. Also: `createConfluencePage` doesn't honor `parentId` via `spaceId` alone — pages land at root.
**Guardrail:** Always re-read the current version immediately before pushing — even if you just updated it — to catch content that renders differently in markdown. Pass `parentId` explicitly when creating (Nexo Card release checklists → `616038463` in NE space).
**Seen:** MiCA DiPocket doc (2026-04-09), Monday-manager build (2026-04-06).

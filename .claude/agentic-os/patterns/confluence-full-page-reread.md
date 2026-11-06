# Re-read Large Confluence Pages Before Updating

**Type:** process
**Trigger:** Updating a large/complex Confluence page (200+ lines, embedded images, status lozenges, custom tables).
**Pattern:** Confluence updates require sending the **entire** page body — there's no partial/section update. A markdown round-trip can silently drop blob-URL images, custom `data-type` tags, or status lozenges. Also: `createConfluencePage` doesn't honor `parentId` via `spaceId` alone — pages land at root.
**Guardrail:** Always re-read the current version immediately before pushing — even if you just updated it — to catch content that renders differently in markdown. Pass `parentId` explicitly when creating a page under a known parent, rather than letting it land at the space root.
**Seen:** Generalized from prior work-context sessions; re-validate against your own Confluence usage.

---
name: google-drive-project
description: Manages the "Claude Projects" folder structure in Google Drive for personal and work projects. Use this skill whenever a project session starts (to verify Drive is linked), when the user mentions Google Drive, asks to organize project files, says anything like "sync to drive", "set up drive", "init drive", or "where are the project files". Also triggers automatically mid-session once a project artifact has been produced, and at session wrap-up. If a project is underway and no Drive link exists in .claude/config.yaml, this skill should run proactively without being asked.
---

# Google Drive Project

Keeps project files organized in Google Drive under `Claude Projects/`, mirroring what Claude is producing locally so nothing is lost between sessions.

## Folder structure

```
Claude Projects/
└── <Category>/            # Personal | Work | Events | Finance | Health | Travel
    └── <Project Name>/
        ├── _brief/        # Project briefs, plans, context docs
        ├── research/      # Research, analysis, notes
        ├── decisions/     # Decision logs, options analysis
        ├── deliverables/  # Finished outputs (PRDs, specs, reports)
        ├── assets/        # Images, supporting files
        └── notes/         # Session notes, scratch
```

**The Drive MCP tools need their schemas loaded before use.** At the start of any phase, call ToolSearch:
```
select:mcp__57cbe160-23c8-477f-9820-46c5e8b592cc__search_files,mcp__57cbe160-23c8-477f-9820-46c5e8b592cc__create_file,mcp__57cbe160-23c8-477f-9820-46c5e8b592cc__get_file_metadata,mcp__57cbe160-23c8-477f-9820-46c5e8b592cc__read_file_content
```

---

## Phase 1 — Init

Run at the start of a project session. Safe to re-run — always searches before creating, never duplicates.

**1. Find or create `Claude Projects/` root folder**

Search Drive for a folder named "Claude Projects". If found, record its ID. If not, create it (mimeType: `application/vnd.google-apps.folder`).

**2. Determine the category**

Infer from the project name and conversation context:

| Clues | Category |
|---|---|
| Wedding, birthday, party, trip, vacation | Events |
| Budget, expenses, taxes, investments, savings | Finance |
| Gym, health, medical, diet, fitness | Health |
| Travel itinerary, packing, flights (standalone trip) | Travel |
| Code, product, startup, work task, company | Work |
| Everything else personal | Personal |

If genuinely ambiguous after reading context, ask once: *"What category — Personal, Work, Events, Finance, Health, or Travel?"* Don't ask if it's clear.

**3. Find or create `<Category>/` inside `Claude Projects/`**

Search for it as a child of the root folder. Create if missing.

**4. Find or create `<Project Name>/`**

Search for the project folder inside the category:
- **Found**: adopt it as-is. Never restructure, rename, or add subfolders to an existing folder — it may have its own organization.
- **Not found**: create the project folder, then create these subfolders inside it: `_brief/`, `research/`, `decisions/`, `deliverables/`, `assets/`, `notes/`

**5. Write to `.claude/config.yaml`**

Add or update:
```yaml
drive_root_url: "https://drive.google.com/drive/folders/<id>"
drive_folder_id: "<id>"
drive_category: "<Category>"
```

**6. Log and confirm**

Append to `.claude/progress.md`:
```
[Drive] Initialized — Claude Projects/<Category>/<Project Name>/
```

Output to user:
```
Drive: Claude Projects/<Category>/<Project Name>/ — ready. (adopted existing / created new)
```

---

## Phase 2 — Auto-sync (mid-session)

Run when all three are true:
1. Init has run (`drive_folder_id` is in `.claude/config.yaml`)
2. At least one artifact was produced this session (a document, plan, spec, research note, decision — not just a chat message)
3. That artifact hasn't been uploaded yet (no Drive URL for it in `.claude/progress.md`)

**Artifact routing:**

| What it is | Drive subfolder |
|---|---|
| Project brief, plan, context doc, agenda | `_brief/` |
| Research, analysis, competitive notes, summaries | `research/` |
| Decision log, ADR, options doc | `decisions/` |
| PRD, spec, final report, finished deliverable | `deliverables/` |
| Images, templates, supporting files | `assets/` |
| Session notes, scratch, ideas, brainstorm | `notes/` |

For each artifact, use `create_file` with the correct parent folder ID. After upload, append to `.claude/progress.md`:
```
[Drive] Uploaded: <filename> → <drive-url>
```

Never upload `.claude/` harness files: `plan.md`, `progress.md`, `resume.md`, `decisions.md`, `config.yaml`, `progress.tsv`.

---

## Phase 3 — Wrap-up sync

Run after wrap-up Step 4.

1. Scan `.claude/progress.md` for artifacts produced this session without a Drive URL
2. Upload any missing ones (same routing as Phase 2)
3. Update `resume.md` — add or update a `## Drive` section:

```markdown
## Drive
Claude Projects/<Category>/<Project Name>/: <drive_root_url>
```

---

## Error handling

On any Drive tool failure: retry 3× with 2s → 5s → 10s backoff. If still failing after 3 retries, log `[Drive ERROR] <what failed>` to `.claude/progress.md` and continue — Drive failures never block the session. Report once to the user at the end of the phase.

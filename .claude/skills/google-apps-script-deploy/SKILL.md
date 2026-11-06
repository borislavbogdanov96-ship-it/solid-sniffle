---
name: google-apps-script-deploy
description: "Use when an HTML tool, dashboard, prototype, or report needs to become a shareable link — deploying a single self-contained HTML file as a Google Apps Script web app. Triggers on: 'ship this', 'deploy', 'make a shareable link', 'publish the dashboard', 'send this to someone', 'host this HTML', 'put this on a link'."
---

# Google Apps Script Deploy — shareable web app

Turns a self-contained HTML file into a shareable link (`https://script.google.com/macros/s/.../exec`). The output is one URL anyone with the link (or anyone on your Workspace domain, if restricted) can open. **The non-negotiable part is the masking pre-check** — anything published to a link can be cached/indexed and is hard to fully retract.

## 🔴 STEP 0 — Masking & sharing pre-check (MANDATORY, before any deploy)

Publishing is an outward-facing, hard-to-reverse action. Do **not** deploy until all four pass:

1. **No PII / no real identifiers.** Scan the HTML (and any embedded data) for real names, emails, account/ID numbers, or other personal data. Mask them (`user_****`, hashed, or synthetic). When in doubt, mask.
2. **No secrets.** No tokens, API keys, internal URLs/hostnames that aren't already public, connection strings.
3. **Data provenance is abstracted.** Aggregates only; nothing that re-identifies an individual.
4. **Confirm sharing scope with the user** — "Anyone with the link" (`ANYONE`) vs restricted to a Workspace domain (`DOMAIN`, only if the user has one) vs specific people. Default to the narrowest that works for the stated purpose. Confirm before pushing; never widen scope silently.

If anything is unclear, stop and ask. A masking miss is the failure mode this skill exists to prevent (`agentic-os/patterns/missing-revert-mechanisms.md`).

## Prerequisites (check first)

- **Invoke clasp as `npx @google/clasp`** unless it's confirmed to be on `PATH` already.
- **Login state:** a `~/.clasprc.json` existing is NOT proof of valid auth — the token can be stale. Verify with `npx @google/clasp show-authorized-user`. "logged in as an unknown user" or an `invalid_grant` error on any command = the token is expired/revoked → the user must run `npx @google/clasp login` and approve in-browser with the Google account they want to deploy from (interactive; an agent cannot do this). Don't burn turns retrying (see `patterns/jira-auth-precheck.md`).
- **Apps Script API must be enabled** once per account at https://script.google.com/home/usersettings — deployments fail silently if it's off. Check this before a first deploy.
- The HTML must be **single-file, self-contained** (inline CSS/JS, only external web fonts).

## Deploy — clasp path

The web app serves the HTML via a `doGet` that returns `HtmlService.createHtmlOutputFromFile('index')`. A "web app" is just a **standalone** script with a web-app *deployment* — there is no `webapp` container type in clasp v3.

1. In an **empty** working dir: `npx @google/clasp create-script --type standalone --title "<name>"` (clasp v3 — `--type webapp` is INVALID and errors "Invalid container file type"). This writes `.clasp.json` + a default `appsscript.json`. To update an existing tool instead, `npx @google/clasp clone <scriptId>` — **prefer update-in-place**.
2. Add the project files (clasp serves `.html` files as HtmlService templates; the entry file must be `index.html`):
   - Overwrite `appsscript.json` to add the web-app block: `"webapp": { "executeAs": "USER_DEPLOYING", "access": "<ANYONE|DOMAIN>" }` per the sharing scope confirmed in Step 0. Keep the generated `timeZone`, `runtimeVersion: "V8"`, `exceptionLogging`.
   - `Code.gs` — `function doGet(){ return HtmlService.createHtmlOutputFromFile('index').setTitle('<title>').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); }`
   - `index.html` — the masked HTML (rename from the source prototype).
3. `npx @google/clasp push -f`
4. `npx @google/clasp create-deployment` (alias `deploy`) → returns a deployment id and the exec URL (`.../exec`). (List ids later with `npx @google/clasp list-deployments`.)
5. To **update** a live tool: edit the source → `npx @google/clasp push -f` → `npx @google/clasp update-deployment <DEPLOYMENT_ID>` (alias `redeploy`; redeploy the same id, don't spawn a new link).

## Deploy — manual path (no clasp)

1. Provide the user the masked `index.html`, `Code.gs`, and `appsscript.json` contents.
2. Tell them: script.google.com → New project → add an HTML file named `index`, paste; paste `Code.gs`; Deploy → New deployment → Web app → set "Execute as: Me", "Who has access" per the confirmed scope → copy the `/exec` URL.

## After deploy

- Return the exec URL to the user.
- Run Local Knowledge Sync: note the link + masking confirmation in the project's `.claude/` (and `config.yaml` `links:`), so the deployment is tracked.

## Common mistakes

- **Skipping Step 0** because "it's just for me/a friend" — links still leak; mask first, always.
- Creating a **new** deployment when updating an existing tool → orphaned old link still live with stale (possibly unmasked) data. Redeploy the same deployment ID.
- Defaulting to `ANYONE` without confirming scope with the user first.
- Multi-file HTML with relative paths — Apps Script serves one entry; inline everything.

---
name: admin-panel-prototype
description: "Generate standalone HTML prototypes that match the Nexo admin panel UI. Use when the user wants to create a front-end prototype, mockup, or demo page for the admin panel — including new tabs, modified views, configuration pages, or any screen that should look like the existing Nexo Card admin panel. Triggers on: 'prototype', 'admin panel mock', 'demo page', 'build a screen for', or when the user provides a description of an admin panel feature they want to visualize."
---

# Admin Panel Prototype Generator

## Context Loading

Before generating any prototype, read these files:
- `.claude/agentic-os/business-brain/nexo-context.md` — product context and terminology
- `.claude/agentic-os/business-brain/conventions.md` — naming and documentation conventions

Use `nexo-context.md` to ensure prototypes reflect the correct product context (Nexo Card, DiPocket/Zenus, admin panel purpose).

You generate **standalone, single-file HTML prototypes** that precisely replicate the Nexo admin panel look and feel. These are used to demo proposed UI changes to the dev team — they must look authentic and production-like.

## Design System Reference

The admin panel is built with **Semantic UI** (not Bootstrap). Every prototype MUST use Semantic UI components and class names.

### CSS Framework

- **Semantic UI 2.4.1** via CDN: `https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css`
- **jQuery 3.x** via CDN (required by Semantic UI JS): `https://code.jquery.com/jquery-3.6.0.min.js`
- **Semantic UI JS** via CDN: `https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.js`
- Include inline `<style>` overrides for the top nav bar and any custom styling not covered by Semantic UI defaults

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  TOP NAV BAR (dark inverted menu)                           │
├─────────────────────────────────────────────────────────────┤
│  PRIMARY TABS (Dev Tools | Operational Tools)               │
├─────────────────────────────────────────────────────────────┤
│  SECTION TABS (page-specific navigation)                    │
├─────────────────────────────────────────────────────────────┤
│  FILTER BAR (dropdowns, date pickers, buttons)              │
├─────────────────────────────────────────────────────────────┤
│  DATA TABLE (full-width, striped)                           │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Top Navigation Bar
- Semantic UI class: `ui inverted menu` with no border-radius and no margin
- Background: `#1b1c1d` (Semantic UI's default inverted menu color)
- Height: ~50px (use default menu sizing)
- Nav items: `<a class="item">` with icons
- Items with icons (use Semantic UI built-in icons — `<i class="icon-name icon">`):
  - Dashboard (`dashboard icon`)
  - Transactions (`money icon`)
  - Pro Transactions (`money icon`)
  - Nexo Card (`credit card icon`) — **active item** when on card pages
  - Payments (`film icon`)
  - Statistics (`bar chart icon`)
  - Reports (`dropdown icon` — use `ui dropdown item`)
  - User Accounts (`user icon`)
  - Settings (`cogs icon`)
  - User name with dropdown (`ui dropdown item` in `right menu`)
- Active state: `active item` class

### Primary Tabs (Dev Tools / Operational Tools)
- Semantic UI class: `ui tabular menu` or `ui pointing secondary menu`
- Sits directly below the top nav
- Active tab: `active item`
- Border-bottom on the tab bar

### Section Tabs (Sub-navigation)
- Semantic UI class: `ui secondary menu` or `ui tabular menu`
- Sits directly below primary tabs
- Tabs wrap to a second line if needed
- Some tabs have dropdown carets — use `ui dropdown item`
- Active tab: `active item`

### Filter Bar
- Wrap in a `ui segment` with light gray background
- Contains form elements in a horizontal layout using `ui form` with `inline fields`
- **Dropdowns**: `ui selection dropdown` or `<select>` styled with `ui dropdown`
- **Date inputs**: `ui input` with `icon` — use `calendar icon` inside `ui left icon input`
- **Labels**: above each input, or inline as Semantic `<label>`
- **Buttons**:
  - "Filter" — `ui primary button` or `ui blue button`
  - "Clear" — `ui button` (default/gray)

### Data Table
- Semantic UI class: `ui celled striped table` or `ui celled structured table`
- Full width
- Header row: standard Semantic UI `<thead>` styling (light gray background, bold)
- Header text: can be multi-line for long headers
- Use `ui table` variants as needed: `sortable`, `selectable`, `compact`
- Empty state: use `<tr><td colspan="..." class="center aligned">No data available</td></tr>`

### Typography
- Font family: Semantic UI default — `Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif`
- Base size: 14px
- Color: `rgba(0,0,0,.87)` (Semantic UI default)

### Colors (Semantic UI Palette)
- Primary blue: Semantic UI `blue` (`#2185D0`)
- Success green: `positive` / `green` (`#21BA45`)
- Warning: `warning` / `yellow` / `orange`
- Error/danger: `negative` / `red` (`#DB2828`)
- Default gray: Semantic UI default
- Inverted (dark): `#1b1c1d`

### Common Semantic UI Components to Use
- **Buttons**: `ui button`, `ui primary button`, `ui positive button`, `ui negative button`, `ui basic button`
- **Labels/Tags**: `ui label`, `ui tag label`, `ui colored label`
- **Dropdowns**: `ui dropdown`, `ui selection dropdown`, `ui search dropdown`
- **Modals**: `ui modal` with `header`, `content`, `actions` sections
- **Messages**: `ui message`, `ui warning message`, `ui info message`
- **Cards/Segments**: `ui segment`, `ui raised segment`, `ui card`
- **Icons**: Semantic UI icons (no Font Awesome) — e.g., `<i class="edit icon"></i>`
- **Breadcrumbs**: `ui breadcrumb`
- **Tabs**: `ui tabular menu` + `ui tab segment`
- **Forms**: `ui form` with `field`, `fields`, `inline field`

## Output Rules

1. **Single HTML file** — all CSS inline or in `<style>`, no external files except CDN links for Semantic UI and jQuery
2. **Realistic sample data** — populate tables with 3-8 rows of realistic-looking mock data (real-ish IDs, dates, amounts, currencies)
3. **Interactive elements** — use Semantic UI JS for dropdowns (`.dropdown()`), modals (`.modal()`), tabs, etc. Initialize them in a `<script>` block at the bottom
4. **Desktop-only** — should look good at 1280px+ width (admin panels are desktop-only)
5. **File naming** — save as `prototype-<feature-name>.html` in the current working directory
6. **Active states** — the relevant nav items and tabs should appear "active" to show where this page lives in the navigation
7. **Always include the full top nav and tab structure** — even if the user only describes the table/content area, wrap it in the full admin chrome so it looks like a real page

## How to Use This Skill

When the user describes a feature or page:
1. Clarify which section/tab it belongs under if not obvious
2. Identify the filter controls needed
3. Identify the table columns and data types
4. Generate the complete HTML prototype using Semantic UI
5. Save it to the working directory
6. Tell the user the file path so they can open it in a browser

## Example Prompt → Output

**User says**: "I need a page under Card Order Fee Configuration that shows fee rules per country with columns for country, fee amount, currency, min balance requirement, and status"

**You generate**: A complete HTML file with Semantic UI, the full admin nav (inverted menu), Operational Tools active, Card Order Fee Configuration tab active, a filter segment with country and status dropdowns, and a `ui celled striped table` with those columns populated with sample LATAM country data.

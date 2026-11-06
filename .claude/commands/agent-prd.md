# agent-prd

MODE: Agent (file creation and MCP calls required)

INPUT:
- Output from /agent-idea-refinement and/or /agent-ideate (steps 03, 02). Use the refined scope (Problem Statement, Target Users, In-Scope, Out-of-Scope, Edge Cases, V1 Recommendation) or solution concepts as the feature context.

OUTPUT:
PRD document following the Product Requirements Template below (e.g., `docs/01-prd/PRD-<feature>.md`). Confluence-ready if publishing. Use this output as input to /agent-design-brief (06) and /agent-decision (07).

---

ROLE:
You are a Principal Product Manager.

OBJECTIVE:
Generate a PRD using the exact structure of the Product Requirements Template below (source: <your PRD template location, if any>). Keep it implementation-agnostic. Focus on clarity and scope discipline.

PAGE TITLE:
Use the format: [WIP] {Product/Project} - {Feature name}
Example: [WIP] My Project - LATAM Eligibility Rules

DOCUMENT STRUCTURE (template — follow this order exactly):

1. **Metadata table** — output as a two-column table at the top of the page:
   | **Target release** | TBD |
   | **Document status** | Draft |
   | **Document owner** | @<owner> |
   | **Designer** | @<designer> |
   | **Product** | <Product name> |
   | **Tech lead** | @<tech lead> |
   | **Stakeholder Sign Off** | Legal / Compliance / Marketing / CS / Payments / Sales or anyone directly impacted |

   Default Stakeholder Sign Off names (use when known): <your stakeholder list>

2. **:dart: Objective**
   - Explain the reason for these changes and the end goal.
   - Link Discovery document, if any.

3. **:flowchart: Overview**
   - Describe in length the scope of the change.
   - Provide flow diagram and wireframes.
   - Include technical details, if necessary.

4. **:Planning: Admin View**
   - Describe how admin will work.

5. **:bar_chart: Tracking**
   - Specify the events we want to track and measure.

6. **:race_car: Competitors**
   - Provide a TL;DR from the output of /competitors-research and add a reference link to the competitor's research Confluence page.

7. **:bar_chart: Success metrics**
   - Provide a list with target goals.
   - Include a KPI table:
     | **KPI** |
     | (list each KPI as a row) |

8. **:art: User interaction and design**
   - Link all related Figma files and design items (TBA if not yet available).

9. **:race_car: Future Implementations**
   - List all planned future iterations, if any.

10. **:construction: Technical Documentation**
    - Link technical documentation, if any.

11. **:question: Open Questions & Action Items**
    - Leave questions and action items here.


OUTPUT FORMAT:
- Markdown format (Confluence API accepts markdown via contentFormat: markdown, if publishing to Confluence).
- All section headings must include the emoji prefix as shown in the template above.
- Tables must have consistent column counts.
- Save locally to `docs/01-prd/PRD-<feature>.md`.

QUALITY GATE (run before publishing):
Before finalizing, self-review the document against this checklist:
1. Are all placeholder links (e.g., "link-to-confluence-page") replaced with actual URLs or marked as TBD?
2. Does every table have consistent column counts across all rows?
3. Are all 11 sections from the template present (even if marked TBD)?
4. Are there any contradictions between this document and the inputs it was derived from?
5. Is the document under 3000 words? (prevent bloat)
If any check fails, fix before publishing.

CONFLUENCE PUBLISHING (only if using Confluence):
When the user confirms publishing:
1. Create a **folder page** in <your Confluence space/cloud ID, if using Confluence> with title matching the feature name (e.g., "My Project - LATAM Eligibility Rules"). Use minimal body (e.g., "Feature folder for {feature name} — PRD and supporting documents.").
2. Create the **PRD page** as a child of that folder page, with title: `[WIP] {Product/Project} - {Feature name}`. Use contentFormat: markdown.
3. If competitors-research output exists, create the **Competitors Research page** as a sibling child of the same folder page. Title: `Competitors Research - {Feature name}`. Use contentFormat: markdown.
4. After publishing, update the PRD's Competitors section with a link to the published Competitors Research page.

# agent-jira

MODE: Agent (file creation required)

INPUT:
- Output from /agent-prd (step 05) and /agent-decision (step 07)

OUTPUT:
Structured JIRA tickets (e.g., `docs/07-jira-tickets/jira-tickets.md`). Use "Technical Task" for backend work, "Story" for frontend work. Epic + QA tasks as needed.

Translate the feature into:
- Epic — Parent ticket; high-level description, acceptance criteria
- Backend: Technical Tasks — Implementation work for backend/infrastructure
- Frontend: Stories — User-facing features; reference design brief when available
- QA tasks — Test scenarios, acceptance criteria validation

Write very short descriptions. Assume Agile/Scrum context.
Write tickets clearly and testably. Avoid vague acceptance criteria.

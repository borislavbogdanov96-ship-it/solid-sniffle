# Jira Auth Pre-check Before Drafting a Ticket

**Type:** process
**Trigger:** About to create a CARD Jira ticket.
**Pattern:** Drafting, then spending several tool calls trying to authenticate — `JIRA_EMAIL`/`JIRA_API_TOKEN` unset and Jira MCP tools not found — before falling back to manual creation.
**Guardrail:** Pre-check availability first: try `ToolSearch` with just "jira"; if no MCP tools surface and env vars are unset, skip the API path entirely and produce copy-paste-ready ticket content formatted for manual creation.
**Seen:** Provisioning-email ticket (2026-04-09). Encoded in the `jira-ticket-creator` skill backlog.

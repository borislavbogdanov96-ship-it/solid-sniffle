# Vendor Surprises

**Type:** risk
**Trigger:** Spec'ing or building against an external vendor/partner/API from their documentation alone.
**Pattern:** The partner's real behavior diverges from the docs — undocumented API sequencing, webhook quirks, identifier/logic differences, capability differences between providers. Assumptions baked into the spec surface as rework late.
**Guardrail:** Before finalizing, verify the *mechanism* — actual API/webhook sequence, identifier logic, and per-provider differences. Prefer a screenshot/contract/test call over the marketing doc. Capture findings in a vendor deep-dive. Confirm capabilities differ per provider rather than assuming parity.
**Seen:** Generalized from prior work-context investigations where the real identifier/sequencing logic diverged from vendor docs.

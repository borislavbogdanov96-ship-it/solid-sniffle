# Vendor Surprises

**Type:** risk
**Trigger:** Spec'ing or building against a payments/banking/crypto partner (DiPocket, Zenus, Checkout, Snowdrop, etc.) from their documentation alone.
**Pattern:** The partner's real behavior diverges from the docs — undocumented API sequencing, webhook quirks, per-program (not per-BIN) logic, capability differences between issuers. Assumptions baked into the spec surface as rework late.
**Guardrail:** Before finalizing, verify the *mechanism* — actual API/webhook sequence, identifier logic (program vs BIN), and per-issuer differences. Prefer a screenshot/contract/test call over the marketing doc. Capture findings in a vendor deep-dive. Confirm capabilities differ per issuer rather than assuming parity.
**Seen:** MiCA DiPocket flow (2026-04-09), BIN split fallback (2026-05-21) — programs are the primary identifier, not BIN+manufacturer.

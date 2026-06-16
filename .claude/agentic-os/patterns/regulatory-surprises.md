# Regulatory Surprises

**Type:** risk
**Trigger:** A feature touching multiple jurisdictions, currencies, or regulated providers (different regions, licensing regimes, KYC tiers).
**Pattern:** A jurisdiction/licensing/currency constraint surfaces late and invalidates part of the design — e.g. a flow legal in one region but not another, a currency distinction missed, a compliance tier not accounted for, a KYC-country vs residence mismatch.
**Guardrail:** Surface the regulatory frame up front — which jurisdictions, which provider per region, which currencies, which compliance tier. Make jurisdiction/currency explicit columns in any segment or limits table. When in doubt, flag for compliance before building.
**Seen:** Generalized from a prior work-context investigation involving a cross-region migration where a KYC-country filter mismatch and a missing currency distinction were real edge cases surfaced by gap analysis.

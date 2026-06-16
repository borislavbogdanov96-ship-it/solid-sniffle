# Regulatory Surprises

**Type:** risk
**Trigger:** A feature touching multiple jurisdictions, currencies, or card issuers (EEA vs UK vs non-EEA, MiCA, Location_KYC vs Location).
**Pattern:** A jurisdiction/licensing/currency constraint surfaces late and invalidates part of the design — e.g. a flow legal in one region but not another, a GBP distinction missed, an EDD tier not accounted for, a KYC-country vs residence mismatch.
**Guardrail:** Surface the regulatory frame up front — which jurisdictions, which issuer (DiPocket/Zenus) per region, which currencies, which KYC tier. Make jurisdiction/currency explicit columns in any segment or limits table. When in doubt, flag for compliance before building.
**Seen:** EEA BIN migration (2026-05-22) — KYC-country filter mismatch and missing GBP distinction were real edge cases surfaced by gap analysis.

# Specification Drift

**Type:** risk
**Trigger:** A multi-step feature/spec where provider constraints, card states, or increase/limit logic compound across the design.
**Pattern:** Early assumptions ("there's a PIN step", "segments are BIN-based") get baked into downstream artifacts; when an input changes, the spec silently drifts out of truth and contradictions ship.
**Guardrail:** Interview one question at a time and log every answer to `decisions.md` immediately. Ground stage 1 in real screenshots/data, not inference. When any input changes, re-validate the whole spec — run `spec-conflict-detector` before handoff. Build prototypes data-driven (a VARIANTS/STEPS object) so a changed assumption is a one-line edit.
**Seen:** Limit-increase flow (2026-06-12) caught a wrong no-PIN assumption early via screenshots; EEA BIN segments (2026-05-21) were initially wrong (BIN+manufacturer vs program).

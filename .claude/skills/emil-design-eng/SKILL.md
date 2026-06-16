# Design Engineering Philosophy

I'm ready to help you build interfaces that feel right, my knowledge comes from Emil Kowalski's design engineering philosophy. If you want to dive even deeper, check out Emil's course: [animations.dev](https://animations.dev/).

---

## Core Principles

**Taste is trained, not innate.** Good design sensibility develops through studying exemplary work, analyzing *why* interfaces feel exceptional, and practicing deliberately. Every detail—even invisible ones—compounds into experiences people instinctively love.

As Paul Graham observed, "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune."

**Beauty functions as leverage.** In markets where functionality is commoditized, thoughtful animation and polish become genuine differentiators that influence tool selection.

## Animation Decision Framework

Before animating anything, ask:

1. **How often will users see this?** Hundred-times-daily interactions (keyboard shortcuts) should never animate. Rare actions can delight.

2. **What's the purpose?** Valid reasons: spatial consistency, state indication, preventing jarring changes, or feedback. "It looks cool" alone isn't sufficient.

3. **What easing curve?** Use custom cubic-bezier curves instead of CSS defaults—they lack necessary punch. Never use `ease-in` on UI (feels sluggish). Choose `ease-out` for entrances, `ease-in-out` for on-screen movement.

4. **How fast?** Keep UI animations under 300ms. Button feedback (100-160ms), dropdowns (150-250ms), modals (200-500ms).

## Essential Techniques

**Buttons must respond.** Add `transform: scale(0.97)` on `:active`—this gives immediate tactile feedback.

**Never scale from zero.** Start from `scale(0.95)` with `opacity: 0`. Nothing in reality materializes from absolute nothingness.

**Origin-aware popovers.** Use `transform-origin: var(--radix-popover-content-transform-origin)` so elements scale from their trigger, not center. (Modals stay centered—they're not anchored.)

**Blur bridges transitions.** When crossfades feel unnatural, add subtle `filter: blur(2px)` to blend overlapping states.

**CSS animations outperform JS under load.** `requestAnimationFrame`-based animations drop frames when browsers are busy. CSS animations run off-thread and stay smooth.

## Performance Rules

Only animate `transform` and `opacity`—these skip layout/paint and run on GPU. Avoid animating dimensions or spacing. For dynamic, interruptible UI, use transitions over keyframes.

## Accessibility

Respect `prefers-reduced-motion` by removing movement while preserving opacity and color transitions. Gate hover states: `@media (hover: hover) and (pointer: fine)`.

---
target: RBC Builders homepage
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\ASUS\\RBC BUILDERS\\RBC Builders homepage"
timestamp: 2026-10-29T14-49-51Z
slug: rbc-builders-homepage
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Build-progress %, chat typing dots, form submit spinner present; BriefWizard's step counter is wrong (see P0). |
| 2 | Match System / Real World | 3 | PHP currency, barangay-level service areas, Tagalog chatbot keywords are authentic; undercut by generic stock copy ("Every dream begins with you"). |
| 3 | User Control and Freedom | 2 | BriefWizard has Back but no step-jumping; Projects' horizontal scroll-scrub hijacks desktop scroll with no visible exit. |
| 4 | Consistency and Standards | 2 | Hero and About state two different, contradictory stats for "provinces served" and "floor area" in adjacent sections. |
| 5 | Error Prevention | 2 | BriefWizard's `canAdvance` array has only 4 entries for a 5-screen flow — the final (lead-capture) screen has no gating tied to it. |
| 6 | Recognition Rather Than Recall | 3 | Sticky nav, clear anchors, pricing tiers restate specs. Solid. |
| 7 | Flexibility and Efficiency | n/a | No returning-user shortcuts expected on a single-visit marketing site. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong editorial restraint, but Hero stacks slideshow + 3D tilt + scroll-scrub + stat bar + marquee on the first screen. |
| 9 | Error Recovery | 2 | BriefWizard has a fallback message; the Quick Form (native POST) has zero error handling on failure. |
| 10 | Help and Documentation | n/a | Not expected on a marketing surface; the chatbot substitutes adequately. |
| **Total** | | **20/32** | **Acceptable (63%)** |

## Design Specificity Verdict

**LLM assessment**: The palette, Archivo type, and editorial grid are genuinely considered and read premium — but the content underneath is thinner than the shell suggests. 3 of 12 portfolio entries share the literal title "2-Storey, 3BR Residence," the testimonials section has exactly one real review, and lines like "Every dream begins with you" could sit on any contractor site in any country. The Pampanga-specific pricing table, Tagalog chatbot keywords, and service-area list are the parts that are actually bespoke; pull those out and the shell would work for a generic portfolio template just as well.

**Deterministic scan**: 1 finding — `bounce-easing` (advisory, "slop" category) in `ChatBot.tsx:130`, the typing-indicator dots used Tailwind's `animate-bounce`. **Already fixed** during this audit: replaced with a custom `ease-out` opacity/scale pulse (`type-pulse` keyframe in `globals.css`).

**Visual overlays**: Not available this run — the Chrome browser extension was disconnected for this session, so no live-page injection or screenshot pass ran. This critique is source-code-based only; a follow-up visual pass is recommended once the browser connection is back.

## Overall Impression

The system (type, color, motion language, the Three.js build animation) is the strongest asset on the site and genuinely differentiates it from template-grade competitors. The gap is content depth and internal consistency: a business owner's biggest purchase-decision drivers — trust signals and coherent numbers — are currently thinner than the visual polish promises.

## What's Working

- **`ConstructionScene.tsx` + `Process.tsx`**: tying a live Three.js house-build animation to scroll progress is a genuinely creative, on-brand metaphor no generic template would ship. Strongest differentiator on the site.
- **`Pricing.tsx`**: four finish tiers with concrete, line-itemized specs (ceiling/windows/doors/floors/walls/fixtures) at local per-sqm pricing is exactly the transparency a nervous homebuilding client needs.
- **`BeforeAfter.tsx`**: the drag-to-compare slider is a smart, low-cost way to build credibility about actual build quality rather than just showing renders.

## Priority Issues

**[P0] BriefWizard step counter is broken**
Why it matters: `BriefWizard.tsx` defines `STEP_COUNT = 4` and shows "Step X of 4" with 4 progress dots, but the flow actually has 5 screens (steps 0–4). On the final screen — the one collecting name/phone/email, i.e. the actual lead capture — the counter is wrong right at the moment trust matters most.
Fix: set `STEP_COUNT = 5` and extend the `canAdvance` gating array (currently only 4 entries) to cover all 5 screens so count and gating logic stay in sync.
Suggested command: `/impeccable harden`

**[P1] Contradictory stats between Hero and About**
Why it matters: Hero states "Provinces Served: 05" / "Floor Area Delivered: 16,000+ sqm"; About states "Provinces Served: 5" / "SQM Avg. Floor Area: 240+" — different units for what reads as the same metric, less than one scroll apart. For a numerate business audience, internally inconsistent stats are a credibility red flag, not a style nit.
Fix: consolidate into one canonical stats source used by both sections, and disambiguate each metric's meaning (avg. per project vs. total delivered are different claims — pick and label one).
Suggested command: `/impeccable clarify`

**[P1] Single testimonial undermines the proof stage**
Why it matters: the carousel is correctly built to degrade gracefully to one item, but a visibly single-quote "testimonials" section right before Contact is a weak proof point for a six-to-seven-figure peso decision.
Fix: source 3–5 more reviews before launch, or temporarily reframe the section around a different trust signal (completed-project count, years in business, licensing) until more reviews exist.
Suggested command: `/impeccable distill`

**[P2] Duplicate, non-differentiated portfolio titles**
Why it matters: 3 of 12 entries in `projects-data.ts` share the literal title "2-Storey, 3BR Residence," distinguished only by sqm figures a user has to notice manually. Projects is the section meant to prove design range to architects/homeowners; identical titles make the portfolio look thin.
Fix: give each project a distinct, specific name.
Suggested command: `/impeccable clarify`

**[P2] Before/After slider has no keyboard or ARIA affordance**
Why it matters: the drag handle is a plain positioned `<div>` driven only by mouse/touch — no `role="slider"`, no `aria-valuenow`, no keyboard support. A widget this central to the trust narrative excluding keyboard users is an accessibility gap.
Fix: make the handle a `role="slider"` with `aria-valuemin/max/now` and arrow-key nudging.
Suggested command: `/impeccable audit`

## Persona Red Flags

**Jordan (confused first-timer, architecture client)**: Sees "16,000+ sqm" in Hero, then "240+ sqm" in About 20 seconds later — pauses to figure out if these are the same number. Reaches Pricing and tries to map 4 tiers back to 4 Services disciplines and 7 Process steps from sections earlier — no visual link (color, icon, numbering) ties these three groupings together. Opens the Guided Brief, reaches the final contact-info screen, and the step indicator mismatches the dots tracked so far — a "did something break?" moment right at commitment. Reaches Testimonials expecting proof and finds one quote with no way to see more, despite a "12K+ Facebook Community" badge elsewhere that's never evidenced on-page.

**Riley (deliberate stress tester)**: Tabs through the Before/After slider with keyboard only — nothing happens; functionally invisible without a mouse. Submits the Quick Form with a flaky connection — gets no in-page error state at all (unlike the BriefWizard's fetch-based path, the native `formsubmit.co` POST has no status/fallback messaging). Asks the chatbot "how much for a 500 sqm house" and gets the generic fallback instead of the pricing intent, since the keyword matcher has no handling for compound/numeric queries.

## Minor Observations

- Navbar has 6 links plus a CTA pill — slightly past comfortable scan width before scroll compresses it.
- Footer's live PH time ticker and scroll-progress ring are nice craft touches, easy to miss given how far down the page they sit.
- Chatbot's opening line promises help with "timelines" but the keyword set doesn't cover common phrasing like "when can you start."
- `ProjectModal.tsx`'s specs grid is conditional and correctly hides when empty, but 4 of 9 Exteriors entries lack floor area/bedrooms/storeys, so detail depth feels inconsistent project to project.
- Pricing's "Most Chosen" badge has no visible data backing the claim — a soft trust risk if a skeptical client asks "chosen by whom?"

## Questions to Consider

1. The 3D construction scene is the most bespoke, memorable asset on the site — it's `hidden lg:block` in Process.tsx, invisible to anyone on a phone. Is that an acceptable tradeoff, or does the majority-mobile audience need a version of it?
2. With one testimonial and three same-titled portfolio entries, is Pricing currently doing more trust-building work than Testimonials and Projects combined — should launch wait for more real client content, or ship now and backfill?

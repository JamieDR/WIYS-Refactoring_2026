# Session 6 — February 15, 2026
## Reference Slide Markers + MSN Rules

### What Happened
Jamie identified that MSN has strict rules around reference hyperlinks in slideshows that the current system doesn't enforce:

1. **Max 1 hyperlink per content slide** — MSN forbids more than one reference link per slide
2. **Only slides 5 through second-to-last** — no references in intro slides (1-4) or the final slide
3. **News articles only** — already enforced in code (references array is empty for non-news)

### The Plan
Jamie is updating the Claude prompts (Prompt 1 = rules, Prompt 2 = HANDOFF format) to include slide numbers in the reference output.

**Current reference format** (no slide info):
```
1. context phrase | anchor text | URL
2. context phrase | anchor text | URL
```

**New format** (with slide markers):
```
Slide 5 -- 1. context phrase | anchor text | URL
Slide 8 -- context phrase | anchor text | URL
Slide 10 -- context phrase | anchor text | URL
```

### Code Changes Needed (not yet implemented)
Three functions in `src/main.gs` need updates:
- `parseReferences()` (~line 3552) — parse `Slide X --` prefix, extract slide number
- `createSlideshowContent()` (~line 3603) — apply references to specific slides only, enforce MSN rules
- `applyReferencesToContent()` (~line 3583) — no changes needed

Added as TODO #12 in `docs/TODO.md`.

### Bug Fix: Month Abbreviations Breaking Sentence Splitter
Jamie found an unmatched reference ("largest immigration enforcement operation") caused by the sentence splitter treating "Jan." as a sentence ending. The text "On Jan. 6, 2026, DHS announced..." was being split into two paragraphs at "Jan.", which broke the reference matching since the context phrase spanned the break.

**Root cause:** The abbreviation protection list in `formatContentWithLineBreaks()` (~line 4006) had titles, places, states, and business abbreviations — but no month abbreviations.

**Fix:** Added `Jan`, `Feb`, `Mar`, `Apr`, `Jun`, `Jul`, `Aug`, `Sep`, `Sept`, `Oct`, `Nov`, `Dec` to the protection list. (`May` excluded — it's never abbreviated with a period.)

**How Jamie found it:** Spotted the paragraph break in the WordPress draft preview, connected it to the unmatched reference warning, and traced it back to the period handling. Good debugging instinct.

### Jamie's Progress
- Proactively identified the MSN compliance gap
- Already editing both Claude project prompts independently
- Good instinct: updating the AI instructions AND the code together so the whole pipeline stays in sync
- Diagnosed the month abbreviation bug by reading the WordPress output and connecting it to the unmatched reference error — solid cause-and-effect reasoning

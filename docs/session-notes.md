# Session Notes — Live Scratchpad

## Current Work: Automated Reference Links in Articles

### What We're Building
Automated pipeline to add hyperlinked references to WordPress articles:
1. Research prompt (Prompt 1) finds and verifies primary source URLs
2. Article writer prompt (Prompt 2) picks exact phrases + short anchors for each URL
3. Code in GAS applies hyperlinks in Google Docs during "Create GDoc" step
4. "Paste Article Sections" preserves hyperlinks
5. WordPress upload outputs `<a>` tags, external links get `rel="nofollow"`

### Design Decisions Made
- **Links only in slides 5 through second-to-last** (never slides 1-4 or last slide)
- **Primary sources only** (government sites, official orgs, not news articles reporting on them)
- **Verify URLs are live** (no 404s, 403s, etc.) — done in research phase
- **3-part reference format** in Prompt 2: `full phrase from article | anchor word(s) | url`
  - Full phrase = unique locator (full sentence/clause from the article)
  - Anchor = 1-3 words within that phrase that get hyperlinked
  - URL = the verified source
- **Prompt 1 format** is simpler: `source description | url` (article doesn't exist yet)
- **External links get nofollow**, wheninyourstate.com links don't
- **Max 5-8 references per article**, don't force them
- **No Claude API used** — the writing model picks the anchors, code just applies them
- **First occurrence only** if anchor appears multiple times (SEO best practice)

### Where We Left Off
About to write the **final clean versions** of both prompt additions:
1. Additions to Prompt 1 (Research/Outline) — REFERENCES section in OUTPUT 2
2. Additions to Prompt 2 (Article Writer) — REFERENCE RULES, updated output format, updated sample article, updated self-check

Jamie said "yes" to writing the final clean versions.

### Prompt Changes Summary
**Prompt 1 additions:**
- Add REFERENCES list to OUTPUT 2 (after PLACE TO VISIT, before "Handoff ready")
- Add REFERENCE RULES: primary sources only, verify live URLs, 3-8 per article
- Update "Handoff ready" line

**Prompt 2 additions:**
- Add REFERENCES to FORMATTING section
- Add REFERENCE RULES section (3-part format: phrase | anchor | url)
- Add self-check item #14
- Update OUTPUT section to include REFERENCES after TAGS
- Update sample article to include example REFERENCES

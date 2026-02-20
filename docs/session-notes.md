# Session Notes — Live Scratchpad

## NEXT SESSION PRIORITY: Teach Jamie Git
Jamie wants to learn how to do git commits and pushes himself instead of Claude doing them. This is the "areas to develop" item that's been in every session log since Session 1. Jamie is ready.

**Start here:** Hands-on walkthrough in the Codespace terminal — `git status`, `git add`, `git commit`, `git push`. Use real changes, not practice exercises. Have Jamie do the actual commits for whatever work happens in the session.

---

## Lock/Unlock System — Status as of Feb 20, 2026

### Current State
- `setupLockSchedule()` creates time-based triggers for `lockWorksheet()` and `unlockWorksheet()`
- `removeLockSchedule()` clears all lock/unlock/verification triggers
- Both are in the Editing menu for manual use too
- `checkLateEdits` is **disabled** in the unlock function — re-enable once lock/unlock is confirmed stable
- `sendLockUnlockAlert()` emails jlcdelosreyes and workflow on failures
- Staggered verification triggers re-check lock state after a delay

### Team Editors in CONFIG
lara, naintara, charl, marie, plus James (protected — never locked out)

### To Re-enable Late Edit Detection
Uncomment the `checkLateEdits()` call inside `unlockWorksheet()`. It cross-references WP drafts against the editing tracker to flag articles that weren't published before the lock.

---

## Reference Hyperlink System — Status as of Feb 20, 2026

### What's Built (code complete)
- `parseReferences()` — parses `Slide X -- context | anchor | url` format
- `applyReferencesToContent()` — fuzzy phrase matching + partial anchor fallback
- `createSlideshowContent()` — applies references per-slide with MSN rules (slides 5 to second-to-last, max 1 per slide)
- Error messages use `ref error:` prefix, ESL-friendly wording, context snippets

### What's Pending (Jamie's side)
- Final clean versions of prompt additions for Prompt 1 and Prompt 2
- Jamie said "yes" to writing them but hasn't confirmed they're done yet

### Prompt Changes Summary
**Prompt 1 additions:**
- Add REFERENCES list to OUTPUT 2 (after PLACE TO VISIT, before "Handoff ready")
- Add REFERENCE RULES: primary sources only, verify live URLs, 3-8 per article

**Prompt 2 additions:**
- Add REFERENCES to FORMATTING section
- Add REFERENCE RULES section (3-part format: `Slide X -- phrase | anchor | url`)
- Add self-check item #14
- Update OUTPUT section to include REFERENCES after TAGS

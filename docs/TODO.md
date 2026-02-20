# WIYS — Pending Tasks

Organized easiest → hardest for quick wins first. Updated Feb 15, 2026.

---

# Quick Wins (tiny changes, minutes each)

## 1. Edit blue background shade in Topic List sheet
**Sheet:** Topic List
**Difficulty:** Trivial — one hex color change
**What:** Change the blue background color shade used in the Topic List sheet. (Jamie to specify exact shade/hex.)

## 2. Replace double quotes with single quotes in titles during upload
**Sheet:** Uploader (auto-edit on upload)
**Difficulty:** Trivial — one `.replace()` call
**What:** During the auto-edit of titles upon upload, change double quotation marks (`"`) to single quotes (`'`). MSN doesn't allow double quotes in titles, so they need to be converted before publishing.
**Where:** In whatever function handles title cleanup/auto-editing before the WordPress upload.

## 3. Auto-set status to "WordPress Draft" when transferring from AST to WET
**Sheets:** Article Status Tracker (AST) → WP Editing Tracker (WET)
**Difficulty:** Trivial — one `setValue()` call in the transfer function
**What:** When articles are transferred from AST to WET, the status in WET should automatically be set to "WordPress Draft" — instead of requiring manual status entry.

## 4. Fix HTML-encoded punctuation in WP Editing Tracker titles
**Sheet:** WP Editing Tracker (WET)
**Difficulty:** Easy — add a decode step when pulling titles
**What:** When pulling article titles into WET, some punctuation marks are showing up as HTML entities instead of the actual characters (e.g., `&amp;` instead of `&`, `&#8217;` instead of `'`, `&quot;` instead of `"`).
**Fix needed:** Decode HTML entities in titles when transferring/pulling them into WET so they display as normal punctuation.

## 5. Delete Done in ED sheet — don't touch column A
**Sheet:** Enhanced Drafter (ED)
**Difficulty:** Easy — adjust the delete range to skip column A
**What:** When running "Delete Done" on the ED sheet, it should leave column A alone (don't clear/delete values in column A).

## 6. Delete Done in Topic List — don't touch column A
**Sheet:** Topic List
**Difficulty:** Easy — same principle as #5 but on a different sheet
**What:** When running "Delete Done" on the Topic List, leave column A alone.

---

# Medium Tasks (some logic, but straightforward)

## 7. ~~Move Topic List working rows to start at row 3~~ ✅ DONE
**Sheet:** Topic List
**Done:** Jamie moved data to row 3 in the sheet. Code updated in `splitter()`, `onTopicListEdit()`, and `transferToEnhancedDrafter()` to read/write from row 3. `deleteDoneRows()` deferred — will update when doing Delete Done fixes (#5, #6) across all sheets.

## 8. Transfer to Enhanced Drafter — randomize article type distribution
**Sheet:** Transfer to Enhanced Drafter
**Difficulty:** Medium — add shuffle logic to existing transfer function
**What:** When transferring articles to ED, organize them in a random mix so there is even distribution of article types across team members. Not all the same type grouped together — shuffle them.

---

# Bigger Tasks (new features or significant rewrites)

## 9. Fix slow boundary-finding in Delete Successful Uploads
**Sheet:** Uploader (AST)
**Difficulty:** Hard — full rewrite of boundary scanning logic (was attempted and reverted once)
**Problem:** Three compounding issues:
- `findWorkspaceBoundaries()` scans row by row (~1m45s per scan for JAMIE at row 713)
- It re-scans boundaries **for every single delete** (because row numbers shift after deleteRows)
- It also re-scans the workspace each time to find the next target
- Result: 4 minutes of scanning to delete 1 of 3 articles. Would take 6+ minutes for 3 articles.
**Fix needed:**
1. Bulk-read all of column A in one `getValues()` call, find boundaries instantly in memory
2. Find ALL delete targets in one pass (already does this, but then throws it away)
3. Delete bottom-to-top from cached positions, adjusting row offsets in memory instead of re-scanning
4. Should be: 1 bulk read → find boundaries → find targets → delete all in ~5 seconds total
**Note:** The optimized delete function was reverted — the old (slow but working) version is currently live. Needs a fresh rewrite.

## 10. WP Editing Tracker — "Get WordPress Drafts" feature
**Sheet:** WP Editing Tracker
**Difficulty:** Hard — new menu item + new function with multiple steps
**What:** New feature for the Editing menu:
- When user chooses "Get WordPress Drafts" (or similar menu item), show a prompt asking **how many articles** they want
- Pull articles from **row 56 and below** that have WordPress Draft status
- Transfer them to the working area starting from **row 5**
- **Mix them randomly** so different article types are spread out for the day's publishing
- In **column E**, number them appropriately (1, 2, 3, etc.)

## 11. Facebook social media post system (per-state, from scratch)
**Platform:** Facebook (per-state pages — 50 total)
**Runs in:** GAS (integrated into the spreadsheet system)
**Who posts:** Jamie only
**Content sources:** Existing articles, new articles, and original social-only content
**Post types:** Mixed — link shares, image posts, text posts (varies)
**Difficulty:** Large — new sheet, new Drive structure, new GAS functions, Claude AI for captions, eventually FB API

### Phase A: Content pipeline + manual posting (START HERE)
Test with a few states first, then scale to all 50.
1. **Drive folder tree** — `Social Media / [State Name] /` for images
2. **New "Social Media" sheet tab** with columns:
   - State (dropdown) | Post Type (dropdown) | Source Article URL | Caption | Image URL | Article Link | Status (Draft/Ready/Posted) | Date Posted | Notes
3. **Claude AI caption generator** — GAS function takes an article URL, generates a Facebook caption
4. **Workflow:** Jamie prepares content in sheet → manually posts to Facebook → marks "Posted"

### Phase B: Facebook API automation (LATER)
Once content pipeline is proven and working:
1. Create Facebook App at developers.facebook.com (free)
2. Generate Page Access Tokens for each state page (permanent tokens, one-time setup)
3. Store tokens in GAS Script Properties
4. GAS function reads "Ready" rows → posts via FB Graph API → marks "Posted"
5. Uses `pages_manage_posts` permission (no full App Review needed for pages you admin)

**Start small:** Pick 3-5 test states, build Phase A, prove the workflow, then scale + add API.

## 12. Add slide markers to reference hyperlink system (MSN rules)
**Sheet:** Uploader (WordPress upload) + Enhanced Drafter (prompt output)
**Difficulty:** Medium — update 2 functions + coordinate with updated Claude prompts
**What:** MSN has strict rules about reference hyperlinks in slideshows:
- **Max 1 hyperlink per content slide** — MSN forbids more than one reference link per slide
- **Only slides 5 through second-to-last** — no references in intro slides (1-4) or the final slide
- **News articles only** — no references for other article types (already enforced)

**Current format** (no slide info): `1. context phrase | anchor text | URL`
**New format** (with slide markers): `Slide 5 -- context phrase | anchor text | URL`

**Prompt changes (Jamie handling):**
- Prompt 1 (rules): Updated with MSN reference rules and slide range instructions
- Prompt 2 (HANDOFF): Updated with `Slide X --` format example

**Code changes needed:**
1. `parseReferences()` (line ~3552) — parse `Slide X --` prefix to extract slide number, return `{slideNum, context, anchor, url}`
2. `createSlideshowContent()` (line ~3603) — apply each reference only to its designated slide number instead of scanning all slides; enforce slide 5 to second-to-last range and 1-per-slide limit
3. `applyReferencesToContent()` (line ~3583) — no changes needed (context + anchor matching still works)

## 13. Improve batch progress notifications (toasts not visible enough)
**Sheet:** Uploader (all Prep for Upload batch functions)
**Difficulty:** Medium-hard — needs discussion first, then changes across all batch functions
**Problem:** Toast notifications are too easy to miss — they're small, disappear after 10 seconds, and can't show pop-up dialogs when running from auto-continue triggers (GAS limitation).
**Discuss:** Options include writing batch status to a dedicated cell on the sheet, or other approaches. Need to figure out the best solution before implementing.

---

# Non-Code Tasks (Jamie to do in browser)

## 14. Whitelist Bingbot in Cloudflare
**System:** Cloudflare (free plan)
**What:** Cloudflare was blocking Bingbot, which hurts SEO (Bing can't crawl the site). Cloudflare temporarily disabled protection to fix it, but Jamie needs to add a proper whitelist rule.
**How:** Add a user-agent or verified bot IP exception for Bingbot. Since all 5 custom rules are used on the free plan, this likely means editing an existing rule to include the exception.

## 15. Re-enable Breeze caching plugin (with adjusted settings)
**System:** WordPress (Cloudways)
**What:** Breeze plugin was causing images to not appear in articles. It was disabled to fix the issue. Likely cause: lazy loading or CDN URL rewriting breaking image paths.
**Action needed:**
- Re-enable Breeze
- Disable lazy loading for images (or test with it off)
- Check CDN URL rewriting settings
- Verify images appear correctly after re-enabling
**Why it matters:** Without caching, every visitor gets served directly from the server — slower page loads and more server load.

---

# URGENT — Ahead of Refactoring

## Merge second codebase into WIYS workflow sheet
**Priority:** High — Jamie flagged as urgent (Feb 17, 2026)
**What:** Another Apps Script codebase on a separate spreadsheet needs to be merged into the main WIYS workflow sheet.
**Status:** Not yet scoped — need to understand what the other codebase does, how big it is, and what "merge" means (code only, sheet tabs, or both).
**Next step:** Jamie to share the other spreadsheet/codebase so we can assess scope and plan the merge.

---

# Backlog (Parked for Later)

## 17. Tag taxonomy cleanup — synonym/reuse problem
**System:** WordPress tags + Claude web prompts
**Problem:** 27,430 WordPress tags. Your team's tags are clean but never reused (e.g., "Oregon waterfalls" on one article, "Oregon cascades" on another). Tags are generated by Claude during article writing in Claude web — not in our codebase. The Read More function uses tags for relevance, so poor tag reuse = poor related article suggestions.
**Fix options (not yet decided):**
- Update Claude web prompts to pick from a controlled tag vocabulary
- Build a master tag list sheet and have the code map freeform tags to approved ones
- Or both
**Also:** Other team is dumping 15+ hashtag-style tags per article. Their boss has been notified. Code now skips `#` tags (committed Feb 17).

## 18. Batch Schedule — support republishing published articles
**Sheet:** WP Editing Tracker (batch schedule)
**Difficulty:** Medium — URL parsing + slug modification + WP API call
**Problem:** `batchSchedulePosts()` relies on `extractPostIdFromUrl()` to get the WP post ID from the URL in column D. That function handles draft/admin URLs (e.g., `post.php?post=123&action=edit`) but NOT published frontend URLs (e.g., `wheninyourstate.com/some-article-slug/`). Published URLs use a text slug, not a numeric ID, so the function returns null and skips them.
**Why it's needed:** Sometimes articles don't make it through to MSN and need to be republished. The workflow would be: put the published URL in the sheet, batch schedule picks it up, reschedules it with a new date, and appends `-rep` to the slug so MSN sees it as a new article.
**What's needed:**
1. `extractPostIdFromUrl()` needs to handle published URLs — either look up the post ID via the WP REST API using the slug (e.g., `GET /wp/v2/posts?slug=some-article-slug`), or extract the slug and resolve it to an ID
2. The batch schedule function needs a "republish" path: detect that a post is already published, change its slug by appending `-rep`, and reschedule it to the new date
3. Consider edge cases: what if `-rep` is already appended (second republish)? Use `-rep2`, `-rep3`? Or always just `-rep`?
**Depends on:** Nothing — can be done independently

## 19. Improve code navigation — organize functions when splitting monolith
**System:** Codebase (Phase 5)
**What:** When the monolith gets split into separate `.gs` files in Phase 5, organize functions logically within each file (alphabetical within logical groups). This replaces the idea of alphabetizing the current single file, which would destroy git blame history and create an unreviewable diff.
**When:** Phase 5 (monolith split).

## 20. Config sheet — visual map of all CONFIG values and sheet dependencies
**System:** New sheet tab in the spreadsheet
**What:** A visual reference showing CONFIG values organized by sheet name — column mappings, which functions touch each sheet, dependencies between sheets, WordPress IDs, endpoints. Jamie is a visual learner; this replaces digging through code to understand the system.
**When:** After Phase 3 (column mappings) — the config will be more stable by then.

---

# Learning / Discussion

## 16. Teach Jamie the optimization logic behind fast batch functions
**Type:** Knowledge transfer / learning session
**What:** Walk Jamie through WHY the new Prep for Upload batch functions are so much faster than the old Python versions. Key concepts to cover:
- Bulk reads (`getValues()` on entire columns = 1 API call vs cell-by-cell = hundreds of calls)
- `getFoldersByName()` (targeted Drive search) vs `getFolders()` (iterating every folder in parent)
- Searching in memory (arrays) after bulk read vs reading from the sheet for each check
- The general principle: minimize API calls, do work in memory, write results back in bulk

---

*Each item needs discussion/approval before implementation.*

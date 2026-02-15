# WIYS — Pending Tasks

Organized easiest → hardest for quick wins first. Updated Feb 14, 2026.

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

## 12. Improve batch progress notifications (toasts not visible enough)
**Sheet:** Uploader (all Prep for Upload batch functions)
**Difficulty:** Medium-hard — needs discussion first, then changes across all batch functions
**Problem:** Toast notifications are too easy to miss — they're small, disappear after 10 seconds, and can't show pop-up dialogs when running from auto-continue triggers (GAS limitation).
**Discuss:** Options include writing batch status to a dedicated cell on the sheet, or other approaches. Need to figure out the best solution before implementing.

---

# Non-Code Tasks (Jamie to do in browser)

## 13. Whitelist Bingbot in Cloudflare
**System:** Cloudflare (free plan)
**What:** Cloudflare was blocking Bingbot, which hurts SEO (Bing can't crawl the site). Cloudflare temporarily disabled protection to fix it, but Jamie needs to add a proper whitelist rule.
**How:** Add a user-agent or verified bot IP exception for Bingbot. Since all 5 custom rules are used on the free plan, this likely means editing an existing rule to include the exception.

## 14. Re-enable Breeze caching plugin (with adjusted settings)
**System:** WordPress (Cloudways)
**What:** Breeze plugin was causing images to not appear in articles. It was disabled to fix the issue. Likely cause: lazy loading or CDN URL rewriting breaking image paths.
**Action needed:**
- Re-enable Breeze
- Disable lazy loading for images (or test with it off)
- Check CDN URL rewriting settings
- Verify images appear correctly after re-enabling
**Why it matters:** Without caching, every visitor gets served directly from the server — slower page loads and more server load.

---

# Learning / Discussion

## 15. Teach Jamie the optimization logic behind fast batch functions
**Type:** Knowledge transfer / learning session
**What:** Walk Jamie through WHY the new Prep for Upload batch functions are so much faster than the old Python versions. Key concepts to cover:
- Bulk reads (`getValues()` on entire columns = 1 API call vs cell-by-cell = hundreds of calls)
- `getFoldersByName()` (targeted Drive search) vs `getFolders()` (iterating every folder in parent)
- Searching in memory (arrays) after bulk read vs reading from the sheet for each check
- The general principle: minimize API calls, do work in memory, write results back in bulk

---

*Each item needs discussion/approval before implementation.*

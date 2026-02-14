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

## 7. Move Topic List working rows to start at row 3
**Sheet:** Topic List
**Difficulty:** Medium — need to find and update all row references
**What:** Currently data starts at row 2 (right after headers in row 1). The Topic Splitter row in column A gets mixed in with article data. Move working rows to start at row 3 so row 2 is reserved for the topic splitter and doesn't get caught up in data operations (Delete Done, sorting, etc.).
**Affects:** Any function that reads/writes Topic List data — need to update all row references from row 2 to row 3.
**Note:** Do this before #6 so the Delete Done fix accounts for the new row structure.

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

## 11. Review Python image creation/auto-editing for social media post automation
**Source:** Python batch scripts (on Jamie's PC, not yet in repo)
**Difficulty:** Research first, then medium-hard to implement
**What:** Jamie's Python scripts include image creation and auto-editing logic that follows a consistent template. Review that logic and explore how it could be repurposed to auto-create social media posts (e.g., for Facebook, Instagram, Pinterest, etc.).
**Steps:**
1. Get the Python image scripts into the repo so we can review them
2. Document the template/pattern they follow (image sizing, text overlay, branding, etc.)
3. Identify which social platforms Jamie wants to target
4. Design an automation that generates social media posts from existing article content using the same image logic
**Why it's a good candidate:** Templated, repeatable process = exactly the kind of thing worth automating.

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

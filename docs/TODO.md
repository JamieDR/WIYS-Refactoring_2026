# WIYS — Pending Tasks

Captured end of Session 4 (Feb 12, 2026). Pick these up next session.

---

## 1. Fix slow boundary-finding in Delete Successful Uploads
**Sheet:** Uploader (AST)
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

## 2. Edit blue background shade in Topic List sheet
**Sheet:** Topic List
**What:** Change the blue background color shade used in the Topic List sheet. (Jamie to specify exact shade/hex next session.)

## 3. Delete Done in ED sheet — don't touch column A
**Sheet:** Enhanced Drafter (ED)
**What:** When running "Delete Done" on the ED sheet, it should leave column A alone (don't clear/delete values in column A).

## 4. Transfer to Enhanced Drafter — randomize article type distribution
**Sheet:** Transfer to Enhanced Drafter
**What:** When transferring articles to ED, organize them in a random mix so there is even distribution of article types across team members. Not all the same type grouped together — shuffle them.

## 5. WP Editing Tracker — "Get WordPress Drafts" feature
**Sheet:** WP Editing Tracker
**What:** New feature for the Editing menu:
- When user chooses "Get WordPress Drafts" (or similar menu item), show a prompt asking **how many articles** they want
- Pull articles from **row 56 and below** that have WordPress Draft status
- Transfer them to the working area starting from **row 5**
- **Mix them randomly** so different article types are spread out for the day's publishing
- In **column E**, number them appropriately (1, 2, 3, etc.)

## 6. Delete Done in Topic List — don't touch column A
**Sheet:** Topic List
**What:** When running "Delete Done" on the Topic List, leave column A alone (same principle as #3).
**Also consider:** Moving Topic List working rows to start at **row 3 instead of row 2**, so the topic splitter row gets its own dedicated row and isn't mixed in with data rows.

## 7. Whitelist Bingbot in Cloudflare
**System:** Cloudflare (free plan)
**What:** Cloudflare was blocking Bingbot, which hurts SEO (Bing can't crawl the site). Cloudflare temporarily disabled protection to fix it, but Jamie needs to add a proper whitelist rule.
**How:** Add a user-agent or verified bot IP exception for Bingbot. Since all 5 custom rules are used on the free plan, this likely means editing an existing rule to include the exception.

## 8. Re-enable Breeze caching plugin (with adjusted settings)
**System:** WordPress (Cloudways)
**What:** Breeze plugin was causing images to not appear in articles. It was disabled to fix the issue. Likely cause: lazy loading or CDN URL rewriting breaking image paths.
**Action needed:**
- Re-enable Breeze
- Disable lazy loading for images (or test with it off)
- Check CDN URL rewriting settings
- Verify images appear correctly after re-enabling
**Why it matters:** Without caching, every visitor gets served directly from the server — slower page loads and more server load.

---

*These were captured from Jamie's instructions. Each one needs discussion/approval before implementation.*

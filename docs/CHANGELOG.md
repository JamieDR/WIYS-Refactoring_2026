# WIYS Changelog

What changed in the system, and when. Written for Jamie as a quick reference.

---

## Session 9 — February 20, 2026

### Bug Fixes
- **Lock/unlock system: 12 bug fixes** — naming bug (`TEAM_MEMBERS` → `TEAM_EDITORS`), wrong spreadsheet ID, lock removal approach (was calling `removeEditor()` on sheet owner), lock indicator moved to A2
- **Reference error messages: ESL-friendly rewrite** — fuzzy matching for phrase lookup, partial anchor fallback, `ref error:` prefix format, context snippets showing expected vs. actual text

### Improvements
- **Lock/unlock failsafes** — top-level try/catch on both lock and unlock, staggered verification triggers to re-check state, email alerts to jlcdelosreyes and workflow on failure
- **Late-edit detection** — added (then temporarily disabled) logic to detect unpublished articles at unlock time by cross-referencing WP draft statuses against the editing tracker
- **Lock/Unlock in Editing menu** — manual lock/unlock added as menu items alongside the scheduled triggers
- **Team editors populated** — added lara, naintara, charl, marie to `CONFIG.TEAM_EDITORS`

### Merged PRs
- **PR #14** — batch update published URLs
- **PR #15** — scheduled worksheet lock/unlock

### Documentation
- **Developer logs backfilled** — Sessions 2, 3, and 4 now have complete logs (were missing since Feb)
- **CLAUDE.md: Development Workflow** — documents that all editing is Codespaces + clasp, never the Apps Script editor
- **Stale references cleaned** — removed "clasp login pending" from all session logs

### Branch Cleanup
- **PRs #18–#23 merged** — all unmerged branches from previous sessions resolved. Main fully up to date.
- PR #18: Session 2 emergency fix, PR #19: Git lesson materials, PR #20: learning labs + TODOs, PR #21: Open URLs in tabs, PR #22: diagnostic logging, PR #23: Session 9 doc updates

### Notes
- `checkLateEdits` disabled in unlock until core lock/unlock is proven stable — re-enable once confirmed working
- Reference error messages went through 7 iterations to get the wording right for the ESL team

---

## Emergency Fix — February 18, 2026

### Bug Fixes
- **Republish: URL now updates in column D** — after republishing with a `-rep` slug, the new URL is written back to WET column D so the sheet stays current (previously kept the old URL)

### Improvements
- **AST→WET transfer: Google Doc URL now carried over** — AST column D (Google Doc link) is now transferred to WET column L during the batch transfer, so the doc is accessible for reference on the editing tracker
- **WET column L repurposed** — was "QA Notes", now holds the Google Doc URL

---

## Session 4 — February 11, 2026 (continued)

### Improvements
- **Create New Rows batch: 6x faster** — went from 2 min 56 sec down to 28 seconds
  - Switched from scanning every Drive folder to searching by name directly (`getFoldersByName`)
  - Switched from checking column A cell-by-cell to reading the whole column at once
  - Reduced wait times between operations (7s → 2s)

### Bug Fixes
- **Paste Content batch: fixed double-pasting** — the first version was pasting content twice and adding extra empty rows. Rewrote it to match the Python script exactly (scan for "Row Created", process top-to-bottom, re-find each row before pasting)

### Reverted
- **Delete Successful Uploads optimization: rolled back** — the new version was slower than the old one because it was scanning row-by-row instead of reading in bulk. Old (slow but working) version restored. Needs a fresh rewrite.

---

## Session 3 — February 11, 2026

### What's New
- **3 Python scripts ported to Google Apps Script:**
  - **Create New Rows** — creates article rows in the Uploader from the Article Status Tracker
  - **Paste Content** — pastes article sections from Google Docs into Uploader rows
  - **Delete Successful Uploads** — removes uploaded articles from the Uploader
- **Workspace picker** — when running batch operations, you now choose which workspaces to process (single, multiple, or all)
- **Chunked batch processing** — operations automatically pause at 4.5 minutes and resume, so they don't hit the Google Apps Script 6-minute time limit
- **New menu layout** — "Prep for Upload" menu now has 3 items (Create New Rows, Paste Content, Delete Successful Uploads)

### Removed
- Old batch menu items (Unlock Sheet, Stop Batch) removed from menu — the new system handles this automatically
- SHAYNE removed from workspace list (team member no longer active)

### Notes
- The old batch functions are still in the code (not deleted), just removed from the menu
- `pasteArticleSections` is shared between the single-row dropdown trigger and the batch — we didn't touch it

---

## Session 2 — February 10, 2026

### Bug Fixes (WordPress Server)
- **Server at 100% CPU — fixed.** The Kit (ConvertKit) WordPress plugin was running infinite database scans on all 11,000 posts, looking for shortcodes that didn't exist. Deactivated the plugin, CPU recovered immediately.
- **API calls returning 403 errors — fixed.** Cloudflare's "Under Attack Mode" was turned on, blocking the WordPress REST API. Turned it off and added a rule exception for `/wp-json/`.

### Notes
- This session was emergency server triage, not refactoring work
- No code changes to the Apps Script codebase

---

## Session 1 — February 7, 2026

### What's New
- **Project created on GitHub** — the WIYS codebase now has a home with version control
- **Repository structure set up** — folders for source code, documentation, guides, developer logs
- **Codespace configuration** — GitHub Codespaces can now auto-setup with clasp (the tool that syncs code to Google Apps Script)
- **CLAUDE.md briefing document** — ensures continuity between sessions
- **Developer log started** — honest tracking of Jamie's learning progress
- **Setup guides written** — "How to Open Your Codespace" and "What is a Terminal"

### Notes
- The original 16,400-line codebase was added as a reference copy
- No code changes to the production system
- Phase 0 (project setup) started

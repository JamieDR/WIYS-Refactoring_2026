# WIYS — Pending Tasks

Captured end of Session 4 (Feb 12, 2026). Pick these up next session.

---

## 1. Fix slow boundary-finding in Delete Successful Uploads
**Sheet:** Uploader (AST)
**Problem:** `findWorkspaceBoundaries()` is scanning row by row even after workspace is selected. Took 90+ seconds just to find JAMIE's boundaries, scanning through TESTER, END ROW, CHARL, LARA, NAINTARA etc. before even starting work.
**Fix needed:** Bulk-read all of column A in one `getValues()` call, then search the array in memory to find the start/end rows for the chosen workspace. Same pattern used in the optimized Create New Rows.
**Note:** The optimized delete function was reverted — the old (slow but working) version is currently live. Needs a fresh rewrite with this fix.

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

---

*These were captured from Jamie's instructions. Each one needs discussion/approval before implementation.*

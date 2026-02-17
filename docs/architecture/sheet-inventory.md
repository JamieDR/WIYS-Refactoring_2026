# Sheet Inventory

All sheets in the WIYS Production Spreadsheet, their purpose, and their column layouts.

**Spreadsheet ID:** 1gQmKqIDr07tSaqoDY_R13fQcO3YWB6HgLSEmpTsPYb8

---

## 1. WIYS Production Tracker

**Purpose:** Log of every published article — who drafted it, when it went live, links to the website and MSN versions, and current status.

| Column # | Letter | Header |
|----------|--------|--------|
| 1 | A | Drafter |
| 2 | B | # |
| 3 | C | Publish Date & Time |
| 4 | D | Title |
| 5 | E | Website URL |
| 6 | F | MSN URL |
| 7 | G | Status |

---

## 2. Enhanced Drafter

**Purpose:** Article drafting pipeline — topics come in, get outlined, drafted into Google Docs, assigned to team members, and marked ready for transfer.

| Column # | Letter | Header |
|----------|--------|--------|
| 1 | A | # |
| 2 | B | Topic |
| 3 | C | Type |
| 4 | D | Place to Visit |
| 5 | E | Raw Input |
| 6 | F | Outline |
| 7 | G | State |
| 8 | H | Article Title |
| 9 | I | References |
| 10 | J | WP Tags |
| 11 | K | GDoc URL |
| 12 | L | Status |
| 13 | M | Assigned To |

---

## 3. WP Editing Tracker

**Purpose:** Editing stage — articles come in from the drafter, get a WordPress URL, and go through QA with status tracking, final title, and notes.

| Column # | Letter | Header |
|----------|--------|--------|
| 1 | A | Drafter |
| 2 | B | Article Type |
| 3 | C | Raw Title |
| 4 | D | WP URL |
| 5 | E | # |
| 6 | F | Time |
| 7 | G | Date |
| 8 | H | Article Status |
| 9 | I | Final Title |
| 10 | J | Base Topic |
| 11 | K | Article Summary |
| 12 | L | QA Notes |

**Notes:**
- Column E (#) is a manual daily counter — Jamie uses it to count how many articles are being edited/published that day.

---

## 4. Article Status Tracker

**Purpose:** Master tracking sheet — every article across the whole pipeline, with its state, assignment, all key links (Google Doc, WordPress, GDrive folder), and metadata.

| Column # | Letter | Header |
|----------|--------|--------|
| 1 | A | State |
| 2 | B | Assigned to |
| 3 | C | Article Title |
| 4 | D | Google Doc |
| 5 | E | WP URL |
| 6 | F | GDrive Folder |
| 7 | G | Status |
| 8 | H | Article Type |
| 9 | I | Base Topic |
| 10 | J | Tags |
| 11 | K | Summary |
| 12 | L | NOTES |
| 13 | M | References |

---

## 5. Uploader

**Purpose:** Image upload pipeline — slides from articles are listed with their image metadata, file names, copyright info, and upload status. Organized into per-person sections with colored header rows.

| Column # | Letter | Header |
|----------|--------|--------|
| 1 | A | Main Category |
| 2 | B | Image URL |
| 3 | C | Image ID |
| 4 | D | Slide # |
| 5 | E | Subheadings |
| 6 | F | Slide Content |
| 7 | G | File Names |
| 8 | H | Copyright |
| 9 | I | License ID |
| 10 | J | Licensor |
| 11 | K | Alt Text |
| 12 | L | Trigger |
| 13 | M | Image Folder |

**Notes:**
- Column L (Trigger) serves double duty as both trigger and status messages.
- This is the only sheet that currently has a CONFIG.COLUMNS mapping in the code (lines 86-102 of main.gs).
- The existing CONFIG names don't match the actual column headers (e.g. `ARTICLE_TITLE` for "Main Category"). This will be fixed in Phase 3.
- The existing CONFIG also has COLUMN_14 (14/N) and DRAFT_STATUS (15/O) — these appear to be unused/legacy columns.

---

## 6. Article Collection

**Purpose:** Library of published articles — categorized by state and type, with URLs, thumbnails, and a usage flag. Feeds into the Email Newsletter for selecting articles to feature.

| Column # | Letter | Header |
|----------|--------|--------|
| 1 | A | State |
| 2 | B | Category |
| 3 | C | Title |
| 4 | D | Article URL |
| 5 | E | Thumbnail URL |
| 6 | F | Used? |
| 7 | G | Summary |

---

## 7. Topic List

**Purpose:** Topic bank for article planning — tracks topics with their type, status, outlines, and source URLs. Includes a separate "Potential Topic" working area.

| Column # | Letter | Header |
|----------|--------|--------|
| 1 | A | # |
| 2 | B | Article Type |
| 3 | C | Topic |
| 4 | D | URL |
| 5 | E | Place to Visit |
| 6 | F | Outline |
| 7 | G | Status |
| 8 | H | Potential Topic |
| 9 | I | URL |

**Notes:**
- Columns D and I are both labeled "URL" — column D is the URL for the topic, column I pairs with column H (Potential Topic) as its source link.
- Column H has a pink/salmon background, visually separating it as a working area.

---

## 8. Email Newsletter

**Purpose:** One row per newsletter. Each newsletter features 4 articles with their titles, URLs, and image URLs (pulled from WP drafts). Article groups are separated by black spacer columns for visual clarity.

| Column # | Letter | Header | Notes |
|----------|--------|--------|-------|
| 1 | A | Send Date | |
| 2 | B | Featured Article | |
| 3 | C | URL | |
| 4 | D | Image URL | |
| 5 | E | Preview Text | |
| 6 | F | *(separator)* | Black visual break |
| 7 | G | Article #2 | |
| 8 | H | URL | |
| 9 | I | Image URL | |
| 10 | J | *(separator)* | Black visual break |
| 11 | K | Article #3 | |
| 12 | L | URL | |
| 13 | M | Image URL | |
| 14 | N | *(separator)* | Black visual break |
| 15 | O | Article #4 | |
| 16 | P | URL | |
| 17 | Q | Image URL | |
| 18 | R | *(separator)* | Black visual break |
| 19 | S | Status | |

**Notes:**
- Featured Article gets an extra column (Preview Text) that the other articles don't have.
- Image URLs are automatically pulled from WordPress draft featured images.
- Row 2, columns O and P contain scratch text for copy-paste convenience — not part of the data model.

---

## Other Sheets

### Resources
- Exists in the spreadsheet but does not feed into any automation.
- No column mapping needed.
- Noted here for completeness.

### Legacy sheets (deleted)
The following sheets were listed in `CONFIG.SHEETS` (main.gs lines 53-66) but have been deleted from the spreadsheet as of 2026-02-17:
- **Drafter** — older version of Enhanced Drafter
- **Drafter Basic** — simplified drafter variant
- **State Topics**
- **Topic Planning**

Their references in `CONFIG.SHEETS` should be removed during refactoring.

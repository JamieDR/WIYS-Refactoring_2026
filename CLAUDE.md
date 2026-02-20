# WIYS Refactoring Project — Claude Briefing Document

## What This Is
A Google Apps Script production system for "When In Your State" (wheninyourstate.com).
It manages the full editorial pipeline: article drafting → image sourcing → WordPress publishing.
Used daily by a team of 6 people. Connected to a Google Sheet as the main UI.

## The Human
- Jamie (JamieDR on GitHub) — project owner, self-taught "vibecoder" who built this with AI assistance
- Has ADHD — keep explanations structured, one thing at a time, clear next actions
- Learning programming concepts from scratch — explain terms in plain English, never assume knowledge
- Wants to become a competent programmer/project manager, not just get tasks done
- Needs to be asked questions proactively (doesn't always know what to ask)

## Working Style
- **Collaborative and conservative.** No changes without explanation and approval.
- **One small change at a time.** Verify it works before moving on.
- **Documentation first, code second.** Document before changing.
- **Explain everything.** Terms, concepts, rationale — in plain English without dumbing down technical accuracy.
- **Be direct and honest.** No sugarcoating, no flattery.
- **Play harsh devil's advocate.** Before making any change, argue against it. Poke holes in the plan, identify what could break, question whether we're solving the right problem. Every change to a production system used by 6 people deserves this scrutiny.
- **Redirect when distracted.** Jamie will sometimes chase side issues mid-session. Be frank: "This isn't priority right now — let's add it to the backlog and stay on track." Don't just go along with every tangent. Protect the session focus.
- **Session developer logs.** Maintain honest assessment of Jamie's progress in docs/developer-log/.

## Tech Stack
- Google Apps Script (main codebase, ~14,600 lines in single file)
- Python (batch operations that bypass Apps Script execution limits — run on Jamie's PC currently)
- WordPress REST API (wheninyourstate.com)
- External APIs: Shutterstock, Claude AI, Wikimedia, DPLA, USGS, Library of Congress, NYPL, Flickr
- Google Workspace: Sheets (main UI), Docs (article drafts), Drive (file storage)

## Development Workflow
- **All code editing happens in GitHub Codespaces** — never in the Apps Script editor
- Code is pushed to Google Apps Script using `clasp push` from the Codespace terminal
- The Apps Script editor is only used for: running functions, checking triggers, viewing logs
- clasp login is done and working — do not flag it as pending

## Repository Structure
```
/
├── CLAUDE.md                          ← You are here (briefing for Claude)
├── .clasp.json                        ← clasp config (Script ID)
├── .claspignore                       ← Files clasp should NOT upload
├── .gitignore                         ← Files git should NOT track
├── .devcontainer/devcontainer.json    ← GitHub Codespaces auto-setup
├── src/                               ← Apps Script code (.gs files go here)
│   └── appsscript.json               ← Apps Script manifest
├── docs/
│   ├── architecture/                  ← System documentation
│   ├── developer-log/                 ← Jamie's progress tracking (per session)
│   └── guides/                        ← Setup guides, how-tos
├── python/                            ← Python batch scripts (to be added)
└── Original Codebase_Feb7 Version     ← Original monolith (reference copy, do not modify)
```

## Refactoring Plan (Agreed Upon)
- **Phase 0:** Project structure, clasp, Codespaces, tooling ← DONE
- **Phase 1:** Document what exists (sheets, lifecycle, menus, APIs)
- **Phase 2:** Reduce duplication (DRY — extract shared patterns) ← CURRENT
- **Phase 3:** Decouple business logic from spreadsheet layout (column mappings for all sheets)
- **Phase 4:** Clean architecture for new features
- **Phase 5:** Split monolith into separate .gs files (organizational only, no behavior changes)

## Key Rules
- NEVER change functionality during refactoring — behavior must stay identical
- NEVER push to main without Jamie's approval
- NEVER skip explanation — if Jamie doesn't understand, we don't proceed
- The original codebase file is kept as a reference and never modified
- All code changes go through the branch → review → merge workflow

## Session Startup (REQUIRED)
Every fresh session MUST begin by reviewing the project state before doing any work:
1. **Read docs/developer-log/** — all session logs, most recent first, to understand what's been done
2. **Read docs/TODO.md** — current backlog and priorities
3. **Read docs/CHANGELOG.md** — recent changes
4. **Read docs/session-notes.md** — any in-progress work
5. **Check git log** — recent commits and branches to understand current state
6. **Check PR comments** — any open PRs with review feedback

Do NOT start working until you have this context. Jamie shouldn't have to tell you to catch up.

## Branch Naming
- **One branch per logical change.** A logical change is something you can describe in one sentence without using "and" to connect unrelated things.
- **Test:** Would you want to undo these things together? If not, they belong in separate branches.
- **Name format:** `claude/<descriptive-name>-<session-id>` — the descriptive part should make the change obvious at a glance.
- **Categories of logical changes:**
  - **Bug fix** — fixing one broken behavior (e.g., `claude/fix-no-period-protection-...`)
  - **Feature** — adding one new capability (e.g., `claude/auto-status-on-url-paste-...`)
  - **Refactoring step** — one phase of reorganizing code (e.g., `claude/split-image-functions-...`)
  - **Documentation** — updating docs for one topic (e.g., `claude/document-uploader-lifecycle-...`)
  - **Sheet-specific** — changes scoped to one sheet's logic (e.g., `claude/wet-title-validation-...`, `claude/uploader-column-mapping-...`)
- **"And" rule:** "Add 'No.' and 'Fig.' to period protections" = one branch (same feature). "Add period protection and auto-status detection" = two branches (unrelated changes).

## Google Apps Script Project
- Script ID: 1282XkiH9YKT9QVZiyyjVQYR8UeyHOWnAuErF1j9mpzve68OWfvaHHyqv
- Connected Spreadsheet ID: 1gQmKqIDr07tSaqoDY_R13fQcO3YWB6HgLSEmpTsPYb8
- Timezone: America/Phoenix

## Known Issues in Current Codebase
- API credentials hardcoded in CONFIG object (Shutterstock tokens, Claude API key in setup function)
- 16,400-line single file — no modularization
- Heavy copy-paste duplication (date formatting, auth headers, caching functions)
- Magic numbers for column indices on most sheets (only Uploader has CONFIG.COLUMNS)
- Mock event objects used to call single-row functions from batch functions
- One-time migration scripts mixed in with production code
- No tests, no documentation

# Bug Report: `tool_use ids must be unique` Error (Recurring)

## Status: UNRESOLVED — Recurring across multiple sessions

## Error Details
```
API Error: 400
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "messages.7.content.2: tool_use ids must be unique"
  },
  "request_id": "req_01ICYMNb4kX55ZazXYBqCDx2"
}
```

## Impact
- **Severity:** High — kills the session entirely, all in-progress work is lost
- **Frequency:** Has now happened multiple times across different sessions
- **User impact:** Jamie loses all conversation context and has to restart from scratch each time

## Occurrence Log

### Occurrence — 2026-02-21 (documented with screenshots)
- **Session URL:** `claude.ai/code/session_O1RCRGuoJcMNaEyYn2f4MpQv`
- **Session title:** "Continue scraper development work"
- **Branch at time of error:** `claude/continue-scraper-t2NQJ`
- **What was happening:** Claude was researching state legislature data sources for the bill tracking/scraper feature. Had launched a background agent to research state legislature data sources, and was mid-discussion about options (Open States API, state RSS feeds, direct .gov scraping). The error fired and killed the session.
- **Error location in message chain:** `messages.7.content.2` — the 3rd content block of the 8th message
- **Screenshots:** 5 screenshots taken by Jamie documenting the full conversation up to the crash. See `screenshots/` directory (to be added manually — Claude Code web cannot extract inline uploaded images to files).

## Root Cause Analysis
This is a **Claude API-side bug**, not a user error or codebase issue. The error means the API received a request where two `tool_use` content blocks had the same `id` field. This is generated internally by the Claude Code web client — users have no control over tool_use IDs.

The error tends to occur when:
- Multiple tool calls are made in parallel (background agents, concurrent searches)
- Sessions become long with many tool invocations
- The client-side message history accumulates duplicate tool_use IDs

## Workaround
None known. When this error occurs, the session is unrecoverable. Must start a new session and manually re-establish context.

## Where to Report
This should be reported to Anthropic via: https://github.com/anthropics/claude-code/issues

## Screenshots
Jamie captured 5 screenshots of the crashed session on 2026-02-21. These need to be manually added to `docs/bugs/screenshots/` since Claude Code web cannot programmatically save inline-uploaded images to the filesystem.

Suggested filenames:
- `screenshots/tool-use-error-2026-02-21-01.png`
- `screenshots/tool-use-error-2026-02-21-02.png`
- `screenshots/tool-use-error-2026-02-21-03.png`
- `screenshots/tool-use-error-2026-02-21-04.png`
- `screenshots/tool-use-error-2026-02-21-05.png`
- `screenshots/tool-use-error-2026-02-21-06.png` (follow-up screenshot showing bottom of conversation)

# WIYS — When In Your State

Editorial workflow automation system for [wheninyourstate.com](https://wheninyourstate.com).

Manages the full content pipeline: article drafting, image sourcing, editorial review, and WordPress publishing. Built on Google Apps Script with a Google Sheets UI, integrated with WordPress REST API and multiple image source APIs.

## Status

**Active refactoring in progress.** See [CLAUDE.md](CLAUDE.md) for project context and current phase.

## Repository Structure

```
src/                    → Google Apps Script code (deployed via clasp)
docs/architecture/      → System documentation
docs/developer-log/     → Session-by-session development log
docs/guides/            → Setup guides and how-tos
python/                 → Python batch processing scripts
```

## Getting Started

See [docs/guides/setup-guide.md](docs/guides/setup-guide.md) for full setup instructions using GitHub Codespaces.

## Tech Stack

- Google Apps Script (workflow automation)
- Python (batch operations)
- WordPress REST API (content publishing)
- Google Workspace APIs (Sheets, Docs, Drive)
- External APIs: Shutterstock, Wikimedia, DPLA, Library of Congress, USGS, NYPL, Flickr

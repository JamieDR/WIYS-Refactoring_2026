# Future Business Vision — AI Content Service

*Captured: Feb 25, 2026. This is a long-term idea, not a current priority. Refactoring comes first.*

---

## The Idea
Offer the WIYS system as a service to businesses that need to scale content production with small teams.

## Differentiator
- Built by a seasoned writer and editor, not an engineer slapping a wrapper on ChatGPT
- Not a generic "AI writing tool" — it's a full editorial pipeline: drafting, image sourcing, editing, publishing
- Includes training and operational consulting, not just software

## What You're Actually Selling
1. **The tool** — configurable AI content pipeline (spreadsheet UI, API integrations, WordPress publishing)
2. **The playbook** — how to restructure a content team around AI
3. **The training** — upgrading writers from "just writing" to understanding end-to-end AI content architecture, making the human more valuable as low-level skills get automated

## Revenue Model (Rough Thinking)
- The tool is the foot in the door
- Ongoing training and workflow consulting is the retainer
- Custom configuration per client (their workflows, their WordPress setup, their APIs)

## Target Client
- Businesses with content teams that need to scale output without scaling headcount
- Teams of ~3-6 people doing the work that 10-15 used to do

## Proof of Concept
- Jamie's own team went from 15 to 6 while maintaining/increasing output
- The workflow naturally surfaces who can adapt and who can't

## What the Codebase Needs Before This Is Possible
- **Phase 2:** Reduce duplication (DRY) — currently in progress
- **Phase 3:** Decouple business logic from spreadsheet layout — critical for multi-client deployment
- **Phase 4:** Clean architecture — makes the system configurable per client
- **Phase 5:** Split monolith — makes it maintainable at scale

## Key Decisions for Later
- Product vs. consulting? (Configurable product that scales, or bespoke builds per client?)
- Pricing model
- Multi-tenant architecture (one codebase, many clients) vs. per-client deployments
- How to handle different client workflows without forking the code

---

*Don't chase this until the refactoring is done. The path is the same either way.*

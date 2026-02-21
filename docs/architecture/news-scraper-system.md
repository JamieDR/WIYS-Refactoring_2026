# News Scraper System — Architecture Document

## Purpose
Automated topic-finding pipeline for wheninyourstate.com (published on MSN).
Replaces 6-9 hours/day of manual topic research with automated scraping, filtering, and triage.

## Overview
```
Sources (RSS / Gmail / APIs)
    ↓
Keyword Blacklist Filter (FREE)
    ↓
Keyword Whitelist Flag (FREE)
    ↓
Claude Haiku Batch Scoring (pennies/day)
    ↓
Google Sheet (triage by status column)
    ↓
Batch Transfer → Content Pipeline
```

## Sheet Structure

### News Scraper Sheet
| Column | Content |
|--------|---------|
| A | Status (dropdown: blank / Approved / Delete) |
| B | State |
| C | Source |
| D | Title |
| E | URL |
| F | Summary |

### Batch Operations (menu items)
- **Transfer Approved** — moves all "Approved" rows to destination sheet, then clears them
- **Delete Marked** — removes all "Delete" rows in one click

---

## Source Types

### 1. RSS Feeds (direct)
For sites that publish RSS. Parsed with `XmlService` in Apps Script.
- Travel publications
- Federal government agencies
- State tourism boards
- Local news outlets (per state)

### 2. Gmail Newsletters
For sites without RSS. Parsed with `GmailApp` in Apps Script.
- Subscribe to the site's newsletter
- Scraper scans inbox for emails from specific senders
- Extracts article links, titles, and summaries from email HTML

### 3. APIs
For services with structured APIs.
- LegiScan (state legislation tracker — all 50 states)
- NPS API (National Park Service news releases)

### Source List (Research Complete — Feb 2026)

#### RSS Feeds — Travel Publications (confirmed working)
| Source | RSS URL |
|--------|---------|
| Condé Nast Traveler | `https://www.cntraveler.com/feed/rss` |
| Islands.com | `https://www.islands.com/feed/` |
| TheTravel | `https://www.thetravel.com/feed/` |
| AFAR | `https://www.afar.com/magazine.atom` |
| Atlas Obscura | `https://www.atlasobscura.com/feeds/latest` |
| Smithsonian Travel | `https://www.smithsonianmag.com/rss/travel/` |
| BBC Travel | `https://www.bbc.com/travel/feed.rss` |

#### RSS Feeds — Federal Government (confirmed working)
| Source | RSS URL | Notes |
|--------|---------|-------|
| NPS (per park) | `https://www.nps.gov/feeds/getNewsRSS.htm?id={parkCode}` | Use park codes (yose, grca, zion, etc.) |
| NPS (per park alerts) | `https://www.nps.gov/feeds/getAlertRSS.htm?id={parkCode}` | Closures, safety |
| BLM National | `https://www.blm.gov/press-release/national-office/rss` | |
| BLM Arizona | `https://www.blm.gov/press-release/arizona/rss` | Per-state feeds available |
| BLM California | `https://www.blm.gov/press-release/california/rss` | |
| BLM Colorado | `https://www.blm.gov/press-release/colorado/rss` | |
| BLM Idaho | `https://www.blm.gov/press-release/idaho/rss` | |
| BLM Montana-Dakotas | `https://www.blm.gov/press-release/montana-dakotas/rss` | |
| BLM Nevada | `https://www.blm.gov/press-release/nevada/rss` | |
| BLM New Mexico | `https://www.blm.gov/press-release/new-mexico/rss` | |
| BLM Oregon-Washington | `https://www.blm.gov/press-release/oregon-washington/rss` | |
| BLM Utah | `https://www.blm.gov/press-release/utah/rss` | |
| BLM Wyoming | `https://www.blm.gov/press-release/wyoming/rss` | |
| BLM Alaska | `https://www.blm.gov/press-release/alaska/rss` | |
| BLM Eastern States | `https://www.blm.gov/press-release/eastern-states/rss` | |
| FHWA Press Releases | `https://www.fhwa.dot.gov/publicaffairs/newsrss/` | Highways, scenic byways |
| CDC Travel Notices | `https://wwwnc.cdc.gov/travel/rss/notices.xml` | Mostly international |
| USDA Forest Service | `https://www.fs.usda.gov/rss/{region-code}` | Per-region (r4, r6, r10, etc.) |

#### RSS Feeds — Needs Verification
| Source | RSS URL | Issue |
|--------|---------|-------|
| Outside Online | `https://www.outsideonline.com/feed/` | Behind paywall/login |
| Lonely Planet | `https://www.lonelyplanet.com/news/feed/atom/` | Returning 403 |
| Travel + Leisure | `https://feeds-api.dotdashmeredith.com/v1/rss/google/{GUID}` | Exact GUID unknown |
| DOT Main | `https://www.transportation.gov/rss` | Page exists, exact XML URL needs confirmation |
| FAA Press | RSS link exists on newsroom page | Exact URL needs extraction |

#### Gmail Newsletter Approach (no RSS available)
These sites don't offer RSS feeds. Subscribe to their newsletters and scrape from Gmail.
- National Geographic Travel
- Newsbreak
- Thrillist
- Fodor's Travel
- TSA (email subscription only)
- US Fish & Wildlife Service (email subscription only)
- Brand USA (email subscription only)
- Most state tourism boards (very few have RSS)

#### APIs
| Source | API | Notes |
|--------|-----|-------|
| NPS API | `https://developer.nps.gov/api/v1/newsreleases` | 250 releases per call |
| LegiScan | TBD | State legislation tracker — all 50 states, searchable by topic |

---

## Filtering Pipeline

### Layer 1: Keyword Blacklist (zero tokens — auto-skip)

Articles matching these keywords in title or summary are automatically discarded.

#### Prohibited Topics (per MSN/WIYS editorial guidelines)
**Substances:**
- alcohol, beer, wine, brewery, distillery, cocktail, bar crawl
- drug, cannabis, marijuana, weed, dispensary, psychedelic

**Violence:**
- shooting, murder, homicide, serial killer, violent crime, stabbing, assault
- mass shooting (unless major national news, reported factually)

**Sexual Content:**
- sexual, adult entertainment, strip club, escort, sex tourism

**LGBTQ (per MSN guidelines):**
- pride event, pride parade, LGBTQ, pride month, drag show

**Misinformation/Conspiracy:**
- UFO sighting, chemtrail, flat earth, bigfoot, loch ness, conspiracy theory

**Gambling:**
- casino promotion, gambling, sports betting, online poker

**Celebrity:**
- celebrity, gossip, paparazzi, red carpet, celebrity home, celebrity vacation

#### Not Covered (per editorial scope)
**Commercial/Business/Promotional (not evergreen):**
- earnings report, quarterly results, market share, IPO, boardroom
- stock price, investing advice, trading, Wall Street
- restaurant review, hotel review (unless historically/culturally significant)
- "best X" listicles (e.g., "best restaurants", "best hotels") — almost always SEO bait or sponsored content

**Sports:**
- sports score, playoff, championship, game recap, touchdown
- NFL draft, NBA finals, World Series, Super Bowl

**Tech:**
- tech launch, product review, iPhone, Android, gadget

**Foreign/International:**
- foreign election, foreign politics (unless directly affecting US travelers)

**Political Horse-Race:**
- campaign poll, polling numbers, who's leading, primary results
- campaign strategy, fundraising totals, endorsement

**Deals/Sales/Promotional:**
- sale, deal, discount, price drop, coupon, promo code, flash sale
- "where to stay", "where to eat" (commercial promotion framing)
- sponsored, paid partnership, affiliate

**B2B / Trade Industry (not consumer-facing):**
- travel industry, travel trade, travel groups, group travel (B2B)
- hospitality industry, hotel industry, tourism board meeting
- convention, trade show, expo (industry events)

**Blocked Source Domains:**
Sites that consistently produce unusable content — auto-skip regardless of title.
- travelandtourworld.com (trade industry site)
- *Add more as identified during triage*

#### Fast-Stale (becomes outdated too quickly)
- road closure, road work, detour, traffic alert
- weather warning, tornado watch, flood warning, winter storm warning
- power outage, evacuation order, boil water advisory
- accident, crash, fatality (unless major national news)
- recall notice (product recalls)

### Layer 2: Keyword Whitelist (zero tokens — auto-flag as high priority)

Articles matching these keywords are auto-flagged as likely relevant.

**Travel & Destinations:**
- national park, state park, public lands, road trip
- hidden gem, must visit, bucket list
- historic site, American history, landmark, monument
- scenic byway, trail, hiking, outdoor recreation
- reopens, newly renovated, grand opening, new attraction

**Policy & Impact:**
- new law, signed into law, legislation, effective 2026
- Social Security, Medicare, Medicaid, tax change, policy change
- cost of living, housing market, job market
- travel rule, TSA, airline, airport, visa

**State/Local News:**
- state park, governor signed, state legislature
- local landmark, town history, community

### Layer 3: Claude Haiku Batch Scoring (tokens — minimized)

For articles that pass the blacklist but aren't caught by the whitelist.

**Method:**
- Batch 50 titles + summaries into a single API call
- Use Claude Haiku (cheapest model)
- Score each 1-10 for WIYS relevance
- Only articles scoring 6+ make it to the sheet

**Scoring Criteria (prompt for Haiku):**
- Is this relevant to American travel, destinations, or places?
- Does this affect Americans' lives, wallets, or decisions?
- Is this evergreen enough to publish? (not stale within 24 hours)
- Is this factual news or a travel feature (not opinion/editorial)?
- Would this interest Americans aged 40-79?

**Cost Estimate:**
- ~250 articles/day through Haiku scoring
- ~15 words per title × 250 = 3,750 tokens input per batch
- Estimated cost: < $0.01/day

---

## Scheduling

| Source Type | Frequency | Rationale |
|------------|-----------|-----------|
| RSS feeds (news sites) | Every 2-4 hours | RSS updates a few times daily |
| Gmail newsletters | Every 1-2 hours | Newsletters arrive periodically |
| Government RSS | Every 6-12 hours | Published on business schedules |
| Legislative trackers | Every 4-6 hours | Bills don't drop constantly |

**Apps Script quota consideration:**
- Consumer account: 20,000 URL fetches/day
- With 150 sources × 6 runs/day = 900 fetches (well within limits)

---

## Editorial Guidelines (for reference)

### Audience
Americans aged 40-79, 6th-7th grade reading level.

### Article Types
- **News** — frontload the event, context after
- **Travel Feature** — beauty, things to do, highlights
- **Listicle** — item names as subheadings
- **Historical** — story arc: setup → event → aftermath → why it matters today

### Content Rules
- No editorializing, bias, or loaded language
- Facts only — let readers draw conclusions
- Use "might," "may," "could" for unconfirmed outcomes
- Every fact verified against 3+ independent sources
- No commercial promotion (restaurants, hotels) unless historically/culturally significant
- No international news unless it directly affects US travelers or US prices

### Verification Standard
- 3+ independent sources per fact (not reprints of same wire story)
- Sources: official sites, government, major news outlets
- Avoid forums, aggregators, user-generated content
- If only 1-2 sources: recommend cutting
- If sources conflict: recommend cutting
- When in doubt, leave it out

---

## Predecessor Scripts (deprecated)

### NewsScraper_fromGoogleNews
- Scraped Google News RSS for all 50 states + NewsAPI
- Written to "Travel News Tracker" sheet
- **Issues:** Repetitive results, not the right kind of news, same articles across states
- **Status:** No longer in use

### NewsTracker_fromNPSNews
- Scraped NPS API for news releases
- Written to "NPS News" sheet
- **Issues:** Didn't return current articles
- **Status:** No longer in use

Both contained hardcoded API keys (now exposed on GitHub — need rotation).

---

## Open Questions
- [ ] Where do "Approved" articles transfer to? (Article Status Tracker? Staging sheet?)
- [x] RSS feed availability research results (complete — Feb 2026)
- [ ] LegiScan API — free tier limits? Cost?
- [ ] Should deprecated scraper files be removed from repo?

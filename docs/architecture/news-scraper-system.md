# News Scraper System — Architecture Document

## Purpose
Automated topic-finding pipeline for wheninyourstate.com (published on MSN).
Replaces 6-9 hours/day of manual topic research with automated scraping, filtering, and triage.

## Overview
```
Sources (RSS / Gmail / APIs)
    ↓
Keyword Blacklist Filter (FREE — auto-discard junk)
    ↓
Claude Haiku Summary (who/what/when/where — ~$1-2/day)
    ↓
Google Sheet (Jamie handpicks — Approved / Delete)
    ↓
Batch Transfer → Content Pipeline
```
No auto-scoring or relevance filtering. Everything that passes the blacklist
lands in the sheet. Jamie decides what's relevant.

## Spreadsheet Structure

**Dedicated "WIYS Scraper" spreadsheet** — separate from the main WIYS production sheet.
Keeps scraper volume out of the team's daily workspace. Connected to main sheet only at
the "Transfer Approved" step (one-way push).

### Sort Order
All tabs: **newest first** (reverse chronological). Fresh stories at the top.

### Column Layout

**Standard layout (most tabs):**

| Column | Content |
|--------|---------|
| A | Date |
| B | State |
| C | Title (hyperlinked to article URL, black font — not blue) |
| D | Summary (Claude Haiku-generated — who, what, when, where) |
| E | Status (dropdown: blank / Approved / Delete) |

**Breaking / Trending tab (adds outlet count):**

| Column | Content |
|--------|---------|
| A | Date |
| B | State |
| C | Title (hyperlinked, black font) |
| D | Summary |
| E | Outlets (count — e.g., "1" for single source, "6" for widely covered) |
| F | Status |

Duplicate stories across outlets are merged into one row. The Outlets column
shows how many sources are reporting it — high numbers = trending.
**Trending threshold: 3+ major outlets** reporting the same story. All sources
feeding this tab (AP, Reuters, CNN, BBC, NBC, CBS, ABC, Telegraph, Washington
Examiner) qualify as major, so any 3+ within this tab = trending.

### Tabs (11 total)

| # | Tab Name | Sources | What you're scanning for |
|---|----------|---------|------------------------|
| 1 | **Breaking / Trending** | AP, Reuters, CNN, BBC, NBC, CBS, ABC, The Telegraph, Washington Examiner | Big national stories; outlet count shows what's trending |
| 2 | **Analysis / Deep Dives** | Vox, The Atlantic, Time, The Independent, The Guardian, HuffPost | Trend pieces, explainers, opinion that sparks article ideas |
| 3 | **Business & Retail** | Business Insider, Fortune, local biz journals, retail/chain news | Store openings, closures, expansions, layoffs, "X coming to your state" |
| 4 | **Money & Taxes** | IRS.gov, USA Today Money, gov economic data | Tax changes, cost of living, economic impact on real people — NOT stocks/markets |
| 5 | **Lifestyle / Culture** | People, USA Today, NY Post, Daily Mail | Human interest, weird news, fun state stories |
| 6 | **Government / Policy** | BLM, NPS, FHWA, USDA, EPA, state gov feeds | Federal agency actions that affect specific states |
| 7 | **Local News** | SFGate + others per state | Hyperlocal stories |
| 8 | **Travel News** | TheTravel, outlet travel sections | Timely — openings, closures, advisories |
| 9 | **Travel Features** | Condé Nast Traveler, AFAR, Atlas Obscura, Smithsonian, BBC Travel, Islands | Evergreen destination inspiration |
| 10 | **New Laws 2026** | LegiScan, legislature feeds | Bills, acts, executive orders by state |
| 11 | **Social Buzz** | Reddit (state subreddits, r/news, r/travel), Google Trends (by state) | What real people are talking about right now |

### Summary Generation
- **Primary:** Claude Haiku generates a 1-2 sentence summary (who, what, when, where) from article content
- **Fallback:** Publisher snippet when full article text can't be fetched (paywalls, etc.)
- **Estimated cost:** ~$1-2/day for all tabs combined

### Batch Operations (menu items, shared across all tabs)
- **Transfer Approved** — moves all "Approved" rows to destination sheet in main WIYS spreadsheet, then clears them
- **Delete Marked** — removes all "Delete" rows in one click

---

## Source Types

### 1. RSS Feeds (direct)
For sites that publish RSS. Parsed with `XmlService` in Apps Script.
- Travel publications (Condé Nast Traveler, Atlas Obscura, AFAR, etc.)
- Major national news outlets (Reuters, AP, NPR, etc.)
- Federal government agencies (NPS, BLM, Forest Service, etc.)
- Local news outlets — 1 major newspaper per state (original reporting, not aggregators)

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

#### RSS Feeds — Major National Outlets (confirmed working)
Use section-specific feeds (travel, US news) to pre-filter at the source level.

**Travel feeds:**
| Source | RSS URL |
|--------|---------|
| New York Times Travel | `https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml` |
| CNN Travel | `http://rss.cnn.com/rss/cnn_travel.rss` |
| Fox News Travel | `https://moxie.foxnews.com/google-publisher/travel.xml` |
| The Guardian Travel | `https://www.theguardian.com/travel/rss` |
| AP News Travel | `https://apnews.com/hub/travel.rss` (unofficial) |

**US News feeds (for policy, laws, state-level news):**
| Source | RSS URL |
|--------|---------|
| CNN US | `http://rss.cnn.com/rss/cnn_us.rss` |
| Fox News US | `https://moxie.foxnews.com/google-publisher/us.xml` |
| NYT US | `https://rss.nytimes.com/services/xml/rss/nyt/US.xml` |
| NPR National | `https://feeds.npr.org/1003/rss.xml` |
| CBS News US | `https://www.cbsnews.com/latest/rss/us` |
| Guardian US News | `https://www.theguardian.com/us-news/rss` |
| Washington Post National | `https://feeds.washingtonpost.com/rss/national` |
| The Hill Policy | `https://thehill.com/policy/feed/` |

**Not available:** Reuters (discontinued RSS in 2020), USA Today (legacy Feedburner URLs, unreliable)

#### RSS Feeds — Needs Verification
| Source | RSS URL | Issue |
|--------|---------|-------|
| Outside Online | `https://www.outsideonline.com/feed/` | Behind paywall/login |
| Lonely Planet | `https://www.lonelyplanet.com/news/feed/atom/` | Returning 403 |
| Travel + Leisure | `https://feeds-api.dotdashmeredith.com/v1/rss/google/{GUID}` | Exact GUID unknown |
| DOT Main | `https://www.transportation.gov/rss` | Page exists, exact XML URL needs confirmation |
| FAA Press | RSS link exists on newsroom page | Exact URL needs extraction |

#### RSS Feeds — State Tourism Boards (mostly no RSS)
Only 4 of 50 states have confirmed RSS feeds. The rest need the Gmail newsletter approach.
| Source | RSS URL |
|--------|---------|
| Visit Delaware | `https://visitdelaware.com/blog/rss` |
| I Love NY | `https://www.iloveny.com/blog/rss/` |
| Travel Kansas | `https://travelks.com/blog` (blog RSS) |
| Indiana Dunes | `https://indianadunes.com/blog/rss` |

#### Gmail Newsletter Approach (no RSS available)
These sites don't offer RSS feeds. Subscribe to their newsletters and scrape from Gmail.
- National Geographic Travel
- Newsbreak
- Thrillist
- Fodor's Travel
- TSA (email subscription only)
- US Fish & Wildlife Service (email subscription only)
- Brand USA (email subscription only)
- 46 of 50 state tourism boards (no RSS — use their email newsletters)

#### APIs
| Source | API | Notes |
|--------|-----|-------|
| NPS API | `https://developer.nps.gov/api/v1/newsreleases` | 250 releases per call |
| LegiScan | TBD | State legislation tracker — all 50 states, searchable by topic |

---

## Filtering Pipeline

### Layer 1: Keyword Blacklist (free — auto-discard)

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

### Layer 2: Claude Haiku Summary (who, what, when, where)

For every article that passes the blacklist, Claude Haiku generates a 1-2 sentence
summary. No scoring, no filtering — everything lands in the sheet for Jamie to review.

**Method:**
- Batch article titles + content into API calls
- Claude Haiku generates a short factual summary (who, what, when, where)
- Fallback: publisher snippet if full text can't be fetched (paywalls, etc.)

**Cost Estimate:** ~$1-2/day for all tabs combined

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
- [ ] Where do "Approved" articles transfer to? (Which tab in the main spreadsheet?)
- [x] RSS feed availability research results (complete — Feb 2026)
- [ ] LegiScan API — free tier limits? Cost?
- [ ] Should deprecated scraper files be removed from repo?

# US Federal Agency RSS Feeds for State-Relevant News

**Research Date:** 2026-02-24
**Purpose:** Reference for "When In Your State" scraping pipeline — organized by category with actual feed URLs, content descriptions, and state/region filtering capability.

---

## TIER 1 — Native State Filtering, High Story Value

These feeds support filtering by state/region out of the box.

### 1. NWS Weather Alerts API

| Feed | URL | State Filter? |
|------|-----|--------------|
| Active Alerts by State | `https://api.weather.gov/alerts/active?area={STATE}` (e.g., `?area=AZ`) | YES |
| Active Alerts by Zone | `https://api.weather.gov/alerts/active?zone={ZONE}` | YES |

**Story types:** Severe weather warnings, watches, advisories, winter storms, flooding, heat, fire weather, tornadoes, hurricanes.
**Rate limit:** No more than 1 request per 30 seconds.
**Format:** JSON-LD by default, also supports ATOM.
**Status:** CONFIRMED working.

### 2. FBI Field Office Feeds

| Feed | URL Pattern | State Filter? |
|------|------------|--------------|
| Per-City Field Office | `https://www.fbi.gov/contact-us/field-offices/{city}/news/RSS` | YES |

**Examples:**
- Phoenix: `https://www.fbi.gov/contact-us/field-offices/phoenix/news/RSS`
- Los Angeles: `https://www.fbi.gov/contact-us/field-offices/losangeles/news/RSS`
- New York: `https://www.fbi.gov/contact-us/field-offices/newyork/news/RSS`
- Chicago: `https://www.fbi.gov/contact-us/field-offices/chicago/news/RSS`

All 56 field offices have feeds. Full list at `https://www.fbi.gov/feeds`.

**Story types:** Arrests, indictments, convictions, cyber crime, public corruption, violent crime, white-collar crime.
**Status:** CONFIRMED working.

### 3. DOJ U.S. Attorney Feeds

| Feed | URL Pattern | State Filter? |
|------|------------|--------------|
| Per-District | `https://www.justice.gov/usao-{district-code}/pr` (each has RSS link) | YES |

**District code examples:**
- `usao-az` = District of Arizona
- `usao-sdny` = Southern District of New York
- `usao-cdca` = Central District of California
- `usao-ndil` = Northern District of Illinois

All 94 U.S. Attorney districts have their own feeds.

**Story types:** Federal prosecutions, sentencing, indictments, civil rights cases, opioid enforcement.
**Status:** CONFIRMED working.

### 4. EPA Regional Feeds

| Feed | URL Pattern | State Filter? |
|------|------------|--------------|
| By Region | `https://www.epa.gov/newsreleases/search/rss/field_press_office/region-{XX}` | YES (by region) |
| By Region + Topic | `https://www.epa.gov/newsreleases/search/rss/field_press_office/region-{XX}/subject/{topic}` | YES |

**EPA Region-to-State Mapping:**
- Region 01: CT, ME, MA, NH, RI, VT
- Region 02: NJ, NY, PR, USVI
- Region 03: DE, DC, MD, PA, VA, WV
- Region 04: AL, FL, GA, KY, MS, NC, SC, TN
- Region 05: IL, IN, MI, MN, OH, WI
- Region 06: AR, LA, NM, OK, TX
- Region 07: IA, KS, MO, NE
- Region 08: CO, MT, ND, SD, UT, WY
- Region 09: AZ, CA, HI, NV, Pacific Islands
- Region 10: AK, ID, OR, WA

**Story types:** Enforcement actions, Superfund updates, clean air/water violations, environmental justice, grants.
**Status:** CONFIRMED working.

### 5. States Newsroom (All 50 States)

**This is potentially the single most valuable source.** States Newsroom is the largest nonprofit news organization dedicated to state coverage, now operating in all 50 states. Content is free to republish.

**Feed URL pattern:** `https://{site-domain}/feed/localFeed`

| State | Newsroom | Feed URL |
|-------|----------|----------|
| Alabama | Alabama Reflector | `https://alabamareflector.com/feed/localFeed` |
| Alaska | Alaska Beacon | `https://alaskabeacon.com/feed/localFeed` |
| Arizona | Arizona Mirror | `https://azmirror.com/feed/localFeed` |
| Arkansas | Arkansas Advocate | `https://arkansasadvocate.com/feed/localFeed` |
| Colorado | Colorado Newsline | `https://coloradonewsline.com/feed/localFeed` |
| Florida | Florida Phoenix | `https://floridaphoenix.com/feed/localFeed` |
| Georgia | Georgia Recorder | `https://georgiarecorder.com/feed/localFeed` |
| Idaho | Idaho Capital Sun | `https://idahocapitalsun.com/feed/localFeed` |
| Indiana | Indiana Capital Chronicle | `https://indianacapitalchronicle.com/feed/localFeed` |
| Iowa | Iowa Capital Dispatch | `https://iowacapitaldispatch.com/feed/localFeed` |
| Kansas | Kansas Reflector | `https://kansasreflector.com/feed/localFeed` |
| Kentucky | Kentucky Lantern | `https://kentuckylantern.com/feed/localFeed` |
| Louisiana | Louisiana Illuminator | `https://lailluminator.com/feed/localFeed` |
| Maine | Maine Morning Star | `https://mainemorningstar.com/feed/localFeed` |
| Maryland | Maryland Matters | `https://marylandmatters.org/feed/localFeed` |
| Michigan | Michigan Advance | `https://michiganadvance.com/feed/localFeed` |
| Minnesota | Minnesota Reformer | `https://minnesotareformer.com/feed/localFeed` |
| Missouri | Missouri Independent | `https://missouriindependent.com/feed/localFeed` |
| Montana | Montana Free Press | `https://montanafreepress.org/feed/localFeed` |
| Nebraska | Nebraska Examiner | `https://nebraskaexaminer.com/feed/localFeed` |
| Nevada | Nevada Current | `https://nevadacurrent.com/feed/localFeed` |
| New Hampshire | New Hampshire Bulletin | `https://newhampshirebulletin.com/feed/localFeed` |
| New Jersey | New Jersey Monitor | `https://newjerseymonitor.com/feed/localFeed` |
| New Mexico | Source New Mexico | `https://sourcenm.com/feed/localFeed` |
| North Carolina | NC Newsline | `https://ncnewsline.com/feed/localFeed` |
| North Dakota | North Dakota Monitor | `https://northdakotamonitor.com/feed/localFeed` |
| Ohio | Ohio Capital Journal | `https://ohiocapitaljournal.com/feed/localFeed` |
| Oklahoma | Oklahoma Voice | `https://oklahomavoice.com/feed/localFeed` |
| Oregon | Oregon Capital Chronicle | `https://oregoncapitalchronicle.com/feed/localFeed` |
| Pennsylvania | Pennsylvania Capital-Star | `https://penncapital-star.com/feed/localFeed` |
| Rhode Island | Rhode Island Current | `https://rhodeislandcurrent.com/feed/localFeed` |
| South Carolina | SC Daily Gazette | `https://scdailygazette.com/feed/localFeed` |
| South Dakota | South Dakota Searchlight | `https://southdakotasearchlight.com/feed/localFeed` |
| Tennessee | Tennessee Lookout | `https://tennesseelookout.com/feed/localFeed` |
| Utah | Utah News Dispatch | `https://utahnewsdispatch.com/feed/localFeed` |
| Virginia | Virginia Mercury | `https://virginiamercury.com/feed/localFeed` |
| Washington | Washington State Standard | `https://washingtonstatestandard.com/feed/localFeed` |
| West Virginia | West Virginia Watch | `https://westvirginiawatch.com/feed/localFeed` |
| Wisconsin | Wisconsin Examiner | `https://wisconsinexaminer.com/feed/localFeed` |

**Partner outlets (11 states with their own sites/feeds):**
California (CalMatters), Connecticut (CT Mirror), Delaware (Spotlight Delaware), Hawaii (Honolulu Civil Beat), Illinois (Capitol News Illinois), Massachusetts (CommonWealth Beacon), Mississippi (Mississippi Today), New York (New York Focus), Texas (The Texas Tribune), Vermont (VTDigger), Wyoming (WyoFile).

**Status:** CONFIRMED working.

### 6. Army Corps of Engineers District Feeds

| Feed | URL Pattern | State Filter? |
|------|------------|--------------|
| Per-District | `https://www.{district-code}.usace.army.mil/Contact/RSS/` | YES (by district) |

**Examples:**
- New York: `https://www.nan.usace.army.mil/Contact/RSS/`
- Sacramento: `https://www.spk.usace.army.mil/Contact/RSS/`
- Baltimore: `https://www.nab.usace.army.mil/Contact/RSS/`
- Omaha: `https://www.nwo.usace.army.mil/Contact/RSS/`

**Story types:** Flood control, dam operations, navigation projects, infrastructure permits, dredging.
**Status:** CONFIRMED working.

### 7. USGS Earthquake API

| Feed | URL | State Filter? |
|------|-----|--------------|
| Bounding Box Query | `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=X&maxlatitude=X&minlongitude=X&maxlongitude=X` | YES |
| Significant Quakes (Day) | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.atom` | No (global) |
| M4.5+ Past Day | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.atom` | No (global) |
| All Past Week | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.atom` | No (global) |

**Story types:** Earthquake events with magnitude, location, depth, time.
**Status:** CONFIRMED working. Updated every minute.

---

## TIER 2 — National Feeds, Programmatic State Filtering Possible

These are national feeds where state info is in the data — you'd filter it in code.

### FEMA Disaster Declarations

| Feed | URL | State Filter? |
|------|-----|--------------|
| All Disaster Declarations | `https://www.fema.gov/news/disasters_rss.fema` | No (but state field in data) |
| Media Library | `https://www.fema.gov/media-library/collections/381/rss.xml` | No |

**Story types:** Disaster declarations, fire management assistance, emergency declarations, grant announcements.
**Status:** CONFIRMED working.

### FDA (Food and Drug Administration)

| Feed | URL |
|------|-----|
| Food Safety Recalls | `https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/food-safety-recalls/rss.xml` |
| All Recalls | `https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/recalls/rss.xml` |
| FDA Outbreaks | `https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/fda-outbreaks/rss.xml` |
| MedWatch Safety Alerts | `https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/medwatch/rss.xml` |
| Press Releases | `https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/press-releases/rss.xml` |
| Consumer Updates | `https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/consumers/rss.xml` |

**Story types:** Drug approvals, food recalls, safety alerts, outbreak investigations.
**Status:** CONFIRMED working.

### CPSC (Consumer Product Safety Commission)

| Feed | URL |
|------|-----|
| All Recalls | `https://www.cpsc.gov/Newsroom/CPSC-RSS-Feed/Recalls-RSS` |
| Recall API | `https://www.saferproducts.gov/RestWebServices/Recall?...` |

**Story types:** Consumer product recalls, safety warnings, hazard reports.
**Status:** CONFIRMED working.

### National Hurricane Center

| Feed | URL |
|------|-----|
| Atlantic Basin | `https://www.nhc.noaa.gov/index-at.xml` |
| Eastern Pacific | `https://www.nhc.noaa.gov/index-ep.xml` |
| Central Pacific | `https://www.nhc.noaa.gov/index-cp.xml` |

**Story types:** Hurricane advisories, tropical storm warnings, forecast discussions.
**Status:** CONFIRMED working.

### Storm Prediction Center

| Feed | URL |
|------|-----|
| All Products | `https://www.spc.noaa.gov/products/spcrss.xml` |
| Tornado/Severe Watches | `https://www.spc.noaa.gov/products/spcwwrss.xml` |
| Fire Weather | `https://www.spc.noaa.gov/products/spcfwrss.xml` |
| Convective Outlooks | `https://www.spc.noaa.gov/products/spcacrss.xml` |

**Story types:** Severe weather watches, fire weather, mesoscale discussions.
**Status:** CONFIRMED working.

---

## TIER 3 — National Feeds, Valuable Content, No State Filter

### CDC

| Feed | URL |
|------|-----|
| Newsroom | `https://tools.cdc.gov/api/v2/resources/media/132608.rss` |
| Travel Health Notices | `https://wwwnc.cdc.gov/travel/rss/notices.xml` |

**Status:** NEEDS VERIFICATION (CDC website restructured).

### Federal Register (Custom Feeds)

Build custom feeds at `https://www.federalregister.gov` — search by keyword (can include state names), filter by agency/type, then subscribe via RSS.

**Status:** CONFIRMED working.

### Grants.gov

| Feed | URL |
|------|-----|
| Opportunities by Agency | `https://www.grants.gov/rss/GG_OppModByCategory.xml` |

**Status:** CONFIRMED working.

### FTC

| Feed | URL |
|------|-----|
| RSS Hub | `https://www.ftc.gov/stay-connected/rss` |

Topics: Consumer Alerts, Identity Theft, Scams, Online Privacy.
**Status:** CONFIRMED.

### USDA

| Feed | URL |
|------|-----|
| RSS Hub | `https://www.usda.gov/about-usda/policies-and-links/digital/rss-feeds` |
| FSIS Recalls | `https://www.fsis.usda.gov/RSS/usdarss.xml` |

**Status:** CONFIRMED.

### Bureau of Labor Statistics

| Feed | URL |
|------|-----|
| RSS Hub | `https://www.bls.gov/feed/` |

**Status:** CONFIRMED.

### VA (Veterans Affairs)

| Feed | URL |
|------|-----|
| RSS Hub | `https://www.va.gov/rss/` |
| Inside Veterans Health | `https://www.va.gov/health/NewsFeatures/news.xml` |

**Status:** CONFIRMED.

### Congress.gov / Legislation

| Feed | URL |
|------|-----|
| RSS Hub | `https://www.congress.gov/rss` |
| GovTrack (per-state bills) | `https://www.govtrack.us` |
| LegiScan (all 50 states) | `https://legiscan.com/` |

**Status:** CONFIRMED.

### NPS (National Park Service)

Per-park feeds. Pattern: `https://www.nps.gov/{parkcode}/learn/news/newsreleases.htm` (look for RSS icon).
**Status:** CONFIRMED.

### Recalls.gov (Multi-Agency Hub)

Aggregates recalls from CPSC, FDA, USDA, NHTSA, EPA, Coast Guard.
- CPSC: `https://www.recalls.gov/cpsc.html`
- FDA: `https://www.recalls.gov/rrfda.aspx`
- USDA: `https://www.recalls.gov/rrusda.aspx`
- NHTSA: `https://www.recalls.gov/rrvehicles.aspx`

**Status:** CONFIRMED.

---

## AGENCIES WITH NO RSS FEED

These would require HTML scraping or email subscription workarounds:
- **DEA** — no RSS
- **U.S. Marshals** — no RSS
- **ATF** — no confirmed RSS
- **White House** — no official RSS (current admin)
- **U.S. Fish & Wildlife Service** — no RSS page found

---

## REFERENCE SOURCES

- [NWS Alerts API Docs](https://www.weather.gov/documentation/services-web-alerts)
- [USGS Earthquake Feeds](https://earthquake.usgs.gov/earthquakes/feed/v1.0/)
- [NHC RSS Feeds](https://www.nhc.noaa.gov/aboutrss.shtml)
- [SPC RSS Feeds](https://www.spc.noaa.gov/aboutrss.html)
- [FDA News Feeds](https://www.fda.gov/about-fda/contact-fda/subscribe-podcasts-and-news-feeds)
- [EPA News Releases](https://www.epa.gov/newsroom/browse-news-releases)
- [FBI Feeds](https://www.fbi.gov/feeds)
- [DOJ USAO RSS](https://www.justice.gov/usao/rss)
- [States Newsroom RSS](https://statesnewsroom.com/rss-feeds/)
- [CPSC RSS](https://www.cpsc.gov/Newsroom/CPSC-RSS-Feed)
- [FEMA Data Sources](https://www.fema.gov/about/openfema/other-data-sources)
- [Recalls.gov](https://www.recalls.gov/)
- [GovTrack.us](https://www.govtrack.us/)
- [LegiScan](https://legiscan.com/)

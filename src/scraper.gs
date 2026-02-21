/**
 * ============================================================================
 * NEWS SCRAPER SYSTEM
 * ============================================================================
 * Automated topic-finding pipeline for wheninyourstate.com.
 * Fetches RSS feeds, filters by keyword blacklist, generates Haiku summaries
 * with time sensitivity scoring (🔴🟢🟡), and writes results to a dedicated scraper
 * spreadsheet for Jamie to triage.
 *
 * Architecture: docs/architecture/news-scraper-system.md
 *
 * Flow:
 *   RSS Feeds → Keyword Blacklist Filter → Deduplication → Claude Haiku Summary
 *   → Scraper Spreadsheet → Jamie reviews → Transfer Approved → Enhanced Drafter
 * ============================================================================
 */


// ============================================================================
// SCRAPER CONFIGURATION
// ============================================================================

var SCRAPER = {
  // Dedicated scraper spreadsheet (separate from main WIYS production sheet)
  SPREADSHEET_ID: '1o6XYCfLRvV8XeBx5OplmlLRU6IAotEpxqs4mbWgeiTY',

  TABS: {
    BREAKING_TRENDING: 'Breaking / Trending',
    GOVERNMENT_POLICY: 'Government / Policy',
    NEW_LAWS: 'New Laws 2026'
  },

  // New Laws 2026 tab has a different column layout than RSS tabs
  NEW_LAWS_COLUMNS: {
    STATE: 1,         // A
    IDENTIFIER: 2,    // B (e.g. "SB 1234")
    TITLE: 3,         // C (hyperlinked to Open States page)
    SUMMARY: 4,       // D
    BILL_STATUS: 5,   // E (e.g. "Signed by Governor")
    STATUS_DATE: 6,   // F
    STATUS: 7,        // G (workflow: blank / Approved / Delete)
    OPENSTATES_URL: 8 // H (hidden — raw URL for programmatic access)
  },

  NEW_LAWS_HEADERS: ['State', 'Identifier', 'Title', 'Summary', 'Bill Status', 'Status Date', 'Status', 'URL'],

  FRESHNESS: {
    BREAKING: '🔴',   // Breaking news — publish ASAP
    RELEVANT: '🟢',   // Relevant — can wait for publishing
    EVERGREEN: '🟡'   // Evergreen — no rush, save for slow days
  },

  COLUMNS: {
    DATE: 1,       // A
    SOURCE: 2,     // B
    STATE: 3,      // C
    TITLE: 4,      // D (hyperlinked to article URL)
    SUMMARY: 5,    // E
    FRESHNESS: 6,  // F (🔴/🟢/🟡)
    STATUS: 7,     // G
    URL: 8         // H (hidden — raw URL for programmatic access)
  },

  HEADERS: ['Date', 'Source', 'State', 'Title', 'Summary', 'Time Sensitivity', 'Status', 'URL'],

  // RSS sources grouped by target tab
  SOURCES: {
    'Breaking / Trending': [
      { name: 'CNN US', url: 'http://rss.cnn.com/rss/cnn_us.rss' },
      { name: 'NPR', url: 'https://feeds.npr.org/1003/rss.xml' },
      { name: 'CBS News', url: 'https://www.cbsnews.com/latest/rss/us' },
      { name: 'Guardian US', url: 'https://www.theguardian.com/us-news/rss' },
      { name: 'BBC US', url: 'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml' },
      { name: 'Fox News US', url: 'https://moxie.foxnews.com/google-publisher/us.xml' },
      { name: 'NYT US', url: 'https://rss.nytimes.com/services/xml/rss/nyt/US.xml' },
      { name: 'WashPost', url: 'https://feeds.washingtonpost.com/rss/national' },
      { name: 'The Hill', url: 'https://thehill.com/policy/feed/' }
    ],
    'Government / Policy': [
      { name: 'BLM National', url: 'https://www.blm.gov/press-release/national-office/rss' },
      { name: 'BLM Arizona', url: 'https://www.blm.gov/press-release/arizona/rss' },
      { name: 'BLM California', url: 'https://www.blm.gov/press-release/california/rss' },
      { name: 'BLM Colorado', url: 'https://www.blm.gov/press-release/colorado/rss' },
      { name: 'BLM Idaho', url: 'https://www.blm.gov/press-release/idaho/rss' },
      { name: 'BLM Montana', url: 'https://www.blm.gov/press-release/montana-dakotas/rss' },
      { name: 'BLM Nevada', url: 'https://www.blm.gov/press-release/nevada/rss' },
      { name: 'BLM New Mexico', url: 'https://www.blm.gov/press-release/new-mexico/rss' },
      { name: 'BLM Oregon-WA', url: 'https://www.blm.gov/press-release/oregon-washington/rss' },
      { name: 'BLM Utah', url: 'https://www.blm.gov/press-release/utah/rss' },
      { name: 'BLM Wyoming', url: 'https://www.blm.gov/press-release/wyoming/rss' },
      { name: 'BLM Alaska', url: 'https://www.blm.gov/press-release/alaska/rss' },
      { name: 'BLM Eastern', url: 'https://www.blm.gov/press-release/eastern-states/rss' },
      { name: 'CDC Travel', url: 'https://wwwnc.cdc.gov/travel/rss/notices.xml' }
    ],
    'New Laws 2026': [
      // Powered by Open States API v3 (not RSS) — see scrapeNewLaws() below
    ]
  },

  // Number of articles per Haiku API call (batching for cost efficiency)
  HAIKU_BATCH_SIZE: 10,

  // Maximum articles to keep per tab (oldest get pushed down, not deleted)
  MAX_ARTICLES_PER_TAB: 500
};


// ============================================================================
// KEYWORD BLACKLIST
// ============================================================================
// Articles matching any keyword in title or description are auto-discarded.
// Organized by category for maintainability, flattened at runtime for speed.

var SCRAPER_BLACKLIST = {
  SUBSTANCES: [
    'alcohol', 'beer', 'wine', 'brewery', 'distillery', 'cocktail', 'bar crawl',
    'drug', 'cannabis', 'marijuana', 'weed', 'dispensary', 'psychedelic'
  ],
  VIOLENCE: [
    'shooting', 'murder', 'homicide', 'serial killer', 'violent crime',
    'stabbing', 'assault', 'mass shooting'
  ],
  SEXUAL: [
    'sexual', 'adult entertainment', 'strip club', 'escort', 'sex tourism'
  ],
  LGBTQ: [
    'pride event', 'pride parade', 'lgbtq', 'pride month', 'drag show'
  ],
  MISINFO: [
    'ufo sighting', 'chemtrail', 'flat earth', 'bigfoot', 'conspiracy theory'
  ],
  GAMBLING: [
    'casino promotion', 'gambling', 'sports betting', 'online poker'
  ],
  CELEBRITY: [
    'celebrity', 'gossip', 'paparazzi', 'red carpet',
    'celebrity home', 'celebrity vacation'
  ],
  COMMERCIAL: [
    'earnings report', 'quarterly results', 'market share', 'ipo', 'boardroom',
    'stock price', 'investing advice', 'trading', 'wall street',
    'restaurant review', 'hotel review', 'best restaurants', 'best hotels'
  ],
  SPORTS: [
    'sports score', 'playoff', 'championship', 'game recap', 'touchdown',
    'nfl draft', 'nba finals', 'world series', 'super bowl',
    'college team', 'college football', 'college basketball', 'ncaa',
    'varsity', 'march madness', 'bowl game', 'division i'
  ],
  CAMPUS: [
    'sorority', 'fraternity', 'homecoming game', 'campus event',
    'student athlete', 'college sports', 'university athletics'
  ],
  TECH: [
    'tech launch', 'product review', 'iphone', 'android', 'gadget'
  ],
  FOREIGN: [
    'foreign election', 'foreign politics'
  ],
  POLITICAL: [
    'campaign poll', 'polling numbers', 'primary results',
    'campaign strategy', 'fundraising totals'
  ],
  DEALS: [
    'flash sale', 'promo code', 'coupon', 'price drop',
    'sponsored', 'paid partnership', 'affiliate'
  ],
  B2B: [
    'travel industry', 'travel trade', 'group travel',
    'hospitality industry', 'hotel industry', 'tourism board meeting',
    'trade show', 'expo'
  ],
  FAST_STALE: [
    'road closure', 'road work', 'detour', 'traffic alert',
    'weather warning', 'tornado watch', 'flood warning', 'winter storm warning',
    'power outage', 'evacuation order', 'boil water advisory',
    'recall notice'
  ]
};

var SCRAPER_BLOCKED_DOMAINS = ['travelandtourworld.com', 'weather.com'];


// ============================================================================
// STATE DETECTION
// ============================================================================

var US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

var MAJOR_CITIES = {
  'New York City': 'New York', 'Los Angeles': 'California',
  'Chicago': 'Illinois', 'Houston': 'Texas', 'Phoenix': 'Arizona',
  'Philadelphia': 'Pennsylvania', 'San Antonio': 'Texas',
  'San Diego': 'California', 'Dallas': 'Texas', 'San Jose': 'California',
  'Austin': 'Texas', 'Jacksonville': 'Florida', 'Fort Worth': 'Texas',
  'Columbus': 'Ohio', 'Charlotte': 'North Carolina',
  'Indianapolis': 'Indiana', 'San Francisco': 'California',
  'Seattle': 'Washington', 'Denver': 'Colorado', 'Nashville': 'Tennessee',
  'Oklahoma City': 'Oklahoma', 'Portland': 'Oregon',
  'Las Vegas': 'Nevada', 'Memphis': 'Tennessee', 'Louisville': 'Kentucky',
  'Baltimore': 'Maryland', 'Milwaukee': 'Wisconsin',
  'Albuquerque': 'New Mexico', 'Tucson': 'Arizona',
  'Sacramento': 'California', 'Atlanta': 'Georgia', 'Omaha': 'Nebraska',
  'Miami': 'Florida', 'Detroit': 'Michigan', 'Raleigh': 'North Carolina',
  'Boston': 'Massachusetts', 'Minneapolis': 'Minnesota',
  'Tampa': 'Florida', 'Orlando': 'Florida', 'Pittsburgh': 'Pennsylvania',
  'St. Louis': 'Missouri', 'Cleveland': 'Ohio', 'Cincinnati': 'Ohio',
  'Kansas City': 'Missouri', 'New Orleans': 'Louisiana',
  'Salt Lake City': 'Utah', 'Honolulu': 'Hawaii', 'Anchorage': 'Alaska',
  'Boise': 'Idaho'
};


// ============================================================================
// RSS FETCHING & PARSING
// ============================================================================

/**
 * Fetch and parse an RSS feed. Handles both RSS 2.0 and Atom formats.
 * @param {string} url - RSS feed URL
 * @param {string} sourceName - Display name for this source
 * @returns {Array} Array of article objects: {title, link, date, description, source}
 */
function fetchRSS(url, sourceName) {
  try {
    var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var code = response.getResponseCode();

    if (code !== 200) {
      Logger.log('⚠️ RSS fetch failed for ' + sourceName + ': HTTP ' + code);
      return [];
    }

    var xml = response.getContentText();
    var doc = XmlService.parse(xml);
    var root = doc.getRootElement();
    var rootName = root.getName().toLowerCase();

    if (rootName === 'rss') {
      return parseRSSItems(root, sourceName);
    } else if (rootName === 'feed') {
      return parseAtomItems(root, sourceName);
    } else {
      Logger.log('⚠️ Unknown feed format for ' + sourceName + ': root element = ' + rootName);
      return [];
    }
  } catch (e) {
    Logger.log('❌ RSS fetch error for ' + sourceName + ': ' + e.message);
    return [];
  }
}

/**
 * Parse RSS 2.0 format items.
 */
function parseRSSItems(root, sourceName) {
  var articles = [];
  var channel = root.getChild('channel');
  if (!channel) return articles;

  var items = channel.getChildren('item');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var title = getChildText(item, 'title');
    var link = getChildText(item, 'link');
    var pubDate = getChildText(item, 'pubDate');
    var description = getChildText(item, 'description');

    if (title && link) {
      articles.push({
        title: stripHtml(title).trim(),
        link: link.trim(),
        date: parseDate(pubDate),
        description: stripHtml(description || '').trim(),
        source: sourceName
      });
    }
  }
  return articles;
}

/**
 * Parse Atom format entries.
 */
function parseAtomItems(root, sourceName) {
  var articles = [];
  var ns = root.getNamespace();
  var entries = root.getChildren('entry', ns);

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var title = entry.getChildText('title', ns) || '';
    var published = entry.getChildText('published', ns) ||
                    entry.getChildText('updated', ns) || '';
    var summary = entry.getChildText('summary', ns) ||
                  entry.getChildText('content', ns) || '';

    // Atom links use href attribute
    var link = '';
    var links = entry.getChildren('link', ns);
    for (var j = 0; j < links.length; j++) {
      var rel = links[j].getAttribute('rel');
      if (!rel || rel.getValue() === 'alternate') {
        link = links[j].getAttribute('href').getValue();
        break;
      }
    }

    if (title && link) {
      articles.push({
        title: stripHtml(title).trim(),
        link: link.trim(),
        date: parseDate(published),
        description: stripHtml(summary).trim(),
        source: sourceName
      });
    }
  }
  return articles;
}

/**
 * Safely get text content of a child element.
 */
function getChildText(element, childName) {
  var child = element.getChild(childName);
  if (!child) return '';
  return child.getText() || child.getValue() || '';
}

/**
 * Strip HTML tags from text.
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
}

/**
 * Parse various date formats into a Date object.
 */
function parseDate(dateStr) {
  if (!dateStr) return new Date();
  try {
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date();
    return d;
  } catch (e) {
    return new Date();
  }
}


// ============================================================================
// BLACKLIST FILTERING
// ============================================================================

/**
 * Build a flat array of all blacklist keywords (lowercased).
 * Cached after first call to avoid rebuilding each time.
 */
var _flatBlacklist = null;
function getFlatBlacklist() {
  if (_flatBlacklist) return _flatBlacklist;
  _flatBlacklist = [];
  var categories = Object.keys(SCRAPER_BLACKLIST);
  for (var i = 0; i < categories.length; i++) {
    var words = SCRAPER_BLACKLIST[categories[i]];
    for (var j = 0; j < words.length; j++) {
      _flatBlacklist.push(words[j].toLowerCase());
    }
  }
  return _flatBlacklist;
}

/**
 * Check if an article should be discarded based on keyword blacklist.
 * @param {string} title - Article title
 * @param {string} description - Article description/snippet
 * @param {string} link - Article URL (for domain blocking)
 * @returns {boolean} true if article should be discarded
 */
function isBlacklisted(title, description, link) {
  var text = (title + ' ' + description).toLowerCase();
  var blacklist = getFlatBlacklist();

  // Check blocked domains
  for (var d = 0; d < SCRAPER_BLOCKED_DOMAINS.length; d++) {
    if (link && link.toLowerCase().indexOf(SCRAPER_BLOCKED_DOMAINS[d]) !== -1) {
      return true;
    }
  }

  // Check keywords
  for (var i = 0; i < blacklist.length; i++) {
    if (text.indexOf(blacklist[i]) !== -1) {
      return true;
    }
  }

  return false;
}


// ============================================================================
// STATE DETECTION
// ============================================================================

/**
 * Detect US state(s) mentioned in article title and description.
 * Checks state names and major city names.
 * @param {string} title - Article title
 * @param {string} description - Article description
 * @returns {string} Comma-separated state names, or empty string if none detected
 */
function detectState(title, description) {
  var text = title + ' ' + description;
  var found = {};

  // Check state names (word boundary matching to avoid false positives)
  for (var i = 0; i < US_STATES.length; i++) {
    var state = US_STATES[i];
    // Use word boundary check: state must not be preceded/followed by a letter
    var idx = text.indexOf(state);
    while (idx !== -1) {
      var before = idx > 0 ? text.charAt(idx - 1) : ' ';
      var after = idx + state.length < text.length ? text.charAt(idx + state.length) : ' ';
      if (!isLetter(before) && !isLetter(after)) {
        found[state] = true;
        break;
      }
      idx = text.indexOf(state, idx + 1);
    }
  }

  // Check major cities
  var cityNames = Object.keys(MAJOR_CITIES);
  for (var j = 0; j < cityNames.length; j++) {
    if (text.indexOf(cityNames[j]) !== -1) {
      found[MAJOR_CITIES[cityNames[j]]] = true;
    }
  }

  var states = Object.keys(found);
  return states.join(', ');
}

/**
 * Check if a character is a letter (a-z, A-Z).
 */
function isLetter(ch) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

/**
 * Convert a 1-based column number to a letter (1=A, 2=B, ... 26=Z).
 * Used for conditional formatting formulas.
 */
function getColLetter(colNum) {
  return String.fromCharCode(64 + colNum);
}


// ============================================================================
// CLAUDE HAIKU SUMMARIES + SCORING
// ============================================================================

/**
 * Generate summaries and urgency scores for a batch of articles using Claude Haiku.
 * Processes articles in batches of SCRAPER.HAIKU_BATCH_SIZE.
 * @param {Array} articles - Array of article objects
 * @returns {Array} Same articles with .summary and .freshness populated
 */
function generateHaikuSummaries(articles) {
  if (!articles || articles.length === 0) return articles;

  var apiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
  if (!apiKey) {
    Logger.log('⚠️ CLAUDE_API_KEY not set — using RSS descriptions as summaries');
    for (var i = 0; i < articles.length; i++) {
      articles[i].summary = articles[i].description || 'No summary available';
      articles[i].freshness = SCRAPER.FRESHNESS.RELEVANT;
    }
    return articles;
  }

  var batchSize = SCRAPER.HAIKU_BATCH_SIZE;
  for (var start = 0; start < articles.length; start += batchSize) {
    var end = Math.min(start + batchSize, articles.length);
    var batch = articles.slice(start, end);

    var results = callHaikuForBatch(batch, apiKey);
    for (var j = 0; j < batch.length; j++) {
      if (results && results[j]) {
        articles[start + j].summary = results[j].summary || articles[start + j].description;
        articles[start + j].freshness = results[j].freshness || SCRAPER.FRESHNESS.RELEVANT;
      } else {
        articles[start + j].summary = articles[start + j].description || 'No summary available';
        articles[start + j].freshness = SCRAPER.FRESHNESS.RELEVANT;
      }
    }
  }

  return articles;
}

/**
 * Call Claude Haiku API for a batch of articles.
 * @param {Array} batch - Array of article objects (max HAIKU_BATCH_SIZE)
 * @param {string} apiKey - Anthropic API key
 * @returns {Array} Array of {summary, freshness} objects
 */
function callHaikuForBatch(batch, apiKey) {
  var articleList = '';
  for (var i = 0; i < batch.length; i++) {
    articleList += (i + 1) + '. Title: ' + batch[i].title + '\n';
    articleList += '   Snippet: ' + (batch[i].description || 'N/A').substring(0, 300) + '\n\n';
  }

  var prompt = 'You are a news triage assistant for a US state-focused lifestyle news site.\n\n' +
    'For each article below, provide:\n' +
    '1. A 1-2 sentence factual summary (who, what, when, where). No opinions.\n' +
    '2. A time sensitivity score (use the exact emoji):\n' +
    '   - "🔴" = Breaking news — time-sensitive, should publish ASAP\n' +
    '   - "🟢" = Relevant — good content but no rush, can wait days\n' +
    '   - "🟡" = Evergreen — no expiration, save for slow news days\n\n' +
    'Only use 🔴 for genuinely urgent stories (disasters, major policy changes, safety alerts).\n\n' +
    'Articles:\n' + articleList + '\n' +
    'Return ONLY a JSON array with one object per article, in order:\n' +
    '[{"summary": "...", "freshness": "🔴|🟢|🟡"}, ...]\n\n' +
    'No markdown, no explanation, just the JSON array.';

  try {
    var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      payload: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      }),
      muteHttpExceptions: true
    });

    var code = response.getResponseCode();
    if (code !== 200) {
      Logger.log('⚠️ Haiku API error: HTTP ' + code + ' — ' + response.getContentText().substring(0, 200));
      return null;
    }

    var result = JSON.parse(response.getContentText());
    var text = result.content[0].text.trim();

    // Extract JSON array from response (handle possible markdown wrapping)
    var jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      Logger.log('⚠️ Haiku response not valid JSON: ' + text.substring(0, 200));
      return null;
    }

    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    Logger.log('❌ Haiku API error: ' + e.message);
    return null;
  }
}


// ============================================================================
// SHEET OPERATIONS
// ============================================================================

/**
 * Set up the scraper spreadsheet from scratch.
 * Creates tabs, headers, formatting, dropdowns. Run ONCE.
 */
function setupScraperSheet() {
  var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
  var tabNames = [SCRAPER.TABS.BREAKING_TRENDING, SCRAPER.TABS.GOVERNMENT_POLICY, SCRAPER.TABS.NEW_LAWS];

  // Create tabs (or rename existing ones)
  var existingSheets = ss.getSheets();
  for (var t = 0; t < tabNames.length; t++) {
    var sheet;
    if (t < existingSheets.length) {
      sheet = existingSheets[t];
      sheet.setName(tabNames[t]);
      sheet.clear();
    } else {
      sheet = ss.insertSheet(tabNames[t]);
    }
    formatScraperTab(sheet);
  }

  // Delete extra sheets beyond what we need
  var allSheets = ss.getSheets();
  for (var d = allSheets.length - 1; d >= tabNames.length; d--) {
    if (allSheets.length > 1) {
      ss.deleteSheet(allSheets[d]);
    }
  }

  Logger.log('✅ Scraper spreadsheet set up with ' + tabNames.length + ' tabs');
}

/**
 * Format a single scraper tab: headers, column widths, dropdowns, conditional formatting.
 */
function formatScraperTab(sheet) {
  // Set headers in row 1
  var headerRange = sheet.getRange(1, 1, 1, SCRAPER.HEADERS.length);
  headerRange.setValues([SCRAPER.HEADERS]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#083345'); // Dark teal (matches main sheet)
  headerRange.setFontColor('#FFFFFF');

  // Column widths
  sheet.setColumnWidth(SCRAPER.COLUMNS.DATE, 100);
  sheet.setColumnWidth(SCRAPER.COLUMNS.SOURCE, 110);
  sheet.setColumnWidth(SCRAPER.COLUMNS.STATE, 120);
  sheet.setColumnWidth(SCRAPER.COLUMNS.TITLE, 420);
  sheet.setColumnWidth(SCRAPER.COLUMNS.SUMMARY, 420);
  sheet.setColumnWidth(SCRAPER.COLUMNS.FRESHNESS, 50);
  sheet.setColumnWidth(SCRAPER.COLUMNS.STATUS, 100);
  sheet.setColumnWidth(SCRAPER.COLUMNS.URL, 50);

  // Center-align the Score column
  sheet.getRange(2, SCRAPER.COLUMNS.FRESHNESS, 499, 1).setHorizontalAlignment('center');

  // Hide the URL column (H) — it's for programmatic use only
  sheet.hideColumns(SCRAPER.COLUMNS.URL);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Time Sensitivity dropdown (rows 2-500) — pre-filled by Haiku but editable
  var freshnessRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['\uD83D\uDD34', '\uD83D\uDFE2', '\uD83D\uDFE1'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, SCRAPER.COLUMNS.FRESHNESS, 499, 1).setDataValidation(freshnessRule);

  // Status dropdown (rows 2-500)
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['', 'Approved', 'Delete'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, SCRAPER.COLUMNS.STATUS, 499, 1).setDataValidation(statusRule);

  // Conditional formatting
  var rules = sheet.getConditionalFormatRules();

  // 🔴 Breaking = light red background on Source column (column B) so it pops
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$' + getColLetter(SCRAPER.COLUMNS.FRESHNESS) + '2="🔴"')
    .setBackground('#ffb3b3')
    .setRanges([sheet.getRange(2, SCRAPER.COLUMNS.SOURCE, 499, 1)])
    .build());

  // Approved = green
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Approved')
    .setBackground('#d0faad')
    .setRanges([sheet.getRange(2, SCRAPER.COLUMNS.STATUS, 499, 1)])
    .build());

  // Delete = gray
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Delete')
    .setBackground('#d9d9d9')
    .setRanges([sheet.getRange(2, SCRAPER.COLUMNS.STATUS, 499, 1)])
    .build());

  sheet.setConditionalFormatRules(rules);

  // Sort by date descending (newest first) — will apply on populated data
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, SCRAPER.HEADERS.length)
    .sort({ column: SCRAPER.COLUMNS.DATE, ascending: false });
}

/**
 * Get all existing article URLs in a tab to prevent duplicates.
 * @param {Object} sheet - Google Sheet object
 * @returns {Object} Set-like object where keys are URLs
 */
function getExistingUrls(sheet) {
  var urls = {};
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return urls;

  var urlData = sheet.getRange(2, SCRAPER.COLUMNS.URL, lastRow - 1, 1).getValues();
  for (var i = 0; i < urlData.length; i++) {
    if (urlData[i][0]) {
      urls[urlData[i][0].toString().trim()] = true;
    }
  }
  return urls;
}

/**
 * Write articles to a scraper tab. Inserts at row 2 (below header), pushing old content down.
 * This keeps newest articles at the top.
 * @param {Array} articles - Array of article objects
 * @param {Object} sheet - Google Sheet object
 */
function writeArticlesToSheet(articles, sheet) {
  if (!articles || articles.length === 0) return;

  // Insert rows at top (below header) to make room for new articles
  sheet.insertRowsAfter(1, articles.length);

  // Build the data array
  var rows = [];
  for (var i = 0; i < articles.length; i++) {
    var a = articles[i];
    var dateStr = Utilities.formatDate(a.date, 'America/Phoenix', 'M/d/yyyy');
    rows.push([
      dateStr,
      a.source,
      a.state || '',
      a.title,         // Plain text — hyperlink applied separately
      a.summary || a.description || '',
      a.freshness || '',
      '',              // Status — blank (Jamie decides)
      a.link           // URL (hidden column)
    ]);
  }

  // Write all data at once (bulk operation)
  var range = sheet.getRange(2, 1, articles.length, SCRAPER.HEADERS.length);
  range.setValues(rows);

  // Apply hyperlinks to Title column (column D) — link text to article URL
  for (var h = 0; h < articles.length; h++) {
    var cell = sheet.getRange(h + 2, SCRAPER.COLUMNS.TITLE);
    var richText = SpreadsheetApp.newRichTextValue()
      .setText(articles[h].title)
      .setLinkUrl(articles[h].link)
      .build();
    cell.setRichTextValue(richText);
    cell.setFontColor('#000000'); // Black, not blue
  }

  SpreadsheetApp.flush();
}

/**
 * Delete all rows with "Delete" status from all scraper tabs.
 */
function deleteMarkedRows() {
  var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
  var tabNames = Object.values(SCRAPER.TABS);
  var totalDeleted = 0;

  for (var t = 0; t < tabNames.length; t++) {
    var sheet = ss.getSheetByName(tabNames[t]);
    if (!sheet) continue;

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) continue;

    var statuses = sheet.getRange(2, SCRAPER.COLUMNS.STATUS, lastRow - 1, 1).getValues();

    // Delete from bottom up to avoid row index shifting
    for (var i = statuses.length - 1; i >= 0; i--) {
      if (statuses[i][0] === 'Delete') {
        sheet.deleteRow(i + 2);
        totalDeleted++;
      }
    }
  }

  Logger.log('🗑️ Deleted ' + totalDeleted + ' marked rows across all tabs');

  try {
    SpreadsheetApp.getUi().alert('Done!', totalDeleted + ' row(s) deleted.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {
    // No UI available (running from trigger) — just log it
  }
}

/**
 * Update tab names with unreviewed article counts: "Breaking / Trending (12)"
 * An article is "unreviewed" if its Status column (G) is blank.
 */
function updateUnreviewedCounts() {
  var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
  var tabNames = Object.values(SCRAPER.TABS);

  for (var t = 0; t < tabNames.length; t++) {
    var baseName = tabNames[t];
    // Find the sheet — might already have a count in its name
    var sheet = null;
    var allSheets = ss.getSheets();
    for (var s = 0; s < allSheets.length; s++) {
      var sheetName = allSheets[s].getName();
      // Match base name with or without count suffix
      if (sheetName === baseName || sheetName.indexOf(baseName) === 0) {
        sheet = allSheets[s];
        break;
      }
    }
    if (!sheet) continue;

    var lastRow = sheet.getLastRow();
    var count = 0;
    if (lastRow >= 2) {
      var statuses = sheet.getRange(2, SCRAPER.COLUMNS.STATUS, lastRow - 1, 1).getValues();
      for (var i = 0; i < statuses.length; i++) {
        if (!statuses[i][0] || statuses[i][0].toString().trim() === '') {
          count++;
        }
      }
    }

    var newName = count > 0 ? baseName + ' (' + count + ')' : baseName;
    if (sheet.getName() !== newName) {
      sheet.setName(newName);
    }
  }
}


// ============================================================================
// SCRAPER ORCHESTRATION
// ============================================================================

/**
 * Scrape all sources for a single tab.
 * Fetches RSS → filters blacklist → deduplicates → generates Haiku summaries → writes to sheet.
 * @param {string} tabName - Name of the tab to scrape (from SCRAPER.TABS)
 */
function scrapeTab(tabName) {
  var sources = SCRAPER.SOURCES[tabName];
  if (!sources || sources.length === 0) {
    Logger.log('⚠️ No sources configured for tab: ' + tabName);
    return;
  }

  Logger.log('🔍 Scraping ' + sources.length + ' sources for ' + tabName);

  var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
  // Find the sheet — might have count suffix in name
  var sheet = null;
  var allSheets = ss.getSheets();
  for (var s = 0; s < allSheets.length; s++) {
    var sheetName = allSheets[s].getName();
    if (sheetName === tabName || sheetName.indexOf(tabName) === 0) {
      sheet = allSheets[s];
      break;
    }
  }
  if (!sheet) {
    Logger.log('❌ Sheet not found: ' + tabName);
    return;
  }

  // Get existing URLs to prevent duplicates
  var existingUrls = getExistingUrls(sheet);
  Logger.log('📋 ' + Object.keys(existingUrls).length + ' existing articles in ' + tabName);

  // Fetch all sources
  var allArticles = [];
  for (var i = 0; i < sources.length; i++) {
    var articles = fetchRSS(sources[i].url, sources[i].name);
    Logger.log('  📰 ' + sources[i].name + ': ' + articles.length + ' items');
    allArticles = allArticles.concat(articles);
  }

  // Filter by blacklist
  var filtered = [];
  var blacklisted = 0;
  for (var j = 0; j < allArticles.length; j++) {
    if (isBlacklisted(allArticles[j].title, allArticles[j].description, allArticles[j].link)) {
      blacklisted++;
    } else {
      filtered.push(allArticles[j]);
    }
  }
  Logger.log('🚫 Blacklisted: ' + blacklisted + ' | Passed: ' + filtered.length);

  // Deduplicate against existing articles
  var newArticles = [];
  for (var k = 0; k < filtered.length; k++) {
    if (!existingUrls[filtered[k].link]) {
      newArticles.push(filtered[k]);
    }
  }
  Logger.log('🆕 New articles (after dedup): ' + newArticles.length);

  if (newArticles.length === 0) {
    Logger.log('✅ No new articles for ' + tabName);
    return;
  }

  // Detect states
  for (var m = 0; m < newArticles.length; m++) {
    newArticles[m].state = detectState(newArticles[m].title, newArticles[m].description);
  }

  // Generate Haiku summaries + urgency scores
  newArticles = generateHaikuSummaries(newArticles);

  // Write to sheet
  writeArticlesToSheet(newArticles, sheet);

  Logger.log('✅ Wrote ' + newArticles.length + ' new articles to ' + tabName);
}

// ============================================================================
// OPEN STATES API — NEW LAWS 2026
// ============================================================================
// Fetches enacted legislation (signed into law, became law) from all 50 states
// via the Open States API v3. Writes to the "New Laws 2026" tab.
//
// API docs: https://v3.openstates.org/docs
// Rate limits: 500 requests/day, 10/minute (Default tier)
// API key stored in Script Properties as OPENSTATES_API_KEY

/**
 * Action classifications that indicate a bill became law.
 * Open States standardizes these across all 50 states.
 */
var ENACTED_ACTIONS = [
  'became-law',
  'executive-signature',
  'executive-veto:veto-override',
  'passage'
];

/**
 * Keywords that surface enacted legislation in Open States full-text search.
 * Each keyword becomes one API query across ALL states — much more efficient
 * than querying 50 states individually (5-10 requests vs 50+).
 */
var NEW_LAW_KEYWORDS = [
  'signed into law',
  'takes effect',
  'enacted',
  'new law',
  'becomes law'
];

/**
 * Fetch bills from Open States API v3 using keyword search across all states.
 * @param {string} keyword - Search keyword (e.g. "signed into law")
 * @param {string} apiKey - Open States API key
 * @param {string} sinceDate - ISO date string (e.g. "2025-01-01")
 * @param {number} page - Page number (default 1)
 * @returns {Object|null} API response with .results and .pagination, or null on error
 */
function fetchOpenStatesBills(keyword, apiKey, sinceDate, page) {
  var baseUrl = 'https://v3.openstates.org/bills';
  var params = [
    'q=' + encodeURIComponent(keyword),
    'action_since=' + sinceDate,
    'include=actions',
    'include=abstracts',
    'sort=latest_action_desc',
    'per_page=20',
    'page=' + (page || 1)
  ];
  var url = baseUrl + '?' + params.join('&');

  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'get',
      headers: { 'X-API-KEY': apiKey },
      muteHttpExceptions: true
    });

    var code = response.getResponseCode();
    if (code === 429) {
      Logger.log('⚠️ Open States rate limit hit — pausing 10s');
      Utilities.sleep(10000);
      // Retry once
      response = UrlFetchApp.fetch(url, {
        method: 'get',
        headers: { 'X-API-KEY': apiKey },
        muteHttpExceptions: true
      });
      code = response.getResponseCode();
    }

    if (code !== 200) {
      Logger.log('⚠️ Open States API error for ' + state + ': HTTP ' + code);
      return null;
    }

    return JSON.parse(response.getContentText());
  } catch (e) {
    Logger.log('❌ Open States fetch error for ' + state + ': ' + e.message);
    return null;
  }
}

/**
 * Check if a bill has been enacted (signed into law, became law, or veto overridden).
 * Scans the bill's actions for enacted-type classifications.
 * @param {Object} bill - Bill object from Open States API (must include actions)
 * @returns {Object|null} The enacted action object, or null if not enacted
 */
function findEnactedAction(bill) {
  if (!bill.actions || bill.actions.length === 0) return null;

  for (var i = 0; i < bill.actions.length; i++) {
    var action = bill.actions[i];
    if (!action.classification) continue;

    for (var j = 0; j < action.classification.length; j++) {
      for (var k = 0; k < ENACTED_ACTIONS.length; k++) {
        if (action.classification[j] === ENACTED_ACTIONS[k]) {
          return action;
        }
      }
    }
  }
  return null;
}

/**
 * Build a human-readable bill status string from the enacted action.
 * @param {Object} action - Action object from Open States
 * @returns {string} Status like "Signed by Governor" or "Became Law"
 */
function formatBillStatus(action) {
  if (!action) return 'Enacted';
  // Use the action description from the state (more readable than classification)
  if (action.description) return action.description;
  // Fallback to classification
  if (action.classification && action.classification.length > 0) {
    var cls = action.classification[0];
    if (cls === 'executive-signature') return 'Signed by Governor';
    if (cls === 'became-law') return 'Became Law';
    if (cls === 'executive-veto:veto-override') return 'Veto Overridden';
    if (cls === 'passage') return 'Passed';
  }
  return 'Enacted';
}

/**
 * Get the best available summary for a bill.
 * Uses state-provided abstract first, falls back to title.
 * @param {Object} bill - Bill object from Open States API
 * @returns {string} Summary text
 */
function getBillSummary(bill) {
  if (bill.abstracts && bill.abstracts.length > 0 && bill.abstracts[0].abstract) {
    // Truncate very long abstracts
    var abstract = bill.abstracts[0].abstract;
    if (abstract.length > 500) {
      abstract = abstract.substring(0, 497) + '...';
    }
    return abstract;
  }
  return '';  // Empty — will be filled by Haiku if available
}

/**
 * Extract state name from an Open States bill's jurisdiction field.
 * @param {Object} bill - Bill object from Open States API
 * @returns {string} State name (e.g. "Arizona") or empty string
 */
function getStateFromBill(bill) {
  if (bill.jurisdiction && bill.jurisdiction.name) {
    return bill.jurisdiction.name;
  }
  return '';
}

/**
 * Scrape enacted legislation via keyword searches across all states.
 * Uses NEW_LAW_KEYWORDS to find bills related to new laws taking effect in 2026.
 * Searches from 2025-01-01 to catch 2025 laws that take effect in 2026.
 * Filters for enacted bills only, then writes to the New Laws 2026 tab.
 *
 * Uses ~5-15 API requests per run (vs 50+ for per-state approach).
 */
function scrapeNewLaws() {
  var apiKey = PropertiesService.getScriptProperties().getProperty('OPENSTATES_API_KEY');
  if (!apiKey) {
    Logger.log('❌ OPENSTATES_API_KEY not set in Script Properties. Run setOpenStatesApiKey() first.');
    return;
  }

  var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
  // Find the New Laws tab (might have count suffix)
  var sheet = null;
  var allSheets = ss.getSheets();
  for (var s = 0; s < allSheets.length; s++) {
    if (allSheets[s].getName().indexOf(SCRAPER.TABS.NEW_LAWS) === 0) {
      sheet = allSheets[s];
      break;
    }
  }
  if (!sheet) {
    Logger.log('❌ New Laws 2026 tab not found in scraper spreadsheet');
    return;
  }

  // Get existing bill identifiers to prevent duplicates (State + Identifier combo)
  var existingBills = {};
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var existingData = sheet.getRange(2, 1, lastRow - 1, 2).getValues(); // State + Identifier
    for (var e = 0; e < existingData.length; e++) {
      var key = (existingData[e][0] || '') + '|' + (existingData[e][1] || '');
      existingBills[key] = true;
    }
  }
  Logger.log('📋 ' + Object.keys(existingBills).length + ' existing bills in New Laws tab');

  // Search from 2025 to catch laws signed in 2025 that take effect in 2026
  var sinceDate = '2025-01-01';
  var newBills = [];
  var requestCount = 0;

  for (var i = 0; i < NEW_LAW_KEYWORDS.length; i++) {
    var keyword = NEW_LAW_KEYWORDS[i];
    Logger.log('🔍 Searching: "' + keyword + '"');

    // Fetch first page
    var data = fetchOpenStatesBills(keyword, apiKey, sinceDate, 1);
    requestCount++;

    if (!data || !data.results) {
      Logger.log('  ⚠️ No results for "' + keyword + '"');
      Utilities.sleep(6000);  // Rate limit spacing
      continue;
    }

    Logger.log('  📄 ' + keyword + ': ' + (data.pagination ? data.pagination.total_items : data.results.length) + ' total results');

    // Process results from this page
    var pageResults = processNewLawResults(data.results, existingBills);
    newBills = newBills.concat(pageResults);

    // Paginate if there are more pages (up to 3 pages per keyword to stay within budget)
    var maxPages = Math.min(data.pagination ? data.pagination.max_page : 1, 3);
    for (var page = 2; page <= maxPages; page++) {
      Utilities.sleep(6000);  // Rate limit: 10/min
      var pageData = fetchOpenStatesBills(keyword, apiKey, sinceDate, page);
      requestCount++;

      if (!pageData || !pageData.results || pageData.results.length === 0) break;

      var moreResults = processNewLawResults(pageData.results, existingBills);
      newBills = newBills.concat(moreResults);
    }

    // Rate limit spacing between keywords
    Utilities.sleep(6000);
  }

  Logger.log('🔍 Total new enacted bills found: ' + newBills.length + ' (used ' + requestCount + ' API requests)');

  if (newBills.length === 0) {
    Logger.log('✅ No new enacted bills to add');
    return;
  }

  // Generate Haiku summaries for bills missing abstracts
  var needsSummary = [];
  for (var n = 0; n < newBills.length; n++) {
    if (!newBills[n].summary) {
      needsSummary.push(n);
    }
  }

  if (needsSummary.length > 0) {
    Logger.log('🤖 Generating Haiku summaries for ' + needsSummary.length + ' bills without abstracts...');
    var haikuApiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
    if (haikuApiKey) {
      var batchSize = SCRAPER.HAIKU_BATCH_SIZE;
      for (var bStart = 0; bStart < needsSummary.length; bStart += batchSize) {
        var bEnd = Math.min(bStart + batchSize, needsSummary.length);
        var batch = [];
        for (var b = bStart; b < bEnd; b++) {
          var idx = needsSummary[b];
          batch.push({
            title: newBills[idx].identifier + ': ' + newBills[idx].title,
            description: newBills[idx].state + ' — ' + newBills[idx].billStatus
          });
        }
        var summaries = callHaikuForBatch(batch, haikuApiKey);
        if (summaries) {
          for (var r = 0; r < batch.length; r++) {
            var origIdx = needsSummary[bStart + r];
            if (summaries[r] && summaries[r].summary) {
              newBills[origIdx].summary = summaries[r].summary;
            }
          }
        }
      }
    }
  }

  // Write to sheet
  writeNewLawsToSheet(newBills, sheet);
  Logger.log('✅ Wrote ' + newBills.length + ' enacted bills to New Laws 2026');
}

/**
 * Process an array of bill results from the API.
 * Filters for enacted bills, deduplicates, extracts state from jurisdiction.
 * @param {Array} results - Array of bill objects from API response
 * @param {Object} existingBills - Dedup map (modified in place)
 * @returns {Array} Array of processed bill objects ready for sheet writing
 */
function processNewLawResults(results, existingBills) {
  var bills = [];
  for (var j = 0; j < results.length; j++) {
    var bill = results[j];
    var enactedAction = findEnactedAction(bill);
    if (!enactedAction) continue;  // Skip bills that haven't been enacted

    var state = getStateFromBill(bill);

    // Dedup check
    var dedupKey = state + '|' + (bill.identifier || '');
    if (existingBills[dedupKey]) continue;

    bills.push({
      state: state,
      identifier: bill.identifier || '',
      title: bill.title || '',
      summary: getBillSummary(bill),
      billStatus: formatBillStatus(enactedAction),
      statusDate: enactedAction.date || bill.latest_action_date || '',
      openstatesUrl: bill.openstates_url || ''
    });

    existingBills[dedupKey] = true;
  }
  return bills;
}

/**
 * Write enacted bills to the New Laws 2026 tab.
 * Inserts at row 2 (below header), pushing old content down.
 * @param {Array} bills - Array of bill objects from scrapeNewLaws()
 * @param {Object} sheet - Google Sheet object
 */
function writeNewLawsToSheet(bills, sheet) {
  if (!bills || bills.length === 0) return;

  var cols = SCRAPER.NEW_LAWS_COLUMNS;

  // Insert rows at top (below header)
  sheet.insertRowsAfter(1, bills.length);

  // Build data array
  var rows = [];
  for (var i = 0; i < bills.length; i++) {
    var b = bills[i];
    rows.push([
      b.state,
      b.identifier,
      b.title,
      b.summary || '',
      b.billStatus,
      b.statusDate,
      '',            // Status — blank (Jamie decides)
      b.openstatesUrl
    ]);
  }

  // Write all data at once
  var range = sheet.getRange(2, 1, bills.length, SCRAPER.NEW_LAWS_HEADERS.length);
  range.setValues(rows);

  // Apply hyperlinks to Title column (C) — link to Open States page
  for (var h = 0; h < bills.length; h++) {
    if (bills[h].openstatesUrl) {
      var cell = sheet.getRange(h + 2, cols.TITLE);
      var richText = SpreadsheetApp.newRichTextValue()
        .setText(bills[h].title)
        .setLinkUrl(bills[h].openstatesUrl)
        .build();
      cell.setRichTextValue(richText);
      cell.setFontColor('#000000');
    }
  }

  SpreadsheetApp.flush();
}

/**
 * Format the New Laws 2026 tab with its specific column layout.
 * Different from formatScraperTab() — New Laws has State, Identifier, Title, etc.
 * @param {Object} sheet - Google Sheet object
 */
function formatNewLawsTab(sheet) {
  var cols = SCRAPER.NEW_LAWS_COLUMNS;
  var headers = SCRAPER.NEW_LAWS_HEADERS;

  // Set headers in row 1
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#083345');
  headerRange.setFontColor('#FFFFFF');

  // Column widths
  sheet.setColumnWidth(cols.STATE, 120);
  sheet.setColumnWidth(cols.IDENTIFIER, 100);
  sheet.setColumnWidth(cols.TITLE, 420);
  sheet.setColumnWidth(cols.SUMMARY, 420);
  sheet.setColumnWidth(cols.BILL_STATUS, 200);
  sheet.setColumnWidth(cols.STATUS_DATE, 100);
  sheet.setColumnWidth(cols.STATUS, 100);
  sheet.setColumnWidth(cols.OPENSTATES_URL, 50);

  // Hide the URL column (H)
  sheet.hideColumns(cols.OPENSTATES_URL);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Status dropdown (rows 2-500)
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['', 'Approved', 'Delete'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, cols.STATUS, 499, 1).setDataValidation(statusRule);

  // Conditional formatting
  var rules = sheet.getConditionalFormatRules();

  // Approved = green
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Approved')
    .setBackground('#d0faad')
    .setRanges([sheet.getRange(2, cols.STATUS, 499, 1)])
    .build());

  // Delete = gray
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Delete')
    .setBackground('#d9d9d9')
    .setRanges([sheet.getRange(2, cols.STATUS, 499, 1)])
    .build());

  sheet.setConditionalFormatRules(rules);
}

/**
 * Store the Open States API key in Script Properties.
 * Run this ONCE from the Apps Script editor.
 * After running, the key is stored securely and not visible in the code.
 */
function setOpenStatesApiKey() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
    'Open States API Key',
    'Paste your Open States API key:',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() === ui.Button.OK) {
    var key = result.getResponseText().trim();
    if (key) {
      PropertiesService.getScriptProperties().setProperty('OPENSTATES_API_KEY', key);
      ui.alert('Done', 'Open States API key saved to Script Properties.', ui.ButtonSet.OK);
    }
  }
}

/**
 * Set up the New Laws 2026 tab with proper formatting.
 * Run this ONCE to reformat the existing tab with the new column layout.
 */
function setupNewLawsTab() {
  var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
  var sheet = null;
  var allSheets = ss.getSheets();
  for (var s = 0; s < allSheets.length; s++) {
    if (allSheets[s].getName().indexOf(SCRAPER.TABS.NEW_LAWS) === 0) {
      sheet = allSheets[s];
      break;
    }
  }
  if (!sheet) {
    sheet = ss.insertSheet(SCRAPER.TABS.NEW_LAWS);
  }

  sheet.clear();
  formatNewLawsTab(sheet);
  Logger.log('✅ New Laws 2026 tab formatted');

  try {
    SpreadsheetApp.getUi().alert('Done', 'New Laws 2026 tab has been set up.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
}

/**
 * Manual trigger: scrape new laws only (without running RSS scrapers).
 */
function scrapeNewLawsManual() {
  scrapeNewLaws();
  updateUnreviewedCounts();
  try {
    var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
    var allSheets = ss.getSheets();
    for (var s = 0; s < allSheets.length; s++) {
      if (allSheets[s].getName().indexOf(SCRAPER.TABS.NEW_LAWS) === 0) {
        var lastRow = allSheets[s].getLastRow();
        SpreadsheetApp.getUi().alert('New Laws Scraper Complete',
          'New Laws 2026: ' + (lastRow > 1 ? lastRow - 1 : 0) + ' total bills',
          SpreadsheetApp.getUi().ButtonSet.OK);
        break;
      }
    }
  } catch (e) {}
}


/**
 * Run all scrapers. Call this from a time-driven trigger or menu.
 */
function runAllScrapers() {
  Logger.log('🔄 Starting scraper run...');
  var startTime = new Date();

  scrapeTab(SCRAPER.TABS.BREAKING_TRENDING);
  scrapeTab(SCRAPER.TABS.GOVERNMENT_POLICY);
  scrapeNewLaws();

  // Update unreviewed counts on all tabs
  updateUnreviewedCounts();

  var elapsed = ((new Date() - startTime) / 1000).toFixed(1);
  Logger.log('✅ Scraper run complete in ' + elapsed + 's');
}

/**
 * Manual trigger: run scrapers and show UI confirmation.
 */
function runScrapersManual() {
  runAllScrapers();
  try {
    var ss = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
    var tabs = Object.values(SCRAPER.TABS);
    var summary = '';
    var allSheets = ss.getSheets();
    for (var t = 0; t < tabs.length; t++) {
      for (var s = 0; s < allSheets.length; s++) {
        if (allSheets[s].getName().indexOf(tabs[t]) === 0) {
          var lastRow = allSheets[s].getLastRow();
          summary += tabs[t] + ': ' + (lastRow > 1 ? lastRow - 1 : 0) + ' articles\n';
          break;
        }
      }
    }
    SpreadsheetApp.getUi().alert('Scraper Run Complete', summary, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {
    // No UI (trigger context)
  }
}


// ============================================================================
// TRANSFER APPROVED → ENHANCED DRAFTER
// ============================================================================

/**
 * Transfer all "Approved" articles from BOTH sources to Enhanced Drafter:
 *   1. New scraper spreadsheet (Breaking/Trending, Government/Policy, New Laws)
 *   2. Travel News Tracker tab (legacy scraper, in main spreadsheet)
 *
 * → Enhanced Drafter mapping:
 *   Title — Summary (hyperlinked to source URL)  → ED Column B
 *   "Current News"                                → ED Column C (Article Type)
 *   "x"                                           → ED Column D
 *   State                                         → ED Column G
 *   "For Outline Verification"                    → ED Column L (Status)
 *   Column A: sequential numbering (continues from last entry)
 *   Every 45 entries: insert a black separator row
 *
 * After transfer, scraper Status → "Done"
 */
function transferScraperToED() {
  var ui = SpreadsheetApp.getUi();
  var scraperSS = SpreadsheetApp.openById(SCRAPER.SPREADSHEET_ID);
  var mainSS = SpreadsheetApp.getActiveSpreadsheet();
  var edSheet = mainSS.getSheetByName('Enhanced Drafter');

  if (!edSheet) {
    ui.alert('Error', 'Enhanced Drafter sheet not found.', ui.ButtonSet.OK);
    return;
  }

  // Collect approved articles from ALL scraper tabs (new scraper spreadsheet)
  var approved = [];
  var tabNames = Object.values(SCRAPER.TABS);
  var allSheets = scraperSS.getSheets();

  for (var t = 0; t < tabNames.length; t++) {
    var sheet = null;
    for (var s = 0; s < allSheets.length; s++) {
      if (allSheets[s].getName().indexOf(tabNames[t]) === 0) {
        sheet = allSheets[s];
        break;
      }
    }
    if (!sheet) continue;

    var lastRow = sheet.getLastRow();
    if (lastRow < 2) continue;

    var data = sheet.getRange(2, 1, lastRow - 1, SCRAPER.HEADERS.length).getValues();
    for (var i = 0; i < data.length; i++) {
      if (data[i][SCRAPER.COLUMNS.STATUS - 1] === 'Approved') {
        approved.push({
          sheetRef: sheet,
          dataRow: i + 2,
          statusCol: SCRAPER.COLUMNS.STATUS,
          state: data[i][SCRAPER.COLUMNS.STATE - 1] || '',
          title: data[i][SCRAPER.COLUMNS.TITLE - 1] || '',
          summary: data[i][SCRAPER.COLUMNS.SUMMARY - 1] || '',
          freshness: data[i][SCRAPER.COLUMNS.FRESHNESS - 1] || '',
          url: data[i][SCRAPER.COLUMNS.URL - 1] || ''
        });
      }
    }
  }

  // Also check Travel News Tracker (legacy scraper) in the main spreadsheet
  // Layout: A=Action, B=Date, C=Source, D=State/Region, E=Title, F=Link, G=Summary
  var travelSheet = mainSS.getSheetByName('Travel News Tracker');
  if (travelSheet) {
    var travelLastRow = travelSheet.getLastRow();
    if (travelLastRow >= 2) {
      var travelData = travelSheet.getRange(2, 1, travelLastRow - 1, 7).getValues();
      for (var tv = 0; tv < travelData.length; tv++) {
        if (travelData[tv][0] === 'Approved') {  // Column A = Action
          approved.push({
            sheetRef: travelSheet,
            dataRow: tv + 2,
            statusCol: 1,  // Column A for Travel News Tracker
            state: travelData[tv][3] || '',    // Column D = State/Region
            title: travelData[tv][4] || '',    // Column E = Title
            summary: travelData[tv][6] || '',  // Column G = Summary
            url: travelData[tv][5] || ''       // Column F = Link
          });
        }
      }
    }
  }

  if (approved.length === 0) {
    ui.alert('Nothing to transfer', 'No articles with "Approved" status found.', ui.ButtonSet.OK);
    return;
  }

  // Find the last row with content in ED column B (to know where to start writing)
  var edLastRow = edSheet.getLastRow();
  var startRow = 5; // Default: row 5 (assuming rows 1-4 are headers/structure)
  var lastNumber = 0;

  if (edLastRow >= 5) {
    // Scan column B from the bottom to find the last non-empty row
    var colB = edSheet.getRange(5, 2, edLastRow - 4, 1).getValues();
    var colA = edSheet.getRange(5, 1, edLastRow - 4, 1).getValues();

    for (var r = colB.length - 1; r >= 0; r--) {
      if (colB[r][0] && colB[r][0].toString().trim() !== '') {
        startRow = r + 5 + 1; // First empty row after last content
        break;
      }
    }

    // Find the last number in column A (might not be on the same row as last content)
    for (var n = colA.length - 1; n >= 0; n--) {
      var val = colA[n][0];
      if (val && !isNaN(val) && val > 0) {
        lastNumber = parseInt(val);
        break;
      }
    }
  }

  // Ensure enough rows exist
  var blackRowCount = 0;
  for (var c = 0; c < approved.length; c++) {
    var entryNum = lastNumber + c + 1;
    if (entryNum % 45 === 0) blackRowCount++;
  }
  var totalRowsNeeded = approved.length + blackRowCount;
  var sheetMaxRow = edSheet.getMaxRows();
  if (startRow + totalRowsNeeded - 1 > sheetMaxRow) {
    edSheet.insertRowsAfter(sheetMaxRow, startRow + totalRowsNeeded - sheetMaxRow);
  }

  // Transfer each approved article
  var currentRow = startRow;
  for (var j = 0; j < approved.length; j++) {
    var item = approved[j];
    var entryNumber = lastNumber + j + 1;

    // Column A: sequential number
    edSheet.getRange(currentRow, 1).setValue(entryNumber);

    // Column B: Title — Summary (hyperlinked to source article)
    var displayText = item.title;
    if (item.summary) {
      displayText += ' — ' + item.summary;
    }
    if (item.url) {
      var richText = SpreadsheetApp.newRichTextValue()
        .setText(displayText)
        .setLinkUrl(0, item.title.length, item.url)
        .build();
      edSheet.getRange(currentRow, 2).setRichTextValue(richText);
    } else {
      edSheet.getRange(currentRow, 2).setValue(displayText);
    }

    // 🔴 Breaking articles: light red background so Jamie knows to prioritize
    if (item.freshness === '🔴') {
      edSheet.getRange(currentRow, 1, 1, 12).setBackground('#ffb3b3');
    }

    // Column C: Article Type
    edSheet.getRange(currentRow, 3).setValue('Current News');

    // Column D: "x" marker
    edSheet.getRange(currentRow, 4).setValue('x');

    // Column G: State
    if (item.state) {
      edSheet.getRange(currentRow, 7).setValue(item.state);
    }

    // Column L: Status
    edSheet.getRange(currentRow, 12).setValue('For Outline Verification');

    currentRow++;

    // Every 45 entries: insert a black separator row
    if (entryNumber % 45 === 0) {
      edSheet.getRange(currentRow, 1, 1, 12).setBackground('#000000');
      currentRow++;
    }

    // Mark as Done in source sheet (uses correct status column per source)
    item.sheetRef.getRange(item.dataRow, item.statusCol).setValue('Done');
  }

  SpreadsheetApp.flush();

  // Update unreviewed counts
  updateUnreviewedCounts();

  ui.alert('Done!', approved.length + ' article(s) transferred to Enhanced Drafter.', ui.ButtonSet.OK);
}


// ============================================================================
// SCHEDULING
// ============================================================================

/**
 * Set up time-driven triggers for the scraper.
 * Runs every 4 hours. Call once to set up.
 */
function setupScraperSchedule() {
  // Remove any existing scraper triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'runAllScrapers') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create new trigger: every 4 hours
  ScriptApp.newTrigger('runAllScrapers')
    .timeBased()
    .everyHours(4)
    .create();

  Logger.log('✅ Scraper schedule set: every 4 hours');

  try {
    SpreadsheetApp.getUi().alert('Scraper Scheduled', 'The scraper will run automatically every 4 hours.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {
    // No UI context
  }
}

/**
 * Remove scraper schedule.
 */
function removeScraperSchedule() {
  var triggers = ScriptApp.getProjectTriggers();
  var removed = 0;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'runAllScrapers') {
      ScriptApp.deleteTrigger(triggers[i]);
      removed++;
    }
  }
  Logger.log('🗑️ Removed ' + removed + ' scraper trigger(s)');

  try {
    SpreadsheetApp.getUi().alert('Schedule Removed', 'Automatic scraping has been turned off.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {
    // No UI context
  }
}

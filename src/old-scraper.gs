/**
 * ============================================================================
 * TRAVEL NEWS TRACKER (Legacy Scraper)
 * ============================================================================
 * Scrapes Google News RSS for state-level travel news + US News RSS.
 * Writes to "Travel News Tracker" tab in the MAIN WIYS spreadsheet.
 *
 * Originally: NewsScraper_fromGoogleNews (repo root — reference copy)
 * Moved here so it gets pushed via clasp and keeps running.
 *
 * Changes from original:
 *   - Removed Georgia (country was being scraped, not the US state)
 *   - Added "Approved" to status dropdown for transfer to Enhanced Drafter
 *   - NPS News scraper removed entirely (not useful)
 *   - API keys should be moved to Script Properties (TODO)
 * ============================================================================
 */


/**
 * Create daily trigger for Travel News scraper. Run ONCE.
 */
function createTravelNewsTrigger() {
  ScriptApp.newTrigger('scrapeAllTravelNewsWithSummary')
    .timeBased()
    .everyDays(1)
    .atHour(5)
    .create();
}

/**
 * Check if a date string is within the last 24 hours and after Jan 1 2025.
 */
function isWithin24Hours(dateString) {
  var itemDate = new Date(dateString);
  var january2025 = new Date(2025, 0, 1);
  if (itemDate < january2025) return false;
  var now = new Date();
  var twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return (itemDate >= twentyFourHoursAgo);
}

/**
 * Extract up to 2 sentences (max 300 chars), removing HTML tags and URLs.
 */
function extractSummary(description) {
  if (!description) return '';
  var cleanText = description
    .replace(/<[^>]*>/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  var sentences = cleanText.match(/[^\.!\?]+[\.!\?]+/g);
  if (!sentences) return cleanText.substring(0, 300);
  return sentences.slice(0, 2).join(' ').substring(0, 300);
}

/**
 * Ensure "Travel News Tracker" sheet exists with headers in row 1.
 */
function setupTravelNewsTrackerSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Travel News Tracker');
  if (!sheet) {
    sheet = ss.insertSheet('Travel News Tracker');
  }
  var headerRow = sheet.getRange(1, 1, 1, 7).getValues()[0];
  var isEmptyHeader = headerRow.every(function(cell) { return cell === ''; });
  if (isEmptyHeader) {
    sheet.getRange(1, 1, 1, 7).setValues([[
      'Action', 'Date', 'Source', 'State/Region', 'Title', 'Link', 'Summary'
    ]]);
  }
  return sheet;
}

/**
 * Get all existing links from Travel News Tracker column F to prevent duplicates.
 */
function getAllExistingLinks(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return new Set();
  var linkRange = sheet.getRange(2, 6, lastRow - 1, 1).getValues();
  var linkSet = new Set();
  linkRange.forEach(function(row) {
    if (row[0]) linkSet.add(row[0].toString().trim());
  });
  return linkSet;
}

/**
 * Set the Action dropdown in column A for a row.
 * Includes "Approved" for transfer to Enhanced Drafter.
 */
function applyDataValidationToRow(sheet, rowIndex) {
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Delete', 'With Potential', 'Approved'], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(rowIndex, 1).setDataValidation(rule);
}

/**
 * Email summary of newly added articles.
 */
function sendSummaryEmail(newTitles) {
  var recipient = 'wheninyourstate@gmail.com';
  var subject = 'Daily Travel News Scrape';
  var nowString = new Date().toLocaleString();
  var body;
  if (newTitles.length > 0) {
    body = newTitles.length + ' news articles added at ' + nowString + '\n\n' +
      'Here are the titles:\n' +
      newTitles.map(function(t, i) { return (i + 1) + ') ' + t; }).join('\n');
  } else {
    body = 'No new articles were added at ' + nowString + '.';
  }
  MailApp.sendEmail(recipient, subject, body);
}

/**
 * Main scraper function. Fetches Google News RSS for 49 US states
 * (Georgia removed — was pulling country results) + US News feed.
 * Inserts new articles at the top (newest first), skips duplicates,
 * filters via SCRAPER_BLACKLIST (shared with new scraper), emails summary.
 */
function scrapeAllTravelNewsWithSummary() {
  // TODO: Move to Script Properties
  var newsApiKey = 'OfyU7Av3tma5yqgVljw5rTtbHy9pZ0AC78xWpmZ';

  var sheet = setupTravelNewsTrackerSheet();
  var existingLinks = getAllExistingLinks(sheet);
  var newlyAddedTitles = [];

  // Collect all new articles first, then bulk-insert at the top
  var newRows = [];

  function collectTravelNewsRow(dateVal, sourceVal, regionVal, titleVal, linkVal, summaryVal) {
    newRows.push([dateVal, sourceVal, regionVal, titleVal, linkVal, summaryVal]);
    newlyAddedTitles.push(titleVal);
  }

  // 49 state feeds (Georgia removed — was returning Georgia the country)
  var stateRssFeeds = [
    'https://news.google.com/rss/search?q=alabama+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=alaska+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=arizona+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=arkansas+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=california+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=colorado+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=connecticut+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=delaware+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=florida+travel&hl=en-US&gl=US&ceid=US:en',
    // Georgia REMOVED — Google News returns Georgia (country), not the US state
    'https://news.google.com/rss/search?q=hawaii+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=idaho+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=illinois+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=indiana+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=iowa+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=kansas+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=kentucky+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=louisiana+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=maine+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=maryland+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=massachusetts+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=michigan+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=minnesota+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=mississippi+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=missouri+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=montana+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=nebraska+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=nevada+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=new+hampshire+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=new+jersey+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=new+mexico+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=new+york+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=north+carolina+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=north+dakota+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=ohio+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=oklahoma+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=oregon+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=pennsylvania+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=rhode+island+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=south+carolina+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=south+dakota+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=tennessee+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=texas+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=utah+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=vermont+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=virginia+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=washington+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=west+virginia+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=wisconsin+travel&hl=en-US&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=wyoming+travel&hl=en-US&gl=US&ceid=US:en'
  ];

  var extraFeeds = [
    'https://www.usnews.com/rss/travel-editorial'
  ];

  // Map RSS URL to state name (Georgia removed)
  function getStateRegionFromUrl(rssUrl) {
    var regionVal = 'U.S. State';
    if (rssUrl.indexOf('alabama') > -1) regionVal = 'Alabama';
    else if (rssUrl.indexOf('alaska') > -1) regionVal = 'Alaska';
    else if (rssUrl.indexOf('arizona') > -1) regionVal = 'Arizona';
    else if (rssUrl.indexOf('arkansas') > -1) regionVal = 'Arkansas';
    else if (rssUrl.indexOf('california') > -1) regionVal = 'California';
    else if (rssUrl.indexOf('colorado') > -1) regionVal = 'Colorado';
    else if (rssUrl.indexOf('connecticut') > -1) regionVal = 'Connecticut';
    else if (rssUrl.indexOf('delaware') > -1) regionVal = 'Delaware';
    else if (rssUrl.indexOf('florida') > -1) regionVal = 'Florida';
    // Georgia removed
    else if (rssUrl.indexOf('hawaii') > -1) regionVal = 'Hawaii';
    else if (rssUrl.indexOf('idaho') > -1) regionVal = 'Idaho';
    else if (rssUrl.indexOf('illinois') > -1) regionVal = 'Illinois';
    else if (rssUrl.indexOf('indiana') > -1) regionVal = 'Indiana';
    else if (rssUrl.indexOf('iowa') > -1) regionVal = 'Iowa';
    else if (rssUrl.indexOf('kansas') > -1) regionVal = 'Kansas';
    else if (rssUrl.indexOf('kentucky') > -1) regionVal = 'Kentucky';
    else if (rssUrl.indexOf('louisiana') > -1) regionVal = 'Louisiana';
    else if (rssUrl.indexOf('maine') > -1) regionVal = 'Maine';
    else if (rssUrl.indexOf('maryland') > -1) regionVal = 'Maryland';
    else if (rssUrl.indexOf('massachusetts') > -1) regionVal = 'Massachusetts';
    else if (rssUrl.indexOf('michigan') > -1) regionVal = 'Michigan';
    else if (rssUrl.indexOf('minnesota') > -1) regionVal = 'Minnesota';
    else if (rssUrl.indexOf('mississippi') > -1) regionVal = 'Mississippi';
    else if (rssUrl.indexOf('missouri') > -1) regionVal = 'Missouri';
    else if (rssUrl.indexOf('montana') > -1) regionVal = 'Montana';
    else if (rssUrl.indexOf('nebraska') > -1) regionVal = 'Nebraska';
    else if (rssUrl.indexOf('nevada') > -1) regionVal = 'Nevada';
    else if (rssUrl.indexOf('new+hampshire') > -1) regionVal = 'New Hampshire';
    else if (rssUrl.indexOf('new+jersey') > -1) regionVal = 'New Jersey';
    else if (rssUrl.indexOf('new+mexico') > -1) regionVal = 'New Mexico';
    else if (rssUrl.indexOf('new+york') > -1) regionVal = 'New York';
    else if (rssUrl.indexOf('north+carolina') > -1) regionVal = 'North Carolina';
    else if (rssUrl.indexOf('north+dakota') > -1) regionVal = 'North Dakota';
    else if (rssUrl.indexOf('ohio') > -1) regionVal = 'Ohio';
    else if (rssUrl.indexOf('oklahoma') > -1) regionVal = 'Oklahoma';
    else if (rssUrl.indexOf('oregon') > -1) regionVal = 'Oregon';
    else if (rssUrl.indexOf('pennsylvania') > -1) regionVal = 'Pennsylvania';
    else if (rssUrl.indexOf('rhode+island') > -1) regionVal = 'Rhode Island';
    else if (rssUrl.indexOf('south+carolina') > -1) regionVal = 'South Carolina';
    else if (rssUrl.indexOf('south+dakota') > -1) regionVal = 'South Dakota';
    else if (rssUrl.indexOf('tennessee') > -1) regionVal = 'Tennessee';
    else if (rssUrl.indexOf('texas') > -1) regionVal = 'Texas';
    else if (rssUrl.indexOf('utah') > -1) regionVal = 'Utah';
    else if (rssUrl.indexOf('vermont') > -1) regionVal = 'Vermont';
    else if (rssUrl.indexOf('virginia') > -1) regionVal = 'Virginia';
    else if (rssUrl.indexOf('washington') > -1) regionVal = 'Washington';
    else if (rssUrl.indexOf('west+virginia') > -1) regionVal = 'West Virginia';
    else if (rssUrl.indexOf('wisconsin') > -1) regionVal = 'Wisconsin';
    else if (rssUrl.indexOf('wyoming') > -1) regionVal = 'Wyoming';
    return regionVal;
  }

  // Process state feeds
  stateRssFeeds.forEach(function(rssUrl) {
    try {
      var response = UrlFetchApp.fetch(rssUrl);
      var xml = XmlService.parse(response.getContentText());
      var root = xml.getRootElement();
      var channel = root.getChild('channel');
      if (!channel) return;

      var items = channel.getChildren('item');
      var regionVal = getStateRegionFromUrl(rssUrl);

      items.forEach(function(item) {
        var pubDate = item.getChildText('pubDate');
        var title = item.getChildText('title') || '(No Title)';
        var link = item.getChildText('link') || '';
        var description = item.getChildText('description') || '';

        if (!pubDate || !isWithin24Hours(pubDate)) return;
        if (!link || existingLinks.has(link)) return;
        // Use shared blacklist from scraper.gs
        if (isBlacklisted(title, description, link)) return;

        collectTravelNewsRow(pubDate, 'Google News RSS', regionVal, title, link, extractSummary(description));
        existingLinks.add(link);
      });
    } catch (err) {
      Logger.log('Error fetching RSS for: ' + rssUrl + ' => ' + err);
    }
  });

  // Additional feeds
  extraFeeds.forEach(function(feedUrl) {
    try {
      var response = UrlFetchApp.fetch(feedUrl);
      var xml = XmlService.parse(response.getContentText());
      var root = xml.getRootElement();
      var channel = root.getChild('channel');
      if (!channel) return;

      var items = channel.getChildren('item');
      var sourceVal = (feedUrl.indexOf('usnews') > -1) ? 'US News' : 'News Source';

      items.forEach(function(item) {
        var pubDate = item.getChildText('pubDate');
        var title = item.getChildText('title') || '(No Title)';
        var link = item.getChildText('link') || '';
        var description = item.getChildText('description') || '';

        if (!pubDate || !isWithin24Hours(pubDate)) return;
        if (!link || existingLinks.has(link)) return;
        if (isBlacklisted(title, description, link)) return;

        collectTravelNewsRow(pubDate, sourceVal, 'National', title, link, extractSummary(description));
        existingLinks.add(link);
      });
    } catch (err) {
      Logger.log('Error fetching extra feed: ' + feedUrl + ' => ' + err);
    }
  });

  // NewsAPI
  try {
    var newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=travel&pageSize=300&apiKey=' + newsApiKey;
    var newsResponse = UrlFetchApp.fetch(newsUrl);
    var newsData = JSON.parse(newsResponse.getContentText());

    newsData.articles.forEach(function(article) {
      if (!article.publishedAt || !isWithin24Hours(article.publishedAt)) return;
      var linkVal = article.url || '';
      if (!linkVal || existingLinks.has(linkVal)) return;
      if (isBlacklisted(article.title || '', article.description || '', linkVal)) return;

      var sourceVal = (article.source && article.source.name) ? article.source.name : 'NewsAPI Source';
      collectTravelNewsRow(
        article.publishedAt, sourceVal, 'National',
        article.title || '(No Title)', linkVal, extractSummary(article.description || '')
      );
      existingLinks.add(linkVal);
    });
  } catch (err) {
    Logger.log('NewsAPI error: ' + err);
  }

  // Bulk insert all new rows at the top (row 2, below header) — newest first
  if (newRows.length > 0) {
    sheet.insertRowsAfter(1, newRows.length);
    for (var r = 0; r < newRows.length; r++) {
      sheet.getRange(r + 2, 2, 1, 6).setValues([newRows[r]]);
      applyDataValidationToRow(sheet, r + 2);
    }
  }

  sendSummaryEmail(newlyAddedTitles);
}

/**
 * Sort existing Travel News Tracker by date (newest first).
 * Run once to rearrange existing articles.
 */
function sortTravelNewsTracker() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Travel News Tracker');
  if (!sheet) return;
  var lastRow = sheet.getLastRow();
  if (lastRow < 3) return;
  // Sort rows 2 to last by column B (Date) descending
  sheet.getRange(2, 1, lastRow - 1, 7).sort({ column: 2, ascending: false });
  Logger.log('✅ Travel News Tracker sorted by date (newest first)');
}

/**
 * Installable onEdit trigger for Travel News Tracker.
 * Handles: Delete (remove row), With Potential (move to Potential Topics),
 * Approved (marks for transfer to Enhanced Drafter via transferScraperToED).
 */
function onEditTravelNews(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var col = e.range.getColumn();

  if (sheet.getName() !== 'Travel News Tracker' || col !== 1 || row < 2) return;

  var action = e.range.getValue();

  if (action === 'Delete') {
    sheet.deleteRow(row);
  } else if (action === 'With Potential') {
    var potSheet = getPotentialTopicsSheet();
    var rowValues = sheet.getRange(row, 2, 1, 6).getValues()[0];
    var lastRowPot = potSheet.getLastRow();
    potSheet.getRange(lastRowPot + 1, 2, 1, 5).setValues([[
      rowValues[0], rowValues[2], rowValues[3], rowValues[4], rowValues[5]
    ]]);
    sheet.deleteRow(row);
  }
  // "Approved" rows stay in place — picked up by transferScraperToED
}

/**
 * Get or create the "Potential Topics" sheet.
 */
function getPotentialTopicsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var potSheet = ss.getSheetByName('Potential Topics');
  if (!potSheet) {
    potSheet = ss.insertSheet('Potential Topics');
  }
  var headerCheck = potSheet.getRange(1, 1, 1, 6).getValues()[0];
  var isEmptyHeader = headerCheck.every(function(val) { return val === ''; });
  if (isEmptyHeader) {
    potSheet.getRange(1, 1, 1, 6).setValues([[
      'Action', 'Date', 'Source', 'Title', 'Link', 'Summary'
    ]]);
  }
  return potSheet;
}

/**
 * One-time cleanup: delete all rows containing Georgia (country) from Travel News Tracker.
 * Run once, then delete this function.
 */
function cleanupGeorgiaFromTravelNews() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Travel News Tracker');
  if (!sheet) return;

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  var data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  var deleted = 0;

  // Delete from bottom up
  for (var i = data.length - 1; i >= 0; i--) {
    var state = (data[i][3] || '').toString(); // Column D = State/Region
    if (state === 'Georgia') {
      sheet.deleteRow(i + 2);
      deleted++;
    }
  }

  Logger.log('🗑️ Removed ' + deleted + ' Georgia rows from Travel News Tracker');
  try {
    SpreadsheetApp.getUi().alert('Done!', 'Removed ' + deleted + ' Georgia rows.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}
}

/**
 * ============================================================================
 * CONFIGURATION CONSTANTS
 * ============================================================================
 * Centralized configuration for all hardcoded values.
 * Update these values as needed instead of modifying code throughout.
 */

const CONFIG = {
  // ===== GOOGLE WORKSPACE IDs =====
  GOOGLE: {
    PARENT_FOLDER_ID: '1elEoElaapgO4ANXrzrYrt66p2S4SxVLZ',
    SPREADSHEET_ID: '1gQmKqIDr07tSaqoDY_R13fQcO3YWB6HgLSEmpTsPYb8'
  },

  // ===== API CREDENTIALS (SHOULD BE MOVED TO SCRIPT PROPERTIES) =====
  API: {
    SHUTTERSTOCK_TOKEN: 'v2/bHpXTVZmaXVmWXNueVYzdG16ZkFBNEx3T1ZlYy8xNDA5NjcyODcvY3VzdG9tZXIvMy9iRGhVLUpOR1dyaFkyWEdpN0ZOOXlqVHY5SXdWWl9QVFhpRHExRWhIQVZuZ1NDNlZUUkllMmtfM0RFTk9nYnNJTjZoWlh3dVVhQ2R5Y0F6d3FmNS1ISGY3QjBYM29Gb1E0Y2x2WVpUU0VEMjIzWERVZ2NWb29ERU5LbDdfdHF6UzBUczJSRHF1dWdBVXdZSHFkU3FGMEFGNDYtUC00NTh5ak52UGNpQ0NEd0JrTDFjZjNBVV9BaC04LWwyQWh3Yy9rZGRKeGlDTldNSGJRdm5SLWJ1T1llaXdyb19lZQ',
    SHUTTERSTOCK_TOKEN_ALT: 'v2/bHpXTVZmaXVmWXNueVYzdG16ZkFBNEx3T1ZlYy8xNDA5NjcyODcvY3VzdG9tZXIvMy9iRGhVLUpOR1dyaFkyWEdpN0ZOOXlqVHY5SXdWWl9QVFhpRHExRWhIQVZuZ1NDNlZUUkllMmtfM0RFTk9nYnNJTjZoWlh3dVVhQ2R5Y0F6d3FmNS1ISGY3QjBYM29Gb1E0Y2x2WVpUU0VEMjIzWERVZ2NWb29ERU5LbDdfdHF6UzBUczJSRHF1dWdBVXdZSHFkU3FGMEFGNDYtUC00NTh5ak52UGNpQ0NEd0JrTDFjZjNBVV9BaC04LWwyQWh3Yy9rZGRKeGlDTldNSGJRdm5SLWJ1T1llaXdyb19lZQ',
    CLAUDE_API_KEY: PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY')
  },

  // ===== WORDPRESS CREDENTIALS (SHOULD BE MOVED TO SCRIPT PROPERTIES) =====
  WORDPRESS: {
    USERNAME: PropertiesService.getScriptProperties().getProperty('WP_USERNAME'),
    APP_PASSWORD: PropertiesService.getScriptProperties().getProperty('WP_APP_PASSWORD'),
    BASE_URL: 'https://wheninyourstate.com',
    USERS: {
      LEO_HEIT: { id: 1, name: 'Leo Heit' },
      JOHN_GHOST: { id: 8, name: 'John Ghost' }
    }
  },


  // ===== API ENDPOINTS =====
  ENDPOINTS: {
    SHUTTERSTOCK_SEARCH: 'https://api.shutterstock.com/v2/images/search',
    SHUTTERSTOCK_LICENSES: 'https://api.shutterstock.com/v2/images/licenses',
    WP_USERS: 'https://wheninyourstate.com/wp-json/wp/v2/users',
    WP_POSTS: 'https://wheninyourstate.com/wp-json/wp/v2/posts',
    WP_MEDIA: 'https://wheninyourstate.com/wp-json/wp/v2/media',
    WP_CATEGORIES: 'https://wheninyourstate.com/wp-json/wp/v2/categories',
    WP_FEED_TYPE: 'https://wheninyourstate.com/wp-json/wp/v2/feed_type'
  },

  // ===== EMAIL ADDRESSES =====
  EMAIL: {
    WORKFLOW: 'workflow@wheninyourstate.com'
  },

  // ===== SHEET NAMES =====
    // ===== SHEET NAMES =====
  SHEETS: {
    ARTICLE_STATUS_TRACKER: 'Article Status Tracker',
    DRAFTER: 'Drafter',
    DRAFTER_BASIC: 'Drafter Basic',
    WP_EDITING_TRACKER: 'WP Editing Tracker',
    WIYS_PRODUCTION_TRACKER: 'WIYS Production Tracker',
    UPLOADER: 'Uploader',
    STATE_TOPICS: 'State Topics',
    TOPIC_PLANNING: 'Topic Planning',
    ARTICLE_COLLECTION: 'Article Collection',
    EMAIL_NEWSLETTER: 'Email Newsletter'
  },


  // ===== TRIGGER STRINGS =====
  TRIGGERS: {
    PASTE_ARTICLE_SECTIONS: 'Paste Article Sections',
    SEND_TO_EDITORS: 'Send to Editors',
    FOR_ALEKS_REVIEW: 'For Aleks Review',
    SET_DATE_TIME: 'Set Date/Time',
    SCHEDULE: 'Schedule',
    CHECK_WP_STATUS: 'Check WP Status',
    RECORD: 'Record',
    UPDATE_TITLE_AND_INTRO: 'Update Title and Intro'
  },

  // ===== COLUMN INDICES =====
  COLUMNS: {
    ARTICLE_TITLE: 1,
    URL_DOC_LINK: 2,
    READ_MORE_DATA_MEDIA_ID: 3,
    SLIDE_NUMBER: 4,
    SUBHEADING: 5,
    SLIDE_CONTENT: 6,
    IMAGE_FILE_NAME_STATUS: 7,
    COPYRIGHT_SOURCE: 8,
    LICENSE_ID: 9,
    PHOTO_CONTRIBUTOR: 10,
    PHOTO_DESCRIPTION: 11,
    STATUS_MESSAGES: 12,
    FOLDER_URL: 13,
    COLUMN_14: 14,
    DRAFT_STATUS: 15
  },

  // ===== COLOR HEX CODES =====
  COLORS: {
    DARK_TEAL: '#083345',
    LIGHT_CYAN_3: '#b4d7d8',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    LIGHT_PINK: '#FFE6F0',
    VERY_LIGHT_RED: '#ffb3b3',
    PEACH_SALMON: '#ecbba2',
    TEAL_CYAN: '#46bdc6',
    LIGHT_RED: '#ffcccb',
    LIGHT_RED_ALT: '#ffcccc',
    SAGE_GREEN: '#a4ae7f',
    LIGHT_GREEN: '#d0faad',
    DARK_GREEN: '#0b5e3f',
    YELLOW: '#ffff00',
    DARK_RED: '#8B0000',
    MEDIUM_ORANGE: '#FF8C00'
  },

  // ===== STATUS MESSAGES =====
  STATUS: {
    READY_FOR_WORDPRESS: 'Ready for WordPress',
    DONE: 'DONE',
    DRAFT_DONE: 'DRAFT DONE',
    PASTED: 'Pasted',
    SECTIONS_PASTED_SUCCESSFULLY: 'Sections Pasted Successfully',
    GDRIVE_FOLDER_READY: 'GDrive Folder is Ready',
    GET_IMAGE_META_DATA_COMPLETE: 'Get Image Meta Data Complete',
    PUBLISHED: 'Published',
    SCHEDULED: 'Scheduled',
    PLACEHOLDER: '_'
  },

  // ===== WORDPRESS POST STATUSES =====
  WP_POST_STATUS: {
    DRAFT: 'draft',
    FUTURE: 'future',
    PUBLISH: 'publish'
  },

  // ===== ERROR MESSAGES =====
  ERRORS: {
    ARTICLE_NOT_FOUND: 'Error: Article not found in Status Tracker',
    INVALID_DOC_URL: 'Error: Invalid Doc URL',
    ARTICLE_TITLE_NOT_FOUND: 'Error: Article title (H1) not found in document',
    NO_H2_SECTIONS: 'Error: No H2 sections found',
    INVALID_URL_FORMAT: 'Invalid Google Doc URL format'
  },

  // ===== CONTENT SECTION MARKERS =====
  CONTENT_MARKERS: {
    READ_MORE_FROM: 'Read More from',
    INSTRUCTIONS: 'Instructions:',
    DRAFT_PROMPT: 'Draft Prompt',
    PASTE_URL_HERE: 'Paste URL Here'
  },

  // ===== URL PROTOCOLS =====
  URL: {
    HTTP: 'http://',
    HTTPS: 'https://',
    GOOGLE_DOC_PATH: '/d/',
    GOOGLE_FOLDER_PATH: 'folders/',
    WIKI_FILE_PATH: 'wiki/File:'
  },

  // ===== PUNCTUATION FOR VALIDATION =====
  PUNCTUATION: ['.', ',', ':', ';', '!', '?'],

  // ===== IMAGE SOURCES =====
  IMAGE_SOURCES: {
    SHUTTERSTOCK: 'Shutterstock',
    NATIONAL_PARK_SERVICE: 'National Park Service',
    LIBRARY_OF_CONGRESS: 'Library of Congress',
    NOT_FOUND: 'Not found'
  },

  // ===== FILE TYPES & MIME TYPES =====
  FILE_TYPES: {
    APPLICATION_OCTET_STREAM: 'application/octet-stream',
    PNG: 'png',
    GIF: 'gif',
    WEBP: 'webp'
  },

  // ===== HTTP STATUS CODES =====
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404
  },

  // ===== NUMERIC CONSTANTS =====
  RANGES: {
    START_ROW: 54,
    MIN_ROWS_TO_CHECK: 100,
    MAX_ROWS_TO_CHECK: 1000,
    HEADER_ROW: 1
  },

  // ===== TIME-BASED CONSTANTS =====
  TIME: {
    WORK_START_HOUR: 9,
    WORK_END_HOUR: 20
  },

  // ===== DEFAULT VALUES =====
  DEFAULTS: {
    NOT_FOUND: 'Not found',
    EMPTY_STRING: '',
    IMAGE_ID_FAILED: 0
  }
};

/**
 * ============================================================================
 * MAIN FUNCTIONS
 * ============================================================================
 */

/**
 * Find article's Google Doc URL in Status Tracker sheet
 * @param {string} articleTitle - The article title to search for
 * @returns {string|null} The document URL or null if not found
 */
function findArticleDocUrl(articleTitle) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  const statusData = statusSheet.getRange("C:D").getValues();

  Logger.log('Searching for article in Status Tracker...');
  for (let i = 0; i < statusData.length; i++) {
    if (statusData[i][0] === articleTitle ||
        (statusData[i][0] && statusData[i][0].toString().trim() === articleTitle.trim())) {
      Logger.log('Found match at row ' + (i+1) + ' with URL: ' + statusData[i][1]);
      return statusData[i][1];
    }
  }

  Logger.log('Article not found. Searched for: "' + articleTitle + '"');
  return null;
}

/**
 * Extract Google Doc ID from a Google Docs URL
 * @param {string} docUrl - The full Google Docs URL
 * @returns {string|null} The document ID or null if invalid
 */
function extractGoogleDocId(docUrl) {
  if (!docUrl || !docUrl.includes(CONFIG.URL.GOOGLE_DOC_PATH)) {
    return null;
  }

  try {
    return docUrl.split(CONFIG.URL.GOOGLE_DOC_PATH)[1].split('/')[0];
  } catch (error) {
    Logger.log('Error extracting doc ID: ' + error.message);
    return null;
  }
}

/**
 * Extract all H2 sections with their content and URLs from document
 * @param {DocumentApp.Body} body - The document body
 * @param {number} startIndex - Index to start extracting from
 * @returns {Array} Array of section objects with subheading, content, and url
 */
function extractSectionsFromDocument(body, startIndex) {
  const sections = [];
  let currentSection = null;
  let expectingUrl = false;
  const totalElements = body.getNumChildren();

  for (let i = startIndex; i < totalElements; i++) {
    const element = body.getChild(i);

    if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
      const paragraph = element.asParagraph();
      const heading = paragraph.getHeading();
      const text = paragraph.getText().trim();

      // Skip empty paragraphs
      if (!text) continue;

      // Stop if we hit "Read More" section or "Draft Prompt"
      if (text.startsWith(CONFIG.CONTENT_MARKERS.READ_MORE_FROM) ||
          text.includes(CONFIG.CONTENT_MARKERS.INSTRUCTIONS) ||
          text === CONFIG.CONTENT_MARKERS.DRAFT_PROMPT ||
          heading === DocumentApp.ParagraphHeading.HEADING1) {
        Logger.log('Reached end of article content at: ' + text);
        break;
      }

      // Check if this is an H2 heading
      if (heading === DocumentApp.ParagraphHeading.HEADING2) {
        // Save previous section if exists
        if (currentSection && currentSection.content.length > 0) {
          sections.push(currentSection);
        }

        // Clean the H2 text - remove ## and extra whitespace
        var cleanedH2Text = text.replace(/^##\s*/, '').trim();

        // Start new section
        currentSection = {
          subheading: cleanedH2Text,
          content: [],
          url: null
        };
        expectingUrl = true;
        Logger.log('Found H2 heading: ' + cleanedH2Text);
      }
      // Check if this is an H3 heading (for URL)
      else if (heading === DocumentApp.ParagraphHeading.HEADING3 && expectingUrl && currentSection) {
        // Clean the H3 text - remove ### and extra whitespace
        var cleanedH3Text = text.replace(/^###\s*/, '').trim();

        // Check if it's still a placeholder or a real URL
        if (cleanedH3Text === CONFIG.CONTENT_MARKERS.PASTE_URL_HERE || cleanedH3Text.toLowerCase().includes('paste url here')) {
          currentSection.url = null;
          currentSection.needsUrl = true;
        } else if (cleanedH3Text.startsWith(CONFIG.URL.HTTP) || cleanedH3Text.startsWith(CONFIG.URL.HTTPS)) {
          currentSection.url = cleanedH3Text;
          currentSection.needsUrl = false;
        } else {
          currentSection.url = null;
          currentSection.needsUrl = true;
        }

        expectingUrl = false;
        Logger.log('Found H3 URL: ' + cleanedH3Text + ' (needsUrl: ' + currentSection.needsUrl + ')');
      }
      // Check if this is a markdown-style heading (# or ##)
      else if (text.startsWith('#')) {
        const headingMatch = text.match(/^(#{1,3})\s+(.+)/);
        if (headingMatch) {
          const hashCount = headingMatch[1].length;
          const headingText = headingMatch[2].trim();

          if (hashCount === 2) {  // ## - H2 heading
            if (currentSection && currentSection.content.length > 0) {
              sections.push(currentSection);
            }

            currentSection = {
              subheading: headingText,
              content: [],
              url: null
            };
            expectingUrl = true;
            Logger.log('Found markdown H2 heading: ' + headingText);
          } else if (hashCount === 3 && expectingUrl && currentSection) {  // ### - H3 URL
            if (headingText === CONFIG.CONTENT_MARKERS.PASTE_URL_HERE || headingText.toLowerCase().includes('paste url here')) {
              currentSection.url = null;
              currentSection.needsUrl = true;
            } else if (headingText.startsWith(CONFIG.URL.HTTP) || headingText.startsWith(CONFIG.URL.HTTPS)) {
              currentSection.url = headingText;
              currentSection.needsUrl = false;
            } else {
              currentSection.url = null;
              currentSection.needsUrl = true;
            }

            expectingUrl = false;
            Logger.log('Found markdown H3 URL: ' + headingText + ' (needsUrl: ' + currentSection.needsUrl + ')');
          }
        } else {
          // It's a # but not at the start, treat as content
          if (currentSection) {
            currentSection.content.push(text);
            expectingUrl = false;
          }
        }
      }
      // Check if it might be a heading based on structure (short, bold text)
      else if (text.length < 100 &&
               text.length > 3 &&
               !text.endsWith('.') &&
               !text.endsWith(',') &&
               !text.endsWith(':') &&
               !text.endsWith(';') &&
               !text.endsWith('!') &&
               !text.endsWith('?') &&
               paragraph.isBold() &&
               !expectingUrl) {
        // This might be a bold heading
        if (currentSection && currentSection.content.length > 0) {
          sections.push(currentSection);
        }

        currentSection = {
          subheading: text,
          content: [],
          url: null
        };
        expectingUrl = true;
        Logger.log('Found bold heading: ' + text);
      }
      else if (currentSection) {
        // Add content to current section
        currentSection.content.push(text);
        expectingUrl = false;
      } else {
        // Content before first heading, skip it
        Logger.log('Skipping content before first heading: ' + text);
      }
    }
  }

  // Don't forget the last section
  if (currentSection && currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  Logger.log('Total sections found: ' + sections.length);
  return sections;
}

/**
 * Find the index where article content begins (after H1 title)
 * @param {DocumentApp.Body} body - The document body
 * @param {string} articleTitle - The article title to find
 * @returns {number} The index after the H1, or -1 if not found
 */
function findH1TitleIndex(body, articleTitle) {
  const totalElements = body.getNumChildren();

  for (let i = 0; i < totalElements; i++) {
    const element = body.getChild(i);

    if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
      const paragraph = element.asParagraph();
      const heading = paragraph.getHeading();
      const text = paragraph.getText().trim();

      // Look for H1 that matches our article title
      if (heading === DocumentApp.ParagraphHeading.HEADING1 &&
          (text === articleTitle || text.includes(articleTitle.split(' - ')[0]))) {
        Logger.log('Found H1 title at element ' + i);
        return i + 1;
      }
    }
  }

  return -1;
}

/**
 * Run this ONCE to add Claude API key to Script Properties
 */
function addClaudeApiKey() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Claude API Key', 'Paste your Anthropic API key:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() !== ui.Button.OK) return;

  var apiKey = response.getResponseText().trim();
  if (!apiKey) {
    ui.alert('Error', 'No key entered.', ui.ButtonSet.OK);
    return;
  }

  PropertiesService.getScriptProperties().setProperty('CLAUDE_API_KEY', apiKey);
  ui.alert('Done!', 'Claude API key saved to Script Properties.', ui.ButtonSet.OK);
}


/**
 * ONE-TIME: Categorize all articles
 */
function categorizeArticles() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Article Collection');
  var lastRow = sheet.getLastRow();
  var apiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
  
  var categories = 'Local Life, Travel Feature, Current News, Outdoors, History';
  
  var startTime = new Date();
  var processed = 0;
  
  for (var row = 2; row <= lastRow; row++) {
    // Skip if already categorized
    var existingCategory = sheet.getRange(row, 2).getValue();
    if (existingCategory && existingCategory !== '') continue;
    
    var title = sheet.getRange(row, 3).getValue();
    if (!title) continue;
    
    var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      'method': 'post',
      'headers': {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      'payload': JSON.stringify({
        'model': 'claude-3-haiku-20240307',
        'max_tokens': 20,
        'messages': [{ 'role': 'user', 'content': 'Categories: ' + categories + '\n\nTitle: "' + title + '"\n\nWhich ONE category? Reply with ONLY the category name.' }]
      })
    });
    
    var category = JSON.parse(response.getContentText()).content[0].text.trim();
    sheet.getRange(row, 2).setValue(category);
    SpreadsheetApp.flush();
    
    processed++;
    
    // Cooldown: pause 60 seconds every 5 minutes
    var elapsed = (new Date() - startTime) / 1000 / 60; // minutes
    if (elapsed >= 5) {
      Logger.log('Cooldown at row ' + row + ' - processed ' + processed);
      Utilities.sleep(60000); // 1 minute pause
      startTime = new Date(); // reset timer
    }
    
    Utilities.sleep(200);
  }
  
  SpreadsheetApp.getUi().alert('Done! Processed ' + processed + ' articles.');
}

/**
 * ONE-TIME SCRIPT: Fetch Intros for Article Collection
 * Fetches intro subheading + first paragraph for all articles and writes to column G.
 */

/**
 * ONE-TIME SCRIPT: Fetch Intros for Article Collection (BULK WRITE - FASTEST)
 */
function fetchIntrosForCollectionBulk() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Article Collection');

  if (!sheet) {
    ui.alert('Error', 'Article Collection sheet not found.', ui.ButtonSet.OK);
    return;
  }

  var username = PropertiesService.getScriptProperties().getProperty('WP_USERNAME');
  var appPassword = PropertiesService.getScriptProperties().getProperty('WP_APP_PASSWORD');

  if (!username || !appPassword) {
    ui.alert('Error', 'WordPress credentials not configured.', ui.ButtonSet.OK);
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('No Data', 'No articles found.', ui.ButtonSet.OK);
    return;
  }

  // Ensure header
  if (!sheet.getRange(1, 7).getValue()) sheet.getRange(1, 7).setValue('Intro');

  // Read columns D (URL) and G (Intro) at once
  var urls = sheet.getRange(2, 4, lastRow - 1, 1).getValues();
  var intros = sheet.getRange(2, 7, lastRow - 1, 1).getValues();

  // Find rows needing intros
  var needsIntro = [];
  for (var i = 0; i < urls.length; i++) {
    if (urls[i][0] && !intros[i][0]) {
      needsIntro.push(i);
    }
  }

  if (needsIntro.length === 0) {
    ui.alert('Complete', 'All articles already have intros.', ui.ButtonSet.OK);
    return;
  }

  var response = ui.alert('Fetch Intros (Bulk)', 'Found ' + needsIntro.length + ' articles without intros.\n\nContinue?', ui.ButtonSet.YES_NO);
  if (response !== ui.Button.YES) return;

  var successCount = 0;
  var errorCount = 0;
  var errorRows = [];
  var WRITE_EVERY = 100;

  for (var j = 0; j < needsIntro.length; j++) {
    var idx = needsIntro[j];
    var url = urls[idx][0];

    try {
      var slug = extractSlugFromUrlIntro(url);
      if (!slug) throw new Error('Bad slug');

      var result = fetchIntroBySlugIntro(slug, username, appPassword);

      if (result.success) {
        var text = '';
        if (result.subheading) text = result.subheading + '\n\n';
        if (result.content) text += result.content;
        intros[idx][0] = text.trim();
        successCount++;
      } else {
        intros[idx][0] = 'Error: ' + result.error;
        errorRows.push(idx + 2);
        errorCount++;
      }
    } catch (e) {
      intros[idx][0] = 'Error: ' + e.message;
      errorRows.push(idx + 2);
      errorCount++;
    }

    if ((j + 1) % WRITE_EVERY === 0) {
      sheet.getRange(2, 7, intros.length, 1).setValues(intros);
      SpreadsheetApp.flush();
      Logger.log('Written ' + (j + 1) + '/' + needsIntro.length);
    }

    Utilities.sleep(250);
  }

  // Final bulk write
  sheet.getRange(2, 7, intros.length, 1).setValues(intros);

  // Mark error rows red
  for (var e = 0; e < errorRows.length; e++) {
    sheet.getRange(errorRows[e], 7).setBackground('#ffcccc');
  }

  SpreadsheetApp.flush();
  ui.alert('Done', 'Success: ' + successCount + '\nErrors: ' + errorCount, ui.ButtonSet.OK);
}


function extractSlugFromUrlIntro(url) {
  if (!url) return null;
  url = url.split('?')[0].replace(/\/$/, '');
  var parts = url.split('/');
  var slug = parts[parts.length - 1];
  if (slug && /^[a-z0-9-]+$/.test(slug)) return slug;
  return null;
}


function fetchIntroBySlugIntro(slug, username, appPassword) {
  try {
    var searchUrl = 'https://wheninyourstate.com/wp-json/wp/v2/posts?slug=' + encodeURIComponent(slug) + '&status=publish';
    var options = {
      method: 'get',
      headers: { 'Authorization': 'Basic ' + Utilities.base64Encode(username + ':' + appPassword) },
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(searchUrl, options);
    if (response.getResponseCode() !== 200) return { success: false, error: 'API error' };

    var posts = JSON.parse(response.getContentText());
    if (!posts || posts.length === 0) return { success: false, error: 'Post not found' };

    var postUrl = 'https://wheninyourstate.com/wp-json/wp/v2/posts/' + posts[0].id + '?context=edit';
    var postResponse = UrlFetchApp.fetch(postUrl, options);
    if (postResponse.getResponseCode() !== 200) return { success: false, error: 'Cannot fetch content' };

    var postData = JSON.parse(postResponse.getContentText());
    var content = postData.content.raw;

    if (!content.includes('wp:clmsn/slideshow-item')) return { success: false, error: 'No slideshow' };

    var match = content.match(/<!-- wp:clmsn\/slideshow-item\s+({[^}]+})\s*-->([\s\S]*?)<!-- \/wp:clmsn\/slideshow-item -->/);
    if (!match) return { success: false, error: 'Cannot parse slideshow' };

    var blockContent = match[2];
    var result = { success: true };

    var h3Match = blockContent.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
    if (h3Match) result.subheading = h3Match[1].replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&amp;/g, '&').trim();

    var pMatches = blockContent.match(/<p[^>]*>[\s\S]*?<\/p>/g);
    if (pMatches && pMatches.length > 0) {
      var allParagraphs = [];
      for (var p = 0; p < pMatches.length; p++) {
        var pText = pMatches[p].replace(/<[^>]+>/g, '').replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
        if (pText) allParagraphs.push(pText);
      }
      result.content = allParagraphs.join('\n\n');
    }

    if (!result.subheading && !result.content) return { success: false, error: 'No intro found' };
    return result;

  } catch (error) {
    return { success: false, error: error.message };
  }
}




function pasteArticleSections(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();

  // Verify this is a title row and correct trigger
  if (!sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).isPartOfMerge() || e.value !== CONFIG.TRIGGERS.PASTE_ARTICLE_SECTIONS) return;

  try {
    // Get the article title from the merged cell
    const articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();
    Logger.log('Processing article: ' + articleTitle);

    // Find article in Status Tracker
    const docUrl = findArticleDocUrl(articleTitle);
    if (!docUrl) {
      sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.ERRORS.ARTICLE_NOT_FOUND);
      return;
    }

    // Extract Google Doc ID from URL
    const docId = extractGoogleDocId(docUrl);
    if (!docId) {
      sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.ERRORS.INVALID_DOC_URL);
      return;
    }

    // Open the Google Doc
    const doc = DocumentApp.openById(docId);
    const body = doc.getBody();

    // Find where the article content begins (after the H1 title)
    const contentStartIndex = findH1TitleIndex(body, articleTitle);
    if (contentStartIndex === -1) {
      sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.ERRORS.ARTICLE_TITLE_NOT_FOUND);
      return;
    }

    // Extract sections (H2 headings and their content)
    const sections = extractSectionsFromDocument(body, contentStartIndex);

    if (sections.length === 0) {
      sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.ERRORS.NO_H2_SECTIONS);
      return;
    }
    
    // Process and paste the sections
    processArticleSections(sheet, row, sections);
    
  } catch (error) {
    Logger.log('Error in pasteArticleSections: ' + error.message);
    Logger.log('Stack trace: ' + error.stack);
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: ' + error.message);
  }
}

// Helper function to process and paste sections
function processArticleSections(sheet, row, sections) {
  // Find the range for this article in the uploader
  let sectionStartRow = row + 1;
  let sectionEndRow = sectionStartRow;
  const lastRow = sheet.getLastRow();
  
  // Find where this article's section ends (next merged cell or end of sheet)
  while (sectionEndRow <= lastRow && !sheet.getRange(sectionEndRow, CONFIG.COLUMNS.ARTICLE_TITLE).isPartOfMerge()) {
    sectionEndRow++;
  }
  sectionEndRow--; // Back up to last row of this article
  
  const availableRows = sectionEndRow - sectionStartRow + 1;
  const neededRows = sections.length;
  
  Logger.log('Available rows: ' + availableRows + ', Needed rows: ' + neededRows);
  
  // Clear existing content in columns B, D, E, and F (UPDATED to include B)
  if (availableRows > 0) {
    sheet.getRange(sectionStartRow, 2, availableRows, 1).clearContent(); // Column B
    sheet.getRange(sectionStartRow, 4, availableRows, 3).clearContent(); // Columns D, E, F
  }
  
  // Handle row count differences
  if (neededRows > availableRows) {
    // Insert new rows if needed
    const rowsToInsert = neededRows - availableRows;
    sheet.insertRowsAfter(sectionEndRow, rowsToInsert);
    Logger.log('Inserted ' + rowsToInsert + ' new rows');
  } else if (neededRows < availableRows) {
    // Delete extra rows if we have too many
    const rowsToDelete = availableRows - neededRows;
    const deleteStartRow = sectionStartRow + neededRows;
    sheet.deleteRows(deleteStartRow, rowsToDelete);
    Logger.log('Deleted ' + rowsToDelete + ' extra rows starting at row ' + deleteStartRow);
  }
  
  // Paste the sections
  for (let i = 0; i < sections.length; i++) {
    const targetRow = sectionStartRow + i;
    const section = sections[i];
    
// Handle URL in Column B with visual indicators
if (section.needsUrl) {
  // No URL yet - leave empty and don't change background
  sheet.getRange(targetRow, CONFIG.COLUMNS.URL_DOC_LINK).setValue('');
  // REMOVED: sheet.getRange(targetRow, 2).setBackground('#6fa8dc'); // Medium blue
} else if (section.url) {
  // Has URL - paste it with normal formatting
  sheet.getRange(targetRow, CONFIG.COLUMNS.URL_DOC_LINK).setValue(section.url);
  // REMOVED: sheet.getRange(targetRow, 2).setBackground(null); // Clear any background
}
    
    // Set row number in Column D (Slide #)
    sheet.getRange(targetRow, CONFIG.COLUMNS.SLIDE_NUMBER).setValue(i + 1);
    
    // Set subheading in Column E (Subheadings)
    sheet.getRange(targetRow, CONFIG.COLUMNS.SUBHEADING).setValue(section.subheading);
    
    // Combine all content paragraphs and set in Column F (Slide Content)
    const combinedContent = section.content.join(' ');
    sheet.getRange(targetRow, CONFIG.COLUMNS.SLIDE_CONTENT).setValue(combinedContent);
    
    Logger.log('Pasted section ' + (i + 1) + ': ' + section.subheading + (section.url ? ' (URL: ' + section.url + ')' : ''));
  }
  
  // Update status in Uploader
  sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.STATUS.SECTIONS_PASTED_SUCCESSFULLY);

  // Update status in Article Status Tracker to "Pasted"
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
    const articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();
    
    // Find the article in Status Tracker
    const statusData = statusSheet.getRange("C:C").getValues();
    let statusRow = -1;
    
    for (let i = 0; i < statusData.length; i++) {
      if (statusData[i][0] === articleTitle || 
          (statusData[i][0] && statusData[i][0].toString().trim() === articleTitle.trim())) {
        statusRow = i + 1;
        break;
      }
    }
    
    if (statusRow > 0) {
      // Update Column G (Status) to "Pasted"
      statusSheet.getRange(statusRow, 7).setValue(CONFIG.STATUS.PASTED);
      Logger.log('Updated Article Status Tracker row ' + statusRow + ' to "Pasted"');
    } else {
      Logger.log('Warning: Could not find article in Status Tracker to update status');
    }
  } catch (error) {
    Logger.log('Error updating Article Status Tracker: ' + error.message);
    // Don't fail the whole operation if status update fails
  }
  
  // Force spreadsheet to update
  SpreadsheetApp.flush();
}











/**
 * Main function to create newsletters
 * Finds rows with "Create Newsletter" status and fills them with articles
 */
/**
 * Creates newsletters when Status is set to "Create Newsletter"
 * Selects 4 articles with category variety, generates preview text using intro content
 */
function createNewsletters() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var emailSheet = ss.getSheetByName('Email Newsletter');
  var collectionSheet = ss.getSheetByName('Article Collection');
  var apiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');

  if (!emailSheet || !collectionSheet) {
    ui.alert('Error', 'Required sheets not found.', ui.ButtonSet.OK);
    return;
  }

  if (!apiKey) {
    ui.alert('Error', 'CLAUDE_API_KEY not configured in Script Properties.', ui.ButtonSet.OK);
    return;
  }

  // Find rows with "Create Newsletter" status
  var emailLastRow = emailSheet.getLastRow();
  if (emailLastRow < 2) return;

  var emailData = emailSheet.getRange(2, 1, emailLastRow - 1, 19).getValues();
  var rowsToProcess = [];

  for (var i = 0; i < emailData.length; i++) {
    var status = emailData[i][18]; // Column O - Status
    if (status === 'Create Newsletter') {
      rowsToProcess.push(i + 2);
    }
  }

  if (rowsToProcess.length === 0) {
    ui.alert('No Rows', 'No rows with "Create Newsletter" status found.', ui.ButtonSet.OK);
    return;
  }

  // Get available articles from collection (now 7 columns including Intro)
  var collectionLastRow = collectionSheet.getLastRow();
  if (collectionLastRow < 2) {
    ui.alert('No Articles', 'No articles in collection.', ui.ButtonSet.OK);
    return;
  }

  var collectionData = collectionSheet.getRange(2, 1, collectionLastRow - 1, 7).getValues();

  // Build available articles grouped by category
  var availableByCategory = {};
  var allAvailable = [];

  for (var j = 0; j < collectionData.length; j++) {
    var status = collectionData[j][5]; // Column F - Status
    if (status === 'Available') {
      var article = {
        row: j + 2,
        state: collectionData[j][0],
        category: collectionData[j][1],
        title: collectionData[j][2],
        url: collectionData[j][3],
        thumbnail: collectionData[j][4],
        intro: collectionData[j][6] // Column G - Intro
      };

      allAvailable.push(article);

      if (!availableByCategory[article.category]) {
        availableByCategory[article.category] = [];
      }
      availableByCategory[article.category].push(article);
    }
  }

  if (allAvailable.length < 4) {
    ui.alert('Not Enough', 'Need at least 4 available articles. Found: ' + allAvailable.length, ui.ButtonSet.OK);
    return;
  }

  // Category rotation for featured article
  var categories = ['Local Life', 'Travel Feature', 'Current News', 'Outdoors', 'History'];
  var lastFeaturedCategory = PropertiesService.getScriptProperties().getProperty('LAST_FEATURED_CATEGORY') || '';
  var lastIndex = categories.indexOf(lastFeaturedCategory);
  var startIndex = (lastIndex + 1) % categories.length;

  // Process each newsletter row
  for (var r = 0; r < rowsToProcess.length; r++) {
    var emailRow = rowsToProcess[r];

    emailSheet.getRange(emailRow, 19).setValue('Processing...');
    SpreadsheetApp.flush();

    // Find featured article (rotate category)
    var featured = null;
    var featuredCategory = null;

    for (var c = 0; c < categories.length; c++) {
      var catIndex = (startIndex + c) % categories.length;
      var cat = categories[catIndex];

      if (availableByCategory[cat] && availableByCategory[cat].length > 0) {
        featured = availableByCategory[cat].shift();
        featuredCategory = cat;
        startIndex = (catIndex + 1) % categories.length;
        break;
      }
    }

    if (!featured) {
      emailSheet.getRange(emailRow, 19).setValue('Error: No featured article available');
      continue;
    }

    // Remove featured from allAvailable
    allAvailable = allAvailable.filter(function(a) { return a.row !== featured.row; });

    // Select articles 2, 3, 4 from different categories
    var usedCategories = [featuredCategory];
    var selectedArticles = [featured];

    for (var n = 0; n < 3; n++) {
      var nextArticle = null;

      // Try to find article from unused category
      for (var ci = 0; ci < categories.length; ci++) {
        var cat = categories[ci];
        if (usedCategories.indexOf(cat) === -1 && availableByCategory[cat] && availableByCategory[cat].length > 0) {
          nextArticle = availableByCategory[cat].shift();
          usedCategories.push(cat);
          break;
        }
      }

      // If no unused category, pick any available
      if (!nextArticle && allAvailable.length > 0) {
        nextArticle = allAvailable.shift();
        if (availableByCategory[nextArticle.category]) {
          var idx = availableByCategory[nextArticle.category].findIndex(function(a) { return a.row === nextArticle.row; });
          if (idx > -1) availableByCategory[nextArticle.category].splice(idx, 1);
        }
      }

      if (nextArticle) {
        selectedArticles.push(nextArticle);
        allAvailable = allAvailable.filter(function(a) { return a.row !== nextArticle.row; });
      }
    }

    if (selectedArticles.length < 4) {
      emailSheet.getRange(emailRow, 19).setValue('Error: Not enough articles');
      continue;
    }

    // Generate preview text for featured article using intro
    var preview = generatePreview(featured.title, featured.intro, apiKey);

    // Write to Email Newsletter sheet
    // Column B: Featured Article Title
    // Column C: Featured URL
    // Column D: Featured Image URL
    // Column E: Preview Text
    // Column F: Article #2 Title
    // Column G: Article #2 URL
    // Column H: Article #2 Image
    // Column I: Article #3 Title
    // Column J: Article #3 URL
    // Column K: Article #3 Image
    // Column L: Article #4 Title
    // Column M: Article #4 URL
    // Column N: Article #4 Image

    // Featured article: columns B(2), C(3), D(4), E(5)
    emailSheet.getRange(emailRow, 2).setValue(selectedArticles[0].title);
    emailSheet.getRange(emailRow, 3).setValue(selectedArticles[0].url);
    emailSheet.getRange(emailRow, 4).setValue(selectedArticles[0].thumbnail);
    emailSheet.getRange(emailRow, 5).setValue(preview);

    // Article #2: columns G(7), H(8), I(9) — skip divider F(6)
    emailSheet.getRange(emailRow, 7).setValue(selectedArticles[1].title);
    emailSheet.getRange(emailRow, 8).setValue(selectedArticles[1].url);
    emailSheet.getRange(emailRow, 9).setValue(selectedArticles[1].thumbnail);

    // Article #3: columns K(11), L(12), M(13) — skip divider J(10)
    emailSheet.getRange(emailRow, 11).setValue(selectedArticles[2].title);
    emailSheet.getRange(emailRow, 12).setValue(selectedArticles[2].url);
    emailSheet.getRange(emailRow, 13).setValue(selectedArticles[2].thumbnail);

    // Article #4: columns O(15), P(16), Q(17) — skip divider N(14)
    emailSheet.getRange(emailRow, 15).setValue(selectedArticles[3].title);
    emailSheet.getRange(emailRow, 16).setValue(selectedArticles[3].url);
    emailSheet.getRange(emailRow, 17).setValue(selectedArticles[3].thumbnail);

    // Mark articles as Used in collection
    for (var s = 0; s < selectedArticles.length; s++) {
      var usedCell = collectionSheet.getRange(selectedArticles[s].row, 6);
      usedCell.setValue('Used');
      usedCell.setBackground('#8B0000');
      usedCell.setFontColor('#FFFFFF');
    }

    // Update status: column S(19)
    emailSheet.getRange(emailRow, 19).setValue('Complete');

    // Set row height, clip URLs, but wrap title columns
    emailSheet.setRowHeight(emailRow, 40);
    emailSheet.getRange(emailRow, 1, 1, 19).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    emailSheet.getRange(emailRow, 2).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);  // Featured title
    emailSheet.getRange(emailRow, 7).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);  // Article #2 title
    emailSheet.getRange(emailRow, 11).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP); // Article #3 title
    emailSheet.getRange(emailRow, 15).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP); // Article #4 title
    SpreadsheetApp.flush();
  }

  // Save last featured category for rotation
  PropertiesService.getScriptProperties().setProperty('LAST_FEATURED_CATEGORY', featuredCategory);

  ui.alert('Done', 'Newsletters created for ' + rowsToProcess.length + ' row(s).', ui.ButtonSet.OK);
}


/**
 * Generate preview text using Claude API with intro content for context
 */
function generatePreview(title, intro, apiKey) {
  var prompt = 'You are writing a punchy, witty email preview line for a newsletter article.\n\n' +
    'Article title: ' + title + '\n\n' +
    'Article intro: ' + (intro || 'Not available') + '\n\n' +
    'Write ONE short preview line (under 50 characters) that:\n' +
    '- Is witty, clever, or intriguing\n' +
    '- Makes readers want to click\n' +
    '- Relates to the actual content, not just the title\n' +
    '- Avoids cliches like "discover", "explore", "hidden gem", "unveil"\n\n' +
    'Examples of good preview lines:\n' +
    '- "History took a weird turn here."\n' +
    '- "Not your typical beach day."\n' +
    '- "The locals know something."\n' +
    '- "This one\'s a head-scratcher."\n\n' +
    'Return ONLY the preview line, nothing else.';

  try {
    var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      payload: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 100,
        messages: [{ role: 'user', content: prompt }]
      }),
      muteHttpExceptions: true
    });

    var responseCode = response.getResponseCode();
    var responseText = response.getContentText();
    Logger.log('Preview API response code: ' + responseCode);

    if (responseCode !== 200) {
      Logger.log('Preview API error: ' + responseText);
      return 'Error: API returned ' + responseCode;
    }

    var result = JSON.parse(responseText);
    if (result.content && result.content[0]) {
      return result.content[0].text.trim().replace(/^["']|["']$/g, '');
    }
    Logger.log('Preview API unexpected response: ' + responseText);
    return '';
  } catch (e) {
    Logger.log('Preview generation error: ' + e.message);
    return '';
  }
}






// ============================================================================
// END OF ONEDIT HANDLERS
// ============================================================================

function handleArticleStatusColorChange(e) {
  var sheet = e.range.getSheet();
  var statusRow = e.range.getRow();
  var newStatus = e.value;

  try {
    Logger.log('🎨 Handling color change for status: "' + newStatus + '" at row ' + statusRow);

    // Skip color changes for queue statuses (they update frequently and don't need color changes)
    if (newStatus && (newStatus.toString().indexOf('in queue') !== -1 ||
                      newStatus.toString().indexOf('Uploading...') !== -1)) {
      Logger.log('⏭️ Skipping color change for queue status');
      return;
    }

    if (newStatus === 'Ready for WordPress') {
      // Apply blue/cyan theme for Ready for WordPress
      colorReadyForWordPressArticle(sheet, statusRow);
    } else {
      // Reset to original colors for ALL other statuses (including blank)
      resetToOriginalColors(sheet, statusRow);
    }

  } catch (error) {
    Logger.log('❌ Error handling article color change: ' + error.message);
  }
}

function colorReadyForWordPressArticle(sheet, statusRow) {
  Logger.log('🔵 Applying Ready for WordPress colors at row ' + statusRow);
  
  // Color the merged title cell (columns A-K) with dark teal (#083345)
  var titleRange = sheet.getRange(statusRow, 1, 1, 11);
  titleRange.setBackground(CONFIG.COLORS.DARK_TEAL);
  
  // Find and color all connected rows below this article
  var currentRow = statusRow + 1;
  var lastRow = sheet.getLastRow();
  
  while (currentRow <= lastRow) {
    var cellA = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
    
    // Stop if we hit another merged cell (next article)
    if (cellA.isPartOfMerge() && cellA.getMergedRanges()[0].getRow() === currentRow) {
      break;
    }
    
    // Color this row's main content area (columns A-K) with light cyan 3
    var rowRange = sheet.getRange(currentRow, 1, 1, 11);
    rowRange.setBackground(CONFIG.COLORS.LIGHT_CYAN_3); // Light cyan 3 color
    
    currentRow++;
  }
  
  Logger.log('✅ Applied Ready for WordPress colors');
}

function resetToOriginalColors(sheet, statusRow) {
  Logger.log('⚫ Resetting to original colors at row ' + statusRow);
  
  // Reset the merged title cell to original: BLACK background, WHITE text
  var titleRange = sheet.getRange(statusRow, 1, 1, 11);
  titleRange.setBackground(CONFIG.COLORS.BLACK); // Black background
  titleRange.setFontColor(CONFIG.COLORS.WHITE);  // White text
  
  // Find and reset all connected rows below this article
  var currentRow = statusRow + 1;
  var lastRow = sheet.getLastRow();
  
  while (currentRow <= lastRow) {
    var cellA = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
    
    // Stop if we hit another merged cell (next article)
    if (cellA.isPartOfMerge() && cellA.getMergedRanges()[0].getRow() === currentRow) {
      break;
    }
    
    // Reset content rows (A-K) to WHITE background
    var rowRange = sheet.getRange(currentRow, 1, 1, 11);
    rowRange.setBackground(CONFIG.COLORS.WHITE); // White background
    
    // Reset Column D (slide number) to LIGHT PINK background
    var slideNumberCell = sheet.getRange(currentRow, CONFIG.COLUMNS.SLIDE_NUMBER);
    slideNumberCell.setBackground(CONFIG.COLORS.LIGHT_PINK); // Light pink background
    
    currentRow++;
  }
  
  Logger.log('✅ Reset to original colors');
}













// -------- START OF FUNCTIONS -----------



function sendToArticleStatusTracker(e) {
  var sourceSheet = e.range.getSheet();
  var sourceRow = e.range.getRow(); // This is the row where "Send to Tracker" was selected
  
  // Get the data from source sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var titleData = sourceSheet.getRange(sourceRow, 2).getValue(); // Column B
  var statusData = sourceSheet.getRange(sourceRow, 6).getValue(); // Column F
  var columnHData = sourceSheet.getRange(sourceRow, 8).getValue(); // Column H
  var columnIData = sourceSheet.getRange(sourceRow, 9).getValue(); // Column I
  
  // Format the combined H and I data
  var combinedHIData = columnHData + " -- " + columnIData;
  
  // Get the target sheet
  var targetSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  
  // Find the first empty row in the target sheet starting from row 54
  // where both columns C and D are empty and the row is not merged
  var startRow = CONFIG.RANGES.START_ROW;
  var lastRow = targetSheet.getLastRow();
  var numRows = Math.max(lastRow - startRow + 1, 100); // Check at least 100 rows from startRow
  
  var targetRange = targetSheet.getRange(startRow, 3, numRows, 2); // Start at row 54, columns C and D
  var targetValues = targetRange.getValues();
  var targetRow = 0;
  
  for (var i = 0; i < targetValues.length; i++) {
    // Check if both column C and D are empty in this row
    if (targetValues[i][0] === "" && targetValues[i][1] === "") {
      // Check if this row is not merged
      var currentRow = startRow + i;
      var cCell = targetSheet.getRange(currentRow, 3); // Column C
      var dCell = targetSheet.getRange(currentRow, 4); // Column D
      
      // Skip if either cell is part of a merged range
      if (!cCell.isPartOfMerge() && !dCell.isPartOfMerge()) {
        targetRow = currentRow;
        break;
      }
    }
  }
  
  // If no empty row was found, append to the end
  if (targetRow === 0) {
    targetRow = startRow + targetValues.length;
  }
  
  // Transfer the data to the target sheet
  targetSheet.getRange(targetRow, 3).setValue(titleData); // Column C
  targetSheet.getRange(targetRow, 4).setValue(statusData); // Column D
  targetSheet.getRange(targetRow, 8).setValue(combinedHIData); // Column H
  
  // Change the status in column G to "DONE" in the EXACT same row where "Send to Tracker" was selected
  sourceSheet.getRange(sourceRow, 7).setValue(CONFIG.STATUS.DONE);
}






/// TRANSFER TO EDITORS


function sendToEditors(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var row = range.getRow();
  
  // Only proceed if triggered by "Send to Editors"
  if (range.getValue() !== CONFIG.TRIGGERS.SEND_TO_EDITORS) {
    return;
  }

  try {
    // Get the relevant sheets
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var drafterSheet = ss.getSheetByName(CONFIG.SHEETS.DRAFTER);
    var statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
    
    // Get the values to copy
    var mainTopic = drafterSheet.getRange(row, 2).getValue(); // Column B
    var docLink = drafterSheet.getRange(row, 11).getValue(); // Column K
    
    // Find the first empty row in status tracker
    var statusValues = statusSheet.getRange("C:C").getValues();
    var targetRow = statusValues.findIndex(row => !row[0]) + 1;
    
    // If no empty row found, append to the end
    if (targetRow <= 0) {
      targetRow = statusValues.length + 1;
    }
    
    // Copy the values
    statusSheet.getRange(targetRow, 3).setValue(mainTopic); // Column C
    statusSheet.getRange(targetRow, 4).setValue(docLink); // Column D
    
    // Update status in drafter sheet
    drafterSheet.getRange(row, 15).setValue(CONFIG.STATUS.DRAFT_DONE); // Column O

    // Force update
    SpreadsheetApp.flush();

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    // Reset dropdown in case of error
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.STATUS.PLACEHOLDER);
  }
}
 




//CREATES IMAGE FOLDERS IN GOOGLE DRIVE



function createArticleImageFolder(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var row = range.getRow();
  
  var articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();
  var parentFolder = DriveApp.getFolderById(CONFIG.GOOGLE.PARENT_FOLDER_ID);
  
  // Check for existing folder
  var folders = parentFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() === articleTitle) {
      // FOLDER EXISTS - GET THE URL AND PASTE IT
      var existingFolderUrl = folder.getUrl();
      Logger.log('Found existing folder: ' + articleTitle + ' at ' + existingFolderUrl);
      
      try {
        // Use specific spreadsheet ID for Article Status Tracker
        var statusTrackerSS = SpreadsheetApp.openById(CONFIG.GOOGLE.SPREADSHEET_ID);
        var statusTrackerSheet = statusTrackerSS.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
        
        // Get all values in Column C to find the article
        var columnC = statusTrackerSheet.getRange("C:C").getValues();
        var titleRow = null;
        
        // Look for exact title match anywhere in Column C
        for (var i = 0; i < columnC.length; i++) {
          if (columnC[i][0] === articleTitle) {
            titleRow = i + 1;
            break;
          }
        }
        
        if (titleRow) {
          // Set folder URL in corresponding row of Column F in Article Status Tracker
          statusTrackerSheet.getRange(titleRow, 6).setValue(existingFolderUrl);
          
          // Set URL in Uploader sheet Column M
          sheet.getRange(row, CONFIG.COLUMNS.FOLDER_URL).setValue(existingFolderUrl);
          
          // Set status to indicate folder is ready
          sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.STATUS.GDRIVE_FOLDER_READY);
          
          // Show success message instead of just "exists"
          SpreadsheetApp.getUi().alert('Existing folder found and linked!\n\n' + 
                                     'Article: ' + articleTitle + '\n' +
                                     'Folder URL has been pasted in the appropriate cells.');
          
          Logger.log('Successfully linked existing folder for: ' + articleTitle);
          
        } else {
          // Article not found in Status Tracker
          SpreadsheetApp.getUi().alert('Existing folder found but article not found in Status Tracker.\n\n' +
                                     'Folder URL: ' + existingFolderUrl);
          Logger.log('Existing folder found but article not in Status Tracker: ' + articleTitle);
        }
        
      } catch (error) {
        Logger.log('Error linking existing folder: ' + error.message);
        SpreadsheetApp.getUi().alert('Found existing folder but error linking it:\n' + error.message + 
                                   '\n\nFolder URL: ' + existingFolderUrl);
      }
      
      return; // Exit after handling existing folder
    }
  }

  // FOLDER DOESN'T EXIST - CREATE NEW ONE (original logic)
  try {
    var folder = parentFolder.createFolder(articleTitle);
    var folderUrl = folder.getUrl();
    
    // Use specific spreadsheet ID for Article Status Tracker
    var statusTrackerSS = SpreadsheetApp.openById(CONFIG.GOOGLE.SPREADSHEET_ID);
    var statusTrackerSheet = statusTrackerSS.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
    
    // Get all values in Column C
    var columnC = statusTrackerSheet.getRange("C:C").getValues();
    var titleRow = null;
    
    // Look for exact title match anywhere in Column C
    for (var i = 0; i < columnC.length; i++) {
      if (columnC[i][0] === articleTitle) {
        titleRow = i + 1;
        break;
      }
    }
    
    if (titleRow) {
      // Set folder URL in corresponding row of Column F
      statusTrackerSheet.getRange(titleRow, 6).setValue(folderUrl);
      // Set URL in Uploader sheet
      sheet.getRange(row, CONFIG.COLUMNS.FOLDER_URL).setValue(folderUrl);
      sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.STATUS.GDRIVE_FOLDER_READY);
    } else {
      throw new Error('Could not find article title in Status Tracker sheet');
    }
    
  } catch (error) {
    Logger.log('Error in folder creation: ' + error.message);
    SpreadsheetApp.getUi().alert('Error: ' + error.message);
  }
}



function setFolderPermissions(folderId) {
  Drive.Permissions.insert(
    {
      'role': 'writer',
      'type': 'anyone',
      'allowFileDiscovery': true
    },
    folderId
  );
}










// GETS IMAGE FILE NAMES




function fetchImageFileNames(e) {
 var range = e.range;
 var sheet = e.range.getSheet();
 var row = e.range.getRow();
 
 try {
   Logger.log('Starting fetchImageFileNames for row: ' + row);
   
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
   var articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();
   
   Logger.log('Article title: ' + articleTitle);
   
   if (!articleTitle) {
     Logger.log('ERROR: No article title found in row ' + row);
     sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: No article title found');
     return;
   }
   
   var statusData = statusSheet.getRange("C:F").getValues();
   var folderUrl = '';
   
   // Search for matching article title in status sheet
   for (var i = 0; i < statusData.length; i++) {
     if (statusData[i][0] === articleTitle) {
       folderUrl = statusData[i][3];
       Logger.log('Found matching article in Status Tracker row: ' + (i + 1) + ' with folder URL: ' + folderUrl);
       break;
     }
   }
   
   if (!folderUrl) {
     Logger.log('ERROR: No folder URL found for article: ' + articleTitle);
     sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: No Google Drive folder found');
     return;
   }
   
   // Extract folder ID from URL
   var folderId;
   try {
     folderId = folderUrl.split('folders/')[1];
     if (folderId.indexOf('/') > -1) {
       folderId = folderId.split('/')[0]; // In case there's more after the ID
     }
     Logger.log('Extracted folder ID: ' + folderId);
   } catch (error) {
     Logger.log('ERROR: Failed to extract folder ID from URL: ' + folderUrl + ' - ' + error.message);
     sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: Invalid folder URL format');
     return;
   }
   
   // Access the folder
   var folder;
   try {
     folder = DriveApp.getFolderById(folderId);
     Logger.log('Successfully accessed folder: ' + folder.getName());
   } catch (error) {
     Logger.log('ERROR: Failed to access folder with ID ' + folderId + ' - ' + error.message);
     sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: Cannot access Google Drive folder');
     return;
   }
   
   // Get files from folder
   var files = folder.getFiles();
   var fileMap = {};
   var fileCount = 0;
   
   Logger.log('Reading files from folder...');
   
   while (files.hasNext()) {
     try {
       var file = files.next();
       var fileName = file.getName();
       fileCount++;
       
       // Extract the number from the beginning of the filename
       var fileNumberMatch = fileName.match(/^(\d+)/);
       if (fileNumberMatch) {
         var fileNumber = fileNumberMatch[1];
         fileMap[fileNumber] = fileName;
         Logger.log('Mapped file number ' + fileNumber + ' to file: ' + fileName);
       } else {
         Logger.log('Skipping file without number prefix: ' + fileName);
       }
     } catch (error) {
       Logger.log('ERROR: Failed to process a file in the folder - ' + error.message);
       // Continue with other files
     }
   }
   
   Logger.log('Total files processed: ' + fileCount + ', Files with number prefixes: ' + Object.keys(fileMap).length);
   
   if (Object.keys(fileMap).length === 0) {
     Logger.log('WARNING: No usable files found in the folder');
     sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Warning: No usable files found');
     return;
   }
   
   // Process rows to match slide numbers with files
   var currentRow = row + 1;
   var nextCell = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
   var rowsUpdated = 0;
   
   while (!nextCell.isPartOfMerge() && currentRow <= sheet.getLastRow()) {
     try {
       var slideNum = sheet.getRange(currentRow, CONFIG.COLUMNS.SLIDE_NUMBER).getValue().toString();
       
       Logger.log('Processing row ' + currentRow + ', Slide #: ' + slideNum);
       
       if (slideNum && fileMap[slideNum]) {
         sheet.getRange(currentRow, CONFIG.COLUMNS.IMAGE_FILE_NAME_STATUS).setValue(fileMap[slideNum]);
         rowsUpdated++;
         Logger.log('Updated row ' + currentRow + ' with file: ' + fileMap[slideNum]);
       } else if (slideNum) {
         Logger.log('WARNING: No matching file found for slide #' + slideNum);
       }
     } catch (error) {
       Logger.log('ERROR: Failed to process row ' + currentRow + ' - ' + error.message);
       // Continue with other rows
     }
     
     currentRow++;
     nextCell = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
   }
   
   Logger.log('Total rows updated: ' + rowsUpdated);
   
   // Update status
   if (rowsUpdated > 0) {
     sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Image File Names Complete');
     Logger.log('Successfully completed image file name mapping');
   } else {
     sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Warning: No slide numbers matched');
     Logger.log('WARNING: No slide numbers matched with files');
   }
   
 } catch (error) {
   var errorMessage = 'ERROR in fetchImageFileNames: ' + error.message;
   Logger.log(errorMessage);
   Logger.log('Stack trace: ' + error.stack);
   
   // Notify user
   sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: ' + error.message);
   
   // Optional: Send email alert for critical errors
   try {
     MailApp.sendEmail({
       to: CONFIG.EMAIL.WORKFLOW, // Change to appropriate email
       subject: "Error in Image File Names function",
       body: "Error occurred in row " + row + " for article: " + (articleTitle || "Unknown") + "\n\n" +
             "Error message: " + error.message + "\n\n" +
             "Stack trace: " + error.stack
     });
   } catch (emailError) {
     Logger.log('Failed to send error email: ' + emailError.message);
   }
 }
}









// Shutterstock API Configuration
const API_TOKEN = CONFIG.API.SHUTTERSTOCK_TOKEN_ALT;
const BASE_URL = CONFIG.ENDPOINTS.SHUTTERSTOCK_SEARCH;




function getShutterstockMetaData(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  
  // Only run if the first cell in this row is merged
  if (!sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).isPartOfMerge()) return;
  
  let currentRow = row + 1;
  let nextCell = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
  
  while (!nextCell.isPartOfMerge() && currentRow <= sheet.getLastRow()) {
    const url = sheet.getRange(currentRow, CONFIG.COLUMNS.URL_DOC_LINK).getValue();
    
    if (url) {
      try {
        // Fetch the HTML for this URL
        const htmlContent = UrlFetchApp.fetch(url).getContentText();
        
        // -----------------------------
        // 1) SHUTTERSTOCK
        // -----------------------------
        if (url.includes('shutterstock.com')) {
          const stockPhotoID = extractStockPhotoIDFromURL(url);
          const photoContributor = extractPhotoContributor(htmlContent);
          const photoDescription = extractPhotoDescription(htmlContent);
          
          sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue("Shutterstock");
          sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(stockPhotoID);
          sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(photoContributor);
          sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(photoDescription);
        }

        // -----------------------------
        // 2) FLICKR
        // -----------------------------
        else if (url.includes('flickr.com')) {
          const flickrData = extractFlickrMetadata(url, htmlContent);
          
          sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue(`Flickr/${flickrData.username}`);
          sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(flickrData.photoId);
          sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(`${flickrData.creator} (${flickrData.licenseType})`);
          sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(flickrData.title);
        }

        // -----------------------------
        // 3) WIKIMEDIA COMMONS
        // -----------------------------
else if (url.includes('wikimedia.org')) {
  const wikiData = extractWikiMetadata(url, htmlContent);
  
  // Define light red color
  const lightRed = CONFIG.COLORS.VERY_LIGHT_RED;  // Very light red/pink color
  
  // Column 8: Copyright - only add username if it exists
  if (wikiData.username) {
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue(`Wikimedia Commons/${wikiData.username}`);
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setBackground(null);  // Clear any background color
  } else {
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue('Wikimedia Commons');
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setBackground(null);  // Clear any background color
  }
  
  // Column 9: License ID from URL
  if (wikiData.licenseId) {
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(wikiData.licenseId);
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setBackground(null);  // Clear any background color
  } else {
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue('');
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setBackground(lightRed);  // Light red for empty
  }
  
  // Column 10: Just the username
  if (wikiData.username) {
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(wikiData.username);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setBackground(null);  // Clear any background color
  } else {
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue('');
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setBackground(lightRed);  // Light red for empty
  }
  
  // Column 11: Description (alt text)
  if (wikiData.description) {
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(wikiData.description);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setBackground(null);  // Clear any background color
  } else {
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue('');
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setBackground(lightRed);  // Light red for empty
  }
}

        // -----------------------------
        // 4) NPS PHOTO PAGES
        // -----------------------------
        else if (url.includes('nps.gov/media/photo/view.htm')) {
          // 1) Parse the ID from ?id=... in the URL
          const npsIdMatch = url.match(/[?&]id=([^&]+)/);
          const licenseId = npsIdMatch ? npsIdMatch[1] : "Not found";

          // 2) Fetch actual NPS metadata from the JSON endpoint
          const npsData = extractNpsPhotoMetadata(licenseId);

          // 3) Write to columns 8–11
          // Column 8: "National Park Service"
          // Column 9: ID from the URL
          // Column 10: npsData.credit
          // Column 11: npsData.description
          sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue("National Park Service");
          sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(licenseId);
          sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(npsData.credit);
          sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(npsData.description);
        }


      //-----------------------
      // 5) NPS Historic Photos
      // ------------------------

      // NPGALLERY (National Park Gallery) metadata extraction
// -----------------------------
// 5) NPGALLERY PAGES (both HFC and regular)
// -----------------------------
else if (url.includes('npgallery.nps.gov/') && (url.includes('/AssetDetail/') || url.includes('/HFC/AssetDetail/'))) {
  try {
    // Extract the Asset ID from the URL - handle both URL formats
    let assetId;
    if (url.includes('/HFC/AssetDetail/')) {
      assetId = url.split('/HFC/AssetDetail/')[1];
    } else {
      assetId = url.split('/AssetDetail/')[1];
    }
    
    // Log the URL for debugging
    Logger.log(`Processing NPGallery URL: ${url}`);
    
    // Simple string-based extraction approach
    const description = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">Description:</label>', '</div>');
    const copyright = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">Copyright:</label>', '</div>');
    let photoCredit = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">PhotoCredit:</label>', '</div>');
    
    // If photoCredit is not found, try extracting the Publisher as fallback
    if (!photoCredit || photoCredit === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
      photoCredit = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">Publisher:</label>', '</div>');
    }
    
    // When PhotoCredit is "Unknown", use "U.S. National Park Service" as fallback
    if (photoCredit && photoCredit.includes("Unknown")) {
      photoCredit = "U.S. National Park Service";
    }
    
    // Format the copyright string for cleaner display
    let formattedCopyright = "Public Domain (NPS)";
    if (!copyright || copyright === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
      formattedCopyright = "Not found";
    }
    
    // Write to columns 8–11
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue(formattedCopyright);
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(assetId);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(photoCredit);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(description);
    
    Logger.log(`Extracted NPGallery metadata - Asset ID: ${assetId}, PhotoCredit: ${photoCredit}`);
  } catch (error) {
    Logger.log(`Error processing NPGallery URL: ${error.message}`);
    // Keep default "Not found" values in the cells
  }
}

// -----------------------------
// 6) NYPL DIGITAL COLLECTIONS
// -----------------------------
else if (url.includes('digitalcollections.nypl.org/items/')) {
  try {
    // Get NYPL metadata
    const nyplData = extractNYPLMetadata(url, htmlContent);
    
    // Write to columns 8–11
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue(nyplData.copyright);
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(nyplData.licenseId);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(nyplData.credit);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(nyplData.description);
    
    Logger.log(`Extracted NYPL metadata - ${JSON.stringify(nyplData)}`);
  } catch (error) {
    Logger.log(`Error processing NYPL URL: ${error.message}`);
  }
}

// -----------------------------
// LOC (LIBRARY OF CONGRESS)
// -----------------------------
else if (url.includes('loc.gov/item/')) {
  try {
    Logger.log("Processing Library of Congress URL: " + url);
    
    const locData = extractLOCMetadata(url, htmlContent);
    
    // Write to columns 8–11
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue(locData.copyright);
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(locData.licenseId);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(locData.sourceCollection);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(locData.description);
    
    Logger.log("LOC metadata extracted successfully");
  } catch (error) {
    Logger.log("Error processing LOC URL: " + error.message);
    // Use default values in case of error
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue("Library of Congress");
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue("Not found");
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue("Library of Congress");
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue("Not found");
  }
}


// -----------------------------
// DPLA (DIGITAL PUBLIC LIBRARY OF AMERICA)
// -----------------------------
else if (url.includes('dp.la/item/')) {
  try {
    Logger.log("Processing DPLA URL: " + url);
    
    const dplaData = extractDPLAMetadata(url, htmlContent);
    
    // Write to columns 8–11
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue(dplaData.copyright);
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue(dplaData.licenseId);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue(dplaData.licensor);
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue(dplaData.description);
    
    Logger.log("DPLA metadata extracted successfully");
  } catch (error) {
    Logger.log("Error processing DPLA URL: " + error.message);
    // Use default values in case of error
    sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).setValue("Digital Public Library of America");
    sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).setValue("Not found");
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).setValue("Digital Public Library of America");
    sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).setValue("Not found");
  }
}


// Helper function to extract text between two strings, handling HTML and extra whitespace
function extractTextBetweenStrings(html, startString, endString) {
  try {
    const startIndex = html.indexOf(startString);
    if (startIndex === -1) return CONFIG.IMAGE_SOURCES.NOT_FOUND;
    
    const contentStartIndex = html.indexOf('>', startIndex + startString.length) + 1;
    const contentEndIndex = html.indexOf(endString, contentStartIndex);
    
    if (contentStartIndex === 0 || contentEndIndex === -1) return CONFIG.IMAGE_SOURCES.NOT_FOUND;
    
    // Extract and clean up the text
    let extractedText = html.substring(contentStartIndex, contentEndIndex)
      .replace(/<[^>]+>/g, "") // Remove any HTML tags
      .replace(/&nbsp;/g, " ")  // Replace HTML non-breaking spaces
      .replace(/\s+/g, " ")     // Normalize whitespace
      .trim();
    
    // Remove trailing semicolon if present
    if (extractedText.endsWith(";")) {
      extractedText = extractedText.slice(0, -1).trim();
    }
    
    return extractedText || "Not found";
  } catch (err) {
    Logger.log(`Error in extractTextBetweenStrings: ${err}`);
    return CONFIG.IMAGE_SOURCES.NOT_FOUND;
  }
}
        
      } catch(error) {
        Logger.log('Error processing row ' + currentRow + ': ' + error.message);
      }
    }
    
    currentRow++;
    nextCell = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
  }
  
  sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.STATUS.GET_IMAGE_META_DATA_COMPLETE);
}



// -----------------------------------------------------------
// DIGITAL PUBLIC LIBRARY OF AMERICA (DPLA) HELPER
// -----------------------------------------------------------
function extractDPLAMetadata(url, html) {
  // Set default values
  let description = "Not found";
  let licensor = "Not found";
  let itemId = "Not found";
  
  try {
    // Extract DPLA item ID from URL
    const itemIdPattern = /dp\.la\/item\/([a-zA-Z0-9]+)/;
    const itemIdMatch = url.match(itemIdPattern);
    if (itemIdMatch && itemIdMatch[1]) {
      itemId = itemIdMatch[1];
    }
    
    // Extract description - try different patterns
    // Pattern 1: Regular div with paragraph
    let descriptionPattern = /<div id="dpla-description"[^>]*>(?:\s*)<p>([^<]+)<\/p>/;
    let descriptionMatch = html.match(descriptionPattern);
    
    // Pattern 2: Different class structure
    if (!descriptionMatch) {
      descriptionPattern = /<div id="dpla-description"[^>]*>([\s\S]*?)<\/div>/;
      descriptionMatch = html.match(descriptionPattern);
      if (descriptionMatch && descriptionMatch[1]) {
        // Extract text from inside any HTML tags
        const tempDiv = descriptionMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        if (tempDiv) {
          description = tempDiv;
        }
      }
    } else if (descriptionMatch && descriptionMatch[1]) {
      description = descriptionMatch[1].trim().replace(/&#x27;/g, "'");
    }
    
    // Extract contributor/licensor - try multiple patterns
    // First try JSON-style data pattern
    let contributorPattern = /"contributor"\s*:\s*"([^"]+)"/;
    let contributorMatch = html.match(contributorPattern);
    
    // If not found, try looking for specific HTML patterns
    if (!contributorMatch) {
      contributorPattern = /<[^>]*class="[^"]*contributor[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/;
      contributorMatch = html.match(contributorPattern);
      if (contributorMatch && contributorMatch[1]) {
        // Clean up any HTML tags within
        licensor = contributorMatch[1].replace(/<[^>]*>/g, '').trim();
      }
    } else if (contributorMatch && contributorMatch[1]) {
      licensor = contributorMatch[1].trim();
    }
    
    // Additional fallback for metadata that might be in a different format
    if (description === CONFIG.IMAGE_SOURCES.NOT_FOUND || licensor === "Digital Public Library of America") {
      // Look for data embedded in JSON format
      const jsonDataPattern = /<script\s+type="application\/json"\s+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/;
      const jsonDataMatch = html.match(jsonDataPattern);
      
      if (jsonDataMatch && jsonDataMatch[1]) {
        try {
          const jsonData = JSON.parse(jsonDataMatch[1]);
          // Navigate through the JSON structure to find description and contributor
          if (jsonData.props?.pageProps?.item?.sourceResource?.description) {
            const descArray = jsonData.props.pageProps.item.sourceResource.description;
            if (Array.isArray(descArray) && descArray.length > 0) {
              description = descArray[0];
            } else if (typeof descArray === 'string') {
              description = descArray;
            }
          }
          
          if (jsonData.props?.pageProps?.item?.dataProvider) {
            licensor = jsonData.props.pageProps.item.dataProvider;
          }
        } catch (e) {
          Logger.log("Error parsing JSON data: " + e.message);
        }
      }
    }
    
    Logger.log("Successfully extracted DPLA metadata - Description: " + description + ", Licensor: " + licensor);
    
  } catch (err) {
    Logger.log("Error extracting DPLA metadata: " + err.message);
  }
  
  // Format the copyright string
  const copyright = "Digital Public Library of America/" + licensor;
  
  return {
    description: description,
    licensor: licensor,
    copyright: copyright,
    licenseId: "DPLA: " + itemId
  };
}


// -----------------------------------------------------------
// USGS HELPER
// -----------------------------------------------------------
function extractUSGSMetadata(url, html) {
  // Set default values
  let description = "Not found";
  let licensor = "US Geological Survey";
  
  try {
    // Extract description from og:description meta tag
    const descriptionPattern = /<meta\s+property="og:description"\s+content="([^"]+)"/;
    const descriptionMatch = html.match(descriptionPattern);
    if (descriptionMatch && descriptionMatch[1]) {
      description = descriptionMatch[1].trim();
    }
    
    // Extract owner/licensor from the owner-date block
    const ownerPattern = /<div class="owner-date">[\s\S]*?<span class="by-line">[\s\S]*?By[\s\S]*?<a[^>]*>([^<]+)<\/a>/;
    const ownerMatch = html.match(ownerPattern);
    if (ownerMatch && ownerMatch[1]) {
      licensor = ownerMatch[1].trim();
    }
    
    Logger.log("Successfully extracted USGS metadata - Description: " + description + ", Licensor: " + licensor);
    
  } catch (err) {
    Logger.log("Error extracting USGS metadata: " + err.message);
  }
  
  return {
    description: description,
    credit: licensor,
    copyright: "US Geological Survey/Public Domain",
    licenseId: "USGS/Public Domain",
    licensor: licensor
  };
}


// -----------------------------------------------------------
// LIBRARY OF CONGRESS HELPER
// -----------------------------------------------------------
function extractLOCMetadata(url, html) {
  // Set default values
  let title = "Not found";
  let sourceCollection = "Library of Congress";
  let lccn = "Not found";
  let contributor = "";
  
  try {
    // Extract title - direct approach
    const titlePattern = /<h1[^>]*>\s*(?:<small[^>]*>.*?<\/small>\s*)?<cite>([^<]+)<\/cite>/s;
    const titleMatch = html.match(titlePattern);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }
    
    // Extract Library of Congress Control Number - more direct approach
    const lccnPattern = /<h3 id="item-library_of_congress_control_number"[^>]*>[\s\S]*?<\/h3>\s*<ul[^>]*>\s*<li>([^<]+)<\/li>/;
    const lccnMatch = html.match(lccnPattern);
    if (lccnMatch && lccnMatch[1]) {
      lccn = "LCCN: " + lccnMatch[1].trim();
    }
    
    // Extract Source Collection - more direct approach
    const sourcePattern = /<h3 id="item-source_collection"[^>]*>[\s\S]*?<\/h3>\s*<ul[^>]*>\s*<li>([^<]+)<\/li>/;
    const sourceMatch = html.match(sourcePattern);
    if (sourceMatch && sourceMatch[1]) {
      sourceCollection = sourceMatch[1].trim();
    }
    
    // Extract Contributor - looking for the specific format in the facets box
    const contribPattern = /<h3 id="item-facet-contributor">[\s\S]*?<\/h3>\s*<ul[^>]*>([\s\S]*?)<\/ul>/;
    const contribSection = html.match(contribPattern);
    if (contribSection && contribSection[1]) {
      // Look for the link text which contains just the contributor name
      const contribItemPattern = /<a [^>]*>\s*([^<]+)\s*<\/a>/;
      const contribItemMatch = contribSection[1].match(contribItemPattern);
      if (contribItemMatch && contribItemMatch[1]) {
        contributor = contribItemMatch[1].trim();
      }
    }
    
    // If we couldn't find the contributor in the facets, try the standard contributor section
    if (!contributor) {
      const standardContribPattern = /<h3 id="item-contributor_names"[^>]*>[\s\S]*?<\/h3>\s*<ul[^>]*>([\s\S]*?)<\/ul>/;
      const standardContribSection = html.match(standardContribPattern);
      if (standardContribSection && standardContribSection[1]) {
        // Try to extract just the name without any HTML tags
        const cleanContrib = standardContribSection[1].replace(/<[^>]+>/g, '').trim();
        if (cleanContrib) {
          contributor = cleanContrib;
        }
      }
    }
    
    // Default contributor if still not found
    if (!contributor) {
      contributor = "Library of Congress";
    }
    
    Logger.log("Successfully extracted LOC metadata - Title: " + title + ", LCCN: " + lccn + ", Contributor: " + contributor);
    
  } catch (err) {
    Logger.log("Error extracting LOC metadata: " + err.message);
  }
  
  // Format the copyright as requested
  const copyright = "Library of Congress/" + contributor;
  
  return {
    description: title,
    credit: contributor,
    copyright: copyright,
    licenseId: lccn,
    sourceCollection: sourceCollection
  };
}


// -----------------------------------------------------------
// NYPL DIGITAL COLLECTIONS HELPER
// -----------------------------------------------------------
function extractNYPLMetadata(url, html) {
  // Set default values
  let description = "Not found";
  let licensor = "The New York Public Library";
  let licenseId = "Not found";
  const copyright = "The New York Public Library Digital Collections";
  
  try {
    // Extract title (for alt text)
    const titleMatch = html.match(/<h1>(.*?)<\/h1>/);
    if (titleMatch) {
      description = titleMatch[1].trim();
    }
    
    // Extract UUID - look more carefully in the HTML
    const uuidMatch = html.match(/Universal Unique Identifier \(UUID\): ([a-f0-9\-]+)/);
    if (uuidMatch) {
      licenseId = "UUID: " + uuidMatch[1];
    }
    
    // Extract library location (for licensor)
    // Look for the division section which appears to have this info
    const divisionMatch = html.match(/<div class="data-value" id="item-division"><a [^>]*>(.*?)<\/a>/);
    if (divisionMatch) {
      licensor = divisionMatch[1].trim();
    }
    
    Logger.log("Successfully extracted NYPL metadata");
    
  } catch (err) {
    Logger.log("Error extracting NYPL metadata: " + err.message);
  }
  
  return {
    description: description,
    credit: licensor,
    copyright: copyright,
    licenseId: licenseId
  };
}


// -----------------------------------------------------------
// SHUTTERSTOCK HELPERS
// -----------------------------------------------------------
function extractStockPhotoIDFromURL(url) {
  // e.g. "https://www.shutterstock.com/image-photo/sunset-ocean-123456789"
  // Updated regex handles: query params (?), hash (#), trailing slash (/), and different image types
  const regex = /image-[a-z]+\/.*-(\d+)(?:[?#\/]|$)/;
  const match = url.match(regex);
  return match ? match[1] : "Not found";
}

function extractPhotoDescription(html) {
  // "imageType":"photo","description":"Some description text"
  const regex = /"imageType":"photo","description":"(.*?)"/;
  const match = html.match(regex);
  if (match) {
    return match[1].replace(/\r/g, '').trim();
  }
  return CONFIG.IMAGE_SOURCES.NOT_FOUND;
}

function extractPhotoContributor(html) {
  // "contributor":{..."displayName":"John Doe"
  const regex = /"contributor":\{.*?"displayName":"(.*?)"/;
  const match = html.match(regex);
  return match ? match[1] : "Not found";
}

// -----------------------------------------------------------
// FLICKR HELPER
// -----------------------------------------------------------
function extractFlickrMetadata(url, html) {
  // Photo ID from the URL
  const photoIdRegex = /photos\/[^\/]+\/(\d+)/;
  const photoIdMatch = url.match(photoIdRegex);
  const photoId = photoIdMatch ? photoIdMatch[1] : "Not found";
  
  // <meta property="og:title" content="Title Here">
  const titleRegex = /<meta property="og:title" content="([^"]+)"/;
  const titleMatch = html.match(titleRegex);
  const title = titleMatch ? titleMatch[1].trim() : "Not found";
  
  // class="owner-name ...">Some Creator<
  const creatorRegex = /class="owner-name[^"]*"[^>]*>([^<]+)</;
  const creatorMatch = html.match(creatorRegex);
  const creator = creatorMatch ? creatorMatch[1].trim() : "Not found";
  
  // class="attribution-username">ExampleUser<
  const usernameRegex = /class="attribution-username"[^>]*>([^<]+)</;
  const usernameMatch = html.match(usernameRegex);
  const username = usernameMatch ? usernameMatch[1].trim() : "Not found";
  
  // <a href="https://creativecommons.org/licenses/by-nd/4.0/">
  const licenseRegex = /href="https:\/\/creativecommons.org\/licenses\/([^/]+)\/(\d+\.?\d*)\//;
  const licenseMatch = html.match(licenseRegex);
  const licenseType = licenseMatch
    ? `CC ${licenseMatch[1].toUpperCase()} ${licenseMatch[2]}`
    : "All Rights Reserved";
  const fullLicense = licenseMatch
    ? `Creative Commons ${licenseMatch[1].toUpperCase()} ${licenseMatch[2]} License`
    : "All Rights Reserved";
  
  return {
    photoId,
    title,
    creator,
    username,
    licenseType,
    fullLicense
  };
}

// -----------------------------------------------------------
// WIKIMEDIA COMMONS HELPER
// -----------------------------------------------------------
// Uses Wikimedia API for reliable metadata extraction
// Includes fallbacks for images missing metadata
// -----------------------------------------------------------
function extractWikiMetadata(url, html) {
  let username = "";
  let description = "";
  let licenseType = "";
  let licenseId = "";

  try {
    // Extract filename from URL
    const fileMatch = url.match(/wiki\/File:([^?#]+)/);
    if (!fileMatch) {
      Logger.log("Wikimedia: Could not extract filename from URL: " + url);
      return { username, description, licenseType, licenseId };
    }

    const filename = decodeURIComponent(fileMatch[1]);
    licenseId = "wiki/File:" + filename;

    // Call Wikimedia API for reliable metadata
    const apiUrl = "https://commons.wikimedia.org/w/api.php?action=query" +
                   "&titles=File:" + encodeURIComponent(filename) +
                   "&prop=imageinfo&iiprop=extmetadata&format=json";

    const response = UrlFetchApp.fetch(apiUrl, {
      muteHttpExceptions: true,
      headers: {
        "User-Agent": "WIYS-Workflow/1.0 (Google Apps Script)"
      }
    });

    if (response.getResponseCode() !== 200) {
      Logger.log("Wikimedia API request failed with status: " + response.getResponseCode());
      return { username, description, licenseType, licenseId };
    }

    const json = JSON.parse(response.getContentText());
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === "-1" || !pages[pageId].imageinfo) {
      Logger.log("Wikimedia: No image info found for: " + filename);
      return { username, description, licenseType, licenseId };
    }

    const metadata = pages[pageId].imageinfo[0].extmetadata;

    // Extract Artist/Author - strip HTML tags for clean text
    if (metadata.Artist && metadata.Artist.value) {
      username = metadata.Artist.value
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // FALLBACK: If no Author, check Categories for known sources
    if (!username && metadata.Categories && metadata.Categories.value) {
      const categories = metadata.Categories.value;
      if (categories.includes('PD US Military') || categories.includes('US Military')) {
        username = "U.S. Military";
      } else if (categories.includes('PD USGov') || categories.includes('US Government')) {
        username = "U.S. Government";
      } else if (categories.includes('PD US Army') || categories.includes('US Army')) {
        username = "U.S. Army";
      } else if (categories.includes('PD US Navy') || categories.includes('US Navy')) {
        username = "U.S. Navy";
      } else if (categories.includes('PD US Air Force') || categories.includes('US Air Force')) {
        username = "U.S. Air Force";
      } else if (categories.includes('PD NASA') || categories.includes('NASA')) {
        username = "NASA";
      } else if (categories.includes('PD NOAA') || categories.includes('NOAA')) {
        username = "NOAA";
      } else if (categories.includes('PD USGS') || categories.includes('USGS')) {
        username = "U.S. Geological Survey";
      }
    }

    // Extract Description - strip HTML tags for clean alt text
    if (metadata.ImageDescription && metadata.ImageDescription.value) {
      description = metadata.ImageDescription.value
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // FALLBACK: If no Description, use ObjectName (filename) cleaned up
    if (!description && metadata.ObjectName && metadata.ObjectName.value) {
      description = metadata.ObjectName.value
        .replace(/[-_]/g, ' ')           // Replace hyphens/underscores with spaces
        .replace(/\s+/g, ' ')            // Normalize whitespace
        .replace(/\.(jpg|jpeg|png|gif|svg|tif|tiff)$/i, '')  // Remove extension
        .trim();
      // Capitalize first letter
      if (description) {
        description = description.charAt(0).toUpperCase() + description.slice(1);
      }
    }

    // Extract License
    if (metadata.LicenseShortName && metadata.LicenseShortName.value) {
      licenseType = metadata.LicenseShortName.value;
    } else if (metadata.License && metadata.License.value) {
      licenseType = metadata.License.value;
    }

    Logger.log("Wikimedia API extraction - Author: " + (username || "(fallback needed)") + ", Description: " + (description ? description.substring(0, 50) + "..." : "(fallback needed)") + ", License: " + licenseType);

  } catch (error) {
    Logger.log("Error in extractWikiMetadata: " + error.message);
  }

  return {
    username,       // Clean author name (or fallback from categories)
    description,    // Clean description (or fallback from filename)
    licenseType,    // License type
    licenseId       // wiki/File: ID from URL
  };
}

// Helper function to properly decode HTML entities
function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#160;/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '…');
}

// Updated license extraction to return empty string by default
function extractLicenseFromHiddenCategories(html) {
  const hiddenCatRegex = /<div id="mw-hidden-catlinks"[^>]*>[\s\S]*?<ul>([\s\S]*?)<\/ul>/;
  const hiddenBlockMatch = hiddenCatRegex.exec(html);
  if (!hiddenBlockMatch) {
    return "";  // Return empty string instead of "Public Domain"
  }

  const liRegex = /<li[^>]*>\s*<a [^>]*>([^<]+)<\/a>\s*<\/li>/g;
  const ccLicenses = [];
  let match;

  while ((match = liRegex.exec(hiddenBlockMatch[1])) !== null) {
    const categoryName = match[1].trim();
    const ccRegex = /^(?:CC-)?BY(?:-SA)?-(\d+(?:\.\d+)?)/i;
    const ccMatch = ccRegex.exec(categoryName);
    if (ccMatch) {
      ccLicenses.push({
        rawName: categoryName,
        version: parseFloat(ccMatch[1])
      });
    }
  }

  if (!ccLicenses.length) {
    // Only return "Public Domain" if explicitly found
    if (hiddenBlockMatch[1].includes("PD-") || hiddenBlockMatch[1].includes("Public domain")) {
      return "Public Domain";
    }
    return "";  // Return empty string if no license found
  }

  ccLicenses.sort((a, b) => b.version - a.version);
  return ccLicenses[0].rawName; 
}

// -------------------------------------------------------
// NPS PHOTO HELPER
// -------------------------------------------------------
function extractNpsPhotoMetadata(npsId) {
  // The JSON endpoint from the page’s Ajax call
  // e.g. https://www.nps.gov/npgallery/Asset/D5BC8B00-1DD8-B71B-0BDF-213204E83610
  const jsonUrl = `https://www.nps.gov/npgallery/Asset/${npsId}`;
  
  let description = "Not found";
  let credit      = "Not found";
  
  try {
    const response = UrlFetchApp.fetch(jsonUrl);
    const data = JSON.parse(response.getContentText());
    
    // For example:
    // data.Description => "Delicate Arch in Arches National Park"
    // data.PhotoCredit => "NPS/Madelyn Carpenter"
    if (data.Description) {
      description = data.Description.trim();
    }

    // If PhotoCredit is provided, use it. Otherwise default to "NPS Photo"
    if (data.PhotoCredit) {
      credit = data.PhotoCredit.trim();
    } else {
      credit = "NPS Photo";
    }

  } catch (err) {
    Logger.log(`Error fetching NPS JSON for ${npsId}: ${err}`);
  }

  return { 
    description,
    credit
  };
}








function extractPhotoDescription(html) {
 const regex = /"imageType":"photo","description":"(.*?)"/;
 const match = html.match(regex);
 if (match) {
   return match[1].replace(/\r/g, '').trim();
 }
 return CONFIG.IMAGE_SOURCES.NOT_FOUND;
}




function extractPhotoContributor(html) {
 const regex = /"contributor":\{.*?"displayName":"(.*?)"/;
 const match = html.match(regex);
 return match ? match[1] : "Not found";
}




function extractStockPhotoID(html) {
 const regex = /"AssetDescription_assetId">Stock Photo ID: (\d+)<\/p>/;
 const match = html.match(regex);
 return match ? match[1] : "Not found";
}




function getAuthorIdByUsername(name) {
  var username = CONFIG.WORDPRESS.USERNAME;
  var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
  var usersEndpoint = CONFIG.ENDPOINTS.WP_USERS + "?search=" + encodeURIComponent(name);




  var options = {
    method: "get",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
    },
    muteHttpExceptions: true
  };




  try {
    var response = UrlFetchApp.fetch(usersEndpoint, options);
    if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
      var users = JSON.parse(response.getContentText());
      for (var i = 0; i < users.length; i++) {
        if (users[i].name === name) {
          return users[i].id;
        }
      }
    }
  } catch (error) {
    Logger.log("Error getting author ID: " + error.message);
  }
  return null;
}

/**
 * Attempts to acquire an article-specific lock
 * @param {string} articleTitle - The title of the article to lock
 * @returns {boolean} - True if lock acquired, false if article is already locked
 */
function acquireArticleLock(articleTitle) {
  var scriptLock = LockService.getScriptLock();
  try {
    // Use brief global lock just to check/update properties atomically
    scriptLock.waitLock(5000);

    var props = PropertiesService.getScriptProperties();
    var lockKey = 'wp_upload_' + articleTitle;
    var existingLock = props.getProperty(lockKey);

    // Check if article is already locked
    if (existingLock) {
      var lockTime = parseInt(existingLock);
      var currentTime = new Date().getTime();

      // If lock is older than 5 minutes, consider it stale and take over
      if (currentTime - lockTime < 5 * 60 * 1000) {
        Logger.log('⚠️ Article "' + articleTitle + '" is currently being uploaded by another process');
        return false;
      }
      Logger.log('🔓 Stale lock detected for "' + articleTitle + '", taking over');
    }

    // Acquire the lock by storing current timestamp
    props.setProperty(lockKey, new Date().getTime().toString());
    Logger.log('🔒 Acquired upload lock for article: ' + articleTitle);
    return true;

  } catch (e) {
    Logger.log('⚠️ Error acquiring lock for "' + articleTitle + '": ' + e.message);
    return false;
  } finally {
    scriptLock.releaseLock();
  }
}

/**
 * Releases an article-specific lock
 * @param {string} articleTitle - The title of the article to unlock
 */
function releaseArticleLock(articleTitle) {
  var scriptLock = LockService.getScriptLock();
  try {
    // Use brief global lock just to update properties atomically
    scriptLock.waitLock(5000);

    var props = PropertiesService.getScriptProperties();
    var lockKey = 'wp_upload_' + articleTitle;
    props.deleteProperty(lockKey);
    Logger.log('🔓 Released upload lock for article: ' + articleTitle);

  } catch (e) {
    Logger.log('⚠️ Error releasing lock for "' + articleTitle + '": ' + e.message);
  } finally {
    scriptLock.releaseLock();
  }
}

function uploadToWordPress(e) {
  var range = e.range;
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var col = e.range.getColumn();

  if (col !== 12) return;
  if (sheet.getName() !== CONFIG.SHEETS.UPLOADER) return;

  // Get article title first for lock key
  var articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();

  // Acquire article-specific lock to prevent concurrent uploads of the same article
  if (!acquireArticleLock(articleTitle)) {
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Uploading');
    return;
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  
  var statusData = statusSheet.getDataRange().getValues();
  var articleRowInStatus = -1;
  var state = '';
  var folderUrl = '';
  var existingWpUrl = '';
  for (var i = 0; i < statusData.length; i++) {
    if (statusData[i][2] === articleTitle) {
      articleRowInStatus = i + 1;
      state = statusData[i][0];
      existingWpUrl = statusData[i][4]; // Column E - WordPress URL
      folderUrl = statusData[i][5];
      break;
    }
  }

  if (articleRowInStatus === -1) {
    Logger.log("❌ Article not found in Status Tracker: " + articleTitle);
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Not in Status Tracker');
    return;
  }

  // GUARD: Check if article has already been uploaded to WordPress
  if (existingWpUrl && existingWpUrl.toString().trim() !== '') {
    Logger.log("⚠️ DUPLICATE UPLOAD PREVENTED: Article '" + articleTitle + "' already has WordPress URL: " + existingWpUrl);
    Logger.log("⚠️ Skipping upload to prevent duplicate post creation.");
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Successful WP Upload');
    return;
  }

  var slides = getSlidesFromUploader(sheet, row);
  if (slides.length === 0) {
    Logger.log("❌ No slides found for article: " + articleTitle);
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('No Slides Found');
    return;
  }

  Logger.log("✓ Found " + slides.length + " slides for article: " + articleTitle);

  // Extract folder ID from URL
  if (!folderUrl || folderUrl.trim() === '') {
    Logger.log("❌ No folder URL found for article: " + articleTitle);
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('No Folder URL');
    return;
  }

  var folderId = folderUrl.split('folders/')[1];
  if (!folderId) {
    Logger.log("❌ Invalid folder URL format: " + folderUrl);
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Invalid Folder URL');
    return;
  }

  Logger.log("✓ Accessing folder: " + folderId);
  var folder = DriveApp.getFolderById(folderId);
  var updatedSlides = uploadImagesToWordPress(slides, folder, sheet, row);

  if (!updatedSlides) {
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue("Upload Failed - Images");
    Logger.log("Image upload failed. Aborting WordPress upload for " + articleTitle);

    // Try to send notification email (may fail if permissions not granted)
    try {
      MailApp.sendEmail({
        to: CONFIG.EMAIL.WORKFLOW,
        subject: "Aborted Upload - Image Failure",
        body: "The WP upload for \"" + articleTitle + "\" was aborted due to an image-upload failure."
      });
    } catch (emailError) {
      Logger.log("Failed to send notification email: " + emailError.message);
    }

    return;
  }

  // Get category and other IDs
  var stateCategoryId = getCachedCategoryId(state);
  var feedTypeId = getCachedFeedTypeId("Slideshow");
  var authorId = getRandomAuthor();

  // NEW: Get tags and find related articles
  var username = CONFIG.WORDPRESS.USERNAME;
  var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
  var articleTags = lookupArticleInStatusTracker(articleTitle);
  var tagIds = [];
  var relatedArticles = [];
  
  if (articleTags && articleTags.length > 0) {
    Logger.log('Found tags for article: ' + articleTags.join(', '));
    tagIds = convertTagsToWordPressCached(articleTags, username, applicationPassword);
    
    // Find related 2025 articles
    relatedArticles = findRelatedArticles(articleTags, stateCategoryId, username, applicationPassword);
    Logger.log('Found ' + relatedArticles.length + ' related 2025 articles');
  }

  // Get featured image
  var featuredImageId = (updatedSlides.length > 0 && updatedSlides[0].imageId) ? updatedSlides[0].imageId : 0;
  
  // Create slideshow content with dynamic related articles
  var slideshowContent = createSlideshowContent(updatedSlides, relatedArticles);

  var postPayload = {
    title: cleanForDisplay(articleTitle),
    status: CONFIG.WP_POST_STATUS.DRAFT,
    content: slideshowContent,
    categories: [stateCategoryId],
    feed_type: feedTypeId ? [feedTypeId] : [],
    author: authorId || 1,
    featured_media: featuredImageId,
    tags: tagIds
  };

  var wordpressUrl = CONFIG.ENDPOINTS.WP_POSTS;

  try {
    var options = {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
      },
      payload: JSON.stringify(postPayload)
    };
    
    var response = UrlFetchApp.fetch(wordpressUrl, options);
    var responseData = JSON.parse(response.getContentText());
    var wordpressUrlDraft = responseData.link;
    
    var featuredImageSuccess = responseData.featured_media && responseData.featured_media > 0;
    
    statusSheet.getRange(articleRowInStatus, 5).setValue(wordpressUrlDraft);
    statusSheet.getRange(articleRowInStatus, 7).setValue('Successful WP Upload');
    
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Successful WP Upload');
    
    // Log success details
    Logger.log('✅ WordPress upload successful!');
    Logger.log('✅ Applied ' + tagIds.length + ' tags');
    Logger.log('✅ Added ' + relatedArticles.length + ' related 2025 articles to last slide');
    
    // Handle featured image status
    if (featuredImageSuccess) {
      sheet.getRange(row + 1, CONFIG.COLUMNS.STATUS_MESSAGES)
        .setValue(wordpressUrlDraft)
        .setBackground(CONFIG.COLORS.PEACH_SALMON);
      Logger.log("✅ Featured image set successfully for: " + articleTitle);
    } else {
      sheet.getRange(row + 1, CONFIG.COLUMNS.STATUS_MESSAGES)
        .setValue("Needs Featured Image")
        .setBackground(CONFIG.COLORS.TEAL_CYAN);
      Logger.log("❌ Featured image failed for: " + articleTitle);
    }
    
    Logger.log("WordPress draft created: " + wordpressUrlDraft);

    // POST-UPLOAD: Correct punctuation with Claude (non-critical — if this fails, the post is still uploaded fine)
    try {
      var punctApiKey = PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY');
      if (punctApiKey && responseData.id) {
        var corrected = correctPunctuationWithClaude(articleTitle, updatedSlides, punctApiKey);
        var updatePayload = {};

        // Only update title if Claude returned a different version
        if (corrected.title && corrected.title !== articleTitle) {
          updatePayload.title = cleanForDisplay(corrected.title);
          Logger.log('Punctuation: title corrected to: ' + corrected.title);
        }

        // Update subheadings in existing content via safe string replacement
        if (corrected.subheadings) {
          var updatedContent = slideshowContent;
          var contentChanged = false;
          for (var si = 0; si < updatedSlides.length; si++) {
            var oldSub = cleanForDisplay(updatedSlides[si].subheading || '');
            var newSub = cleanForDisplay(corrected.subheadings[si] || '');
            if (newSub && newSub !== oldSub && oldSub) {
              updatedContent = updatedContent.split(oldSub).join(newSub);
              contentChanged = true;
              Logger.log('Punctuation: subheading ' + (si + 1) + ' corrected');
            }
          }
          if (contentChanged) {
            updatePayload.content = updatedContent;
          }
        }

        // Only call WordPress API if there are actual changes
        if (Object.keys(updatePayload).length > 0) {
          var updateOptions = {
            method: "post",
            contentType: "application/json",
            headers: {
              Authorization: "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
            },
            payload: JSON.stringify(updatePayload)
          };
          UrlFetchApp.fetch(wordpressUrl + '/' + responseData.id, updateOptions);
          Logger.log('✅ Post updated with punctuation corrections');
        } else {
          Logger.log('Punctuation check: no corrections needed');
        }
      }
    } catch (punctError) {
      // Non-critical — the post is already uploaded successfully
      Logger.log('⚠️ Punctuation correction skipped (post still uploaded OK): ' + (punctError.message || punctError));
    }

  } catch (error) {
    var errorMsg = error && error.message ? error.message : (error ? error.toString() : 'Unknown error');
    Logger.log("❌ Error in uploadToWordPress: " + errorMsg);
    if (error && error.stack) {
      Logger.log("Stack trace: " + error.stack);
    }
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: ' + errorMsg);
  }

  } finally {
    // Always release the article-specific lock
    releaseArticleLock(articleTitle);
  }
}


// ============================================================================
// UPLOAD QUEUE MANAGEMENT
// ============================================================================

/**
 * Get the current upload queue from PropertiesService
 * @returns {Array} Queue array of {articleTitle, row, timestamp, sheetName}
 */
function getUploadQueue() {
  var props = PropertiesService.getScriptProperties();
  var queueJson = props.getProperty('wp_upload_queue');
  if (!queueJson) return [];

  try {
    return JSON.parse(queueJson);
  } catch (e) {
    Logger.log('Error parsing queue: ' + e.message);
    return [];
  }
}

/**
 * Save the upload queue to PropertiesService
 * @param {Array} queue - Queue array to save
 */
function saveUploadQueue(queue) {
  var props = PropertiesService.getScriptProperties();
  props.setProperty('wp_upload_queue', JSON.stringify(queue));
}

/**
 * Add an article to the upload queue
 * @param {string} articleTitle - Title of article to upload
 * @param {number} row - Row number in the sheet
 * @returns {number} Position in queue (1-based)
 */
function addToUploadQueue(articleTitle, row) {
  var scriptLock = LockService.getScriptLock();
  try {
    scriptLock.waitLock(10000);

    var queue = getUploadQueue();

    // Check if already in queue
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].articleTitle === articleTitle) {
        Logger.log('Article already in queue at position ' + (i + 1) + ': ' + articleTitle);
        return i + 1; // Return existing position
      }
    }

    // Add to queue
    queue.push({
      articleTitle: articleTitle,
      row: row,
      timestamp: new Date().getTime(),
      sheetName: CONFIG.SHEETS.UPLOADER
    });

    saveUploadQueue(queue);
    var position = queue.length;

    Logger.log('Added to upload queue at position ' + position + ': ' + articleTitle);
    return position;

  } catch (e) {
    Logger.log('Error adding to queue: ' + e.message);
    return -1;
  } finally {
    scriptLock.releaseLock();
  }
}

/**
 * Remove an article from the upload queue
 * @param {string} articleTitle - Title of article to remove
 */
function removeFromQueue(articleTitle) {
  var scriptLock = LockService.getScriptLock();
  try {
    scriptLock.waitLock(10000);

    var queue = getUploadQueue();
    var newQueue = [];

    for (var i = 0; i < queue.length; i++) {
      if (queue[i].articleTitle !== articleTitle) {
        newQueue.push(queue[i]);
      }
    }

    saveUploadQueue(newQueue);
    Logger.log('Removed from queue: ' + articleTitle);

    // Update positions for remaining items
    updateQueuePositions();

  } catch (e) {
    Logger.log('Error removing from queue: ' + e.message);
  } finally {
    scriptLock.releaseLock();
  }
}

/**
 * Update queue position display for all queued articles
 */
function updateQueuePositions() {
  var queue = getUploadQueue();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);

  for (var i = 0; i < queue.length; i++) {
    var item = queue[i];
    var position = i + 1;
    var statusMsg = '#' + position + ' in queue';

    try {
      sheet.getRange(item.row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(statusMsg);
    } catch (e) {
      Logger.log('Error updating position for ' + item.articleTitle + ': ' + e.message);
    }
  }

  if (queue.length > 0) {
    SpreadsheetApp.flush();
  }
}

/**
 * Process the upload queue - called by time-based trigger
 * Processes up to 2 articles per execution to stay within time limits
 */
function processUploadQueue() {
  Logger.log('=== Processing Upload Queue ===');

  var queue = getUploadQueue();

  if (queue.length === 0) {
    Logger.log('Queue is empty, nothing to process');
    return;
  }

  Logger.log('Queue has ' + queue.length + ' items');

  // Process up to 2 articles per run (to stay within 6-minute limit)
  var itemsToProcess = Math.min(2, queue.length);

  for (var i = 0; i < itemsToProcess; i++) {
    var item = queue[0]; // Always process first item

    Logger.log('Processing queue item: ' + item.articleTitle + ' (row ' + item.row + ')');

    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(item.sheetName);

      // Update status to show processing
      sheet.getRange(item.row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Uploading...');
      SpreadsheetApp.flush();

      // Create mock event object for uploadToWordPress
      var mockEvent = {
        range: sheet.getRange(item.row, 12),
        value: 'Proceed with WP Upload'
      };

      // Execute the upload
      uploadToWordPress(mockEvent);

      Logger.log('Completed processing: ' + item.articleTitle);

    } catch (error) {
      var errorMsg = error && error.message ? error.message : 'Unknown error';
      Logger.log('Error processing queue item: ' + errorMsg);

      // Update status to show error
      try {
        var sheet = ss.getSheetByName(item.sheetName);
        sheet.getRange(item.row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Queue Error: ' + errorMsg);
      } catch (e) {
        Logger.log('Could not update error status: ' + e.message);
      }
    }

    // Remove from queue
    removeFromQueue(item.articleTitle);
  }

  Logger.log('=== Queue Processing Complete ===');
}

/**
 * Enqueue a WordPress upload instead of executing immediately
 * Called from onEdit trigger - returns instantly
 * @param {Object} e - Edit event object
 */
function enqueueWordPressUpload(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();

  // Get article title
  var articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();

  if (!articleTitle || articleTitle.toString().trim() === '') {
    Logger.log('No article title found at row ' + row);
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('No Article Title');
    return;
  }

  Logger.log('Enqueueing upload for: ' + articleTitle);

  // Add to queue
  var position = addToUploadQueue(articleTitle, row);

  if (position === -1) {
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Queue Error');
    return;
  }

  // Update status to show queue position
  var statusMsg = '#' + position + ' in queue';
  sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(statusMsg);

  Logger.log('✓ Enqueued successfully at position ' + position);
}


function getRandomAuthor() {
  var LEO_HEIT = CONFIG.WORDPRESS.USERS.LEO_HEIT.name;
  var JOHN_GHOST = CONFIG.WORDPRESS.USERS.JOHN_GHOST.name;

  // Pick random author name
  var selectedAuthor = Math.random() < 0.5 ? LEO_HEIT : JOHN_GHOST;

  // Get cached ID
  var authorId = getCachedAuthorId(selectedAuthor);

  // Fallback to hardcoded IDs if cache fails
  if (!authorId) {
    Logger.log('⚠️ Author cache failed, using fallback IDs');
    var LEO_HEIT_ID = CONFIG.WORDPRESS.USERS.LEO_HEIT.id;
    var JOHN_GHOST_ID = CONFIG.WORDPRESS.USERS.JOHN_GHOST.id;
    return Math.random() < 0.5 ? LEO_HEIT_ID : JOHN_GHOST_ID;
  }
  
  return authorId;
}



function getSlidesFromUploader(sheet, headerRow) {
 var slides = [];
 var currentRow = headerRow + 1;
 var lastRow = sheet.getLastRow();

 while (currentRow <= lastRow) {
   var firstCell = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
   if (firstCell.isPartOfMerge()) break;

   var slideNumber = sheet.getRange(currentRow, CONFIG.COLUMNS.SLIDE_NUMBER).getValue();
   var subheading = sheet.getRange(currentRow, CONFIG.COLUMNS.SUBHEADING).getValue();
   var content = sheet.getRange(currentRow, CONFIG.COLUMNS.SLIDE_CONTENT).getValue();
   var imageFileName = sheet.getRange(currentRow, CONFIG.COLUMNS.IMAGE_FILE_NAME_STATUS).getValue();
   var copyright = sheet.getRange(currentRow, CONFIG.COLUMNS.COPYRIGHT_SOURCE).getValue();
   var licenseId = sheet.getRange(currentRow, CONFIG.COLUMNS.LICENSE_ID).getValue();
   var licensorName = sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_CONTRIBUTOR).getValue();
   var altText = sheet.getRange(currentRow, CONFIG.COLUMNS.PHOTO_DESCRIPTION).getValue();
   var readMoreData = sheet.getRange(currentRow, CONFIG.COLUMNS.READ_MORE_DATA_MEDIA_ID).getValue(); // NEW: Get Column C data

   if (slideNumber && (subheading || content || imageFileName)) {
     slides.push({
       slideNumber: slideNumber,
       subheading: subheading || '',
       content: content || '',
       imageFileName: imageFileName || '',
       altText: altText || '',
       licenseId: licenseId || '',
       licensorName: licensorName || '',
       copyright: copyright || '',
       readMoreData: readMoreData || '' // NEW: Add read more data
     });
   }

   currentRow++;
 }

 return slides;
}







/**
 * Upload images to WordPress and write IDs to sheet (IMPROVED - NO DUPLICATES)
 * @param {Array} slides - Array of slide objects
 * @param {Folder} folder - Google Drive folder containing images
 * @param {Sheet} sheet - The sheet to write IDs back to
 * @param {number} currentRow - The current article row number
 */
function uploadImagesToWordPress(slides, folder, sheet, currentRow) {
  var username = CONFIG.WORDPRESS.USERNAME;
  var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
  var mediaEndpoint = CONFIG.ENDPOINTS.WP_MEDIA;

  // Get all files from folder
  var files = {};
  var fileIterator = folder.getFiles();
  while (fileIterator.hasNext()) {
    var file = fileIterator.next();
    files[file.getName()] = file;
  }
  
  // Track upload statistics
  var totalUploads = 0;
  var successfulUploads = 0;
  var failedUploads = 0;
  
  for (var i = 0; i < slides.length; i++) {
    var slide = slides[i];
    
    if (slide.imageFileName && files[slide.imageFileName]) {
      totalUploads++;
      
      try {
        var file = files[slide.imageFileName];
        var blob = file.getBlob();
        
        // Ensure the blob has a proper name and content type
        blob.setName(slide.imageFileName);
        
        // Determine content type if not already set
        if (!blob.getContentType() || blob.getContentType() === CONFIG.FILE_TYPES.APPLICATION_OCTET_STREAM) {
          var extension = slide.imageFileName.split('.').pop().toLowerCase();
          var contentType = 'image/jpeg'; // default
          
          if (extension === CONFIG.FILE_TYPES.PNG) {
            contentType = 'image/png';
          } else if (extension === CONFIG.FILE_TYPES.GIF) {
            contentType = 'image/gif';
          } else if (extension === CONFIG.FILE_TYPES.WEBP) {
            contentType = 'image/webp';
          }
          
          blob.setContentType(contentType);
        }
        
        Logger.log('[' + (i + 1) + '/' + slides.length + '] Uploading: ' + slide.imageFileName);
        
        // Retry logic with 3 attempts
        var uploadSuccess = false;
        var maxRetries = 3;
        var mediaData = null;
        
        for (var attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            var options = {
              method: "post",
              muteHttpExceptions: true,
              headers: {
                "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword),
                "Content-Disposition": 'attachment; filename="' + encodeURIComponent(slide.imageFileName) + '"',
                "Content-Type": blob.getContentType()
              },
              payload: blob.getBytes()
            };
            
            var response = UrlFetchApp.fetch(mediaEndpoint, options);
            var responseCode = response.getResponseCode();
            var responseText = response.getContentText();

            // Accept both 200 (OK) and 201 (Created) as success
            if (responseCode === 200 || responseCode === 201) {
              try {
                mediaData = JSON.parse(responseText);

                // Verify we got a valid media ID
                if (mediaData && mediaData.id) {
                  slide.imageId = mediaData.id;
                  uploadSuccess = true;
                  successfulUploads++;

                  // CRITICAL: Write WordPress image ID to Column C in the sheet
                  var slideRowInSheet = currentRow + 1 + i; // +1 for header offset
                  sheet.getRange(slideRowInSheet, CONFIG.COLUMNS.READ_MORE_DATA_MEDIA_ID).setValue(mediaData.id); // Column C
                  SpreadsheetApp.flush(); // Force immediate write

                  Logger.log('  ✓ Uploaded successfully (ID: ' + mediaData.id + ', HTTP ' + responseCode + ')');
                  Logger.log('  ✓ Written ID to sheet row ' + slideRowInSheet + ', column C');

                  break; // Success, exit retry loop
                } else {
                  Logger.log('  ✗ Response missing media ID (HTTP ' + responseCode + '): ' + responseText.substring(0, 200));
                }
              } catch (parseError) {
                Logger.log('  ✗ Failed to parse response (HTTP ' + responseCode + '): ' + parseError.message);
                Logger.log('  Response: ' + responseText.substring(0, 200));
              }
            }

            // If we reach here, it's a failure
            if (!uploadSuccess) {
              Logger.log('  ✗ Upload failed (attempt ' + attempt + '/' + maxRetries + '): HTTP ' + responseCode);
              
              // If it's the first image and it's failing, this is critical
              if (i === 0) {
                Logger.log('  ⚠️  CRITICAL: Featured image (first slide) failed to upload');
              }
              
              // Wait before retry (exponential backoff)
              if (attempt < maxRetries) {
                var waitTime = attempt * 2000; // 2s, 4s, 6s
                Logger.log('  ⏱️  Waiting ' + (waitTime/1000) + ' seconds before retry...');
                Utilities.sleep(waitTime);
              }
            }
            
          } catch (fetchError) {
            Logger.log('  ✗ Exception on attempt ' + attempt + ': ' + fetchError.message);
            
            if (attempt < maxRetries) {
              var waitTime = attempt * 2000;
              Logger.log('  ⏱️  Waiting ' + (waitTime/1000) + ' seconds before retry...');
              Utilities.sleep(waitTime);
            }
          }
        }
        
        // After all retries, check if upload succeeded
        if (!uploadSuccess) {
          failedUploads++;
          Logger.log('  ✗ Failed after ' + maxRetries + ' attempts: ' + slide.imageFileName);
          
          // If first image (featured image) fails, abort entire upload
          if (i === 0) {
            Logger.log('❌ ABORTING: Featured image failed to upload after ' + maxRetries + ' attempts');
            return null;
          }
          
          // For other slides, mark as failed but continue
          slide.imageId = 0;
          
          // Write 0 to sheet to indicate failure
          var slideRowInSheet = currentRow + 1 + i;
          sheet.getRange(slideRowInSheet, CONFIG.COLUMNS.READ_MORE_DATA_MEDIA_ID).setValue(0);
          SpreadsheetApp.flush();
        }
        
        // Delay between uploads to avoid rate limits
        if (i < slides.length - 1) {
          Logger.log('  ⏱️  Waiting 2 seconds before next upload...');
          Utilities.sleep(2000);
        }
        
      } catch (error) {
        Logger.log('  ✗ Unexpected error for ' + slide.imageFileName + ': ' + error.message);
        Logger.log('  Stack: ' + error.stack);
        failedUploads++;
        
        // If first image fails, abort
        if (i === 0) {
          Logger.log('❌ ABORTING: Featured image encountered critical error');
          return null;
        }
        
        slide.imageId = 0;
        
        // Write 0 to sheet
        var slideRowInSheet = currentRow + 1 + i;
        sheet.getRange(slideRowInSheet, CONFIG.COLUMNS.READ_MORE_DATA_MEDIA_ID).setValue(0);
        SpreadsheetApp.flush();
      }
      
    } else {
      Logger.log('⚠️  File not found in folder: ' + slide.imageFileName);
      slide.imageId = 0;
      
      // Write 0 to sheet
      var slideRowInSheet = currentRow + 1 + i;
      sheet.getRange(slideRowInSheet, CONFIG.COLUMNS.READ_MORE_DATA_MEDIA_ID).setValue(0);
      SpreadsheetApp.flush();
    }
  }
  
  // Summary
  Logger.log('\n📊 Upload Summary:');
  Logger.log('  Total: ' + totalUploads);
  Logger.log('  Successful: ' + successfulUploads);
  Logger.log('  Failed: ' + failedUploads);
  Logger.log('  ✓ All WordPress image IDs written to Column C');
  
  // If too many failures, warn but continue
  if (failedUploads > 0) {
    Logger.log('⚠️  Warning: ' + failedUploads + ' image(s) failed to upload');
  }
  
  return slides;
}








function getCategoryIdByName(name) {
 if (!name) return null;
 var username = CONFIG.WORDPRESS.USERNAME;
 var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
 var categoriesEndpoint = CONFIG.ENDPOINTS.WP_CATEGORIES + "?search=" + encodeURIComponent(name);








 var options = {
   method: "get",
   headers: {
     "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
   },
   muteHttpExceptions: true
 };








 var response = UrlFetchApp.fetch(categoriesEndpoint, options);
 if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
   var data = JSON.parse(response.getContentText());
   for (var i = 0; i < data.length; i++) {
     if (data[i].name.toLowerCase() === name.toLowerCase()) {
       return data[i].id;
     }
   }
 }
 
 return null;
}








function getFeedTypeIdByName(name) {
 var username = CONFIG.WORDPRESS.USERNAME;
 var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
 var feedTypeEndpoint = CONFIG.ENDPOINTS.WP_FEED_TYPE + "?search=" + encodeURIComponent(name);








 var options = {
   method: "get",
   headers: {
     "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
   },
   muteHttpExceptions: true
 };








 var response = UrlFetchApp.fetch(feedTypeEndpoint, options);
 if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
   var data = JSON.parse(response.getContentText());
   for (var i = 0; i < data.length; i++) {
     if (data[i].name.toLowerCase() === name.toLowerCase()) {
       return data[i].id;
     }
   }
 }
 
 return null;
}






function createSlideshowContent(slides, relatedArticles) {
  return slides.map(function (slide, index) {
    var slideContent = slide.content || '';
    var isLastSlide = (index === slides.length - 1);
    
    // REMOVED: All manual "Read more from this brand" processing
    // No more checking for inline read-more content or Column C data
    
    // IMPORTANT: Remove any existing AI disclaimer from the content
    if (slideContent.includes('This article was created with AI assistance')) {
      var aiParts = slideContent.split('This article was created with AI assistance');
      slideContent = aiParts[0].trim(); // Only keep content before AI disclaimer
    }
    
    // Clean all text: decode HTML entities so no &quot; etc. appear on the page
    var cleanSubheading = cleanForDisplay(slide.subheading || '');
    var cleanContent = cleanForDisplay(slideContent);
    var cleanAltText = cleanForDisplay(slide.altText || '');
    var cleanCopyright = cleanForDisplay(slide.copyright || '');
    var cleanLicenseId = cleanForDisplay(slide.licenseId || '');
    var cleanLicensorName = cleanForDisplay(slide.licensorName || '');

    // Format the clean content with intelligent line breaks
    var formattedContent = formatContentWithLineBreaks(cleanContent);

    // Build the slide HTML
    // JSON.stringify handles escaping for block attributes
    // escapeQuotes only used for HTML attributes (inside "...")
    // Display text (h3, p) uses clean decoded text — no escaping needed
    var slideHtml = `<!-- wp:clmsn/slideshow-item ${JSON.stringify({
      slideTitle: cleanSubheading,
      slideImageId: slide.imageId || 0,
      slideAltText: cleanAltText,
      slideImageCredit: cleanCopyright,
      licenseId: cleanLicenseId,
      licensorName: cleanLicensorName
    })} -->
    <div class="wp-block-clmsn-slideshow-item slideshow-item" data-image-id="${slide.imageId || 0}" data-alt-text="${escapeQuotes(cleanAltText)}">
      <h3>${cleanSubheading}</h3>
      <!-- wp:paragraph {"placeholder":"Enter slide content here..."} -->
      <p>${formattedContent}</p>
      <!-- /wp:paragraph -->`;

    // Add AI disclaimer as completely separate paragraph block for last slide
    if (isLastSlide) {
      slideHtml += `
      <!-- wp:paragraph -->
      <p><em>This article was created with AI assistance and human editing.</em></p>
      <!-- /wp:paragraph -->`;
    }
    
    // NEW: Add dynamic related articles section to last slide
    if (isLastSlide && relatedArticles && relatedArticles.length > 0) {
      slideHtml += `
      <!-- wp:paragraph -->
      <p><strong>Read more from this brand:</strong></p>
      <!-- /wp:paragraph -->
      <!-- wp:list -->
      <ul>`;
      
      // Generate list items from WordPress API results
      for (var i = 0; i < relatedArticles.length; i++) {
        var article = relatedArticles[i];
        var title = cleanHtmlEntities(article.title.rendered || article.title);
        var url = article.link;
        
        slideHtml += `
        <!-- wp:list-item -->
        <li><a href="${escapeQuotes(url)}">${escapeQuotes(title)}</a></li>
        <!-- /wp:list-item -->`;
      }
      
      slideHtml += `
      </ul>
      <!-- /wp:list -->`;
    }
    
    // Close the slide div
    slideHtml += `
    </div>
    <!-- /wp:clmsn/slideshow-item -->`;
    
    return slideHtml;
  }).join("\n");
}



function queryRelatedArticles(endpoint, categoryId, tagIds, username, applicationPassword, sameStateOnly) {
  var queryParams = [
    'per_page=50', // Get more to have better selection
    'status=publish',
    'after=2025-01-01T00:00:00' // UPDATED: Only 2025 articles
  ];
  
  if (sameStateOnly && categoryId) {
    queryParams.push('categories=' + categoryId);
  }
  
  if (tagIds.length > 0) {
    queryParams.push('tags=' + tagIds.join(','));
  }
  
  var queryUrl = endpoint + '?' + queryParams.join('&');
  
  var options = {
    method: "get",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
    },
    muteHttpExceptions: true
  };
  
  try {
    Logger.log('Querying 2025 related articles: ' + queryUrl);
    var response = UrlFetchApp.fetch(queryUrl, options);
    
    if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
      var articles = JSON.parse(response.getContentText());
      Logger.log('Found ' + articles.length + ' potential 2025 related articles');
      return articles;
    } else {
      Logger.log('Error querying related articles: ' + response.getContentText());
      return [];
    }
  } catch (error) {
    Logger.log('Exception querying related articles: ' + error.message);
    return [];
  }
}




function findRelatedArticles(currentTags, currentCategoryId, username, applicationPassword) {
  var postsEndpoint = CONFIG.ENDPOINTS.WP_POSTS;
  
  // Convert current tags to WordPress tag IDs for querying
  var tagIds = convertTagsToWordPressIds(currentTags, username, applicationPassword);
  
  var relatedArticles = [];
  
  if (tagIds.length > 0) {
    // First try: Same state category + overlapping tags + 2025+
    relatedArticles = queryRelatedArticles(postsEndpoint, currentCategoryId, tagIds, username, applicationPassword, true);
    
    // If we don't have 3 articles, expand search to all categories
    if (relatedArticles.length < 3) {
      Logger.log('Only found ' + relatedArticles.length + ' articles in same state, expanding search...');
      var additionalArticles = queryRelatedArticles(postsEndpoint, null, tagIds, username, applicationPassword, false);
      
      // Merge and deduplicate
      var allArticles = relatedArticles.concat(additionalArticles);
      var uniqueArticles = [];
      var seenIds = {};
      
      for (var i = 0; i < allArticles.length; i++) {
        if (!seenIds[allArticles[i].id]) {
          seenIds[allArticles[i].id] = true;
          uniqueArticles.push(allArticles[i]);
        }
      }
      relatedArticles = uniqueArticles;
    }
    
    // Sort by tag overlap score and mix old/new
    relatedArticles = scoreAndSortArticles(relatedArticles, tagIds);
  }
  
  // NEW: Final fallback - if still less than 3, get any random 2025 articles
  if (relatedArticles.length < 3) {
    Logger.log('Still only found ' + relatedArticles.length + ' articles with tag matching, getting random 2025 articles...');
    var randomArticles = getRandomArticles2025(postsEndpoint, username, applicationPassword, 3 - relatedArticles.length);
    
    // Add random articles to fill the gap
    for (var i = 0; i < randomArticles.length; i++) {
      var alreadyExists = false;
      for (var j = 0; j < relatedArticles.length; j++) {
        if (relatedArticles[j].id === randomArticles[i].id) {
          alreadyExists = true;
          break;
        }
      }
      if (!alreadyExists) {
        relatedArticles.push(randomArticles[i]);
      }
    }
  }
  
  // Return top 3
  return relatedArticles.slice(0, 3);
}


function getRandomArticles2025(endpoint, username, applicationPassword, count) {
  var queryParams = [
    'per_page=50', // Get a good selection for randomness
    'status=publish',
    'after=2025-01-01T00:00:00' // Only 2025 articles
  ];
  
  var queryUrl = endpoint + '?' + queryParams.join('&');
  
  var options = {
    method: "get",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
    },
    muteHttpExceptions: true
  };
  
  try {
    Logger.log('Getting random 2025 articles: ' + queryUrl);
    var response = UrlFetchApp.fetch(queryUrl, options);
    
    if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
      var articles = JSON.parse(response.getContentText());
      Logger.log('Found ' + articles.length + ' total 2025 articles for random selection');
      
      // Shuffle and return requested count
      for (var i = articles.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = articles[i];
        articles[i] = articles[j];
        articles[j] = temp;
      }
      
      return articles.slice(0, count);
    } else {
      Logger.log('Error getting random articles: ' + response.getContentText());
      return [];
    }
  } catch (error) {
    Logger.log('Exception getting random articles: ' + error.message);
    return [];
  }
}


function queryRelatedArticles(endpoint, categoryId, tagIds, username, applicationPassword, sameStateOnly) {
  var queryParams = [
    'per_page=50', // Get more to have better selection
    'status=publish',
    'after=2025-01-01T00:00:00' // Only 2025 articles
  ];
  
  if (sameStateOnly && categoryId) {
    queryParams.push('categories=' + categoryId);
  }
  
  if (tagIds.length > 0) {
    queryParams.push('tags=' + tagIds.join(','));
  }
  
  var queryUrl = endpoint + '?' + queryParams.join('&');
  
  var options = {
    method: "get",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
    },
    muteHttpExceptions: true
  };
  
  try {
    Logger.log('Querying 2025 related articles: ' + queryUrl);
    var response = UrlFetchApp.fetch(queryUrl, options);
    
    if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
      var articles = JSON.parse(response.getContentText());
      Logger.log('Found ' + articles.length + ' potential 2025 related articles');
      return articles;
    } else {
      Logger.log('Error querying related articles: ' + response.getContentText());
      return [];
    }
  } catch (error) {
    Logger.log('Exception querying related articles: ' + error.message);
    return [];
  }
}

function scoreAndSortArticles(articles, currentTagIds) {
  // Add tag overlap score to each article
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var overlapScore = 0;
    
    if (article.tags && article.tags.length > 0) {
      for (var j = 0; j < article.tags.length; j++) {
        if (currentTagIds.indexOf(article.tags[j]) !== -1) {
          overlapScore++;
        }
      }
    }
    
    article.overlapScore = overlapScore;
    article.publishYear = new Date(article.date).getFullYear();
  }
  
  // Sort by overlap score (descending), then by date variety
  articles.sort(function(a, b) {
    if (a.overlapScore !== b.overlapScore) {
      return b.overlapScore - a.overlapScore; // Higher overlap first
    }
    // For same overlap score, mix years
    return Math.random() - 0.5; // Random for variety
  });
  
  // Ensure we have a good mix of years if possible
  var selected = [];
  var years = {};
  
  for (var k = 0; k < articles.length && selected.length < 3; k++) {
    var article = articles[k];
    var year = article.publishYear;
    
    // Try to avoid too many from same year
    if (!years[year] || Object.keys(years).length < 2) {
      selected.push(article);
      years[year] = (years[year] || 0) + 1;
    }
  }
  
  // If we still don't have 3, fill with remaining articles
  for (var l = 0; l < articles.length && selected.length < 3; l++) {
    var found = false;
    for (var m = 0; m < selected.length; m++) {
      if (selected[m].id === articles[l].id) {
        found = true;
        break;
      }
    }
    if (!found) {
      selected.push(articles[l]);
    }
  }
  
  return selected;
}






function formatContentWithLineBreaks(content) {
  if (!content || typeof content !== 'string') return content;
  
  // Split content into sentences
  var sentences = content.match(/[^.!?]+[.!?]+/g);
  
  if (!sentences || sentences.length <= 1) return content;
  
  // Clean up sentences
  sentences = sentences.map(function(sentence) {
    return sentence.trim();
  });
  
  var paragraphs = [];
  var i = 0;
  
  while (i < sentences.length) {
    var currentSentence = sentences[i];
    var currentLength = currentSentence.length;
    
    // RULE 1: Very long sentences (200+ chars) always stand alone
    if (currentLength > 200) {
      paragraphs.push(currentSentence);
      i++;
    }
    // RULE 2: Long sentences (140+ chars) usually stand alone, unless next is very short
    else if (currentLength > 140) {
      if (i + 1 < sentences.length && sentences[i + 1].length < 60) {
        // Pair long sentence with very short next sentence
        paragraphs.push(currentSentence + ' ' + sentences[i + 1]);
        i += 2;
      } else {
        // Long sentence stands alone
        paragraphs.push(currentSentence);
        i++;
      }
    }
    // RULE 3: Medium sentences (80-140 chars) - try to pair smartly
    else if (currentLength > 80) {
      if (i + 1 < sentences.length) {
        var nextSentence = sentences[i + 1];
        var nextLength = nextSentence.length;
        
        // Pair if next sentence is also medium or short, and combined isn't too long
        if (nextLength < 120 && (currentLength + nextLength) < 220) {
          paragraphs.push(currentSentence + ' ' + nextSentence);
          i += 2;
        } else {
          // Don't pair - stands alone
          paragraphs.push(currentSentence);
          i++;
        }
      } else {
        // Last sentence
        paragraphs.push(currentSentence);
        i++;
      }
    }
    // RULE 4: Short sentences (under 80 chars) - try to group with others
    else {
      if (i + 1 < sentences.length) {
        var nextSentence = sentences[i + 1];
        var nextLength = nextSentence.length;
        var combinedLength = currentLength + nextLength + 1; // +1 for space
        
        // If both are short and combined is reasonable, pair them
        if (nextLength < 100 && combinedLength < 180) {
          paragraphs.push(currentSentence + ' ' + nextSentence);
          i += 2;
        }
        // If current is very short (under 50), try to add it to a group of three
        else if (currentLength < 50 && i + 2 < sentences.length) {
          var thirdSentence = sentences[i + 2];
          var tripleLength = currentLength + nextLength + thirdSentence.length + 2; // +2 for spaces
          
          if (thirdSentence.length < 80 && tripleLength < 220) {
            paragraphs.push(currentSentence + ' ' + nextSentence + ' ' + thirdSentence);
            i += 3;
          } else {
            // Just pair the first two
            paragraphs.push(currentSentence + ' ' + nextSentence);
            i += 2;
          }
        }
        else {
          // Can't pair well, stands alone
          paragraphs.push(currentSentence);
          i++;
        }
      } else {
        // Last sentence
        paragraphs.push(currentSentence);
        i++;
      }
    }
  }
  
  // Join paragraphs with HTML line breaks
  return paragraphs.join('<br><br>');
}








///ESCAPE QUOTES


function escapeQuotes(str) {
  if (typeof str !== 'string') {
    str = String(str || ''); // Convert to string or use an empty string if undefined/null
  }
  return str.replace(/"/g, '&quot;');
}


/**
 * Decode HTML entities for display text (inside tags like <h3>, <p>).
 * Does NOT strip HTML tags — only decodes encoded characters.
 */
function cleanForDisplay(text) {
  if (!text) return '';
  if (typeof text !== 'string') text = String(text);
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#8230;/g, "\u2026")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}


/**
 * Call Claude API to correct punctuation in article title and slide subheadings.
 * Conservative — only fixes punctuation/capitalization, never changes wording.
 * Handles abbreviations (U.S., Rep., Gov., Dr., Mt., St., etc.) properly.
 * @param {string} title - Article title
 * @param {Array} slides - Array of slide objects with .subheading property
 * @param {string} apiKey - Anthropic API key
 * @returns {Object} {title: string|null, subheadings: string[]|null}
 */
function correctPunctuationWithClaude(title, slides, apiKey) {
  var subheadings = [];
  for (var i = 0; i < slides.length; i++) {
    subheadings.push(cleanForDisplay(slides[i].subheading || ''));
  }

  var prompt = 'Fix ONLY punctuation and capitalization in the article title and subheadings below. ' +
    'Do NOT change any wording, meaning, or content.\n\n' +
    'RULES:\n' +
    '- Periods in abbreviations are NOT sentence endings: U.S., Rep., Gov., Dr., Mr., Mrs., ' +
    'St., Mt., Jr., Sr., Inc., Corp., Ltd., Ave., Blvd., Dept., Gen., Sgt., Lt., Col., etc.\n' +
    '- Use proper Title Case for the article title\n' +
    '- Use proper capitalization for subheadings (sentence case or title case, match the original style)\n' +
    '- Fix missing or incorrect punctuation marks\n' +
    '- Decode any HTML entities (&amp; &quot; &#8217; etc.) to their actual characters\n' +
    '- If a title or subheading is already correct, return it unchanged\n' +
    '- Return ONLY valid JSON, no explanation\n\n' +
    'Title: ' + cleanForDisplay(title) + '\n\n' +
    'Subheadings:\n';

  for (var j = 0; j < subheadings.length; j++) {
    prompt += (j + 1) + '. ' + subheadings[j] + '\n';
  }

  prompt += '\nReturn as JSON: {"title": "corrected title", "subheadings": ["sub 1", "sub 2", ...]}';

  try {
    var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      payload: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      }),
      muteHttpExceptions: true
    });

    var responseCode = response.getResponseCode();
    if (responseCode !== 200) {
      Logger.log('Punctuation API error (' + responseCode + '): ' + response.getContentText());
      return { title: null, subheadings: null };
    }

    var result = JSON.parse(response.getContentText());
    if (result.content && result.content[0]) {
      var text = result.content[0].text.trim();
      var jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        var parsed = JSON.parse(jsonMatch[0]);
        return {
          title: parsed.title || null,
          subheadings: parsed.subheadings || null
        };
      }
    }
    Logger.log('Punctuation API: unexpected response format');
    return { title: null, subheadings: null };
  } catch (e) {
    Logger.log('Punctuation correction error: ' + e.message);
    return { title: null, subheadings: null };
  }
}



function notifyOnError(error) {
  // Handle undefined or null error objects
  var errorMessage = 'Unknown error';
  if (error) {
    errorMessage = error.message || error.toString() || 'Unknown error';
  }

  Logger.log('ERROR: ' + errorMessage);

  // Try to send email notification (may fail if permissions not granted)
  try {
    MailApp.sendEmail({
      to: CONFIG.EMAIL.WORKFLOW,
      subject: "Script Error in Uploader Sheet",
      body: "Error: " + errorMessage
    });
  } catch (emailError) {
    Logger.log('Failed to send error notification email: ' + emailError.message);
    // Continue execution - email failure shouldn't crash the script
  }
}









// DATE PICKER




function createDatePicker() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  var range = sheet.getRange("H2:H");
  range.setNumberFormat("MMM dd, yyyy - HH:mm");
}
















function downloadShutterstockImage(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
 
  Logger.log('Starting download process for row: ' + row);
 
  const folderUrl = sheet.getRange(row, CONFIG.COLUMNS.FOLDER_URL).getValue();
  Logger.log('Folder URL: ' + folderUrl);
 
  if (!folderUrl) {
    sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: No folder URL found');
    return;
  }


  let currentRow = row + 1;
  let nextCell = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
 
  while (!nextCell.isPartOfMerge() && currentRow <= sheet.getLastRow()) {
    const imageId = sheet.getRange(currentRow, CONFIG.COLUMNS.URL_DOC_LINK).getValue();
    Logger.log('Processing row ' + currentRow + ' with ID: ' + imageId);
   
    if (imageId) {
      const filename = sheet.getRange(currentRow, CONFIG.COLUMNS.IMAGE_FILE_NAME_STATUS).getValue();
      Logger.log('Filename for row ' + currentRow + ': ' + filename);
     
      if (filename) {
        try {
          Logger.log('Attempting to license image ' + imageId);
         
          const apiToken = CONFIG.API.SHUTTERSTOCK_TOKEN_ALT;
         
          const licenseEndpoint = CONFIG.ENDPOINTS.SHUTTERSTOCK_LICENSES;
          const licensePayload = {
            "images": [
              {
                "image_id": imageId.toString()
              }
            ]
          };
         
          const licenseOptions = {
            'method': 'post',
            'headers': {
              'Authorization': 'Bearer ' + apiToken,
              'Content-Type': 'application/json'
            },
            'payload': JSON.stringify(licensePayload),
            'muteHttpExceptions': true
          };


          const licenseResponse = UrlFetchApp.fetch(licenseEndpoint, licenseOptions);
          const licenseData = JSON.parse(licenseResponse.getContentText());
          Logger.log('License response: ' + JSON.stringify(licenseData));
         
          if (licenseData.data && licenseData.data[0] && licenseData.data[0].download && licenseData.data[0].download.url) {
            const downloadUrl = licenseData.data[0].download.url;
            Logger.log('Got download URL: ' + downloadUrl);
           
            const imageResponse = UrlFetchApp.fetch(downloadUrl, {
              'method': 'get',
              'headers': {
                'Authorization': 'Bearer ' + apiToken
              },
              'muteHttpExceptions': true
            });
           
            const imageBlob = imageResponse.getBlob();
            const folderId = folderUrl.split('folders/')[1];
            const folder = DriveApp.getFolderById(folderId);
            folder.createFile(imageBlob.setName(filename));
            Logger.log('Successfully saved image: ' + filename);
          } else {
            Logger.log('Failed to get download URL from license response');
            sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: Failed to get download URL');
            return;
          }
        } catch (error) {
          Logger.log('Error processing row ' + currentRow + ': ' + error.message);
          sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('Error: ' + error.message);
          return;
        }
      }
    }
    currentRow++;
    nextCell = sheet.getRange(currentRow, CONFIG.COLUMNS.ARTICLE_TITLE);
  }
 
  sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue('_');
}






// =============================================================================
// WORDPRESS STATUS MONITOR FOR "WP Editing Tracker" SHEET
// =============================================================================

// =============================================================================
// WORDPRESS STATUS MONITOR FOR "WP Editing Tracker" SHEET
// =============================================================================

function transferToAleksReview(e) {
  if (!e.value || e.value !== CONFIG.TRIGGERS.FOR_ALEKS_REVIEW) return;

  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var targetSheet = e.source.getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
  
  // Get the values from Article Status Tracker with UPDATED mappings
  var columnBValue = sheet.getRange(row, 2).getValue(); // Column B
  var title = sheet.getRange(row, 3).getValue();        // Column C
  var wpUrl = sheet.getRange(row, 5).getValue();        // Column E
  var columnKValue = sheet.getRange(row, 11).getValue(); // Column K
  
  // Get the last row with any data in the sheet
  var lastRow = targetSheet.getLastRow();
  var targetRow = lastRow + 1; // Start checking from the row after the last row with data
  
  // If there's data in the sheet, find the first empty row after the last row
  if (lastRow > 0) {
    // Check if the current last row + 1 has empty C and D
    var cValue = targetSheet.getRange(targetRow, 3).getValue();
    var dValue = targetSheet.getRange(targetRow, 4).getValue();
    
    // If C or D has data in the row after lastRow, keep checking further
    while (cValue || dValue) {
      targetRow++;
      cValue = targetSheet.getRange(targetRow, 3).getValue();
      dValue = targetSheet.getRange(targetRow, 4).getValue();
    }
  }
  
  // Set values in WP Editing Tracker with UPDATED mappings:
  // Article Status Tracker → WP Editing Tracker
  // B → A
  // C → C
  // E → D
  // K → I
  
  targetSheet.getRange(targetRow, 1).setValue(columnBValue);  // B → A
  targetSheet.getRange(targetRow, 3).setValue(title);         // C → C
  targetSheet.getRange(targetRow, 4).setValue(wpUrl);         // E → D
  targetSheet.getRange(targetRow, 9).setValue(columnKValue);  // K → I
  targetSheet.getRange(targetRow, 8).setValue("WordPress Draft"); // Status in Column H

  // Mark as DONE in Article Status Tracker
  sheet.getRange(row, 7).setValue(CONFIG.STATUS.DONE);
}



// WORDPRESS STATUS for recording published articles
//=============================================================================





function extractPostIdFromUrl(url) {
  try {
    // Handle different WordPress URL formats
    // Format 1: .../wp-admin/post.php?post=123&action=edit
    var postMatch = url.match(/[?&]post=(\d+)/);
    if (postMatch) return postMatch[1];
    
    // Format 2: Preview URLs like ?p=123 or &p=123
    var previewMatch = url.match(/[?&]p=(\d+)/);
    if (previewMatch) return previewMatch[1];
    
    // Format 3: Direct post URLs ending with /123/
    var idMatch = url.match(/\/(\d+)\/?$/);
    if (idMatch) return idMatch[1];
    
    // Format 4: Admin URLs with revision like post.php?post=123&action=edit&revision=456
    var revisionMatch = url.match(/post\.php\?post=(\d+)/);
    if (revisionMatch) return revisionMatch[1];
    
    Logger.log(`Could not extract post ID from URL: ${url}`);
    return null;
  } catch (error) {
    Logger.log('Error extracting post ID: ' + error.message);
    return null;
  }
}

function getWordPressPostStatus(postId, username, password) {
  // Only request the specific fields we need - exclude content, excerpt, and other large fields
  var wpApiUrl = `${CONFIG.ENDPOINTS.WP_POSTS}/${postId}?_fields=id,status,title,slug,link,date,date_gmt,modified`;
  
  var options = {
    method: "get",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + password)
    },
    muteHttpExceptions: true
  };
  
  try {
    Logger.log(`Making API request to: ${wpApiUrl}`);
    var response = UrlFetchApp.fetch(wpApiUrl, options);
    var responseCode = response.getResponseCode();
    var responseText = response.getContentText();
    
    Logger.log(`API Response Code: ${responseCode}`);
    Logger.log(`API Response Length: ${responseText.length} characters`);
    
    if (responseCode === 200) {
      // Check if response starts with HTML (error page) instead of JSON
      var trimmedResponse = responseText.trim();
      if (trimmedResponse.startsWith('<')) {
        Logger.log(`Received HTML instead of JSON for post ${postId}`);
        return null;
      }
      
      // With limited fields, the JSON should be much smaller and easier to parse
      var postData;
      try {
        postData = JSON.parse(trimmedResponse);
        Logger.log(`Successfully parsed JSON for post ${postId}`);
      } catch (parseError) {
        Logger.log(`JSON Parse Error for post ${postId}: ${parseError.message}`);
        Logger.log(`Full response: ${trimmedResponse}`);
        return null;
      }
      
      // Extract the title - WordPress blocks store it as rendered HTML
      var title = "";
      if (postData.title && postData.title.rendered) {
        title = postData.title.rendered;
      } else if (postData.title) {
        title = postData.title;
      }
      
      // Clean up any HTML entities or tags that might be in the title
      title = title.replace(/<[^>]*>/g, '') // Remove HTML tags
                   .replace(/&quot;/g, '"')     // Replace &quot; with "
                   .replace(/&amp;/g, '&')      // Replace &amp; with &
                   .replace(/&lt;/g, '<')       // Replace &lt; with 
                   .replace(/&gt;/g, '>')       // Replace &gt; with >
                   .replace(/&#8217;/g, "'")    // Replace &#8217; with '
                   .replace(/&#8216;/g, "'")    // Replace &#8216; with '
                   .replace(/&#8220;/g, '"')    // Replace &#8220; with "
                   .replace(/&#8221;/g, '"')    // Replace &#8221; with "
                   .replace(/&#8211;/g, '–')    // Replace &#8211; with –
                   .replace(/&#8212;/g, '—')    // Replace &#8212; with —
                   .replace(/&#8230;/g, '…')    // Replace &#8230; with …
                   .replace(/&nbsp;/g, ' ')     // Replace &nbsp; with space
                   .replace(/&rsquo;/g, "'")    // Replace &rsquo; with '
                   .replace(/&lsquo;/g, "'")    // Replace &lsquo; with '
                   .replace(/&rdquo;/g, '"')    // Replace &rdquo; with "
                   .replace(/&ldquo;/g, '"')    // Replace &ldquo; with "
                   .replace(/&ndash;/g, '–')    // Replace &ndash; with –
                   .replace(/&mdash;/g, '—')    // Replace &mdash; with —
                   .replace(/&hellip;/g, '…')   // Replace &hellip; with …
                   .trim();
      
      Logger.log(`Post ${postId} - Status: ${postData.status}, Title: ${title}`);
      
      return {
        status: postData.status,
        title: title,
        slug: postData.slug,
        link: postData.link,
        publishDate: postData.date // This is the published date in ISO format
      };
    } else if (responseCode === 404) {
      Logger.log(`Post ${postId} not found (404)`);
      return null;
    } else {
      Logger.log(`WordPress API error for post ${postId}: ${responseCode} - ${responseText.substring(0, 200)}`);
      return null;
    }
  } catch (error) {
    Logger.log(`Error fetching WordPress post ${postId}: ${error.message}`);
    Logger.log(`Error stack: ${error.stack}`);
    return null;
  }
}

function formatLADateTime(isoDateString) {
  try {
    Logger.log('Raw date from WordPress: ' + isoDateString);
    
    // Parse the ISO date string from WordPress
    var date = new Date(isoDateString);
    Logger.log('Parsed Date object: ' + date.toString());
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      Logger.log('Invalid date detected, trying alternative parsing...');
      // Try alternative parsing if standard fails
      date = new Date(isoDateString.replace('T', ' ').replace('Z', ''));
      if (isNaN(date.getTime())) {
        return 'Invalid date: ' + isoDateString;
      }
    }
    
    // Get LA time components using simple approach
    var laDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
                  'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
    var month = months[laDate.getMonth()];
    var day = laDate.getDate();
    
    // Format time in 12-hour format
    var hours = laDate.getHours();
    var minutes = laDate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    var timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    
    var result = `${month} ${day} - ${timeString}`;
    Logger.log('Formatted result: ' + result);
    
    return result;
    
  } catch (error) {
    Logger.log('Error formatting LA date/time: ' + error.message);
    Logger.log('Error stack: ' + error.stack);
    Logger.log('Original ISO string: ' + isoDateString);
    return 'Date format error: ' + isoDateString;
  }
}




  

// =============================================================================
// Title formatting: Plain text, Arial 12, centered, text wrap enabled
// Skips hidden rows (but not hidden columns)
// Always overwrites existing content (including placeholder text)
// =============================================================================





function formatExistingUploaderRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.UPLOADER);
  var lastRow = sheet.getLastRow();
  
  for (var row = 1; row <= lastRow; row++) {
    var cellA = sheet.getRange(row, 1);
    
    // Skip if this is a merged title row
    if (cellA.isPartOfMerge() && cellA.getMergedRanges()[0].getRow() === row) {
      continue;
    }
    
    // This is a regular row under a merged title
    // Set text wrapping to CLIP for the entire row
    var entireRow = sheet.getRange(row, 1, 1, sheet.getLastColumn());
    entireRow.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    
    // Center align columns H, I, J
    sheet.getRange(row, 8).setHorizontalAlignment('center'); // Column H
    sheet.getRange(row, 9).setHorizontalAlignment('center'); // Column I
    sheet.getRange(row, 10).setHorizontalAlignment('center'); // Column J
  }
  
  SpreadsheetApp.flush();
  Logger.log('Formatting applied to all existing rows');
}









// AUTOMATED WORDPRESS SCHEDULING


function onWPTrackerEdit(e) {
  if (!e || !e.range || !e.value || e.oldValue === e.value) return;
  var sheet = e.range.getSheet();
  var column = e.range.getColumn();
  
  if (sheet.getName() === CONFIG.SHEETS.WP_EDITING_TRACKER && column === 8) { // Column H triggers
    if (e.value === CONFIG.TRIGGERS.SET_DATE_TIME) {
      scheduleWordPressPost(e);
    } else if (e.value === CONFIG.TRIGGERS.SCHEDULE) {
      setWordPressSchedule(e);
    } else if (e.value === CONFIG.TRIGGERS.CHECK_WP_STATUS) {
      checkWordPressStatus(e);
    } else if (e.value === CONFIG.TRIGGERS.RECORD) {
      transferToProductionTracker(e);
    } else if (e.value === CONFIG.TRIGGERS.UPDATE_TITLE_AND_INTRO) {  // ADD THIS NEW CASE
      updateTitleAndIntro(e);
    }
  }
}



function transferToProductionTracker(e) {
  if (!e.value || e.value !== CONFIG.TRIGGERS.RECORD) return;

  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var column = e.range.getColumn();

  // Only proceed if this is Column H in WP Editing Tracker
  if (sheet.getName() !== CONFIG.SHEETS.WP_EDITING_TRACKER || column !== 8) return;

  var targetSheet = e.source.getSheetByName(CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER);
  if (!targetSheet) return;
  
  // Get the URL from Column D
  var wpUrl = sheet.getRange(row, 4).getValue();
  if (!wpUrl || wpUrl.toString().trim() === '') return;
  
  // Find the last row with data in Column C specifically
  var lastRowWithDataInC = 1; // Start at row 1 (header)
  var maxRowsToCheck = CONFIG.RANGES.MAX_ROWS_TO_CHECK; // Don't check more than 1000 rows for performance
  
  for (var i = 2; i <= maxRowsToCheck; i++) {
    var cValue = targetSheet.getRange(i, 3).getValue();
    if (cValue && cValue.toString().trim() !== '') {
      lastRowWithDataInC = i;
    }
  }
  
  // Target row is the next row after the last row with data in Column C
  var targetRow = lastRowWithDataInC + 1;
  
  // ADD THE DUPLICATE CHECK HERE (before the transfer)
  var existingUrl = targetSheet.getRange(targetRow, 3).getValue();
  if (existingUrl && existingUrl.toString().trim() !== '') {
    return; // Don't transfer if target row already has data
  }
  
  // Transfer the data
  targetSheet.getRange(targetRow, 3).setValue(wpUrl);
  targetSheet.getRange(targetRow, 6).setValue(CONFIG.STATUS.SCHEDULED);
  
  // Mark as DONE
  sheet.getRange(row, 8).setValue(CONFIG.STATUS.DONE);
}





function handleProductionTrackerColumnE(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var column = e.range.getColumn();
  
  // Only proceed if this is Column E (column 5) in WIYS Production Tracker
  if (sheet.getName() !== CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER || column !== 5) return;
  
  // If something was pasted/entered in Column E, set Column F to "DONE"
  if (e.value) {
    sheet.getRange(row, 6).setValue(CONFIG.STATUS.DONE); // Set Column F to "DONE"
    Logger.log('Set status to DONE in row ' + row + ' after Column E entry');
  }
}







function scheduleWordPressPost(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  try {
    // Get the necessary values - UPDATED COLUMN REFERENCES
    var wpUrl = sheet.getRange(row, 4).getValue(); // Column D - WP URL
    var timeCell = sheet.getRange(row, 6); // Column F - Time
    var dateCell = sheet.getRange(row, 7); // Column G - Date
    
    var time = timeCell.getDisplayValue();
    var date = dateCell.getDisplayValue();
    
    if (!wpUrl || !time || !date) {
      Logger.log('Missing required data: URL, time, or date');
      sheet.getRange(row, 8).setValue('Error: Missing Data');
      return;
    }
    
    // Extract post ID from URL
    var postId = extractPostIdFromUrl(wpUrl);
    if (!postId) {
      Logger.log('Could not extract post ID from URL: ' + wpUrl);
      sheet.getRange(row, 8).setValue('Error: Invalid URL');
      return;
    }
    
    // Parse the date and time exactly as entered
    var parsedDate = new Date(date + ' ' + time);
    
    if (isNaN(parsedDate.getTime())) {
      Logger.log('Could not parse date/time: ' + date + ' ' + time);
      sheet.getRange(row, 8).setValue('Error: Invalid Date/Time');
      return;
    }
    
    // Format for WordPress
    var year = parsedDate.getFullYear();
    var month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    var day = String(parsedDate.getDate()).padStart(2, '0');
    var hours = String(parsedDate.getHours()).padStart(2, '0');
    var minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    var seconds = '00';
    
    var wpDateString = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    
    Logger.log('Setting date to: ' + wpDateString);
    
    // Update WordPress post date AND reset status to draft
    var result = updateWordPressPost(postId, {
      date: wpDateString,
      status: CONFIG.WP_POST_STATUS.DRAFT // Always reset to draft when setting new date
    });
    
    if (result) {
      sheet.getRange(row, 8).setValue('Date Set');
    } else {
      sheet.getRange(row, 8).setValue('Date Set Failed');
    }
    
  } catch (error) {
    Logger.log('Error in scheduleWordPressPost: ' + error.message);
    sheet.getRange(row, 8).setValue('Error');
  }
}







function setWordPressSchedule(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  try {
    // UPDATED COLUMN REFERENCES
    var wpUrl = sheet.getRange(row, 4).getValue(); // Column D - WP URL
    var time = sheet.getRange(row, 6).getDisplayValue(); // Column F
    var date = sheet.getRange(row, 7).getDisplayValue(); // Column G
    
    if (!wpUrl) {
      sheet.getRange(row, 8).setValue('Error: No URL');
      return;
    }
    
    if (!time || !date) {
      sheet.getRange(row, 8).setValue('Error: Set date/time first');
      return;
    }
    
    var postId = extractPostIdFromUrl(wpUrl);
    if (!postId) {
      sheet.getRange(row, 8).setValue('Error: Invalid URL');
      return;
    }
    
    // Parse the date/time and ensure it's in the future
    var scheduledDate = new Date(date + ' ' + time);
    var now = new Date();
    
    if (scheduledDate <= now) {
      sheet.getRange(row, 8).setValue('Error: Date must be future');
      return;
    }
    
    // Format the date for WordPress
    var year = scheduledDate.getFullYear();
    var month = String(scheduledDate.getMonth() + 1).padStart(2, '0');
    var day = String(scheduledDate.getDate()).padStart(2, '0');
    var hours = String(scheduledDate.getHours()).padStart(2, '0');
    var minutes = String(scheduledDate.getMinutes()).padStart(2, '0');
    var seconds = '00';
    
    var wpDateString = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    
    // Set status to scheduled with the date
    var result = updateWordPressPost(postId, {
      status: CONFIG.WP_POST_STATUS.FUTURE,
      date: wpDateString
    });
    
    if (result) {
      sheet.getRange(row, 8).setValue(CONFIG.STATUS.SCHEDULED);
    } else {
      sheet.getRange(row, 8).setValue('Schedule Failed');
    }
    
  } catch (error) {
    Logger.log('Error scheduling post: ' + error.message);
    sheet.getRange(row, 8).setValue('Error');
  }
}








function checkWordPressStatus(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  try {
    var wpUrl = sheet.getRange(row, 4).getValue(); // Column D - WP URL
    
    if (!wpUrl) {
      sheet.getRange(row, 8).setValue('Error: No URL');
      return;
    }
    
    var postId = extractPostIdFromUrl(wpUrl);
    if (!postId) {
      sheet.getRange(row, 8).setValue('Error: Invalid URL');
      return;
    }
    
    // Get full post data from WordPress
    var postData = getWordPressPost(postId);
    
    if (!postData) {
      sheet.getRange(row, 8).setValue('Error: Post Not Found');
      return;
    }
    
    Logger.log('Post status: ' + postData.status);
    Logger.log('Post date: ' + postData.date);
    
    // Handle different post statuses
if (postData.status === CONFIG.WP_POST_STATUS.DRAFT) {
  // Check if the post date is in the future (which means it was manually set)
  var postDate = new Date(postData.date);
  var now = new Date();
  
  if (postDate > now) {
    // Future date = manually set
    updateDateTimeColumns(sheet, row, postData.date);
    sheet.getRange(row, 8).setValue('Date Set');
  } else {
    // Past date = just creation date
    sheet.getRange(row, 6).setValue('');
    sheet.getRange(row, 7).setValue('');
    sheet.getRange(row, 8).setValue('WordPress Draft');
  }

      
    } else if (postData.status === CONFIG.WP_POST_STATUS.FUTURE) {
      // Scheduled post
      updateDateTimeColumns(sheet, row, postData.date);
      sheet.getRange(row, 8).setValue(CONFIG.STATUS.SCHEDULED); // Column H
      
    } else if (postData.status === CONFIG.WP_POST_STATUS.PUBLISH) {
      // Published post - UPDATED TO SAY "Published" instead of "Website - Live"
      updateDateTimeColumns(sheet, row, postData.date);
      sheet.getRange(row, 8).setValue(CONFIG.STATUS.PUBLISHED); // Column H - Changed to "Published"
    } else {
      // Other statuses (private, pending, etc.)
      sheet.getRange(row, 8).setValue('Status: ' + postData.status);
    }
    
  } catch (error) {
    Logger.log('Error checking WP status: ' + error.message);
    Logger.log('Stack trace: ' + error.stack);
    sheet.getRange(row, 8).setValue('Error');
  }
}







// Updated helper function for date/time columns
function updateDateTimeColumns(sheet, row, wpDateString) {
  try {
    // Parse WordPress date string
    var date = new Date(wpDateString);
    
    // Format time (e.g., "3:30 AM")
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var timeString = hours + ':' + String(minutes).padStart(2, '0') + ' ' + ampm;
    
    // Format date (e.g., "June 19 2025")
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
    var dateString = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
    
    // Set values with UPDATED COLUMN REFERENCES
    sheet.getRange(row, 6).setValue(timeString); // Column F
    sheet.getRange(row, 7).setValue(dateString); // Column G
    
  } catch (error) {
    Logger.log('Error updating date/time columns: ' + error.message);
  }
}




function cleanHtmlEntities(text) {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '…')
    .trim();
}




function getWordPressPost(postId) {
  var username = CONFIG.WORDPRESS.USERNAME;
  var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
  
  var wpApiUrl = CONFIG.ENDPOINTS.WP_POSTS + '/' + postId;
  
  var options = {
    method: "get",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
    },
    muteHttpExceptions: true
  };
  
  try {
    var response = UrlFetchApp.fetch(wpApiUrl, options);
    if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
      return JSON.parse(response.getContentText());
    }
  } catch (error) {
    Logger.log('Error getting WordPress post: ' + error.message);
  }
  return null;
}

function updateWordPressPost(postId, updateData) {
  var username = CONFIG.WORDPRESS.USERNAME;
  var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
  
  var wpApiUrl = CONFIG.ENDPOINTS.WP_POSTS + '/' + postId;
  
  var options = {
    method: "post",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword),
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(updateData),
    muteHttpExceptions: true
  };
  
  try {
    var response = UrlFetchApp.fetch(wpApiUrl, options);
    var responseCode = response.getResponseCode();
    
    if (responseCode === 200) {
      Logger.log('Successfully updated post');
      return JSON.parse(response.getContentText());
    } else {
      Logger.log('Failed to update post. Response code: ' + responseCode);
      Logger.log('Response: ' + response.getContentText());
      return false;
    }
  } catch (error) {
    Logger.log('Error updating WordPress post: ' + error.message);
    return false;
  }
}

function extractPostIdFromUrl(url) {
  try {
    var postMatch = url.match(/[?&]post=(\d+)/);
    if (postMatch) return postMatch[1];
    
    var previewMatch = url.match(/[?&]p=(\d+)/);
    if (previewMatch) return previewMatch[1];
    
    var idMatch = url.match(/\/(\d+)\/?$/);
    if (idMatch) return idMatch[1];
    
    Logger.log('Could not extract post ID from URL: ' + url);
    return null;
  } catch (error) {
    Logger.log('Error extracting post ID: ' + error.message);
    return null;
  }
}

function checkScheduledPostsStatus() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
  
  if (!sheet) {
    Logger.log('WP Editing Tracker sheet not found');
    return;
  }
  
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  
  // Get all data
  var dataRange = sheet.getRange(1, 1, lastRow, 12);
  var values = dataRange.getValues();
  
  // Find DRAFTS marker to limit processing
  var maxRowToProcess = lastRow;
  for (var j = 1; j < values.length; j++) {
    if (values[j][1] && String(values[j][1]).includes("DRAFTS")) {
      maxRowToProcess = j;
      break;
    }
  }
  
  // Process rows
  for (var i = 1; i < maxRowToProcess; i++) {
    var currentRowNumber = i + 1;
    
    // Check if row is hidden
    try {
      if (sheet.isRowHiddenByUser(currentRowNumber)) {
        continue;
      }
    } catch (error) {
      // Continue processing
    }
    
    var wpUrl = values[i][4]; // Column E - WP URL
    var statusI = values[i][8]; // Column I - Status
    var statusJ = values[i][9]; // Column J - WordPress Status
    
    // Only check rows that have "Scheduled" status in Column I or J
    if (wpUrl && (statusI === CONFIG.STATUS.SCHEDULED || statusJ === CONFIG.STATUS.SCHEDULED)) {
      var postId = extractPostIdFromUrl(wpUrl);
      if (!postId) continue;
      
      try {
        var postData = getWordPressPost(postId);
        
        if (postData && postData.status === CONFIG.WP_POST_STATUS.PUBLISH) {
          Logger.log('Found published post that was scheduled: ' + postId);
          
          // Update statuses
          sheet.getRange(currentRowNumber, 9).setValue('Website Published'); // Column I
          sheet.getRange(currentRowNumber, 10).setValue('WordPress Published'); // Column J
          
          // Extract and set final title
          if (postData.title && postData.title.rendered) {
            var cleanTitle = cleanHtmlEntities(postData.title.rendered);
            sheet.getRange(currentRowNumber, 11).setValue(cleanTitle); // Column K
          }
          
          // Set published URL
          if (postData.link) {
            sheet.getRange(currentRowNumber, 12).setValue(postData.link); // Column L
          }
          
          Logger.log('Updated row ' + currentRowNumber + ' to published status');
        }
        
      } catch (error) {
        Logger.log('Error checking post ' + postId + ': ' + error.message);
      }
    }
  }
  
  Logger.log('Scheduled posts check completed');
}






// ============================================================================
// MONITOR FUNCTIONS
// ============================================================================ 



function onProductionTrackerEdit(e) {
  if (!e || !e.range || !e.value || e.oldValue === e.value) return;
  var sheet = e.range.getSheet();
  var column = e.range.getColumn();
  
  if (sheet.getName() === CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER && column === 7) { // Column G
    if (e.value === "Check Status") {
      manualCheckProductionTracker(e);
    }
  }
}

// Main monitor function (runs automatically every 5 minutes)
function monitorProductionTracker(skipTimeCheck) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER);

  if (!sheet) {
    Logger.log('WIYS Production Tracker sheet not found');
    return;
  }

  var username = CONFIG.WORDPRESS.USERNAME;
  var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;

  // Check if current time is within Phoenix AZ business hours (9 AM - 8 PM)
  if (!skipTimeCheck) {
    var now = new Date();
    var phoenixTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Phoenix"}));
    var hour = phoenixTime.getHours();

    if (hour < CONFIG.TIME.WORK_START_HOUR || hour >= CONFIG.TIME.WORK_END_HOUR) {
      Logger.log('Outside monitoring hours (9 AM - 8 PM Phoenix time). Current hour: ' + hour);
      return;
    }
  }
  
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // No data rows to process
  
  // Process all rows starting from row 2
  for (var row = 2; row <= lastRow; row++) {
    var draftUrl = sheet.getRange(row, 4).getValue(); // Column D
    var status = sheet.getRange(row, 7).getValue(); // Column G
    
    // Only check rows with "Scheduled" status and a draft URL
    if (status === CONFIG.STATUS.SCHEDULED && draftUrl) {
      // Extract post ID from draft URL
      var postId = extractPostIdFromUrl(draftUrl);
      if (!postId) {
        Logger.log('Could not extract post ID from URL in row ' + row + ': ' + draftUrl);
        continue;
      }
      
      try {
        // Get WordPress post status
        var wpStatus = getWordPressPostStatus(postId, username, applicationPassword);
        
        if (wpStatus && wpStatus.status === CONFIG.WP_POST_STATUS.PUBLISH) {
          Logger.log('Post ' + postId + ' is published! Updating row ' + row);
          
          // Extract clean title
          var cleanTitle = wpStatus.title;
          if (typeof cleanTitle !== 'string') {
            cleanTitle = 'Title not found';
          }
          
          // Format publish date/time for Phoenix timezone
          var publishDate = formatWordPressDateTime(wpStatus.publishDate);
          
          // Update the row with published information
          var titleRange = sheet.getRange(row, 4);
          titleRange.setValue(cleanTitle); // Column D - Replace URL with title
          titleRange.clearFormat(); // Remove any link formatting
          
          sheet.getRange(row, 3).setValue(publishDate); // Column C - Publish date/time
          sheet.getRange(row, 5).setValue(wpStatus.link); // Column E - Published URL
          sheet.getRange(row, 7).setValue("MSN Pending"); // Column G - Update status
          
          Logger.log('Updated row ' + row + ' with published article: ' + cleanTitle);
          
          // Force save
          SpreadsheetApp.flush();
        }
      } catch (error) {
        Logger.log('Error checking post ' + postId + ' in row ' + row + ': ' + error.message);
      }
    }
  }
  
  Logger.log('Production Tracker monitoring completed');
}

/** Run the production tracker monitor without the time check. Use from Apps Script editor or menu. */
function runProductionTrackerNow() {
  monitorProductionTracker(true);
}

function manualCheckProductionTracker(e) {
  Logger.log('=== manualCheckProductionTracker started ===');
  
  if (!e || !e.value || e.value !== "Check Status") {
    Logger.log('Exiting: wrong trigger value: ' + (e ? e.value : 'no event'));
    return;
  }
  
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var column = e.range.getColumn();
  
  Logger.log('Processing row: ' + row + ', column: ' + column);
  
  // Only proceed if this is the correct sheet and column
  if (sheet.getName() !== CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER) {
    Logger.log('Wrong sheet: ' + sheet.getName());
    return;
  }
  
  var username = CONFIG.WORDPRESS.USERNAME;
  var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
  
  var draftUrl = sheet.getRange(row, 4).getValue(); // Column D
  var status = sheet.getRange(row, 7).getValue(); // Column G
  
  Logger.log('Draft URL: ' + draftUrl);
  Logger.log('Current status: ' + status);
  
  // Only check if status is "Scheduled" and there's a draft URL
  if (status === CONFIG.STATUS.SCHEDULED && draftUrl) {
    Logger.log('Conditions met, proceeding with WordPress check...');
    
    var postId = extractPostIdFromUrl(draftUrl);
    if (!postId) {
      Logger.log('Could not extract post ID from URL: ' + draftUrl);
      // Reset the dropdown
      sheet.getRange(row, column).setValue(CONFIG.STATUS.SCHEDULED);
      return;
    }
    
    Logger.log('Extracted post ID: ' + postId);
    
    try {
      var wpStatus = getWordPressPostStatus(postId, username, applicationPassword);
      
      Logger.log('WordPress status response: ' + JSON.stringify(wpStatus));
      
      if (wpStatus && wpStatus.status === CONFIG.WP_POST_STATUS.PUBLISH) {
        Logger.log('Article is published! Updating row...');
        
        // Extract clean title
        var cleanTitle = wpStatus.title;
        if (typeof cleanTitle !== 'string') {
          cleanTitle = 'Title not found';
        }
        
        // Format publish date/time for Phoenix timezone
        var publishDate = formatWordPressDateTime(wpStatus.publishDate);
        
        // Update the row with published information
        var titleRange = sheet.getRange(row, 4);
        titleRange.setValue(cleanTitle); // Column D - Replace URL with title
        titleRange.clearFormat(); // Remove any link formatting
        
        sheet.getRange(row, 3).setValue(publishDate); // Column C - Publish date/time
        sheet.getRange(row, 5).setValue(wpStatus.link); // Column E - Published URL
        sheet.getRange(row, 7).setValue("MSN Pending"); // Column G - Update status
        
        Logger.log('Manual update completed for row ' + row);
      } else {
        // Post is not published yet - reset dropdown to "Scheduled"
        sheet.getRange(row, column).setValue(CONFIG.STATUS.SCHEDULED);
        Logger.log('Post is not published yet. Status: ' + (wpStatus ? wpStatus.status : 'unknown'));
      }
    } catch (error) {
      Logger.log('Error checking post: ' + error.message);
      // Reset the dropdown
      sheet.getRange(row, column).setValue(CONFIG.STATUS.SCHEDULED);
    }
  } else {
    Logger.log('Conditions not met - Status: ' + status + ', URL: ' + draftUrl);
    // Reset the dropdown since conditions weren't met
    sheet.getRange(row, column).setValue(CONFIG.STATUS.SCHEDULED);
  }
  
  Logger.log('=== manualCheckProductionTracker finished ===');
}

function formatPhoenixDateTime(isoDateString) {
  try {
    // Parse the ISO date string
    var date = new Date(isoDateString);
    
    // Convert to Phoenix time
    var phoenixDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Phoenix"}));
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
    
    var month = months[phoenixDate.getMonth()];
    var day = phoenixDate.getDate();
    var year = phoenixDate.getFullYear();
    
    // Format time in 12-hour format
    var hours = phoenixDate.getHours();
    var minutes = phoenixDate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    var timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    
    // Format: "June 30 2025 - 7:00 PM"
    return `${month} ${day} ${year} - ${timeString}`;
    
  } catch (error) {
    Logger.log('Error formatting Phoenix date/time: ' + error.message);
    return 'Date format error';
  }
}




// Record all rows that are ready

/*function recordAllReady() {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
 var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER);
 
 if (!sheet || !targetSheet) {
   Logger.log('Error: Could not find required sheets');
   return;
 }
 
 var lastRow = sheet.getLastRow();
 if (lastRow < 2) return; // No data to process
 
 // Read all data at once (much faster)
 var allData = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
 
 // Find the last row with data in Column C of Production Tracker
 var productionLastRow = 1;
 var maxRowsToCheck = Math.min(CONFIG.RANGES.MAX_ROWS_TO_CHECK, targetSheet.getLastRow());
 
 for (var i = 2; i <= maxRowsToCheck; i++) {
   var cValue = targetSheet.getRange(i, 3).getValue();
   if (cValue && cValue.toString().trim() !== '') {
     productionLastRow = i;
   }
 }
 
 var nextProductionRow = productionLastRow + 1;
 
 // Process all rows
 var transferCount = 0;
 var rowsToUpdate = [];
 var columnAToWrite = [];   // Column A data
 var datesToWrite = [];     // Column C data (date/time)
 var urlsToWrite = [];      // Column D data (website URL)
 var statusesToWrite = [];  // Column G data (status)
 
 for (var i = 0; i < allData.length; i++) {
   var wpUrl = allData[i][3]; // Column D (index 3)
   var currentStatus = allData[i][7]; // Column H (index 7)
   var columnAValue = allData[i][0]; // Column A (index 0)
   
   // Check if this row should be transferred
   if (wpUrl && wpUrl.toString().trim() !== '' && 
       (currentStatus === CONFIG.STATUS.PUBLISHED || currentStatus === CONFIG.STATUS.SCHEDULED) &&
       currentStatus !== CONFIG.STATUS.DONE) {
     
     // Get the DISPLAY values (what you see in the sheet)
     var timeDisplay = sheet.getRange(i + 2, 6).getDisplayValue(); // Column F (time)
     var dateDisplay = sheet.getRange(i + 2, 7).getDisplayValue(); // Column G (date)
     var combinedDateTime = dateDisplay + ' - ' + timeDisplay;
     
     // Prepare data for specific columns
     columnAToWrite.push([columnAValue]);      // Column A
     datesToWrite.push([combinedDateTime]);    // Column C (date/time)
     urlsToWrite.push([wpUrl]);               // Column D (website URL)
     statusesToWrite.push(["Scheduled"]);      // Column G (status)
     
     // Mark this row for updating to DONE
     rowsToUpdate.push(i + 2); // +2 because we started from row 2
     
     transferCount++;
   }
 }
 
 // Write data to SPECIFIC columns only
 if (urlsToWrite.length > 0) {
   // Write Column A data
   var columnARange = targetSheet.getRange(nextProductionRow, 1, columnAToWrite.length, 1);
   columnARange.setValues(columnAToWrite);
   
   // Write combined date/time to Column C
   var dateRange = targetSheet.getRange(nextProductionRow, 3, datesToWrite.length, 1);
   dateRange.setValues(datesToWrite);
   
   // Write URLs to Column D
   var urlRange = targetSheet.getRange(nextProductionRow, 4, urlsToWrite.length, 1);
   urlRange.setValues(urlsToWrite);
   
   // Write statuses to Column G
   var statusRange = targetSheet.getRange(nextProductionRow, 7, statusesToWrite.length, 1);
   statusRange.setValues(statusesToWrite);
   
   // Mark all transferred rows as DONE
   for (var j = 0; j < rowsToUpdate.length; j++) {
     sheet.getRange(rowsToUpdate[j], 8).setValue(CONFIG.STATUS.DONE);
   }
 }
 
 SpreadsheetApp.getUi().alert(
   'Transfer Complete!\n\n' +
   'Transferred: ' + transferCount + ' articles\n' +
   'Updated Columns A, C, D and G in Production Tracker'
 );
 
 Logger.log('Transferred ' + transferCount + ' articles to Production Tracker');
}*/

function recordAllReady() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER);
  
  if (!sheet || !targetSheet) {
    Logger.log('Error: Could not find required sheets');
    return;
  }
  
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // No data to process
  
  // Read all data at once (much faster)
  var allData = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
  
  // Find the last row with data in ANY of the relevant columns (A, C, D, E, G)
  var productionLastRow = 1;
  var targetLastRow = targetSheet.getLastRow();
  
  if (targetLastRow >= 2) {
    // Get all values from columns A, C, D, E, G in one batch
    var colAValues = targetSheet.getRange(2, 1, targetLastRow - 1, 1).getValues();
    var colCValues = targetSheet.getRange(2, 3, targetLastRow - 1, 1).getValues();
    var colDValues = targetSheet.getRange(2, 4, targetLastRow - 1, 1).getValues();
    var colEValues = targetSheet.getRange(2, 5, targetLastRow - 1, 1).getValues();
    var colGValues = targetSheet.getRange(2, 7, targetLastRow - 1, 1).getValues();
    
    // Find the last row where ANY of these columns has content
    for (var i = 0; i < colAValues.length; i++) {
      var hasData = (colAValues[i][0] && colAValues[i][0].toString().trim() !== '') ||
                    (colCValues[i][0] && colCValues[i][0].toString().trim() !== '') ||
                    (colDValues[i][0] && colDValues[i][0].toString().trim() !== '') ||
                    (colEValues[i][0] && colEValues[i][0].toString().trim() !== '') ||
                    (colGValues[i][0] && colGValues[i][0].toString().trim() !== '');
      
      if (hasData) {
        productionLastRow = i + 2; // +2 because we started from row 2
      }
    }
  }
  
  var nextProductionRow = productionLastRow + 1;
  
  // Get display values for date/time columns all at once (more efficient)
  var timeDisplayValues = sheet.getRange(2, 6, lastRow - 1, 1).getDisplayValues();
  var dateDisplayValues = sheet.getRange(2, 7, lastRow - 1, 1).getDisplayValues();
  
  // Process all rows to count transfers first
  var transferCount = 0;
  var rowsToUpdate = [];
  var columnAToWrite = [];   // Column A data
  var datesToWrite = [];     // Column C data (date/time)
  var urlsToWrite = [];      // Column D data (website URL)
  var statusesToWrite = [];  // Column G data (status)
  
  for (var i = 0; i < allData.length; i++) {
    var wpUrl = allData[i][3]; // Column D (index 3)
    var currentStatus = allData[i][7]; // Column H (index 7)
    var columnAValue = allData[i][0]; // Column A (index 0)
    
    // Check if this row should be transferred
    if (wpUrl && wpUrl.toString().trim() !== '' && 
        (currentStatus === CONFIG.STATUS.PUBLISHED || currentStatus === CONFIG.STATUS.SCHEDULED) &&
        currentStatus !== CONFIG.STATUS.DONE) {
      
      // Use the pre-fetched display values
      var timeDisplay = timeDisplayValues[i][0];
      var dateDisplay = dateDisplayValues[i][0];
      var combinedDateTime = dateDisplay + ' - ' + timeDisplay;
      
      // Prepare data for specific columns
      columnAToWrite.push([columnAValue]);      // Column A
      datesToWrite.push([combinedDateTime]);    // Column C (date/time)
      urlsToWrite.push([wpUrl]);               // Column D (website URL)
      statusesToWrite.push(["Scheduled"]);      // Column G (status)
      
      // Mark this row for updating to DONE
      rowsToUpdate.push(i + 2); // +2 because we started from row 2
      
      transferCount++;
    }
  }
  
  // Check if there's anything to transfer
  if (transferCount === 0) {
    SpreadsheetApp.getUi().alert('No articles to transfer.\n\nAll eligible articles have already been marked as DONE.');
    return;
  }
  
  // Show confirmation dialog
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    'Confirm Transfer',
    'Ready to transfer ' + transferCount + ' article(s)\n\n' +
    'Starting at row: ' + nextProductionRow + ' in Production Tracker\n\n' +
    'Do you want to proceed?',
    ui.ButtonSet.YES_NO
  );
  
  // Check user response
  if (response !== ui.Button.YES) {
    ui.alert('Transfer cancelled.');
    return;
  }
  
  // Write data to SPECIFIC columns only
  if (urlsToWrite.length > 0) {
    // Write Column A data
    var columnARange = targetSheet.getRange(nextProductionRow, 1, columnAToWrite.length, 1);
    columnARange.setValues(columnAToWrite);
    
    // Write combined date/time to Column C
    var dateRange = targetSheet.getRange(nextProductionRow, 3, datesToWrite.length, 1);
    dateRange.setValues(datesToWrite);
    
    // Write URLs to Column D
    var urlRange = targetSheet.getRange(nextProductionRow, 4, urlsToWrite.length, 1);
    urlRange.setValues(urlsToWrite);
    
    // Write statuses to Column G
    var statusRange = targetSheet.getRange(nextProductionRow, 7, statusesToWrite.length, 1);
    statusRange.setValues(statusesToWrite);
    
    // Mark all transferred rows as DONE
    for (var j = 0; j < rowsToUpdate.length; j++) {
      sheet.getRange(rowsToUpdate[j], 8).setValue(CONFIG.STATUS.DONE);
    }
  }
  
  SpreadsheetApp.getUi().alert(
    'Transfer Complete!\n\n' +
    'Transferred: ' + transferCount + ' articles\n' +
    'Updated Columns A, C, D and G in Production Tracker'
  );
  
  Logger.log('Transferred ' + transferCount + ' articles to Production Tracker');
}

// ============================================================================
// AUTO READ MORE AND TAGGING
// ============================================================================


// Look up article in Article Status Tracker and get tags
function lookupArticleInStatusTracker(articleTitle) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  
  if (!statusSheet) {
    Logger.log('Article Status Tracker sheet not found');
    return null;
  }
  
  var statusData = statusSheet.getRange("C:J").getValues(); // Title in C, Tags in J
  
  for (var i = 0; i < statusData.length; i++) {
    if (statusData[i][0] === articleTitle || 
        (statusData[i][0] && statusData[i][0].toString().trim() === articleTitle.trim())) {
      var tags = statusData[i][7]; // Column J (index 7 in 0-based array)
      if (tags) {
        Logger.log('Found tags for article "' + articleTitle + '": ' + tags);
        return tags.toString().split(',').map(function(tag) {
          return tag.trim();
        }).filter(function(tag) {
          return tag.length > 0;
        });
      }
    }
  }
  
  Logger.log('No tags found for article: ' + articleTitle);
  return null;
}

// Convert tag names to WordPress tag IDs (create if they don't exist)
function convertTagsToWordPressIds(tagNames, username, applicationPassword) {
  var tagIds = [];
  var tagsEndpoint = CONFIG.WORDPRESS.BASE_URL + "/wp-json/wp/v2/tags";
  
  for (var i = 0; i < tagNames.length; i++) {
    var tagName = tagNames[i];
    
    // First, try to find existing tag
    var searchEndpoint = tagsEndpoint + "?search=" + encodeURIComponent(tagName);
    var searchOptions = {
      method: "get",
      headers: {
        "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
      },
      muteHttpExceptions: true
    };
    
    try {
      var searchResponse = UrlFetchApp.fetch(searchEndpoint, searchOptions);
      if (searchResponse.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
        var existingTags = JSON.parse(searchResponse.getContentText());
        
        // Look for exact match
        var exactMatch = null;
        for (var j = 0; j < existingTags.length; j++) {
          if (existingTags[j].name.toLowerCase() === tagName.toLowerCase()) {
            exactMatch = existingTags[j];
            break;
          }
        }
        
        if (exactMatch) {
          tagIds.push(exactMatch.id);
          Logger.log('Found existing tag: ' + tagName + ' (ID: ' + exactMatch.id + ')');
          continue;
        }
      }
      
      // Tag doesn't exist, create it
      var createOptions = {
        method: "post",
        headers: {
          "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword),
          "Content-Type": "application/json"
        },
        payload: JSON.stringify({
          name: tagName,
          slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }),
        muteHttpExceptions: true
      };
      
      var createResponse = UrlFetchApp.fetch(tagsEndpoint, createOptions);
      if (createResponse.getResponseCode() === CONFIG.HTTP_STATUS.CREATED) {
        var newTag = JSON.parse(createResponse.getContentText());
        tagIds.push(newTag.id);
        Logger.log('Created new tag: ' + tagName + ' (ID: ' + newTag.id + ')');
      } else {
        Logger.log('Failed to create tag: ' + tagName + ' - ' + createResponse.getContentText());
      }
      
    } catch (error) {
      Logger.log('Error processing tag "' + tagName + '": ' + error.message);
    }
    
    // Small delay to avoid overwhelming the API
    Utilities.sleep(200);
  }
  
  return tagIds;
}





 ///onopen
// ============================================================================
// BATCH FUNCTIONS WITH WORKSPACE PROTECTION
// ============================================================================

//-----





/// GET INTRO SUBHEADINGS ONLY


function getIntroSubheading() {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
 if (!sheet) {
   SpreadsheetApp.getUi().alert('WP Editing Tracker sheet not found');
   return;
 }
 
 var lastRow = sheet.getLastRow();
 var articlesToProcess = [];
 
 // Find all rows with WordPress URL and empty Column J OR Column K
 for (var row = 2; row <= lastRow; row++) {
   var columnJ = sheet.getRange(row, 10).getValue(); // Column J - Subheading
   var columnK = sheet.getRange(row, 11).getValue(); // Column K - Content
   var wpUrl = sheet.getRange(row, 4).getValue(); // Column D
   
   // Check conditions - ONLY need WordPress URL
   var columnJEmpty = !columnJ || columnJ.toString().trim() === '';
   var columnKEmpty = !columnK || columnK.toString().trim() === '';
   var hasUrl = wpUrl && wpUrl.toString().trim() !== '';
   
   // Process if URL exists and at least one of J or K is empty
   if (hasUrl && (columnJEmpty || columnKEmpty)) {
     articlesToProcess.push({
       row: row,
       wpUrl: wpUrl,
       needsSubheading: columnJEmpty,
       needsContent: columnKEmpty
     });
   }
 }
 
 // Check if any articles found
 if (articlesToProcess.length === 0) {
   SpreadsheetApp.getUi().alert(
     'No Articles to Process',
     'No articles found that meet the criteria:\n' +
     '• Column J (subheading) OR Column K (content) is empty\n' +
     '• Column D has WordPress URL',
     SpreadsheetApp.getUi().ButtonSet.OK
   );
   return;
 }
 
 // Show confirmation dialog
 var confirmMessage = 'Found ' + articlesToProcess.length + ' articles ready for extraction.\n\n';
 confirmMessage += 'This will extract missing subheadings and/or content from the first slide of each article.\n\n';
 confirmMessage += 'Continue?';
 
 var response = SpreadsheetApp.getUi().alert(
   'Extract Intro Subheadings & Content',
   confirmMessage,
   SpreadsheetApp.getUi().ButtonSet.YES_NO
 );
 
 if (response !== SpreadsheetApp.getUi().Button.YES) {
   return;
 }
 
 // Process each article
 var successCount = 0;
 var errorCount = 0;
 var errors = [];
 
 for (var i = 0; i < articlesToProcess.length; i++) {
   var article = articlesToProcess[i];
   
   try {
     Logger.log('Processing article ' + (i + 1) + ' of ' + articlesToProcess.length + ' (Row ' + article.row + ')');
     
     // Extract data from WordPress
     var extractedData = extractSlideDataFromWordPress(article.wpUrl, article.needsSubheading, article.needsContent);
     
     if (extractedData && extractedData.success) {
       var cellsUpdated = [];
       
       // Update subheading if needed and found
       if (article.needsSubheading && extractedData.subheading) {
         sheet.getRange(article.row, 10).setValue(extractedData.subheading);
         cellsUpdated.push('subheading');
       }
       
       // Update content if needed and found
       if (article.needsContent && extractedData.content) {
         sheet.getRange(article.row, 11).setValue(extractedData.content);
         cellsUpdated.push('content');
       }
       
       successCount++;
       Logger.log('Successfully extracted ' + cellsUpdated.join(' + ') + ' for row ' + article.row);
       
     } else {
       // Failed - write error message to appropriate cells and color them light red
       var errorMessage = 'Failed - ' + (extractedData ? extractedData.error : 'Unknown error');
       
       if (article.needsSubheading) {
         sheet.getRange(article.row, 10).setValue(errorMessage);
         sheet.getRange(article.row, 10).setBackground(CONFIG.COLORS.LIGHT_RED); // Light red
       }
       
       if (article.needsContent) {
         sheet.getRange(article.row, 11).setValue(errorMessage);
         sheet.getRange(article.row, 11).setBackground(CONFIG.COLORS.LIGHT_RED); // Light red
       }
       
       errorCount++;
       errors.push({
         row: article.row,
         error: extractedData ? extractedData.error : 'Unknown error'
       });
       Logger.log('Failed to extract data for row ' + article.row + ': ' + errorMessage);
     }
     
     // Add delay to avoid overwhelming WordPress API
     Utilities.sleep(1000);
     
   } catch (error) {
     errorCount++;
     var errorMessage = 'Failed - ' + error.message;
     
     if (article.needsSubheading) {
       sheet.getRange(article.row, 10).setValue(errorMessage);
       sheet.getRange(article.row, 10).setBackground(CONFIG.COLORS.LIGHT_RED); // Light red
     }
     
     if (article.needsContent) {
       sheet.getRange(article.row, 11).setValue(errorMessage);
       sheet.getRange(article.row, 11).setBackground(CONFIG.COLORS.LIGHT_RED); // Light red
     }
     
     errors.push({
       row: article.row,
       error: error.message
     });
     Logger.log('Error processing row ' + article.row + ': ' + error.message);
   }
 }
 
 // Force save
 SpreadsheetApp.flush();
 
 // Show results
 var resultMessage = 'Extraction Complete!\n\n';
 resultMessage += '✅ Successfully extracted: ' + successCount + ' articles\n';
 
 if (errorCount > 0) {
   resultMessage += '❌ Errors: ' + errorCount + ' articles\n\n';
   resultMessage += 'Failed articles (marked in light red):\n';
   for (var j = 0; j < Math.min(errors.length, 5); j++) {
     resultMessage += '• Row ' + errors[j].row + ': ' + errors[j].error + '\n';
   }
   if (errors.length > 5) {
     resultMessage += '... and ' + (errors.length - 5) + ' more errors (check logs)\n';
   }
 } else {
   resultMessage += '\n🎉 All data extracted successfully!';
 }
 
 SpreadsheetApp.getUi().alert('Extraction Results', resultMessage, SpreadsheetApp.getUi().ButtonSet.OK);
 
 Logger.log('Data extraction completed - Success: ' + successCount + ', Errors: ' + errorCount);
}

// Helper function to extract subheading and/or content from WordPress post
function extractSlideDataFromWordPress(wpUrl, needsSubheading, needsContent) {
 try {
   // Extract post ID from URL
   var postId = extractPostIdFromUrl(wpUrl);
   if (!postId) {
     return { success: false, error: 'Invalid URL format' };
   }
   
   // WordPress API credentials
   var username = CONFIG.WORDPRESS.USERNAME;
   var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
   var apiUrl = CONFIG.ENDPOINTS.WP_POSTS + '/' + postId + '?context=edit';
   
   // Fetch post content
   var options = {
     method: "get",
     headers: {
       "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
     },
     muteHttpExceptions: true
   };
   
   var response = UrlFetchApp.fetch(apiUrl, options);
   
   if (response.getResponseCode() !== CONFIG.HTTP_STATUS.OK) {
     return { success: false, error: 'Cannot access post (Code: ' + response.getResponseCode() + ')' };
   }
   
   var postData = JSON.parse(response.getContentText());
   var content = postData.content.raw;
   
   // Check if content has slideshow blocks
   if (!content.includes('wp:clmsn/slideshow-item')) {
     return { success: false, error: 'No slideshow found' };
   }
   
   // Find the first slideshow item block
   var firstSlidePattern = /<!-- wp:clmsn\/slideshow-item\s+({[^}]+})\s*-->([\s\S]*?)<!-- \/wp:clmsn\/slideshow-item -->/;
   var match = content.match(firstSlidePattern);
   
   if (!match) {
     return { success: false, error: 'Cannot parse slideshow structure' };
   }
   
   var blockContent = match[2];
   var result = { success: true };
   
   // Extract subheading if needed
   if (needsSubheading) {
     var h3Match = blockContent.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
     
     if (h3Match) {
       var subheading = cleanHtmlEntities(h3Match[1].trim());
       if (subheading) {
         result.subheading = subheading;
       }
     }
   }
   
   // Extract content if needed - CAPTURE EVERYTHING FROM FIRST <p> TO LAST </p>
   if (needsContent) {
     var firstPStart = blockContent.indexOf('<p>');
     var lastPEnd = blockContent.lastIndexOf('</p>') + 4;
     
     if (firstPStart !== -1 && lastPEnd > firstPStart) {
       var allPContent = blockContent.substring(firstPStart, lastPEnd);
       
       // Remove all p tags but keep the content
       var cleanContent = allPContent.replace(/<\/?p[^>]*>/g, ' ');
       
       // Convert <br><br> to double line breaks
       cleanContent = cleanContent.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n');
       
       // Convert remaining single <br> to single line breaks  
       cleanContent = cleanContent.replace(/<br\s*\/?>/gi, '\n');
       
       // Clean up HTML entities
       cleanContent = cleanHtmlEntities(cleanContent);
       
       // CLEAN UP EXCESSIVE WHITESPACE
       cleanContent = cleanContent.replace(/\s+/g, ' '); // Multiple spaces → single space
       cleanContent = cleanContent.replace(/\n\s+/g, '\n'); // Remove spaces after line breaks
       cleanContent = cleanContent.replace(/\s+\n/g, '\n'); // Remove spaces before line breaks
       cleanContent = cleanContent.trim(); // Remove leading/trailing whitespace
       
       if (cleanContent) {
         result.content = cleanContent;
       }
     }
   }
   
   // Check if we got what we needed
   var gotSubheading = !needsSubheading || result.subheading;
   var gotContent = !needsContent || result.content;
   
   if (!gotSubheading && !gotContent) {
     return { success: false, error: 'No subheading or content found in first slide' };
   } else if (!gotSubheading) {
     return { success: false, error: 'No subheading found in first slide' };
   } else if (!gotContent) {
     return { success: false, error: 'No content found in first slide' };
   }
   
   return result;
   
 } catch (error) {
   return { success: false, error: error.message };
 }
}

// Helper function to clean HTML entities
function cleanHtmlEntities(text) {
 if (!text) return '';
 
 return text
   .replace(/&quot;/g, '"')
   .replace(/&amp;/g, '&')
   .replace(/&lt;/g, '<')
   .replace(/&gt;/g, '>')
   .replace(/&nbsp;/g, ' ')
   .trim();
}

function batchPasteArticleSections() {
  var operationType = 'Batch Paste Article Sections';
  
  // Check if sheet is locked
  if (!checkUploaderLock(operationType)) {
    return;
  }
  
  // Start the workspace selection loop
  processWorkspaceLoop(operationType);
}

function processWorkspaceLoop(operationType) {
  try {
    // Step 1: Ask user to choose workspace (uses hardcoded list)
    var selectedWorkspace = selectSingleWorkspace(); 
    
    if (!selectedWorkspace) {
      unlockUploaderSheet(operationType);
      return;
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
    
    // Step 2: Find boundaries for selected workspace only
    if (selectedWorkspace.isAllWorkspaces) {
      // For ALL, find boundaries for each hardcoded workspace
      var workspacesWithBoundaries = [];
      for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
        var workspace = selectedWorkspace.workspaces[i];
        var workspaceWithBoundaries = findWorkspaceBoundaries(uploaderSheet, workspace.personName);
        if (workspaceWithBoundaries) {
          workspacesWithBoundaries.push(workspaceWithBoundaries);
        }
      }
      selectedWorkspace.workspaces = workspacesWithBoundaries;
    } else {
      // For single workspace, find its boundaries
      selectedWorkspace = findWorkspaceBoundaries(uploaderSheet, selectedWorkspace.personName);
      if (!selectedWorkspace) {
        SpreadsheetApp.getUi().alert('Could not find workspace boundaries for the selected person.');
        askForNextWorkspace(operationType);
        return;
      }
    }
    
    // Step 3: ONLY scan the selected workspace(s)
    var articlesInWorkspace;
    if (selectedWorkspace.isAllWorkspaces) {
      articlesInWorkspace = [];
      for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
        var workspace = selectedWorkspace.workspaces[i];
        var workspaceArticles = getArticlesInWorkspace(uploaderSheet, workspace, 'PASTE');
        articlesInWorkspace = articlesInWorkspace.concat(workspaceArticles);
      }
    } else {
      articlesInWorkspace = getArticlesInWorkspace(uploaderSheet, selectedWorkspace, 'PASTE');
    }
    
    if (articlesInWorkspace.length === 0) {
      SpreadsheetApp.getUi().alert('No articles found that need section pasting in the selected workspace(s).');
      askForNextWorkspace(operationType);
      return;
    }
    
    // Step 4: Show plan and process
    if (!showSingleWorkspacePlan(selectedWorkspace, articlesInWorkspace)) {
      askForNextWorkspace(operationType);
      return;
    }
    
    var result = processSingleWorkspace(selectedWorkspace, articlesInWorkspace);
    showResultsAndAskNext(result, operationType);
    
  } catch (error) {
    Logger.log('Error in processWorkspaceLoop: ' + error.message);
    unlockUploaderSheet(operationType);
    SpreadsheetApp.getUi().alert('Error: ' + error.message);
  }
}

function selectSingleWorkspace() {
  // HARDCODED workspace names for speed
  var hardcodedWorkspaces = [
    'JAMIE',
    'CHARL',
    'LARA',
    'SHAYNE',
    'NAINTARA',
    'KARL',
    'MARIE'
  ];
  
  var workspaceList = "0. ALL WORKSPACES\n";
  for (var i = 0; i < hardcodedWorkspaces.length; i++) {
    workspaceList += (i + 1) + ". " + hardcodedWorkspaces[i] + "\n";
  }
  
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Choose Workspace to Process',
    'Select ONE workspace to process:\n\n' + 
    workspaceList + '\n' +
    'Enter a single number:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null; // User cancelled
  }
  
  var choice = parseInt(response.getResponseText().trim());
  
  if (choice === 0) {
    // Return special "ALL" workspace object with hardcoded names
    var allWorkspaces = [];
    for (var i = 0; i < hardcodedWorkspaces.length; i++) {
      allWorkspaces.push({
        personName: hardcodedWorkspaces[i],
        startRow: null,
        endRow: null
      });
    }
    
    return {
      personName: 'ALL WORKSPACES',
      isAllWorkspaces: true,
      workspaces: allWorkspaces
    };
  } else if (choice >= 1 && choice <= hardcodedWorkspaces.length) {
    return {
      personName: hardcodedWorkspaces[choice - 1],
      startRow: null,
      endRow: null
    };
  } else {
    ui.alert('Invalid selection. Please enter a valid number.');
    return selectSingleWorkspace(); // Try again
  }
}



function findWorkspaceBoundaries(uploaderSheet, personName) {
  var lastRow = uploaderSheet.getLastRow();
  var startRow = null;
  var endRow = null;
  
  Logger.log('🔍 Finding boundaries for: "' + personName + '"');
  
  try {
    // Find the person's header row
    for (var row = 1; row <= lastRow; row++) {
      var cellA = uploaderSheet.getRange(row, 1);
      
      if (cellA.isPartOfMerge()) {
        var mergedRange = cellA.getMergedRanges()[0];
        
        // Check if it's a person header (13 columns wide)
        if (mergedRange.getRow() === row && mergedRange.getNumColumns() === 13) {
          var cellValue = mergedRange.getValue();
          
          if (cellValue) {
            var cellValueStr = cellValue.toString().trim();
            Logger.log('Found 13-column header at row ' + row + ': "' + cellValueStr + '"');
            
            // CASE-INSENSITIVE matching
            if (cellValueStr.toLowerCase().includes(personName.toLowerCase()) && 
                !cellValueStr.toUpperCase().includes('END ROW')) {
              startRow = row + 1;
              Logger.log('📍 Found ' + personName + ' header at row ' + row + ', startRow = ' + startRow);
              break;
            }
          }
        }
      }
    }
    
    if (!startRow) {
      Logger.log('❌ Could not find header for "' + personName + '" in sheet');
      return null;
    }
    
    // Find the END ROW for this person
    for (var row = startRow; row <= lastRow; row++) {
      var cellA = uploaderSheet.getRange(row, 1);
      
      if (cellA.isPartOfMerge()) {
        var mergedRange = cellA.getMergedRanges()[0];
        
        if (mergedRange.getRow() === row && mergedRange.getNumColumns() === 13) {
          var cellValue = mergedRange.getValue();
          
          if (cellValue) {
            var cellValueStr = cellValue.toString().trim();
            Logger.log('Found 13-column header at row ' + row + ': "' + cellValueStr + '"');
            
            if (cellValueStr.toUpperCase().includes('END ROW')) {
              endRow = row;
              Logger.log('📍 Found END ROW for ' + personName + ' at row ' + row);
              break;
            }
          }
        }
      }
    }
    
    var result = {
      personName: personName,
      startRow: startRow,
      endRow: endRow || lastRow
    };
    
    Logger.log('✅ Workspace boundaries for ' + personName + ': rows ' + startRow + ' to ' + (endRow || lastRow));
    return result;
    
  } catch (error) {
    Logger.log('❌ ERROR in findWorkspaceBoundaries for "' + personName + '": ' + error.message);
    Logger.log('Error stack: ' + error.stack);
    return null;
  }
}




function showSingleWorkspacePlan(workspace, articles) {
  var message = '📝 PASTE SECTIONS PLAN\n\n';
  
  if (workspace.isAllWorkspaces) {
    message += '🌐 PROCESSING: ALL WORKSPACES\n';
    message += '⚠️ This will process all workspaces sequentially.\n\n';
  } else {
    message += '👤 WORKSPACE: ' + workspace.personName + '\n';
    message += '📊 Articles to process: ' + articles.length + '\n\n';
    
    message += '📋 ARTICLES FOUND:\n';
    for (var i = 0; i < Math.min(articles.length, 8); i++) {
      message += '• ' + articles[i].title + ' (Row ' + articles[i].row + ')\n';
    }
    
    if (articles.length > 8) {
      message += '... and ' + (articles.length - 8) + ' more articles\n';
    }
  }
  
  message += '\n🔄 PROCESSING:\n';
  message += '• Extract sections from Google Docs\n';
  message += '• Place URLs from ### headings in column B\n';
  message += '• Create structured slides\n';
  message += '• Update article status\n\n';
  
  message += 'Continue with this workspace?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Workspace Processing Plan',
    message,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  return response === SpreadsheetApp.getUi().Button.YES;
}

function processSingleWorkspace(workspace, articles) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var processed = 0;
  var errors = 0;
  
  Logger.log('🔄 PROCESSING WORKSPACE: ' + workspace.personName + ' (' + articles.length + ' articles)');
  
  if (workspace.isAllWorkspaces) {
    // Process all workspaces sequentially
    for (var i = 0; i < workspace.workspaces.length; i++) {
      var singleWorkspace = workspace.workspaces[i];
      var workspaceArticles = getArticlesInWorkspace(uploaderSheet, singleWorkspace, 'PASTE');
      
      if (workspaceArticles.length > 0) {
        Logger.log('🔄 PROCESSING: ' + singleWorkspace.personName + ' (' + workspaceArticles.length + ' articles)');
        var workspaceResult = processArticlesInWorkspace(singleWorkspace, workspaceArticles);
        processed += workspaceResult.processed;
        errors += workspaceResult.errors;
      }
    }
  } else {
    // Process single workspace
    var result = processArticlesInWorkspace(workspace, articles);
    processed = result.processed;
    errors = result.errors;
  }
  
  return {
    workspaceName: workspace.personName,
    processed: processed,
    errors: errors,
    totalArticles: articles.length
  };
}

function processArticlesInWorkspace(workspace, articles) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var processed = 0;
  var errors = 0;
  
  Logger.log('🔄 PROCESSING WORKSPACE: ' + workspace.personName + ' (' + articles.length + ' articles)');
  
  // SORT ARTICLES BY ROW NUMBER IN DESCENDING ORDER (bottom to top)
  articles.sort(function(a, b) {
    return b.row - a.row; // Higher row numbers first
  });
  
  Logger.log('📋 Processing order (bottom to top):');
  for (var i = 0; i < articles.length; i++) {
    Logger.log('  ' + (i+1) + '. ' + articles[i].title + ' (Row ' + articles[i].row + ')');
  }
  
  // Process each article from bottom to top (no re-scanning needed!)
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    
    try {
      Logger.log('📝 PROCESSING: ' + article.title + ' (Row ' + article.row + ')');
      
      // Create mock event and process
      var mockEvent = {
        range: uploaderSheet.getRange(article.row, 12),
        value: 'Paste Article Sections'
      };
      
      // Store status before processing
      var statusBefore = uploaderSheet.getRange(article.row, 12).getValue();
      
      // Process the paste
      pasteArticleSections(mockEvent);
      
      // Check if successful
      var newStatus = uploaderSheet.getRange(article.row, 12).getValue();
      
      if (newStatus !== statusBefore && !newStatus.startsWith('Error:')) {
        processed++;
        Logger.log('✅ SUCCESS: ' + article.title + ' (New status: ' + newStatus + ')');
      } else {
        errors++;
        Logger.log('❌ FAILED: ' + article.title + ' (Status: ' + newStatus + ')');
      }
      
      // Shorter delay since we don't need to re-scan
      Utilities.sleep(1000);
      SpreadsheetApp.flush();
      
    } catch (error) {
      errors++;
      Logger.log('❌ ERROR: ' + article.title + ' - ' + error.message);
    }
  }
  
  return {
    processed: processed,
    errors: errors
  };
}



function showResultsAndAskNext(result, operationType) {
  var resultMessage = '✅ WORKSPACE PROCESSING COMPLETE!\n\n';
  resultMessage += '👤 Workspace: ' + result.workspaceName + '\n';
  resultMessage += '✅ Successfully processed: ' + result.processed + ' articles\n';
  
  if (result.errors > 0) {
    resultMessage += '❌ Errors: ' + result.errors + ' articles\n';
  }
  
  if (result.processed > 0) {
    resultMessage += '\n🎉 Articles have been converted to slides!\n';
    resultMessage += '📌 URLs from ### headings are in column B.\n';
  }
  
  resultMessage += '\n' + '='.repeat(40) + '\n';
  resultMessage += 'Would you like to process another workspace?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Processing Complete',
    resultMessage,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    // Continue with next workspace
    processWorkspaceLoop(operationType);
  } else {
    // User wants to exit
    unlockUploaderSheet(operationType);
    SpreadsheetApp.getUi().alert('All done! The sheet is now unlocked.');
  }
}

function askForNextWorkspace(operationType) {
  var response = SpreadsheetApp.getUi().alert(
    'No Articles Found',
    'Would you like to try another workspace?',
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    processWorkspaceLoop(operationType);
  } else {
    unlockUploaderSheet(operationType);
  }
}





// =============================================================================
// BATCH UPLOAD TO WORDPRESS
// =============================================================================

function batchUploadToWordPress() {
  var operationType = 'Batch Upload to WordPress';
  
  // Check if sheet is locked
  if (!checkUploaderLock(operationType)) {
    return;
  }
  
  // Start the workspace selection loop (same as batchPaste)
  processWordPressUploadWorkspaceLoop(operationType);
}

function processWordPressUploadWorkspaceLoop(operationType) {
  try {
    // Step 1: Ask user to choose workspace (uses hardcoded list)
    var selectedWorkspace = selectSingleWorkspaceForWordPress(); 
    
    if (!selectedWorkspace) {
      unlockUploaderSheet(operationType);
      return;
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
    
    // Step 2: Find boundaries for selected workspace only
    if (selectedWorkspace.isAllWorkspaces) {
      // For ALL, find boundaries for each hardcoded workspace
      var workspacesWithBoundaries = [];
      for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
        var workspace = selectedWorkspace.workspaces[i];
        var workspaceWithBoundaries = findWorkspaceBoundaries(uploaderSheet, workspace.personName);
        if (workspaceWithBoundaries) {
          workspacesWithBoundaries.push(workspaceWithBoundaries);
        }
      }
      selectedWorkspace.workspaces = workspacesWithBoundaries;
    } else {
      // For single workspace, find its boundaries
      selectedWorkspace = findWorkspaceBoundaries(uploaderSheet, selectedWorkspace.personName);
      if (!selectedWorkspace) {
        SpreadsheetApp.getUi().alert('Could not find workspace boundaries for the selected person.');
        askForNextWordPressWorkspace(operationType);
        return;
      }
    }
    
    // Step 3: ONLY scan the selected workspace(s) for articles to upload
    var articlesInWorkspace;
    if (selectedWorkspace.isAllWorkspaces) {
      articlesInWorkspace = [];
      for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
        var workspace = selectedWorkspace.workspaces[i];
        var workspaceArticles = getArticlesForWordPressUpload(uploaderSheet, workspace);
        articlesInWorkspace = articlesInWorkspace.concat(workspaceArticles);
      }
    } else {
      articlesInWorkspace = getArticlesForWordPressUpload(uploaderSheet, selectedWorkspace);
    }
    
    if (articlesInWorkspace.length === 0) {
  SpreadsheetApp.getUi().alert('No articles found with "Ready for WordPress" status in the selected workspace(s).');
  askForNextWordPressWorkspace(operationType);
  return;
}
    
    // Step 4: Show plan and process
    if (!showSingleWorkspaceWordPressPlan(selectedWorkspace, articlesInWorkspace)) {
      askForNextWordPressWorkspace(operationType);
      return;
    }
    
    var result = processSingleWorkspaceWordPress(selectedWorkspace, articlesInWorkspace);
    showWordPressResultsAndAskNext(result, operationType);
    
  } catch (error) {
    Logger.log('Error in processWordPressUploadWorkspaceLoop: ' + error.message);
    unlockUploaderSheet(operationType);
    SpreadsheetApp.getUi().alert('Error: ' + error.message);
  }
}

function selectSingleWorkspaceForWordPress() {
  // HARDCODED workspace names for speed (same as batchPaste)
  var hardcodedWorkspaces = [
    'JAMIE',
    'CHARL',
    'LARA',
    'SHAYNE',
    'NAINTARA',
    'KARL',
    'MARIE'
  ];
  
  var workspaceList = "0. ALL WORKSPACES\n";
  for (var i = 0; i < hardcodedWorkspaces.length; i++) {
    workspaceList += (i + 1) + ". " + hardcodedWorkspaces[i] + "\n";
  }
  
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Choose Workspace for WordPress Upload',
    'Select YOUR workspace to upload to WordPress:\n\n' + 
    workspaceList + '\n' +
    'Enter a single number:\n\n' +
    '⚠️ WARNING: This will upload articles one at a time with 10-second delays.',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null; // User cancelled
  }
  
  var choice = parseInt(response.getResponseText().trim());
  
  if (choice === 0) {
    // Return special "ALL" workspace object with hardcoded names
    var allWorkspaces = [];
    for (var i = 0; i < hardcodedWorkspaces.length; i++) {
      allWorkspaces.push({
        personName: hardcodedWorkspaces[i],
        startRow: null,
        endRow: null
      });
    }
    
    return {
      personName: 'ALL WORKSPACES',
      isAllWorkspaces: true,
      workspaces: allWorkspaces
    };
  } else if (choice >= 1 && choice <= hardcodedWorkspaces.length) {
    return {
      personName: hardcodedWorkspaces[choice - 1],
      startRow: null,
      endRow: null
    };
  } else {
    ui.alert('Invalid selection. Please enter a valid number.');
    return selectSingleWorkspaceForWordPress(); // Try again
  }
}

// Find articles with "Ready for WordPress" status in a workspace
function getArticlesForWordPressUpload(uploaderSheet, workspace) {
  var articles = [];
  var processedTitles = {}; // Track processed article titles to prevent duplicates
  var endRow = workspace.endRow || uploaderSheet.getLastRow();

  Logger.log('🔍 SCANNING WORKSPACE: ' + workspace.personName + ' for WordPress upload targets');

  for (var row = workspace.startRow; row < endRow; row++) {
    var cellA = uploaderSheet.getRange(row, 1);

    if (cellA.isPartOfMerge()) {
      var mergedRange = cellA.getMergedRanges()[0];

      // Check if it's an article title (11 columns wide)
      if (mergedRange.getRow() === row && mergedRange.getNumColumns() === 11) {
        var articleTitle = mergedRange.getValue();
        var status = uploaderSheet.getRange(row, 12).getValue();

        // ONLY process articles with "Ready for WordPress" status
        if (articleTitle && articleTitle.toString().trim() !== '' &&
            status === 'Ready for WordPress') {

          var trimmedTitle = articleTitle.toString().trim();

          // Check if this article title has already been added
          if (processedTitles[trimmedTitle]) {
            Logger.log('⚠️ DUPLICATE DETECTED - SKIPPING: ' + trimmedTitle + ' (Row ' + row + ') - Already queued from Row ' + processedTitles[trimmedTitle]);
            continue; // Skip this duplicate
          }

          // Mark this title as processed
          processedTitles[trimmedTitle] = row;

          articles.push({
            title: trimmedTitle,
            row: row,
            status: status,
            workspace: workspace.personName
          });
          Logger.log('🚀 FOUND UPLOAD TARGET: ' + trimmedTitle + ' (Row ' + row + ')');
        }
        // Log skipped articles for transparency
        else if (articleTitle && status !== 'Ready for WordPress') {
          Logger.log('⏭️ SKIPPING: ' + articleTitle + ' (Row ' + row + ', Status: ' + status + ')');
        }
      }
    }
  }

  workspace.articles = articles;
  return articles;
}

function showSingleWorkspaceWordPressPlan(workspace, articles) {
  var estimatedMinutes = Math.ceil((articles.length * 25) / 60); // 25 seconds per article (15s processing + 10s delay)
  
  var message = '🚀 WORDPRESS UPLOAD PLAN\n\n';
  
  if (workspace.isAllWorkspaces) {
    message += '🌐 PROCESSING: ALL WORKSPACES\n';
    message += '⚠️ This will process all workspaces sequentially.\n\n';
  } else {
    message += '👤 WORKSPACE: ' + workspace.personName + '\n';
    message += '📊 Articles to upload: ' + articles.length + '\n';
    message += '⏱️ Estimated time: ~' + estimatedMinutes + ' minutes\n';
    message += '🐌 Processing: ONE AT A TIME (10-second delays)\n\n';
    
    message += '📋 ARTICLES FOUND (Only "Ready for WordPress" status):\n';
    for (var i = 0; i < Math.min(articles.length, 8); i++) {
      message += '• ' + articles[i].title + '\n';
    }
    
    if (articles.length > 8) {
      message += '... and ' + (articles.length - 8) + ' more articles\n';
    }
  }
  
  message += '\n🔄 PROCESSING (Sequential):\n';
  message += '• Upload images to WordPress media library\n';
  message += '• Create slideshow content with metadata\n';
  message += '• Apply tags and find related articles\n';
  message += '• Create WordPress draft posts\n';
  message += '• 10-second delay between each article\n';
  message += '• Continue processing even if one article fails\n\n';
  
  message += '⚠️ REQUIREMENTS:\n';
  message += '• Articles must have "Ready for WordPress" status\n';
  message += '• Do NOT close this browser tab during processing\n';
  message += '• Failed uploads will be marked with error status\n';
  message += '• Successful uploads will be marked "Successful WP Upload"\n\n';
  
  message += 'Continue with sequential WordPress upload?';
  
  var response = SpreadsheetApp.getUi().alert(
    'WordPress Upload Processing Plan',
    message,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  return response === SpreadsheetApp.getUi().Button.YES;
}



function processSingleWorkspaceWordPress(workspace, articles) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var successful = 0;
  var errors = 0;
  var errorDetails = [];
  
  Logger.log('🚀 PROCESSING WORKSPACE: ' + workspace.personName + ' (' + articles.length + ' articles)');
  
  if (workspace.isAllWorkspaces) {
    // Process all workspaces sequentially
    for (var i = 0; i < workspace.workspaces.length; i++) {
      var singleWorkspace = workspace.workspaces[i];
      var workspaceArticles = getArticlesForWordPressUpload(uploaderSheet, singleWorkspace);
      
      if (workspaceArticles.length > 0) {
        Logger.log('🚀 PROCESSING: ' + singleWorkspace.personName + ' (' + workspaceArticles.length + ' articles)');
        var workspaceResult = processWordPressArticlesInWorkspace(singleWorkspace, workspaceArticles);
        successful += workspaceResult.successful;
        errors += workspaceResult.errors;
        errorDetails = errorDetails.concat(workspaceResult.errorDetails);
      }
    }
  } else {
    // Process single workspace
    var result = processWordPressArticlesInWorkspace(workspace, articles);
    successful = result.successful;
    errors = result.errors;
    errorDetails = result.errorDetails;
  }
  
  return {
    workspaceName: workspace.personName,
    successful: successful,
    errors: errors,
    errorDetails: errorDetails,
    totalArticles: articles.length
  };
}

function processWordPressArticlesInWorkspace(workspace, articles) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var successful = 0;
  var errors = 0;
  var errorDetails = [];
  
  Logger.log('🚀 PROCESSING WORKSPACE: ' + workspace.personName + ' (' + articles.length + ' articles)');
  Logger.log('📊 SEQUENTIAL PROCESSING: One article at a time with 10-second delays');
  
  // Process each article sequentially
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var articleRow = article.row;
    var articleTitle = article.title;
    
    Logger.log('🚀 PROCESSING ARTICLE ' + (i + 1) + ' of ' + articles.length + ': ' + articleTitle + ' (Row ' + articleRow + ')');
    
    try {
      // Update status to show processing
      uploaderSheet.getRange(articleRow, 12).setValue('Uploading... (' + (i + 1) + '/' + articles.length + ')');
      SpreadsheetApp.flush();
      
      // Create mock event and process using existing uploadToWordPress function
      var mockEvent = {
        range: uploaderSheet.getRange(articleRow, 12),
        value: 'Proceed with WP Upload'
      };
      
      // Store status before processing
      var statusBefore = uploaderSheet.getRange(articleRow, 12).getValue();
      
      // Process the upload using existing function
      uploadToWordPress(mockEvent);
      
      // Check if successful (allow a moment for the function to complete)
      Utilities.sleep(2000);
      var newStatus = uploaderSheet.getRange(articleRow, 12).getValue();
      
      if (newStatus === 'Successful WP Upload') {
        successful++;
        Logger.log('✅ SUCCESS: ' + articleTitle + ' uploaded successfully');
      } else if (newStatus && newStatus.startsWith('Error:')) {
        errors++;
        errorDetails.push({
          title: articleTitle,
          error: newStatus
        });
        Logger.log('❌ FAILED: ' + articleTitle + ' - ' + newStatus);
      } else if (newStatus === 'Upload Failed - Images') {
        errors++;
        errorDetails.push({
          title: articleTitle,
          error: 'Image upload failed'
        });
        Logger.log('❌ FAILED: ' + articleTitle + ' - Image upload failed');
      } else {
        // Unexpected status - treat as error
        errors++;
        errorDetails.push({
          title: articleTitle,
          error: 'Unexpected status: ' + newStatus
        });
        Logger.log('❌ FAILED: ' + articleTitle + ' - Unexpected status: ' + newStatus);
      }
      
    } catch (error) {
      errors++;
      var errorMessage = 'Exception: ' + error.message;
      errorDetails.push({
        title: articleTitle,
        error: errorMessage
      });
      Logger.log('❌ ERROR: ' + articleTitle + ' - ' + errorMessage);
      
      // Set error status on the sheet
      uploaderSheet.getRange(articleRow, 12).setValue('Error: ' + error.message);
    }
    
    // Force save after each article
    SpreadsheetApp.flush();
    
    // 10-second delay between articles (except for the last one)
    if (i < articles.length - 1) {
      Logger.log('⏳ Waiting 10 seconds before next article...');
      Utilities.sleep(10000); // 10 seconds
    }
  }
  
  return {
    successful: successful,
    errors: errors,
    errorDetails: errorDetails
  };
}

function showWordPressResultsAndAskNext(result, operationType) {
  var resultMessage = '🚀 WORDPRESS UPLOAD COMPLETE!\n\n';
  resultMessage += '👤 Workspace: ' + result.workspaceName + '\n';
  resultMessage += '✅ Successfully uploaded: ' + result.successful + ' articles\n';
  
  if (result.errors > 0) {
    resultMessage += '❌ Failed uploads: ' + result.errors + ' articles\n\n';
    
    resultMessage += '📋 FAILED ARTICLES:\n';
    for (var i = 0; i < Math.min(result.errorDetails.length, 5); i++) {
      var error = result.errorDetails[i];
      resultMessage += '• ' + error.title + ': ' + error.error + '\n';
    }
    
    if (result.errorDetails.length > 5) {
      resultMessage += '... and ' + (result.errorDetails.length - 5) + ' more errors (check sheet for details)\n';
    }
  }
  
  if (result.successful > 0) {
    resultMessage += '\n🎉 Successful articles now have WordPress draft posts!\n';
    resultMessage += '📌 Check the Article Status Tracker for WordPress URLs.\n';
  }
  
  if (result.errors > 0) {
    resultMessage += '\n⚠️ Failed articles can be retried later.\n';
  }
  
  resultMessage += '\n' + '='.repeat(40) + '\n';
  resultMessage += 'Would you like to process another workspace?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Processing Complete',
    resultMessage,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    // Continue with next workspace
    processWordPressUploadWorkspaceLoop(operationType);
  } else {
    // User wants to exit
    unlockUploaderSheet(operationType);
    SpreadsheetApp.getUi().alert('All done! The sheet is now unlocked.');
  }
}

function askForNextWordPressWorkspace(operationType) {
  var response = SpreadsheetApp.getUi().alert(
    'No Articles Found',
    'Would you like to try another workspace?',
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    processWordPressUploadWorkspaceLoop(operationType);
  } else {
    unlockUploaderSheet(operationType);
  }
}

function lockUploaderSheet(operationType) {
  var props = PropertiesService.getScriptProperties();
  var currentLock = props.getProperty('UPLOADER_SHEET_LOCKED');
  
  if (currentLock) {
    throw new Error('Uploader sheet is currently locked by: ' + currentLock);
  }
  
  props.setProperty('UPLOADER_SHEET_LOCKED', operationType);
  props.setProperty('UPLOADER_LOCK_TIME', new Date().getTime().toString());
  Logger.log('Uploader sheet locked by: ' + operationType);
  
  // Update the status display in the sheet
  updateLockStatusInSheet(operationType);
}

function unlockUploaderSheet(operationType) {
  var props = PropertiesService.getScriptProperties();
  var currentLock = props.getProperty('UPLOADER_SHEET_LOCKED');
  
  if (currentLock === operationType) {
    props.deleteProperty('UPLOADER_SHEET_LOCKED');
    props.deleteProperty('UPLOADER_LOCK_TIME');
    Logger.log('Uploader sheet unlocked by: ' + operationType);
    
    // Update the status display in the sheet
    updateLockStatusInSheet(null);
  }
}

function forceUnlockUploaderSheet() {
  var currentLock = isUploaderSheetLocked();
  
  if (!currentLock) {
    SpreadsheetApp.getUi().alert('No Lock Found', 'The sheet is already unlocked!', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  var response = SpreadsheetApp.getUi().alert(
    '⚠️ Force Unlock Confirmation',
    'Current lock: "' + currentLock + '"\n\n' +
    '⚠️ WARNING: Only use this if the operation has been stuck for over 30 minutes.\n\n' +
    'Force unlock the sheet?',
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    var props = PropertiesService.getScriptProperties();
    props.deleteProperty('UPLOADER_SHEET_LOCKED');
    props.deleteProperty('UPLOADER_LOCK_TIME');
    
    // Update the status display in the sheet
    updateLockStatusInSheet(null);
    
    SpreadsheetApp.getUi().alert('✅ Sheet Unlocked!', 'The uploader sheet has been force unlocked and is now available.', SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/*Usage workflow:

Set status to "Add URLs" in column G
Paste your URLs (one per line) in column H
Click "Validate No. of #" - this counts and validates
Fix any errors (add/remove URLs as needed)
Click "Replace All ###" - this does the actual replacement
Articles get "You Can Work on This Now" status when complete

The validation step ensures everything is perfect before doing any document changes! 🎯*/

// =============================================================================
// BATCH URL VALIDATION AND REPLACEMENT FUNCTIONS
// =============================================================================

// PHASE 1: Batch count and validate all rows
function batchCountAndValidateURLs() {
  var maxProcessTime = 4 * 60 * 1000; // 4 minutes max
  var startTime = new Date().getTime();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  
  if (!statusSheet) {
    SpreadsheetApp.getUi().alert('Article Status Tracker sheet not found');
    return;
  }
  
  // Get all data at once
  var lastRow = statusSheet.getLastRow();
  var allData = statusSheet.getRange(2, 1, lastRow - 1, 8).getValues();
  
  var processed = 0;
  var readyCount = 0;
  var errorCount = 0;
  
  Logger.log('Starting batch count validation...');
  
  for (var i = 0; i < allData.length; i++) {
    // Check time limit
    if (new Date().getTime() - startTime > maxProcessTime) {
      Logger.log('Time limit reached during counting. Processed: ' + processed + ' rows');
      SpreadsheetApp.getUi().alert('Time limit reached. Processed ' + processed + ' rows. Run again to continue.');
      return;
    }
    
    var rowData = allData[i];
    var actualRow = i + 2;
    var status = rowData[6] ? rowData[6].toString().trim() : '';
    var docUrl = rowData[3];
    var urlList = rowData[7];
    
    // Only process rows with "Add URLs" status
    if (status !== 'Add URLs') {
      continue;
    }
    
    processed++;
    Logger.log('Counting row ' + actualRow + '...');
    
    try {
      var countResult = countURLsAndSections(docUrl, urlList);
      
      if (countResult.success) {
        if (countResult.sectionsCount === countResult.urlsCount) {
          // Perfect match - ready for replacement
          statusSheet.getRange(actualRow, 7).setValue('Ready for URL Replacement');
          readyCount++;
          Logger.log('✅ Row ' + actualRow + ': ' + countResult.sectionsCount + ' sections = ' + countResult.urlsCount + ' URLs - READY');
        } else if (countResult.urlsCount < countResult.sectionsCount) {
          // Not enough URLs
          var needed = countResult.sectionsCount - countResult.urlsCount;
          statusSheet.getRange(actualRow, 7).setValue('Error: Need ' + needed + ' more URLs');
          errorCount++;
          Logger.log('❌ Row ' + actualRow + ': Need ' + needed + ' more URLs');
        } else {
          // Too many URLs
          var extra = countResult.urlsCount - countResult.sectionsCount;
          statusSheet.getRange(actualRow, 7).setValue('Error: ' + extra + ' extra URLs');
          errorCount++;
          Logger.log('❌ Row ' + actualRow + ': ' + extra + ' extra URLs');
        }
      } else {
        statusSheet.getRange(actualRow, 7).setValue(countResult.errorMessage);
        errorCount++;
        Logger.log('❌ Row ' + actualRow + ': ' + countResult.errorMessage);
      }
      
    } catch (error) {
      statusSheet.getRange(actualRow, 7).setValue('Error: Retry URLs');
      errorCount++;
      Logger.log('❌ Row ' + actualRow + ' error: ' + error.message);
    }
    
    Utilities.sleep(50); // Small delay
  }
  
  var message = 'Validate No. of # Complete!\n\n' +
                'Processed: ' + processed + '\n' +
                'Ready for replacement: ' + readyCount + '\n' +  
                'Errors to fix: ' + errorCount + '\n\n' +
                (readyCount > 0 ? 'Ready rows can now use "Replace All ###"' : 'Fix errors first, then run validation again');
  Logger.log(message);
  SpreadsheetApp.getUi().alert(message);
}

// PHASE 2: Batch replace URLs (only validated rows)
function batchReplaceValidatedURLs() {
  var maxProcessTime = 4 * 60 * 1000;
  var startTime = new Date().getTime();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  
  if (!statusSheet) {
    SpreadsheetApp.getUi().alert('Article Status Tracker sheet not found');
    return;
  }
  
  var lastRow = statusSheet.getLastRow();
  var allData = statusSheet.getRange(2, 1, lastRow - 1, 8).getValues();
  
  var processed = 0;
  var success = 0;
  var errors = 0;
  
  Logger.log('Starting batch URL replacement for validated rows...');
  
  for (var i = 0; i < allData.length; i++) {
    if (new Date().getTime() - startTime > maxProcessTime) {
      Logger.log('Time limit reached during replacement. Processed: ' + processed + ' rows');
      SpreadsheetApp.getUi().alert('Time limit reached. Processed ' + processed + ' rows. Run again to continue.');
      return;
    }
    
    var rowData = allData[i];
    var actualRow = i + 2;
    var status = rowData[6] ? rowData[6].toString().trim() : '';
    var docUrl = rowData[3];
    var urlList = rowData[7];
    
    // Only process rows that are ready for replacement
    if (status !== 'Ready for URL Replacement') {
      continue;
    }
    
    processed++;
    Logger.log('Replacing URLs in row ' + actualRow + '...');
    
    try {
      var replaceResult = replaceURLsInDoc(docUrl, urlList);
      
      if (replaceResult.success) {
        statusSheet.getRange(actualRow, 7).setValue('You Can Work on This Now');
        success++;
        Logger.log('✅ Row ' + actualRow + ' URLs replaced successfully');
      } else {
        statusSheet.getRange(actualRow, 7).setValue(replaceResult.errorMessage);
        errors++;
        Logger.log('❌ Row ' + actualRow + ' failed: ' + replaceResult.errorMessage);
      }
      
    } catch (error) {
      statusSheet.getRange(actualRow, 7).setValue('Error: Retry URLs');
      errors++;
      Logger.log('❌ Row ' + actualRow + ' error: ' + error.message);
    }
    
    Utilities.sleep(100);
  }
  
  var message = 'Replace All ### Complete!\n\n' +
                'Processed: ' + processed + '\n' +
                'Success: ' + success + '\n' +
                'Errors: ' + errors + '\n\n' +
                (success > 0 ? 'Successful articles now have "You Can Work on This Now" status!' : '');
  Logger.log(message);
  SpreadsheetApp.getUi().alert(message);
}

// Helper: Count URLs and sections (fast, no replacement)
function countURLsAndSections(docUrl, urlList) {
  if (!docUrl || !urlList) {
    return { success: false, errorMessage: 'Error: Missing URL or doc' };
  }
  
  // Parse URLs
  var urls = urlList.toString().split('\n').map(function(url) {
    return url.trim();
  }).filter(function(url) {
    return url.length > 0;
  });
  
  if (urls.length === 0) {
    return { success: false, errorMessage: 'Error: No valid URLs found' };
  }
  
  // Extract doc ID and open document
  var docId = extractDocIdFromUrl(docUrl);
  if (!docId) {
    return { success: false, errorMessage: 'Error: Invalid doc URL' };
  }
  
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();
  
  // Fast text search for sections
  var text = body.getText();
  var matches = text.match(/### Paste URL Here/g);
  var sectionsCount = matches ? matches.length : 0;
  
  return { 
    success: true, 
    sectionsCount: sectionsCount,
    urlsCount: urls.length 
  };
}

// Helper: Replace URLs (preserving ### formatting AND yellow highlight)
function replaceURLsInDoc(docUrl, urlList) {
  var docId = extractDocIdFromUrl(docUrl);
  if (!docId) {
    return { success: false, errorMessage: 'Error: Invalid doc URL' };
  }
  
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody();
  
  var urls = urlList.toString().split('\n').map(function(url) {
    return url.trim();
  }).filter(function(url) {
    return url.length > 0;
  });
  
  // Replace URLs one by one in order, preserving all formatting
  for (var i = 0; i < urls.length; i++) {
    // Find the first occurrence of "Paste URL Here"
    var searchResult = body.findText('Paste URL Here');
    
    if (searchResult) {
      var element = searchResult.getElement();
      var startOffset = searchResult.getStartOffset();
      var endOffset = searchResult.getEndOffsetInclusive();
      var text = element.asText();
      
      // Get the original formatting to preserve it
      var originalBackgroundColor = text.getBackgroundColor(startOffset);
      var originalFontColor = text.getForegroundColor(startOffset);
      var originalFontSize = text.getFontSize(startOffset);
      var originalBold = text.isBold(startOffset);
      var originalItalic = text.isItalic(startOffset);
      
      // Replace the text
      text.deleteText(startOffset, endOffset);
      text.insertText(startOffset, urls[i]);
      
      // Reapply the original formatting to the new URL
      var newEndOffset = startOffset + urls[i].length - 1;
      text.setBackgroundColor(startOffset, newEndOffset, originalBackgroundColor); // Yellow highlight
      text.setForegroundColor(startOffset, newEndOffset, originalFontColor);
      text.setFontSize(startOffset, newEndOffset, originalFontSize);
      text.setBold(startOffset, newEndOffset, originalBold);
      text.setItalic(startOffset, newEndOffset, originalItalic);
      
      Logger.log('Replaced occurrence ' + (i + 1) + ' with: ' + urls[i] + ' (formatting preserved)');
    } else {
      Logger.log('Warning: Could not find occurrence ' + (i + 1));
      return { success: false, errorMessage: 'Error: Could not find all sections' };
    }
  }
  
  return { success: true };
}

// Helper: Extract Google Doc ID from URL
function extractDocIdFromUrl(url) {
  try {
    var match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

// SHEET LOCKING SYSTEM
function lockUploaderSheet(operationType) {
  var props = PropertiesService.getScriptProperties();
  var currentLock = props.getProperty('UPLOADER_SHEET_LOCKED');
  
  if (currentLock) {
    throw new Error('Uploader sheet is currently locked by: ' + currentLock);
  }
  
  props.setProperty('UPLOADER_SHEET_LOCKED', operationType);
  props.setProperty('UPLOADER_LOCK_TIME', new Date().getTime().toString());
  Logger.log('Uploader sheet locked by: ' + operationType);
}

function unlockUploaderSheet(operationType) {
  var props = PropertiesService.getScriptProperties();
  var currentLock = props.getProperty('UPLOADER_SHEET_LOCKED');
  
  if (currentLock === operationType) {
    props.deleteProperty('UPLOADER_SHEET_LOCKED');
    props.deleteProperty('UPLOADER_LOCK_TIME');
    Logger.log('Uploader sheet unlocked by: ' + operationType);
  }
}

function isUploaderSheetLocked() {
  var props = PropertiesService.getScriptProperties();
  var currentLock = props.getProperty('UPLOADER_SHEET_LOCKED');
  var lockTime = props.getProperty('UPLOADER_LOCK_TIME');
  
  if (currentLock) {
    var lockAge = new Date().getTime() - parseInt(lockTime || '0');
    if (lockAge > 30 * 60 * 1000) { // 30 minutes
      Logger.log('Removing stale lock: ' + currentLock);
      props.deleteProperty('UPLOADER_SHEET_LOCKED');
      props.deleteProperty('UPLOADER_LOCK_TIME');
      return null;
    }
    return currentLock;
  }
  return null;
}

function updateLockStatusInSheet(lockStatus) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
    
    if (!uploaderSheet) return; // Exit if Uploader sheet doesn't exist
    
    if (lockStatus) {
      // Sheet is locked - show lock status
      var props = PropertiesService.getScriptProperties();
      var lockTimeStamp = props.getProperty('UPLOADER_LOCK_TIME');
      var timeDisplay = '';
      
      if (lockTimeStamp) {
        var lockDate = new Date(parseInt(lockTimeStamp));
        timeDisplay = ' (Since ' + Utilities.formatDate(lockDate, Session.getScriptTimeZone(), 'HH:mm') + ')';
      }
      
      var lockMessage = '🔒 SHEET LOCKED: ' + lockStatus + timeDisplay + ' - Please wait for completion';
      
      // Update a specific cell with the lock message (adjust cell reference as needed)
      uploaderSheet.getRange('A1').setValue(lockMessage);
      uploaderSheet.getRange('A1').setBackground(CONFIG.COLORS.LIGHT_RED_ALT); // Light red background
    } else {
      // Clear the lock message when unlocked
      uploaderSheet.getRange('A1').setValue('');
      uploaderSheet.getRange('A1').setBackground(null); // Clear background
    }
  } catch (error) {
    Logger.log('Error updating lock status: ' + error.message);
  }
}

function checkUploaderLock(requestingOperation) {
  var currentLock = isUploaderSheetLocked();
  if (currentLock && currentLock !== requestingOperation) {
    
    // Enhanced user-friendly message
    var message = '🔒 SHEET IS CURRENTLY LOCKED\n\n';
    message += '⚠️ Someone is currently running a batch process:\n';
    message += '"' + currentLock + '"\n\n';
    message += '📋 What this means:\n';
    message += '• Another team member is processing articles\n';
    message += '• The sheet is protected to prevent conflicts\n';
    message += '• Your data is safe, but you need to wait\n\n';
    message += '⏰ What to do:\n';
    message += '• Wait a few minutes for them to finish\n';
    message += '• Try your batch operation again\n';
    message += '• Contact the team if this persists\n\n';
    message += '🔓 Emergency unlock: Use "Force Unlock Sheet" in the menu if needed';
    
    try {
      SpreadsheetApp.getUi().alert(
        '🔒 Sheet Locked - Please Wait', 
        message, 
        SpreadsheetApp.getUi().ButtonSet.OK
      );
    } catch (error) {
      Logger.log('Sheet lock conflict: ' + message);
    }
    return false;
  }
  return true;
}


// Show detailed lock status
function showDetailedLockStatus() {
  var currentLock = isUploaderSheetLocked();
  var props = PropertiesService.getScriptProperties();
  
  if (currentLock) {
    var lockTime = props.getProperty('UPLOADER_LOCK_TIME');
    var lockDate = new Date(parseInt(lockTime));
    var now = new Date();
    var minutesLocked = Math.floor((now.getTime() - lockDate.getTime()) / (1000 * 60));
    
    var message = '🔒 SHEET STATUS: LOCKED\n\n';
    message += '📋 Current Operation: ' + currentLock + '\n';
    message += '⏰ Started: ' + Utilities.formatDate(lockDate, Session.getScriptTimeZone(), 'MMM dd, HH:mm:ss') + '\n';
    message += '⌛ Duration: ' + minutesLocked + ' minutes\n\n';
    message += '💡 TIP: Most batch operations complete within 5-15 minutes.\n';
    message += 'If this has been locked for over 30 minutes, it may be stuck.';
    
    SpreadsheetApp.getUi().alert('🔒 Detailed Lock Status', message, SpreadsheetApp.getUi().ButtonSet.OK);
  } else {
    SpreadsheetApp.getUi().alert(
      '✅ Sheet Available', 
      'The sheet is currently unlocked and ready for batch operations!', 
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

// Show all active locks (for future expansion)
function showAllActiveLocks() {
  var props = PropertiesService.getScriptProperties();
  var allProperties = props.getProperties();
  var activeLocks = [];
  
  for (var key in allProperties) {
    if (key.includes('_LOCKED')) {
      activeLocks.push({
        operation: allProperties[key],
        startTime: allProperties[key + '_TIME'] || 'Unknown'
      });
    }
  }
  
  if (activeLocks.length === 0) {
    SpreadsheetApp.getUi().alert('No Active Locks', 'All systems are currently available!', SpreadsheetApp.getUi().ButtonSet.OK);
  } else {
    var message = '🔒 ACTIVE LOCKS:\n\n';
    for (var i = 0; i < activeLocks.length; i++) {
      var lock = activeLocks[i];
      var lockDate = new Date(parseInt(lock.startTime));
      message += '• ' + lock.operation + ' (Since ' + 
                 Utilities.formatDate(lockDate, Session.getScriptTimeZone(), 'HH:mm') + ')\n';
    }
    SpreadsheetApp.getUi().alert('Active Locks', message, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

// Enhanced force unlock with confirmation
function forceUnlockUploaderSheet() {
  var currentLock = isUploaderSheetLocked();
  
  if (!currentLock) {
    SpreadsheetApp.getUi().alert('No Lock Found', 'The sheet is already unlocked!', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }
  
  var response = SpreadsheetApp.getUi().alert(
    '⚠️ Force Unlock Confirmation',
    'Current lock: "' + currentLock + '"\n\n' +
    '⚠️ WARNING: Only use this if:\n' +
    '• The operation has been stuck for over 30 minutes\n' +
    '• You are sure no one else is actively processing\n' +
    '• You understand this may cause data conflicts\n\n' +
    'Force unlock the sheet?',
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    var props = PropertiesService.getScriptProperties();
    props.deleteProperty('UPLOADER_SHEET_LOCKED');
    props.deleteProperty('UPLOADER_LOCK_TIME');
    SpreadsheetApp.getUi().alert('✅ Sheet Unlocked!', 'The uploader sheet has been force unlocked and is now available.', SpreadsheetApp.getUi().ButtonSet.OK);
    
    // Refresh the menu to show new status
    onOpen();
  }
}


function forceUnlockUploaderSheet() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty('UPLOADER_SHEET_LOCKED');
  props.deleteProperty('UPLOADER_LOCK_TIME');
  SpreadsheetApp.getUi().alert('Uploader sheet force unlocked!');
}

// WORKSPACE STRUCTURE DETECTION
function getWorkspaceStructure() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var lastRow = uploaderSheet.getLastRow();
  var workspaces = [];
  
  Logger.log('🔍 ANALYZING WORKSPACE STRUCTURE...');
  
  for (var row = 1; row <= lastRow; row++) {
    var cellA = uploaderSheet.getRange(row, 1);
    
    if (cellA.isPartOfMerge()) {
      var mergedRange = cellA.getMergedRanges()[0];
      
      // Check if it's a person header (13 columns wide)
      if (mergedRange.getRow() === row && mergedRange.getNumColumns() === 13) {
        var cellValue = mergedRange.getValue();
        
        if (cellValue && cellValue.toString().toUpperCase().includes('END ROW')) {
          // This is an END ROW - mark the end of the previous workspace
          if (workspaces.length > 0) {
            workspaces[workspaces.length - 1].endRow = row;
            Logger.log('📍 END ROW found for ' + workspaces[workspaces.length - 1].personName + ' at row ' + row);
          }
        } else if (cellValue && cellValue.toString().trim() !== '') {
          // This is a person header
          var workspace = {
            personName: cellValue.toString().trim(),
            headerRow: row,
            startRow: row + 1,
            endRow: null, // Will be set when we find the END ROW
            articles: []
          };
          workspaces.push(workspace);
          Logger.log('👤 PERSON WORKSPACE: ' + workspace.personName + ' starts at row ' + row);
        }
      }
    }
  }
  
  Logger.log('🔍 WORKSPACE ANALYSIS COMPLETE: Found ' + workspaces.length + ' workspaces');
  return workspaces;
}





function getArticlesInWorkspace(uploaderSheet, workspace, operationType) {
  var articles = [];
  var statusSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  var statusData = statusSheet.getRange("C:G").getValues();
  
  Logger.log('🔍 SCANNING WORKSPACE: ' + workspace.personName + ' (Rows ' + workspace.startRow + ' to ' + (workspace.endRow || 'end') + ')');
  
  var endRow = workspace.endRow || uploaderSheet.getLastRow();
  
  for (var row = workspace.startRow; row < endRow; row++) {
    var cellA = uploaderSheet.getRange(row, 1);
    
    if (cellA.isPartOfMerge()) {
      var mergedRange = cellA.getMergedRanges()[0];
      
      // Check if it's an article title (11 columns wide)
      if (mergedRange.getRow() === row && mergedRange.getNumColumns() === 11) {
        var articleTitle = mergedRange.getValue();
        var status = uploaderSheet.getRange(row, 12).getValue();
        
        if (articleTitle && articleTitle.toString().trim() !== '') {
          var article = {
            title: articleTitle.toString().trim(),
            row: row,
            status: status,
            workspace: workspace.personName
          };
          
          // UPDATED: Only process specific statuses for PASTE operation
          if (operationType === 'PASTE') {
            // Check if status is one of the allowed values
            var allowedStatuses = ['_', '', 'GDrive Folder is Ready'];
            var currentStatus = status ? status.toString().trim() : '';
            
            if (allowedStatuses.includes(currentStatus) || currentStatus === '') {
              // Check if it has Google Doc URL in Article Status Tracker
              var articleInfo = findArticleInStatusTracker(statusData, articleTitle);
              if (articleInfo.found && articleInfo.docUrl) {
                article.docUrl = articleInfo.docUrl;
                article.statusTrackerRow = articleInfo.row;
                article.statusTrackerStatus = articleInfo.status;
                articles.push(article);
                Logger.log('📝 FOUND PASTE TARGET: ' + articleTitle + ' (Row ' + row + ', Status: "' + currentStatus + '")');
              } else {
                Logger.log('⏭️ SKIPPING: ' + articleTitle + ' - No Google Doc URL found');
              }
            } else {
              Logger.log('⏭️ SKIPPING: ' + articleTitle + ' - Status: "' + currentStatus + '" (not allowed)');
            }
          }
          
          // Keep existing logic for DELETE operation
          else if (operationType === 'DELETE' && status === 'Successful WP Upload') {
            // Calculate how many rows this article spans
            var rowsToDelete = 1; // At least the title row
            var checkRow = row + 1;
            
            while (checkRow < endRow) {
              var checkCell = uploaderSheet.getRange(checkRow, 1);
              if (checkCell.isPartOfMerge() && checkCell.getMergedRanges()[0].getRow() === checkRow) {
                break;
              }
              rowsToDelete++;
              checkRow++;
            }
            
            article.rowsToDelete = rowsToDelete;
            articles.push(article);
            Logger.log('🗑️ FOUND DELETE TARGET: ' + articleTitle + ' (Row ' + row + ', ' + rowsToDelete + ' rows)');
          }
        }
      }
    }
  }
  
  workspace.articles = articles;
  Logger.log('🔍 WORKSPACE SCAN COMPLETE: ' + workspace.personName + ' has ' + articles.length + ' articles for ' + operationType);
  return articles;
}


// =============================================================================
// CORE FUNCTIONS FOR MANUAL OPERATIONS (MUST EXIST)
// =============================================================================


// BATCH SET DATE AND SCHEDULE



// Batch function to schedule posts
// Enhanced batch function to schedule posts and publish past-date posts
function batchSchedulePosts() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
  if (!sheet) {
    SpreadsheetApp.getUi().alert('WP Editing Tracker sheet not found');
    return;
  }
  
  var lastRow = sheet.getLastRow();
  var postsToSchedule = [];
  var now = new Date();
  
  // Find all rows with "Date Set" status
  for (var row = 2; row <= lastRow; row++) {
    var status = sheet.getRange(row, 8).getValue(); // Column H
    
    if (status === 'Date Set') {
      var wpUrl = sheet.getRange(row, 4).getValue(); // Column D
      var time = sheet.getRange(row, 6).getDisplayValue(); // Column F
      var date = sheet.getRange(row, 7).getDisplayValue(); // Column G
      
      if (wpUrl && time && date) {
        // Check if date is in the future
        var scheduledDate = new Date(date + ' ' + time);
        
        postsToSchedule.push({
          row: row,
          wpUrl: wpUrl,
          time: time,
          date: date,
          scheduledDate: scheduledDate,
          isFuture: scheduledDate > now,
          title: sheet.getRange(row, 3).getValue() || 'No title'
        });
      }
    }
  }
  
  if (postsToSchedule.length === 0) {
    SpreadsheetApp.getUi().alert(
      'No Posts to Schedule',
      'No posts found with "Date Set" status.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  // Separate future and past dates
  var futurePosts = postsToSchedule.filter(function(p) { return p.isFuture; });
  var pastPosts = postsToSchedule.filter(function(p) { return !p.isFuture; });
  
  // Build initial confirmation message
  var message = 'Found ' + postsToSchedule.length + ' posts ready to process:\n\n';
  message += '✅ Future dates (will be scheduled): ' + futurePosts.length + '\n';
  message += '⏰ Past dates (will need confirmation): ' + pastPosts.length + '\n\n';
  message += 'Continue with scheduling future posts first?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Batch Schedule Posts',
    message,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response !== SpreadsheetApp.getUi().Button.YES) {
    return;
  }
  
  // STEP 1: Process future posts (existing logic)
  var scheduledCount = 0;
  var scheduleErrorCount = 0;
  
  for (var i = 0; i < futurePosts.length; i++) {
    var post = futurePosts[i];
    
    try {
      Logger.log('Scheduling future post for row ' + post.row);
      
      // Create mock event
      var mockEvent = {
        range: sheet.getRange(post.row, 8),
        value: 'Schedule'
      };
      
      // Call existing function
      setWordPressSchedule(mockEvent);
      
      // Check if successful
      var newStatus = sheet.getRange(post.row, 8).getValue();
      if (newStatus === CONFIG.STATUS.SCHEDULED) {
        scheduledCount++;
      } else {
        scheduleErrorCount++;
      }
      
      // Delay between API calls
      Utilities.sleep(500);
      
    } catch (error) {
      scheduleErrorCount++;
      Logger.log('Error scheduling row ' + post.row + ': ' + error.message);
    }
  }
  
  // STEP 2: Handle past-date posts with confirmation dialog
  var publishedCount = 0;
  var publishErrorCount = 0;
  
  if (pastPosts.length > 0) {
    // Build confirmation message for past-date posts
    var pastMessage = 'Posts with past dates ready to publish:\n\n';
    
    for (var j = 0; j < pastPosts.length; j++) {
      var pastPost = pastPosts[j];
      pastMessage += '• ' + pastPost.title + ': Set for ' + pastPost.date + ' - ' + pastPost.time + '\n';
    }
    
    pastMessage += '\nProceed with publishing these ' + pastPosts.length + ' posts immediately?';
    
    var pastResponse = SpreadsheetApp.getUi().alert(
      'Publish Past-Date Posts',
      pastMessage,
      SpreadsheetApp.getUi().ButtonSet.YES_NO
    );
    
    if (pastResponse === SpreadsheetApp.getUi().Button.YES) {
      // Publish past-date posts
      for (var k = 0; k < pastPosts.length; k++) {
        var pastPost = pastPosts[k];
        
        try {
          Logger.log('Publishing past-date post for row ' + pastPost.row);
          
          // Publish the post with its original past date
          var publishResult = publishWordPressPostWithDate(pastPost.wpUrl, pastPost.date, pastPost.time);
          
          if (publishResult) {
            sheet.getRange(pastPost.row, 8).setValue(CONFIG.STATUS.PUBLISHED);
            publishedCount++;
            Logger.log('Successfully published past-date post: ' + pastPost.title);
          } else {
            publishErrorCount++;
            Logger.log('Failed to publish past-date post: ' + pastPost.title);
          }
          
          // Delay between API calls
          Utilities.sleep(500);
          
        } catch (error) {
          publishErrorCount++;
          Logger.log('Error publishing past-date post ' + pastPost.row + ': ' + error.message);
        }
      }
    } else {
      Logger.log('User cancelled publishing of past-date posts');
    }
  }
  
  // Show comprehensive results
  var resultMessage = 'Batch Processing Complete!\n\n';
  resultMessage += '📅 SCHEDULED POSTS (Future Dates):\n';
  resultMessage += '✅ Successfully scheduled: ' + scheduledCount + ' posts\n';
  if (scheduleErrorCount > 0) {
    resultMessage += '❌ Schedule errors: ' + scheduleErrorCount + ' posts\n';
  }
  
  if (pastPosts.length > 0) {
    resultMessage += '\n⏰ PUBLISHED POSTS (Past Dates):\n';
    resultMessage += '✅ Successfully published: ' + publishedCount + ' posts\n';
    if (publishErrorCount > 0) {
      resultMessage += '❌ Publish errors: ' + publishErrorCount + ' posts\n';
    }
    if (pastPosts.length > publishedCount + publishErrorCount) {
      resultMessage += '⏭️ Skipped (user cancelled): ' + (pastPosts.length - publishedCount - publishErrorCount) + ' posts\n';
    }
  }
  
  SpreadsheetApp.getUi().alert('Results', resultMessage, SpreadsheetApp.getUi().ButtonSet.OK);
}

// New helper function to publish WordPress post with specific date
function publishWordPressPostWithDate(wpUrl, date, time) {
  var postId = extractPostIdFromUrl(wpUrl);
  if (!postId) {
    Logger.log('Could not extract post ID from URL: ' + wpUrl);
    return false;
  }
  
  // Parse the date and time
  var publishDate = new Date(date + ' ' + time);
  
  // Format for WordPress
  var year = publishDate.getFullYear();
  var month = String(publishDate.getMonth() + 1).padStart(2, '0');
  var day = String(publishDate.getDate()).padStart(2, '0');
  var hours = String(publishDate.getHours()).padStart(2, '0');
  var minutes = String(publishDate.getMinutes()).padStart(2, '0');
  var seconds = '00';
  
  var wpDateString = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
  
  Logger.log('Publishing post with date: ' + wpDateString);
  
  // Publish the post with the specified date
  var result = updateWordPressPost(postId, {
    status: CONFIG.WP_POST_STATUS.PUBLISH,
    date: wpDateString
  });
  
  return result !== false;
}

// BATCH UPDATE TITLE AND INTRO
function updateTitleAndIntro(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  try {
    // Get the necessary values
    var wpUrl = sheet.getRange(row, 4).getValue(); // Column D - WP URL
    var introSubheading = sheet.getRange(row, 10).getValue(); // Column J - Intro Subheading
    var introContent = sheet.getRange(row, 11).getValue(); // Column K - Intro Content
    var finalTitle = sheet.getRange(row, 12).getValue(); // Column L - Final Title
    
    // MUST have WordPress URL
    if (!wpUrl) {
      sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original - missing URL
      Logger.log('Skipping row ' + row + ' - No WordPress URL found');
      return;
    }

    // Check which fields have values (not empty/null)
    var hasTitle = finalTitle && finalTitle.toString().trim() !== '';
    var hasSubheading = introSubheading && introSubheading.toString().trim() !== '';
    var hasContent = introContent && introContent.toString().trim() !== '';

    // Must have at least ONE field to update
    if (!hasTitle && !hasSubheading && !hasContent) {
      sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original - no data to update
      Logger.log('Skipping row ' + row + ' - No data to update');
      return;
    }

    // Extract post ID
    var postId = extractPostIdFromUrl(wpUrl);
    if (!postId) {
      sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original - invalid URL
      Logger.log('Skipping row ' + row + ' - Could not extract post ID from URL');
      return;
    }
    
    Logger.log('Updating post ID: ' + postId);
    if (hasTitle) Logger.log('New title: ' + finalTitle);
    if (hasSubheading) Logger.log('New subheading: ' + introSubheading);
    if (hasContent) Logger.log('New content provided');
    
    // Get current post data from WordPress - REQUEST RAW CONTENT
    var username = CONFIG.WORDPRESS.USERNAME;
    var applicationPassword = CONFIG.WORDPRESS.APP_PASSWORD;
    // Add context=edit to get raw content
    var wpApiUrl = CONFIG.ENDPOINTS.WP_POSTS + '/' + postId + '?context=edit';
    
    var options = {
      method: "get",
      headers: {
        "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
      },
      muteHttpExceptions: true
    };
    
    var response = UrlFetchApp.fetch(wpApiUrl, options);
    if (response.getResponseCode() !== CONFIG.HTTP_STATUS.OK) {
      Logger.log('Error: Cannot fetch post - Response code: ' + response.getResponseCode());
      sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original status
      Logger.log('Skipping row ' + row + ' - Cannot fetch post from WordPress');
      return;
    }

    // Check if response is actually JSON before parsing
    var responseText = response.getContentText();
    var contentType = response.getHeaders()['Content-Type'] || '';

    // Check for HTML response (WordPress sometimes returns HTML error pages with 200 status)
    if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html') || !contentType.includes('application/json')) {
      Logger.log('Error: WordPress returned HTML instead of JSON for post ' + postId);
      Logger.log('Content-Type: ' + contentType);
      Logger.log('Response preview: ' + responseText.substring(0, 200));
      sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original status
      Logger.log('Skipping row ' + row + ' - WordPress returned non-JSON response');
      return;
    }

    var postData;
    try {
      postData = JSON.parse(responseText);
    } catch (parseError) {
      Logger.log('Error parsing JSON for post ' + postId + ': ' + parseError.message);
      Logger.log('Response preview: ' + responseText.substring(0, 200));
      sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original status
      return;
    }
    // Get the raw content
    var currentContent = postData.content.raw;
    
    Logger.log('Current content length: ' + currentContent.length);
    
    // Prepare update payload - only include fields that have values
    var updatePayload = {};
    
    // Update title if provided
    if (hasTitle) {
      updatePayload.title = finalTitle;
      Logger.log('Will update title to: ' + finalTitle);
    }
    
    // Update content if we have subheading or content to change
    if (hasSubheading || hasContent) {
      // Format content with line breaks if provided
      var formattedIntroContent = hasContent ? addLineBreaksEveryTwoSentences(introContent) : null;
      
      // Update the first slideshow item selectively
      var updatedContent = updateFirstSlideContentSelective(
        currentContent, 
        hasSubheading ? introSubheading : null, 
        formattedIntroContent
      );
      
      if (updatedContent) {
        updatePayload.content = updatedContent;
        Logger.log('Content will be updated');
      } else {
        Logger.log('Error: Could not update slideshow content');
        sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original - content update failed
        Logger.log('Skipping row ' + row + ' - Could not update slideshow content');
        return;
      }
    }
    
    // Send update to WordPress
    var updateOptions = {
      method: "post",
      headers: {
        "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword),
        "Content-Type": "application/json"
      },
      payload: JSON.stringify(updatePayload),
      muteHttpExceptions: true
    };
    
    var updateResponse = UrlFetchApp.fetch(wpApiUrl, updateOptions);
    
    if (updateResponse.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
      sheet.getRange(row, 8).setValue('Title/Intro Updated');
      
      // Log what was actually updated
      var updatedFields = [];
      if (hasTitle) updatedFields.push('title');
      if (hasSubheading) updatedFields.push('subheading');
      if (hasContent) updatedFields.push('content');
      
      Logger.log('Successfully updated: ' + updatedFields.join(', ') + ' for post ' + postId);
    } else {
      Logger.log('Failed to update post: ' + updateResponse.getContentText());
      sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original status on failure
      Logger.log('Keeping row ' + row + ' status as "New H1 & Intro Ready" due to update failure');
    }

  } catch (error) {
    Logger.log('Error in updateTitleAndIntro: ' + error.message);
    Logger.log('Error stack: ' + error.stack);
    sheet.getRange(row, 8).setValue('New H1 & Intro Ready'); // Keep original status on error
    Logger.log('Keeping row ' + row + ' status as "New H1 & Intro Ready" due to error');
  }
}

// BATCH UPDATE FUNCTION
function batchUpdateTitlesAndIntros() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
  if (!sheet) {
    SpreadsheetApp.getUi().alert('WP Editing Tracker sheet not found');
    return;
  }
  
  var lastRow = sheet.getLastRow();
  var articlesToUpdate = [];
  
  // Find all rows with "New H1 & Intro Ready" status
  for (var row = 2; row <= lastRow; row++) {
    var status = sheet.getRange(row, 8).getValue(); // Column H
    
    if (status === 'New H1 & Intro Ready') {
      // Check if required data exists
      var wpUrl = sheet.getRange(row, 4).getValue(); // Column D
      var introSubheading = sheet.getRange(row, 10).getValue(); // Column J
      var introContent = sheet.getRange(row, 11).getValue(); // Column K
      var finalTitle = sheet.getRange(row, 12).getValue(); // Column L
      
      // Check which fields have values (not empty/null)
      var hasTitle = finalTitle && finalTitle.toString().trim() !== '';
      var hasSubheading = introSubheading && introSubheading.toString().trim() !== '';
      var hasContent = introContent && introContent.toString().trim() !== '';
      
      // MODIFIED: Only require WordPress URL + at least ONE of the update fields
      if (wpUrl && (hasTitle || hasSubheading || hasContent)) {
        articlesToUpdate.push({
          row: row,
          wpUrl: wpUrl,
          title: hasTitle ? finalTitle : null,
          subheading: hasSubheading ? introSubheading : null,
          content: hasContent ? introContent : null,
          hasTitle: hasTitle,
          hasSubheading: hasSubheading,
          hasContent: hasContent
        });
      }
    }
  }
  
  // Check if any articles found
  if (articlesToUpdate.length === 0) {
    SpreadsheetApp.getUi().alert(
      'No Articles to Update',
      'No articles found with "New H1 & Intro Ready" status that have the minimum required data.\n\n' +
      'Make sure rows have:\n' +
      '• Status = "New H1 & Intro Ready" in Column H\n' +
      '• WordPress URL in Column D\n' +
      '• At least ONE of: Title (L), Subheading (J), or Content (K)',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  // Show confirmation dialog with details about what will be updated
  var updateSummary = 'Found ' + articlesToUpdate.length + ' articles ready to update.\n\n';
  updateSummary += 'Update details:\n';
  
  for (var i = 0; i < Math.min(articlesToUpdate.length, 5); i++) {
    var article = articlesToUpdate[i];
    var updates = [];
    if (article.hasTitle) updates.push('Title');
    if (article.hasSubheading) updates.push('Subheading');
    if (article.hasContent) updates.push('Content');
    
    updateSummary += '• Row ' + article.row + ': ' + updates.join(', ') + '\n';
  }
  
  if (articlesToUpdate.length > 5) {
    updateSummary += '... and ' + (articlesToUpdate.length - 5) + ' more articles\n';
  }
  
  updateSummary += '\nThis will:\n';
  updateSummary += '• Update only the filled fields for each article\n';
  updateSummary += '• Leave empty fields unchanged in WordPress\n';
  updateSummary += '• Add line breaks every 2 sentences in intro content\n';
  updateSummary += '• Change status to "Title/Intro Updated"\n\n';
  updateSummary += 'Continue with selective batch update?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Selective Update Titles and Intros',
    updateSummary,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response !== SpreadsheetApp.getUi().Button.YES) {
    return;
  }
  
  // Execute the batch update
  var successCount = 0;
  var errorCount = 0;
  var errors = [];
  
  for (var i = 0; i < articlesToUpdate.length; i++) {
    var article = articlesToUpdate[i];
    
    try {
      Logger.log('Processing article ' + (i + 1) + ' of ' + articlesToUpdate.length + ' (Row ' + article.row + ')');
      
      // Create a mock event object to reuse the existing function
      var mockEvent = {
        range: sheet.getRange(article.row, 8),
        value: 'Update Title and Intro'
      };
      
      // Store the current status
      var currentStatus = sheet.getRange(article.row, 8).getValue();
      
      // Call the existing update function
      updateTitleAndIntro(mockEvent);
      
      // Check if update was successful by checking the new status
      var newStatus = sheet.getRange(article.row, 8).getValue();
      
      if (newStatus === 'Title/Intro Updated') {
        successCount++;
        
        // Log what was updated for this article
        var updatedFields = [];
        if (article.hasTitle) updatedFields.push('Title');
        if (article.hasSubheading) updatedFields.push('Subheading');
        if (article.hasContent) updatedFields.push('Content');
        
        Logger.log('Successfully updated: ' + updatedFields.join(', ') + ' for row ' + article.row);
      } else {
        errorCount++;
        errors.push({
          row: article.row,
          error: 'Update failed - check logs'
        });
        // Restore the original status
        sheet.getRange(article.row, 8).setValue(currentStatus);
      }
      
      // Add a delay to avoid overwhelming the WordPress API
      Utilities.sleep(1000); // 1 second delay between updates
      
    } catch (error) {
      errorCount++;
      errors.push({
        row: article.row,
        error: error.message
      });
      Logger.log('Error updating row ' + article.row + ': ' + error.message);
      // Make sure to reset status on error
      sheet.getRange(article.row, 8).setValue('New H1 & Intro Ready');
    }
  }
  
  // Force save
  SpreadsheetApp.flush();
  
  // Show results
  var resultMessage = 'Selective Batch Update Complete!\n\n';
  resultMessage += '✅ Successfully updated: ' + successCount + ' articles\n';
  
  if (errorCount > 0) {
    resultMessage += '❌ Errors: ' + errorCount + ' articles\n\n';
    resultMessage += 'Failed articles:\n';
    for (var j = 0; j < Math.min(errors.length, 5); j++) {
      resultMessage += '• Row ' + errors[j].row + ': ' + errors[j].error + '\n';
    }
    if (errors.length > 5) {
      resultMessage += '... and ' + (errors.length - 5) + ' more errors (check logs)\n';
    }
  } else {
    resultMessage += '\n🎉 All articles updated successfully!\n';
    resultMessage += 'Only filled fields were updated - empty fields left unchanged!';
  }
  
  SpreadsheetApp.getUi().alert('Selective Update Results', resultMessage, SpreadsheetApp.getUi().ButtonSet.OK);
  
  Logger.log('Selective batch update completed - Success: ' + successCount + ', Errors: ' + errorCount);
}

// Helper function to add line breaks every 2 sentences - FIXED VERSION
function addLineBreaksEveryTwoSentences(text) {
  // Match sentences ending with ., !, or ?
  var sentences = text.match(/[^.!?]+[.!?]+/g);
  
  if (!sentences) return text;
  
  var result = '';
  for (var i = 0; i < sentences.length; i++) {
    result += sentences[i].trim();
    
    // Add HTML line breaks after every 2 sentences (except for the last sentence)
    if ((i + 1) % 2 === 0 && i < sentences.length - 1) {
      result += '<br><br>';  // Changed from '\n\n' to '<br><br>'
    } else if (i < sentences.length - 1) {
      result += ' ';
    }
  }
  
  return result;
}

// Selective update function - FIXED VERSION
function updateFirstSlideContentSelective(content, newSubheading, newContent) {
  try {
    // First, let's check if content has the slideshow blocks
    if (!content.includes('wp:clmsn/slideshow-item')) {
      Logger.log('No wp:clmsn/slideshow-item found in content');
      return null;
    }
    
    // Pattern to match the entire first slideshow item block
    var firstSlidePattern = /<!-- wp:clmsn\/slideshow-item\s+({[^}]+})\s*-->([\s\S]*?)<!-- \/wp:clmsn\/slideshow-item -->/;
    
    var match = content.match(firstSlidePattern);
    
    if (!match) {
      Logger.log('Primary regex did not match slideshow pattern');
      return null;
    }
    
    Logger.log('Found slideshow match');
    
    try {
      // Extract and parse the JSON attributes
      var jsonString = match[1];
      var attributes = JSON.parse(jsonString);
      
      // Update slideTitle in attributes only if newSubheading is provided
      if (newSubheading !== null) {
        attributes.slideTitle = escapeQuotes(newSubheading);
      }
      
      // Update the HTML content within the block
      var blockContent = match[2];
      
      // Update the h3 tag only if newSubheading is provided
      if (newSubheading !== null) {
        blockContent = blockContent.replace(/<h3>[\s\S]*?<\/h3>/, '<h3>' + escapeQuotes(newSubheading) + '</h3>');
      }
      
      // Update ALL p tags only if newContent is provided - FIXED: removed ? to make it greedy
      if (newContent !== null) {
        blockContent = blockContent.replace(/<p>[\s\S]*<\/p>/, '<p>' + escapeQuotes(newContent) + '</p>');
      }
      
      // Rebuild the complete block with updated attributes
      var updatedFirstSlide = '<!-- wp:clmsn/slideshow-item ' + JSON.stringify(attributes) + ' -->' + 
                             blockContent + 
                             '<!-- /wp:clmsn/slideshow-item -->';
      
      // Replace only the first slide in the content
      var updatedContent = content.replace(match[0], updatedFirstSlide);
      
      Logger.log('Successfully updated first slide selectively');
      return updatedContent;
      
    } catch (jsonError) {
      Logger.log('Error parsing slide attributes: ' + jsonError.message);
      return null;
    }
    
  } catch (error) {
    Logger.log('Error updating first slide content selectively: ' + error.message);
    Logger.log('Error stack: ' + error.stack);
    return null;
  }
}

// Helper function to escape quotes for HTML
function escapeQuotes(str) {
  if (typeof str !== 'string') {
    str = String(str || ''); // Convert to string or use an empty string if undefined/null
  }
  return str.replace(/"/g, '&quot;');
}
///// BATCH IMAGE METADATA
///// BATCH IMAGE METADATA
///// BATCH IMAGE METADATA
///// BATCH IMAGE METADATA
// =============================================================================
// BATCH GET IMAGE METADATA (WORKSPACE-AWARE)
// =============================================================================

// =============================================================================
// INDIVIDUAL WORKSPACE IMAGE METADATA (Following batchPaste workflow)
// =============================================================================

function batchGetImageMetadata() {
  var operationType = 'Get Image Metadata';
  
  // Check if sheet is locked
  if (!checkUploaderLock(operationType)) {
    return;
  }
  
  // Start the workspace selection loop (same as batchPaste)
  processImageMetadataWorkspaceLoop(operationType);
}

function processImageMetadataWorkspaceLoop(operationType) {
  try {
    // Step 1: Ask user to choose workspace (uses hardcoded list)
    var selectedWorkspace = selectSingleWorkspaceForMetadata(); 
    
    if (!selectedWorkspace) {
      unlockUploaderSheet(operationType);
      return;
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
    
    // Step 2: Find boundaries for selected workspace only
    if (selectedWorkspace.isAllWorkspaces) {
      // For ALL, find boundaries for each hardcoded workspace
      var workspacesWithBoundaries = [];
      for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
        var workspace = selectedWorkspace.workspaces[i];
        var workspaceWithBoundaries = findWorkspaceBoundaries(uploaderSheet, workspace.personName);
        if (workspaceWithBoundaries) {
          workspacesWithBoundaries.push(workspaceWithBoundaries);
        }
      }
      selectedWorkspace.workspaces = workspacesWithBoundaries;
    } else {
      // For single workspace, find its boundaries
      selectedWorkspace = findWorkspaceBoundaries(uploaderSheet, selectedWorkspace.personName);
      if (!selectedWorkspace) {
        SpreadsheetApp.getUi().alert('Could not find workspace boundaries for the selected person.');
        askForNextMetadataWorkspace(operationType);
        return;
      }
    }
    
    // Step 3: ONLY scan the selected workspace(s) for metadata articles
    var articlesInWorkspace;
    if (selectedWorkspace.isAllWorkspaces) {
      articlesInWorkspace = [];
      for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
        var workspace = selectedWorkspace.workspaces[i];
        var workspaceArticles = getArticlesForMetadataIndividual(uploaderSheet, workspace);
        articlesInWorkspace = articlesInWorkspace.concat(workspaceArticles);
      }
    } else {
      articlesInWorkspace = getArticlesForMetadataIndividual(uploaderSheet, selectedWorkspace);
    }
    
    if (articlesInWorkspace.length === 0) {
      SpreadsheetApp.getUi().alert('No articles found that need image metadata in the selected workspace(s).');
      askForNextMetadataWorkspace(operationType);
      return;
    }
    
    // Step 4: Show plan and process
    if (!showSingleWorkspaceMetadataPlan(selectedWorkspace, articlesInWorkspace)) {
      askForNextMetadataWorkspace(operationType);
      return;
    }
    
    var result = processSingleWorkspaceMetadata(selectedWorkspace, articlesInWorkspace);
    showMetadataResultsAndAskNext(result, operationType);
    
  } catch (error) {
    Logger.log('Error in processImageMetadataWorkspaceLoop: ' + error.message);
    unlockUploaderSheet(operationType);
    SpreadsheetApp.getUi().alert('Error: ' + error.message);
  }
}

function selectSingleWorkspaceForMetadata() {
  // HARDCODED workspace names for speed (same as batchPaste)
  var hardcodedWorkspaces = [
    'JAMIE',
    'CHARL',
    'LARA',
    'SHAYNE',
    'NAINTARA',
    'KARL',
    'MARIE'
  ];
  
  var workspaceList = "0. ALL WORKSPACES\n";
  for (var i = 0; i < hardcodedWorkspaces.length; i++) {
    workspaceList += (i + 1) + ". " + hardcodedWorkspaces[i] + "\n";
  }
  
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Choose Workspace for Image Metadata',
    'Select YOUR workspace to process image metadata:\n\n' + 
    workspaceList + '\n' +
    'Enter a single number:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null; // User cancelled
  }
  
  var choice = parseInt(response.getResponseText().trim());
  
  if (choice === 0) {
    // Return special "ALL" workspace object with hardcoded names
    var allWorkspaces = [];
    for (var i = 0; i < hardcodedWorkspaces.length; i++) {
      allWorkspaces.push({
        personName: hardcodedWorkspaces[i],
        startRow: null,
        endRow: null
      });
    }
    
    return {
      personName: 'ALL WORKSPACES',
      isAllWorkspaces: true,
      workspaces: allWorkspaces
    };
  } else if (choice >= 1 && choice <= hardcodedWorkspaces.length) {
    return {
      personName: hardcodedWorkspaces[choice - 1],
      startRow: null,
      endRow: null
    };
  } else {
    ui.alert('Invalid selection. Please enter a valid number.');
    return selectSingleWorkspaceForMetadata(); // Try again
  }
}

// Helper function to find articles that need metadata (EXCLUDING completed ones)
// Helper function to find articles that need metadata (EXCLUDING only completed ones)
function getArticlesForMetadataIndividual(uploaderSheet, workspace) {
  var articles = [];
  var endRow = workspace.endRow || uploaderSheet.getLastRow();
  
  Logger.log('🔍 SCANNING WORKSPACE: ' + workspace.personName + ' for metadata targets');
  
  for (var row = workspace.startRow; row < endRow; row++) {
    var cellA = uploaderSheet.getRange(row, 1);
    
    if (cellA.isPartOfMerge()) {
      var mergedRange = cellA.getMergedRanges()[0];
      
      // Check if it's an article title (11 columns wide)
      if (mergedRange.getRow() === row && mergedRange.getNumColumns() === 11) {
        var articleTitle = mergedRange.getValue();
        var status = uploaderSheet.getRange(row, 12).getValue();
        
        // NEW: Process ALL statuses EXCEPT "Get Image Meta Data Complete"
        if (articleTitle && articleTitle.toString().trim() !== '' && 
            status !== 'Get Image Meta Data Complete') {
          
          articles.push({
            title: articleTitle.toString().trim(),
            row: row,
            status: status,
            workspace: workspace.personName
          });
          Logger.log('📸 FOUND METADATA TARGET: ' + articleTitle + ' (Row ' + row + ', Status: ' + status + ')');
        }
        // Log skipped articles for transparency
        else if (articleTitle && status === 'Get Image Meta Data Complete') {
          Logger.log('⏭️ SKIPPING COMPLETED: ' + articleTitle + ' (Row ' + row + ')');
        }
      }
    }
  }
  
  workspace.articles = articles;
  return articles;
}

function showSingleWorkspaceMetadataPlan(workspace, articles) {
  var estimatedImages = articles.length * 13; // Estimate 13 images per article
  var estimatedMinutes = Math.ceil((articles.length * 15) / 60); // 15 seconds per article
  
  var message = '📸 IMAGE METADATA PLAN\n\n';
  
  if (workspace.isAllWorkspaces) {
    message += '🌐 PROCESSING: ALL WORKSPACES\n';
    message += '⚠️ This will process all workspaces sequentially.\n\n';
  } else {
    message += '👤 WORKSPACE: ' + workspace.personName + '\n';
    message += '📊 Articles to process: ' + articles.length + '\n';
    message += '📸 Estimated images: ~' + estimatedImages + '\n';
    message += '⏱️ Estimated time: ~' + estimatedMinutes + ' minutes\n\n';
    
    message += '📋 ARTICLES FOUND (All statuses except "Get Image Meta Data Complete"):\n';
    for (var i = 0; i < Math.min(articles.length, 8); i++) {
      message += '• ' + articles[i].title + ' (Status: ' + articles[i].status + ')\n';
    }
    
    if (articles.length > 8) {
      message += '... and ' + (articles.length - 8) + ' more articles\n';
    }
  }
  
  message += '\n🔄 PROCESSING:\n';
  message += '• Extract metadata from image URLs\n';
  message += '• Support Shutterstock, Flickr, Wikimedia, NPS, etc.\n';
  message += '• Highlight failed extractions in red\n';
  message += '• Update article status when complete\n';
  message += '• Skip articles already marked "Get Image Meta Data Complete"\n\n';
  
  message += 'Continue with this workspace?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Image Metadata Processing Plan',
    message,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  return response === SpreadsheetApp.getUi().Button.YES;
}



function processSingleWorkspaceMetadata(workspace, articles) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var completed = 0;
  var needRetry = 0;
  var totalImagesProcessed = 0;
  
  Logger.log('📸 PROCESSING WORKSPACE: ' + workspace.personName + ' (' + articles.length + ' articles)');
  
  if (workspace.isAllWorkspaces) {
    // Process all workspaces sequentially
    for (var i = 0; i < workspace.workspaces.length; i++) {
      var singleWorkspace = workspace.workspaces[i];
      var workspaceArticles = getArticlesForMetadataIndividual(uploaderSheet, singleWorkspace);
      
      if (workspaceArticles.length > 0) {
        Logger.log('📸 PROCESSING: ' + singleWorkspace.personName + ' (' + workspaceArticles.length + ' articles)');
        var workspaceResult = processMetadataArticlesInWorkspace(singleWorkspace, workspaceArticles);
        completed += workspaceResult.completed;
        needRetry += workspaceResult.needRetry;
        totalImagesProcessed += workspaceResult.imagesProcessed;
      }
    }
  } else {
    // Process single workspace
    var result = processMetadataArticlesInWorkspace(workspace, articles);
    completed = result.completed;
    needRetry = result.needRetry;
    totalImagesProcessed = result.imagesProcessed;
  }
  
  return {
    workspaceName: workspace.personName,
    completed: completed,
    needRetry: needRetry,
    totalArticles: articles.length,
    imagesProcessed: totalImagesProcessed
  };
}

function processMetadataArticlesInWorkspace(workspace, articles) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var completed = 0;
  var needRetry = 0;
  var imagesProcessed = 0;
  
  // Define light red color for failures
  const lightRed = CONFIG.COLORS.VERY_LIGHT_RED;
  
  Logger.log('📸 PROCESSING WORKSPACE: ' + workspace.personName + ' (' + articles.length + ' articles)');
  
  // Process each article in the workspace
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var articleRow = article.row;
    var hasFailures = false;
    var hasSuccesses = false;
    var imagesInArticle = 0;
    
    Logger.log('📸 PROCESSING ARTICLE: ' + article.title + ' (Row ' + articleRow + ')');
    
    // Process rows below the article title
    var currentRow = articleRow + 1;
    var nextCell = uploaderSheet.getRange(currentRow, 1);
    
    while (!nextCell.isPartOfMerge() && currentRow <= uploaderSheet.getLastRow()) {
      var url = uploaderSheet.getRange(currentRow, 2).getValue();
      
      if (url) {
        imagesInArticle++;
        
        // Check if this row already has metadata (any data in columns 8-11)
        var hasExistingData = false;
        for (var col = 8; col <= 11; col++) {
          if (uploaderSheet.getRange(currentRow, col).getValue()) {
            hasExistingData = true;
            break;
          }
        }
        
        if (hasExistingData) {
          Logger.log('⏭️ SKIPPING row ' + currentRow + ' - already has metadata');
          hasSuccesses = true; // Count as success since it's already done
        } else {
          // Try to extract metadata
          try {
            var success = extractMetadataForRow(uploaderSheet, currentRow, url);
            
            if (success) {
              hasSuccesses = true;
              Logger.log('✅ METADATA EXTRACTED for row ' + currentRow);
            } else {
              hasFailures = true;
              // Highlight columns H-K (8-11) in light red
              uploaderSheet.getRange(currentRow, 8, 1, 4).setBackground(lightRed);
              Logger.log('❌ METADATA FAILED for row ' + currentRow);
            }
            
          } catch (error) {
            hasFailures = true;
            // Highlight columns H-K (8-11) in light red
            uploaderSheet.getRange(currentRow, 8, 1, 4).setBackground(lightRed);
            Logger.log('❌ ERROR extracting metadata for row ' + currentRow + ': ' + error.message);
          }
          
          // Delay between image processing
          Utilities.sleep(500);
        }
      }
      
      currentRow++;
      nextCell = uploaderSheet.getRange(currentRow, 1);
    }
    
    // Update article status based on results
    if (hasFailures || !hasSuccesses) {
      uploaderSheet.getRange(articleRow, 12).setValue('Retry Image Metadata');
      needRetry++;
    } else {
      uploaderSheet.getRange(articleRow, 12).setValue(CONFIG.STATUS.GET_IMAGE_META_DATA_COMPLETE);
      completed++;
    }
    
    imagesProcessed += imagesInArticle;
    
    Logger.log('📸 ARTICLE COMPLETE: ' + article.title + ' - ' + imagesInArticle + ' images');
    
    // Delay between articles
    Utilities.sleep(2000);
    
    // Force save
    SpreadsheetApp.flush();
  }
  
  return {
    completed: completed,
    needRetry: needRetry,
    imagesProcessed: imagesProcessed
  };
}

function showMetadataResultsAndAskNext(result, operationType) {
  var resultMessage = '📸 IMAGE METADATA PROCESSING COMPLETE!\n\n';
  resultMessage += '👤 Workspace: ' + result.workspaceName + '\n';
  resultMessage += '✅ Successfully completed: ' + result.completed + ' articles\n';
  resultMessage += '📸 Images processed: ' + result.imagesProcessed + '\n';
  
  if (result.needRetry > 0) {
    resultMessage += '⚠️ Need retry: ' + result.needRetry + ' articles\n';
    resultMessage += '🔴 Red highlighted rows indicate failed metadata extraction.\n';
  }
  
  if (result.completed > 0) {
    resultMessage += '\n🎉 Image metadata extracted successfully!\n';
    resultMessage += '📌 Articles now have "Get Image Meta Data Complete" status.\n';
  }
  
  resultMessage += '\n' + '='.repeat(40) + '\n';
  resultMessage += 'Would you like to process another workspace?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Processing Complete',
    resultMessage,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    // Continue with next workspace
    processImageMetadataWorkspaceLoop(operationType);
  } else {
    // User wants to exit
    unlockUploaderSheet(operationType);
    SpreadsheetApp.getUi().alert('All done! The sheet is now unlocked.');
  }
}

function askForNextMetadataWorkspace(operationType) {
  var response = SpreadsheetApp.getUi().alert(
    'No Articles Found',
    'Would you like to try another workspace?',
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response === SpreadsheetApp.getUi().Button.YES) {
    processImageMetadataWorkspaceLoop(operationType);
  } else {
    unlockUploaderSheet(operationType);
  }
}


// Extract metadata for a single row
// Extract metadata for a single row
function extractMetadataForRow(sheet, row, url) {
  const lightRed = CONFIG.COLORS.VERY_LIGHT_RED;  // Light red color for empty cells
  
  try {
    // Fetch HTML content
    const htmlContent = UrlFetchApp.fetch(url).getContentText();
    
    // Process based on URL domain
    if (url.includes('shutterstock.com')) {
      const stockPhotoID = extractStockPhotoIDFromURL(url);
      const photoContributor = extractPhotoContributor(htmlContent);
      const photoDescription = extractPhotoDescription(htmlContent);
      
      sheet.getRange(row, 8).setValue("Shutterstock");
      sheet.getRange(row, 9).setValue(stockPhotoID);
      sheet.getRange(row, 10).setValue(photoContributor);
      sheet.getRange(row, 11).setValue(photoDescription);
      
      // Apply light red background to any "Not found" cells
      if (stockPhotoID === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 9).setBackground(lightRed);
      } else {
        sheet.getRange(row, 9).setBackground(null);
      }
      
      if (photoContributor === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 10).setBackground(lightRed);
      } else {
        sheet.getRange(row, 10).setBackground(null);
      }
      
      if (photoDescription === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 11).setBackground(lightRed);
      } else {
        sheet.getRange(row, 11).setBackground(null);
      }
      
      return stockPhotoID !== "Not found" || photoContributor !== "Not found" || photoDescription !== "Not found";
    }
    else if (url.includes('flickr.com')) {
      const flickrData = extractFlickrMetadata(url, htmlContent);
      
      sheet.getRange(row, 8).setValue(`Flickr/${flickrData.username}`);
      sheet.getRange(row, 9).setValue(flickrData.photoId);
      sheet.getRange(row, 10).setValue(`${flickrData.creator} (${flickrData.licenseType})`);
      sheet.getRange(row, 11).setValue(flickrData.title);
      
      // Apply light red background to any "Not found" cells
      if (flickrData.username === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 8).setBackground(lightRed);
      } else {
        sheet.getRange(row, 8).setBackground(null);
      }
      
      if (flickrData.photoId === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 9).setBackground(lightRed);
      } else {
        sheet.getRange(row, 9).setBackground(null);
      }
      
      if (flickrData.creator === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 10).setBackground(lightRed);
      } else {
        sheet.getRange(row, 10).setBackground(null);
      }
      
      if (flickrData.title === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 11).setBackground(lightRed);
      } else {
        sheet.getRange(row, 11).setBackground(null);
      }
      
      return flickrData.photoId !== "Not found";
    }
    else if (url.includes('wikimedia.org')) {
      const wikiData = extractWikiMetadata(url, htmlContent);
      
      // Column 8: Copyright - only add username if it exists
      if (wikiData.username) {
        sheet.getRange(row, 8).setValue(`Wikimedia Commons/${wikiData.username}`);
        sheet.getRange(row, 8).setBackground(null);
      } else {
        sheet.getRange(row, 8).setValue('Wikimedia Commons');
        sheet.getRange(row, 8).setBackground(null);
      }
      
      // Column 9: License ID from URL
      if (wikiData.licenseId) {
        sheet.getRange(row, 9).setValue(wikiData.licenseId);
        sheet.getRange(row, 9).setBackground(null);
      } else {
        sheet.getRange(row, 9).setValue('');
        sheet.getRange(row, 9).setBackground(lightRed);
      }
      
      // Column 10: Just the username
      if (wikiData.username) {
        sheet.getRange(row, 10).setValue(wikiData.username);
        sheet.getRange(row, 10).setBackground(null);
      } else {
        sheet.getRange(row, 10).setValue('');
        sheet.getRange(row, 10).setBackground(lightRed);
      }
      
      // Column 11: Description (alt text)
      if (wikiData.description) {
        sheet.getRange(row, 11).setValue(wikiData.description);
        sheet.getRange(row, 11).setBackground(null);
      } else {
        sheet.getRange(row, 11).setValue('');
        sheet.getRange(row, 11).setBackground(lightRed);
      }
      
      return true; // Wikimedia always returns something
    }
    else if (url.includes('nps.gov/media/photo/view.htm')) {
      const npsIdMatch = url.match(/[?&]id=([^&]+)/);
      const licenseId = npsIdMatch ? npsIdMatch[1] : "Not found";
      const npsData = extractNpsPhotoMetadata(licenseId);
      
      sheet.getRange(row, 8).setValue("National Park Service");
      sheet.getRange(row, 9).setValue(licenseId);
      sheet.getRange(row, 10).setValue(npsData.credit);
      sheet.getRange(row, 11).setValue(npsData.description);
      
      // Apply light red background to any "Not found" cells
      if (licenseId === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 9).setBackground(lightRed);
      } else {
        sheet.getRange(row, 9).setBackground(null);
      }
      
      if (npsData.credit === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 10).setBackground(lightRed);
      } else {
        sheet.getRange(row, 10).setBackground(null);
      }
      
      if (npsData.description === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 11).setBackground(lightRed);
      } else {
        sheet.getRange(row, 11).setBackground(null);
      }
      
      return npsData.credit !== "Not found" || npsData.description !== "Not found";
    }
    else if (url.includes('npgallery.nps.gov/') && (url.includes('/AssetDetail/') || url.includes('/HFC/AssetDetail/'))) {
      let assetId;
      if (url.includes('/HFC/AssetDetail/')) {
        assetId = url.split('/HFC/AssetDetail/')[1];
      } else {
        assetId = url.split('/AssetDetail/')[1];
      }
      
      const description = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">Description:</label>', '</div>');
      const copyright = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">Copyright:</label>', '</div>');
      let photoCredit = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">PhotoCredit:</label>', '</div>');
      
      if (!photoCredit || photoCredit === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        photoCredit = extractTextBetweenStrings(htmlContent, '<label class="col-md-3 col-sm-3 text-right">Publisher:</label>', '</div>');
      }
      
      if (photoCredit && photoCredit.includes("Unknown")) {
        photoCredit = "U.S. National Park Service";
      }
      
      let formattedCopyright = "Public Domain (NPS)";
      if (!copyright || copyright === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        formattedCopyright = "Not found";
      }
      
      sheet.getRange(row, 8).setValue(formattedCopyright);
      sheet.getRange(row, 9).setValue(assetId);
      sheet.getRange(row, 10).setValue(photoCredit);
      sheet.getRange(row, 11).setValue(description);
      
      // Apply light red background to any "Not found" cells
      if (formattedCopyright === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 8).setBackground(lightRed);
      } else {
        sheet.getRange(row, 8).setBackground(null);
      }
      
      if (!assetId) {
        sheet.getRange(row, 9).setBackground(lightRed);
      } else {
        sheet.getRange(row, 9).setBackground(null);
      }
      
      if (photoCredit === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 10).setBackground(lightRed);
      } else {
        sheet.getRange(row, 10).setBackground(null);
      }
      
      if (description === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 11).setBackground(lightRed);
      } else {
        sheet.getRange(row, 11).setBackground(null);
      }
      
      return description !== "Not found" || photoCredit !== "Not found";
    }
    else if (url.includes('digitalcollections.nypl.org/items/')) {
      const nyplData = extractNYPLMetadata(url, htmlContent);
      
      sheet.getRange(row, 8).setValue(nyplData.copyright);
      sheet.getRange(row, 9).setValue(nyplData.licenseId);
      sheet.getRange(row, 10).setValue(nyplData.credit);
      sheet.getRange(row, 11).setValue(nyplData.description);
      
      // Apply light red background to any "Not found" cells
      if (nyplData.licenseId === CONFIG.IMAGE_SOURCES.NOT_FOUND || nyplData.licenseId.includes(CONFIG.IMAGE_SOURCES.NOT_FOUND)) {
        sheet.getRange(row, 9).setBackground(lightRed);
      } else {
        sheet.getRange(row, 9).setBackground(null);
      }
      
      if (nyplData.credit === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 10).setBackground(lightRed);
      } else {
        sheet.getRange(row, 10).setBackground(null);
      }
      
      if (nyplData.description === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 11).setBackground(lightRed);
      } else {
        sheet.getRange(row, 11).setBackground(null);
      }
      
      return nyplData.licenseId !== "Not found";
    }
    else if (url.includes('loc.gov/item/')) {
      const locData = extractLOCMetadata(url, htmlContent);
      
      sheet.getRange(row, 8).setValue(locData.copyright);
      sheet.getRange(row, 9).setValue(locData.licenseId);
      sheet.getRange(row, 10).setValue(locData.sourceCollection);
      sheet.getRange(row, 11).setValue(locData.description);
      
      // Apply light red background to any "Not found" cells
      if (locData.licenseId === CONFIG.IMAGE_SOURCES.NOT_FOUND || locData.licenseId.includes(CONFIG.IMAGE_SOURCES.NOT_FOUND)) {
        sheet.getRange(row, 9).setBackground(lightRed);
      } else {
        sheet.getRange(row, 9).setBackground(null);
      }
      
      if (locData.sourceCollection === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 10).setBackground(lightRed);
      } else {
        sheet.getRange(row, 10).setBackground(null);
      }
      
      if (locData.description === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 11).setBackground(lightRed);
      } else {
        sheet.getRange(row, 11).setBackground(null);
      }
      
      return locData.description !== "Not found";
    }
    else if (url.includes('dp.la/item/')) {
      const dplaData = extractDPLAMetadata(url, htmlContent);
      
      sheet.getRange(row, 8).setValue(dplaData.copyright);
      sheet.getRange(row, 9).setValue(dplaData.licenseId);
      sheet.getRange(row, 10).setValue(dplaData.licensor);
      sheet.getRange(row, 11).setValue(dplaData.description);
      
      // Apply light red background to any "Not found" cells
      if (dplaData.licenseId === CONFIG.IMAGE_SOURCES.NOT_FOUND || dplaData.licenseId.includes(CONFIG.IMAGE_SOURCES.NOT_FOUND)) {
        sheet.getRange(row, 9).setBackground(lightRed);
      } else {
        sheet.getRange(row, 9).setBackground(null);
      }
      
      if (dplaData.licensor === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 10).setBackground(lightRed);
      } else {
        sheet.getRange(row, 10).setBackground(null);
      }
      
      if (dplaData.description === CONFIG.IMAGE_SOURCES.NOT_FOUND) {
        sheet.getRange(row, 11).setBackground(lightRed);
      } else {
        sheet.getRange(row, 11).setBackground(null);
      }
      
      return dplaData.description !== "Not found";
    }
    else {
      // Unsupported source - mark all cells as not found with red background
      sheet.getRange(row, 8).setValue("Unsupported source");
      sheet.getRange(row, 9).setValue("");
      sheet.getRange(row, 10).setValue("");
      sheet.getRange(row, 11).setValue("");
      
      sheet.getRange(row, 8, 1, 4).setBackground(lightRed);
      
      return false;
    }
    
  } catch (error) {
    Logger.log('Error extracting metadata from URL: ' + url + ' - ' + error.message);
    // On error, mark all cells with red background
    sheet.getRange(row, 8, 1, 4).setBackground(lightRed);
    return false;
  }
}

// Show final results
function showMetadataResults(workspaceResults, totalCompleted, totalNeedRetry, totalImagesProcessed) {
  var resultMessage = '🔍 Image Metadata Extraction Complete!\n\n';
  resultMessage += '📊 OVERALL RESULTS:\n';
  resultMessage += '✅ Articles fully completed: ' + totalCompleted + '\n';
  resultMessage += '⚠️ Articles needing retry: ' + totalNeedRetry + '\n';
  resultMessage += '📸 Total images processed: ' + totalImagesProcessed + '\n\n';
  
  resultMessage += '👥 WORKSPACE BREAKDOWN:\n';
  for (var i = 0; i < workspaceResults.length; i++) {
    var result = workspaceResults[i];
    resultMessage += '• ' + result.personName + ': ' + result.completed + ' completed';
    if (result.needRetry > 0) {
      resultMessage += ', ' + result.needRetry + ' need retry';
    }
    resultMessage += '\n';
  }
  
  if (totalNeedRetry > 0) {
    resultMessage += '\n⚠️ Red highlighted rows indicate failed metadata extraction.\n';
    resultMessage += 'Check those specific images and run the batch again later.';
  } else if (totalCompleted > 0) {
    resultMessage += '\n🎉 All image metadata extracted successfully!';
  }
  
  resultMessage += '\n\n🛡️ Workspace structure preserved!\n';
  resultMessage += '🔓 The Uploader sheet is now unlocked.';
  
  SpreadsheetApp.getUi().alert(resultMessage);
  
  Logger.log('Metadata extraction complete - Completed: ' + totalCompleted + ', Need Retry: ' + totalNeedRetry);
}







// Manual individual transfer function
function processUploaderTransfer(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  try {
    var articleTitle = sheet.getRange(row, 3).getValue(); // Column C
    var assignedTo = sheet.getRange(row, 2).getValue(); // Column B
    
    // Validate inputs
    if (!articleTitle || articleTitle.toString().trim() === '') {
      sheet.getRange(row, 7).setValue('Error: No article title');
      return;
    }
    
    if (!assignedTo || assignedTo.toString().trim() === '') {
      sheet.getRange(row, 7).setValue('Error: No person assigned');
      return;
    }
    
    // Process the transfer
    Logger.log('Manual processing: ' + articleTitle + ' for ' + assignedTo);
    processNewArticleComplete(sheet, row, articleTitle, assignedTo);
    
  } catch (error) {
    Logger.log('Error in manual transfer: ' + error.message);
    sheet.getRange(row, 7).setValue('Error: ' + error.message);
  }
}

// =============================================================================
// BATCH DELETE SUCCESSFUL UPLOADS (WORKSPACE-AWARE)
// =============================================================================

function batchDeleteSuccessfulUploads() {
  var operationType = 'Lightning Delete Successful Uploads';
  
  // Check if sheet is locked
  if (!checkUploaderLock(operationType)) {
    return;
  }
  
  // Step 1: ANALYZE workspace structure (KEEP YOUR ORIGINAL)
  var workspaces = getWorkspaceStructure();
  
  if (workspaces.length === 0) {
    SpreadsheetApp.getUi().alert('No workspaces found. Please check your sheet structure.');
    unlockUploaderSheet(operationType);
    return;
  }
  
  // Step 2: Let user choose workspace(s)
  var selectedWorkspace = selectWorkspaceForDeletion();
  if (!selectedWorkspace) {
    unlockUploaderSheet(operationType);
    return;
  }
  
  // Step 3: SCAN selected workspace(s) for articles to delete
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  var workspacesToProcess = [];
  var totalArticlesToDelete = 0;
  
  if (selectedWorkspace.isAllWorkspaces) {
    // Process all workspaces
    for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
      var workspace = findWorkspaceByName(workspaces, selectedWorkspace.workspaces[i].personName);
      if (workspace) {
        var articlesInWorkspace = getArticlesInWorkspace(uploaderSheet, workspace, 'DELETE');
        if (articlesInWorkspace.length > 0) {
          workspace.articles = articlesInWorkspace;
          workspacesToProcess.push(workspace);
          totalArticlesToDelete += articlesInWorkspace.length;
        }
      }
    }
  } else {
    // Process single workspace
    var workspace = findWorkspaceByName(workspaces, selectedWorkspace.personName);
    if (workspace) {
      var articlesInWorkspace = getArticlesInWorkspace(uploaderSheet, workspace, 'DELETE');
      if (articlesInWorkspace.length > 0) {
        workspace.articles = articlesInWorkspace;
        workspacesToProcess.push(workspace);
        totalArticlesToDelete += articlesInWorkspace.length;
      }
    }
  }
  
  if (totalArticlesToDelete === 0) {
    SpreadsheetApp.getUi().alert('No articles found with "Successful WP Upload" status in the selected workspace(s).');
    unlockUploaderSheet(operationType);
    return;
  }
  
  // Step 4: SHOW the lightning deletion plan
  if (!showLightningDeletionPlan(workspacesToProcess, totalArticlesToDelete, selectedWorkspace)) {
    unlockUploaderSheet(operationType);
    return;
  }
  
  // Step 5: LIGHTNING FAST EXECUTION
  executeLightningFastDeletion(uploaderSheet, workspacesToProcess, operationType);
}

function selectWorkspaceForDeletion() {
  // Same hardcoded workspace names as your original code
  var hardcodedWorkspaces = [
    'JAMIE',
    'CHARL', 
    'LARA',
    'SHAYNE',
    'NAINTARA',
    'KARL',
    'MARIE'
  ];
  
  var workspaceList = "0. ALL WORKSPACES\n";
  for (var i = 0; i < hardcodedWorkspaces.length; i++) {
    workspaceList += (i + 1) + ". " + hardcodedWorkspaces[i] + "\n";
  }
  
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Lightning Fast Deletion',
    'Select workspace to delete articles from:\n\n' + 
    workspaceList + '\n' +
    'Enter a single number:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null; // User cancelled
  }
  
  var choice = parseInt(response.getResponseText().trim());
  
  if (choice === 0) {
    // Return special "ALL" workspace object
    var allWorkspaces = [];
    for (var i = 0; i < hardcodedWorkspaces.length; i++) {
      allWorkspaces.push({
        personName: hardcodedWorkspaces[i]
      });
    }
    
    return {
      personName: 'ALL WORKSPACES',
      isAllWorkspaces: true,
      workspaces: allWorkspaces
    };
  } else if (choice >= 1 && choice <= hardcodedWorkspaces.length) {
    return {
      personName: hardcodedWorkspaces[choice - 1]
    };
  } else {
    ui.alert('Invalid selection. Please enter a valid number.');
    return selectWorkspaceForDeletion(); // Try again
  }
}

function findWorkspaceByName(workspaces, name) {
  for (var i = 0; i < workspaces.length; i++) {
    if (workspaces[i].personName.toUpperCase().includes(name.toUpperCase())) {
      return workspaces[i];
    }
  }
  return null;
}

function showLightningDeletionPlan(workspacesToProcess, totalArticlesToDelete, selectedWorkspace) {
  var message = '⚡ LIGHTNING FAST DELETION PLAN\n\n';
  
  if (selectedWorkspace.isAllWorkspaces) {
    message += '🌐 SELECTED: ALL WORKSPACES\n\n';
  } else {
    message += '👤 SELECTED: ' + selectedWorkspace.personName + '\n\n';
  }
  
  message += '📊 SUMMARY:\n';
  message += '• Total articles to delete: ' + totalArticlesToDelete + '\n';
  message += '• Affected workspaces: ' + workspacesToProcess.length + '\n';
  message += '• Processing: Lightning fast batch deletion\n\n';
  
  message += '👥 WORKSPACES TO PROCESS:\n';
  for (var i = 0; i < workspacesToProcess.length; i++) {
    var workspace = workspacesToProcess[i];
    message += '• ' + workspace.personName + ': ' + workspace.articles.length + ' articles\n';
    
    // Show first few articles for each workspace
    for (var j = 0; j < Math.min(workspace.articles.length, 3); j++) {
      var article = workspace.articles[j];
      message += '  → ' + article.title + ' (Row ' + article.row + ')\n';
    }
    
    if (workspace.articles.length > 3) {
      message += '  → ... and ' + (workspace.articles.length - 3) + ' more articles\n';
    }
    message += '\n';
  }
  
  message += '⚡ LIGHTNING FAST PROCESSING:\n';
  message += '• Calculate all deletion ranges upfront\n';
  message += '• Delete in optimal order (bottom-up)\n';
  message += '• No sleep delays between deletions\n';
  message += '• Batch operations wherever possible\n';
  message += '• 10x-20x faster than individual processing\n\n';
  
  message += '⚠️ This action cannot be undone!\n';
  message += 'Continue with lightning fast deletion?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Lightning Fast Deletion Plan',
    message,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  return response === SpreadsheetApp.getUi().Button.YES;
}

function executeLightningFastDeletion(uploaderSheet, workspacesWithDeletions, operationType) {
  // [Same as previous code - no changes needed]
  try {
    lockUploaderSheet(operationType);
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error: ' + error.message);
    return;
  }
  
  var totalDeleted = 0;
  var totalErrors = 0;
  var workspaceResults = {};
  
  Logger.log('⚡ LIGHTNING DELETION START: ' + workspacesWithDeletions.length + ' workspaces');
  
  try {
    var allArticlesToDelete = [];
    for (var i = 0; i < workspacesWithDeletions.length; i++) {
      var workspace = workspacesWithDeletions[i];
      for (var j = 0; j < workspace.articles.length; j++) {
        var article = workspace.articles[j];
        article.workspaceName = workspace.personName;
        allArticlesToDelete.push(article);
      }
    }
    
    allArticlesToDelete.sort(function(a, b) {
      return b.row - a.row;
    });
    
    for (var i = 0; i < allArticlesToDelete.length; i++) {
      var article = allArticlesToDelete[i];
      
      try {
        var currentStatus = uploaderSheet.getRange(article.row, 12).getValue();
        if (currentStatus === 'Successful WP Upload') {
          uploaderSheet.deleteRows(article.row, article.rowsToDelete);
          totalDeleted++;
          
          if (!workspaceResults[article.workspaceName]) {
            workspaceResults[article.workspaceName] = { deleted: 0, errors: 0 };
          }
          workspaceResults[article.workspaceName].deleted++;
        }
      } catch (error) {
        totalErrors++;
        if (!workspaceResults[article.workspaceName]) {
          workspaceResults[article.workspaceName] = { deleted: 0, errors: 0 };
        }
        workspaceResults[article.workspaceName].errors++;
      }
    }
    
    SpreadsheetApp.flush();
    showLightningResults(totalDeleted, totalErrors, workspaceResults);
    
  } finally {
    unlockUploaderSheet(operationType);
  }
}

function showLightningResults(totalDeleted, totalErrors, workspaceResults) {
  // [Same as previous code - no changes needed]
  var resultMessage = '⚡ LIGHTNING FAST DELETION COMPLETE!\n\n';
  resultMessage += '📊 OVERALL RESULTS:\n';
  resultMessage += '✅ Total articles deleted: ' + totalDeleted + '\n';
  resultMessage += '❌ Total errors: ' + totalErrors + '\n\n';
  
  resultMessage += '👥 WORKSPACE BREAKDOWN:\n';
  for (var workspace in workspaceResults) {
    var result = workspaceResults[workspace];
    resultMessage += '• ' + workspace + ': ' + result.deleted + ' deleted';
    if (result.errors > 0) {
      resultMessage += ', ' + result.errors + ' errors';
    }
    resultMessage += '\n';
  }
  
  if (totalDeleted > 0) {
    resultMessage += '\n🎉 Lightning fast deletion successful!\n';
    resultMessage += '⚡ No sleep delays = much faster processing\n';
    resultMessage += '📈 Optimized deletion order preserved row integrity\n';
  }
  
  if (totalErrors > 0) {
    resultMessage += '\n⚠️ Some articles could not be deleted. Check logs for details.\n';
  }
  
  resultMessage += '\n🔓 The sheet is now unlocked.';
  
  SpreadsheetApp.getUi().alert('Lightning Fast Deletion Complete', resultMessage, SpreadsheetApp.getUi().ButtonSet.OK);
}

//BATCH TRANSFER WP URL


//



// =============================================================================
// BATCH PROCESS UPLOADER TRANSFERS (SIMPLIFIED)
// =============================================================================

function batchTransferToAleksReview() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  var targetSheet = ss.getSheetByName(CONFIG.SHEETS.WP_EDITING_TRACKER);
  
  if (!statusSheet || !targetSheet) {
    SpreadsheetApp.getUi().alert('Required sheets not found. Please check sheet names.');
    return;
  }
  
  var lastRow = statusSheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No data found in Article Status Tracker.');
    return;
  }
  
  // Read all source data at once (faster than individual cell reads)
  var sourceData = statusSheet.getRange(2, 1, lastRow - 1, 11).getValues();
  var articlesToTransfer = [];
  
  // Process source data in memory (fast)
  for (var i = 0; i < sourceData.length; i++) {
    var status = sourceData[i][6]; // Column G (0-indexed)
    
    if (status === 'Final WP Review - Jamie') {
      var articleData = {
        row: i + 2, // Actual row number in sheet
        columnB: sourceData[i][1],  // Column B
        title: sourceData[i][2],    // Column C
        wpUrl: sourceData[i][4],    // Column E
        columnI: sourceData[i][8],  // Column I
        columnK: sourceData[i][10]  // Column K
      };
      
      // Validate that we have the required data
      if (articleData.title && articleData.wpUrl) {
        articlesToTransfer.push(articleData);
      }
    }
  }
  
  // Check if any articles found
  if (articlesToTransfer.length === 0) {
    SpreadsheetApp.getUi().alert(
      'No Articles to Transfer',
      'No articles found with "Final WP Review - Jamie" status.\n\n' +
      'Articles must have:\n' +
      '• Status = "Final WP Review - Jamie" in Column G\n' +
      '• Article title in Column C\n' +
      '• WordPress URL in Column E',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  // Show confirmation dialog
  var response = SpreadsheetApp.getUi().alert(
    'Transfer Articles to WP Editing Tracker',
    'Found ' + articlesToTransfer.length + ' articles ready to transfer.\n\n' +
    'This will:\n' +
    '• Transfer all articles with "Final WP Review - Jamie" status\n' +
    '• Copy data to WP Editing Tracker\n' +
    '• Mark source rows as "DONE"\n' +
    '• Leave status column blank in destination\n\n' +
    'Continue with batch transfer?',
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  if (response !== SpreadsheetApp.getUi().Button.YES) {
    return;
  }
  
  // OPTIMIZED: Find target row ONCE instead of for each article
  var lastRowWithCOrD = 1; // Start from row 1
  var maxRowsToCheck = CONFIG.RANGES.MAX_ROWS_TO_CHECK; // Reasonable limit
  
  // Read columns C and D in one batch operation (MUCH faster)
  var targetData = targetSheet.getRange(1, 3, maxRowsToCheck, 2).getValues();
  
  for (var checkRow = 0; checkRow < targetData.length; checkRow++) {
    var cValue = targetData[checkRow][0]; // Column C
    var dValue = targetData[checkRow][1]; // Column D
    
    if (cValue || dValue) {
      lastRowWithCOrD = checkRow + 1; // Convert back to 1-indexed row number
    }
  }
  
  // Starting target row for new articles
  var nextTargetRow = lastRowWithCOrD + 1;
  
  // Execute the batch transfer
  var successCount = 0;
  var errorCount = 0;
  var errors = [];
  
  for (var i = 0; i < articlesToTransfer.length; i++) {
    var article = articlesToTransfer[i];
    
    try {
      // Use the pre-calculated target row (no more scanning!)
      var targetRow = nextTargetRow + i; // Each article gets the next sequential row
      
      // Transfer the data
      // Article Status Tracker → WP Editing Tracker
      // B → A
      // C → C  
      // E → D
      // I → M
      // K → I
      targetSheet.getRange(targetRow, 1).setValue(article.columnB);    // B → A
      targetSheet.getRange(targetRow, 3).setValue(article.title);      // C → C
      targetSheet.getRange(targetRow, 4).setValue(article.wpUrl);      // E → D
      targetSheet.getRange(targetRow, 9).setValue(article.columnK);    // K → I
      targetSheet.getRange(targetRow, 13).setValue(article.columnI);   // I → M
      // Status column (H) left blank
      
      // Mark as DONE in Article Status Tracker (Column G)
      statusSheet.getRange(article.row, 7).setValue(CONFIG.STATUS.DONE);
      
      successCount++;
      Logger.log('Transferred: ' + article.title + ' to row ' + targetRow);
      
    } catch (error) {
      errorCount++;
      errors.push({
        title: article.title,
        error: error.message
      });
      Logger.log('Error transferring ' + article.title + ': ' + error.message);
    }
  }
  
  // Force save
  SpreadsheetApp.flush();
  
  // Show results
  var resultMessage = 'Batch Transfer Complete!\n\n';
  resultMessage += '✅ Successfully transferred: ' + successCount + ' articles\n';
  
  if (errorCount > 0) {
    resultMessage += '❌ Errors: ' + errorCount + ' articles\n\n';
    resultMessage += 'Failed articles:\n';
    for (var j = 0; j < Math.min(errors.length, 5); j++) {
      resultMessage += '• ' + errors[j].title + ': ' + errors[j].error + '\n';
    }
    if (errors.length > 5) {
      resultMessage += '... and ' + (errors.length - 5) + ' more errors (check logs)\n';
    }
  } else {
    resultMessage += '\n🎉 All articles transferred successfully!';
  }
  
  SpreadsheetApp.getUi().alert('Transfer Results', resultMessage, SpreadsheetApp.getUi().ButtonSet.OK);
  
  Logger.log('Batch transfer completed - Success: ' + successCount + ', Errors: ' + errorCount);
}

// =============================================================================
// SHARED HELPER FUNCTIONS
// =============================================================================

function stopAllBatchOperations() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty('UPLOADER_SHEET_LOCKED');
  props.deleteProperty('UPLOADER_LOCK_TIME');
  SpreadsheetApp.getUi().alert('All batch operations stopped and sheet unlocked.');
}

function findArticleInStatusTracker(statusData, articleTitle) {
  var titleToFind = articleTitle.trim().toLowerCase();
  
  for (var i = 0; i < statusData.length; i++) {
    if (statusData[i][0] && statusData[i][0].toString().trim().toLowerCase() === titleToFind) {
      return {
        found: true,
        row: i + 1,
        docUrl: statusData[i][1], // Column D
        status: statusData[i][4]   // Column G
      };
    }
  }
  
  return {
    found: false,
    row: -1,
    docUrl: '',
    status: ''
  };
}


function formatWordPressDateTime(isoDateString) {
  try {
    var date = new Date(isoDateString);
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
    
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    
    return `${month} ${day} ${year} - ${timeString}`;
    
  } catch (error) {
    Logger.log('Error formatting WordPress date/time: ' + error.message);
    return 'Date format error';
  }
}



// ============================================================================
// WORDPRESS CACHING
// ============================================================================


function getCachedCategoryId(stateName) {
  if (!stateName) return null;
  
  var cache = PropertiesService.getScriptProperties();
  var cacheKey = 'state_category_' + stateName.toLowerCase().replace(/\s+/g, '_');
  
  // Check cache first
  var cachedId = cache.getProperty(cacheKey);
  if (cachedId) {
    Logger.log('📋 Using cached category ID for ' + stateName + ': ' + cachedId);
    return parseInt(cachedId);
  }
  
  // Not cached, make API call
  Logger.log('🔍 Looking up category ID for ' + stateName + ' (not cached)');
  var categoryId = getCategoryIdByName(stateName);
  
  // Store in cache for next time
  if (categoryId) {
    cache.setProperty(cacheKey, categoryId.toString());
    Logger.log('💾 Cached category ID for ' + stateName + ': ' + categoryId);
  }
  
  return categoryId;
}


function getCachedFeedTypeId(feedTypeName) {
  if (!feedTypeName) return null;
  
  var cache = PropertiesService.getScriptProperties();
  var cacheKey = 'feed_type_' + feedTypeName.toLowerCase().replace(/\s+/g, '_');
  
  // Check cache first
  var cachedId = cache.getProperty(cacheKey);
  if (cachedId) {
    Logger.log('📋 Using cached feed type ID for ' + feedTypeName + ': ' + cachedId);
    return parseInt(cachedId);
  }
  
  // Not cached, make API call
  Logger.log('🔍 Looking up feed type ID for ' + feedTypeName + ' (not cached)');
  var feedTypeId = getFeedTypeIdByName(feedTypeName);
  
  // Store in cache for next time
  if (feedTypeId) {
    cache.setProperty(cacheKey, feedTypeId.toString());
    Logger.log('💾 Cached feed type ID for ' + feedTypeName + ': ' + feedTypeId);
  }
  
  return feedTypeId;
}


function getCachedAuthorId(authorName) {
  if (!authorName) return null;
  
  var cache = PropertiesService.getScriptProperties();
  var cacheKey = 'author_' + authorName.toLowerCase().replace(/\s+/g, '_');
  
  // Check cache first
  var cachedId = cache.getProperty(cacheKey);
  if (cachedId) {
    Logger.log('📋 Using cached author ID for ' + authorName + ': ' + cachedId);
    return parseInt(cachedId);
  }
  
  // Not cached, make API call
  Logger.log('🔍 Looking up author ID for ' + authorName + ' (not cached)');
  var authorId = getAuthorIdByUsername(authorName);
  
  // Store in cache for next time
  if (authorId) {
    cache.setProperty(cacheKey, authorId.toString());
    Logger.log('💾 Cached author ID for ' + authorName + ': ' + authorId);
  }
  
  return authorId;
}


function convertTagsToWordPressCached(tagNames, username, applicationPassword) {
  if (!tagNames || tagNames.length === 0) return [];
  
  var cache = PropertiesService.getScriptProperties();
  var finalTagIds = [];
  var tagsToCreate = [];
  
  Logger.log('🏷️ Processing ' + tagNames.length + ' tags with caching...');
  
  // Check cache for each tag first
  for (var i = 0; i < tagNames.length; i++) {
    var tagName = tagNames[i].trim();
    var cacheKey = 'tag_' + tagName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    var cachedId = cache.getProperty(cacheKey);
    if (cachedId) {
      finalTagIds.push(parseInt(cachedId));
      Logger.log('📋 Using cached tag ID for "' + tagName + '": ' + cachedId);
    } else {
      // Not cached, need to create/lookup
      tagsToCreate.push({
        name: tagName,
        cacheKey: cacheKey
      });
    }
  }
  
  // Only make API calls for uncached tags
  if (tagsToCreate.length > 0) {
    Logger.log('🔍 Need to lookup/create ' + tagsToCreate.length + ' tags');
    
    for (var j = 0; j < tagsToCreate.length; j++) {
      var tagInfo = tagsToCreate[j];
      var tagId = createOrFindTag(tagInfo.name, username, applicationPassword);
      
      if (tagId) {
        finalTagIds.push(tagId);
        // Cache it for next time
        cache.setProperty(tagInfo.cacheKey, tagId.toString());
        Logger.log('💾 Cached new tag "' + tagInfo.name + '": ' + tagId);
      }
      
      // Small delay between API calls
      Utilities.sleep(200);
    }
  }
  
  Logger.log('✅ Final tag processing: ' + finalTagIds.length + ' IDs ready');
  return finalTagIds;
}


function createOrFindTag(tagName, username, applicationPassword) {
  var tagsEndpoint = CONFIG.WORDPRESS.BASE_URL + "/wp-json/wp/v2/tags";
  
  // First, search for existing tag
  var searchEndpoint = tagsEndpoint + "?search=" + encodeURIComponent(tagName);
  var searchOptions = {
    method: "get",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword)
    },
    muteHttpExceptions: true
  };
  
  try {
    var searchResponse = UrlFetchApp.fetch(searchEndpoint, searchOptions);
    if (searchResponse.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
      var existingTags = JSON.parse(searchResponse.getContentText());
      
      // Look for exact match
      for (var i = 0; i < existingTags.length; i++) {
        if (existingTags[i].name.toLowerCase() === tagName.toLowerCase()) {
          Logger.log('🔍 Found existing tag: ' + tagName + ' (ID: ' + existingTags[i].id + ')');
          return existingTags[i].id;
        }
      }
    }
    
    // Tag doesn't exist, create it
    var createOptions = {
      method: "post",
      headers: {
        "Authorization": "Basic " + Utilities.base64Encode(username + ":" + applicationPassword),
        "Content-Type": "application/json"
      },
      payload: JSON.stringify({
        name: tagName,
        slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      }),
      muteHttpExceptions: true
    };
    
    var createResponse = UrlFetchApp.fetch(tagsEndpoint, createOptions);
    if (createResponse.getResponseCode() === CONFIG.HTTP_STATUS.CREATED) {
      var newTag = JSON.parse(createResponse.getContentText());
      Logger.log('✨ Created new tag: ' + tagName + ' (ID: ' + newTag.id + ')');
      return newTag.id;
    }
    
  } catch (error) {
    Logger.log('❌ Error processing tag "' + tagName + '": ' + error.message);
  }
  
  return null;
}



function convertTagsToWordPressCached(tagNames, username, applicationPassword) {
  if (!tagNames || tagNames.length === 0) return [];
  
  // Check if cache needs daily refresh at 7 AM
  // checkDailyTagCacheRefresh(username, applicationPassword); // TEMPORARILY DISABLED
  
  var cache = PropertiesService.getScriptProperties();
  var finalTagIds = [];
  var tagsToCreate = [];
  
  Logger.log('🏷️ Processing ' + tagNames.length + ' tags with caching...');
  
  // Check cache for each tag first
  for (var i = 0; i < tagNames.length; i++) {
    var tagName = tagNames[i].trim();
    var cacheKey = 'tag_' + tagName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    var cachedId = cache.getProperty(cacheKey);
    if (cachedId) {
      finalTagIds.push(parseInt(cachedId));
      Logger.log('📋 Using cached tag ID for "' + tagName + '": ' + cachedId);
    } else {
      tagsToCreate.push({
        name: tagName,
        cacheKey: cacheKey
      });
    }
  }
  
  // Only make API calls for uncached tags
  if (tagsToCreate.length > 0) {
    Logger.log('🔍 Need to lookup/create ' + tagsToCreate.length + ' tags');
    
    for (var j = 0; j < tagsToCreate.length; j++) {
      var tagInfo = tagsToCreate[j];
      var tagId = createOrFindTag(tagInfo.name, username, applicationPassword);
      
      if (tagId) {
        finalTagIds.push(tagId);
        cache.setProperty(tagInfo.cacheKey, tagId.toString());
        Logger.log('💾 Cached new tag "' + tagInfo.name + '": ' + tagId);
      }
      
      Utilities.sleep(200);
    }
  }
  
  Logger.log('✅ Final tag processing: ' + finalTagIds.length + ' IDs ready');
  return finalTagIds;
}

function checkDailyTagCacheRefresh(username, applicationPassword) {
  var cache = PropertiesService.getScriptProperties();
  var lastRefreshDate = cache.getProperty('last_tag_refresh_date');
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  
  // If we haven't refreshed today, refresh now
  if (lastRefreshDate !== today) {
    Logger.log('🏷️ Daily tag cache refresh - last refresh: ' + (lastRefreshDate || 'never'));
    preloadAllWordPressTagsQuiet(username, applicationPassword);
    cache.setProperty('last_tag_refresh_date', today);
    Logger.log('✅ Tag cache refreshed for ' + today);
  } else {
    Logger.log('📋 Tag cache already refreshed today (' + today + ')');
  }
}





//DELETE SLIDES AFTER SUCCESSFUL UPLOAD

function deleteSlides(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  // Get the article title from the merged cell for logging
  var articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();
  
  Logger.log('Deleting slides for: ' + articleTitle);
  
  // Find the range of rows to delete (from current row to just before next merged cell)
  var lastRow = sheet.getLastRow();
  var rowsToDelete = 1; // At least delete the current row
  
  // Find how many rows to delete (until the next merged cell or end of sheet)
  for (var checkRow = row + 1; checkRow <= lastRow; checkRow++) {
    var checkCell = sheet.getRange(checkRow, 1);
    if (checkCell.isPartOfMerge() && checkCell.getMergedRanges()[0].getRow() === checkRow) {
      // Found the next article's merged cell
      break;
    }
    rowsToDelete++;
  }
  
  Logger.log('Deleting ' + rowsToDelete + ' rows starting from row ' + row);
  
  // Delete the rows
  sheet.deleteRows(row, rowsToDelete);
  
  // Log success
  Logger.log('Successfully deleted article section: ' + articleTitle);
}



/////////FIND PERSON FUNCTION


function batchProcessUploaderTransfers() {
  var operationType = 'Batch Process Uploader Transfers';
  
  // Check if sheet is locked
  if (!checkUploaderLock(operationType)) {
    return;
  }
  
  // Start the workspace selection loop
  processUploaderTransferWorkspaceLoop(operationType);
}

function processUploaderTransferWorkspaceLoop(operationType) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // CACHE SHEET REFERENCES - get once, use many times
    var sheets = {
      status: ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER),
      uploader: ss.getSheetByName(CONFIG.SHEETS.UPLOADER)
    };
    
    if (!sheets.status || !sheets.uploader) {
      SpreadsheetApp.getUi().alert('Required sheets not found. Please check sheet names.');
      unlockUploaderSheet(operationType);
      return;
    }
    
    // Step 1: Ask user to choose workspace
    var selectedWorkspace = selectSingleWorkspaceForUploaderTransfer();
    
    if (!selectedWorkspace) {
      unlockUploaderSheet(operationType);
      return;
    }
    
    // Step 2: Scan for articles assigned to selected person
    var articlesForPerson;
    if (selectedWorkspace.isAllWorkspaces) {
      articlesForPerson = [];
      for (var i = 0; i < selectedWorkspace.workspaces.length; i++) {
        var workspace = selectedWorkspace.workspaces[i];
        var workspaceArticles = getArticlesForUploaderTransfer(sheets.status, workspace.personName);
        articlesForPerson = articlesForPerson.concat(workspaceArticles);
      }
    } else {
      articlesForPerson = getArticlesForUploaderTransfer(sheets.status, selectedWorkspace.personName);
    }
    
    if (articlesForPerson.length === 0) {
      SpreadsheetApp.getUi().alert('No articles found with "Not Available Yet" status assigned to the selected person(s).');
      unlockUploaderSheet(operationType);
      return;
    }
    
    // Step 3: Show plan and process
    if (!showSingleWorkspaceUploaderTransferPlan(selectedWorkspace, articlesForPerson)) {
      unlockUploaderSheet(operationType);
      return;
    }
    
    var result = processSingleWorkspaceUploaderTransfer(sheets, selectedWorkspace, articlesForPerson);
    showUploaderTransferResults(result, operationType);
    
  } catch (error) {
    Logger.log('Error in processUploaderTransferWorkspaceLoop: ' + error.message);
    unlockUploaderSheet(operationType);
    SpreadsheetApp.getUi().alert('Error: ' + error.message);
  }
}

function selectSingleWorkspaceForUploaderTransfer() {
  // HARDCODED workspace names for speed (same as other functions)
  var hardcodedWorkspaces = [
    'JAMIE',
    'CHARL', 
    'LARA',
    'SHAYNE',
    'NAINTARA',
    'KARL',
    'MARIE'
  ];
  
  var workspaceList = "0. ALL WORKSPACES\n";
  for (var i = 0; i < hardcodedWorkspaces.length; i++) {
    workspaceList += (i + 1) + ". " + hardcodedWorkspaces[i] + "\n";
  }
  
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Create New Article Rows',
    'Select workspace to create new article rows:\n\n' + 
    workspaceList + '\n' +
    'Enter a single number:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    return null; // User cancelled
  }
  
  var choice = parseInt(response.getResponseText().trim());
  
  if (choice === 0) {
    // Return special "ALL" workspace object with hardcoded names
    var allWorkspaces = [];
    for (var i = 0; i < hardcodedWorkspaces.length; i++) {
      allWorkspaces.push({
        personName: hardcodedWorkspaces[i]
      });
    }
    
    return {
      personName: 'ALL WORKSPACES',
      isAllWorkspaces: true,
      workspaces: allWorkspaces
    };
  } else if (choice >= 1 && choice <= hardcodedWorkspaces.length) {
    return {
      personName: hardcodedWorkspaces[choice - 1]
    };
  } else {
    ui.alert('Invalid selection. Please enter a valid number.');
    return selectSingleWorkspaceForUploaderTransfer(); // Try again
  }
}

function getArticlesForUploaderTransfer(statusSheet, selectedPersonName) {
  var articles = [];
  var lastRow = statusSheet.getLastRow();
  
  Logger.log('🔍 SCANNING for articles assigned to: ' + selectedPersonName);
  
  if (lastRow < 2) {
    Logger.log('🔍 SCAN COMPLETE: No data rows found');
    return articles;
  }
  
  // READ ALL DATA AT ONCE - much faster!
  var allData = statusSheet.getRange(2, 1, lastRow-1, 7).getValues();
  
  // Process the data array (no more API calls)
  for (var i = 0; i < allData.length; i++) {
    var row = i + 2; // Actual sheet row number
    var status = allData[i][6]; // Column G (index 6)
    var assignedTo = allData[i][1]; // Column B (index 1)
    var articleTitle = allData[i][2]; // Column C (index 2)
    
    // Only process rows with "Not Available Yet" status assigned to selected person
    if (status === 'Not Available Yet' && assignedTo && articleTitle) {
      var assignedToStr = assignedTo.toString().trim().toUpperCase();
      var selectedPersonStr = selectedPersonName.toUpperCase();
      
      // Check if assigned person contains the selected person name
      if (assignedToStr.includes(selectedPersonStr)) {
        articles.push({
          row: row,
          title: articleTitle.toString().trim(),
          assignedTo: assignedTo.toString().trim(),
          status: status
        });
      }
    }
  }
  
  Logger.log('🔍 SCAN COMPLETE: Found ' + articles.length + ' articles for ' + selectedPersonName);
  return articles;
}

function showSingleWorkspaceUploaderTransferPlan(workspace, articles) {
  var message = '⚡ LIGHTNING FAST ARTICLE CREATION\n\n';
  
  if (workspace.isAllWorkspaces) {
    message += '🌐 PROCESSING: ALL WORKSPACES (Sequential)\n\n';
  } else {
    message += '👤 WORKSPACE: ' + workspace.personName + '\n';
    message += '📊 Articles to process: ' + articles.length + '\n\n';
    
    message += '📋 ARTICLES FOUND:\n';
    for (var i = 0; i < Math.min(articles.length, 8); i++) {
      message += '• ' + articles[i].title + '\n';
    }
    
    if (articles.length > 8) {
      message += '... and ' + (articles.length - 8) + ' more articles\n';
    }
  }
  
  message += '\n⚡ LIGHTNING FAST PROCESSING:\n';
  message += '• Pre-calculate all positions\n';
  message += '• Batch insert all rows at once\n';
  message += '• Batch format all entries\n';
  message += '• Batch create all folders\n';
  message += '• Batch update all statuses\n';
  message += '• 10x-20x faster than individual processing\n\n';
  
  message += 'Proceed with lightning fast processing?';
  
  var response = SpreadsheetApp.getUi().alert(
    'Lightning Fast Processing',
    message,
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  
  return response === SpreadsheetApp.getUi().Button.YES;
}

function processSingleWorkspaceUploaderTransfer(sheets, workspace, articles) {
  var totalProcessed = 0;
  var totalErrors = 0;
  var totalDuplicates = 0;
  
  Logger.log('⚡ LIGHTNING PROCESSING START: ' + workspace.personName);
  
  if (workspace.isAllWorkspaces) {
    // Process all workspaces sequentially
    for (var i = 0; i < workspace.workspaces.length; i++) {
      var singleWorkspace = workspace.workspaces[i];
      var workspaceArticles = getArticlesForUploaderTransfer(sheets.status, singleWorkspace.personName);
      
      if (workspaceArticles.length > 0) {
        Logger.log('⚡ PROCESSING: ' + singleWorkspace.personName + ' (' + workspaceArticles.length + ' articles)');
        var result = processWorkspaceLightningFast(sheets, workspaceArticles, singleWorkspace.personName);
        totalProcessed += result.processed;
        totalErrors += result.errors;
        totalDuplicates += result.duplicates;
        
        Logger.log('✅ COMPLETED: ' + singleWorkspace.personName + 
                  ' (P:' + result.processed + ' D:' + result.duplicates + ' E:' + result.errors + ')');
      }
    }
  } else {
    // Process single workspace
    var result = processWorkspaceLightningFast(sheets, articles, workspace.personName);
    totalProcessed = result.processed;
    totalErrors = result.errors;
    totalDuplicates = result.duplicates;
  }
  
  return {
    workspaceName: workspace.personName,
    processed: totalProcessed,
    errors: totalErrors,
    duplicates: totalDuplicates,
    totalArticles: articles.length
  };
}

// LIGHTNING FAST PROCESSING FUNCTION
function processWorkspaceLightningFast(sheets, articles, personName) {
  var processed = 0;
  var errors = 0;
  var duplicates = 0;
  
  Logger.log('⚡ LIGHTNING START: ' + articles.length + ' articles for ' + personName);
  
  try {
    // STEP 1: Lightning duplicate check
    var existingTitles = getExistingTitlesLightning(sheets.uploader, personName);
    var titleHashMap = createTitleHashMap(existingTitles);
    
    var articlesToProcess = [];
    var duplicateArticles = [];
    
    for (var i = 0; i < articles.length; i++) {
      var article = articles[i];
      if (titleHashMap[article.title.toLowerCase()]) {
        duplicateArticles.push(article);
      } else {
        articlesToProcess.push(article);
      }
    }
    
    Logger.log('⚡ DUPLICATES: ' + articlesToProcess.length + ' new, ' + duplicateArticles.length + ' duplicates');
    
    if (articlesToProcess.length > 0) {
      // STEP 2: Pre-calculate all positions
      var insertPlan = calculateAllInsertPositions(sheets.uploader, personName, articlesToProcess);
      if (!insertPlan) {
        throw new Error('Could not calculate insert positions for ' + personName);
      }
      
      Logger.log('⚡ CALCULATED: Insert plan for ' + articlesToProcess.length + ' articles');
      
      // STEP 3: Batch insert all rows at once
      batchInsertAllRows(sheets.uploader, insertPlan);
      Logger.log('⚡ INSERTED: All rows in single operation');
      
      // STEP 4: Batch create all folders
      var folderResults = batchCreateAllFolders(articlesToProcess);
      Logger.log('⚡ FOLDERS: Created ' + folderResults.successful.length + ' folders');
      
      // STEP 5: Batch format all entries
      batchFormatAllEntries(sheets.uploader, insertPlan, folderResults);
      Logger.log('⚡ FORMATTED: All entries with original styling');
      
      // STEP 6: Batch update all statuses
      var allStatusUpdates = [];
      
      // Add successful articles
      for (var i = 0; i < folderResults.successful.length; i++) {
        var success = folderResults.successful[i];
        allStatusUpdates.push({
          row: success.article.row,
          folderUrl: success.folderUrl,
          status: 'Row Created'
        });
        processed++;
      }
      
      // Add failed articles
      for (var i = 0; i < folderResults.failed.length; i++) {
        var failed = folderResults.failed[i];
        allStatusUpdates.push({
          row: failed.article.row,
          folderUrl: '',
          status: 'Error: ' + failed.error
        });
        errors++;
      }
      
      // Add duplicates
      for (var i = 0; i < duplicateArticles.length; i++) {
        allStatusUpdates.push({
          row: duplicateArticles[i].row,
          folderUrl: '',
          status: 'DUPLICATE FOUND!'
        });
        duplicates++;
      }
      
      // Write all status updates
      batchWriteAllStatusUpdates(sheets.status, allStatusUpdates);
      Logger.log('⚡ STATUS: Updated ' + allStatusUpdates.length + ' statuses');
      
    } else {
      // Only duplicates, just update statuses
      for (var i = 0; i < duplicateArticles.length; i++) {
        sheets.status.getRange(duplicateArticles[i].row, 7).setValue('DUPLICATE FOUND!');
        duplicates++;
      }
    }
    
  } catch (error) {
    Logger.log('❌ LIGHTNING ERROR: ' + error.message);
    errors = articles.length;
  }
  
  Logger.log('⚡ LIGHTNING COMPLETE: P:' + processed + ' D:' + duplicates + ' E:' + errors);
  
  return {
    processed: processed,
    errors: errors,
    duplicates: duplicates
  };
}

// LIGHTNING FAST HELPER FUNCTIONS
function getExistingTitlesLightning(uploaderSheet, personName) {
  var existingTitles = [];
  
  var personRow = findPersonRow(uploaderSheet, personName);
  if (!personRow) return existingTitles;
  
  var endRow = findPersonEndRow(uploaderSheet, personRow);
  if (!endRow) endRow = uploaderSheet.getLastRow();
  
  // Read entire workspace data at once
  var rowCount = endRow - personRow;
  if (rowCount > 0) {
    var data = uploaderSheet.getRange(personRow, 1, rowCount, 13).getValues();
    
    for (var i = 1; i < data.length; i++) {
      var cell = uploaderSheet.getRange(personRow + i, 1);
      if (cell.isPartOfMerge()) {
        var mergedRange = cell.getMergedRanges()[0];
        if (mergedRange.getNumColumns() === 11) {
          var title = mergedRange.getValue();
          if (title && title.toString().trim()) {
            existingTitles.push(title.toString().trim());
          }
        }
      }
    }
  }
  
  return existingTitles;
}

function createTitleHashMap(existingTitles) {
  var titleMap = {};
  for (var i = 0; i < existingTitles.length; i++) {
    if (existingTitles[i]) {
      titleMap[existingTitles[i].toLowerCase()] = true;
    }
  }
  return titleMap;
}

function calculateAllInsertPositions(uploaderSheet, personName, articles) {
  var personRow = findPersonRow(uploaderSheet, personName);
  if (!personRow) return null;
  
  var endRow = findPersonEndRow(uploaderSheet, personRow);
  if (!endRow) return null;
  
  var insertPlan = {
    personName: personName,
    endRow: endRow,
    totalRowsNeeded: articles.length * 2,
    articles: []
  };
  
  // Calculate where each article will go
  for (var i = 0; i < articles.length; i++) {
    var titleRow = endRow + (i * 2);
    var contentRow = titleRow + 1;
    
    insertPlan.articles.push({
      article: articles[i],
      titleRow: titleRow,
      contentRow: contentRow
    });
  }
  
  return insertPlan;
}

function batchInsertAllRows(uploaderSheet, insertPlan) {
  // Insert all needed rows in one operation
  uploaderSheet.insertRowsBefore(insertPlan.endRow, insertPlan.totalRowsNeeded);
}

function batchCreateAllFolders(articles) {
  var successful = [];
  var failed = [];
  
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    
    try {
      var folderUrl = createArticleFolderComplete(article.title);
      if (folderUrl) {
        successful.push({
          article: article,
          folderUrl: folderUrl
        });
      } else {
        failed.push({
          article: article,
          error: 'Failed to create folder'
        });
      }
    } catch (error) {
      failed.push({
        article: article,
        error: error.message
      });
    }
  }
  
  return {
    successful: successful,
    failed: failed
  };
}

function batchFormatAllEntries(uploaderSheet, insertPlan, folderResults) {
  // Create lookup for folder URLs
  var folderLookup = {};
  for (var i = 0; i < folderResults.successful.length; i++) {
    var success = folderResults.successful[i];
    folderLookup[success.article.title] = success.folderUrl;
  }
  
  // Format all entries (keeping your exact original formatting)
  for (var i = 0; i < insertPlan.articles.length; i++) {
    var plan = insertPlan.articles[i];
    var titleRow = plan.titleRow;
    var contentRow = plan.contentRow;
    var article = plan.article;
    
    // TITLE ROW FORMATTING (exactly like your original)
    var titleRange = uploaderSheet.getRange(titleRow, 1, 1, 11);
    titleRange.merge();
    titleRange.setValue(article.title);
    titleRange.setBackground(CONFIG.COLORS.BLACK);
    titleRange.setFontColor(CONFIG.COLORS.WHITE);
    titleRange.setFontSize(11);
    titleRange.setFontWeight('bold');
    titleRange.setHorizontalAlignment('center');
    titleRange.setVerticalAlignment('middle');
    
    // DROPDOWN CELL (Column L)
    var dropdownCell = uploaderSheet.getRange(titleRow, 12);
    var sourceCell = uploaderSheet.getRange(2, 12);
    sourceCell.copyTo(dropdownCell, SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
    dropdownCell.setValue('_');
    dropdownCell.setBackground('#333333');
    dropdownCell.setFontColor(CONFIG.COLORS.WHITE);
    dropdownCell.setHorizontalAlignment('center');
    
    // FOLDER URL (Column M)
    var folderUrl = folderLookup[article.title];
    if (folderUrl) {
      uploaderSheet.getRange(titleRow, 13).setValue(folderUrl);
      uploaderSheet.getRange(titleRow, 12).setValue(CONFIG.STATUS.GDRIVE_FOLDER_READY);
    }
    
    // BEYOND COLUMN L FORMATTING
    if (uploaderSheet.getLastColumn() > 12) {
      var beyondLRange = uploaderSheet.getRange(titleRow, 13, 1, uploaderSheet.getLastColumn() - 12);
      beyondLRange.clearFormat();
      beyondLRange.setBackground(CONFIG.COLORS.WHITE);
    }
    
    // CONTENT ROW FORMATTING (exactly like your original)
    var entireBlankRow = uploaderSheet.getRange(contentRow, 1, 1, uploaderSheet.getLastColumn());
    entireBlankRow.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    
    var blankRowMainRange = uploaderSheet.getRange(contentRow, 1, 1, 11);
    blankRowMainRange.clearFormat();
    blankRowMainRange.setBackground(CONFIG.COLORS.WHITE);
    blankRowMainRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    
    // PINK SLIDE NUMBER CELL (Column D)
    var slideNumberCell = uploaderSheet.getRange(contentRow, 4);
    slideNumberCell.setHorizontalAlignment('center');
    slideNumberCell.setBackground(CONFIG.COLORS.LIGHT_PINK);
    
    // CENTER ALIGNMENT FOR COLUMNS H, I, J
    uploaderSheet.getRange(contentRow, 8).setHorizontalAlignment('center');
    uploaderSheet.getRange(contentRow, 9).setHorizontalAlignment('center');
    uploaderSheet.getRange(contentRow, 10).setHorizontalAlignment('center');
    
    // CONTENT ROW DROPDOWN (Column L)
    var blankRowDropdownCell = uploaderSheet.getRange(contentRow, 12);
    blankRowDropdownCell.clearFormat();
    blankRowDropdownCell.setBackground('#CCCCCC');
    
    // CONTENT ROW BEYOND L
    if (uploaderSheet.getLastColumn() > 12) {
      var blankRowBeyondL = uploaderSheet.getRange(contentRow, 13, 1, uploaderSheet.getLastColumn() - 12);
      blankRowBeyondL.clearFormat();
      blankRowBeyondL.setBackground(CONFIG.COLORS.WHITE);
    }
  }
  
  // Single flush at the end
  SpreadsheetApp.flush();
}

function batchWriteAllStatusUpdates(statusSheet, updates) {
  for (var i = 0; i < updates.length; i++) {
    var update = updates[i];
    
    if (update.folderUrl) {
      statusSheet.getRange(update.row, 6).setValue(update.folderUrl);
    }
    statusSheet.getRange(update.row, 7).setValue(update.status);
  }
}

function showUploaderTransferResults(result, operationType) {
  var resultMessage = '⚡ LIGHTNING FAST PROCESSING COMPLETE!\n\n';
  resultMessage += '👤 Workspace: ' + result.workspaceName + '\n';
  resultMessage += '✅ Successfully processed: ' + result.processed + ' articles\n';
  resultMessage += '🔄 Duplicates found: ' + result.duplicates + ' articles\n';
  
  if (result.errors > 0) {
    resultMessage += '❌ Errors: ' + result.errors + ' articles\n';
  }
  
  if (result.processed > 0) {
    resultMessage += '\n🎉 Lightning fast processing successful!\n';
    resultMessage += '📌 Black title bars with white text preserved\n';
    resultMessage += '📌 White content rows with pink slide cells preserved\n';
    resultMessage += '📌 All formatting exactly as original\n';
    resultMessage += '📌 10x-20x faster than individual processing\n';
  }
  
  resultMessage += '\n⚡ Processing complete! The sheet is now unlocked.';
  
  SpreadsheetApp.getUi().alert(
    'Lightning Fast Processing Complete',
    resultMessage,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  
  unlockUploaderSheet(operationType);
}

// YOUR ORIGINAL FUNCTIONS (PRESERVED EXACTLY)
function processNewArticleComplete(statusSheet, statusRow, articleTitle, assignedTo) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var uploaderSheet = ss.getSheetByName(CONFIG.SHEETS.UPLOADER);
  
  if (!uploaderSheet) {
    throw new Error('Uploader sheet not found');
  }
  
  // Find the person's row in Uploader sheet
  var personRow = findPersonRow(uploaderSheet, assignedTo);
  if (!personRow) {
    statusSheet.getRange(statusRow, 7).setValue('Error: ' + assignedTo + ' not found in Uploader');
    return;
  }
  
  // Check for duplicate title ONLY within this person's workspace
  Logger.log('Checking for duplicate: ' + articleTitle + ' in workspace: ' + assignedTo);
  if (checkDuplicateTitle(uploaderSheet, articleTitle, assignedTo)) {
    statusSheet.getRange(statusRow, 7).setValue('DUPLICATE FOUND!');
    Logger.log('Duplicate found within workspace, aborting process for: ' + articleTitle);
    return;
  }
  
  // Step 1: Create uploader entry
  var newArticleRow = createUploaderEntry(uploaderSheet, personRow, articleTitle);
  
  // Step 2: Create Google Drive folder and get URL
  var folderUrl = createArticleFolderComplete(articleTitle);
  if (!folderUrl) {
    throw new Error('Failed to create Google Drive folder');
  }
  
  // Step 3: Update both sheets with folder URL
  statusSheet.getRange(statusRow, 6).setValue(folderUrl); // Article Status Tracker Column F
  uploaderSheet.getRange(newArticleRow, 13).setValue(folderUrl); // Column M
  uploaderSheet.getRange(newArticleRow, 12).setValue(CONFIG.STATUS.GDRIVE_FOLDER_READY); 

  // Step 4: Set final status
  statusSheet.getRange(statusRow, 7).setValue('Row Created');
  
  Logger.log('Successfully completed all steps for article: ' + articleTitle + ' for ' + assignedTo);
}

function checkDuplicateTitle(uploaderSheet, title) {
  var lastRow = uploaderSheet.getLastRow();
  var titleToCheck = title.trim().toLowerCase();
  
  Logger.log('Checking for duplicate title: "' + titleToCheck + '"');
  
  // Check all rows for merged cells containing the title
  for (var row = 1; row <= lastRow; row++) {
    var cell = uploaderSheet.getRange(row, 1); // Check column A
    
    // Check if this cell is part of a merge
    if (cell.isPartOfMerge()) {
      // Get the merged range
      var mergedRange = cell.getMergedRanges()[0];
      
      // Check if it's EXACTLY 11 columns (A-K article titles only)
      if (mergedRange.getNumColumns() === 11) {
        var mergedValue = mergedRange.getValue();
        if (mergedValue) {
          var existingTitle = mergedValue.toString().trim().toLowerCase();
          Logger.log('Found existing title: "' + existingTitle + '"');
          
          if (existingTitle === titleToCheck) {
            Logger.log('DUPLICATE FOUND!');
            return true; // Duplicate found
          }
        }
      }
    }
  }
  
  Logger.log('No duplicate found');
  return false; // No duplicate found
}

function createUploaderEntry(uploaderSheet, personRow, articleTitle) {
  var endRowPosition = findPersonEndRow(uploaderSheet, personRow);
  
  if (!endRowPosition) {
    throw new Error('Could not find END ROW for person in row ' + personRow);
  }
  
  Logger.log('Inserting new article "' + articleTitle + '" before END ROW at row ' + endRowPosition);
  
  uploaderSheet.insertRowsBefore(endRowPosition, 2);
  
  var newArticleRow = endRowPosition;
  
  var titleRange = uploaderSheet.getRange(newArticleRow, 1, 1, 11);
  titleRange.merge();
  titleRange.setValue(articleTitle);
  
  titleRange.setBackground(CONFIG.COLORS.BLACK);
  titleRange.setFontColor(CONFIG.COLORS.WHITE);
  titleRange.setFontSize(11);
  titleRange.setFontWeight('bold');
  titleRange.setHorizontalAlignment('center');
  titleRange.setVerticalAlignment('middle');
  
  var dropdownCell = uploaderSheet.getRange(newArticleRow, 12);
  var sourceCell = uploaderSheet.getRange(2, 12);
  
  sourceCell.copyTo(dropdownCell, SpreadsheetApp.CopyPasteType.PASTE_DATA_VALIDATION, false);
  
  dropdownCell.setValue('_');
  dropdownCell.setBackground('#333333');
  dropdownCell.setFontColor(CONFIG.COLORS.WHITE);
  dropdownCell.setHorizontalAlignment('center');
  
  if (uploaderSheet.getLastColumn() > 12) {
    var beyondLRange = uploaderSheet.getRange(newArticleRow, 13, 1, uploaderSheet.getLastColumn() - 12);
    beyondLRange.clearFormat();
    beyondLRange.setBackground(CONFIG.COLORS.WHITE);
  }
  
  var blankRow = newArticleRow + 1;
  
  var entireBlankRow = uploaderSheet.getRange(blankRow, 1, 1, uploaderSheet.getLastColumn());
  entireBlankRow.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  
  var blankRowMainRange = uploaderSheet.getRange(blankRow, 1, 1, 11);
  blankRowMainRange.clearFormat();
  blankRowMainRange.setBackground(CONFIG.COLORS.WHITE);
  blankRowMainRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  
  var slideNumberCell = uploaderSheet.getRange(blankRow, 4);
  slideNumberCell.setHorizontalAlignment('center');
  slideNumberCell.setBackground(CONFIG.COLORS.LIGHT_PINK);
  
  uploaderSheet.getRange(blankRow, 8).setHorizontalAlignment('center');
  uploaderSheet.getRange(blankRow, 9).setHorizontalAlignment('center');
  uploaderSheet.getRange(blankRow, 10).setHorizontalAlignment('center');
  
  var blankRowDropdownCell = uploaderSheet.getRange(blankRow, 12);
  blankRowDropdownCell.clearFormat();
  blankRowDropdownCell.setBackground('#CCCCCC');
  
  if (uploaderSheet.getLastColumn() > 12) {
    var blankRowBeyondL = uploaderSheet.getRange(blankRow, 13, 1, uploaderSheet.getLastColumn() - 12);
    blankRowBeyondL.clearFormat();
    blankRowBeyondL.setBackground(CONFIG.COLORS.WHITE);
  }
  
  SpreadsheetApp.flush();
  
  return newArticleRow;
}

function createArticleFolderComplete(articleTitle) {
  var parentFolder = DriveApp.getFolderById(CONFIG.GOOGLE.PARENT_FOLDER_ID);
  
  // Check for existing folder
  var folders = parentFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() === articleTitle) {
      Logger.log('Folder already exists: ' + articleTitle);
      return folder.getUrl(); // Return existing folder URL
    }
  }

  try {
    // Create new folder
    var folder = parentFolder.createFolder(articleTitle);
    var folderUrl = folder.getUrl();
    
    Logger.log('Created new folder: ' + articleTitle + ' at ' + folderUrl);
    return folderUrl;
    
  } catch (error) {
    Logger.log('Error creating folder: ' + error.message);
    return null;
  }
}

function findPersonEndRow(uploaderSheet, personRow) {
  var lastRow = uploaderSheet.getLastRow();
  var currentRow = personRow + 1;
  
  while (currentRow <= lastRow) {
    var cellA = uploaderSheet.getRange(currentRow, 1);
    
    if (cellA.isPartOfMerge()) {
      var mergedRange = cellA.getMergedRanges()[0];
      
      if (mergedRange.getRow() === currentRow && mergedRange.getNumColumns() === 13) {
        var cellValue = mergedRange.getValue();
        
        if (cellValue && cellValue.toString().toUpperCase().includes('END ROW')) {
          Logger.log('Found END ROW at row ' + currentRow + ' for person in row ' + personRow);
          return currentRow;
        } else {
          Logger.log('Warning: Found another person (' + cellValue + ') before END ROW for person in row ' + personRow);
          return null;
        }
      }
    }
    
    currentRow++;
  }
  
  Logger.log('Error: Could not find END ROW for person in row ' + personRow);
  return null;
}

function findPersonRow(uploaderSheet, personName) {
  var lastRow = uploaderSheet.getLastRow();
  
  for (var row = 1; row <= lastRow; row++) {
    var cellA = uploaderSheet.getRange(row, 1);
    
    if (cellA.isPartOfMerge()) {
      var mergedRange = cellA.getMergedRanges()[0];
      
      if (mergedRange.getRow() === row && mergedRange.getNumColumns() === 13) {
        var cellValue = mergedRange.getValue();
        
        if (cellValue && 
            // CASE-INSENSITIVE matching
            cellValue.toString().toLowerCase().includes(personName.toLowerCase()) &&
            !cellValue.toString().toUpperCase().includes('END ROW')) {
          Logger.log('Found person "' + personName + '" at row ' + row);
          return row;
        }
      }
    }
  }
  
  Logger.log('Person "' + personName + '" not found in Uploader sheet');
  return null;
}


function processUploaderTransfer(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  try {
    var articleTitle = sheet.getRange(row, 3).getValue(); // Column C
    var assignedTo = sheet.getRange(row, 2).getValue(); // Column B
    
    // Validate inputs
    if (!articleTitle || articleTitle.toString().trim() === '') {
      sheet.getRange(row, 7).setValue('Error: No article title');
      return;
    }
    
    if (!assignedTo || assignedTo.toString().trim() === '') {
      sheet.getRange(row, 7).setValue('Error: No person assigned');
      return;
    }
    
    // Process the transfer
    Logger.log('Manual processing: ' + articleTitle + ' for ' + assignedTo);
    processNewArticleComplete(sheet, row, articleTitle, assignedTo);
    
  } catch (error) {
    Logger.log('Error in manual transfer: ' + error.message);
    sheet.getRange(row, 7).setValue('Error: ' + error.message);
  }
}

/**
 * ============================================================================
 * EMAIL NEWSLETTER - ARTICLE COLLECTION
 * ============================================================================
 * Functions for managing the Article Collection sheet that feeds into
 * the Email Newsletter workflow.
 */


/**
 * Fetches articles for a specific date range
 */
function fetchArticlesForDateRange(username, appPassword, startDate, endDate) {
  var articles = [];
  var page = 1;
  var perPage = 100;
  var hasMore = true;

  // Get Slideshow feed_type ID to filter only slideshow articles
  var slideshowId = getCachedFeedTypeId('Slideshow');
  if (!slideshowId) {
    Logger.log('Warning: Could not find Slideshow feed_type ID. Fetching all articles.');
  }

  while (hasMore) {
    var queryParams = [
      'per_page=' + perPage,
      'page=' + page,
      'status=publish',
      '_embed=true',
      'after=' + startDate.toISOString(),
      'before=' + endDate.toISOString(),
      'orderby=date',
      'order=desc'
    ];

    // Only fetch slideshow articles
    if (slideshowId) {
      queryParams.push('feed_type=' + slideshowId);
    }

    var queryUrl = CONFIG.ENDPOINTS.WP_POSTS + '?' + queryParams.join('&');

    var options = {
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + Utilities.base64Encode(username + ':' + appPassword)
      },
      muteHttpExceptions: true
    };

    try {
      var response = UrlFetchApp.fetch(queryUrl, options);

      if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
        var posts = JSON.parse(response.getContentText());

        if (posts.length === 0) {
          hasMore = false;
        } else {
          for (var i = 0; i < posts.length; i++) {
            var post = posts[i];

            // Extract state from categories
            var stateName = '';
            if (post._embedded && post._embedded['wp:term']) {
              var terms = post._embedded['wp:term'];
              for (var t = 0; t < terms.length; t++) {
                if (terms[t]) {
                  for (var c = 0; c < terms[t].length; c++) {
                    if (terms[t][c].taxonomy === 'category') {
                      stateName = terms[t][c].name;
                      break;
                    }
                  }
                }
                if (stateName) break;
              }
            }

            // Extract featured image URL
            var thumbnailUrl = '';
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
              var media = post._embedded['wp:featuredmedia'][0];
              if (media.media_details && media.media_details.sizes) {
                if (media.media_details.sizes.medium_large) {
                  thumbnailUrl = media.media_details.sizes.medium_large.source_url;
                } else if (media.media_details.sizes.medium) {
                  thumbnailUrl = media.media_details.sizes.medium.source_url;
                } else {
                  thumbnailUrl = media.source_url || '';
                }
              } else {
                thumbnailUrl = media.source_url || '';
              }
            }

            // Extract tags
            var tagNames = [];
            if (post._embedded && post._embedded['wp:term']) {
              var terms = post._embedded['wp:term'];
              for (var t = 0; t < terms.length; t++) {
                if (terms[t]) {
                  for (var c = 0; c < terms[t].length; c++) {
                    if (terms[t][c].taxonomy === 'post_tag') {
                      tagNames.push(terms[t][c].name.toLowerCase());
                    }
                  }
                }
              }
            }

            // Clean title
            var title = post.title.rendered
              .replace(/&#8217;/g, "'")
              .replace(/&#8216;/g, "'")
              .replace(/&#8220;/g, '"')
              .replace(/&#8221;/g, '"')
              .replace(/&#038;/g, '&')
              .replace(/&amp;/g, '&');

            articles.push({
              id: post.id,
              title: title,
              url: post.link,
              thumbnailUrl: thumbnailUrl,
              state: stateName,
              tags: tagNames,
              date: post.date
            });
          }

          if (posts.length < perPage) {
            hasMore = false;
          } else {
            page++;
            Utilities.sleep(200);
          }
        }
      } else {
        hasMore = false;
      }
    } catch (error) {
      Logger.log('Error fetching: ' + error.message);
      hasMore = false;
    }
  }

  return articles;
}




/**
 * Recommends a category for each article based on title and tags
 * Categories: News, History, Hidden Gems, Food & Drink, Outdoors, Local Life, Travel, Culture
 */
function recommendCategories(articles) {
  // Category keywords mapping
  var categoryKeywords = {
    'News': ['news', 'breaking', 'update', 'announced', 'opens', 'closes', 'new', 'first', 'launches', 'coming', 'plans', 'set to', 'will be', 'headlines', 'report', 'officials', 'mayor', 'governor', 'council'],
    'History': ['history', 'historic', 'historical', 'century', 'years ago', 'founded', 'ancient', 'old', 'oldest', 'vintage', 'heritage', 'memorial', 'museum', 'war', 'civil war', 'revolutionary', 'legend', 'legendary', 'forgotten', 'abandoned', 'ghost town', 'ruins'],
    'Hidden Gems': ['hidden', 'secret', 'unknown', 'overlooked', 'underrated', 'discover', 'gem', 'off the beaten path', 'locals know', 'best kept', 'unexplored', 'tucked away', 'little-known'],
    'Food & Drink': ['food', 'restaurant', 'eat', 'eating', 'dining', 'diner', 'cafe', 'coffee', 'bakery', 'brewery', 'bar', 'drink', 'cuisine', 'dish', 'meal', 'chef', 'menu', 'delicious', 'tasty', 'bbq', 'barbecue', 'pizza', 'burger', 'seafood', 'farm-to-table', 'winery', 'wine'],
    'Outdoors': ['outdoor', 'outdoors', 'nature', 'park', 'trail', 'hiking', 'hike', 'camping', 'camp', 'lake', 'river', 'mountain', 'beach', 'forest', 'wildlife', 'fishing', 'kayak', 'scenic', 'waterfall', 'canyon', 'valley', 'national park', 'state park'],
    'Local Life': ['local', 'community', 'neighborhood', 'town', 'city', 'village', 'main street', 'downtown', 'resident', 'living', 'life in', 'small town', 'charming', 'quaint', 'friendly', 'shop', 'shopping', 'market', 'farmers market'],
    'Travel': ['travel', 'visit', 'visiting', 'trip', 'road trip', 'destination', 'getaway', 'vacation', 'weekend', 'things to do', 'attractions', 'must-see', 'must see', 'bucket list', 'itinerary', 'guide to', 'explore', 'adventure'],
    'Culture': ['culture', 'cultural', 'art', 'arts', 'artist', 'music', 'festival', 'event', 'theater', 'theatre', 'performance', 'gallery', 'exhibit', 'exhibition', 'tradition', 'traditions', 'celebrate', 'celebration', 'holiday']
  };

  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var titleLower = article.title.toLowerCase();
    var tagsString = article.tags.join(' ');
    var combinedText = titleLower + ' ' + tagsString;

    var categoryScores = {};

    // Score each category based on keyword matches
    for (var category in categoryKeywords) {
      var keywords = categoryKeywords[category];
      var score = 0;

      for (var k = 0; k < keywords.length; k++) {
        if (combinedText.indexOf(keywords[k]) !== -1) {
          score++;
        }
      }

      categoryScores[category] = score;
    }

    // Find category with highest score
    var bestCategory = 'Travel'; // Default
    var highestScore = 0;

    for (var category in categoryScores) {
      if (categoryScores[category] > highestScore) {
        highestScore = categoryScores[category];
        bestCategory = category;
      }
    }

    article.category = bestCategory;
  }

  return articles;
}




/**
 * Updates the Article Collection with new articles published since last update
 * Called daily via time-based trigger
 */
function updateArticleCollection() {
  var username = CONFIG.WORDPRESS.USERNAME;
  var appPassword = CONFIG.WORDPRESS.APP_PASSWORD;

  if (!username || !appPassword) {
    Logger.log('WordPress credentials not configured');
    return;
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_COLLECTION);

  if (!sheet) {
    Logger.log('Article Collection sheet not found');
    return;
  }

  // Get existing article URLs to avoid duplicates
  var lastRow = sheet.getLastRow();
  var existingUrls = {};

  if (lastRow > 1) {
    var urlData = sheet.getRange(2, 4, lastRow - 1, 1).getValues();
    for (var i = 0; i < urlData.length; i++) {
      if (urlData[i][0]) {
        existingUrls[urlData[i][0]] = true;
      }
    }
  }

  // Fetch recent articles (last 7 days to be safe)
  var sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get Slideshow feed_type ID to filter only slideshow articles
  var slideshowId = getCachedFeedTypeId('Slideshow');
  if (!slideshowId) {
    Logger.log('Warning: Could not find Slideshow feed_type ID. Fetching all articles.');
  }

  var articles = [];
  var page = 1;
  var perPage = 50;
  var hasMore = true;

  while (hasMore) {
    var queryParams = [
      'per_page=' + perPage,
      'page=' + page,
      'status=publish',
      '_embed=true',
      'after=' + sevenDaysAgo.toISOString(),
      'orderby=date',
      'order=desc'
    ];

    // Only fetch slideshow articles
    if (slideshowId) {
      queryParams.push('feed_type=' + slideshowId);
    }

    var queryUrl = CONFIG.ENDPOINTS.WP_POSTS + '?' + queryParams.join('&');

    var options = {
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + Utilities.base64Encode(username + ':' + appPassword)
      },
      muteHttpExceptions: true
    };

    try {
      var response = UrlFetchApp.fetch(queryUrl, options);

      if (response.getResponseCode() === CONFIG.HTTP_STATUS.OK) {
        var posts = JSON.parse(response.getContentText());

        if (posts.length === 0) {
          hasMore = false;
        } else {
          for (var i = 0; i < posts.length; i++) {
            var post = posts[i];

            // Skip if already exists
            if (existingUrls[post.link]) {
              continue;
            }

            // Extract state
            var stateName = '';
            if (post._embedded && post._embedded['wp:term']) {
              var terms = post._embedded['wp:term'];
              for (var t = 0; t < terms.length; t++) {
                if (terms[t]) {
                  for (var c = 0; c < terms[t].length; c++) {
                    if (terms[t][c].taxonomy === 'category') {
                      stateName = terms[t][c].name;
                      break;
                    }
                  }
                }
                if (stateName) break;
              }
            }

            // Extract thumbnail
            var thumbnailUrl = '';
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
              var media = post._embedded['wp:featuredmedia'][0];
              thumbnailUrl = media.source_url || '';
            }

            // Extract tags
            var tagNames = [];
            if (post._embedded && post._embedded['wp:term']) {
              var terms = post._embedded['wp:term'];
              for (var t = 0; t < terms.length; t++) {
                if (terms[t]) {
                  for (var c = 0; c < terms[t].length; c++) {
                    if (terms[t][c].taxonomy === 'post_tag') {
                      tagNames.push(terms[t][c].name.toLowerCase());
                    }
                  }
                }
              }
            }

            // Clean title
            var title = post.title.rendered
              .replace(/&#8217;/g, "'")
              .replace(/&#8216;/g, "'")
              .replace(/&#8220;/g, '"')
              .replace(/&#8221;/g, '"')
              .replace(/&#038;/g, '&')
              .replace(/&amp;/g, '&');

            articles.push({
              id: post.id,
              title: title,
              url: post.link,
              thumbnailUrl: thumbnailUrl,
              state: stateName,
              tags: tagNames,
              date: post.date
            });
          }

          page++;
          Utilities.sleep(300);
        }
      } else {
        hasMore = false;
      }
    } catch (error) {
      Logger.log('Error in daily update: ' + error.message);
      hasMore = false;
    }
  }

  if (articles.length > 0) {
    // Recommend categories
    var categorizedArticles = recommendCategories(articles);

    // Insert new articles at the top (row 2)
    sheet.insertRowsAfter(1, articles.length);

    var data = [];
    for (var i = 0; i < categorizedArticles.length; i++) {
      var article = categorizedArticles[i];
      data.push([
        article.state,
        article.category,
        article.title,
        article.url,
        article.thumbnailUrl,
        'Available'
      ]);
    }

    sheet.getRange(2, 1, data.length, 6).setValues(data);

    // Fetch intros for the new articles
    for (var r = 0; r < categorizedArticles.length; r++) {
      var article = categorizedArticles[r];
      try {
        var slug = extractSlugFromUrlIntro(article.url);
        if (slug) {
          var result = fetchIntroBySlugIntro(slug, username, appPassword);
          if (result.success) {
            var introText = '';
            if (result.subheading) introText = result.subheading + '\n\n';
            if (result.content) introText += result.content;
            sheet.getRange(r + 2, 7).setValue(introText.trim());
          }
        }
      } catch (e) {
        Logger.log('Could not fetch intro for: ' + article.url + ' - ' + e.message);
      }
      Utilities.sleep(250);
    }

    Logger.log('Added ' + articles.length + ' new articles to Collection');
  } else {
    Logger.log('No new articles to add');
  }

  // Sort: Available on top, Used on bottom
  sortArticleCollection();
}


/**
 * Sorts the Article Collection: Available articles on top, Used articles on bottom.
 * Within each group, preserves existing order.
 * Also migrates any old "Yes"/"No" values to "Used"/"Available".
 */
function sortArticleCollection() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_COLLECTION);

  if (!sheet) {
    Logger.log('Article Collection sheet not found');
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // Nothing to sort

  // Read all data (columns A through last column)
  var lastCol = sheet.getLastColumn();
  var dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
  var data = dataRange.getValues();

  // Migrate old values: "Yes" → "Used", "No" → "Available"
  for (var i = 0; i < data.length; i++) {
    var statusVal = data[i][5]; // Column F
    if (statusVal === 'Yes') data[i][5] = 'Used';
    else if (statusVal === 'No') data[i][5] = 'Available';
    else if (!statusVal || statusVal.toString().trim() === '') data[i][5] = 'Available';
  }

  // Split into Available and Used arrays
  var available = [];
  var used = [];

  for (var i = 0; i < data.length; i++) {
    var item = { data: data[i] };
    if (data[i][5] === 'Used') {
      used.push(item);
    } else {
      available.push(item);
    }
  }

  // Combine: Available first, then Used
  var sorted = available.concat(used);

  // Write sorted data back to sheet
  var sortedData = sorted.map(function(item) { return item.data; });

  var outputRange = sheet.getRange(2, 1, sortedData.length, lastCol);
  outputRange.setValues(sortedData);

  // Set consistent formatting on ALL data rows
  outputRange.setBackground('#FFFFFF');
  outputRange.setFontColor('#000000');
  outputRange.setFontWeight('normal');

  // Set URL columns to hyperlink blue (D=Article URL, E=Thumbnail URL)
  var numRows = sortedData.length;
  sheet.getRange(2, 4, numRows, 1).setFontColor('#1155cc'); // Article URLs
  sheet.getRange(2, 5, numRows, 1).setFontColor('#1155cc'); // Thumbnail URLs

  // Re-apply dropdown validation on column F (setValues wipes it out)
  var statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Available', 'Used'], true)
    .build();
  sheet.getRange(2, 6, numRows, 1).setDataValidation(statusValidation);

  // Set status colors in column F: green background for Available, red background for Used
  for (var r = 0; r < sortedData.length; r++) {
    var statusCell = sheet.getRange(r + 2, 6);
    if (sortedData[r][5] === 'Available') {
      statusCell.setBackground('#0b5e3f'); // dark green background
      statusCell.setFontColor('#FFFFFF'); // white text
    } else if (sortedData[r][5] === 'Used') {
      statusCell.setBackground('#8B0000'); // dark red background
      statusCell.setFontColor('#FFFFFF'); // white text
    }
  }

  SpreadsheetApp.flush();
  Logger.log('Article Collection sorted: ' + available.length + ' Available on top, ' + used.length + ' Used on bottom');
}




function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  // Check if sheet is locked
  var currentLock = isUploaderSheetLocked();
  var lockStatus = currentLock ? ' (🔒 LOCKED)' : '';
  
  // Create menu for Email Newsletter
  ui.createMenu('      **Newsletter')
    .addItem('🔄 Update Collection (Check New)', 'updateArticleCollection')
    .addItem('🔃 Sort Collection (Available on Top)', 'sortArticleCollection')
    .addSeparator()
    .addItem('✉️ Create Newsletters', 'createNewsletters')
    .addToUi();

   ui.createMenu('      **Splitter')
    .addItem('✂️ Split Input', 'splitter')
    .addToUi();

  ui.createMenu('      **Drafting')
    .addItem('📋 Transfer to Enhanced Drafter', 'transferToEnhancedDrafter')
    .addItem('📊 Transfer Drafts to Article Tracker', 'transferDraftsToArticleTracker')
    .addSeparator()
    .addItem('📄 Batch Create GDocs', 'batchCreateGDocs')
    .addSeparator()
    .addItem('🗑️ Delete Done', 'deleteDoneRows')
    .addToUi();

  // Create menu for WP Editing Tracker
  ui.createMenu('      **Editing')
    .addSeparator()
    .addItem('🫳🏻 Get Intro & Subheadings', 'getIntroSubheading')
    .addSeparator()
    .addItem('📝 Update All H1/Slide1', 'batchUpdateTitlesAndIntros')
    .addSeparator()
    .addItem('✅ Schedule ALL', 'batchSchedulePosts')
    .addItem('🚀 Batch Set/Schedule', 'batchSetAndSchedule')
    .addSeparator()
    .addItem('💜 Get WP Drafts for Editing', 'batchTransferToAleksReview')
    .addSeparator()
    .addItem('🎉 Record Published/Scheduled', 'recordAllReady')
    .addToUi();





  ui.createMenu('      **Prep for Upload' + lockStatus)
    .addItem('🗄️ Create New Rows for Articles', 'batchProcessUploaderTransfers')
    .addItem('📚 Paste All Content', 'batchPasteArticleSections')
    .addItem('📸 Get All Image Metadata', 'batchGetImageMetadata')
    .addItem('🐶 Fetch All Image File Names', 'batchFetchImageFileNames')
    .addSeparator()
    .addSeparator()
    .addSeparator()
    .addSeparator()
    .addItem('🆙 Upload All to WordPress', 'batchUploadToWordPress') 
    .addSeparator()
    .addSeparator()
    .addSeparator()
    .addSeparator()
    .addItem('🏵️ Delete All Uploaded', 'batchDeleteSuccessfulUploads')
    .addSeparator()
    .addItem('⛔ Stop All Batch Operations', 'stopAllBatchOperations')
    .addItem('🔓 Force Unlock Sheet', 'forceUnlockUploaderSheet')
    .addToUi();
     
}


function lockSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  const cell = sheet.getRange('A1');
  cell.setValue('🔒🔒 LOCKED');
  cell.setBackground(CONFIG.COLORS.DARK_RED); // Dark red
}

function openSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  const cell = sheet.getRange('A1');
  cell.setValue('✅✅ OPEN');
  cell.setBackground(CONFIG.COLORS.MEDIUM_ORANGE); // Medium orange
}

function onColumnLEdit(e) {
  if (!e || !e.range) return;

  var sheet = e.range.getSheet();
  var column = e.range.getColumn();

  if (sheet.getName() === CONFIG.SHEETS.UPLOADER && column === 12) {
    try {
      var triggers = {
        'Create GDrive Folder': createArticleImageFolder,
        'Get Image Meta Data': getShutterstockMetaData,
        'Fetch Image File Names': fetchImageFileNames,
        'Proceed with WP Upload': enqueueWordPressUpload,  // Changed to use queue
        'Send to Editors': sendToEditors,  // Add the new trigger
        'Paste Article Sections': pasteArticleSections,
        'Delete Slides': deleteSlides,

      };
      var value = e.value;
      if (triggers[value]) {
        triggers[value](e);
      }
    } catch(error) {
      notifyOnError(error);
    }
  }
}



/**
 * ============================================================================
 * SPLITTER - Split titles and URLs from input cells
 * ============================================================================
 */

function splitter() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Topic List');

  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error', 'Sheet "Topic List" not found.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  var content = sheet.getRange('A2').getValue();
  if (!content || content.toString().trim() === '') {
    SpreadsheetApp.getUi().alert('Nothing to split', 'Paste titles into A2 first.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  // Split into individual lines, parse title + URL from each
  var lines = content.toString().split('\n').filter(function(line) {
    return line.trim() !== '';
  });

  if (lines.length === 0) return;

  // Find the first empty row in column C
  var lastRow = sheet.getLastRow();
  var startRow = 2;
  if (lastRow >= 2) {
    var colC = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
    for (var i = colC.length - 1; i >= 0; i--) {
      if (colC[i][0] !== '') {
        startRow = 2 + i + 1;
        break;
      }
    }
  }

  // Write title to C, URL to D, set Article Type (B) and Status (G)
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    var row = startRow + i;
    var httpIndex = line.lastIndexOf('http');

    if (httpIndex > 0) {
      // Line has both title and URL
      var title = line.substring(0, httpIndex).replace(/[\s:\-–—]+$/, '').trim();
      var url = line.substring(httpIndex).trim();
      sheet.getRange(row, 3).setValue(title)
        .setFontLine('none').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setHorizontalAlignment('left').setBackground('#c9daf8');
      sheet.getRange(row, 4).setValue(url).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    } else if (httpIndex === 0) {
      // Line is just a URL
      sheet.getRange(row, 4).setValue(line).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    } else {
      // Line is just a title, no URL
      sheet.getRange(row, 3).setValue(line)
        .setFontLine('none').setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setHorizontalAlignment('left').setBackground('#c9daf8');
    }

    sheet.getRange(row, 2).setValue('Current News');             // B: Article Type
    sheet.getRange(row, 4).setBackground('#ffffff');             // D: white
    sheet.getRange(row, 5).setBackground('#ffe5ef');             // E: light pink
    sheet.getRange(row, 7).setValue('Topic Set');                // G: Status
  }

  // Clear the input cell
  sheet.getRange('A2').clearContent();

  SpreadsheetApp.getUi().alert('Done!', lines.length + ' topics added to Topic List.', SpreadsheetApp.getUi().ButtonSet.OK);
}


/**
 * onTopicListEdit - Standalone installable trigger for Topic List sheet.
 * - Column B → "Travel Feature": sets Column E (Place to Visit) to "N/A" (centered)
 * - Column F (Outline) filled in: sets Column G (Status) to "Outline Ready"
 * - If B, C, D, E, F all empty: clears Column G (Status)
 */
function onTopicListEdit(e) {
  if (!e || !e.range) return;

  var sheet = e.range.getSheet();
  if (sheet.getName() !== 'Topic List') return;

  var column = e.range.getColumn();
  var startRow = e.range.getRow();
  var numRows = e.range.getNumRows();
  if (startRow < 2) { startRow = 2; numRows = numRows - (2 - e.range.getRow()); }
  if (numRows <= 0) return;

  for (var i = 0; i < numRows; i++) {
    var row = startRow + i;

    // Column B (Article Type) changed
    if (column === 2) {
      var bValue = sheet.getRange(row, 2).getValue();
      if (bValue === 'Travel Feature') {
        sheet.getRange(row, 3).setBackground('#d9ead3');                                                   // C: light green
        sheet.getRange(row, 4).setValue('N/A').setHorizontalAlignment('center').setBackground('#d9d9d9');  // D: grey
        sheet.getRange(row, 5).setValue('N/A').setHorizontalAlignment('center').setBackground('#d9d9d9');  // E: grey
      } else if (bValue === 'Current News') {
        sheet.getRange(row, 3).setBackground('#c9daf8');                                                   // C: light blue
        sheet.getRange(row, 4).clearContent().setBackground('#ffffff');                                    // D: white
        sheet.getRange(row, 5).clearContent().setBackground('#ffe5ef');                                    // E: light pink
      } else {
        sheet.getRange(row, 3).setBackground(null);
        sheet.getRange(row, 4).clearContent().setBackground('#ffffff');                                    // D: white
        sheet.getRange(row, 5).clearContent().setBackground('#ffe5ef');                                    // E: light pink
      }
    }

    // Column C (Topic) deleted on Travel Feature → revert D and E to defaults
    if (column === 3) {
      var topicValue = sheet.getRange(row, 3).getValue();
      if (!topicValue || topicValue.toString().trim() === '') {
        var articleType = sheet.getRange(row, 2).getValue();
        if (articleType === 'Travel Feature') {
          sheet.getRange(row, 4).clearContent().setBackground('#ffffff');   // D: white
          sheet.getRange(row, 5).clearContent().setBackground('#ffe5ef');   // E: light pink
          sheet.getRange(row, 7).clearContent();                            // G: clear status
        }
      }
    }

    // Column F (Outline) filled/cleared → update G (Status)
    if (column === 6) {
      var outlineValue = sheet.getRange(row, 6).getValue();
      if (outlineValue && outlineValue.toString().trim() !== '') {
        sheet.getRange(row, 7).setValue('Outline Ready');
      } else {
        sheet.getRange(row, 7).setValue('Topic Set');
      }
    }

    // Travel Feature: set Status to "Topic Set" when B, C, D, E are all filled
    if (column >= 2 && column <= 5) {
      var type = sheet.getRange(row, 2).getValue();
      if (type === 'Travel Feature') {
        var vals = sheet.getRange(row, 2, 1, 4).getValues()[0]; // B, C, D, E
        var allFilled = vals.every(function(v) { return v !== '' && v !== null; });
        if (allFilled) {
          sheet.getRange(row, 7).setValue('Topic Set');
        }
      }
    }

    // If B, C, D, E, F are all empty → clear G (Status)
    if (column >= 2 && column <= 6) {
      var values = sheet.getRange(row, 2, 1, 5).getValues()[0]; // B through F
      var allEmpty = values.every(function(v) { return v === '' || v === null; });
      if (allEmpty) {
        sheet.getRange(row, 7).clearContent();
      }
    }
  }
}


/**
 * ============================================================================
 * TRANSFER TO ENHANCED DRAFTER
 * ============================================================================
 * Transfers rows with "Outline Ready" status from Topic List to Enhanced Drafter.
 *
 * Topic List → Enhanced Drafter mapping:
 *   C (Topic)          → B
 *   B (Article Type)   → C
 *   E (Place to Visit) → D
 *   F (Outline)        → F
 *   Enhanced Drafter L → "Ready for Drafting"
 *   Topic List G       → "Done"
 */
function transferToEnhancedDrafter() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var topicSheet = ss.getSheetByName('Topic List');
  var drafterSheet = ss.getSheetByName('Enhanced Drafter');
  var ui = SpreadsheetApp.getUi();

  if (!topicSheet || !drafterSheet) {
    ui.alert('Error', 'Could not find Topic List or Enhanced Drafter sheet.', ui.ButtonSet.OK);
    return;
  }

  // Find rows with "Outline Ready" in Topic List column G (7)
  var lastRow = topicSheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('Nothing to transfer', 'No rows found in Topic List.', ui.ButtonSet.OK);
    return;
  }

  var data = topicSheet.getRange(2, 2, lastRow - 1, 6).getValues(); // B through G
  var rowsToTransfer = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i][5] === 'Outline Ready') { // Column G (index 5 in B-G range)
      rowsToTransfer.push({
        sourceRow: i + 2,
        articleType: data[i][0],   // B
        topic: data[i][1],         // C
        placeToVisit: data[i][3],  // E
        outline: data[i][4]        // F
      });
    }
  }

  if (rowsToTransfer.length === 0) {
    ui.alert('Nothing to transfer', 'No rows with "Outline Ready" status found.', ui.ButtonSet.OK);
    return;
  }

  // Start after the last row with any data (min row 52, skips any empty gaps)
  var startRow = Math.max(52, drafterSheet.getLastRow() + 1);

  // Transfer each row
  for (var j = 0; j < rowsToTransfer.length; j++) {
    var item = rowsToTransfer[j];
    var destRow = startRow + j;

    drafterSheet.getRange(destRow, 2).setValue(item.topic);         // → B
    drafterSheet.getRange(destRow, 3).setValue(item.articleType);   // → C
    drafterSheet.getRange(destRow, 4).setValue(item.placeToVisit); // → D
    drafterSheet.getRange(destRow, 6).setValue(item.outline);       // → F
    drafterSheet.getRange(destRow, 12).setValue('Ready for Drafting'); // → L (Status)

    // Mark as Done in Topic List
    topicSheet.getRange(item.sourceRow, 7).setValue('Done');        // G (Status)
  }

  ui.alert('Done!', rowsToTransfer.length + ' row(s) transferred to Enhanced Drafter.', ui.ButtonSet.OK);
}


/**
 * ============================================================================
 * TRANSFER DRAFTS TO ARTICLE TRACKER
 * ============================================================================
 * Transfers "Ready for Transfer" rows from Enhanced Drafter to Article Status Tracker.
 *
 * Enhanced Drafter → Article Status Tracker mapping:
 *   G (State)          → A
 *   H (Title)          → C
 *   K (Doc URL)        → D
 *   "Not Available Yet" → G
 *   B (Original Topic) → I
 *   J (Tags)           → J
 *   Topic & Summary    → K
 *   L (Status)         → set to "DONE"
 */
function transferDraftsToArticleTracker() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var edSheet = ss.getSheetByName('Enhanced Drafter');
  var astSheet = ss.getSheetByName('Article Status Tracker');
  var ui = SpreadsheetApp.getUi();

  if (!edSheet || !astSheet) {
    ui.alert('Error', 'Could not find Enhanced Drafter or Article Status Tracker sheet.', ui.ButtonSet.OK);
    return;
  }

  // Find rows with "Ready for Transfer" in column L (12)
  var lastRow = edSheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('Nothing to transfer', 'No data in Enhanced Drafter.', ui.ButtonSet.OK);
    return;
  }

  var data = edSheet.getRange(2, 1, lastRow - 1, 12).getValues(); // A through L
  var rowsToTransfer = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i][11] === 'Ready for Transfer') { // L (index 11)
      var title = data[i][7]; // H (index 7)
      if (!title || title.toString().trim() === '') continue;

      var rawInput = data[i][4] || ''; // E (index 4)
      var topicSummary = extractTopicSummary(title, rawInput);

      rowsToTransfer.push({
        sourceRow: i + 2,
        state: data[i][6],           // G
        title: title,                 // H
        docUrl: data[i][10],          // K
        originalTopic: data[i][1],    // B
        tags: data[i][9],             // J
        topicSummary: topicSummary
      });
    }
  }

  if (rowsToTransfer.length === 0) {
    ui.alert('Nothing to transfer', 'No rows with "Ready for Transfer" status.', ui.ButtonSet.OK);
    return;
  }

  // Confirm
  var confirm = ui.alert('Transfer Drafts',
    rowsToTransfer.length + ' row(s) ready to transfer to Article Status Tracker.\n\nProceed?',
    ui.ButtonSet.YES_NO);
  if (confirm !== ui.Button.YES) return;

  // Find last row in Article Status Tracker
  var startRow = Math.max(2, astSheet.getLastRow() + 1);

  var transferred = 0;
  var errors = 0;

  for (var j = 0; j < rowsToTransfer.length; j++) {
    var item = rowsToTransfer[j];
    var destRow = startRow + j;

    try {
      astSheet.getRange(destRow, 1).setValue(item.state);              // → A
      astSheet.getRange(destRow, 3).setValue(item.title);              // → C
      astSheet.getRange(destRow, 4).setValue(item.docUrl);             // → D
      astSheet.getRange(destRow, 7).setValue('Not Available Yet');      // → G
      astSheet.getRange(destRow, 9).setValue(item.originalTopic);      // → I
      astSheet.getRange(destRow, 10).setValue(item.tags);              // → J
      astSheet.getRange(destRow, 11).setValue(item.topicSummary);      // → K

      // Mark as DONE in Enhanced Drafter
      edSheet.getRange(item.sourceRow, 12).setValue('DONE');           // L
      transferred++;
    } catch (error) {
      Logger.log('Error transferring row ' + item.sourceRow + ': ' + error.message);
      errors++;
    }
  }

  var message = transferred + ' row(s) transferred to Article Status Tracker.';
  if (errors > 0) message += '\n' + errors + ' error(s) — check Logs.';
  ui.alert('Done!', message, ui.ButtonSet.OK);
}


/**
 * Extracts title + intro summary from raw input for the Topic & Summary column.
 * Returns "TOPIC: title" or "TOPIC: title\nSUMMARY: intro"
 */
function extractTopicSummary(title, rawInput) {
  if (!rawInput || rawInput.toString().trim() === '') {
    return 'TOPIC: ' + title;
  }

  var lines = rawInput.toString().split('\n');
  var foundH1 = false;
  var inIntro = false;
  var introLines = [];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Found the H1 (title line)
    if (line.indexOf('# ') === 0 && line.indexOf('## ') !== 0) {
      foundH1 = true;
      continue;
    }

    if (foundH1) {
      // Found an H2 (subheading)
      if (line.indexOf('## ') === 0) {
        if (inIntro) break; // End of intro section
        inIntro = true;
        continue;
      } else if (inIntro && line.trim()) {
        introLines.push(line.trim());
      }
    }
  }

  var intro = introLines.join(' ').trim();
  if (intro) {
    return 'TOPIC: ' + title + '\nSUMMARY: ' + intro;
  }
  return 'TOPIC: ' + title;
}


/**
 * ============================================================================
 * BATCH CREATE GDOCS
 * ============================================================================
 * Processes all "Raw Input Pasted" rows in Enhanced Drafter.
 * Calls createGDocFromRawInput for each — parses raw input, creates a
 * formatted Google Doc, and updates the row with parsed data + doc URL.
 */
function batchCreateGDocs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Enhanced Drafter');
  var ui = SpreadsheetApp.getUi();

  if (!sheet) {
    ui.alert('Error', 'Enhanced Drafter sheet not found.', ui.ButtonSet.OK);
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow < 6) {
    ui.alert('Nothing to process', 'No data in Enhanced Drafter.', ui.ButtonSet.OK);
    return;
  }

  // Find rows with "Raw Input Pasted" in column L (12)
  var statuses = sheet.getRange(6, 12, lastRow - 5, 1).getValues();
  var rowsToProcess = [];
  for (var i = 0; i < statuses.length; i++) {
    if (statuses[i][0] === 'Raw Input Pasted') {
      rowsToProcess.push(i + 6);
    }
  }

  if (rowsToProcess.length === 0) {
    ui.alert('Nothing to process', 'No rows with "Raw Input Pasted" status.', ui.ButtonSet.OK);
    return;
  }

  var confirm = ui.alert('Batch Create GDocs',
    rowsToProcess.length + ' row(s) with raw input found.\n\nCreate GDocs for all?',
    ui.ButtonSet.YES_NO);
  if (confirm !== ui.Button.YES) return;

  var created = 0;
  var errors = 0;

  for (var j = 0; j < rowsToProcess.length; j++) {
    var row = rowsToProcess[j];
    var statusBefore = sheet.getRange(row, 12).getValue();
    createGDocFromRawInput(sheet, row);
    var statusAfter = sheet.getRange(row, 12).getValue();

    if (statusAfter === 'Ready for Transfer') {
      created++;
    } else {
      errors++;
    }
  }

  var message = created + ' GDoc(s) created successfully.';
  if (errors > 0) message += '\n' + errors + ' row(s) failed — check Logs.';
  ui.alert('Done!', message, ui.ButtonSet.OK);
}


/**
 * ============================================================================
 * DELETE DONE ROWS
 * ============================================================================
 * Asks which sheet to clean, then finds rows with Done/DONE status.
 * Clears all cell values from column A up to and including the Done cell.
 * Resets formatting to default (white background).
 */
function deleteDoneRows() {
  var ui = SpreadsheetApp.getUi();
  var sheets = [
    'WP Editing Tracker',
    'Article Status Tracker',
    'Topic List',
    'Email Newsletter',
    'Enhanced Drafter'
  ];

  var response = ui.prompt('Delete Done',
    'Which sheet(s)?\n\n' +
    '1. WP Editing Tracker\n' +
    '2. Article Status Tracker\n' +
    '3. Topic List\n' +
    '4. Email Newsletter\n' +
    '5. Enhanced Drafter\n' +
    '6. All\n\n' +
    'Enter numbers (e.g. 135 or 1,3,5):',
    ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() !== ui.Button.OK) return;

  var input = response.getResponseText().trim();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var selectedSheets = [];

  if (input === '6' || input.toLowerCase() === 'all') {
    selectedSheets = sheets.slice();
  } else {
    // Support both "135" and "1,3,5" formats
    var digits = input.replace(/[^1-5]/g, '');
    for (var p = 0; p < digits.length; p++) {
      var num = parseInt(digits[p]);
      if (num >= 1 && num <= sheets.length && selectedSheets.indexOf(sheets[num - 1]) === -1) {
        selectedSheets.push(sheets[num - 1]);
      }
    }
  }

  if (selectedSheets.length === 0) {
    ui.alert('Error', 'No valid sheets selected.', ui.ButtonSet.OK);
    return;
  }

  // Default column backgrounds per sheet (column number → color)
  var sheetColors = {
    'Topic List': { 4: '#ffffff', 5: '#ffe5ef' },
    'Enhanced Drafter': { 1: '#000000', 4: '#ffe5ef', 5: '#daee03', 7: '#d9d9d9' }
  };

  var results = [];

  for (var s = 0; s < selectedSheets.length; s++) {
    var sheetName = selectedSheets[s];
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) continue;

    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow < 2 || lastCol < 1) continue;

    var data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    var defaults = sheetColors[sheetName] || {};
    var cleared = 0;

    for (var i = data.length - 1; i >= 0; i--) {
      var row = data[i];
      for (var j = 0; j < row.length; j++) {
        var val = row[j].toString().trim();
        if (val === 'Done' || val === 'DONE') {
          var rowNum = i + 2;
          var range = sheet.getRange(rowNum, 1, 1, j + 1);
          range.clearContent();
          range.setBackground(null);
          range.setFontLine(null);

          // Restore default column colors
          for (var col in defaults) {
            if (parseInt(col) <= j + 1) {
              sheet.getRange(rowNum, parseInt(col)).setBackground(defaults[col]);
            }
          }

          cleared++;
          break;
        }
      }
    }

    if (cleared > 0) {
      results.push(sheetName + ': ' + cleared + ' row(s)');
    }
  }

  if (results.length === 0) {
    ui.alert('Nothing found', 'No rows with Done/DONE status in selected sheets.', ui.ButtonSet.OK);
  } else {
    ui.alert('Done!', 'Cleared:\n\n' + results.join('\n'), ui.ButtonSet.OK);
  }
}


/**
 * ============================================================================
 * CREATE GDOC FROM RAW INPUT
 * ============================================================================
 * Parses raw input from column E, creates a formatted Google Doc,
 * and updates the row with parsed data + doc URL.
 *
 * Columns: E=Raw Input, G=State, H=Title, I=Body, J=Tags, K=Doc URL, L=Status
 *
 * Trigger setup: Create installable trigger → From spreadsheet → On edit → onEnhancedDrafterEdit
 */

/** Installable trigger handler for Enhanced Drafter. Set up as: From spreadsheet → On edit */
function onEnhancedDrafterEdit(e) {
  if (!e || !e.range || !e.value) return;
  var sheet = e.range.getSheet();
  var column = e.range.getColumn();
  var row = e.range.getRow();

  if (sheet.getName() !== 'Enhanced Drafter' || column !== 12 || row < 5) return;

  if (e.value === 'Create GDoc') {
    createGDocFromRawInput(sheet, row);
  }
}

function createGDocFromRawInput(sheet, row) {
  var rawInput = sheet.getRange(row, 5).getValue();
  if (!rawInput) {
    Logger.log('Row ' + row + ': No raw input in column E');
    sheet.getRange(row, 12).setValue('Raw Input Pasted');
    return;
  }

  try {
    var parsed = parseEnhancedDrafterInput(rawInput);

    if (!parsed.title) {
      Logger.log('Row ' + row + ': No title (H1) found in raw input');
      sheet.getRange(row, 12).setValue('Raw Input Pasted');
      return;
    }

    var docUrl = createFormattedGDoc(parsed.title, parsed.body);

    if (!docUrl) {
      Logger.log('Row ' + row + ': Failed to create GDoc');
      sheet.getRange(row, 12).setValue('Raw Input Pasted');
      return;
    }

    // Update the row with parsed data
    sheet.getRange(row, 7).setValue(parsed.state);     // G: State
    sheet.getRange(row, 8).setValue(parsed.title);      // H: Title
    sheet.getRange(row, 9).setValue(parsed.body);       // I: Body
    sheet.getRange(row, 10).setValue(parsed.tags);      // J: Tags
    sheet.getRange(row, 11).setValue(docUrl);            // K: Doc URL
    sheet.getRange(row, 12).setValue('Ready for Transfer'); // L: Status

    Logger.log('Created GDoc for row ' + row + ': ' + parsed.title);

  } catch (error) {
    Logger.log('Error creating GDoc for row ' + row + ': ' + error.message);
    sheet.getRange(row, 12).setValue('Raw Input Pasted');
  }
}


/**
 * Parse raw input text into title, body, state, and tags.
 * Recognizes H1 (# or (H1 --)), H2 (## or (H2 --)), STATE:, TAGS: markers.
 */
function parseEnhancedDrafterInput(rawInput) {
  var result = { title: '', intro: '', body: '', state: '', tags: '' };
  var lines = rawInput.trim().split('\n');

  // --- Find title (H1) ---
  var titleIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    if (isH1Line(lines[i])) {
      result.title = cleanHeadingMarkers(lines[i]);
      titleIdx = i;
      break;
    }
  }
  // Fallback: first non-empty line
  if (titleIdx === -1) {
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].trim()) {
        result.title = lines[i].trim();
        titleIdx = i;
        break;
      }
    }
  }

  // --- Find STATE: and TAGS: ---
  var stateIdx = -1;
  var tagsIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    var clean = lines[i].trim().replace(/\*+/g, '');
    if (clean.indexOf('STATE:') === 0) {
      result.state = clean.substring(6).trim();
      stateIdx = i;
    } else if (clean.indexOf('TAGS:') === 0) {
      result.tags = clean.substring(5).trim();
      tagsIdx = i;
    }
  }

  // --- Extract body (everything from title to STATE/TAGS) ---
  var bodyEnd = lines.length;
  if (stateIdx > -1) bodyEnd = Math.min(bodyEnd, stateIdx);
  if (tagsIdx > -1) bodyEnd = Math.min(bodyEnd, tagsIdx);

  if (titleIdx > -1) {
    var bodyLines = lines.slice(titleIdx, bodyEnd);
    result.body = bodyLines.join('\n').trim();

    // Extract intro (first H2 section content)
    var inIntro = false;
    var introLines = [];
    for (var i = 1; i < bodyLines.length; i++) {
      if (isH2Line(bodyLines[i])) {
        if (inIntro) break;
        inIntro = true;
        continue;
      } else if (inIntro && bodyLines[i].trim()) {
        introLines.push(bodyLines[i].trim());
      }
    }
    result.intro = introLines.join(' ').trim();
  }

  return result;
}


/** Check if a line is an H1 heading */
function isH1Line(line) {
  line = line.trim();
  if (/\(H1\s*--\)/.test(line)) return true;
  if (line.indexOf('# ') === 0 || (line.indexOf('#') === 0 && line.indexOf('##') !== 0)) return true;
  return false;
}

/** Check if a line is an H2 heading */
function isH2Line(line) {
  line = line.trim();
  if (/\(H2\s*--\)/.test(line)) return true;
  if (line.indexOf('## ') === 0 || line.indexOf('##') === 0) return true;
  return false;
}

/** Strip heading markers (H1 --), ##, *, etc. and return clean text */
function cleanHeadingMarkers(text) {
  text = text.trim();
  text = text.replace(/\(H1\s*--\)/g, '');
  text = text.replace(/\(H2\s*--\)/g, '');
  text = text.replace(/^#{1,2}\s*/, '');
  text = text.replace(/\*+/g, '');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}


/**
 * Create a formatted Google Doc and move it to the parent folder.
 * Returns the doc URL, or null on failure.
 */
function createFormattedGDoc(title, body) {
  try {
    // Create the document
    var doc = DocumentApp.create(title);
    var docId = doc.getId();
    var docBody = doc.getBody();

    // Clear default empty paragraph
    docBody.clear();

    // Parse body into sections and build the document
    var lines = body.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Skip STATE/TAGS lines
      var cleanCheck = line.trim().replace(/\*+/g, '');
      if (cleanCheck.indexOf('STATE:') === 0 || cleanCheck.indexOf('TAGS:') === 0) continue;
      // Skip ### lines
      if (line.trim().indexOf('### ') === 0) continue;

      if (isH1Line(line)) {
        var cleanTitle = cleanHeadingMarkers(line);
        var para = docBody.appendParagraph(cleanTitle);
        para.setHeading(DocumentApp.ParagraphHeading.HEADING1);
        para.setAttributes({
          'FONT_FAMILY': 'Arial',
          'FONT_SIZE': 20,
          'BOLD': true
        });

      } else if (isH2Line(line)) {
        var cleanH2 = cleanHeadingMarkers(line);
        var para = docBody.appendParagraph('## ' + cleanH2);
        para.setHeading(DocumentApp.ParagraphHeading.HEADING2);
        para.setAttributes({
          'FONT_FAMILY': 'Arial',
          'FONT_SIZE': 16,
          'BOLD': true
        });

      } else if (line.trim()) {
        var para = docBody.appendParagraph(line.trim());
        para.setHeading(DocumentApp.ParagraphHeading.NORMAL);
        para.setAttributes({
          'FONT_FAMILY': 'Arial',
          'FONT_SIZE': 11,
          'BOLD': false,
          'ITALIC': false
        });
      }
    }

    // Add footer
    docBody.appendParagraph('');
    var disclaimer = docBody.appendParagraph('This article was created with AI assistance and human editing.');
    disclaimer.setAttributes({ 'FONT_FAMILY': 'Arial', 'FONT_SIZE': 11, 'ITALIC': true, 'BOLD': false });

    var readMore = docBody.appendParagraph('Read more from this brand:');
    readMore.setAttributes({ 'FONT_FAMILY': 'Arial', 'FONT_SIZE': 11, 'BOLD': true, 'ITALIC': false });

    var links = docBody.appendParagraph('- Link #1\n- Link #2\n- Link #3');
    links.setAttributes({ 'FONT_FAMILY': 'Arial', 'FONT_SIZE': 11, 'BOLD': false, 'ITALIC': false });

    // Save the document
    doc.saveAndClose();

    // Move to parent folder
    var file = DriveApp.getFileById(docId);
    var parentFolder = DriveApp.getFolderById(CONFIG.GOOGLE.PARENT_FOLDER_ID);
    parentFolder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);

    return 'https://docs.google.com/document/d/' + docId + '/edit';

  } catch (error) {
    Logger.log('Error creating Google Doc: ' + error.message);
    return null;
  }
}


function onEdit(e) {
  Logger.log('onEdit triggered!');
  if (!e || !e.range) return;

  var sheet = e.range.getSheet();
  var column = e.range.getColumn();
  var row = e.range.getRow();
  var numRows = e.range.getNumRows();

  Logger.log('Sheet: ' + sheet.getName() + ', Column: ' + column + ', Value: ' + e.value);

  try {
    // Article Status Tracker - Column G triggers
    if (sheet.getName() === 'Article Status Tracker' && column === 7) {
      Logger.log('Calling onStatusEdit');
      onStatusEdit(e);
    }
    // Uploader - Column L triggers      
    else if (sheet.getName() === CONFIG.SHEETS.UPLOADER && column === 12) {
      Logger.log('Calling onColumnLEdit');
      onColumnLEdit(e);
      handleArticleStatusColorChange(e);
    }
    // WP Editing Tracker - Column H triggers
    else if (sheet.getName() === 'WP Editing Tracker' && column === 8) {
      Logger.log('Calling onWPTrackerEdit');
      onWPTrackerEdit(e);
    }
    // WIYS Production Tracker - Column F triggers
    else if (sheet.getName() === CONFIG.SHEETS.WIYS_PRODUCTION_TRACKER && column === 6) {
      Logger.log('Calling onProductionTrackerEdit');
      onProductionTrackerEdit(e);
    }
    // Enhanced Drafter - Column E edited (row 5+)
    else if (sheet.getName() === 'Enhanced Drafter' && column === 5) {
      for (var i = 0; i < numRows; i++) {
        var currentRow = row + i;
        if (currentRow >= 5) {
          var valueE = sheet.getRange(currentRow, 5).getValue();
          if (valueE != "") {
            sheet.getRange(currentRow, 12).setValue("Raw Input Pasted");
          } else {
            sheet.getRange(currentRow, 12).setValue("");
          }
        }
      }
    }
    // Enhanced Drafter - Column K edited (row 5+)
    else if (sheet.getName() === 'Enhanced Drafter' && column === 11) {
      for (var i = 0; i < numRows; i++) {
        var currentRow = row + i;
        if (currentRow >= 5) {
          var valueK = sheet.getRange(currentRow, 11).getValue();
          if (valueK != "") {
            sheet.getRange(currentRow, 12).setValue("Ready for Transfer");
          } else {
            sheet.getRange(currentRow, 12).setValue("");
          }
        }
      }
    }
    else {
      Logger.log('No handler found for this sheet/column combination');
    }

  } catch (error) {
    Logger.log('Error in onEdit: ' + error.message);
  }
}


function onStatusEdit(e) {
  if (!e || !e.range || !e.value || e.oldValue === e.value) return;
  var sheet = e.range.getSheet();
  var column = e.range.getColumn();
  var row = e.range.getRow();
  
  if (sheet.getName() === 'Article Status Tracker' && column === 7) { // Column G
    if (e.value === "Transfer WP URL") {
      transferToAleksReview(e);
    } else if (e.value === "Uploader Transfer") {
      processUploaderTransfer(e);
    }
  }
}




// -----------------------------------------------------------
// WIKIMEDIA COMMONS - API-BASED EXTRACTION (More Reliable)
// -----------------------------------------------------------
function extractWikiMetadataAPI(url) {
  let username = "";
  let description = "";
  let licenseType = "";
  let licenseId = "";

  try {
    // Extract filename from URL
    const fileMatch = url.match(/wiki\/File:([^?#]+)/);
    if (!fileMatch) {
      Logger.log("Could not extract filename from URL: " + url);
      return { username, description, licenseType, licenseId };
    }

    const filename = decodeURIComponent(fileMatch[1]);
    licenseId = "wiki/File:" + filename;

    // Call Wikimedia API
    const apiUrl = "https://commons.wikimedia.org/w/api.php?action=query" +
                   "&titles=File:" + encodeURIComponent(filename) +
                   "&prop=imageinfo&iiprop=extmetadata&format=json";

    const response = UrlFetchApp.fetch(apiUrl, {
      muteHttpExceptions: true,
      headers: {
        "User-Agent": "WIYS-Workflow/1.0 (Google Apps Script)"
      }
    });

    if (response.getResponseCode() !== 200) {
      Logger.log("API request failed with status: " + response.getResponseCode());
      return { username, description, licenseType, licenseId };
    }

    const json = JSON.parse(response.getContentText());
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === "-1" || !pages[pageId].imageinfo) {
      Logger.log("No image info found for: " + filename);
      return { username, description, licenseType, licenseId };
    }

    const metadata = pages[pageId].imageinfo[0].extmetadata;

    // Extract Artist/Author
    if (metadata.Artist && metadata.Artist.value) {
      // Strip HTML tags from artist
      username = metadata.Artist.value
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Extract Description
    if (metadata.ImageDescription && metadata.ImageDescription.value) {
      description = metadata.ImageDescription.value
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Extract License
    if (metadata.LicenseShortName && metadata.LicenseShortName.value) {
      licenseType = metadata.LicenseShortName.value;
    } else if (metadata.License && metadata.License.value) {
      licenseType = metadata.License.value;
    }

    Logger.log("API extraction successful - Author: " + username + ", License: " + licenseType);

  } catch (error) {
    Logger.log("Error in extractWikiMetadataAPI: " + error.message);
  }

  return { username, description, licenseType, licenseId };
}


// -----------------------------------------------------------
// WIKIMEDIA COMMONS - IMPROVED REGEX EXTRACTION
// -----------------------------------------------------------
function extractWikiMetadataImproved(url, html) {
  let username = "";
  let description = "";
  let licenseType = "";
  let licenseId = "";

  // Extract the file ID from the URL
  const fileIdMatch = url.match(/wiki\/File:([^?#]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    licenseId = "wiki/File:" + decodeURIComponent(fileIdMatch[1]);
  }

  // (1) AUTHOR EXTRACTION - Multiple strategies

  // Strategy A: Look for fileinfotpl_aut table cell and get NEXT sibling td
  const authorTableRegex = /<tr[^>]*>\s*<td[^>]*id=["']?fileinfotpl_aut["']?[^>]*>[\s\S]*?<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i;
  let authorMatch = authorTableRegex.exec(html);

  // Strategy B: Alternative - look for Author row in any info table
  if (!authorMatch) {
    const authorAltRegex = /<tr[^>]*>[\s\S]*?<td[^>]*>[\s\S]*?Author[\s\S]*?<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i;
    authorMatch = authorAltRegex.exec(html);
  }

  // Strategy C: Look for "author" class
  if (!authorMatch) {
    const authorClassRegex = /<[^>]+class=["'][^"']*author[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/i;
    authorMatch = authorClassRegex.exec(html);
  }

  if (authorMatch && authorMatch[1]) {
    let authorContent = authorMatch[1];

    // Remove style tags
    authorContent = authorContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    // Try to extract from links first
    const linkPatterns = [
      /<a [^>]*>([^<]+)<\/a>/gi,  // Any link text
    ];

    let foundAuthor = "";
    for (const pattern of linkPatterns) {
      const matches = authorContent.match(pattern);
      if (matches && matches.length > 0) {
        // Get text from first meaningful link
        for (const m of matches) {
          const textMatch = m.match(/>([^<]+)</);
          if (textMatch && textMatch[1]) {
            const text = textMatch[1].trim();
            // Skip if it's just a domain or looks like code
            if (text.length > 1 &&
                !text.includes('{') &&
                !text.includes('http') &&
                !text.toLowerCase().includes('edit') &&
                !text.toLowerCase().includes('talk')) {
              foundAuthor = text;
              break;
            }
          }
        }
        if (foundAuthor) break;
      }
    }

    // If no link found, use plain text
    if (!foundAuthor) {
      foundAuthor = authorContent
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Clean up the author
    username = foundAuthor
      .replace(/\(talk\)/gi, '')
      .replace(/\(edit\)/gi, '')
      .trim();

    // Truncate if too long (probably got extra content)
    if (username.length > 150) {
      username = username.substring(0, 150).trim();
    }
  }

  // (2) DESCRIPTION EXTRACTION - Multiple strategies

  // Strategy A: fileinfotpl_desc table structure
  const descTableRegex = /<tr[^>]*>\s*<td[^>]*id=["']?fileinfotpl_desc["']?[^>]*>[\s\S]*?<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i;
  let descMatch = descTableRegex.exec(html);

  // Strategy B: Look for description class div
  if (!descMatch) {
    const descClassRegex = /<td[^>]*class=["'][^"']*description[^"']*["'][^>]*>([\s\S]*?)<\/td>/i;
    descMatch = descClassRegex.exec(html);
  }

  // Strategy C: Look for Description row
  if (!descMatch) {
    const descAltRegex = /<tr[^>]*>[\s\S]*?<td[^>]*>[\s\S]*?Description[\s\S]*?<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i;
    descMatch = descAltRegex.exec(html);
  }

  if (descMatch && descMatch[1]) {
    let descContent = descMatch[1];

    // Try to find English description first
    const engDescRegex = /<div[^>]+lang=["']en["'][^>]*>([\s\S]*?)<\/div>/i;
    const engMatch = engDescRegex.exec(descContent);

    if (engMatch) {
      descContent = engMatch[1];
    }

    // Clean up description
    description = descContent
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/^(English|Deutsch|Français|Español)\s*:\s*/i, '')
      .trim();

    // Truncate if too long
    if (description.length > 500) {
      description = description.substring(0, 500).trim() + "...";
    }
  }

  // (3) LICENSE EXTRACTION
  licenseType = extractLicenseFromHiddenCategories(html);

  Logger.log("Improved regex extraction - Author: " + username + ", Description: " + (description ? description.substring(0, 50) + "..." : "empty"));

  return { username, description, licenseType, licenseId };
}



/**
 * Lists all script properties (run this to see what you have)
 */
function listAllProperties() {
  var props = PropertiesService.getScriptProperties().getProperties();
  var list = [];
  
  for (var key in props) {
    list.push(key + ': ' + props[key].substring(0, 50) + '...');
  }
  
  Logger.log('Total properties: ' + list.length);
  Logger.log(list.join('\n'));
  
  SpreadsheetApp.getUi().alert('Properties (' + list.length + ')', list.join('\n'), SpreadsheetApp.getUi().ButtonSet.OK);
}





/**
 * ONE-TIME: Populate Article Collection (July 16, 2025 to today)
 */


/**
 * Quick category check
 */
function getCategoryFromTitleAndTags(title, tags) {
  var text = (title + ' ' + tags.join(' ')).toLowerCase();
  
  if (/news|breaking|update|announced|opens|closes|launches/.test(text)) return 'News';
  if (/history|historic|century|founded|oldest|museum|memorial|forgotten|abandoned/.test(text)) return 'History';
  if (/hidden|secret|unknown|overlooked|gem|little-known/.test(text)) return 'Hidden Gems';
  if (/food|restaurant|eat|dining|diner|cafe|coffee|bakery|brewery|bar|cuisine/.test(text)) return 'Food & Drink';
  if (/outdoor|nature|park|trail|hiking|camping|lake|river|mountain|beach|waterfall/.test(text)) return 'Outdoors';
  if (/local|community|neighborhood|town|main street|downtown|small town/.test(text)) return 'Local Life';
  if (/culture|art|music|festival|theater|gallery|tradition/.test(text)) return 'Culture';
  
  return 'Travel';
}


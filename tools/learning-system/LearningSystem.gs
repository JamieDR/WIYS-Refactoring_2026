/**
 * ============================================================================
 * WIYS LEARNING SYSTEM — Engine
 * ============================================================================
 * A personalized daily programming lesson system.
 * Teaches JavaScript fundamentals using real examples from the WIYS codebase.
 *
 * How it works:
 * 1. Daily email arrives with a bite-sized lesson + code from YOUR codebase
 * 2. Click "Take Quiz" link → opens a quiz page in your browser
 * 3. Submit answers → see results immediately + score logged
 * 4. Spaced repetition: topics you struggle with come back for review
 *
 * Setup: Run setupLearningSystem() once, then deploy as web app for quizzes.
 * ============================================================================
 */

// ===== CONFIGURATION =====
var LEARNING_CONFIG = {
  PROGRESS_TAB: 'Progress',
  REVIEW_TAB: 'Review Queue',
  DAYS_TOTAL: 30,
  PASSING_SCORE: 2,       // Out of 3 — below this triggers spaced repetition
  REVIEW_INTERVAL_DAYS: 3, // Days before a failed topic comes back
  SUBJECT_PREFIX: 'WIYS Code Lesson',
  COLORS: {
    DARK_TEAL: '#083345',
    WHITE: '#FFFFFF',
    LIGHT_BG: '#f9f9f9',
    CODE_BG: '#1e1e1e',
    CODE_TEXT: '#d4d4d4',
    GREEN_BG: '#e8f5e9',
    GREEN_BORDER: '#4caf50',
    GREEN_TEXT: '#2e7d32',
    RED_BG: '#ffebee',
    RED_TEXT: '#c62828',
    BORDER: '#e0e0e0',
    MUTED: '#666666'
  }
};


// =============================================================================
// SETUP FUNCTIONS
// =============================================================================

/**
 * Run this ONCE to set up the learning system.
 * Creates a tracking spreadsheet and sets up the daily email trigger.
 */
function setupLearningSystem() {
  var ui = SpreadsheetApp.getUi();

  // Step 1: Get email address
  var emailResponse = ui.prompt(
    'Learning System Setup',
    'What email should daily lessons go to?',
    ui.ButtonSet.OK_CANCEL
  );
  if (emailResponse.getSelectedButton() !== ui.Button.OK) return;
  var email = emailResponse.getResponseText().trim();
  if (!email || !email.includes('@')) {
    ui.alert('Error', 'Please enter a valid email address.', ui.ButtonSet.OK);
    return;
  }

  // Step 2: Create tracking spreadsheet
  var ss = SpreadsheetApp.create('WIYS Learning Progress');
  var sheetId = ss.getId();

  // Set up Progress tab
  var progressSheet = ss.getActiveSheet();
  progressSheet.setName(LEARNING_CONFIG.PROGRESS_TAB);
  progressSheet.getRange('A1:F1').setValues([
    ['Date', 'Day #', 'Topic', 'Score', 'Streak', 'Notes']
  ]);
  progressSheet.getRange('A1:F1').setFontWeight('bold');
  progressSheet.getRange('A1:F1').setBackground(LEARNING_CONFIG.COLORS.DARK_TEAL);
  progressSheet.getRange('A1:F1').setFontColor(LEARNING_CONFIG.COLORS.WHITE);
  progressSheet.setFrozenRows(1);
  progressSheet.setColumnWidth(1, 120);
  progressSheet.setColumnWidth(2, 60);
  progressSheet.setColumnWidth(3, 200);
  progressSheet.setColumnWidth(4, 60);
  progressSheet.setColumnWidth(5, 60);
  progressSheet.setColumnWidth(6, 300);

  // Set up Review Queue tab
  var reviewSheet = ss.insertSheet(LEARNING_CONFIG.REVIEW_TAB);
  reviewSheet.getRange('A1:D1').setValues([
    ['Day #', 'Topic', 'Review Date', 'Attempts']
  ]);
  reviewSheet.getRange('A1:D1').setFontWeight('bold');
  reviewSheet.getRange('A1:D1').setBackground(LEARNING_CONFIG.COLORS.DARK_TEAL);
  reviewSheet.getRange('A1:D1').setFontColor(LEARNING_CONFIG.COLORS.WHITE);
  reviewSheet.setFrozenRows(1);

  // Step 3: Save settings to Script Properties
  var props = PropertiesService.getScriptProperties();
  props.setProperties({
    'learningEmail': email,
    'learningSheetId': sheetId,
    'learningCurrentDay': '1',
    'learningStreak': '0',
    'learningLastQuizDate': '',
    'learningWebAppUrl': ''
  });

  // Step 4: Remove any existing learning triggers, then create new one
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'sendDailyLesson') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Daily trigger at 9am Manila time (script timezone is Asia/Manila)
  ScriptApp.newTrigger('sendDailyLesson')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  ui.alert(
    'Setup Complete!',
    'Learning system is ready!\n\n' +
    '- Daily lessons sent to: ' + email + '\n' +
    '- Progress tracked in: ' + ss.getUrl() + '\n' +
    '- First lesson arrives tomorrow at 9am Manila time\n\n' +
    'NEXT STEP: Deploy this as a web app for quizzes.\n' +
    '1. Click Deploy > New deployment\n' +
    '2. Type: Web app\n' +
    '3. Execute as: Me\n' +
    '4. Who has access: Only myself\n' +
    '5. Click Deploy, then copy the URL\n' +
    '6. Run setWebAppUrl() and paste it',
    ui.ButtonSet.OK
  );
}


/**
 * Save the deployed web app URL (needed for quiz links in emails).
 * Run this after deploying as a web app.
 */
function setWebAppUrl() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    'Web App URL',
    'Paste your deployed web app URL here:',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() !== ui.Button.OK) return;

  var url = response.getResponseText().trim();
  if (!url.startsWith('https://')) {
    ui.alert('Error', 'URL should start with https://', ui.ButtonSet.OK);
    return;
  }

  PropertiesService.getScriptProperties().setProperty('learningWebAppUrl', url);
  ui.alert('Saved!', 'Quiz links will now use:\n' + url, ui.ButtonSet.OK);
}


/**
 * Reset progress and start from Day 1.
 */
function resetProgress() {
  var ui = SpreadsheetApp.getUi();
  var confirm = ui.alert(
    'Reset Progress',
    'This will reset your learning progress to Day 1.\nYour history will be kept in the sheet.\n\nAre you sure?',
    ui.ButtonSet.YES_NO
  );
  if (confirm !== ui.Button.YES) return;

  var props = PropertiesService.getScriptProperties();
  props.setProperty('learningCurrentDay', '1');
  props.setProperty('learningStreak', '0');
  props.setProperty('learningLastQuizDate', '');

  ui.alert('Reset!', 'Starting over from Day 1.\nYour next lesson will be Day 1.', ui.ButtonSet.OK);
}


// =============================================================================
// DAILY EMAIL
// =============================================================================

/**
 * Send today's lesson via email. Called daily by time-based trigger.
 * If the current day's quiz hasn't been completed, resends the same lesson.
 */
function sendDailyLesson() {
  var props = PropertiesService.getScriptProperties();
  var email = props.getProperty('learningEmail');
  var currentDay = parseInt(props.getProperty('learningCurrentDay') || '1');
  var streak = parseInt(props.getProperty('learningStreak') || '0');
  var webAppUrl = props.getProperty('learningWebAppUrl') || '';

  // Don't go past the curriculum
  if (currentDay > LEARNING_CONFIG.DAYS_TOTAL) {
    GmailApp.sendEmail(email,
      'WIYS Code Lessons — Complete!',
      '',
      { htmlBody: buildCompletionEmail_(streak) }
    );
    return;
  }

  // Check for review items due today
  var reviewDay = checkReviewQueue_();

  // Use review lesson if one is due, otherwise current lesson
  var lessonDay = reviewDay || currentDay;
  var isReview = !!reviewDay;
  var lesson = getLessonData_(lessonDay);

  if (!lesson) {
    Logger.log('No lesson found for day ' + lessonDay);
    return;
  }

  var subject = LEARNING_CONFIG.SUBJECT_PREFIX +
    ' Day ' + currentDay +
    (isReview ? ' (Review: ' + lesson.title + ')' : ': ' + lesson.title);

  var htmlBody = formatLessonEmail_(lesson, currentDay, streak, webAppUrl, isReview);

  GmailApp.sendEmail(email, subject, '', { htmlBody: htmlBody });
  Logger.log('Sent lesson email: Day ' + lessonDay + (isReview ? ' (review)' : ''));
}


/**
 * Send a test email with Day 1's lesson immediately. Use this to verify setup.
 */
function sendTestLesson() {
  var props = PropertiesService.getScriptProperties();
  var email = props.getProperty('learningEmail');
  var webAppUrl = props.getProperty('learningWebAppUrl') || '';

  if (!email) {
    SpreadsheetApp.getUi().alert('Run setupLearningSystem() first!');
    return;
  }

  var lesson = getLessonData_(1);
  var htmlBody = formatLessonEmail_(lesson, 1, 0, webAppUrl, false);
  GmailApp.sendEmail(email, 'TEST — ' + LEARNING_CONFIG.SUBJECT_PREFIX + ' Day 1: ' + lesson.title, '', { htmlBody: htmlBody });
  SpreadsheetApp.getUi().alert('Test email sent to ' + email + '!');
}


// =============================================================================
// WEB APP — Quiz Interface
// =============================================================================

/**
 * Serves the quiz page or progress page.
 * URL parameters:
 *   ?day=5         → Quiz for day 5
 *   ?progress=1    → Progress dashboard
 */
function doGet(e) {
  var params = e ? e.parameter : {};

  if (params.progress) {
    return HtmlService.createHtmlOutput(buildProgressHtml_())
      .setTitle('WIYS Learning Progress')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  var day = parseInt(params.day || '0');
  if (day < 1 || day > LEARNING_CONFIG.DAYS_TOTAL) {
    return HtmlService.createHtmlOutput(
      '<html><body style="font-family:Arial;padding:40px;text-align:center">' +
      '<h1>WIYS Learning System</h1>' +
      '<p>No quiz specified. Check your email for today\'s lesson!</p>' +
      '<p><a href="?progress=1">View Progress Dashboard</a></p>' +
      '</body></html>'
    ).setTitle('WIYS Learning');
  }

  // Check if already completed today
  var alreadyDone = hasCompletedQuiz_(day);

  return HtmlService.createHtmlOutput(buildQuizHtml_(day, alreadyDone))
    .setTitle('Quiz: Day ' + day)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
 * Called from the quiz page via google.script.run when answers are submitted.
 * Scores the quiz, logs progress, and returns results HTML.
 *
 * @param {number} day - The lesson day number
 * @param {number[]} answers - Array of 3 answer indices (0-3)
 * @returns {Object} Results object with score, html, and details
 */
function submitQuiz(day, answers) {
  var lesson = getLessonData_(day);
  if (!lesson) {
    return { score: 0, html: '<p>Error: Lesson not found.</p>', details: [] };
  }

  // Score the answers
  var results = scoreQuiz_(lesson, answers);

  // Log to progress sheet
  logProgress_(day, lesson.topic, results.score);

  // Update streak
  updateStreak_();

  // If score is below passing, add to review queue
  if (results.score < LEARNING_CONFIG.PASSING_SCORE) {
    addToReview_(day, lesson.topic);
  }

  // Advance to next day if this was the current lesson and they passed
  var props = PropertiesService.getScriptProperties();
  var currentDay = parseInt(props.getProperty('learningCurrentDay') || '1');
  if (day === currentDay) {
    props.setProperty('learningCurrentDay', String(currentDay + 1));
  }

  // Build results HTML
  var streak = parseInt(props.getProperty('learningStreak') || '0');
  results.html = buildResultsHtml_(lesson, results, streak);

  return results;
}


// =============================================================================
// SCORING & TRACKING
// =============================================================================

/**
 * Score quiz answers against the curriculum.
 * @private
 */
function scoreQuiz_(lesson, answers) {
  var details = [];
  var score = 0;

  for (var i = 0; i < lesson.quiz.length; i++) {
    var q = lesson.quiz[i];
    var userAnswer = answers[i];
    var isCorrect = userAnswer === q.answer;
    if (isCorrect) score++;

    details.push({
      question: q.q,
      options: q.options,
      userAnswer: userAnswer,
      correctAnswer: q.answer,
      isCorrect: isCorrect,
      explanation: q.explanation
    });
  }

  return { score: score, total: 3, details: details };
}


/**
 * Log a quiz result to the Progress sheet.
 * @private
 */
function logProgress_(day, topic, score) {
  var sheet = getProgressSheet_();
  if (!sheet) return;

  var progressTab = sheet.getSheetByName(LEARNING_CONFIG.PROGRESS_TAB);
  var streak = parseInt(PropertiesService.getScriptProperties().getProperty('learningStreak') || '0');
  var today = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');

  progressTab.appendRow([today, day, topic, score + '/3', streak, '']);
}


/**
 * Update the streak counter.
 * Streak increments if a quiz was completed today.
 * Streak resets if more than 1 day was skipped.
 * @private
 */
function updateStreak_() {
  var props = PropertiesService.getScriptProperties();
  var lastDateStr = props.getProperty('learningLastQuizDate') || '';
  var today = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');

  if (lastDateStr === today) {
    // Already counted today
    return;
  }

  var streak = parseInt(props.getProperty('learningStreak') || '0');

  if (lastDateStr) {
    var lastDate = new Date(lastDateStr);
    var todayDate = new Date(today);
    var diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      streak++;
    } else {
      // Missed more than a day — streak resets
      streak = 1;
    }
  } else {
    // First ever quiz
    streak = 1;
  }

  props.setProperty('learningStreak', String(streak));
  props.setProperty('learningLastQuizDate', today);
}


/**
 * Check if a quiz for a specific day has already been completed.
 * @private
 */
function hasCompletedQuiz_(day) {
  var sheet = getProgressSheet_();
  if (!sheet) return false;

  var progressTab = sheet.getSheetByName(LEARNING_CONFIG.PROGRESS_TAB);
  var data = progressTab.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === day) return true;
  }
  return false;
}


// =============================================================================
// SPACED REPETITION
// =============================================================================

/**
 * Add a topic to the review queue (triggered when score < passing).
 * @private
 */
function addToReview_(day, topic) {
  var sheet = getProgressSheet_();
  if (!sheet) return;

  var reviewTab = sheet.getSheetByName(LEARNING_CONFIG.REVIEW_TAB);

  // Check if already in queue
  var data = reviewTab.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === day) {
      // Already queued — update review date and increment attempts
      var attempts = (data[i][3] || 0) + 1;
      var nextReview = new Date();
      // Increase interval with each attempt: 3 days, 6 days, 12 days...
      nextReview.setDate(nextReview.getDate() + (LEARNING_CONFIG.REVIEW_INTERVAL_DAYS * attempts));
      var dateStr = Utilities.formatDate(nextReview, 'Asia/Manila', 'yyyy-MM-dd');
      reviewTab.getRange(i + 1, 3).setValue(dateStr);
      reviewTab.getRange(i + 1, 4).setValue(attempts);
      return;
    }
  }

  // New entry
  var reviewDate = new Date();
  reviewDate.setDate(reviewDate.getDate() + LEARNING_CONFIG.REVIEW_INTERVAL_DAYS);
  var dateStr = Utilities.formatDate(reviewDate, 'Asia/Manila', 'yyyy-MM-dd');
  reviewTab.appendRow([day, topic, dateStr, 1]);
}


/**
 * Check if any review items are due today or overdue.
 * Returns the day number of the first due review, or null.
 * @private
 */
function checkReviewQueue_() {
  var sheet = getProgressSheet_();
  if (!sheet) return null;

  var reviewTab = sheet.getSheetByName(LEARNING_CONFIG.REVIEW_TAB);
  var data = reviewTab.getDataRange().getValues();
  var today = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd');

  for (var i = 1; i < data.length; i++) {
    if (data[i][2] && data[i][2] <= today) {
      return data[i][0]; // Return the day number
    }
  }
  return null;
}


// =============================================================================
// HTML BUILDERS — Email
// =============================================================================

/**
 * Build the HTML email body for a daily lesson.
 * @private
 */
function formatLessonEmail_(lesson, currentDay, streak, webAppUrl, isReview) {
  var quizUrl = webAppUrl ? webAppUrl + '?day=' + lesson.day : '';
  var progressUrl = webAppUrl ? webAppUrl + '?progress=1' : '';
  var streakDisplay = streak > 0 ? streak + ' day' + (streak !== 1 ? 's' : '') : 'Start today!';
  var reviewBadge = isReview
    ? '<span style="background:#FF8C00;color:#fff;padding:3px 10px;border-radius:12px;font-size:12px;margin-left:8px">REVIEW</span>'
    : '';

  var html = '' +
    '<div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#333">' +

    // Header
    '<div style="background:' + LEARNING_CONFIG.COLORS.DARK_TEAL + ';color:#fff;padding:24px;text-align:center;border-radius:8px 8px 0 0">' +
      '<div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;opacity:0.8;margin-bottom:6px">' +
        lesson.topic + ' &middot; Week ' + lesson.week + reviewBadge +
      '</div>' +
      '<h1 style="margin:0;font-size:22px;font-weight:bold">Day ' + currentDay + ': ' + lesson.title + '</h1>' +
    '</div>' +

    // Body
    '<div style="padding:24px;background:' + LEARNING_CONFIG.COLORS.LIGHT_BG + ';border:1px solid ' + LEARNING_CONFIG.COLORS.BORDER + ';border-top:none">' +

      // Lesson text
      '<div style="font-size:15px;line-height:1.7">' + lesson.lesson + '</div>' +

      // Code example
      '<div style="margin:20px 0">' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:' + LEARNING_CONFIG.COLORS.MUTED + ';margin-bottom:6px">From your code: ' + lesson.codeRef + '</div>' +
        '<pre style="background:' + LEARNING_CONFIG.COLORS.CODE_BG + ';color:' + LEARNING_CONFIG.COLORS.CODE_TEXT + ';padding:16px;border-radius:6px;font-family:Courier New,monospace;font-size:13px;line-height:1.6;overflow-x:auto;white-space:pre-wrap;margin:0">' +
          escapeHtml_(lesson.codeExample) +
        '</pre>' +
      '</div>' +

      // Quiz button
      (quizUrl
        ? '<div style="text-align:center;margin:28px 0">' +
            '<a href="' + quizUrl + '" style="background:' + LEARNING_CONFIG.COLORS.DARK_TEAL + ';color:#fff;padding:14px 36px;border-radius:6px;text-decoration:none;font-size:16px;font-weight:bold;display:inline-block">Take Today\'s Quiz &rarr;</a>' +
          '</div>'
        : '<p style="text-align:center;color:' + LEARNING_CONFIG.COLORS.MUTED + '"><em>Deploy the web app to enable quizzes. See setup guide.</em></p>'
      ) +

      // Exercise
      '<div style="background:' + LEARNING_CONFIG.COLORS.GREEN_BG + ';padding:16px;border-radius:6px;border-left:4px solid ' + LEARNING_CONFIG.COLORS.GREEN_BORDER + ';margin-top:20px">' +
        '<div style="font-weight:bold;color:' + LEARNING_CONFIG.COLORS.GREEN_TEXT + ';font-size:14px;margin-bottom:8px">Today\'s Exercise</div>' +
        '<div style="font-size:14px;line-height:1.6">' + lesson.exercise + '</div>' +
      '</div>' +

    '</div>' +

    // Footer
    '<div style="padding:16px;text-align:center;background:#f0f0f0;border-radius:0 0 8px 8px;border:1px solid ' + LEARNING_CONFIG.COLORS.BORDER + ';border-top:none">' +
      '<div style="font-size:14px">' +
        'Streak: ' + streakDisplay +
        (progressUrl ? ' &middot; <a href="' + progressUrl + '" style="color:' + LEARNING_CONFIG.COLORS.DARK_TEAL + '">View Progress</a>' : '') +
      '</div>' +
    '</div>' +

    '</div>';

  return html;
}


/**
 * Build a "course complete" email.
 * @private
 */
function buildCompletionEmail_(streak) {
  return '' +
    '<div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;text-align:center;padding:40px">' +
      '<h1 style="color:' + LEARNING_CONFIG.COLORS.DARK_TEAL + '">You Did It!</h1>' +
      '<p style="font-size:48px;margin:20px 0">🎓</p>' +
      '<p style="font-size:18px;line-height:1.6">You completed all 30 days of the WIYS Code Lessons.</p>' +
      '<p style="font-size:16px;color:' + LEARNING_CONFIG.COLORS.MUTED + '">Final streak: ' + streak + ' days</p>' +
      '<p style="font-size:15px;line-height:1.6;margin-top:30px">' +
        'You now understand variables, functions, arrays, loops, objects, and error handling — ' +
        'the building blocks of every function in your WIYS codebase.<br><br>' +
        'Next step: Read through functions in your code with fresh eyes. You\'ll be surprised how much makes sense now.' +
      '</p>' +
    '</div>';
}


// =============================================================================
// HTML BUILDERS — Quiz Web App
// =============================================================================

/**
 * Build the quiz HTML page for a specific day.
 * @private
 */
function buildQuizHtml_(day, alreadyDone) {
  var lesson = getLessonData_(day);
  if (!lesson) {
    return '<html><body><p>Lesson not found for day ' + day + '</p></body></html>';
  }

  var retakeNote = alreadyDone
    ? '<div style="background:#fff3cd;padding:12px;border-radius:6px;margin-bottom:20px;border:1px solid #ffc107">' +
      'You\'ve already taken this quiz. You can retake it — your best score counts!</div>'
    : '';

  var questionsHtml = '';
  for (var i = 0; i < lesson.quiz.length; i++) {
    var q = lesson.quiz[i];
    var optionsHtml = '';
    for (var j = 0; j < q.options.length; j++) {
      optionsHtml +=
        '<label style="display:block;padding:10px 12px;margin:6px 0;cursor:pointer;border-radius:6px;border:1px solid #ddd;background:#fff;transition:background 0.2s">' +
          '<input type="radio" name="q' + i + '" value="' + j + '" required style="margin-right:10px">' +
          escapeHtml_(q.options[j]) +
        '</label>';
    }

    questionsHtml +=
      '<div style="margin:24px 0;padding:20px;background:#f5f5f5;border-radius:8px">' +
        '<div style="font-weight:bold;font-size:15px;margin-bottom:12px">Q' + (i + 1) + ': ' + escapeHtml_(q.q) + '</div>' +
        optionsHtml +
      '</div>';
  }

  return '' +
    '<!DOCTYPE html>' +
    '<html><head>' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<style>' +
        'body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; }' +
        'h1 { color: ' + LEARNING_CONFIG.COLORS.DARK_TEAL + '; margin-bottom: 4px; }' +
        '.subtitle { color: ' + LEARNING_CONFIG.COLORS.MUTED + '; margin-bottom: 24px; }' +
        'label:hover { background: #e8e8e8 !important; }' +
        'input[type=radio]:checked + span { font-weight: bold; }' +
        '#submitBtn { background: ' + LEARNING_CONFIG.COLORS.DARK_TEAL + '; color: #fff; border: none; padding: 14px 0; border-radius: 6px; font-size: 16px; cursor: pointer; width: 100%; font-weight: bold; }' +
        '#submitBtn:hover { opacity: 0.9; }' +
        '#submitBtn:disabled { opacity: 0.5; cursor: not-allowed; }' +
        '#loading { display: none; text-align: center; padding: 20px; }' +
        '#results { display: none; }' +
        '.error { color: ' + LEARNING_CONFIG.COLORS.RED_TEXT + '; background: ' + LEARNING_CONFIG.COLORS.RED_BG + '; padding: 12px; border-radius: 6px; }' +
      '</style>' +
    '</head><body>' +

      '<h1>Day ' + day + ': ' + escapeHtml_(lesson.title) + '</h1>' +
      '<div class="subtitle">' + escapeHtml_(lesson.topic) + ' &middot; Week ' + lesson.week + '</div>' +

      retakeNote +

      '<div id="quiz-form">' +
        questionsHtml +
        '<button id="submitBtn" onclick="submitAnswers()">Submit Answers</button>' +
      '</div>' +

      '<div id="loading"><p>Scoring...</p></div>' +
      '<div id="results"></div>' +

      '<script>' +
        'function submitAnswers() {' +
          'var answers = [];' +
          'for (var i = 0; i < 3; i++) {' +
            'var selected = document.querySelector(\'input[name="q\' + i + \'"]:checked\');' +
            'if (!selected) { alert("Please answer all 3 questions."); return; }' +
            'answers.push(parseInt(selected.value));' +
          '}' +
          'document.getElementById("submitBtn").disabled = true;' +
          'document.getElementById("loading").style.display = "block";' +
          'google.script.run' +
            '.withSuccessHandler(showResults)' +
            '.withFailureHandler(showError)' +
            '.submitQuiz(' + day + ', answers);' +
        '}' +
        'function showResults(result) {' +
          'document.getElementById("quiz-form").style.display = "none";' +
          'document.getElementById("loading").style.display = "none";' +
          'document.getElementById("results").style.display = "block";' +
          'document.getElementById("results").innerHTML = result.html;' +
        '}' +
        'function showError(err) {' +
          'document.getElementById("loading").style.display = "none";' +
          'document.getElementById("submitBtn").disabled = false;' +
          'alert("Error submitting quiz: " + err.message + "\\nPlease try again.");' +
        '}' +
      '</script>' +

    '</body></html>';
}


/**
 * Build results HTML shown after quiz submission.
 * @private
 */
function buildResultsHtml_(lesson, results, streak) {
  var scoreColor = results.score >= LEARNING_CONFIG.PASSING_SCORE
    ? LEARNING_CONFIG.COLORS.GREEN_TEXT
    : LEARNING_CONFIG.COLORS.RED_TEXT;

  var scoreBg = results.score >= LEARNING_CONFIG.PASSING_SCORE
    ? LEARNING_CONFIG.COLORS.GREEN_BG
    : LEARNING_CONFIG.COLORS.RED_BG;

  var scoreMessage = results.score === 3
    ? 'Perfect score!'
    : results.score >= 2
      ? 'Nice work!'
      : results.score === 1
        ? 'Keep at it — review the lesson and try again.'
        : 'No worries — this topic will come back for review.';

  var html = '' +
    '<div style="text-align:center;padding:20px;background:' + scoreBg + ';border-radius:8px;margin-bottom:24px">' +
      '<div style="font-size:48px;font-weight:bold;color:' + scoreColor + '">' + results.score + '/3</div>' +
      '<div style="font-size:16px;color:' + scoreColor + ';margin-top:8px">' + scoreMessage + '</div>' +
    '</div>';

  // Show each question's result
  for (var i = 0; i < results.details.length; i++) {
    var d = results.details[i];
    var icon = d.isCorrect ? '&#10004;' : '&#10008;';
    var bg = d.isCorrect ? LEARNING_CONFIG.COLORS.GREEN_BG : LEARNING_CONFIG.COLORS.RED_BG;
    var borderColor = d.isCorrect ? LEARNING_CONFIG.COLORS.GREEN_BORDER : '#ef5350';

    html +=
      '<div style="margin:16px 0;padding:16px;background:' + bg + ';border-radius:6px;border-left:4px solid ' + borderColor + '">' +
        '<div style="font-weight:bold;margin-bottom:8px">' + icon + ' Q' + (i + 1) + ': ' + escapeHtml_(d.question) + '</div>' +
        '<div style="margin:4px 0">Your answer: <strong>' + escapeHtml_(d.options[d.userAnswer]) + '</strong></div>' +
        (d.isCorrect
          ? ''
          : '<div style="margin:4px 0">Correct answer: <strong>' + escapeHtml_(d.options[d.correctAnswer]) + '</strong></div>'
        ) +
        '<div style="margin-top:8px;font-style:italic;color:#555">' + escapeHtml_(d.explanation) + '</div>' +
      '</div>';
  }

  // Streak and navigation
  html +=
    '<div style="text-align:center;margin-top:30px;padding:20px;background:#f5f5f5;border-radius:8px">' +
      '<div style="font-size:18px;margin-bottom:8px">Streak: ' + streak + ' day' + (streak !== 1 ? 's' : '') + '</div>' +
      '<div style="margin-top:12px">' +
        '<a href="?progress=1" style="color:' + LEARNING_CONFIG.COLORS.DARK_TEAL + ';font-weight:bold">View Full Progress &rarr;</a>' +
      '</div>' +
    '</div>';

  return html;
}


/**
 * Build the progress dashboard HTML page.
 * @private
 */
function buildProgressHtml_() {
  var props = PropertiesService.getScriptProperties();
  var currentDay = parseInt(props.getProperty('learningCurrentDay') || '1');
  var streak = parseInt(props.getProperty('learningStreak') || '0');
  var sheet = getProgressSheet_();

  var progressHtml = '';
  var totalScore = 0;
  var quizCount = 0;

  if (sheet) {
    var progressTab = sheet.getSheetByName(LEARNING_CONFIG.PROGRESS_TAB);
    var data = progressTab.getDataRange().getValues();

    for (var i = data.length - 1; i >= 1; i--) {
      var score = String(data[i][3]);
      var scoreNum = parseInt(score);
      var bg = scoreNum >= 2 ? LEARNING_CONFIG.COLORS.GREEN_BG : LEARNING_CONFIG.COLORS.RED_BG;
      totalScore += scoreNum;
      quizCount++;

      progressHtml +=
        '<tr>' +
          '<td style="padding:8px;border-bottom:1px solid #eee">' + data[i][0] + '</td>' +
          '<td style="padding:8px;border-bottom:1px solid #eee;text-align:center">' + data[i][1] + '</td>' +
          '<td style="padding:8px;border-bottom:1px solid #eee">' + data[i][2] + '</td>' +
          '<td style="padding:8px;border-bottom:1px solid #eee;text-align:center;background:' + bg + ';border-radius:4px">' + score + '</td>' +
        '</tr>';
    }
  }

  var avgScore = quizCount > 0 ? (totalScore / quizCount).toFixed(1) : '—';
  var completionPct = Math.round(((currentDay - 1) / LEARNING_CONFIG.DAYS_TOTAL) * 100);

  return '' +
    '<!DOCTYPE html>' +
    '<html><head><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<style>' +
      'body { font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; color: #333; }' +
      'h1 { color: ' + LEARNING_CONFIG.COLORS.DARK_TEAL + '; }' +
      '.stat-grid { display: flex; gap: 16px; flex-wrap: wrap; margin: 24px 0; }' +
      '.stat { flex: 1; min-width: 120px; background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; }' +
      '.stat-number { font-size: 32px; font-weight: bold; color: ' + LEARNING_CONFIG.COLORS.DARK_TEAL + '; }' +
      '.stat-label { font-size: 13px; color: ' + LEARNING_CONFIG.COLORS.MUTED + '; margin-top: 4px; }' +
      '.progress-bar { background: #e0e0e0; border-radius: 10px; height: 20px; overflow: hidden; margin: 20px 0; }' +
      '.progress-fill { background: ' + LEARNING_CONFIG.COLORS.DARK_TEAL + '; height: 100%; border-radius: 10px; transition: width 0.3s; }' +
      'table { width: 100%; border-collapse: collapse; margin-top: 20px; }' +
      'th { background: ' + LEARNING_CONFIG.COLORS.DARK_TEAL + '; color: #fff; padding: 10px; text-align: left; }' +
    '</style></head><body>' +

    '<h1>Learning Progress</h1>' +

    '<div class="stat-grid">' +
      '<div class="stat"><div class="stat-number">' + streak + '</div><div class="stat-label">Day Streak</div></div>' +
      '<div class="stat"><div class="stat-number">' + (currentDay - 1) + '/' + LEARNING_CONFIG.DAYS_TOTAL + '</div><div class="stat-label">Lessons Done</div></div>' +
      '<div class="stat"><div class="stat-number">' + avgScore + '</div><div class="stat-label">Avg Score (out of 3)</div></div>' +
      '<div class="stat"><div class="stat-number">' + quizCount + '</div><div class="stat-label">Quizzes Taken</div></div>' +
    '</div>' +

    '<div style="font-size:13px;color:' + LEARNING_CONFIG.COLORS.MUTED + '">Course Progress</div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:' + completionPct + '%"></div></div>' +
    '<div style="text-align:right;font-size:13px;color:' + LEARNING_CONFIG.COLORS.MUTED + '">' + completionPct + '%</div>' +

    (progressHtml
      ? '<table><tr><th>Date</th><th>Day</th><th>Topic</th><th>Score</th></tr>' + progressHtml + '</table>'
      : '<p style="text-align:center;color:' + LEARNING_CONFIG.COLORS.MUTED + ';margin-top:40px">No quizzes completed yet. Check your email!</p>'
    ) +

    '</body></html>';
}


// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get lesson data from the CURRICULUM array.
 * @private
 */
function getLessonData_(day) {
  if (typeof CURRICULUM === 'undefined') {
    Logger.log('Error: CURRICULUM not found. Make sure Curriculum.gs is in the project.');
    return null;
  }

  for (var i = 0; i < CURRICULUM.length; i++) {
    if (CURRICULUM[i].day === day) return CURRICULUM[i];
  }
  return null;
}


/**
 * Get the learning progress spreadsheet.
 * @private
 */
function getProgressSheet_() {
  var sheetId = PropertiesService.getScriptProperties().getProperty('learningSheetId');
  if (!sheetId) return null;

  try {
    return SpreadsheetApp.openById(sheetId);
  } catch (e) {
    Logger.log('Could not open progress sheet: ' + e.message);
    return null;
  }
}


/**
 * Escape HTML special characters.
 * @private
 */
function escapeHtml_(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

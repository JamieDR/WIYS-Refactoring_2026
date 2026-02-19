# Lab 04: JavaScript -- Reading Your Own Code

You built a 16,400-line production system in JavaScript. This lab teaches you the core JavaScript concepts by looking at your actual code in `src/main.gs`. Every concept uses real line numbers from your file.

---

## 1. Variables -- Named Boxes That Hold Values

A variable is a named box. You put a value in it, then use the name to get the value back later. JavaScript has three keywords for creating variables: `var`, `const`, and `let`.

**Type this:**

```
sed -n '9,9p' src/main.gs
```

**You should see:**

```
const CONFIG = {
```

**What this means:** `const` creates a variable named `CONFIG` and puts a value in it (a big object -- we will cover objects next). The word `const` means "constant" -- once you put something in this box, you cannot replace it with something else. Use `const` when a value should never change.

**Now type this:**

```
sed -n '275,276p' src/main.gs
```

**You should see:**

```
  let currentSection = null;
  let expectingUrl = false;
```

**What this means:** `let` creates variables that CAN change later. Here, `currentSection` starts as `null` (meaning "nothing yet") and `expectingUrl` starts as `false`. As the code runs, these values get updated. Use `let` when a value will change.

**Now type this:**

```
sed -n '307,307p' src/main.gs
```

**You should see:**

```
        var cleanedH2Text = text.replace(/^##\s*/, '').trim();
```

**What this means:** `var` is the old way to create variables. It works like `let` but has quirky behavior in certain situations. Your codebase uses `var` in older code and `const`/`let` in newer code. When writing new code, prefer `const` (if the value will not change) or `let` (if it will).

**Now try:** Look at line 493. What keyword is used? What value does it hold?

```
sed -n '493,494p' src/main.gs
```

You should see `var parts` and `var slug`. Both use `var` because this function was written in the older style.

**Check:** You can now recognize `const`, `let`, and `var`. You know `const` = cannot change, `let` = can change, `var` = old style of `let`.

---

## 2. Objects -- Grouping Related Values Together

An object groups related values together under one name. You access the values with dot notation: `objectName.propertyName`.

**Type this:**

```
sed -n '9,14p' src/main.gs
```

**You should see:**

```
const CONFIG = {
  // ===== GOOGLE WORKSPACE IDs =====
  GOOGLE: {
    PARENT_FOLDER_ID: '1elEoElaapgO4ANXrzrYrt66p2S4SxVLZ',
    SPREADSHEET_ID: '1gQmKqIDr07tSaqoDY_R13fQcO3YWB6HgLSEmpTsPYb8'
  },
```

**What this means:** `CONFIG` is an object. Inside it, `GOOGLE` is another object (objects can nest inside objects). `PARENT_FOLDER_ID` and `SPREADSHEET_ID` are properties -- named values inside the object. The curly braces `{ }` define where an object starts and ends.

**Now type this:**

```
sed -n '53,67p' src/main.gs
```

**You should see:**

```
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
    EMAIL_NEWSLETTER: 'Email Newsletter',
    TOPIC_LIST: 'Topic List',
    ENHANCED_DRAFTER: 'Enhanced Drafter',
    SCRIPT_PROPERTIES: 'Script Properties'
  },
```

**What this means:** `CONFIG.SHEETS` is an object that maps short code names to the actual sheet names in your spreadsheet. Instead of typing `'Article Status Tracker'` all over the codebase (and risking typos), you type `CONFIG.SHEETS.ARTICLE_STATUS_TRACKER`. One place to change it, zero typos.

**Now type this to see it used in real code:**

```
sed -n '233,233p' src/main.gs
```

**You should see:**

```
  const statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
```

**What happened:** The code reads the value from the CONFIG object and passes it to `getSheetByName()`. Dot notation chains from left to right: start with `CONFIG`, go into `SHEETS`, grab `ARTICLE_STATUS_TRACKER`. The value that comes out is the string `'Article Status Tracker'`.

**Check:** If you see `CONFIG.COLUMNS.SLIDE_NUMBER` in the code, can you find where it is defined? Try `sed -n '87,103p' src/main.gs` and look for `SLIDE_NUMBER`. It is on line 91, with a value of `4`.

---

## 3. Functions -- Named Blocks of Reusable Code

A function is a block of code with a name. You define it once, then run it whenever you need it by "calling" its name.

**Type this:**

```
sed -n '490,497p' src/main.gs
```

**You should see:**

```
function extractSlugFromUrlIntro(url) {
  if (!url) return null;
  url = url.split('?')[0].replace(/\/$/, '');
  var parts = url.split('/');
  var slug = parts[parts.length - 1];
  if (slug && /^[a-z0-9-]+$/.test(slug)) return slug;
  return null;
}
```

**What this means:** The word `function` says "I am defining a block of code." The name `extractSlugFromUrlIntro` is what you use to call it later. Everything between the curly braces `{ }` is the code that runs when the function is called. This function takes a URL and pulls out the last part (the "slug" -- the human-readable bit at the end of a web address).

**Now try:** Look at line 254 to see another function definition:

```
sed -n '254,265p' src/main.gs
```

This one is called `extractGoogleDocId`. Its job: take a Google Docs URL and pull out just the document ID.

**Check:** You can spot a function definition by the keyword `function` followed by a name and parentheses.

---

## 4. Parameters and Arguments -- What Goes in the Parentheses

When you define a function, the names in the parentheses are **parameters** -- placeholders for values the function needs. When you call the function, the actual values you pass in are **arguments**.

**Type this:**

```
sed -n '254,254p' src/main.gs
```

**You should see:**

```
function extractGoogleDocId(docUrl) {
```

**What this means:** `docUrl` is a parameter. It is a placeholder name. The function does not know what URL it will receive -- it just knows it will get something called `docUrl` and can work with it.

**Now type this:**

```
sed -n '617,617p' src/main.gs
```

**You should see:**

```
    const docId = extractGoogleDocId(docUrl);
```

**What this means:** Here the function is being *called*. The variable `docUrl` (which at this point holds an actual URL) is the argument -- the real value being passed in. The function takes that value, does its work, and hands back a result (which gets stored in `docId`).

**Now try:** Look at line 500. What function is defined? What are its parameters?

```
sed -n '500,500p' src/main.gs
```

You should see `function fetchIntroBySlugIntro(slug, username, appPassword)`. This function has three parameters -- it needs a slug, a username, and a password to do its work.

**Check:** Parameters are names in the parentheses of a function definition. Arguments are the actual values you pass when calling it.

---

## 5. Return Values -- Functions That Hand Back a Result

A function can do work and then hand back a result using the `return` keyword. The calling code receives that result.

**Type this:**

```
sed -n '254,265p' src/main.gs
```

**You should see:**

```
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
```

**What this means:** This function has three possible `return` statements. If the URL is missing or invalid, it returns `null` (nothing). If it successfully extracts the ID, it returns that ID string. If something goes wrong, it returns `null` again. The function always hands something back.

**Now look at how the return value gets used:**

```
sed -n '617,621p' src/main.gs
```

**You should see:**

```
    const docId = extractGoogleDocId(docUrl);
    if (!docId) {
      sheet.getRange(row, CONFIG.COLUMNS.STATUS_MESSAGES).setValue(CONFIG.ERRORS.INVALID_DOC_URL);
      return;
    }
```

**What happened:** The return value of `extractGoogleDocId(docUrl)` gets stored in `docId`. Then the code checks if `docId` is `null` (that is what `!docId` means -- "if docId is nothing"). If the function returned nothing, it writes an error message to the sheet.

**Check:** When you see `return someValue;`, the function stops running and hands `someValue` back to wherever it was called.

---

## 6. if/else -- Code That Makes Decisions

`if` checks a condition. If the condition is true, the code inside runs. If false, it skips to `else` (if there is one).

**Type this:**

```
sed -n '1106,1109p' src/main.gs
```

**You should see:**

```
    if (responseCode !== 200) {
      Logger.log('Preview API error: ' + responseText);
      return 'Error: API returned ' + responseCode;
    }
```

**What this means:** This code checks: "Is the response code NOT equal to 200?" (200 means success in HTTP). If the API call failed, it logs the error and returns an error message. If the response code IS 200, this whole block is skipped and the code keeps going.

**Now type this:**

```
sed -n '255,257p' src/main.gs
```

**You should see:**

```
  if (!docUrl || !docUrl.includes(CONFIG.URL.GOOGLE_DOC_PATH)) {
    return null;
  }
```

**What this means:** Two conditions joined by `||` (which means "OR"). It reads as: "If there is no docUrl, OR if the docUrl does not include the Google Doc path, return null." The `!` means "not." So `!docUrl` means "docUrl is empty/missing."

**Now try:** Look at line 3149 for a different kind of decision:

```
sed -n '3149,3149p' src/main.gs
```

You should see `var selectedAuthor = Math.random() < 0.5 ? LEO_HEIT : JOHN_GHOST;`. This is a shorthand if/else called a "ternary." It reads: "If a random number is less than 0.5, pick LEO_HEIT. Otherwise pick JOHN_GHOST." It is a coin flip to randomly assign an author.

**Check:** `if` runs code when a condition is true. `!` flips true to false (and false to true). `||` means "or." `!==` means "not equal to."

---

## 7. Arrays -- Ordered Lists of Things

An array is a list of values in order. You create one with square brackets `[ ]`. Each item has a position number (called an index), starting at 0.

**Type this:**

```
sed -n '173,173p' src/main.gs
```

**You should see:**

```
  PUNCTUATION: ['.', ',', ':', ';', '!', '?'],
```

**What this means:** `PUNCTUATION` is an array containing six strings. The `.` is at position 0, `,` is at position 1, `:` is at position 2, and so on. Arrays always start counting at 0, not 1.

**Now type this:**

```
sed -n '10548,10548p' src/main.gs
```

**You should see:**

```
var ALL_UPLOADER_WORKSPACES = ['JAMIE', 'CHARL', 'LARA', 'SHAYNE', 'NAINTARA', 'KARL', 'MARIE'];
```

**What this means:** This is an array of workspace names -- the team members. `ALL_UPLOADER_WORKSPACES[0]` is `'JAMIE'`, `ALL_UPLOADER_WORKSPACES[1]` is `'CHARL'`, and so on. There are 7 items, so the last one (`'MARIE'`) is at position 6.

**Now try:** Look at line 10336:

```
sed -n '10336,10336p' src/main.gs
```

You should see `RETRY_DELAYS_MS: [5000, 10000, 20000]`. This is an array of numbers -- wait times in milliseconds for retrying a failed operation. The first retry waits 5 seconds, the second waits 10, the third waits 20.

**Check:** Arrays use square brackets `[ ]`. Items are separated by commas. Position counting starts at 0.

---

## 8. for Loops -- Doing Something Repeatedly

A `for` loop repeats a block of code, typically once for each item in a list. The loop has three parts: a starting point, a condition to keep going, and a step.

**Type this:**

```
sed -n '237,243p' src/main.gs
```

**You should see:**

```
  for (let i = 0; i < statusData.length; i++) {
    if (statusData[i][0] === articleTitle ||
        (statusData[i][0] && statusData[i][0].toString().trim() === articleTitle.trim())) {
      Logger.log('Found match at row ' + (i+1) + ' with URL: ' + statusData[i][1]);
      return statusData[i][1];
    }
  }
```

**What this means:** Read the `for` line in three parts, separated by semicolons:

1. `let i = 0` -- Start counting at 0
2. `i < statusData.length` -- Keep going as long as `i` is less than the number of rows
3. `i++` -- After each loop, add 1 to `i`

So this loops through every row of `statusData`, checking if the article title matches. When it finds a match, it returns the URL. This is how the code searches through a spreadsheet -- row by row.

**Now try:** Look at lines 10555-10557:

```
sed -n '10555,10557p' src/main.gs
```

You should see another `for` loop: `for (var i = 0; i < data.length; i++)`. Same pattern -- loop through every row of data. The body gets the cell value and skips empty ones with `if (!cellValue) continue;`. The `continue` keyword means "skip the rest of this loop iteration and move to the next one."

**Check:** `for (start; condition; step)` is the pattern. `i++` means "add 1 to i." The loop runs the code block once for each value of `i`.

---

## 9. String Methods -- Transforming Text

Strings (text values) have built-in methods you can call to transform them. A method is just a function that belongs to a specific value.

**Type this:**

```
sed -n '307,307p' src/main.gs
```

**You should see:**

```
        var cleanedH2Text = text.replace(/^##\s*/, '').trim();
```

**What this means:** Two string methods are being used here:

- `.replace(/^##\s*/, '')` -- Find the pattern `##` at the start of the text (with any spaces after it) and replace it with nothing (empty string `''`). This strips out the markdown heading markers.
- `.trim()` -- Remove any whitespace (spaces, tabs) from the beginning and end of the string.

So if `text` was `"## My Great Heading  "`, after this line `cleanedH2Text` would be `"My Great Heading"`.

**Now type this:**

```
sed -n '10559,10559p' src/main.gs
```

**You should see:**

```
    var upper = cellValue.toUpperCase();
```

**What this means:** `.toUpperCase()` converts all letters to uppercase. If `cellValue` was `"Jamie"`, `upper` would be `"JAMIE"`. This is commonly used when comparing text and you do not want capitalization to matter.

**Now try:** Look at line 324:

```
sed -n '324,324p' src/main.gs
```

You should see `.toLowerCase()` being used, which is the opposite -- it converts to all lowercase. Used here so `"Paste URL Here"` and `"paste url here"` are both caught.

**Check:** `.replace()` swaps text. `.trim()` strips whitespace. `.toUpperCase()` and `.toLowerCase()` change capitalization. These do not change the original string -- they return a new one.

---

## 10. Chaining -- Multiple Operations in One Line

When you see multiple dots in a row, that is chaining. Each method returns a result, and the next method runs on that result. Read left to right.

**Type this:**

```
sed -n '1919,1923p' src/main.gs
```

**You should see:**

```
    let extractedText = html.substring(contentStartIndex, contentEndIndex)
      .replace(/<[^>]+>/g, "") // Remove any HTML tags
      .replace(/&nbsp;/g, " ")  // Replace HTML non-breaking spaces
      .replace(/\s+/g, " ")     // Normalize whitespace
      .trim();
```

**What this means:** This is one statement, chaining five operations. Read it step by step:

1. `html.substring(contentStartIndex, contentEndIndex)` -- Cut out a piece of the HTML string
2. `.replace(/<[^>]+>/g, "")` -- Strip out all HTML tags from that piece
3. `.replace(/&nbsp;/g, " ")` -- Replace special HTML spaces with normal spaces
4. `.replace(/\s+/g, " ")` -- Collapse multiple spaces into one space
5. `.trim()` -- Remove leading/trailing whitespace

Each step takes the result of the previous step and transforms it further. The final clean text gets stored in `extractedText`.

**Now type this:**

```
sed -n '260,260p' src/main.gs
```

**You should see:**

```
    return docUrl.split(CONFIG.URL.GOOGLE_DOC_PATH)[1].split('/')[0];
```

**What this means:** Reading left to right:

1. `docUrl.split(CONFIG.URL.GOOGLE_DOC_PATH)` -- Split the URL at `/d/`, creating an array of two parts (before and after `/d/`)
2. `[1]` -- Grab the second part (index 1) -- everything after `/d/`
3. `.split('/')` -- Split that part at every `/`, creating another array
4. `[0]` -- Grab the first part (index 0) -- that is the document ID

This is how the code extracts a Google Doc ID from a URL like `https://docs.google.com/document/d/abc123xyz/edit`.

**Check:** Chaining reads left to right. Each dot starts a new operation on the result of the previous one. The `[0]` and `[1]` are array index access, not methods, but they work the same way in a chain.

---

## 11. The SpreadsheetApp Pattern -- Talking to Google Sheets

Google Apps Script has built-in objects for working with Google Sheets. The pattern `SpreadsheetApp.getActiveSpreadsheet().getSheetByName(...)` goes from the broadest level (the app) to the most specific (a single sheet). Each dot goes one level deeper.

**Type this:**

```
sed -n '232,234p' src/main.gs
```

**You should see:**

```
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const statusSheet = ss.getSheetByName(CONFIG.SHEETS.ARTICLE_STATUS_TRACKER);
  const statusData = statusSheet.getRange("C:D").getValues();
```

**What this means:** Three levels of going deeper:

1. `SpreadsheetApp.getActiveSpreadsheet()` -- "Hey Google Sheets app, give me the currently open spreadsheet." The result is stored in `ss`.
2. `ss.getSheetByName(...)` -- "In that spreadsheet, find the sheet named 'Article Status Tracker'." The result is stored in `statusSheet`.
3. `statusSheet.getRange("C:D").getValues()` -- "In that sheet, grab columns C and D, and give me all the values." The result is stored in `statusData`.

You could write this as one long chain: `SpreadsheetApp.getActiveSpreadsheet().getSheetByName(...).getRange("C:D").getValues()`. But breaking it into three lines with named variables makes it easier to read and debug.

**Now type this:**

```
sed -n '606,606p' src/main.gs
```

**You should see:**

```
    const articleTitle = sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE).getValue();
```

**What this means:** This reads a single cell from the spreadsheet. `sheet.getRange(row, CONFIG.COLUMNS.ARTICLE_TITLE)` gets the cell at a specific row and column (column 1, which is the article title column). Then `.getValue()` gets the actual content of that cell. The pattern is always: get a range first, then do something with it.

**Now try:** Look at line 612:

```
sed -n '612,612p' src/main.gs
```

You should see `.setValue(...)` which is the opposite of `.getValue()` -- it writes a value INTO the cell instead of reading from it.

**Check:** The pattern is always: App -> Spreadsheet -> Sheet -> Range -> getValue/setValue. Each step narrows down from "the entire Sheets app" to "one specific cell."

---

## 12. Reading a Complete Function -- Putting It All Together

Time to read a real function line by line and say what each line does in plain English. This is the most important skill in programming -- reading code.

**Type this:**

```
sed -n '490,497p' src/main.gs
```

**You should see:**

```
function extractSlugFromUrlIntro(url) {
  if (!url) return null;
  url = url.split('?')[0].replace(/\/$/, '');
  var parts = url.split('/');
  var slug = parts[parts.length - 1];
  if (slug && /^[a-z0-9-]+$/.test(slug)) return slug;
  return null;
}
```

Now read each line and say out loud (or think) what it does:

**Line 490:** `function extractSlugFromUrlIntro(url) {`
Define a function called `extractSlugFromUrlIntro` that takes one parameter: `url`.

**Line 491:** `if (!url) return null;`
If there is no URL (it is empty or missing), stop immediately and return nothing.

**Line 492:** `url = url.split('?')[0].replace(/\/$/, '');`
Take the URL, split it at `?` (to remove query parameters like `?ref=homepage`), keep only the part before the `?`, then remove any trailing slash. Save the cleaned result back into `url`.

**Line 493:** `var parts = url.split('/');`
Split the URL at every `/` into an array of parts. For example, `https://wheninyourstate.com/cool-article` becomes `['https:', '', 'wheninyourstate.com', 'cool-article']`.

**Line 494:** `var slug = parts[parts.length - 1];`
Grab the last item in the array. `parts.length - 1` gives the index of the last item (because arrays start at 0). This is the slug -- like `cool-article`.

**Line 495:** `if (slug && /^[a-z0-9-]+$/.test(slug)) return slug;`
If the slug exists AND it contains only lowercase letters, numbers, and hyphens (that is what the `/^[a-z0-9-]+$/` pattern checks), return it. This is a safety check -- slugs should only have simple characters.

**Line 496:** `return null;`
If we got this far, the slug was not valid. Return nothing.

**Now try reading one on your own.** Type this:

```
sed -n '2219,2225p' src/main.gs
```

You should see the `extractStockPhotoIDFromURL` function. Try reading each line and saying what it does:

- Line 2219: Define a function that takes a URL
- Line 2222: Create a pattern (regex) that matches Shutterstock image URLs
- Line 2223: Try to match the URL against the pattern
- Line 2224: If it matched, return the captured number (the photo ID). If not, return "Not found"

**Check:** You can read a short function and explain in plain English what each line does. This is the foundational skill everything else builds on.

---

## What You Learned

- [ ] **Variables:** `const` (cannot change), `let` (can change), `var` (old style) -- named boxes for values
- [ ] **Objects:** `{ }` group related values, accessed with dot notation like `CONFIG.SHEETS.UPLOADER`
- [ ] **Functions:** Named blocks of code defined with `function name()`, called by using the name
- [ ] **Parameters and arguments:** Parameters are placeholder names in the definition; arguments are real values you pass in
- [ ] **Return values:** `return` hands a result back to the caller
- [ ] **if/else:** Code that makes decisions based on conditions; `!` means "not", `||` means "or", `!==` means "not equal to"
- [ ] **Arrays:** Ordered lists in `[ ]`, positions start at 0
- [ ] **for loops:** `for (start; condition; step)` repeats code for each item
- [ ] **String methods:** `.replace()`, `.trim()`, `.toUpperCase()`, `.toLowerCase()` transform text
- [ ] **Chaining:** Multiple methods in one line, read left to right
- [ ] **SpreadsheetApp pattern:** App -> Spreadsheet -> Sheet -> Range -> getValue/setValue
- [ ] **Reading a function:** Go line by line, say what each line does in plain English

Every one of these concepts appears hundreds of times in your 16,400-line codebase. You now have the vocabulary to read any function in `main.gs` and understand what it is doing.

---

Next up: [Lab 05](lab-05-reading-real-functions.md) -- Reading Real Functions (walking through longer, more complex functions in your codebase)

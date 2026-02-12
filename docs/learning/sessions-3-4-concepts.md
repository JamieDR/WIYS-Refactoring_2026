# What You Saw But Didn't Learn — Sessions 3 & 4

These are the programming concepts that flew by while we were focused on shipping the batch processing code. Each one is explained in plain English, with real examples from your WIYS codebase, a quiz, and a hands-on exercise.

**How to use this:**
- Read one concept at a time. Don't rush through.
- Try the quiz BEFORE looking at the answer.
- Do the exercises in the Apps Script editor (script.google.com) on a test sheet, not the live one.

---

## Table of Contents

1. [Variables](#1-variables)
2. [Arrays (Lists)](#2-arrays-lists)
3. [Objects (Named Containers)](#3-objects-named-containers)
4. [Functions](#4-functions)
5. [getRange and getValues — Reading Spreadsheet Data](#5-getrange-and-getvalues--reading-spreadsheet-data)
6. [Bulk Reads vs Cell-by-Cell — Why Speed Matters](#6-bulk-reads-vs-cell-by-cell--why-speed-matters)
7. [Loops (for)](#7-loops-for)
8. [if/else — Making Decisions](#8-ifelse--making-decisions)
9. [State and PropertiesService — Remembering Things Between Runs](#9-state-and-propertiesservice--remembering-things-between-runs)
10. [Triggers — Scheduling Code to Run Later](#10-triggers--scheduling-code-to-run-later)
11. [Exponential Backoff — Retrying When Things Fail](#11-exponential-backoff--retrying-when-things-fail)
12. [Git — What Committing and Pushing Actually Means](#12-git--what-committing-and-pushing-actually-means)

---

## 1. Variables

**What it is:** A named box that holds a value. You give it a name, put something in it, and use the name later instead of the value itself.

**Real example from your code:**
```javascript
var operationType = 'Create New Rows';
```
This creates a box named `operationType` and puts the text "Create New Rows" inside it. Later in the code, every time we write `operationType`, it means "Create New Rows".

**Why we use them:** So we don't have to repeat the same value everywhere. If we need to change it, we change it in one place.

**Quiz:**
> What does this code do?
> ```javascript
> var workspaceName = 'JAMIE';
> Logger.log(workspaceName);
> ```
> A) Creates a variable and prints "workspaceName"
> B) Creates a variable and prints "JAMIE"
> C) Creates a variable but doesn't do anything with it

<details>
<summary>Answer</summary>
<b>B.</b> The variable <code>workspaceName</code> holds the text "JAMIE". <code>Logger.log()</code> prints whatever you give it — and we gave it the variable, which contains "JAMIE".
</details>

**Exercise:**
Open the Apps Script editor. Create a new function:
```javascript
function myFirstVariable() {
  var myName = 'YOUR NAME HERE';
  Logger.log('Hello, ' + myName + '!');
}
```
Run it. Check the Execution Log. You should see "Hello, YOUR NAME HERE!" (with your actual name).

---

## 2. Arrays (Lists)

**What it is:** A list of things, in order. Like a column in your spreadsheet — item 1, item 2, item 3.

**Real example from your code:**
```javascript
WORKSPACES: ['JAMIE', 'CHARL', 'LARA', 'NAINTARA', 'KARL', 'MARIE']
```
This is an array of 6 workspace names. The square brackets `[ ]` mean "this is a list." Each item is separated by commas.

**How you access items:** Arrays are numbered starting from 0 (not 1 — this trips everyone up).
- `WORKSPACES[0]` → `'JAMIE'` (first item)
- `WORKSPACES[1]` → `'CHARL'` (second item)
- `WORKSPACES[5]` → `'MARIE'` (sixth item)

**Another example from your code:**
```javascript
RETRY_DELAYS_MS: [5000, 10000, 20000]
```
This is an array of 3 numbers — the wait times (in milliseconds) between retries. First retry waits 5 seconds, second waits 10, third waits 20.

**Getting the length:**
```javascript
BATCH_CONFIG.WORKSPACES.length  // → 6
```
`.length` tells you how many items are in the array.

**Quiz:**
> Given this array:
> ```javascript
> var colors = ['red', 'blue', 'green', 'yellow'];
> ```
> What is `colors[2]`?
>
> A) 'blue'
> B) 'green'
> C) 'yellow'

<details>
<summary>Answer</summary>
<b>B) 'green'.</b> Remember, arrays start counting at 0. So: [0] = red, [1] = blue, [2] = green, [3] = yellow.
</details>

**Exercise:**
```javascript
function playWithArrays() {
  var team = ['JAMIE', 'CHARL', 'LARA', 'NAINTARA', 'KARL', 'MARIE'];
  Logger.log('Team size: ' + team.length);
  Logger.log('First person: ' + team[0]);
  Logger.log('Last person: ' + team[team.length - 1]);
}
```
Run it. Why does `team[team.length - 1]` give you the last person? (Hint: if length is 6 and counting starts at 0, what's the index of the last item?)

---

## 3. Objects (Named Containers)

**What it is:** Like a labeled filing cabinet. Instead of accessing things by position number (like arrays), you access them by name.

**Real example from your code:**
```javascript
var BATCH_CONFIG = {
  MAX_RUNTIME_MS: 270000,
  OPERATION_DELAY_MS: 2000,
  FOLDER_DELAY_MS: 3000,
  WORKSPACE_DELAY_MS: 30000,
  WORKSPACES: ['JAMIE', 'CHARL', 'LARA', 'NAINTARA', 'KARL', 'MARIE']
};
```
The curly braces `{ }` mean "this is an object." Each line inside is a **key-value pair** — a name and its value.

**How you access items:**
```javascript
BATCH_CONFIG.MAX_RUNTIME_MS        // → 270000
BATCH_CONFIG.WORKSPACE_DELAY_MS    // → 30000
BATCH_CONFIG.WORKSPACES            // → the whole array of workspace names
BATCH_CONFIG.WORKSPACES[0]         // → 'JAMIE'
```
You use a dot (`.`) to say "look inside this object and find the thing called ___."

**Real example — state object:**
```javascript
var state = {
  workspaces: selectedWorkspaces,
  currentWorkspaceIndex: 0,
  phase: 'SCAN',
  stats: { processed: 0, duplicates: 0, errors: 0 }
};
```
This is how the batch processor remembers where it is. Notice `stats` is an object *inside* an object — you can nest them.

**Quiz:**
> Given:
> ```javascript
> var person = { name: 'Jamie', role: 'Owner', articles: 150 };
> ```
> What does `person.articles` return?
>
> A) 'articles'
> B) 150
> C) { articles: 150 }

<details>
<summary>Answer</summary>
<b>B) 150.</b> <code>person.articles</code> means "look inside the person object and find the value for the key called articles."
</details>

**Exercise:**
```javascript
function playWithObjects() {
  var config = {
    sheetName: 'My Test Sheet',
    startRow: 5,
    colors: ['red', 'blue', 'green']
  };
  Logger.log('Sheet: ' + config.sheetName);
  Logger.log('Start row: ' + config.startRow);
  Logger.log('First color: ' + config.colors[0]);
}
```
Run it. Then add a new key called `maxRows` with value `100`, and log it.

---

## 4. Functions

**What it is:** A reusable block of code with a name. Instead of writing the same steps over and over, you write them once inside a function and then "call" (run) that function whenever you need it.

**Real example from your code:**
```javascript
function hasTimeRemaining(startTime) {
  return (new Date().getTime() - startTime) < BATCH_CONFIG.MAX_RUNTIME_MS;
}
```
This function:
1. Is named `hasTimeRemaining`
2. Takes one input (called a **parameter**): `startTime`
3. Calculates whether we still have time left
4. **Returns** (gives back) `true` or `false`

**How it gets used:**
```javascript
if (hasTimeRemaining(startTime)) {
  // keep processing...
}
```
We "call" the function by writing its name with parentheses. The value inside the parentheses is the **argument** — the actual value we're passing in.

**Another example — a function that takes no inputs:**
```javascript
function batchCreateNewRows() {
  // ... all the code that runs when you click the menu item
}
```
When you click "Create New Rows" in the spreadsheet menu, Google Apps Script runs this function.

**Quiz:**
> What does `return` do in a function?
>
> A) Stops the function and throws away the result
> B) Stops the function and sends a value back to wherever called it
> C) Prints the value to the screen

<details>
<summary>Answer</summary>
<b>B.</b> <code>return</code> sends a value back. So when you write <code>var result = hasTimeRemaining(startTime)</code>, the function runs, and whatever comes after <code>return</code> gets put into the <code>result</code> variable.
</details>

**Exercise:**
```javascript
function add(a, b) {
  return a + b;
}

function testAdd() {
  var result = add(10, 25);
  Logger.log('10 + 25 = ' + result);
}
```
Run `testAdd`. Then write your own function called `multiply` that takes two numbers and returns their product. Test it.

---

## 5. getRange and getValues — Reading Spreadsheet Data

**What it is:** Two steps to read data from a Google Sheet:
1. `getRange()` = "Point at these cells" (highlight them)
2. `getValues()` = "Now read what's in those cells" (copy the data)

**Step by step with a real example:**
```javascript
var ss = SpreadsheetApp.getActiveSpreadsheet();
```
"Open the spreadsheet this script is attached to." Puts it in a variable called `ss`.

```javascript
var sheet = ss.getSheetByName('Uploader');
```
"Find the tab called 'Uploader'." Now `sheet` points to that specific tab.

```javascript
var range = sheet.getRange('A1:A50');
```
"Highlight cells A1 through A50." Nothing has been read yet — we've just pointed at them.

```javascript
var values = range.getValues();
```
"Now read everything in those highlighted cells." `values` is now an **array of arrays** (a list of rows, where each row is a list of cell values).

**What "array of arrays" means:**
If cells A1:A3 contain "Jamie", "Charl", "Lara", then `getValues()` returns:
```javascript
[
  ['Jamie'],    // Row 1
  ['Charl'],    // Row 2
  ['Lara']      // Row 3
]
```
To get "Charl": `values[1][0]` — row index 1, column index 0.

**Why two steps?** Because sometimes you want to point at cells to *write* to them, not read them. `getRange` is the pointing, `getValues`/`setValues` is the reading/writing.

**Shortcut — one line:**
```javascript
var values = sheet.getRange('A1:A50').getValues();
```
This chains both steps together. "Point at A1:A50 and immediately read them."

**Quiz:**
> You have a sheet with data in columns A through D, rows 1 through 100. You want to read just column B. Which is correct?
>
> A) `sheet.getValues('B1:B100')`
> B) `sheet.getRange('B1:B100').getValues()`
> C) `sheet.getRange('B1:B100')`

<details>
<summary>Answer</summary>
<b>B.</b> You need both steps: <code>getRange</code> to point at the cells, then <code>getValues</code> to actually read them. Option A doesn't exist (sheets don't have a direct getValues method). Option C only points at cells but never reads them.
</details>

**Exercise:**
Create a test sheet with some names in column A. Then:
```javascript
function readMySheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Sheet1');  // Change to your sheet name
  var values = sheet.getRange('A1:A10').getValues();
  Logger.log('All values: ' + JSON.stringify(values));
  Logger.log('First cell: ' + values[0][0]);
  Logger.log('Third cell: ' + values[2][0]);
}
```
Run it. Look at how the data comes back as an array of arrays.

---

## 6. Bulk Reads vs Cell-by-Cell — Why Speed Matters

**What it is:** The single biggest performance lesson from Session 4. Every time your code talks to Google Sheets, it's like making a phone call — it takes time to connect. You want to make as few calls as possible.

**The slow way (what we had before):**
```javascript
// BAD: 50 phone calls to Google
for (var i = 1; i <= 50; i++) {
  var value = sheet.getRange('A' + i).getValue();
  if (value === 'JAMIE') {
    // found it
  }
}
```
This reads one cell at a time. 50 cells = 50 separate requests to Google's servers. Each one takes ~0.3-0.5 seconds. Total: 15-25 seconds.

**The fast way (what we changed it to):**
```javascript
// GOOD: 1 phone call to Google
var allValues = sheet.getRange('A1:A50').getValues();
for (var i = 0; i < allValues.length; i++) {
  if (allValues[i][0] === 'JAMIE') {
    // found it
  }
}
```
This reads ALL 50 cells in one request (~0.5 seconds), then searches through the data in memory (basically instant).

**This is why Create New Rows went from 2:56 to 28 seconds.** The old code was making hundreds of individual calls to Google. The new code makes a handful of bulk reads and then works with the data locally.

**The rule:** Read everything you need at once. Search through it in code. Never read one cell at a time in a loop.

**Quiz:**
> Your code needs to check 200 cells in column A to find which ones say "Done". Which approach is faster?
>
> A) Loop through rows 1-200 and call `getValue()` on each cell
> B) Call `getRange('A1:A200').getValues()` once, then loop through the result array
> C) Both are the same speed

<details>
<summary>Answer</summary>
<b>B.</b> One bulk read + looping in memory is MUCH faster. Option A makes 200 separate calls to Google (could take 60-100 seconds). Option B makes 1 call (less than 1 second) then searches instantly.
</details>

**Exercise:**
Think about this (no coding needed): If you had a sheet with 1,000 rows and needed to find every row where column C says "Ready", how would you do it? Write out the steps in plain English before looking at the approach below.

<details>
<summary>Approach</summary>
1. Read all of column C in one call: <code>sheet.getRange('C1:C1000').getValues()</code><br>
2. Loop through the result array<br>
3. When you find "Ready", note the row number (index + 1, because arrays start at 0 but spreadsheet rows start at 1)
</details>

---

## 7. Loops (for)

**What it is:** A way to repeat the same action multiple times. "Do this thing for each item in the list."

**Real example from your code — the workspace picker:**
```javascript
for (var i = 0; i < BATCH_CONFIG.WORKSPACES.length; i++) {
  workspaceList += (i + 1) + '. ' + BATCH_CONFIG.WORKSPACES[i] + '\n';
}
```

Breaking this down piece by piece:
- `var i = 0` — Start counting at 0
- `i < BATCH_CONFIG.WORKSPACES.length` — Keep going while `i` is less than 6 (the number of workspaces)
- `i++` — After each loop, add 1 to `i`

So `i` goes: 0, 1, 2, 3, 4, 5 — then stops (because 6 is NOT less than 6).

Each time through the loop:
- When `i` is 0: adds "1. JAMIE\n" to the list
- When `i` is 1: adds "2. CHARL\n" to the list
- When `i` is 2: adds "3. LARA\n" to the list
- ...and so on

**Another example — processing workspaces:**
```javascript
for (var w = 0; w < selectedWorkspaces.length; w++) {
  var workspaceName = selectedWorkspaces[w];
  var articles = getArticlesForUploaderTransfer(statusSheet, workspaceName);
  byWorkspace[workspaceName] = articles;
  totalCount += articles.length;
}
```
"For each workspace the user selected, get its articles and count them up."

**Quiz:**
> How many times does this loop run?
> ```javascript
> for (var i = 0; i < 3; i++) {
>   Logger.log(i);
> }
> ```
> A) 2 times (prints 0, 1)
> B) 3 times (prints 0, 1, 2)
> C) 4 times (prints 0, 1, 2, 3)

<details>
<summary>Answer</summary>
<b>B) 3 times.</b> It starts at 0, and runs while i is less than 3. So: 0 (less than 3? yes), 1 (less than 3? yes), 2 (less than 3? yes), 3 (less than 3? NO — stop). Prints: 0, 1, 2.
</details>

**Exercise:**
```javascript
function loopExercise() {
  var fruits = ['apple', 'banana', 'cherry', 'date'];
  for (var i = 0; i < fruits.length; i++) {
    Logger.log('Fruit #' + (i + 1) + ': ' + fruits[i]);
  }
}
```
Run it. Then modify it to loop *backwards* (from the last fruit to the first). Hint: start `i` at `fruits.length - 1`, go while `i >= 0`, and do `i--` instead of `i++`.

---

## 8. if/else — Making Decisions

**What it is:** "If this is true, do this. Otherwise, do that." The code makes a choice.

**Real example from your code:**
```javascript
if (totalCount === 0) {
  SpreadsheetApp.getUi().alert('No articles found with "Not Available Yet" status.');
  unlockUploaderSheet(operationType);
  return;
}
```
"If there are zero articles to process, show an alert and stop."

**Another example — the workspace picker multi-select parser:**
```javascript
if (input === '0') {
  return BATCH_CONFIG.WORKSPACES.slice();  // All workspaces
}
```
"If the user typed '0', return all workspaces."

**Key symbols:**
- `===` means "is equal to" (checking, NOT assigning)
- `!==` means "is NOT equal to"
- `<` means "less than"
- `>` means "greater than"
- `=` (single) means "put this value in" (assigning) — totally different!

**Common gotcha:** `=` vs `===`
```javascript
var x = 5;      // Puts 5 into x (assignment)
if (x === 5) {  // Checks if x equals 5 (comparison) → true
```

**Quiz:**
> What does this code do?
> ```javascript
> var status = 'Row Created';
> if (status === 'Uploaded') {
>   Logger.log('Done!');
> } else {
>   Logger.log('Not yet.');
> }
> ```
> A) Prints "Done!"
> B) Prints "Not yet."
> C) Prints nothing

<details>
<summary>Answer</summary>
<b>B) "Not yet."</b> The status is "Row Created", which is NOT equal to "Uploaded", so the <code>else</code> branch runs.
</details>

**Exercise:**
```javascript
function gradeChecker() {
  var score = 75;

  if (score >= 90) {
    Logger.log('A');
  } else if (score >= 80) {
    Logger.log('B');
  } else if (score >= 70) {
    Logger.log('C');
  } else {
    Logger.log('F');
  }
}
```
Run it. What letter does it print? Change `score` to different values and predict the output before running.

---

## 9. State and PropertiesService — Remembering Things Between Runs

**What it is:** Google Apps Script has a 6-minute time limit. If your batch operation takes longer, the script stops. PropertiesService is like a sticky note — you write down where you left off, and when the script starts again, it reads the note and picks up from there.

**Real example from your code:**
```javascript
function saveBatchState(key, state) {
  var props = PropertiesService.getScriptProperties();
  var json = JSON.stringify(state);
  // ... saves to properties
}
```

**What's happening:**
1. `PropertiesService.getScriptProperties()` — Opens the sticky note pad (shared by all users of this script)
2. `JSON.stringify(state)` — Converts the state object into text (because the sticky note can only store text)
3. `props.setProperty(key, json)` — Writes it down

**When the script restarts:**
```javascript
function loadBatchState(key) {
  var props = PropertiesService.getScriptProperties();
  var json = props.getProperty(key);
  return JSON.parse(json);  // Convert text back into an object
}
```
"Read the sticky note. Convert the text back into a real object. Now we know where we left off."

**Why this matters:** This is how Create New Rows can process 200 articles even though each run is limited to 4.5 minutes. It processes as many as it can, writes down "I finished workspace 2, article 47", stops, and a trigger restarts it. It reads the note and continues from workspace 2, article 48.

**Quiz:**
> Why do we need `JSON.stringify()` before saving and `JSON.parse()` after loading?
>
> A) Because PropertiesService can only store text, not objects
> B) Because it makes the data smaller
> C) Because Google requires it

<details>
<summary>Answer</summary>
<b>A.</b> PropertiesService only stores text strings. An object like <code>{phase: 'SCAN', index: 5}</code> needs to be converted to text (<code>'{"phase":"SCAN","index":5}'</code>) for storage, then converted back when loaded.
</details>

**Exercise (conceptual):**
Imagine you're manually processing 100 articles and can only work for 10 minutes at a time. What would you write on a sticky note before taking a break, so you could pick up exactly where you left off? Write that down — that's essentially what the batch state object contains.

---

## 10. Triggers — Scheduling Code to Run Later

**What it is:** A trigger tells Google "run this function at this time" or "run this function when this event happens." Like setting an alarm on your phone.

**Real example from your code — batch continuation:**
```javascript
ScriptApp.newTrigger(functionName)
  .timeBased()
  .after(BATCH_CONFIG.CONTINUE_DELAY_MINUTES * 60 * 1000)
  .create();
```
"Create a new alarm. When 1 minute passes, run this function." This is how the batch processor auto-continues after hitting the time limit.

**Cleaning up triggers:**
```javascript
function cleanupBatchTrigger(functionName) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === functionName) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}
```
"Find all alarms for this function and delete them." You clean up after yourself so old triggers don't pile up.

**You also have triggers you didn't know about:** The `onEdit` trigger runs every time someone edits a cell. That's how the Uploader column L dropdown works — someone picks "Paste Article Sections" from a dropdown, the `onEdit` trigger fires, and it runs `pasteArticleSections`.

**Quiz:**
> Why does the batch processor create a trigger instead of just running a `while` loop for as long as it needs?
>
> A) Because loops are slower than triggers
> B) Because Google Apps Script kills any function that runs longer than 6 minutes
> C) Because triggers are easier to write

<details>
<summary>Answer</summary>
<b>B.</b> Google enforces a hard 6-minute limit on script execution. If your code runs for 6 minutes and 1 second, Google kills it — no warning, no saving, just stops. So we break work into chunks under 4.5 minutes, save our progress, set a trigger for 1 minute later, and the next chunk picks up where the last one stopped.
</details>

---

## 11. Exponential Backoff — Retrying When Things Fail

**What it is:** When something fails (like a Google API call), instead of immediately retrying, you wait a bit. If it fails again, you wait longer. Each wait is roughly double the last one. This gives the server time to recover.

**Real example from your code:**
```javascript
RETRY_DELAYS_MS: [5000, 10000, 20000]
```
- First failure: wait 5 seconds, try again
- Second failure: wait 10 seconds, try again
- Third failure: wait 20 seconds, try again
- Fourth failure: give up and report the error

**Why "exponential"?** Because the wait times grow exponentially (roughly doubling each time). 5 → 10 → 20. If we kept going: 40 → 80 → 160...

**Real-world analogy:** You call a restaurant and they're busy. You wait 5 minutes and call again — still busy. You wait 10 minutes — still busy. You wait 20 minutes — they answer. If you'd called every 30 seconds, you'd just be annoying them and they'd never pick up.

**The actual function:**
```javascript
function retryWithBackoff(fn) {
  var lastError;
  for (var attempt = 0; attempt <= BATCH_CONFIG.MAX_RETRIES; attempt++) {
    try {
      return fn();
    } catch (error) {
      lastError = error;
      if (attempt < BATCH_CONFIG.MAX_RETRIES) {
        var delay = BATCH_CONFIG.RETRY_DELAYS_MS[attempt] || 60000;
        Utilities.sleep(delay);
      }
    }
  }
  throw lastError;
}
```
Don't worry about understanding every line — the important concepts are:
- `try/catch` = "Try this. If it breaks, catch the error instead of crashing"
- `Utilities.sleep(delay)` = "Wait this many milliseconds before continuing"
- `throw lastError` = "We've tried enough times. Give up and report the error."

**Quiz:**
> If retry delays are [5000, 10000, 20000] and the operation fails all 4 attempts, how long total was spent waiting?
>
> A) 20 seconds
> B) 35 seconds
> C) 5 seconds

<details>
<summary>Answer</summary>
<b>B) 35 seconds.</b> 5 + 10 + 20 = 35 seconds of waiting. (The first attempt has no wait — you only wait after a failure. So: attempt 1 fails → wait 5s → attempt 2 fails → wait 10s → attempt 3 fails → wait 20s → attempt 4 fails → give up.)
</details>

---

## 12. Git — What Committing and Pushing Actually Means

**What it is:** Git is a system that tracks every change you make to your code. Think of it like "Track Changes" in Google Docs, but for your entire project.

You said you didn't understand what was happening when we were committing and pushing. Here's exactly what those steps mean:

### The basics

**Repository (repo):** Your project folder, tracked by Git. The WIYS-Refactoring_2026 folder on GitHub is a repository.

**Commit:** A snapshot. "Here's what the code looks like right now. Save this moment." Each commit has a message describing what changed, like: "Add batch Create New Rows function."

Think of commits like saving a game. You can always go back to any previous save.

**Push:** "Send my saved snapshots to GitHub." Your code lives in two places:
1. Locally (on the computer/Codespace where you're working)
2. On GitHub (the website, where others can see it)

When you commit, you save locally. When you push, you upload those saves to GitHub.

**Pull:** The opposite of push — "Download the latest code from GitHub to my local copy."

**Branch:** A separate copy of the code where you can make changes without affecting the main version. Like duplicating a Google Sheet tab to experiment on — if you mess up, the original tab is untouched.

- `main` = the "real" version everyone uses
- `claude/refactor-codebase-review-DHo8o` = our working branch where we make changes

### What was actually happening in our sessions

When we were working in Sessions 3-4, here's what each step meant:

1. **I wrote code** (edited main.gs)
2. **I committed** — saved a snapshot with a message ("Add workspace picker and batch framework")
3. **I pushed** — uploaded that snapshot to GitHub on our branch
4. **You approved** — you were clicking "allow" on each step, which is the permission system making sure I'm not doing something you don't want

The code on GitHub (on our branch) is separate from the code running in your Google Apps Script project. To get code FROM GitHub INTO your live Apps Script project, you'd use `clasp push`. We haven't done that yet — we were copying code manually in Sessions 3-4.

### Why this matters

Without Git:
- "Oops, I broke something" → You're stuck. No way to go back.
- "What did we change last week?" → You don't remember.

With Git:
- "Oops, I broke something" → Go back to the previous commit.
- "What did we change last week?" → Look at the commit history.

**Quiz:**
> You make changes to your code, commit them, but forget to push. What happens?
>
> A) The changes are lost
> B) The changes are saved locally but nobody on GitHub can see them
> C) GitHub automatically detects the changes

<details>
<summary>Answer</summary>
<b>B.</b> Commit saves locally. Push sends to GitHub. If you only commit, your changes are saved on your machine but GitHub still has the old version. Nothing is lost — you just need to push when you're ready.
</details>

---

## Honest Note From Session 3-4

During those sessions, we focused on **shipping working code** because your team needed the batch functions. That was the right call — but it meant you were watching code fly by without understanding it.

Here's what you'd ideally learn to do yourself over time:
- Read a `for` loop and predict what it does
- Understand what `getRange().getValues()` returns and how to work with it
- Know when to use a bulk read vs cell-by-cell
- Understand what the state object contains and why
- Know what "commit" and "push" mean when I ask to do them

None of this is urgent. The system works. But every concept on this list is something you'll encounter again in future sessions, and understanding them will make you a participant in the code changes instead of a spectator.

---

## What to Do Next

1. Read through each concept above at your own pace (not all at once)
2. Try the exercises on a test spreadsheet
3. When you get stuck, note down what confused you — bring it to our next session
4. Don't worry about memorizing. Understanding > memorization. If you can explain what `getValues()` does in your own words, you've got it.

# JavaScript Syntax — The Grammar Rules

Before you can understand what code *does*, you need to understand what the symbols *mean*. This is the grammar of JavaScript — the same way English has periods, commas, and capital letters, JavaScript has its own punctuation rules.

Every example below is from your WIYS codebase.

---

## Table of Contents

1. [Semicolons — The Period at the End of a Sentence](#1-semicolons)
2. [Parentheses () — Doing Things](#2-parentheses)
3. [Dots . — Going Inside Things](#3-dots)
4. [Chaining — Dots After Dots After Dots](#4-chaining)
5. [Quotes ' ' and " " — Text (Strings)](#5-quotes)
6. [Square Brackets [ ] — Lists and Lookups](#6-square-brackets)
7. [Curly Braces { } — Grouping Code and Making Objects](#7-curly-braces)
8. [Commas , — Separating Things in a List](#8-commas)
9. [var — Creating Variables](#9-var)
10. [= vs === — Putting In vs Checking](#10--vs-)
11. [+ With Text — Gluing Strings Together](#11--with-text)
12. [Comments — Notes to Yourself](#12-comments)
13. [Reading a Real Line of Code](#13-reading-a-real-line-of-code)

---

## 1. Semicolons

**Rule:** A semicolon `;` marks the end of a statement. It's like a period at the end of a sentence.

```javascript
var name = 'JAMIE';
Logger.log(name);
var count = 0;
```

Three statements, each ending with `;`. The computer reads them one at a time, top to bottom.

**Do you always need them?** Technically JavaScript can guess where statements end. But always use them — it prevents weird bugs and makes code easier to read.

**Quiz:**
> How many statements are in this code?
> ```javascript
> var x = 10;
> var y = 20;
> var z = x + y;
> Logger.log(z);
> ```
> A) 2
> B) 3
> C) 4

<details>
<summary>Answer</summary>
<b>C) 4 statements.</b> Count the semicolons. Each one is a complete instruction: create x, create y, create z, print z.
</details>

---

## 2. Parentheses

Parentheses `( )` mean **"do this action"** or **"here's the input."** They come after function names.

**Calling a function with no input:**
```javascript
unlockUploaderSheet()
```
"Run the function called `unlockUploaderSheet`. It doesn't need any input."

**Calling a function with input:**
```javascript
Logger.log('Hello')
```
"Run the `log` function. Give it the text 'Hello' as input."

**Calling a function with multiple inputs:**
```javascript
sheet.getRange('A1:A50')
```
"Run `getRange`. Give it 'A1:A50' as input — that's the cells to point at."

```javascript
props.setProperty('batchState', json)
```
"Run `setProperty`. Give it two inputs: the name 'batchState' and the data `json`."

**The rule:** When you see `someName()`, it means "run this function." Whatever is between the parentheses is what you're giving it to work with.

**No parentheses = not running it:**
```javascript
var fn = retryWithBackoff;  // Points to the function (doesn't run it)
var result = retryWithBackoff();  // Runs the function
```

**Quiz:**
> What's the difference between these two?
> ```javascript
> selectWorkspaces
> selectWorkspaces('Create New Rows')
> ```
> A) They do the same thing
> B) First one is the function name. Second one actually runs it with input.
> C) First one is an error

<details>
<summary>Answer</summary>
<b>B.</b> Without parentheses, you're just referring to the function (like pointing at a tool in a toolbox). With parentheses, you're actually using it (picking up the tool and doing something).
</details>

---

## 3. Dots

A dot `.` means **"go inside this thing and access something."** Think of it as opening a folder.

**Real example from your code:**
```javascript
SpreadsheetApp.getActiveSpreadsheet()
```
Reading left to right:
1. `SpreadsheetApp` — the Google Sheets toolkit
2. `.` — go inside it
3. `getActiveSpreadsheet()` — find and run the function called "getActiveSpreadsheet"

**Another example:**
```javascript
BATCH_CONFIG.WORKSPACES.length
```
1. `BATCH_CONFIG` — the config object
2. `.WORKSPACES` — go inside it, find the WORKSPACES array
3. `.length` — go inside that, find its length (how many items)

**One more:**
```javascript
response.getSelectedButton()
```
1. `response` — the variable holding the user's response
2. `.getSelectedButton()` — go inside it, run the function that tells us which button they clicked

**The pattern:** Dots are always "look inside this thing for something called ___."

**Quiz:**
> What does this do?
> ```javascript
> ui.ButtonSet.OK_CANCEL
> ```
> A) Creates a button
> B) Goes inside `ui`, then inside `ButtonSet`, then finds the value called `OK_CANCEL`
> C) Clicks the OK button

<details>
<summary>Answer</summary>
<b>B.</b> It's just accessing a value nested inside other things. <code>ui</code> contains <code>ButtonSet</code>, which contains <code>OK_CANCEL</code> (a preset button configuration that shows OK and Cancel buttons).
</details>

---

## 4. Chaining

When you see dots after dots after dots, that's called **chaining**. Each dot takes the result of the previous step and goes inside it.

**Real example from your code:**
```javascript
SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Uploader').getRange('A1:A50').getValues()
```

Step by step:
1. `SpreadsheetApp` — the toolkit
2. `.getActiveSpreadsheet()` — returns the spreadsheet → now we have a spreadsheet
3. `.getSheetByName('Uploader')` — returns the Uploader tab → now we have a sheet
4. `.getRange('A1:A50')` — returns cells A1:A50 → now we have a range
5. `.getValues()` — returns the data in those cells → now we have an array

Each step returns something, and the next dot goes inside whatever was returned.

**Same thing, written on separate lines (easier to read):**
```javascript
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('Uploader');
var range = sheet.getRange('A1:A50');
var values = range.getValues();
```
These do the exact same thing. The second version is easier to read because each step has its own line and a name.

**Another example — creating a trigger:**
```javascript
ScriptApp.newTrigger(functionName)
  .timeBased()
  .after(60000)
  .create();
```
1. `ScriptApp.newTrigger(functionName)` — start building a new trigger
2. `.timeBased()` — make it time-based (not event-based)
3. `.after(60000)` — set it to fire after 60,000 milliseconds (1 minute)
4. `.create()` — actually create it

This is called the **builder pattern** — each step configures one thing and returns the trigger-in-progress, so you can keep adding settings with more dots.

**Quiz:**
> This line:
> ```javascript
> sheet.getRange('B5').getValue()
> ```
> How many steps are happening?
> A) 1 — it reads cell B5
> B) 2 — first it points at B5, then it reads the value
> C) 3 — it gets the sheet, then the range, then the value

<details>
<summary>Answer</summary>
<b>B) 2 steps.</b> We already have <code>sheet</code> (that happened earlier). So: (1) <code>.getRange('B5')</code> points at cell B5. (2) <code>.getValue()</code> reads what's in it. Two steps chained together.
</details>

---

## 5. Quotes

Quotes mark **text** (programmers call text a "string" — think of it as a "string of characters").

**Single quotes and double quotes do the same thing:**
```javascript
var name = 'JAMIE';      // single quotes
var name = "JAMIE";      // double quotes — same result
```

**Your codebase mostly uses single quotes.** Pick one and be consistent.

**When you need quotes inside quotes, use the other kind:**
```javascript
var message = 'No articles found with "Not Available Yet" status.';
```
The outer quotes are single `' '`. The inner quotes are double `" "`. This way JavaScript knows which quotes are the boundaries and which are part of the text.

**Things that are NOT strings (no quotes):**
```javascript
var count = 42;        // number — no quotes
var isReady = true;    // boolean (true/false) — no quotes
var items = [1, 2, 3]; // array — no quotes on the numbers
```

**Things that ARE strings (need quotes):**
```javascript
var name = 'JAMIE';           // text
var sheetName = 'Uploader';   // text
var range = 'A1:A50';         // text (even though it looks like a cell reference, it's just text that getRange will interpret)
```

**Quiz:**
> What's wrong with this code?
> ```javascript
> var sheetName = Uploader;
> ```
> A) Nothing — it works fine
> B) It's missing quotes — JavaScript thinks `Uploader` is a variable name, not text
> C) It should use double quotes

<details>
<summary>Answer</summary>
<b>B.</b> Without quotes, JavaScript looks for a variable called <code>Uploader</code>. Since no such variable exists, it crashes. You need <code>'Uploader'</code> to tell JavaScript "this is text, not a variable name."
</details>

---

## 6. Square Brackets

Square brackets `[ ]` do two things:

### Creating a list (array):
```javascript
var workspaces = ['JAMIE', 'CHARL', 'LARA'];
```
"Make a list containing these three items."

### Accessing an item by position:
```javascript
workspaces[0]    // 'JAMIE'   (first item)
workspaces[2]    // 'LARA'    (third item)
```
"Give me item number ___ from this list." Remember: counting starts at 0.

### Accessing with a variable:
```javascript
var i = 1;
workspaces[i]    // 'CHARL'
```
"Give me the item at position `i`." Since `i` is 1, you get the second item.

**Real example from your code:**
```javascript
BATCH_CONFIG.RETRY_DELAYS_MS[attempt]
```
"Go into BATCH_CONFIG, find RETRY_DELAYS_MS (which is the array `[5000, 10000, 20000]`), and get the item at position `attempt`."

If `attempt` is 0: `5000`
If `attempt` is 1: `10000`
If `attempt` is 2: `20000`

**Quiz:**
> Given:
> ```javascript
> var letters = ['a', 'b', 'c', 'd'];
> var index = 3;
> ```
> What is `letters[index]`?
> A) 'c'
> B) 'd'
> C) Error

<details>
<summary>Answer</summary>
<b>B) 'd'.</b> index is 3. letters[3] is the fourth item (counting from 0): a=0, b=1, c=2, d=3.
</details>

---

## 7. Curly Braces

Curly braces `{ }` do two things:

### Grouping code together (code blocks):
```javascript
if (count === 0) {
  Logger.log('Nothing found');
  return;
}
```
The `{ }` group those two lines together — they both run as part of the `if` statement. Without them, only the first line would be part of the `if`.

```javascript
function doSomething() {
  // everything between { and } is the function body
  var x = 10;
  return x;
}
```

### Making objects (data containers):
```javascript
var config = {
  name: 'JAMIE',
  count: 42
};
```
The `{ }` create an object with named values. (Covered in the concepts doc.)

**How to tell the difference:** If `{ }` comes after `function`, `if`, `for`, or `else` — it's grouping code. If it's after `=` or inside `( )` — it's making an object.

---

## 8. Commas

Commas separate items in a list:

**In arrays:**
```javascript
['JAMIE', 'CHARL', 'LARA', 'NAINTARA', 'KARL', 'MARIE']
//       ^        ^        ^            ^        ^
// commas between each item
```

**In objects:**
```javascript
var config = {
  MAX_RUNTIME_MS: 270000,        // comma
  OPERATION_DELAY_MS: 2000,      // comma
  FOLDER_DELAY_MS: 3000          // NO comma on last item
};
```

**In function inputs:**
```javascript
props.setProperty('batchState', json)
//                             ^
// comma separates the two inputs
```

**The rule:** Commas go *between* things, not after the last one. (Though JavaScript is forgiving about trailing commas in modern versions.)

---

## 9. var

`var` means **"I'm creating a new variable."** It's a declaration — "hey JavaScript, I need a box to put something in."

```javascript
var name = 'JAMIE';
```
"Create a new box called `name`. Put 'JAMIE' in it."

You only use `var` when creating a variable for the first time. After that, just use the name:
```javascript
var count = 0;        // Create it (var needed)
count = count + 1;    // Update it (no var — it already exists)
count = count + 1;    // Update again (still no var)
```

**What happens if you use `var` twice with the same name?**
```javascript
var x = 10;
var x = 20;  // Overwrites the first one — no error, but confusing
```
It works but it's sloppy. Don't do it.

**Note:** Modern JavaScript uses `let` and `const` instead of `var`. Your codebase uses `var` because Google Apps Script was built on an older version of JavaScript. They all create variables — the differences are about scope (where the variable is visible), which you'll learn later.

---

## 10. = vs ===

This trips up EVERYONE, even experienced programmers sometimes.

**Single `=` means "put this value in":**
```javascript
var name = 'JAMIE';     // Put 'JAMIE' into name
count = count + 1;      // Put count+1 into count
```

**Triple `===` means "check if these are equal":**
```javascript
if (name === 'JAMIE') {   // Is name equal to 'JAMIE'? True or false?
if (count === 0) {         // Is count equal to 0? True or false?
```

**Double `==` also checks equality, but loosely** (it does weird type conversions). Your codebase sometimes uses `==` and sometimes `===`. The safe habit is always `===`.

**Common mistake:**
```javascript
// WRONG — this puts 'JAMIE' into name, doesn't check it
if (name = 'JAMIE') {

// RIGHT — this checks if name equals 'JAMIE'
if (name === 'JAMIE') {
```

**`!==` means "is NOT equal to":**
```javascript
if (response.getSelectedButton() !== ui.Button.OK) {
  return null;  // User didn't click OK
}
```

**Quiz:**
> What does this code do?
> ```javascript
> var status = 'pending';
> status = 'done';
> if (status === 'done') {
>   Logger.log('Finished!');
> }
> ```
> A) Prints "Finished!" because status was set to 'done'
> B) Prints nothing because status is 'pending'
> C) Error because you can't use = and === in the same code

<details>
<summary>Answer</summary>
<b>A.</b> Line 1 creates status as 'pending'. Line 2 CHANGES status to 'done' (single = is assignment). Line 3 CHECKS if status equals 'done' (=== is comparison) — it does, so it prints "Finished!"
</details>

---

## 11. + With Text

When `+` is between two strings (text), it **glues them together**. This is called "concatenation."

```javascript
'Hello, ' + 'Jamie'    // → 'Hello, Jamie'
```

**Real example from your code:**
```javascript
workspaceList += (i + 1) + '. ' + BATCH_CONFIG.WORKSPACES[i] + '\n';
```
Let's say `i` is 0:
- `(i + 1)` → `1` (number addition because both sides are numbers)
- `1 + '. '` → `'1. '` (gluing because one side is text)
- `'1. ' + BATCH_CONFIG.WORKSPACES[0]` → `'1. JAMIE'`
- `'1. JAMIE' + '\n'` → `'1. JAMIE\n'` (\n means "new line")

Result: `"1. JAMIE"` followed by a line break.

**`+=` means "add to what's already there":**
```javascript
var message = 'Hello';
message += ' world';    // message is now 'Hello world'
```
It's shorthand for `message = message + ' world'`.

**Real example:**
```javascript
var planMessage = 'CREATE NEW ROWS\n\n';
planMessage += 'Workspaces: ' + selectedWorkspaces.join(', ') + '\n';
planMessage += 'Total articles: ' + totalCount + '\n\n';
```
Each line adds more text to the growing message.

---

## 12. Comments

Comments are notes in the code that the computer ignores. They're for humans only.

**Single-line comment:**
```javascript
// This is a comment — computer ignores this line
var count = 0;  // You can also put comments at the end of a line
```

**Multi-line comment:**
```javascript
/**
 * Shows a workspace picker dialog. Supports:
 * - Single selection: "3" → LARA
 * - Multi-select: "135" → JAMIE, LARA, KARL
 * - All workspaces: "0"
 * Returns array of workspace name strings, or null if cancelled.
 */
function selectWorkspaces(operationTitle) {
```
Everything between `/**` and `*/` is a comment. This style is common for documenting what a function does.

---

## 13. Reading a Real Line of Code

Let's put it all together. Here's a real line from your codebase:

```javascript
var articles = getArticlesForUploaderTransfer(statusSheet, workspaceName);
```

Reading it left to right:
1. `var` — "I'm creating a new variable"
2. `articles` — "called articles"
3. `=` — "and putting in it..."
4. `getArticlesForUploaderTransfer` — "the result of running this function"
5. `(` — "with these inputs:"
6. `statusSheet` — "the status sheet (a variable we created earlier)"
7. `,` — "and also"
8. `workspaceName` — "the workspace name (another variable from earlier)"
9. `)` — "end of inputs"
10. `;` — "end of statement"

**In plain English:** "Create a variable called articles. Fill it with whatever comes back from the getArticlesForUploaderTransfer function, giving it the status sheet and workspace name to work with."

### Another one:

```javascript
if (selected.indexOf(name) === -1) {
  selected.push(name);
}
```

1. `if` — "check if the following is true"
2. `(` — "here's what to check:"
3. `selected.indexOf(name)` — "look in the `selected` array for `name`, return its position (or -1 if not found)"
4. `=== -1` — "is the result equal to -1?" (meaning: was it NOT found?)
5. `)` — "end of the check"
6. `{` — "if yes, do this:"
7. `selected.push(name)` — "add `name` to the end of the `selected` array"
8. `}` — "end of the if-block"

**In plain English:** "If this name isn't already in the selected list, add it." (This prevents duplicates in the workspace picker.)

### One more — the big one:

```javascript
SpreadsheetApp.getUi().alert('Create New Rows', planMessage, SpreadsheetApp.getUi().ButtonSet.YES_NO);
```

1. `SpreadsheetApp` — the Google Sheets toolkit
2. `.getUi()` — go inside, get the user interface tools
3. `.alert(` — show a popup dialog with these inputs:
4. `'Create New Rows'` — the title of the popup (text)
5. `,` — next input
6. `planMessage` — the message body (a variable containing the plan text)
7. `,` — next input
8. `SpreadsheetApp.getUi().ButtonSet.YES_NO` — show Yes and No buttons
9. `)` — end of inputs to alert
10. `;` — end of statement

**In plain English:** "Show a popup titled 'Create New Rows' with the plan message, and give the user Yes/No buttons."

---

## Practice Exercise — Read Real Code

Look at this code from your workspace picker. Read it line by line using what you've learned. Write down in your own words what each line does, THEN check the explanation:

```javascript
var response = ui.prompt(
  operationTitle,
  'Select workspaces:\n\n' + workspaceList,
  ui.ButtonSet.OK_CANCEL
);

if (response.getSelectedButton() !== ui.Button.OK) return null;

var input = response.getResponseText().trim();
```

<details>
<summary>Line-by-line explanation</summary>

<b>Line 1-4:</b> Show a text input popup. Title is whatever <code>operationTitle</code> contains. Message is "Select workspaces:" followed by the workspace list. Buttons are OK and Cancel. Save the user's response in a variable called <code>response</code>.

<b>Line 6:</b> Check if the button the user clicked is NOT the OK button (meaning they clicked Cancel). If so, <code>return null</code> — stop the function and give back "nothing."

<b>Line 8:</b> Get the text the user typed in the popup (<code>.getResponseText()</code>) and remove any extra spaces from the beginning and end (<code>.trim()</code>). Save it in a variable called <code>input</code>.
</details>

---

## Quick Reference Card

| Symbol | Name | Means | Example |
|--------|------|-------|---------|
| `;` | Semicolon | End of statement | `var x = 5;` |
| `( )` | Parentheses | Run a function / give inputs | `Logger.log('hi')` |
| `.` | Dot | Go inside / access | `sheet.getRange()` |
| `' '` or `" "` | Quotes | Text (string) | `'JAMIE'` |
| `[ ]` | Square brackets | Array / access by position | `team[0]` |
| `{ }` | Curly braces | Code block / object | `if (x) { ... }` |
| `,` | Comma | Separate items | `[1, 2, 3]` |
| `var` | var | Create a variable | `var name = 'Jamie';` |
| `=` | Equals | Put value in (assign) | `x = 10` |
| `===` | Triple equals | Check if equal (compare) | `if (x === 10)` |
| `!==` | Not equals | Check if NOT equal | `if (x !== 10)` |
| `+` | Plus | Add numbers / glue text | `'Hi ' + name` |
| `+=` | Plus-equals | Add to existing value | `count += 1` |
| `//` | Double slash | Comment (ignored by computer) | `// this is a note` |
| `\n` | Backslash-n | New line in text | `'line1\nline2'` |

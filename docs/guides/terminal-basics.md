# Terminal & Command Line: The Absolute Basics

If you've never used a terminal before, start here. This explains everything from scratch.

---

## What is a Terminal?

A terminal (also called "command line" or "console") is a text box where you type instructions for the computer. Instead of clicking buttons and icons, you type commands.

In your Codespace, the terminal is the dark panel at the bottom of the screen. There's a blinking cursor waiting for you to type something.

Think of it like texting the computer. You type a command, press Enter, and it texts you back with the result.

---

## Anatomy of a Command

Let's break down a real command:

```
npm install -g @google/clasp
```

Here's what each piece means:

| Piece | What it is | Plain English |
|-------|-----------|---------------|
| `npm` | The program you're running | "Hey npm, I need you to do something" |
| `install` | The action (also called a "subcommand") | "I want you to install something" |
| `-g` | A flag/option (the hyphen means it's a setting) | "Install it globally (available everywhere)" |
| `@google/clasp` | The argument (what you're acting on) | "The thing I want installed is called @google/clasp" |

So in plain English: "Hey npm, install the package called @google/clasp, and make it available everywhere on this computer."

---

## Why Hyphens?

Commands use hyphens to indicate **options** (also called "flags"). They modify how the command behaves.

### Single hyphen `-` = short version (one letter)
```
-g          means "global"
-m          means "message"
-u          means "update"
```

### Double hyphen `--` = long version (full word)
```
--global        same as -g
--message       same as -m
--no-localhost  (no short version exists for this one)
```

They do the same thing — the double hyphen version is just more readable. Some options only have a long version (like `--no-localhost`).

### Examples:
```
npm install -g @google/clasp
npm install --global @google/clasp
```
These two commands do exactly the same thing. `-g` is just shorthand for `--global`.

```
clasp login --no-localhost
```
This tells clasp: "log me in, but don't try to open a browser window on my computer" (because we're in the cloud, there is no local computer).

---

## Common Symbols You'll See

| Symbol | Name | What it means in terminal |
|--------|------|--------------------------|
| `$` | Dollar sign | Shows where you type. You do NOT type the $. If instructions say `$ npm install`, you just type `npm install` |
| `>` | Greater than | Same as $ — just shows the prompt. Don't type it |
| `~` | Tilde | Shortcut for "home folder" |
| `/` | Forward slash | Separates folders in a path, like `docs/guides/setup-guide.md` |
| `.` | Dot (period) | Current folder. `./file.txt` means "file.txt in the folder I'm in right now" |
| `..` | Double dot | Parent folder (one level up) |
| `*` | Asterisk | Wildcard. `*.js` means "all files ending in .js" |

---

## Essential Commands

These are the only commands you need right now. You'll learn more over time.

### Moving around

```
pwd
```
"Print Working Directory" — tells you where you are right now. Like checking your current location on a map.

```
ls
```
"List" — shows all files and folders where you currently are. Like opening a folder and seeing what's inside.

```
cd docs
```
"Change Directory" — moves you into the `docs` folder. Like double-clicking a folder.

```
cd ..
```
Move up one level (back to the parent folder).

### clasp commands (for our project)

```
clasp login --no-localhost
```
Connect clasp to your Google account. Only need to do this once per Codespace.

```
clasp push
```
Upload your code from the Codespace to Google Apps Script.

```
clasp pull
```
Download the current code from Google Apps Script to your Codespace.

### npm commands

```
npm install -g @google/clasp
```
Install clasp. Only need to do this once (the Codespace should do it automatically, but if it doesn't, run this).

### git commands (I usually handle these, but for reference)

```
git status
```
"What files have changed since my last save?"

```
git add filename.gs
```
"I want to include this file in my next save."

```
git commit -m "description of what I changed"
```
"Save a checkpoint with this description."

```
git push
```
"Upload my saves to GitHub."

---

## Tips

- **Press Tab** to auto-complete file names and commands. If you start typing `cla` and press Tab, it'll complete to `clasp`.
- **Press Up Arrow** to scroll through your previous commands. Saves retyping.
- **Press Ctrl+C** to cancel whatever is running. If something gets stuck, this is the panic button.
- **Commands are case-sensitive.** `clasp` works. `Clasp` does not.
- **Spaces matter.** `npm install` (with a space) is correct. `npminstall` (no space) won't work.
- **Copy/paste in terminal:** On most systems, use Ctrl+Shift+C to copy and Ctrl+Shift+V to paste (not Ctrl+C, which cancels things).

---

## When Something Goes Wrong

**"command not found"**
The program isn't installed, or you misspelled it. Check your spelling. If it's clasp, run `npm install -g @google/clasp`.

**"permission denied"**
The computer won't let you do that. Try adding `sudo` before the command (this is like "run as administrator"). Example: `sudo npm install -g @google/clasp`

**"No such file or directory"**
You're trying to access a file or folder that doesn't exist at that location. Run `pwd` to see where you are, and `ls` to see what's there.

**Screen full of scary red text**
Don't panic. Read the LAST line — that's usually the actual error. Everything above it is just the trail of what led to the error.

**Stuck / nothing is happening**
The command might still be running. Wait a moment. If it's truly stuck, press Ctrl+C to cancel.

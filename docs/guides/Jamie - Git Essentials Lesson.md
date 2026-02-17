# Git, GitHub & Codespaces — Complete Lesson

**Purpose:** Before we do any more work on the codebase, you need to understand and operate the tools that protect it. This isn't optional — it's the safety net under everything we've built.

**Goal:** After this lesson, you should be able to answer: **What** is each tool? **Why** does it exist? **How** does it work? **Where** does it fit in your workflow?

---

## Chapter 1: The Big Picture — What Are These Things?

There are three separate things that people often confuse. Let's untangle them.

### Git (the tool)
**What:** A program that runs on your computer (or in Codespaces) that tracks changes to files over time. It was created in 2005 by Linus Torvalds (the same person who created Linux).

**Why it exists:** Before Git, developers had problems:
- "Which version of this file is the latest?"
- "I broke something — how do I go back to yesterday's version?"
- "Two people edited the same file — whose changes do we keep?"

Git solves all three. It's a **time machine for your code.**

**Where it runs:** On your local machine. Git works entirely offline. You don't need internet to track changes, make commits, switch branches, or view history. It's a program installed in your environment.

**Key concept:** Git tracks a **repository** (often shortened to "repo"). A repository is just a folder that Git is watching. Our repository is the `WIYS-Refactoring_2026` folder.

### GitHub (the website)
**What:** A website (github.com) that stores a copy of your Git repository online. Think of it as Google Drive, but specifically designed for Git repositories.

**Why it exists:** Git works locally, but what if:
- Your computer dies? (You need a backup somewhere else.)
- Someone else needs to see the code? (They need access to a shared copy.)
- You want to review changes before they go live? (You need a place to discuss them.)

GitHub is that shared place. It's **not** Git itself — it's a service built on top of Git.

**Where it fits:** GitHub holds the **remote** copy. Your Codespace holds the **local** copy. Git is the tool that syncs between them.

**Your GitHub repo:** `github.com/JamieDR/WIYS-Refactoring_2026` — this is the "source of truth." If your Codespace explodes, everything is still safe on GitHub.

### GitHub Codespaces (the environment)
**What:** A virtual computer that GitHub runs for you in the cloud. When you open a Codespace, GitHub creates a Linux machine, clones your repository onto it, installs the tools defined in `.devcontainer/devcontainer.json`, and gives you a VS Code editor in your browser.

**Why it exists:** Setting up a development environment on your own computer is painful — you need to install Git, Node.js, Python, clasp, configure everything, deal with OS differences. Codespaces does all that setup automatically, every time, identically.

**Where it fits:** Your Codespace IS your local machine for development purposes. When you run Git commands in the Codespace terminal, you're running them on that virtual machine. When you edit files in the Codespace editor, you're editing files on that virtual machine.

**What happens when you open your Codespace:**
1. GitHub creates (or restarts) a virtual Linux machine
2. It clones your repository from GitHub onto it
3. It reads `.devcontainer/devcontainer.json` and installs tools (like clasp, Python, Node.js)
4. It opens VS Code in your browser, connected to that machine
5. You're ready to work

**What happens when you close/stop your Codespace:**
- The virtual machine pauses (like putting a computer to sleep)
- Your files are preserved — they're still there when you restart
- But if you DELETE the Codespace (different from stopping), the local files are gone
- That's fine as long as you pushed your changes to GitHub first

### How They Connect — The Flow

```
Your Codespace (local)          GitHub (remote)
┌─────────────────────┐         ┌─────────────────────┐
│                     │         │                     │
│  You edit files     │         │  Backup copy lives  │
│  Git tracks changes │  push → │  here on GitHub     │
│  You make commits   │ ← pull  │  PRs happen here    │
│                     │         │  Others can see it  │
│  clasp push →→→→→→→→│→→→→→→→→→│→→→ Google Apps Script│
│                     │         │                     │
└─────────────────────┘         └─────────────────────┘
        Git syncs between local and remote
        clasp syncs between local and Google Apps Script
```

**Two separate sync systems:**
- **Git** moves code between your Codespace and GitHub
- **clasp** moves code between your Codespace and Google Apps Script

They don't know about each other. You run them separately.

---

## Chapter 2: Why Git Matters for This Project

### The Production Problem
Your WIYS system is used by 6 people every day. The code is 16,400+ lines. We're refactoring it — changing internal structure without changing what it does. That's like renovating a restaurant while it's open for business.

Without Git:
- You make a change. It breaks something. How do you undo it? (You can't reliably.)
- I make a change in Session 7. In Session 9 something is wrong. When did it break? (No way to trace.)
- You want to try an experimental approach. What if it fails? (You've lost the working version.)

With Git:
- Every change is recorded with who made it, when, and why (commit message)
- You can go back to any previous state instantly
- Branches let you try experiments without risking the working code
- If something breaks in production, you can trace exactly which commit introduced the problem

### The Safety Net Analogy
Git is like a safety net under a trapeze. You don't think about it when things are going well. But when you fall — when code breaks, when a refactoring goes wrong, when you accidentally delete something — it catches you. The cost of NOT having it is catastrophic. The cost of having it is learning a few commands.

Right now, **I** operate your safety net. That's a problem. You should be able to:
- Verify what I committed (trust but verify)
- Roll back changes yourself if something breaks between sessions
- Understand what happened in the project history without asking me

---

## Chapter 3: Core Concepts (The Mental Model)

Before learning commands, you need the mental model. Commands are just buttons — understanding is what matters.

### Concept 1: The Three States of a File

Every file in a Git repository is in one of three states:

```
 ┌──────────────┐     git add     ┌──────────────┐    git commit    ┌──────────────┐
 │   Modified   │ ──────────────→ │    Staged     │ ──────────────→ │  Committed   │
 │  (unstaged)  │                 │  (in outbox)  │                 │   (saved)    │
 └──────────────┘                 └──────────────┘                  └──────────────┘
       ↑                                                                   │
       └───────────────── you edit the file again ─────────────────────────┘
```

- **Modified (unstaged):** You changed the file, but Git hasn't been told to include it in the next save point yet. It's on your desk.
- **Staged:** You told Git "include this file in my next save point." It's in your outbox, waiting to be sent.
- **Committed:** The save point is created. The changes are permanently recorded in history. It's in the filing cabinet.

**Why the middle step?** Why can't you just save directly? Because sometimes you change 5 files but only want to save 3 of them right now. Staging lets you pick exactly which changes go into each commit. It's quality control.

### Concept 2: Commits (Save Points)

A commit is a snapshot of your entire project at one moment in time. Every commit has:
- A **hash** (unique ID) — like `a3f7b2c`. No two commits in history will ever have the same hash.
- An **author** — who made it
- A **timestamp** — when
- A **message** — why (this is what YOU write)
- A **parent** — which commit came before it

Commits form a chain. Each one points back to the one before it:

```
commit 1 ← commit 2 ← commit 3 ← commit 4 (latest)
```

You can go back to any commit in this chain. That's your time machine.

### Concept 3: Branches (Parallel Timelines)

A branch is a parallel timeline. When you create a branch, you're saying "I want to try something, but I don't want to risk the main timeline."

```
main:     commit 1 ← commit 2 ← commit 3
                                    ↑
my-branch:                     ← commit A ← commit B
```

- `main` keeps going as it was
- `my-branch` splits off and has its own commits
- If `my-branch` works out, you **merge** it back into `main`
- If it doesn't, you delete the branch and `main` is untouched

**For this project:**
- `main` is the production-ready code
- Feature/fix branches (like `claude/fix-tag-caching-...`) are where we make changes
- We merge into `main` only after reviewing (via Pull Requests on GitHub)

### Concept 4: Remote vs. Local

Your repository exists in two places:
- **Local** (your Codespace) — where you edit, stage, commit
- **Remote** (GitHub) — the backup/shared copy

They are **not** automatically in sync. You manually sync them:
- `git push` → sends your local commits to GitHub
- `git pull` → downloads commits from GitHub to your local copy

**Why manual?** Because automatic syncing would mean half-finished work gets uploaded instantly. You want to control when things go to GitHub.

### Concept 5: Pull Requests (Code Review)

A Pull Request (PR) is a GitHub feature (not a Git feature). It says: "I have a branch with changes. I'd like to merge it into main. Please review it first."

PRs let you:
- See exactly what changed (diff view)
- Discuss changes before they go live
- Approve or request modifications
- Keep a record of why changes were made

**Our workflow:**
1. Create a branch
2. Make commits on that branch
3. Push the branch to GitHub
4. Open a Pull Request on GitHub
5. Review the changes
6. Merge into main (or reject)

---

## Chapter 4: The Commands (Hands-On)

Now that you have the mental model, here are the commands. Each one maps to a concept you already understand.

### 4.1 — Checking Status: "What's going on right now?"

#### `git status`
The command you'll use most. Run it constantly. Run it before and after everything.

```bash
git status
```

**Output tells you:**
- Line 1: Which branch you're on
- Green text: Files that are **staged** (in the outbox, ready to commit)
- Red text: Files that are **modified but unstaged** OR **untracked** (new files Git doesn't know about)
- "nothing to commit, working tree clean" = everything is committed, nothing has changed

**When to run it:** Before every operation. After every operation. When in doubt. There's no cost to running it — it just reads the current state.

#### `git branch`
Lists your local branches. The `*` marks the one you're on.

```bash
git branch
```

#### `git branch -a`
Lists all branches — local AND remote (ones that exist on GitHub).

```bash
git branch -a
```

Remote branches show up as `remotes/origin/branch-name`.

### 4.2 — Viewing Changes: "What did I change?"

#### `git diff`
Shows line-by-line changes in **unstaged** files.

```bash
git diff
```

**Reading the output:**
```
diff --git a/src/Code.gs b/src/Code.gs     ← which file
index abc123..def456 100644                  ← (you can ignore this line)
--- a/src/Code.gs                            ← the "before" version
+++ b/src/Code.gs                            ← the "after" version
@@ -150,7 +150,8 @@                          ← location: line 150, showing 7→8 lines
   unchanged line                             ← context (no + or -)
-  old line that was removed                  ← REMOVED (red)
+  new line that replaced it                  ← ADDED (green)
+  another new line                           ← ADDED (green)
   unchanged line                             ← context
```

**The pager:** If the diff is long, it opens in a scrollable viewer.
- `q` = quit (exit back to terminal)
- `space` = scroll down one page
- `b` = scroll up one page
- `↑` / `↓` = scroll one line at a time

#### `git diff --staged`
Same format, but shows changes in **staged** files (what's about to be committed).

```bash
git diff --staged
```

**Decision guide:**
- "What have I changed but not staged?" → `git diff`
- "What am I about to commit?" → `git diff --staged`

### 4.3 — Viewing History: "What happened before?"

#### `git log --oneline -5`
The one you'll use most. Shows the last 5 commits, one line each.

```bash
git log --oneline -5
```

Output:
```
e492747 Add Git lesson materials and update clasp status
df6d7ef Merge pull request #11 from JamieDR/claude/resume-session-Xuq9x
ab83c82 Add Session 8 developer log
c102bab Merge pull request #10
8f3a2d1 Fix tag caching bug
```

The 7-character code is the **short hash** (abbreviated commit ID). The text is the **commit message**.

#### `git log`
Full-detail version. Shows hash, author, date, and message for each commit.

```bash
git log
```

Same pager rules — `q` to quit.

#### `git log --oneline --graph`
Shows the branch structure visually.

```bash
git log --oneline --graph -15
```

You'll see lines like `*`, `|`, `/`, `\` that show where branches split and merge.

### 4.4 — The Commit Workflow: "Save my work"

This is always three steps, in this order. No exceptions.

#### Step 1: Stage — `git add`

```bash
git add src/Code.gs                          # stage one file
git add src/Code.gs docs/some-doc.md         # stage multiple files
```

**Rule: Always name specific files.** Never use `git add .` or `git add -A`. Those stage everything, including files you might not want (like `.env` files with API keys, or large files you didn't mean to track).

#### Step 2: Verify — `git status`

```bash
git status
```

Check the green (staged) section. Is that exactly what you intend to commit? If you staged something by mistake:

```bash
git restore --staged filename    # unstage it (the file's changes are kept, just removed from the outbox)
```

#### Step 3: Commit — `git commit`

```bash
git commit -m "Fix tag caching bug that created duplicate WordPress tags"
```

The `-m` flag means "message follows." The message goes in quotes.

**Commit message rules:**
- Start with a verb: Fix, Add, Remove, Update, Refactor
- Say WHAT changed AND WHY
- Keep the first line under ~72 characters
- Good: "Fix tag caching bug that created duplicate WordPress tags"
- Good: "Remove dead function purgeTagCacheFromScriptProperties"
- Bad: "update" / "fix" / "changes" / "stuff"

### 4.5 — Syncing with GitHub: "Send/receive"

#### `git push` — Send your commits to GitHub

```bash
git push                              # if tracking is already set up
git push -u origin branch-name        # first push of a new branch (sets up tracking)
```

**What `-u origin branch-name` means:**
- `-u` = set up tracking (so future pushes just need `git push`)
- `origin` = the name for "GitHub" (it's the default remote name)
- `branch-name` = which branch to push

**When to push:**
- When you've finished a logical unit of work
- Before ending a session (so your work is backed up on GitHub)
- Before opening a Pull Request

#### `git pull` — Get the latest from GitHub

```bash
git pull                             # pull current branch
git pull origin main                 # pull a specific branch
```

**When to pull:**
- Start of every session
- Before creating a new branch (so you branch from the latest code)
- When someone else has made changes on GitHub

### 4.6 — Branch Operations: "Work in parallel"

#### See branches
```bash
git branch                # local branches
git branch -a             # local + remote
```

#### Switch to an existing branch
```bash
git checkout branch-name
```

**Important:** If you have uncommitted changes when you try to switch, Git will warn you. Either commit them first or stash them (we'll cover stashing later — for now, just commit first).

#### Create a new branch and switch to it
```bash
git checkout -b my-new-branch
```

**Critical sequence for creating a branch:**
```bash
git checkout main                  # 1. Go to main
git pull                           # 2. Get the latest
git checkout -b my-new-branch      # 3. Create branch from updated main
```

**Why this order?** If you skip step 2, your branch is based on outdated code. If you skip step 1, your branch is based on whatever branch you were on — which might not be `main`.

#### Delete a branch (when done with it)
```bash
git branch -d branch-name          # safe delete (only if fully merged)
```

---

## Chapter 5: .gitignore — What Git Should NOT Track

Not every file in your project folder should be tracked by Git. The `.gitignore` file tells Git which files and folders to ignore completely.

**Why this matters:**
- API keys and credentials should NEVER be in Git (anyone with access to the repo could see them)
- Large files (images, videos, data dumps) bloat the repository
- Temporary/generated files (like `node_modules/`) are recreated by tools and don't need version control

**How it works:** You list patterns in `.gitignore`, one per line:
```
.env                    # ignore this specific file
*.log                   # ignore all files ending in .log
node_modules/           # ignore this entire folder
```

Git will pretend these files don't exist. They won't show up in `git status`, won't be staged by `git add`, and won't be committed.

**Our `.gitignore` already handles this** — but you should know it exists and what it does.

---

## Chapter 6: How clasp Fits In

You already know clasp from using it. Here's how it relates to Git:

**clasp** pushes/pulls code between your Codespace and Google Apps Script. **Git** pushes/pulls code between your Codespace and GitHub. They are completely independent systems.

```
Google Apps Script  ←──clasp push/pull──→  Codespace  ←──git push/pull──→  GitHub
    (live system)                        (your workspace)                  (backup/review)
```

**The workflow in practice:**
1. Edit code in Codespace
2. Test with `clasp push` → Google Apps Script
3. Once it works: `git add` → `git commit` → `git push` to GitHub
4. Open a PR on GitHub for review

**Important:** `clasp push` does NOT commit to Git. `git push` does NOT push to Google Apps Script. They are separate actions.

---

## Chapter 7: GitHub-Specific Features

These are features of the GitHub **website**, not Git commands.

### Pull Requests (PRs)
- Created on GitHub, not from the terminal (though you can use `gh pr create` if you have the GitHub CLI)
- Show the diff between a branch and main
- Allow discussion and review before merging
- This is where Jamie approves changes before they go into production

### Issues
- Bug reports, feature requests, and tasks
- Can be referenced in commit messages: "Fix #42" will automatically close issue #42 when merged

### The Repository Page
- Shows your files, branches, commits, PRs, and issues all in one place
- The "Code" tab shows the files on the currently selected branch
- The "Commits" tab shows the same thing as `git log` but in a web interface

---

## Chapter 8: Common Situations and What to Do

### "I want to see what Claude committed last session"
```bash
git log --oneline -10
```
Read the messages. If you want more detail on a specific commit:
```bash
git show abc1234        # replace with the actual short hash
```

### "I want to undo the last commit (haven't pushed yet)"
```bash
git reset --soft HEAD~1
```
This moves the commit back to "staged" state. Your changes are still there, just not committed. You can re-commit with a different message, or unstage and modify.

**Never do this after pushing** — it rewrites history that's already on GitHub.

### "I edited a file and want to undo the edit (haven't staged)"
```bash
git restore filename
```
**Warning:** This throws away your changes permanently. Only do this if you're sure you don't want the edits.

### "I staged a file by accident"
```bash
git restore --staged filename
```
This unstages it (puts it back to "modified"). Your edits are still in the file.

### "I'm not sure which branch I should be on"
```bash
git branch          # see where you are
git checkout main   # go to main if you're unsure
```

### "I want to see what's different between my branch and main"
```bash
git diff main
```
Shows everything that's different between your current branch and main.

---

## Quick Reference Card

| What you want to do | Command |
|---|---|
| What's going on? | `git status` |
| What branch am I on? | `git branch` |
| What changed (not staged)? | `git diff` |
| What's about to be committed? | `git diff --staged` |
| Recent history (compact) | `git log --oneline -5` |
| Full history | `git log` |
| Stage a file | `git add filename` |
| Unstage a file | `git restore --staged filename` |
| Undo edits to a file | `git restore filename` |
| Commit | `git commit -m "message"` |
| Push to GitHub | `git push` |
| Push new branch to GitHub | `git push -u origin branch-name` |
| Pull from GitHub | `git pull` |
| Switch branch | `git checkout branch-name` |
| Create + switch to new branch | `git checkout -b branch-name` |
| See a specific commit's changes | `git show abc1234` |
| Compare branch to main | `git diff main` |

---

## Session 9 Walkthrough Plan

When you start next session, here's exactly what we'll do:

1. **Run `git status`** — read the output, tell me what each section means
2. **Run `git log --oneline -5`** — identify the last few commits, who made them
3. **Run `git branch`** — tell me which branch you're on
4. **Run `git branch -a`** — identify remote branches
5. **Make a small test edit** to a file
6. **Run `git status`** — describe how the output changed
7. **Run `git diff`** — read the diff, identify the added/removed lines
8. **Stage the file with `git add`**
9. **Run `git status`** — explain the difference from step 6
10. **Run `git diff --staged`** — confirm you see the staged changes
11. **Commit with `git commit -m "..."`** — write your own message
12. **Run `git log --oneline -3`** — verify your commit is at the top
13. **Push with `git push`**
14. **Check GitHub** — go to the repo page and see your commit there

After the walkthrough, you take the exam. No help from me — you either know it or you look it up in this guide. That's the whole point.

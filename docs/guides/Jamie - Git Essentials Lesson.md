# Git Essentials — Lesson & Walkthrough

**Purpose:** Before we do any more work on the codebase, you need to be able to operate Git yourself. This isn't optional — it's the safety net that protects everything we've built.

**What you'll learn:** How to check what's happening, understand what changed, and verify what was committed. These are the "reading" skills of Git. You already understand the concept (version control = save points). Now you need the hands.

---

## Part 1: Where Am I?

### `git status`
This is the command you'll use most. It answers: **"What's going on right now?"**

```bash
git status
```

What it tells you:
- **Which branch you're on** (top line)
- **Staged changes** (green text) — these are queued up and ready to be committed
- **Unstaged changes** (red text) — these are modified but NOT queued yet
- **Untracked files** (red text) — brand new files Git doesn't know about yet

**Plain English:** Think of it like checking your desk. Staged = in the "outbox" ready to send. Unstaged = on your desk but not in the outbox. Untracked = someone dropped a new paper on your desk that you haven't filed yet.

### `git branch`
Tells you what branch you're on and lists other local branches.

```bash
git branch
```

The one with the `*` next to it is your current branch.

---

## Part 2: What Changed?

### `git diff`
Shows you exactly what lines changed in unstaged files.

```bash
git diff
```

Reading the output:
- Lines starting with `-` (red) = **removed**
- Lines starting with `+` (green) = **added**
- The `@@` lines tell you which part of the file you're looking at

**Tip:** If the output is long, it opens in a "pager" (like a scrollable viewer). Press `q` to exit. Press `space` to scroll down. Press `b` to scroll up.

### `git diff --staged`
Same thing, but shows what's already staged (in the outbox).

```bash
git diff --staged
```

**When to use which:**
- `git diff` → "What did I change that I haven't staged yet?"
- `git diff --staged` → "What's about to go into my next commit?"

---

## Part 3: What Happened Before?

### `git log`
Shows the history of commits (save points).

```bash
git log
```

Each entry shows:
- **commit hash** — a long string like `a3f7b2c...` (the unique ID of that save point)
- **Author** — who made the commit
- **Date** — when
- **Message** — what they said the change was about

**Tip:** Same pager rules — `q` to quit, `space` to scroll.

### `git log --oneline`
Compact version — just the short hash and message, one line each.

```bash
git log --oneline
```

This is the one you'll use most for a quick "what happened recently?" check.

### `git log --oneline -5`
Show only the last 5 commits.

```bash
git log --oneline -5
```

---

## Part 4: The Commit Workflow

This is the sequence for saving your work. Three steps, always in this order:

### Step 1: Stage files — `git add`
Queue specific files for the next commit.

```bash
git add filename.md
```

Or stage multiple specific files:
```bash
git add file1.md file2.gs
```

**Important:** We do NOT use `git add .` or `git add -A` (which stages everything). Always name specific files. This prevents accidentally committing sensitive files like API keys.

### Step 2: Verify what's staged — `git status`
Always check before committing.

```bash
git status
```

Look at the green (staged) section. Is that what you intended? If something is staged that shouldn't be, unstage it:

```bash
git restore --staged filename.md
```

### Step 3: Commit — `git commit -m "message"`
Create the save point.

```bash
git commit -m "Short description of what you changed and why"
```

Good commit messages:
- "Fix tag caching bug that created duplicate WordPress tags"
- "Add MSN compliance rules to sentence splitter"
- "Remove dead function purgeTagCacheFromScriptProperties"

Bad commit messages:
- "update" (update what?)
- "fix" (fix what?)
- "changes" (what changes?)

---

## Part 5: Pushing and Pulling

### `git push`
Send your commits to GitHub (the remote copy).

```bash
git push
```

If the branch is new and hasn't been pushed before:
```bash
git push -u origin branch-name
```

The `-u` sets up tracking so future pushes just need `git push`.

### `git pull`
Get the latest changes from GitHub.

```bash
git pull
```

**When to use:** Start of every session, pull first. This makes sure you have the latest code before making changes.

---

## Part 6: Understanding Branches

You already know branches conceptually (separate workstreams). Here's the mechanical side:

### See all branches
```bash
git branch          # local branches only
git branch -a       # local + remote branches
```

### Switch to an existing branch
```bash
git checkout branch-name
```

### Create a new branch and switch to it
```bash
git checkout -b new-branch-name
```

**Important:** Always create new branches FROM `main`. So the sequence is:
```bash
git checkout main        # go to main first
git pull                 # get latest
git checkout -b my-new-branch   # create branch from main
```

---

## Quick Reference Card

| What you want to know | Command |
|---|---|
| What's going on? | `git status` |
| What branch am I on? | `git branch` |
| What changed (unstaged)? | `git diff` |
| What's about to be committed? | `git diff --staged` |
| Recent history? | `git log --oneline -5` |
| Stage a file | `git add filename` |
| Unstage a file | `git restore --staged filename` |
| Commit | `git commit -m "message"` |
| Push to GitHub | `git push` |
| Pull from GitHub | `git pull` |
| Switch branch | `git checkout branch-name` |
| Create new branch | `git checkout -b name` |

---

## Session 9 Walkthrough Plan

When you start next session, here's what we'll do together:

1. **Run `git status`** — read the output out loud, tell me what it means
2. **Run `git log --oneline -5`** — identify the last few things that were committed
3. **Run `git branch`** — tell me which branch you're on
4. **Make a small test change** — edit a file (like adding a comment)
5. **Run `git status` again** — see how it changed
6. **Run `git diff`** — read the diff output, identify what was added/removed
7. **Stage the change with `git add`**
8. **Run `git status` again** — see the file move from red to green
9. **Commit with `git commit -m "..."`**
10. **Run `git log --oneline -3`** — verify your commit appears at the top
11. **Push with `git push`**

After the walkthrough, you'll take the practice test (separate document). No help from me on that — you either know it or you look it up in this guide.

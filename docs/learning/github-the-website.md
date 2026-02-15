# GitHub — The Website, From Zero

Git is the tool that tracks your code changes (you learned that in the terminal doc). **GitHub** is the website where your code lives online. Git is the engine. GitHub is the garage where you park the car.

This doc teaches you GitHub the way you'd learn any new app — screen by screen, button by button.

---

## Table of Contents

1. [What Is GitHub?](#1-what-is-github)
2. [Your Repository — The Home Page](#2-your-repository--the-home-page)
3. [Files and Folders — Browsing Your Code](#3-files-and-folders--browsing-your-code)
4. [Commits — The History of Every Change](#4-commits--the-history-of-every-change)
5. [Branches — Parallel Versions](#5-branches--parallel-versions)
6. [Pull Requests — Asking to Merge](#6-pull-requests--asking-to-merge)
7. [Issues — A To-Do List for Your Project](#7-issues--a-to-do-list-for-your-project)
8. [GitHub vs Google Drive — What's Different](#8-github-vs-google-drive--whats-different)
9. [The Buttons You'll Actually Use](#9-the-buttons-youll-actually-use)
10. [Quiz Set](#10-quiz-set)

---

## 1. What Is GitHub?

**GitHub is a website for storing and managing code.** That's it. It's like Google Drive, but specifically designed for code projects. Over 100 million developers use it.

**Why not just use Google Drive?**
- Google Drive doesn't track changes line by line
- Google Drive doesn't let you work on a copy and merge it back
- Google Drive doesn't have pull requests, code review, or branch management
- Google Drive is for documents. GitHub is for code.

**Your GitHub account:** `JamieDR` — this is your username on GitHub.

**Your repository:** `JamieDR/WIYS-Refactoring_2026` — this is your project. "Repository" (or "repo") just means "project folder on GitHub."

---

## 2. Your Repository — The Home Page

When you go to your repo on GitHub, you see a page with several sections. Here's what each part is:

### The Top Bar
```
JamieDR / WIYS-Refactoring_2026
```
This is your username / your project name. Like "Jamie's folder called WIYS-Refactoring_2026."

### The Tab Row
```
< > Code    Issues    Pull requests    Actions    ...
```
These are tabs, like tabs in a browser or tabs at the top of a spreadsheet:

| Tab | What it shows |
|-----|--------------|
| **Code** | Your files and folders (the default view) |
| **Issues** | A to-do list / bug tracker for the project |
| **Pull requests** | Proposed changes waiting to be reviewed and merged |
| **Actions** | Automated tasks (we're not using this yet) |

### The Branch Dropdown
```
🔽 main
```
This dropdown shows which branch you're looking at. By default it shows `main` — the real, official version. You can switch to see other branches.

### The File List
Below the branch dropdown, you see your files and folders — just like the file explorer on your computer. You can click into folders, click on files to read them.

### README / CLAUDE.md
At the bottom of the page, GitHub automatically displays the contents of certain files (like README.md or, in our case, CLAUDE.md) so visitors can read about the project without opening any files.

---

## 3. Files and Folders — Browsing Your Code

Clicking on a folder shows you what's inside. Clicking on a file shows you its contents with syntax highlighting (code is color-coded to be easier to read).

**When you're looking at a file, you see:**
- The file name at the top
- Line numbers on the left side
- The file contents in the middle
- A "Raw" button (shows the plain text without formatting)
- A "Blame" button (shows who wrote each line and when — useful name, terrible feature name)
- A history icon (shows all commits that changed this file)

**You can edit files directly on GitHub** by clicking the pencil icon. But we generally don't do this — we edit in the Codespace and push, so everything goes through Git properly.

---

## 4. Commits — The History of Every Change

Remember from the Git doc: a commit is a saved snapshot. On GitHub, you can see every snapshot ever made.

**To see commits:** Click the clock icon with a number next to it (like "47 commits") near the top of the Code tab.

**Each commit shows:**
- The message (what the person said they changed)
- Who made it
- When
- A unique ID (like `84902cc`)

**Clicking on a commit** shows you exactly what changed — lines added (green), lines removed (red). This is called a "diff" (short for "difference").

Example of what a diff looks like:
```diff
- var WORKSPACES = ['JAMIE', 'CHARL', 'LARA', 'SHAYNE'];
+ var WORKSPACES = ['JAMIE', 'CHARL', 'LARA', 'NAINTARA', 'KARL', 'MARIE'];
```
The red line (with `-`) was removed. The green line (with `+`) replaced it. This tells you: "SHAYNE was removed and NAINTARA, KARL, MARIE were added."

**Quiz:**
> You see a commit message that says "Revert Delete optimization." What does "revert" mean?
>
> A) Delete the code permanently
> B) Undo the changes — go back to how it was before
> C) Improve the code further

<details>
<summary>Answer</summary>
<b>B.</b> "Revert" means undo. The optimization didn't work, so we went back to the previous version. The old code comes back exactly as it was.
</details>

---

## 5. Branches — Parallel Versions

You learned about branches in the Git doc. Here's what they look like on GitHub.

**The branch dropdown** (near the top of the Code tab) lets you switch between versions:
```
🔽 main
   claude/refactor-codebase-review-DHo8o
```

- `main` — the official, trusted version
- `claude/refactor-codebase-review-DHo8o` — our working branch

**When you switch branches,** the entire file view changes to show that branch's version of the code. It's like switching between two copies of a Google Sheet — same structure, different content.

**The branch name `claude/refactor-codebase-review-DHo8o`:**
- `claude/` — prefix showing this branch was created by Claude
- `refactor-codebase-review` — describes what the branch is for
- `DHo8o` — a unique ID so multiple branches don't have the same name

Branch names are just labels. They can be anything. The convention is to make them descriptive.

---

## 6. Pull Requests — Asking to Merge

This is the most important GitHub concept after branches.

A **pull request** (PR) is a formal way of saying: "I made changes on my branch. Can we merge them into main?"

**The flow:**
1. You work on a branch and make commits
2. When you're ready, you create a pull request
3. Someone (you, in this case) reviews the changes
4. If everything looks good, you "merge" the PR
5. The changes from the branch get copied into main

**Why not just push directly to main?**
Because pull requests give you a chance to review before merging. It's like having an editor review your article before publishing. Even when working alone, it's a safety net.

**What a pull request page shows:**
- **Title** — a summary of what changed
- **Description** — details, context, test plan
- **Files changed** — the diff (green/red lines showing what was added/removed)
- **Conversation** — comments, discussion, review notes
- **Merge button** — the big green button that actually merges the changes into main

**What "merge" means:**
Take all the changes from the branch and apply them to main. After merging, main has everything the branch had. The branch can then be deleted (it's done its job).

**Real-world analogy:** You're writing an article in a separate Google Doc (the branch). When you're happy with it, you copy it into the main document (merge). The separate doc can be thrown away.

**Quiz:**
> You create a pull request from your branch to main. What happens when you click "Merge"?
>
> A) The branch gets deleted
> B) The changes from the branch get applied to main
> C) Main gets copied to the branch

<details>
<summary>Answer</summary>
<b>B.</b> Merging takes the branch's changes and applies them to main. The branch doesn't get deleted automatically (though GitHub offers to delete it after merging since it's no longer needed).
</details>

---

## 7. Issues — A To-Do List for Your Project

**Issues** are GitHub's built-in task tracker. Each issue is one thing that needs to be done — a bug to fix, a feature to add, a question to discuss.

**An issue has:**
- A title ("Fix slow Delete batch operation")
- A description (details, context, steps to reproduce)
- Labels (tags like "bug", "feature", "documentation")
- An assignee (who's responsible)
- A status (open or closed)

**Why use issues instead of just a TODO.md file?**
- Issues can be discussed (people can comment)
- Issues can be linked to pull requests ("this PR fixes issue #12")
- Issues can be assigned to people
- Issues can be labeled and filtered
- Closing an issue marks it as done — permanent record

**We haven't used issues yet** — our TODOs are in `docs/TODO.md`. As you get comfortable with GitHub, issues would be the proper place for those.

---

## 8. GitHub vs Google Drive — What's Different

Since you know Google Drive, here's a direct comparison:

| Google Drive | GitHub | Notes |
|-------------|--------|-------|
| Folder | Repository | Your project's home |
| File | File | Same concept |
| Version history | Commits | But Git is way more detailed |
| "Make a copy" | Branch | Work on a copy without affecting the original |
| Suggesting mode | Pull request | Propose changes for review before applying |
| Comments | Issues / PR comments | Discussion about what to change |
| Sharing settings | Collaborators | Who can see and edit the repo |
| Google Docs | Codespace | Where you actually edit the files |

**The big difference:** On Google Drive, edits happen instantly and everyone sees them immediately. On GitHub, you make changes on your branch, save them (commit), upload them (push), request a review (pull request), and THEN merge into the main version. It's more steps, but those steps prevent disasters.

---

## 9. The Buttons You'll Actually Use

When you're on the GitHub website, here are the only things you need:

**On the main repo page:**
- **Branch dropdown** — switch between main and our working branch to see different versions
- **File list** — click into folders and files to read code
- **Commits link** — see the history of changes

**On a pull request:**
- **Files changed tab** — see exactly what code was added/removed
- **Merge button** — merge the changes into main (when approved)

**That's it.** Everything else is advanced stuff you don't need right now.

---

## 10. Quiz Set

**Quiz 1: Vocabulary**
> Match each term to its meaning:
>
> 1. Repository
> 2. Commit
> 3. Branch
> 4. Pull Request
>
> a) A saved snapshot of your code
> b) A proposal to merge changes from one branch to another
> c) A separate version of the code you can work on safely
> d) Your project folder on GitHub

<details>
<summary>Answers</summary>
1 = d (repository = project folder)<br>
2 = a (commit = saved snapshot)<br>
3 = c (branch = separate working copy)<br>
4 = b (pull request = proposal to merge)
</details>

**Quiz 2: Order of Operations**
> Put these in the correct order:
>
> a) Push to GitHub
> b) Create a pull request
> c) Edit the code
> d) Commit the changes
> e) Merge the pull request
> f) Add files to staging

<details>
<summary>Answer</summary>
c → f → d → a → b → e<br><br>
Edit → git add → git commit → git push → create PR → merge PR<br><br>
In plain English: Make changes → pick which changes to save → save a snapshot → upload to GitHub → ask to merge → merge into main.
</details>

**Quiz 3: True or False**
> a) Pushing to GitHub automatically updates the live Google Apps Script.
>
> b) A branch lets you experiment without affecting the main version.
>
> c) You have to commit before you can push.

<details>
<summary>Answers</summary>
a) <b>FALSE.</b> GitHub and Google Apps Script are completely separate. Pushing to GitHub stores code on the website. To update the live script, you'd need <code>clasp push</code> or manual copy-paste.<br><br>
b) <b>TRUE.</b> That's exactly what branches are for.<br><br>
c) <b>TRUE.</b> Push uploads commits. If you haven't committed anything, there's nothing to push.
</details>

**Quiz 4: Scenario**
> I made some changes to main.gs on our branch and pushed them to GitHub. Jamie says "looks good, merge it." What do I do?
>
> A) Run `git merge` in the terminal
> B) Create a pull request on GitHub, then click the Merge button
> C) The changes are already in main since they were pushed

<details>
<summary>Answer</summary>
<b>B.</b> Pushing puts the changes on GitHub, but on our branch — not on main. To get them into main, we create a pull request (which shows what changed) and then click Merge. Option C is wrong because pushing to a branch doesn't change main.
</details>

**Exercise: Go Look at Your Repo**
Right now (or next time you're at a computer), go to GitHub and:
1. Find your repository (JamieDR/WIYS-Refactoring_2026)
2. Look at the file list — can you find `docs/CHANGELOG.md`?
3. Click on "commits" — read the messages. Do they make sense now?
4. Find the branch dropdown — switch to our branch and back to main. Notice how the files might be different.
5. If there's an open pull request, click on it. Look at the "Files changed" tab. Can you read the green (added) and red (removed) lines?

You don't need to DO anything — just look around and get comfortable with where things are.

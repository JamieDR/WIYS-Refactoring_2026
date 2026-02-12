# Terminal & Git — Actually Understanding Them

The guide in `docs/guides/` is a cheat sheet. This is the actual lesson. Read this first, then use the cheat sheet as a reference later.

**Honest note:** During our sessions, I (Claude) was running all the terminal and git commands while you clicked "approve." You were basically a passenger. This doc is so you can understand what was happening, and eventually do some of it yourself.

---

## Table of Contents

**Part 1: The Terminal**
1. [What IS a Terminal, Really?](#1-what-is-a-terminal-really)
2. [You Are Always Somewhere — The File System](#2-you-are-always-somewhere--the-file-system)
3. [pwd — Where Am I?](#3-pwd--where-am-i)
4. [ls — What's Here?](#4-ls--whats-here)
5. [cd — Move Somewhere Else](#5-cd--move-somewhere-else)
6. [Reading a Command — What All the Pieces Mean](#6-reading-a-command--what-all-the-pieces-mean)
7. [What Happens When You Press Enter](#7-what-happens-when-you-press-enter)
8. [Terminal Exercise Set](#8-terminal-exercise-set)

**Part 2: Git**
9. [Why Git Exists](#9-why-git-exists)
10. [The Four Places Your Code Lives](#10-the-four-places-your-code-lives)
11. [git status — What Changed?](#11-git-status--what-changed)
12. [git add — Pick What to Save](#12-git-add--pick-what-to-save)
13. [git commit — Save a Snapshot](#13-git-commit--save-a-snapshot)
14. [git push — Upload to GitHub](#14-git-push--upload-to-github)
15. [Branches — Working on a Copy](#15-branches--working-on-a-copy)
16. [What Was Actually Happening in Our Sessions](#16-what-was-actually-happening-in-our-sessions)
17. [Git Exercise Set](#17-git-exercise-set)

---

# Part 1: The Terminal

## 1. What IS a Terminal, Really?

You know how you use your phone or computer by tapping icons and clicking buttons? That's a **graphical interface** — you see pictures and interact with them visually.

A terminal is the other way to talk to a computer: **by typing text commands.** You type an instruction, press Enter, and the computer types back the result.

**Why does it exist?** Because some things are faster or only possible through text commands. There's no button in Google Sheets that says "upload this code to Apps Script." But there's a command: `clasp push`.

**Why does it look scary?** Because it was designed in the 1970s when screens could only show text. The dark background, the blinking cursor, the monospace font — all relics from when computers didn't have graphics. It looks old because it IS old. But it still works, and developers use it every day.

**Key insight:** The terminal is not smarter or harder than a graphical interface. It does the same things — open folders, move files, run programs. It just uses typed words instead of mouse clicks.

---

## 2. You Are Always Somewhere — The File System

This is the most important concept. When you open a terminal, **you are standing inside a folder.** Every command you type happens *from where you're standing.*

Your computer's files are organized like a tree:

```
/ (root — the very top)
├── home/
│   └── user/
│       └── WIYS-Refactoring_2026/    ← our project
│           ├── src/
│           │   ├── main.gs
│           │   └── appsscript.json
│           ├── docs/
│           │   ├── CHANGELOG.md
│           │   ├── learning/
│           │   │   ├── sessions-3-4-concepts.md
│           │   │   ├── javascript-syntax-basics.md
│           │   │   └── terminal-and-git.md  ← you are reading this
│           │   ├── developer-log/
│           │   └── guides/
│           ├── CLAUDE.md
│           └── .clasp.json
```

**Think of it like a building:**
- `/` is the building entrance
- `/home/user/` is your floor
- `/home/user/WIYS-Refactoring_2026/` is your office
- `/home/user/WIYS-Refactoring_2026/src/` is the filing cabinet in your office
- `/home/user/WIYS-Refactoring_2026/src/main.gs` is a specific file in that cabinet

**The path** is the address. Just like a street address tells you where a building is, a file path tells you where a file is:
```
/home/user/WIYS-Refactoring_2026/src/main.gs
```
Each `/` is a separator between folders, like how commas separate parts of a street address.

**Quiz:**
> Given the tree above, what's the full path to CHANGELOG.md?
>
> A) `/docs/CHANGELOG.md`
> B) `/home/user/WIYS-Refactoring_2026/docs/CHANGELOG.md`
> C) `CHANGELOG.md`

<details>
<summary>Answer</summary>
<b>B.</b> The full (absolute) path starts from the root <code>/</code> and traces every folder down to the file. Option A is missing the first few folders. Option C is just the file name with no path.
</details>

---

## 3. pwd — Where Am I?

`pwd` stands for **Print Working Directory.** It tells you which folder you're currently standing in.

```
$ pwd
/home/user/WIYS-Refactoring_2026
```

That output means: "You are inside the WIYS-Refactoring_2026 folder, which is inside user, which is inside home, which is at the root."

**When to use it:** Whenever you're confused about where you are. It's like checking your GPS.

**Real-world analogy:** You're in a shopping mall. You find one of those "You Are Here" maps with a red dot. `pwd` is that red dot.

---

## 4. ls — What's Here?

`ls` stands for **List.** It shows you what files and folders are in your current location.

```
$ ls
CLAUDE.md  docs  src  .clasp.json  .gitignore
```

That output means: "In the folder you're standing in, there are these files and folders."

**Adding options:**
```
$ ls -l
```
The `-l` flag means "long format" — shows more details (size, date modified, etc.)

```
$ ls docs/
CHANGELOG.md  architecture  developer-log  guides  learning  TODO.md
```
You can also list what's inside a different folder without moving there. This is like peeking into a room without walking in.

**Real-world analogy:** You open a desk drawer and look at what's inside. `ls` opens the drawer. `ls -l` opens the drawer and reads the labels on everything.

**Quiz:**
> You type `ls` and see: `main.gs  appsscript.json`. What folder are you probably in?
>
> A) The project root (WIYS-Refactoring_2026)
> B) The src folder
> C) The docs folder

<details>
<summary>Answer</summary>
<b>B) The src folder.</b> Those two files (<code>main.gs</code> and <code>appsscript.json</code>) live in <code>src/</code>. If you were in the project root, you'd see <code>CLAUDE.md</code>, <code>docs</code>, <code>src</code>, etc.
</details>

---

## 5. cd — Move Somewhere Else

`cd` stands for **Change Directory.** It moves you to a different folder.

**Going into a folder:**
```
$ cd src
```
"Move into the `src` folder." Now `pwd` would show `/home/user/WIYS-Refactoring_2026/src`.

**Going back up one level:**
```
$ cd ..
```
`..` means "parent folder" (one level up). If you're in `src`, this takes you back to `WIYS-Refactoring_2026`.

**Going to a specific place (absolute path):**
```
$ cd /home/user/WIYS-Refactoring_2026/docs/learning
```
This takes you directly there, no matter where you currently are. Like typing a full address into GPS instead of saying "turn left."

**Going home:**
```
$ cd ~
```
`~` is a shortcut for your home folder (`/home/user`). Like pressing the "Home" button on your phone.

**Common pattern — move in, look around, move back:**
```
$ cd docs          (move into docs)
$ ls               (see what's there)
$ cd learning      (move into learning)
$ ls               (see what's there)
$ cd ../..         (go up two levels — back to project root)
```

`../..` means "up one, then up one more." Each `..` goes up one level.

**Quiz:**
> You're in `/home/user/WIYS-Refactoring_2026/src`. You type `cd ..`. Where are you now?
>
> A) `/home/user/WIYS-Refactoring_2026`
> B) `/home/user`
> C) `/home/user/WIYS-Refactoring_2026/src/..`

<details>
<summary>Answer</summary>
<b>A.</b> <code>..</code> moves up one level. One level up from <code>src</code> is <code>WIYS-Refactoring_2026</code>.
</details>

**Quiz:**
> You're in `/home/user/WIYS-Refactoring_2026`. You want to see the files inside `docs/learning/` without leaving your current folder. Which command?
>
> A) `cd docs/learning`
> B) `ls docs/learning`
> C) `pwd docs/learning`

<details>
<summary>Answer</summary>
<b>B.</b> <code>ls docs/learning</code> lists the contents of that folder without moving you there. Option A would move you there (and not show anything). Option C doesn't make sense — <code>pwd</code> doesn't take a folder name.
</details>

---

## 6. Reading a Command — What All the Pieces Mean

Every command follows the same pattern:

```
command  options  arguments
```

| Part | What it is | Analogy |
|------|-----------|---------|
| **Command** | The program you're running | The verb — "open", "move", "list" |
| **Options/Flags** | Settings that modify the behavior (start with `-` or `--`) | Adverbs — "quickly", "carefully", "in detail" |
| **Arguments** | What you're acting on | The noun — "the door", "that file", "this folder" |

**Examples:**

```
ls -l docs/
```
- Command: `ls` (list)
- Option: `-l` (long/detailed format)
- Argument: `docs/` (which folder to list)
- Plain English: "List the contents of the docs folder, in detailed format."

```
git commit -m "Add batch processing"
```
- Command: `git` (the git program)
- Subcommand: `commit` (save a snapshot)
- Option: `-m` (message follows)
- Argument: `"Add batch processing"` (the message)
- Plain English: "Git, save a snapshot with the message 'Add batch processing'."

```
clasp login --no-localhost
```
- Command: `clasp` (the Google Apps Script tool)
- Subcommand: `login` (authenticate)
- Option: `--no-localhost` (don't try to open a local browser)
- Plain English: "Clasp, log me in, but don't try to open a browser locally."

```
git push -u origin claude/refactor-codebase-review-DHo8o
```
- Command: `git`
- Subcommand: `push` (upload to remote)
- Option: `-u` (set this as the default remote branch to push to)
- Argument 1: `origin` (the remote server — GitHub)
- Argument 2: `claude/refactor-codebase-review-DHo8o` (which branch to push)
- Plain English: "Git, upload my saves to GitHub on this specific branch, and remember this branch for next time."

**Quiz:**
> In this command, what is `-g`?
> ```
> npm install -g @google/clasp
> ```
> A) The thing being installed
> B) An option/flag that means "install globally"
> C) Part of the package name

<details>
<summary>Answer</summary>
<b>B.</b> The hyphen gives it away — <code>-g</code> is a flag. It tells npm to install the package globally (available everywhere) instead of just in the current folder. <code>@google/clasp</code> is the argument (the package to install).
</details>

---

## 7. What Happens When You Press Enter

This is what actually occurs when you type a command and press Enter:

1. **The terminal reads your text** and splits it into parts (command, options, arguments)
2. **It finds the program** — looks for a program with that name installed on the computer
3. **It runs the program** with the options and arguments you gave
4. **The program does its work** (might take a split second or several minutes)
5. **Output appears** below your command (text the program wants to show you)
6. **The cursor comes back** — ready for your next command

**If something goes wrong:**
- The program name is misspelled → `command not found`
- A file doesn't exist → `No such file or directory`
- You don't have permission → `permission denied`
- The program crashed → Error messages (often in red)

**If nothing appears:**
Some commands succeed silently. `cd docs` moves you to docs but doesn't print anything. No news is good news.

**If it's taking a long time:**
The program is still running. Wait, or press `Ctrl+C` to cancel it.

---

## 8. Terminal Exercise Set

These are safe to do in your Codespace. You can't break anything.

**Exercise 1: Navigate the project**
```
pwd                          (where am I?)
ls                           (what's here?)
cd docs                      (go into docs)
ls                           (what's in docs?)
cd learning                  (go into learning)
ls                           (what files did we create today?)
cd ../..                     (go back up to the project root)
pwd                          (confirm you're back)
```
Do each command one at a time. After each one, pause and understand the output before moving to the next.

**Exercise 2: Explore without moving**
Without using `cd` at all, answer these by using only `ls`:
```
ls src/                      (what's in src?)
ls docs/guides/              (what's in guides?)
ls docs/learning/            (what's in learning?)
```

**Exercise 3: Read the output**
Run `ls -l` in the project root. You'll see something like:
```
-rw-r--r-- 1 user user  3254 Feb 12 10:30 CLAUDE.md
drwxr-xr-x 5 user user  4096 Feb 12 10:30 docs
drwxr-xr-x 2 user user  4096 Feb 12 10:30 src
```
Don't worry about most of it. The important parts:
- `d` at the start means it's a **d**irectory (folder). No `d` means it's a file.
- The date/time tells you when it was last modified
- The name is at the end

Can you tell which are folders and which are files?

**Exercise 4: Get lost and find your way back**
```
cd /                         (go to the very top of the file system)
ls                           (what's here? — lots of system folders)
pwd                          (confirm you're at /)
cd ~                         (go to your home folder)
pwd                          (confirm you're at /home/user)
cd WIYS-Refactoring_2026     (go back to the project)
pwd                          (confirm you're back)
```

---

# Part 2: Git

## 9. Why Git Exists

Imagine you're writing an essay in Google Docs. You make a bunch of changes. The next day you realize yesterday's version was better. But you can't get it back — it's gone.

That's what programming without Git is like. And that's what **you've been doing** with the WIYS codebase until now — one file, no version history, no safety net.

**Git is Google Docs "Version History" for code.** It remembers every change you've ever saved, so you can:
- Go back to any previous version
- See exactly what changed and when
- Work on new features without risking the working version
- Collaborate with others without overwriting each other's work

**The name "Git"** doesn't stand for anything. The creator (Linus Torvalds, who also created Linux) said he named it after himself — "git" is British slang for a foolish person.

---

## 10. The Four Places Your Code Lives

This confused everyone when they first learn Git. Your code exists in **four separate places**, and Git moves it between them:

```
┌─────────────────────────────────────────────────────────────┐
│  YOUR COMPUTER (or Codespace)                               │
│                                                             │
│  ┌──────────────┐   git add   ┌──────────────┐             │
│  │  Working      │ ─────────► │  Staging      │             │
│  │  Directory    │            │  Area         │             │
│  │              │ ◄───────── │              │             │
│  │ (your files   │  (editing) │ (ready to     │             │
│  │  as you see   │            │  save)        │             │
│  │  them)        │            │              │             │
│  └──────────────┘            └──────┬───────┘             │
│                                     │ git commit           │
│                                     ▼                      │
│                              ┌──────────────┐             │
│                              │  Local        │             │
│                              │  Repository   │             │
│                              │              │             │
│                              │ (saved        │             │
│                              │  snapshots)   │             │
│                              └──────┬───────┘             │
└─────────────────────────────────────┼───────────────────────┘
                                      │ git push
                                      ▼
                              ┌──────────────┐
                              │  GitHub       │
                              │  (Remote)     │
                              │              │
                              │ (shared with  │
                              │  the world)   │
                              └──────────────┘
```

**In plain English:**

1. **Working Directory** — Your actual files. When you edit `main.gs`, you're changing files in the working directory. This is what you see in the file explorer.

2. **Staging Area** — The "ready to save" pile. When you use `git add`, you're saying "I want to include these changes in my next save." Think of it like putting items on the checkout counter before paying.

3. **Local Repository** — Your saved snapshots (commits). When you use `git commit`, you take a snapshot of everything in the staging area. This is like pressing "Save Game" — you can come back to this point.

4. **GitHub (Remote)** — The cloud copy. When you use `git push`, you upload your saved snapshots to GitHub so they're backed up and others can see them.

**Quiz:**
> You edit main.gs but don't run any git commands. Where does the change exist?
>
> A) Working Directory only
> B) Working Directory and Staging Area
> C) Everywhere

<details>
<summary>Answer</summary>
<b>A) Working Directory only.</b> Until you <code>git add</code>, the change is just in your files. Git knows the file changed (it tracks this), but hasn't staged or saved it yet.
</details>

---

## 11. git status — What Changed?

`git status` is the most useful git command. It tells you what's going on right now.

```
$ git status
On branch claude/refactor-codebase-review-DHo8o
Changes not staged for commit:
  modified:   src/main.gs

Untracked files:
  docs/CHANGELOG.md
  docs/learning/
```

Reading this:
- **On branch** — which branch you're on (more on branches later)
- **Changes not staged** — files you've edited but haven't `git add`'ed yet
- **Untracked files** — brand new files that Git has never seen before

**Think of it like this:** `git status` is the cashier saying "here's what's on the counter, and here's what's still in your cart."

---

## 12. git add — Pick What to Save

`git add` moves changes from the working directory to the staging area. You're telling Git "I want to include this in my next snapshot."

```
$ git add docs/CHANGELOG.md
```
"Stage the CHANGELOG file." It's now on the counter, ready to be saved.

```
$ git add docs/learning/sessions-3-4-concepts.md docs/learning/javascript-syntax-basics.md
```
"Stage both of these files."

**You don't have to add everything.** Maybe you edited 5 files but only want to save 3 of them right now. You pick which ones.

**After adding, run `git status` again:**
```
$ git status
Changes to be committed:
  new file:   docs/CHANGELOG.md
  new file:   docs/learning/sessions-3-4-concepts.md

Changes not staged for commit:
  modified:   src/main.gs
```

Now you can see: CHANGELOG and the concepts doc are staged (ready to save). main.gs was edited but NOT staged — it won't be part of the next snapshot.

---

## 13. git commit — Save a Snapshot

`git commit` takes everything in the staging area and saves it as a permanent snapshot.

```
$ git commit -m "Add changelog and learning docs"
```

- `commit` — save a snapshot
- `-m` — "message follows" (every snapshot needs a description)
- `"Add changelog and learning docs"` — the description of what changed

**After you commit, the staging area is empty again.** The changes are now safely saved in your local repository. You can always come back to this exact point.

**Each commit has:**
- A unique ID (like `84902cc`) — its "serial number"
- A message (like "Add changelog and learning docs")
- A timestamp (when it was saved)
- A record of exactly what changed (which lines were added, removed, or modified)

**Real-world analogy:** Each commit is like a save point in a video game. You can have dozens of save points, each with a name. If you mess up, you reload from an earlier save.

**Quiz:**
> You `git add` two files and `git commit`. Then you realize you forgot to add a third file. What do you do?
>
> A) It's too late — the commit already happened
> B) `git add` the third file, then `git commit` again (a new, second snapshot)
> C) Delete the commit and start over

<details>
<summary>Answer</summary>
<b>B.</b> You just make another commit with the forgotten file. Commits are cheap — make as many as you need. Each one is a separate snapshot, and that's fine.
</details>

---

## 14. git push — Upload to GitHub

`git push` uploads your local commits to GitHub.

```
$ git push -u origin claude/refactor-codebase-review-DHo8o
```

- `push` — upload to remote
- `-u origin` — "to GitHub (and remember this for next time)"
- `claude/refactor-codebase-review-DHo8o` — which branch to push to

**Before push:** Your commits only exist on your computer (or Codespace). If the Codespace gets deleted, those commits are gone.

**After push:** Your commits are on GitHub. They're safe. Anyone with access to the repo can see them.

**Push doesn't affect the live Google Apps Script project.** This is important. Pushing to GitHub just stores the code online. To actually deploy it to the live system, you'd use `clasp push` (which is a different thing entirely).

---

## 15. Branches — Working on a Copy

A branch is a separate version of your code. Think of it like duplicating a Google Sheet tab.

```
main (the real version)
  │
  └── claude/refactor-codebase-review-DHo8o (our working copy)
```

**Why branches?**
- You can experiment without risking the real version
- If your experiment works, you "merge" it into main
- If it doesn't work, you throw away the branch — main is untouched

**In our sessions:** We always work on a branch (not main). When we're confident the code works, it gets merged into main through a "pull request" — which is basically asking "can we merge this into the real version?"

**You've been on a branch this whole time.** Every commit I made went to `claude/refactor-codebase-review-DHo8o`, not to `main`. The main version stayed safe.

---

## 16. What Was Actually Happening in Our Sessions

Here's exactly what happened each time I saved and uploaded code:

**Step 1: I edited files**
I changed `main.gs` (or created new files). You could see the edits in real-time.

**Step 2: I ran `git add`**
```
git add src/main.gs docs/CHANGELOG.md
```
"Put these changed files in the staging area." You saw a prompt asking you to approve this command.

**Step 3: I ran `git commit`**
```
git commit -m "Add batch Create New Rows function"
```
"Save a snapshot of the staged files with this description." Another approval prompt.

**Step 4: I ran `git push`**
```
git push -u origin claude/refactor-codebase-review-DHo8o
```
"Upload the snapshot to GitHub on our branch." Another approval prompt.

**What you were clicking "approve" on:** Each of those prompts was me asking permission to run a terminal command. The permission system exists so I can't do anything without your knowledge. You were approving each git step — add, commit, push.

**What was NOT happening:** None of this touched the live Google Apps Script project. The code in your spreadsheet's script editor was unaffected by git operations. When we needed to update the live code, we did it separately (copy-paste into the Apps Script editor).

---

## 17. Git Exercise Set

**Exercise 1: Read git status (no typing needed)**
Next time we work on code, when I run `git status`, read the output and try to answer:
- What files were changed?
- Are they staged (ready to commit) or not?
- Are any files brand new (untracked)?

**Exercise 2: Read commit messages**
Look at this git log from our project:
```
84902cc Add changelog and learning docs for Jamie
62b3042 Update Delete TODO with detailed performance analysis from logs
73c0ad2 Add TODO list for next session + revert Delete optimization
9c24f8e Revert "Optimize Delete Successful Uploads: faithful Python port with bulk reads"
2f0540b Rewrite Paste Content: faithful Python port, top-to-bottom processing
```
Each line is one commit (one snapshot). Can you tell the story of what happened by reading the messages bottom to top? (Bottom is oldest, top is newest.)

<details>
<summary>The story</summary>
1. We rewrote Paste Content to match the Python version<br>
2. We tried to optimize Delete Successful Uploads<br>
3. It didn't work, so we reverted it (went back to the old version) and made a TODO list<br>
4. We added more detail to the Delete TODO<br>
5. We created the changelog and learning docs (today's session)
</details>

**Exercise 3: Try it yourself (when you're in a Codespace)**
Open the terminal and run:
```
git status
git log --oneline -5
```
- `git status` shows you the current state
- `git log --oneline -5` shows the last 5 commits in short format

You won't break anything. These commands just display information — they don't change anything.

**Exercise 4: Trace the flow**
For each scenario, name which git command(s) you'd need:

a) You just edited main.gs and want to save a snapshot to your local machine.
b) You have committed changes and want to upload them to GitHub.
c) You want to see what files you've changed since your last commit.

<details>
<summary>Answers</summary>
a) <code>git add src/main.gs</code> then <code>git commit -m "description"</code><br>
b) <code>git push</code><br>
c) <code>git status</code>
</details>

---

## Summary: The Commands That Matter Right Now

You don't need to memorize 50 commands. Here are the only ones that matter:

**Terminal navigation:**
| Command | What it does | When to use it |
|---------|-------------|----------------|
| `pwd` | Shows where you are | When you're lost |
| `ls` | Shows what's in the current folder | When you want to see what's here |
| `ls some/folder` | Shows what's in a different folder | When you want to peek without moving |
| `cd foldername` | Move into a folder | When you want to go somewhere |
| `cd ..` | Move up one level | When you want to go back |
| `cd ~` | Go to your home folder | When you want to start over |

**Git:**
| Command | What it does | Analogy |
|---------|-------------|---------|
| `git status` | Shows what's changed | Checking your cart before checkout |
| `git add filename` | Stage a file (mark it to be saved) | Putting an item on the counter |
| `git commit -m "message"` | Save a snapshot | Pressing "Save Game" |
| `git push` | Upload to GitHub | Backing up your save to the cloud |
| `git log --oneline -5` | Show recent snapshots | Looking at your save game list |

Everything else, I handle for you. These are the ones worth understanding.

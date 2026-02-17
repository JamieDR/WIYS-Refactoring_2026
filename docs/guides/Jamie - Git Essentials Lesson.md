# Git, GitHub & Codespaces — Interactive Lesson

**How this works:** This is NOT a reading assignment. It's a guided walkthrough you do WITH Claude in the terminal. Every concept is learned by doing something, seeing what happens, and answering a question about it. Claude will be checking your answers.

**Rules:**
- YOU type every command. Claude doesn't type for you.
- Before running each command, Claude will ask what you THINK will happen.
- After running it, Claude will ask what you SEE and what it means.
- If you get something wrong, that's fine — that's how learning works. We'll talk through it.
- Don't skip ahead. Each exercise builds on the last.

---

## Module 1: Where Are You Right Now?

### Exercise 1.1 — Your first command

**Do this:** Open your terminal in Codespaces and type:
```bash
git status
```

**Claude will ask you:**
1. Read the very first line of the output. What does it say?
2. Does it say "nothing to commit" or does it list some files? What does that tell you?
3. If there are files listed — are they in green or red text? (We'll talk about what that means.)

**The concept you just learned:** `git status` is your "where am I, what's going on" command. You'll run this constantly. It costs nothing and tells you everything about the current state.

---

### Exercise 1.2 — What branch are you on?

**Do this:**
```bash
git branch
```

**Claude will ask you:**
1. How many branches do you see?
2. One of them has a `*` next to it. Which one? What do you think the `*` means?

**Now try this:**
```bash
git branch -a
```

**Claude will ask you:**
1. What new entries appeared? They should start with `remotes/origin/...`
2. What do you think "remotes" means? Where do you think those branches live?

**The concept you just learned:** Your code exists in two places — your Codespace (local) and GitHub (remote). `git branch` shows local branches. `git branch -a` shows both. The `remotes/origin/` ones live on GitHub.

---

### Exercise 1.3 — Your project history

**Do this:**
```bash
git log --oneline -5
```

**Claude will ask you:**
1. Each line has a short code (like `e492747`) and then some text. What do you think the code is? What's the text?
2. Which entry is the most recent — the top or the bottom?
3. Pick any line. Can you tell what was changed just from the text? If the text is unclear, what would be a better version?

**Now try the full version:**
```bash
git log -3
```

**Claude will ask you:**
1. What extra information do you see compared to `--oneline`?
2. Who is listed as the author?
3. It opens in a scrollable viewer. Press `q` to exit. Did that work?

**The concept you just learned:** Every time someone saves changes to this project, it creates a "commit" — a save point with a unique ID (the hash), a message, an author, and a timestamp. `git log` is the history book.

---

## Module 2: What Are Git, GitHub, and Codespaces?

Now that you've used some commands, let's make sure you understand the bigger picture. This module is a conversation, not reading.

### Exercise 2.1 — Find the evidence

**Do this:**
```bash
git remote -v
```

**Claude will ask you:**
1. You should see a URL. What website does it point to?
2. That URL is where your code gets backed up when you "push." What website is that?
3. So there are TWO copies of your code — one here in your Codespace, one at that URL. Why would you want two copies?

**The concept:** Git is the tool (runs locally). GitHub is the website (remote backup). Your Codespace is the virtual computer where you work. Three different things.

---

### Exercise 2.2 — See your Codespace config

**Do this:**
```bash
cat .devcontainer/devcontainer.json
```

**Claude will ask you:**
1. Can you spot the line that installs clasp? What does it say?
2. This file runs automatically when your Codespace starts up. Why is that useful? What would happen if you had to install clasp manually every time?

**The concept:** Codespaces reads this config file and sets up your environment automatically. That's why you don't have to install tools yourself — it's all defined here.

---

### Exercise 2.3 — clasp vs. Git (the two pipelines)

**Do this:**
```bash
clasp --version
```
```bash
git --version
```

**Claude will ask you:**
1. Both of these are tools that move code around. But they move code to DIFFERENT places. Where does `clasp push` send code? Where does `git push` send code?
2. If you ran `clasp push` but forgot to run `git push`, what would happen? Would the live Google Apps Script have the new code? Would GitHub?
3. If you deleted your Codespace right now without running `git push`, would your live Google Apps Script still work? Would GitHub have your latest changes?

**The concept:** Two completely separate pipelines. clasp goes to Google Apps Script. Git goes to GitHub. They don't know about each other.

```
Google Apps Script  ←── clasp ──→  YOUR CODESPACE  ←── git ──→  GitHub
    (live system)                   (where you work)              (backup)
```

---

## Module 3: The Three States of a File (Learn by Watching)

This is the most important concept in Git. You're going to learn it by watching a file move through all three states.

### Exercise 3.1 — Start clean

**Do this:**
```bash
git status
```

**Claude will ask you:**
1. Does it say "nothing to commit, working tree clean"? (If not, we need to deal with that first.)

Good. Everything is saved. No changes pending. Remember what this "clean" state looks like.

---

### Exercise 3.2 — Make a change (State 1: Modified)

**Do this:** Open the file explorer on the left in VS Code. Navigate to `docs/guides/`. Create a new file called `jamie-scratch.md`. Type anything in it — even just "hello world". Save the file.

**Now run:**
```bash
git status
```

**Claude will ask you:**
1. The output changed from Exercise 3.1. What's different?
2. Is your new file in green or red?
3. Git calls it "untracked." What do you think that means? Has Git ever seen this file before?

**The concept:** You just saw **State 1: Modified/Untracked.** The file exists on your computer, but Git hasn't been told to care about it yet. It's sitting on your desk, not in the outbox.

---

### Exercise 3.3 — Stage the file (State 2: Staged)

**Do this:**
```bash
git add docs/guides/jamie-scratch.md
```

Nothing will print. That's normal. **Now run:**
```bash
git status
```

**Claude will ask you:**
1. What happened to your file? Is it still in the same section of the output?
2. What color is it now?
3. The section header changed. What does it say now? ("Changes to be committed" vs "Untracked files")
4. If you ran `git commit` right now, would this file be included?

**The concept:** You just saw **State 2: Staged.** The file is now in the outbox, queued up for the next save point. You told Git "include this in my next commit."

---

### Exercise 3.4 — Commit the file (State 3: Committed)

**Before you type this:** Think about what happened. You created a scratch file for practice purposes. Write a commit message that explains what you did and why. Don't use "update" or "test" — be specific.

**Do this** (replace the message with your own):
```bash
git commit -m "Add scratch file for Git practice exercises"
```

**Now run:**
```bash
git status
```

**Claude will ask you:**
1. What does the output say now? Does it look like Exercise 3.1?
2. Where did your file go? (It's still on disk — but what does Git think about it now?)

**Now run:**
```bash
git log --oneline -3
```

**Claude will ask you:**
1. Is your commit at the top?
2. Read your commit message. Does it make sense? Would someone reading the log understand what you did?

**The concept:** You just saw **State 3: Committed.** The save point is created. Your file's changes are permanently recorded in Git's history. The working tree is "clean" again — meaning everything is saved.

---

### Exercise 3.5 — See all three states at once

Let's make this concrete. You're going to set up a situation with files in all three states at once.

**Step 1:** Edit `docs/guides/jamie-scratch.md` — add a new line of text. Save it.
**Step 2:** Create another new file: `docs/guides/jamie-scratch-2.md`. Type anything. Save it.
**Step 3:** Stage ONLY the second file:
```bash
git add docs/guides/jamie-scratch-2.md
```

**Now run:**
```bash
git status
```

**Claude will ask you:**
1. How many files appear in the output?
2. Which file is green (staged)? Which is red (modified but unstaged)?
3. If you run `git commit` right now, which file(s) get saved? Which ones don't?
4. Why is this useful? Can you think of a real situation where you'd want to commit some files but not others?

**The concept:** The staging area lets you choose exactly what goes into each commit. You changed two files, but you're only saving one. That's the point of the middle step.

---

### Exercise 3.6 — Clean up

Let's commit everything and clean up the scratch files.

**Do this:**
```bash
git add docs/guides/jamie-scratch.md
git status
```

**Claude will ask:** Both files should be green now. Correct?

```bash
git commit -m "Update scratch files during Git practice"
```

Now let's remove the scratch files since they were just for practice:
```bash
rm docs/guides/jamie-scratch.md docs/guides/jamie-scratch-2.md
git status
```

**Claude will ask you:**
1. The files show as "deleted" — in what color?
2. Git noticed you deleted them. But has Git recorded that deletion yet?

**Stage and commit the deletion:**
```bash
git add docs/guides/jamie-scratch.md docs/guides/jamie-scratch-2.md
git commit -m "Remove scratch files after Git practice"
```

**The concept:** Deleting a file is a change, just like editing one. Git tracks deletions too. You still need to stage and commit them.

---

## Module 4: Viewing Changes (The Diff)

### Exercise 4.1 — Set up a change to look at

**Do this:** Open `docs/guides/jamie-scratch.md` — wait, we deleted that. Let's use a real file.

Open `docs/guides/Jamie - Git Essentials Lesson.md` in VS Code. Scroll to the very bottom. Add this line:
```
<!-- Jamie completed this exercise -->
```
Save the file.

**Now run:**
```bash
git diff
```

**Claude will ask you:**
1. What file does the diff show?
2. Do you see a line starting with `+`? What does `+` mean?
3. Do you see any lines starting with `-`? What does `-` mean?
4. The `@@` line at the top — what do you think those numbers mean?

**Now undo that change** (we don't actually want to commit it):
```bash
git restore "docs/guides/Jamie - Git Essentials Lesson.md"
git status
```

**Claude will ask you:**
1. What did `git restore` do?
2. Is the working tree clean now?
3. **Important:** Is that edit gone forever? Could you get it back? (Answer: no, it's gone. `git restore` throws away uncommitted changes permanently. That's why you only use it when you're sure.)

---

### Exercise 4.2 — diff vs. diff --staged

**Do this:**
1. Open `docs/guides/Jamie - Git Essentials Lesson.md` again. Add `<!-- Test line A -->` at the bottom. Save.
2. Stage it: `git add "docs/guides/Jamie - Git Essentials Lesson.md"`
3. Now edit the same file AGAIN. Add `<!-- Test line B -->` below line A. Save.

**Now run these two commands and compare:**
```bash
git diff
```
```bash
git diff --staged
```

**Claude will ask you:**
1. Did `git diff` and `git diff --staged` show the same thing?
2. Which one showed "Test line A"? Which showed "Test line B"?
3. Why are they different? (Hint: one shows what's staged, the other shows what's NOT staged.)
4. If you committed right now, which line would be in the commit — A, B, or both?

**Clean up:**
```bash
git restore "docs/guides/Jamie - Git Essentials Lesson.md"
git restore --staged "docs/guides/Jamie - Git Essentials Lesson.md"
git status
```

**Claude will ask:** Notice we used TWO restore commands. `git restore --staged` unstages the file (moves it from outbox back to desk). `git restore` (without --staged) throws away the edits. Why did we need both?

---

## Module 5: Branches (Parallel Workstreams)

### Exercise 5.1 — See where you are

**Do this:**
```bash
git branch
```

**Claude will ask you:**
1. What branch are you on? (The one with `*`)
2. What do you think `main` represents? Is it safe to experiment on `main`?

---

### Exercise 5.2 — Create a branch

**Do this:**
```bash
git checkout main
git pull
git checkout -b jamie/git-practice
```

**Claude will ask you:**
1. We ran three commands. What did each one do? (Don't look it up — think about it.)
2. Run `git branch` now. What's different from Exercise 5.1?
3. Why did we go to `main` and `pull` BEFORE creating the new branch?

**The concept:** A branch starts from wherever you are when you create it. If you're on outdated code, the branch starts from outdated code. That's why you always: go to main → pull latest → then create your branch.

---

### Exercise 5.3 — Work on a branch

**Do this:**
1. Create a file: `docs/guides/jamie-branch-test.md` with content "This was created on a branch"
2. Stage it: `git add docs/guides/jamie-branch-test.md`
3. Commit: `git commit -m "Add test file on practice branch"`

**Now do this:**
```bash
git log --oneline -3
```

**Claude will ask:** Your commit is at the top. Now watch what happens when we switch branches:

```bash
git checkout main
```

**Check if the file exists:**
```bash
ls docs/guides/jamie-branch-test.md
```

**Claude will ask you:**
1. Is the file there? (It shouldn't be.)
2. Where did it go?
3. Is it deleted forever? How would you get it back?

**Switch back:**
```bash
git checkout jamie/git-practice
ls docs/guides/jamie-branch-test.md
```

**Claude will ask you:**
1. Is it back?
2. In your own words, what just happened? What IS a branch?

**The concept:** Each branch has its own version of the project. When you switch branches, your files literally change to match that branch's version. The file isn't gone — it's on the other branch, waiting.

---

### Exercise 5.4 — Clean up the practice branch

**Do this:**
```bash
git checkout main
git branch -d jamie/git-practice
```

If it says "not fully merged" — that's Git protecting you. It's saying "that branch has commits that aren't on main. Are you sure you want to delete it?" For practice purposes:
```bash
git branch -D jamie/git-practice
```

**Claude will ask you:**
1. What's the difference between `-d` and `-D`?
2. Why would Git warn you before deleting a branch with unmerged commits?
3. In real work, what should you do BEFORE deleting a branch? (Answer: merge it into main first, usually via a Pull Request.)

---

## Module 6: Pushing and Pulling (Syncing with GitHub)

### Exercise 6.1 — Check the connection

**Do this:**
```bash
git remote -v
```

**Claude will ask you:**
1. The word "origin" is Git's name for "the remote copy." Where does it point?
2. You see "fetch" and "push" URLs. What do you think each one is used for?

---

### Exercise 6.2 — Push something

**Do this** (make sure you're on main):
```bash
git checkout main
git log --oneline -3
```

**Claude will ask you:**
1. Look at the most recent commit. Is that commit on GitHub yet?

How to tell:
```bash
git status
```

If it says "Your branch is up to date with 'origin/main'" — yes, GitHub has everything you have.
If it says "Your branch is ahead of 'origin/main' by X commits" — no, you have commits that GitHub doesn't have yet.

**Claude will ask you:**
1. Which message did you get?
2. What command would you run to send your local commits to GitHub?

**The concept:** Local and remote are NOT automatically synced. You have to explicitly push (send) and pull (receive). This is a feature, not a limitation — it means half-finished work doesn't accidentally end up on GitHub.

---

### Exercise 6.3 — Understand pull

**Claude will ask you:**
1. When should you run `git pull`?
2. What would happen if you didn't pull at the start of a session, and Claude had pushed changes from a previous session? (Answer: your local copy would be behind. You'd be working on old code.)
3. What does "Your branch is behind 'origin/main' by 3 commits" mean in plain English?

---

## Module 7: .gitignore (What Git Shouldn't Track)

### Exercise 7.1 — See what's ignored

**Do this:**
```bash
cat .gitignore
```

**Claude will ask you:**
1. Can you spot any patterns? What types of files are being ignored?
2. Why would you NOT want to track `.env` files in Git?
3. If you created a file called `secrets.env`, would `git status` show it? Why or why not?

---

### Exercise 7.2 — Test it

**Do this:**
1. Create a file called `test.log` in the project root (if `*.log` is in .gitignore)
2. Run `git status`

**Claude will ask you:**
1. Does the file show up? Why or why not?
2. Delete the test file: `rm test.log`

**The concept:** `.gitignore` is a safety mechanism. It prevents you from accidentally committing files that shouldn't be in version control — credentials, large files, temporary files.

---

## Module 8: Putting It All Together — The Full Workflow

Now you do the complete workflow from scratch, narrating what you're doing and why at each step. Claude will only correct you if you're about to do something wrong.

### Exercise 8.1 — The real deal

**Your mission:** Create a documentation file, commit it, and push it to GitHub. Here's the step-by-step, but YOU decide which commands to run.

1. **Get oriented.** What commands do you run first to see where you are?
2. **Set up a branch.** We need a clean branch from main. What's the sequence?
3. **Create the file.** Make `docs/guides/jamie-git-complete.md` with content: "I completed the Git interactive lesson on [today's date]."
4. **Check what changed.** What command shows you the current state?
5. **Stage the file.** What command?
6. **Verify what's staged.** How do you check before committing?
7. **Commit.** Write your own message. Make it good.
8. **Verify the commit.** How do you confirm it worked?
9. **Push to GitHub.** This is a new branch — what's the full push command?
10. **Check GitHub.** Go to your repo page in the browser. Can you find your branch and commit?

Claude will watch and ask questions at each step, but won't type for you.

---

## Module 9: Emergency Situations (Practice Recovering)

These exercises simulate things going wrong, so you know what to do when there's no Claude around.

### Exercise 9.1 — Undo an edit you don't want

1. Edit any file. Add some nonsense text.
2. Run `git status` — confirm it shows as modified.
3. You don't want this change. What command throws it away?
4. Run it. Confirm the file is back to normal.

**Claude will ask:** That change is gone forever now. When is this safe to do? When is it NOT safe?

---

### Exercise 9.2 — Unstage a file

1. Edit a file. Stage it with `git add`.
2. Run `git status` — confirm it's green/staged.
3. Wait — you didn't mean to stage it yet. What command unstages it WITHOUT losing the edit?
4. Run it. Confirm it's back to red/unstaged.

**Claude will ask:** What's the difference between `git restore filename` and `git restore --staged filename`?

---

### Exercise 9.3 — Figure out what Claude did

1. Run `git log --oneline -10`
2. Pick a commit that Claude made (not yours).
3. Run `git show [hash]` with that commit's hash.
4. Read the output. What files did Claude change? What were the actual changes?

**Claude will ask you:** Why is this skill important? When would you use it in real life?

---

## Quick Reference Card

Keep this open in a tab. Use it until you don't need it anymore.

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
| Where does "origin" point? | `git remote -v` |

---

## Session 9 Plan

1. **You read nothing ahead of time.** Show up, open the terminal.
2. **We go through Modules 1–9 together.** You type, I ask questions, you answer.
3. **After the walkthrough, you take the exam** (separate document). No help from me.
4. **You tell me how it went.** What clicked, what didn't.
5. **Only then do we do any other work.**

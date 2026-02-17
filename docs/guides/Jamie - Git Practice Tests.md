# Git, GitHub & Codespaces — Exam

**Rules:**
- Do this AFTER the walkthrough lesson, not before.
- Do it yourself. Do NOT ask Claude for help. If you're stuck, look it up in the lesson guide — that's a valid strategy, not cheating.
- Write your answers in a scratch file or on paper BEFORE running any command to check.
- The point is to find out what you actually know vs. what you think you know.

---

## PART A: Conceptual Understanding (Written answers — no terminal needed)

These test whether you understand the **what/why/where**. Write your answers in plain English.

### A1. The Three Tools
**Question:** In your own words, explain the difference between Git, GitHub, and Codespaces. For each one, say:
- What it is
- Where it runs
- What would happen if it didn't exist (what problem would you have?)

---

### A2. Local vs. Remote
**Question:** Your Codespace has a copy of the code, and GitHub has a copy of the code.
- Are they always the same? Why or why not?
- If you make 3 commits in your Codespace but don't push, where do those commits exist? Where do they NOT exist?
- What happens if you delete your Codespace without pushing first?

---

### A3. The Three File States
**Question:** A file can be Modified, Staged, or Committed. In your own words:
- What does each state mean?
- Why does the "staged" state exist? Why not just go straight from modified to committed?
- Give a real example of when you'd want to stage only some of your changed files (not all of them).

---

### A4. Branches
**Question:** Explain branches using an analogy that makes sense to you (NOT the "parallel timeline" one from the lesson — come up with your own).
- Why do we use branches instead of just making changes directly on `main`?
- What's a Pull Request, and why don't we just merge branches directly?
- Who is the audience for a Pull Request in our project?

---

### A5. clasp vs. Git
**Question:** You run `clasp push` and then `git push`. What did each command do? Where did the code go in each case? If you only ran `clasp push` but forgot `git push`:
- Would the live Google Apps Script system have the new code?
- Would GitHub have the new code?
- What's the risk of this situation?

---

### A6. The Codespace Lifecycle
**Question:**
- What happens when you first open your Codespace for a new session? What does the `.devcontainer/devcontainer.json` file do?
- What's the difference between STOPPING a Codespace and DELETING it?
- If you forgot to push before deleting your Codespace, is your work gone forever? What if you forgot to push before STOPPING it?

---

### A7. .gitignore
**Question:**
- What is `.gitignore` and why does it exist?
- Name two types of files that should NEVER be committed to Git, and explain why for each.
- If a file is listed in `.gitignore`, will it show up when you run `git status`?

---

## PART B: Command Knowledge (Identify the right command — still no terminal)

For each situation, write the exact command(s) you would run. Don't look them up — try from memory first. Then check the lesson guide if you're stuck.

### B1.
You just opened your Codespace for a new session. What's the first Git command you should run, and why?

---

### B2.
You want to know if there are any uncommitted changes. What command?

---

### B3.
You edited `src/Code.gs` and want to see exactly what lines changed before staging. What command?

---

### B4.
You're happy with the changes in `src/Code.gs` and want to stage it for commit. What command?

---

### B5.
You staged `src/Code.gs` but now realize you also accidentally staged `docs/notes.md` that you didn't mean to include. How do you unstage just `docs/notes.md` without losing its changes?

---

### B6.
Everything is staged correctly. Write the commit command with a message about fixing the tag caching bug.

---

### B7.
Your commit is done. Now you want to send it to GitHub. What command?

---

### B8.
You want to see the last 8 commits in compact form. What command?

---

### B9.
You see a commit with hash `f4a2b1c` in the log and want to see exactly what it changed. What command?

---

### B10.
You want to start working on a new bug fix. You need to create a fresh branch from the latest `main`. Write the exact sequence of commands (there are 3).

---

### B11.
You want to see what branches exist locally AND on GitHub. What command?

---

### B12.
You changed a file but decided you don't want those changes at all — you want to throw them away and go back to the last committed version. What command? What's the danger?

---

### B13.
You want to compare everything on your current branch against `main` to see the total diff. What command?

---

### B14.
You just committed but the commit message has a typo. You haven't pushed yet. What command fixes this?

---

## PART C: Reading Output (Interpret what Git is telling you)

For each output below, explain in plain English what it means. What state is the project in? What should you do next?

### C1.
```
On branch claude/fix-tag-caching-abc123
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/Code.gs

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   docs/architecture/system-overview.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        docs/guides/new-file.md
```

**Questions:**
1. What branch are you on?
2. How many files have changes? What state is each one in?
3. If you run `git commit` right now, which file(s) will be included in the commit?
4. What happened to `docs/guides/new-file.md` and why is Git treating it differently?

---

### C2.
```
diff --git a/src/Code.gs b/src/Code.gs
index abc123..def456 100644
--- a/src/Code.gs
+++ b/src/Code.gs
@@ -342,7 +342,8 @@ function processArticle(row) {
   var title = sheet.getRange(row, 3).getValue();
-  var status = "Draft";
+  var status = "Pending Review";
+  var reviewer = "Jamie";
   var date = new Date();
```

**Questions:**
1. What file was changed?
2. Around what line number are the changes?
3. What was removed?
4. What was added?
5. How many lines were changed in total?

---

### C3.
```
e492747 Add Git lesson materials and update clasp status
df6d7ef Merge pull request #11 from JamieDR/claude/resume-session-Xuq9x
ab83c82 Add Session 8 developer log
c102bab Merge pull request #10
8f3a2d1 Fix tag caching bug that created duplicate WordPress tags
```

**Questions:**
1. What command produced this output?
2. Which is the most recent commit?
3. What do the "Merge pull request" entries mean? What happened there?
4. If something broke after the tag caching fix, which commit would you investigate?

---

### C4.
```
On branch main
Your branch is behind 'origin/main' by 3 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean
```

**Questions:**
1. Are there any uncommitted changes?
2. What does "behind by 3 commits" mean?
3. What should you do before making any new changes?
4. Where did those 3 commits come from if you didn't make them?

---

## PART D: Real Scenarios (What would you do? — no Claude available)

These simulate situations where you're on your own. For each one, describe the exact steps you'd take.

### D1. Start of Session
You open your Codespace for a new work session. Claude isn't available yet. Write the exact sequence of commands you'd run to get oriented:
- Confirm you're set up correctly
- See what branch you're on
- Check for any uncommitted work from last time
- Get the latest code from GitHub

---

### D2. Something Broke
You ran `clasp push` and now the Google Sheet menu doesn't work. You need to go back to the previous version. Claude isn't available. What do you do?

**Hint:** Think about what `git log` and `git show` can tell you, and what `clasp push` does.

---

### D3. Verify Claude's Work
Claude made 3 commits last session. You want to verify what was actually changed before starting new work. What commands would you run to:
1. See the list of recent commits
2. Look at the actual code changes in a specific commit
3. Compare the current state of the branch to `main`

---

### D4. Accidental Stage
You're working on two things at once (bad practice, but it happens). You modified `src/Code.gs` (bug fix) and `docs/architecture/system-overview.md` (documentation). You want to commit ONLY the bug fix. You accidentally ran `git add .` which staged both files. What do you do to fix this?

---

### D5. End of Session Checklist
You're about to close your Codespace for the day. Claude has gone to sleep. Write the sequence of commands you'd run to make sure nothing is lost.

---

### D6. Branch Confusion
You run `git status` and see you're on `claude/fix-something-xyz` but you need to be on `main` to start new work. You have NO uncommitted changes. What do you do?

---

### D7. The "Where Am I?" Diagnostic
You open your Codespace and something feels off — files look different than you expected, or a function you worked on isn't there. Write down a diagnostic sequence: what commands would you run to figure out where you are and what happened?

---

## PART E: GitHub Website (Do these in your browser at github.com)

### E1.
Go to your repo page on GitHub. Find and click on the commit history.
1. How many total commits does the project have?
2. Find the most recent commit by Claude. Click on it. What files were changed?
3. Can you see the green/red diff? What do the colors mean?

---

### E2.
Go back to the main repo page. Use the branch dropdown (says "main") to switch to a different branch.
1. What branch did you switch to?
2. Did the file list change? How can you tell you're on a different branch?
3. Switch back to `main`.

---

### E3.
Go to the "Pull requests" tab. Find a closed/merged PR.
1. What was the PR about? (Read the title and description.)
2. Click "Files changed." How many files were modified?
3. Who created the PR? Who merged it?

---

### E4.
Without using the browser, answer from memory:
1. Where on the GitHub website do you find the list of branches?
2. Where do you go to see a PR's code changes?
3. What's the difference between an "open" and "closed" PR?
4. Where on the website would you open your Codespace from?

---

## PART F: GitHub CLI (Do these in your Codespace terminal)

### F1.
Run the command to list all open Pull Requests. What command did you use? Are there any open?

---

### F2.
Run the command to view the details of a specific PR (pick any number from the closed list). What command did you use? What information did it show?

---

### F3.
Run the command to see the diff (code changes) of that same PR. What command did you use? Does the output look familiar?

---

### F4.
Run the command to list all issues. What command did you use?

---

### F5.
From memory (don't look it up): what command would you run to CREATE a new Pull Request from the terminal? What two pieces of information does it need?

---

### F6.
You finished a feature on a branch and want to get it into production. Put these steps in the correct order:
- Create a Pull Request
- Push the branch to GitHub
- Get the PR reviewed and approved
- Merge the PR into main
- Make commits on the branch

---

## PART G: Commit Message Workshop

For each scenario, write a good commit message. Then write a BAD one and explain why it's bad.

### G1.
You removed the function `purgeTagCacheFromScriptProperties()` because it was a one-time migration script that already ran and is now dead code.

**Good message:**
**Bad message:**
**Why the bad one is bad:**

---

### G2.
You found that column K in the Editorial sheet was being read from the wrong column index (D instead of E), causing article status data to be garbled.

**Good message:**
**Bad message:**
**Why the bad one is bad:**

---

### G3.
You added "Fig." and "No." to the period protection list in the sentence splitter so that abbreviations like "Fig. 1" and "No. 5" don't get treated as sentence endings.

**Good message:**
**Bad message:**
**Why the bad one is bad:**

---

### G4.
You created a new documentation file explaining how the image uploader lifecycle works.

**Good message:**
**Bad message:**
**Why the bad one is bad:**

---

### G5.
You updated the Claude project prompt to include MSN Lifestyle editorial guidelines that were previously only in a separate document.

**Good message:**
**Bad message:**
**Why the bad one is bad:**

---

## Scoring Guide

Be honest with yourself.

**Part A (Conceptual) — 7 questions:**
- Explained all 7 without looking anything up: you understand the system. Solid.
- Needed the lesson for 1-2: normal — re-read those sections.
- Needed it for 3+: the concepts need to settle. Go back through the interactive lesson modules.

**Part B (Commands) — 14 questions:**
- 12-14 from memory: ready to use Git independently.
- 8-11 from memory: almost there — keep the reference card nearby.
- Under 8: spend more time with the lesson. The commands will stick with practice.

**Part C (Reading Output) — 4 scenarios:**
- Explained all 4 outputs: you can read Git. This is the most important skill.
- Any confused you: go back to the lesson modules on status and diff, then look at the output again.

**Part D (Scenarios) — 7 scenarios:**
- Handled all 7 without Claude: you're independent. That's the goal.
- Needed to look things up: fine — you know where to look. Independence doesn't mean memorization.
- Any scenario stumped you completely: flag it for the next session. We'll walk through it.

**Part E (GitHub Website) — 4 exercises:**
- Found everything and could navigate: you know the visual side.
- Got lost or couldn't find things: spend 10 minutes clicking around the repo page. Familiarity comes from poking around.

**Part F (GitHub CLI) — 6 questions:**
- Got 5-6 right: you can do GitHub tasks from the terminal. Fast path.
- Got 3-4 right: review the `gh` reference card. The commands follow a predictable pattern.
- Under 3: this is the newest material — it's expected. Practice with `gh pr list` and `gh pr view` until they feel natural.

**Part G (Commit Messages) — 5 exercises:**
- "Good" messages followed the rules (verb, what, why, under 72 chars): good instincts.
- Compare your bad examples to the good ones. The difference should be obvious — if it isn't, re-read the commit message section.

---

## After You're Done

Tell Claude how it went next session. Be specific:
- Which parts were easy?
- Which parts tripped you up?
- Which scenarios felt scary or confusing?

That feedback goes into the developer log and determines what we focus on next. No judgment — the whole point is finding the gaps.

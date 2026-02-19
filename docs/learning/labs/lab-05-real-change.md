# Lab 05: Your First Real Change

You have practiced with throwaway files. Now you are going to make a real change to a real file in the project -- and push it through the full workflow. The change is small and safe (a date in a documentation file), but every step is identical to how production code changes work.

**Prerequisites:** Labs 01-04 complete. You should know terminal navigation, git add/commit, branching, pushing, and PRs.

---

## 1. The Plan

Here is what we are about to do:

1. Look at the project's real TODO list
2. Find something small and safe to change
3. Create a branch, make the edit, commit, push, open a PR
4. Close the PR (since this is practice)
5. Clean up

This is the exact same workflow Claude uses every session to make changes to your codebase. The only difference: we are changing a documentation file instead of production code. Once you do this, you can do it on any file.

**Why start with a docs file?** If you make a mistake editing `main.gs`, you could break the production system that 6 people use every day. If you make a mistake editing `TODO.md`, nothing breaks. Same skills, zero risk.

---

## 2. Read the Real TODO List

Let's look at the actual task list for this project. These are not practice tasks -- these are real changes waiting to be made.

**Type this:**

```
cat docs/TODO.md | head -40
```

**You should see:** The first 40 lines of the TODO file, starting with the title, an "Updated" date line, and the first several tasks organized by difficulty.

**What to notice:**

- Line 1: The title
- Line 3: `Organized easiest -> hardest for quick wins first. Updated Feb 15, 2026.`
- Below that: real tasks like changing a hex color, fixing HTML encoding, adjusting delete functions

These are actual changes that will be made to the codebase. You will work on tasks like these as you get more comfortable. For now, look at that date on line 3.

---

## 3. Pick Our Change

See that date? `Updated Feb 15, 2026.` That is when someone last updated this file. Today is not Feb 15. We are going to update it to today's date.

This is a real change:
- The file genuinely needs its date updated
- It is useful (anyone reading the TODO can see when it was last touched)
- It is tiny (one line, a few characters)
- It cannot break anything

**This is exactly how real work starts:** you look at the project, find something that needs doing, and do it.

---

## 4. Create a Branch

Every change gets its own branch. You know this from Labs 02 and 03.

**Type this:**

```
git checkout -b jamie/update-todo-date
```

**You should see:**

```
Switched to a new branch 'jamie/update-todo-date'
```

**What happened:** You created a branch with a descriptive name. Anyone reading the branch name knows exactly what this change is about. That is the point of good branch names.

**Check:**

```
git branch
```

You should see `jamie/update-todo-date` with an asterisk next to it.

---

## 5. Read the File First

Before editing anything, look at what you are about to change.

**Type this:**

```
head -5 docs/TODO.md
```

**You should see:**

```
# WIYS -- Pending Tasks

Organized easiest -> hardest for quick wins first. Updated Feb 15, 2026.

---
```

**What happened:** You confirmed the current state of the file before touching it. This is a habit worth building. Always know what you are changing and what it looks like right now.

**Note the date:** `Feb 15, 2026` -- that is what we are going to update.

---

## 6. Edit the File with nano

This is the first time you will use a text editor in the terminal. The editor is called `nano`. It is simple -- no tricks, no modes, no surprises.

**Type this:**

```
nano docs/TODO.md
```

**You should see:** The file opens in a full-screen editor. The file contents fill the screen. At the bottom, you see a bar with commands like `^O Write Out` and `^X Exit`. The `^` symbol means the Ctrl key.

**Here is how nano works:**

| Action | How to do it |
|---|---|
| Move around | Arrow keys (up, down, left, right) |
| Type text | Just type -- it inserts where your cursor is |
| Delete text | Backspace (delete to the left) or Delete key |
| Save the file | Ctrl+O, then press Enter to confirm the filename |
| Exit nano | Ctrl+X |

**Now do this:**

1. Use the arrow keys to move your cursor to line 3 -- the line that says `Updated Feb 15, 2026.`
2. Use the arrow keys to position your cursor on the `1` in `15`
3. Use Backspace or Delete to remove `Feb 15` (the old date)
4. Type today's date in the same format: `Feb 19` (or whatever today's date is)
5. Press **Ctrl+O** to save (you will see "File Name to Write: docs/TODO.md" at the bottom)
6. Press **Enter** to confirm the filename
7. Press **Ctrl+X** to exit nano

**You should be back at the terminal prompt.**

**If you mess up:** Press Ctrl+X. nano will ask "Save modified buffer?" Press `N` for No. You are back to the terminal with the file unchanged. Start over with `nano docs/TODO.md`.

**If nano feels unfamiliar:** That is normal. Terminal editors take a few tries. The key commands are at the bottom of the screen at all times -- you do not need to memorize them.

---

## 7. Verify Your Change

Before committing anything, verify that you changed exactly what you intended and nothing else.

**Type this:**

```
git diff
```

**You should see something like:**

```
diff --git a/docs/TODO.md b/docs/TODO.md
index abc1234..def5678 100644
--- a/docs/TODO.md
+++ b/docs/TODO.md
@@ -1,5 +1,5 @@
 # WIYS -- Pending Tasks

-Organized easiest -> hardest for quick wins first. Updated Feb 15, 2026.
+Organized easiest -> hardest for quick wins first. Updated Feb 19, 2026.

 ---
```

**What happened:** Git is showing you exactly what changed. The line starting with `-` (red) is the old version. The line starting with `+` (green) is the new version. Only the date is different.

**This is your safety check.** If you see more changes than you expected -- lines you did not mean to edit, extra whitespace, deleted content -- something went wrong. You would fix it before committing.

**Check:** Is the only difference the date? If yes, you are good. If something else changed, open nano again and fix it, then run `git diff` again.

---

## 8. Stage the Change

Mark the file as ready to commit.

**Type this:**

```
git add docs/TODO.md
```

**You should see:** Nothing. Silence means success.

**Check:**

```
git status
```

**You should see:**

```
On branch jamie/update-todo-date
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   docs/TODO.md
```

The file is staged (green) and ready to be committed.

---

## 9. Commit the Change

Save the snapshot with a clear message.

**Type this:**

```
git commit -m "Update TODO date to Feb 19, 2026"
```

**You should see:**

```
[jamie/update-todo-date xxxxxxx] Update TODO date to Feb 19, 2026
 1 file changed, 1 insertion(+), 1 deletion(-)
```

**What happened:** You saved a commit on your branch. The message says what you did. `1 insertion(+), 1 deletion(-)` means one line was removed (the old date) and one line was added (the new date). Git treats a changed line as a deletion plus an insertion.

**Check:**

```
git log --oneline -1
```

You should see your commit at the top.

---

## 10. Push to GitHub

Your commit only exists locally right now. Push it to GitHub.

**Type this:**

```
git push -u origin jamie/update-todo-date
```

**You should see:** Output showing objects being counted, compressed, and written, ending with something like:

```
remote: Create a pull request for 'jamie/update-todo-date' on GitHub by visiting:
remote:      https://github.com/JamieDR/WIYS-Refactoring_2026/pull/new/jamie/update-todo-date
remote:
To https://github.com/JamieDR/WIYS-Refactoring_2026.git
 * [new branch]      jamie/update-todo-date -> jamie/update-todo-date
branch 'jamie/update-todo-date' set up to track 'origin/jamie/update-todo-date'.
```

**What happened:** Your branch and its commit are now on GitHub. Anyone with access to the repo can see them.

---

## 11. Create a Pull Request

Open a PR just like Claude does every session.

**Type this:**

```
gh pr create --title "Update TODO date" --body "My first real change! Updated the TODO.md date to today."
```

**You should see:**

```
Creating pull request for jamie/update-todo-date into main in JamieDR/WIYS-Refactoring_2026

https://github.com/JamieDR/WIYS-Refactoring_2026/pull/XX
```

(Where `XX` is the PR number.)

**What happened:** You created a pull request on GitHub proposing to merge your change into `main`. This is exactly what Claude does when it finishes a task.

---

## 12. Look at It on GitHub

Open the PR URL from the previous step in your browser.

**What you should see:**

- **Title:** "Update TODO date"
- **Description:** "My first real change! Updated the TODO.md date to today."
- **Conversation tab:** Where discussion and review comments would go
- **Files changed tab:** Click this -- you will see the diff. One line removed (old date in red), one line added (new date in green). Exactly what `git diff` showed you in step 7.

**This is identical to what Claude's PRs look like.** The ones you have been reviewing and merging -- same structure, same diff view, same everything. Now you know what it takes to create one.

---

## 13. Close Without Merging

This was a practice run, so we will close the PR without merging.

**Type this:**

```
gh pr close --comment "Practice PR from Lab 05 - closing without merging"
```

**You should see:**

```
Closed pull request #XX
```

**What happened:** The PR is closed. The change was never applied to `main`.

**In a real workflow**, this step would be different. Instead of closing, you would:
- Ask Claude to review the PR, or
- Claude would ask you to review its PR, or
- You would merge it yourself if you are confident in the change

The review step is what keeps the codebase safe. Someone always looks at the diff before merging.

---

## 14. Clean Up

Delete the remote branch, switch back to master, and delete the local branch.

**Step 1 -- Delete the remote branch:**

```
git push origin --delete jamie/update-todo-date
```

**You should see:**

```
To https://github.com/JamieDR/WIYS-Refactoring_2026.git
 - [deleted]         jamie/update-todo-date
```

**Step 2 -- Switch to master:**

```
git checkout master
```

**You should see:**

```
Switched to branch 'master'
```

**Step 3 -- Delete the local branch:**

```
git branch -d jamie/update-todo-date
```

**You should see:**

```
Deleted branch jamie/update-todo-date (was xxxxxxx).
```

> If git says the branch "is not fully merged" and suggests `-D`, that is fine. Use `git branch -D jamie/update-todo-date` instead. This happens because we closed the PR without merging, so git is being cautious.

**Check:**

```
git branch
```

You should see `master` but NOT `jamie/update-todo-date`. Everything is cleaned up.

---

## 15. What Is Different About Production Code?

You just did the full workflow: branch, edit, commit, push, PR, close, clean up. When you make a change to production code (like `main.gs`), you follow the same steps. The workflow does not change. What changes is the level of care at each step.

| Step | Documentation file | Production code |
|---|---|---|
| Branch name | Descriptive is nice | Descriptive is essential -- follows the naming convention in CLAUDE.md |
| Commit message | Brief and clear | Specific about what changed and why |
| Before committing | Check the diff | Check the diff AND test that nothing broke |
| PR review | Optional for docs | Required -- someone reviews every change |
| After merging | Done | For Apps Script: run `clasp push` to deploy the new code to Google |

**The big takeaway:** The workflow is always the same. The rigor scales with the risk. A typo fix in a docs file gets a quick review. A change to a function that runs the upload pipeline gets careful testing and review.

---

## What You Learned

- [ ] How to read the project's real TODO list and identify a change to make
- [ ] How to open and edit a file using `nano` in the terminal
- [ ] nano basics: arrow keys to move, type to insert, Ctrl+O to save, Ctrl+X to exit
- [ ] How to verify your change with `git diff` before committing
- [ ] The full real-world workflow: branch, edit, diff, stage, commit, push, PR
- [ ] How to close a PR without merging using `gh pr close`
- [ ] How to clean up both remote and local branches after closing a PR
- [ ] The difference between documentation changes and production code changes (same workflow, different rigor)

You just went through the entire process that every developer follows to make changes to a codebase. Every change Claude makes to your project follows these same steps. The only thing left is to do it on real code -- and you are ready for that.

---

**Next:** [Lab 06](lab-06-reading-production-code.md) -- Reading and understanding production code

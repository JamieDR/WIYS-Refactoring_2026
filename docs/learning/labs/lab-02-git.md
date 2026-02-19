# Lab 02: Git — Hands-On Practice

You will learn to check what changed, save snapshots of your code, and work on a branch without affecting anyone else. Everything here happens in your real project, in the terminal.

**Prerequisite:** Complete Lab 01 (terminal basics). You should know `pwd`, `ls`, `cd`, and `cat`.

---

## 1. Why Git Exists

Git saves snapshots of your code so you can undo mistakes and go back to any previous version. It also lets you work on changes in a separate "branch" without breaking what's already working. Think of it as an unlimited undo system for your entire project.

---

## 2. Check the Current State with `git status`

`git status` tells you what files have changed since your last save. Run it now in a clean state so you can see what "nothing going on" looks like.

**Type this:**

```
git status
```

**You should see:**

```
On branch master
nothing to commit, working tree clean
```

**What happened:** Git checked all your files and found nothing has changed since the last commit (snapshot). "Working tree clean" means everything is saved and up to date.

> If you see a different branch name or some changed files, that is fine -- it means someone has been working. The important thing is you ran the command and read the output.

---

## 3. The 4 Places Your Code Lives

Before we start making changes, here is the big picture. Your code moves through four places:

```
 Your Files          Staging Area        Local Repo           GitHub
 (Working Dir)       (Ready to save)     (Saved snapshots)    (Cloud backup)
+---------------+   +---------------+   +---------------+   +---------------+
|               |   |               |   |               |   |               |
| You edit here | > | You mark what | > | You save a    | > | You upload    |
|               |   | to include    |   | snapshot here |   | it here       |
+---------------+   +---------------+   +---------------+   +---------------+
     git add -->         git commit -->       git push -->
```

- **Working Directory** -- your actual files, what you see and edit.
- **Staging Area** -- a holding zone where you mark which changes to include in your next snapshot.
- **Local Repo** -- saved snapshots (commits) on your machine.
- **GitHub** -- the cloud copy where your team can see the code.

---

## 4. Create a Practice Branch

A branch is a separate copy of the code where your changes will not affect anyone else. You will do all your practice on this branch.

**Type this:**

```
git checkout -b jamie/practice
```

**You should see:**

```
Switched to a new branch 'jamie/practice'
```

**What happened:** Git created a new branch called `jamie/practice` and switched you onto it. Everything you do from here stays on this branch until you switch away.

**Check:** Run `git status` to confirm.

```
git status
```

**You should see:**

```
On branch jamie/practice
nothing to commit, working tree clean
```

The first line now says `jamie/practice` instead of `master`. You are on your practice branch.

---

## 5. Make a Change

Now create a new file so Git has something to track.

**Type this:**

```
echo "This is Jamie's practice file" > docs/practice-file.txt
```

**You should see:** Nothing. The command succeeds silently. That is normal.

**What happened:** You created a new file called `practice-file.txt` inside the `docs/` folder with one line of text in it.

**Check:** Verify the file exists.

```
cat docs/practice-file.txt
```

**You should see:**

```
This is Jamie's practice file
```

---

## 6. See the Untracked File with `git status`

Now run `git status` again. Compare what you see to the clean state from Step 2.

**Type this:**

```
git status
```

**You should see:**

```
On branch jamie/practice
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        docs/practice-file.txt

nothing added to commit but untracked files present (use "git add" to track)
```

**What happened:** Git noticed a new file it has never seen before. "Untracked" means Git knows the file exists but is not tracking it yet. Notice the file name appears in red (if your terminal supports color).

**Compare:** In Step 2, `git status` said "nothing to commit, working tree clean." Now it shows an untracked file. The difference is the file you just created.

---

## 7. Stage the File with `git add`

Staging means "marking this file to be included in the next snapshot." It does not save anything yet -- it just puts the file in the ready-to-save pile.

**Type this:**

```
git add docs/practice-file.txt
```

**You should see:** Nothing. Silence means success.

**What happened:** Git moved your file from "untracked" to "staged." It is now in the staging area, ready to be saved.

---

## 8. See the Staged File with `git status`

**Type this:**

```
git status
```

**You should see:**

```
On branch jamie/practice
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   docs/practice-file.txt
```

**What happened:** The file moved from "Untracked files" (red) to "Changes to be committed" (green). That green color means it is staged and will be included in your next commit.

**Key difference to remember:**
- Red = changed but NOT staged (Git sees the change but will not save it yet)
- Green = staged and ready to be committed (will be included in the next snapshot)

---

## 9. See Changes with `git diff`

`git diff` shows you exactly what changed in your files, line by line. First, make another change to the file so there is something to diff.

**Type this:**

```
echo "Added a second line" >> docs/practice-file.txt
```

**What happened:** The `>>` appends text to the file (instead of `>` which overwrites). The file now has two lines.

**Now type this:**

```
git diff
```

**You should see something like:**

```
diff --git a/docs/practice-file.txt b/docs/practice-file.txt
index ...
--- a/docs/practice-file.txt
+++ b/docs/practice-file.txt
@@ -1 +1,2 @@
 This is Jamie's practice file
+Added a second line
```

**What happened:** Git shows the difference between what you staged and what you have now. Lines starting with `+` are new additions (shown in green). Lines starting with `-` would be deletions (shown in red). This is how you check exactly what changed before you save.

**Now try:** Run `git status` and notice the file appears twice -- once in green (the first line you already staged) and once in red (the second line you just added but have not staged yet).

```
git status
```

---

## 10. Stage the Updated File

Stage the file again to include the second line in your snapshot.

**Type this:**

```
git add docs/practice-file.txt
```

**You should see:** Silence.

**Check:**

```
git status
```

**You should see:** The file appears only in green now under "Changes to be committed." Both lines are staged.

---

## 11. Save a Snapshot with `git commit`

A commit saves a permanent snapshot of everything in the staging area, with a description you write.

**Type this:**

```
git commit -m "Add practice file for learning"
```

**You should see something like:**

```
[jamie/practice abc1234] Add practice file for learning
 1 file changed, 2 insertions(+)
 create mode 100644 docs/practice-file.txt
```

**What happened:** Git saved a snapshot containing your staged file. The message "Add practice file for learning" is the description you attached to this snapshot. `1 file changed, 2 insertions(+)` tells you one file was saved and two lines were added. The staging area is now empty again.

**Check:**

```
git status
```

**You should see:**

```
On branch jamie/practice
nothing to commit, working tree clean
```

Clean again. Everything is saved.

---

## 12. See Your History with `git log`

`git log` shows the list of commits (snapshots) that have been saved.

**Type this:**

```
git log -3
```

**You should see something like:**

```
commit abc1234def5678... (HEAD -> jamie/practice)
Author: ...
Date:   ...

    Add practice file for learning

commit 9876543...
Author: ...
Date:   ...

    (some earlier commit message)
```

**What happened:** Git showed you the most recent 3 commits. Your commit is at the top. Notice three things:
- **The hash** (that long string of letters and numbers) -- this is the unique ID for this snapshot
- **The commit message** -- "Add practice file for learning" -- the description you wrote
- **The author and date** -- who made the commit and when

Press `q` to exit the log if it fills the screen.

---

## 13. Do the Cycle Again (Muscle Memory)

Repetition makes this stick. Go through the full cycle one more time: edit, stage, commit.

**Step A -- Edit the file:**

```
echo "Third line - practicing the git cycle" >> docs/practice-file.txt
```

**Step B -- Check what changed:**

```
git status
```

You should see `docs/practice-file.txt` in red under "Changes not staged for commit."

**Step C -- Stage it:**

```
git add docs/practice-file.txt
```

**Step D -- Check that it is staged:**

```
git status
```

You should see it in green under "Changes to be committed."

**Step E -- Commit it:**

```
git commit -m "Add third line to practice file"
```

You should see `1 file changed, 1 insertion(+)`.

**Check:** Run `git status` one more time. It should say "nothing to commit, working tree clean." If it does, you just completed the full git cycle twice. That is the core workflow.

---

## 14. Compact History with `git log --oneline`

`git log --oneline` shows a shorter view -- one line per commit.

**Type this:**

```
git log --oneline -5
```

**You should see something like:**

```
def5678 Add third line to practice file
abc1234 Add practice file for learning
8901abc (some earlier commit)
5678def (some earlier commit)
2345ghi (some earlier commit)
```

**What happened:** Each line is one commit. The short hash is on the left, the message is on the right. Your two practice commits are at the top. Count them -- you made two snapshots today.

---

## 15. Switch Between Branches

Now see what branches actually do. Switch back to `master` and watch what happens to your practice file.

**Type this:**

```
git checkout master
```

**You should see:**

```
Switched to branch 'master'
```

**Now check if your file is still there:**

```
cat docs/practice-file.txt
```

**You should see:**

```
cat: docs/practice-file.txt: No such file or directory
```

**What happened:** The file is gone. It does not exist on the `master` branch. Your practice file and your commits only live on the `jamie/practice` branch. The `master` branch is exactly how it was before you started.

**Now switch back:**

```
git checkout jamie/practice
```

**Check that the file is back:**

```
cat docs/practice-file.txt
```

**You should see:**

```
This is Jamie's practice file
Added a second line
Third line - practicing the git cycle
```

**What happened:** Your file reappeared because you switched back to the branch where it exists. This is the power of branches -- you can have completely different versions of your project and jump between them. The `master` branch was never affected by anything you did.

---

## 16. Clean Up -- Delete the Practice Branch

You are done practicing. Time to clean up. First, switch back to `master` (you cannot delete a branch while you are on it).

**Type this:**

```
git checkout master
```

**You should see:**

```
Switched to branch 'master'
```

**Now delete the practice branch:**

```
git branch -d jamie/practice
```

**You should see:**

```
Deleted branch jamie/practice (was def5678).
```

**What happened:** The practice branch and all its commits are gone. The `master` branch is untouched. You created a safe space, did your work, and cleaned up after yourself. That is exactly how branches are used in real projects.

**Check:** Confirm you are on `master` with a clean state.

```
git status
```

**You should see:**

```
On branch master
nothing to commit, working tree clean
```

Back to where you started. No trace of the practice branch.

> **Note:** If you see a message like "error: The branch 'jamie/practice' is not fully merged" followed by a suggestion to use `-D` instead of `-d`, go ahead and type `git branch -D jamie/practice`. This happens because we did not merge the branch into master (we were just practicing), and Git is being cautious. The capital `-D` means "I know it is not merged, delete it anyway."

---

## What You Learned

- [ ] `git status` -- see what has changed (clean state vs. untracked vs. staged)
- [ ] The 4 places code lives: working directory, staging area, local repo, GitHub
- [ ] `git checkout -b branch-name` -- create and switch to a new branch
- [ ] `git add filename` -- stage a file (mark it to be saved)
- [ ] `git diff` -- see exactly what changed, line by line
- [ ] `git commit -m "message"` -- save a snapshot with a description
- [ ] `git log` and `git log --oneline` -- see your commit history
- [ ] `git checkout branch-name` -- switch between branches
- [ ] `git branch -d branch-name` -- delete a branch you are done with
- [ ] The full cycle: edit, status, add, status, commit -- and repeat

---

Next up: [Lab 03](lab-03-github.md) -- pushing to GitHub, pull requests, and working with remotes.

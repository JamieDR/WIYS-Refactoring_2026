# Lab 03: Push, Pull Requests, and the GitHub Workflow

You have been watching Claude do this exact workflow every single session -- create a branch, push it, open a PR, merge it. Now you are going to do it yourself, for real, on your actual repo.

**Prerequisites:** Lab 01 (terminal basics), Lab 02 (git basics). You need to be in your Codespace with a terminal open at `/home/user/WIYS-Refactoring_2026`.

---

## 1. Local vs Remote

Your Codespace has a copy of the code with its own git history. GitHub.com also has a copy. These are two separate places. `git push` copies your commits from your Codespace up to GitHub so other people (and the GitHub website) can see them.

**Type this:**

```
git remote -v
```

**You should see:**

```
origin  https://github.com/JamieDR/WIYS-Refactoring_2026.git (fetch)
origin  https://github.com/JamieDR/WIYS-Refactoring_2026.git (push)
```

**What happened:** Git is showing you the "remote" -- the online location your Codespace is connected to. The word `origin` is just a nickname for that GitHub URL. Every time you see `origin` in a git command, it means "the GitHub copy."

---

## 2. Create a Practice Branch

Before making changes, you always create a branch. You know this from Lab 02 -- branches let you work without touching the real code.

**Type this:**

```
git checkout -b jamie/github-practice
```

**You should see:**

```
Switched to a new branch 'jamie/github-practice'
```

**What happened:** You created a new branch called `jamie/github-practice` and switched to it. Any commits you make now go on this branch, not on `master`.

**Check:** Confirm you are on the right branch.

```
git branch
```

You should see `jamie/github-practice` with an asterisk next to it, meaning that is your current branch.

---

## 3. Make a Change

You need something to commit. Let's create a small file.

**Type this:**

```
echo "Jamie was here. Learning GitHub workflows." > docs/jamie-was-here.txt
```

**You should see:** Nothing. The command succeeded silently.

**What happened:** You created a new file called `jamie-was-here.txt` inside the `docs/` folder with one line of text in it.

**Check:** Verify the file exists.

```
cat docs/jamie-was-here.txt
```

You should see: `Jamie was here. Learning GitHub workflows.`

---

## 4. Stage and Commit

You know this from Lab 02. Stage the file, then commit it.

**Type this:**

```
git add docs/jamie-was-here.txt
```

**You should see:** Nothing (silence means success).

**Now type this:**

```
git commit -m "Add practice file for GitHub workflow lab"
```

**You should see:**

```
[jamie/github-practice xxxxxxx] Add practice file for GitHub workflow lab
 1 file changed, 1 insertion(+)
 create mode 100644 docs/jamie-was-here.txt
```

**What happened:** You staged the file and saved a snapshot (commit) on your local branch. This commit only exists in your Codespace right now. GitHub does not know about it yet.

**Check:**

```
git log --oneline -1
```

You should see your commit message at the top.

---

## 5. Push to GitHub

This is the new part. Right now your commit is only in your Codespace. `git push` sends it to GitHub.

**Type this:**

```
git push -u origin jamie/github-practice
```

**You should see something like:**

```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 365 bytes | 365.00 KiB/s, done.
Total 4 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
remote:
remote: Create a pull request for 'jamie/github-practice' on GitHub by visiting:
remote:      https://github.com/JamieDR/WIYS-Refactoring_2026/pull/new/jamie/github-practice
remote:
To https://github.com/JamieDR/WIYS-Refactoring_2026.git
 * [new branch]      jamie/github-practice -> jamie/github-practice
branch 'jamie/github-practice' set up to track 'origin/jamie/github-practice'.
```

**What happened:** Your commit traveled from your Codespace to GitHub. Let's break down the command:

- `git push` -- upload commits to the remote
- `-u` -- "remember this connection." Next time you can just type `git push` without all the extra words
- `origin` -- the nickname for GitHub (you saw this in step 1)
- `jamie/github-practice` -- which branch to push

**Check:** The output says `[new branch]` -- that means GitHub now has your branch.

---

## 6. See It on GitHub

Now go see what you just did in a browser.

**Do this:**

1. Open your browser and go to: **https://github.com/JamieDR/WIYS-Refactoring_2026**
2. Near the top left, you will see a dropdown that says `main`. Click it.
3. You should see `jamie/github-practice` in the list. Click it.
4. The page now shows your branch's version of the code. Navigate into the `docs/` folder.
5. You should see `jamie-was-here.txt` in the file list. Click it.
6. You should see the text: "Jamie was here. Learning GitHub workflows."

**What happened:** You are looking at the file you created in your Codespace, but now it is on GitHub. The push worked. Anyone with access to this repo can now see your branch and your file.

**Check:** If you can see `jamie-was-here.txt` with your text inside it on GitHub, you did it right.

---

## 7. Create a Pull Request from the Terminal

A pull request (PR) says: "Hey, I have changes on my branch. I want to merge them into the main code." You have seen Claude do this every session. Now you do it.

**Type this:**

```
gh pr create --title "Jamie's practice PR" --body "Learning how PRs work"
```

**You should see something like:**

```
Creating pull request for jamie/github-practice into main in JamieDR/WIYS-Refactoring_2026

https://github.com/JamieDR/WIYS-Refactoring_2026/pull/XX
```

(Where `XX` is a number -- every PR gets a number.)

**What happened:** The `gh` command is GitHub's official command-line tool. It created a pull request on GitHub without you needing to open a browser. The PR is asking to merge your `jamie/github-practice` branch into `main`.

**Check:** The command printed a URL. Copy it -- you will need it in the next step.

**Now try:** See all your open PRs from the terminal.

```
gh pr list
```

You should see your practice PR in the list.

---

## 8. Look at the PR on GitHub

Open the URL from step 7 in your browser. Take a minute to look around. Here is what you are seeing:

**The title and description:** "Jamie's practice PR" and "Learning how PRs work" -- exactly what you typed in the command.

**The "Conversation" tab:** This is where discussion happens. Reviewers leave comments here. For your real work, this is where Claude explains what changed.

**Click the "Files changed" tab.** This is the most important part. You will see:

- The file name: `docs/jamie-was-here.txt`
- Green lines with a `+` sign: these are lines you added
- The text "Jamie was here. Learning GitHub workflows." highlighted in green

Green means added. Red means removed. This is called a "diff" -- it shows exactly what the PR would change if merged.

**What happened:** You are looking at the same PR that Claude creates every session. The title, the description, the diff -- this is what you review before clicking merge.

**Check:** Can you see the green lines showing your added file? That is the diff.

---

## 9. Add Another Commit to the Same PR

Here is something important: a PR is not a single commit. It is a branch. If you push more commits to the same branch, they automatically show up in the PR.

**Type this:**

```
echo "Added a second line during Lab 03." >> docs/jamie-was-here.txt
```

**What happened:** The `>>` appends text to the file (instead of `>` which would overwrite it). Your file now has two lines.

**Now stage, commit, and push:**

```
git add docs/jamie-was-here.txt
git commit -m "Add second line to practice file"
git push
```

Notice you only typed `git push` this time -- no `-u origin jamie/github-practice`. The `-u` from earlier told git to remember the connection, so now a simple `git push` knows where to go.

**You should see:** The push output, similar to before.

**Now go back to your PR in the browser and refresh the page.**

You should see:
- The new commit "Add second line to practice file" appears in the conversation tab
- The "Files changed" tab now shows both lines of the file

**What happened:** The PR automatically updated because it tracks the branch. Any new commits you push to `jamie/github-practice` show up in the PR. This is how Claude adds changes to an existing PR during a session.

**Check:** Refresh the PR page. You should see 2 commits listed.

---

## 10. Close the PR Without Merging

This was practice, so we do not actually want to merge this into the real codebase. There are two ways to end a PR:

- **Merge** -- apply the changes to `main`. The code becomes part of the official codebase.
- **Close** -- nevermind, throw it away. The code on the branch still exists but never gets merged.

**Type this:**

```
gh pr close --comment "Practice PR - closing without merging"
```

**You should see:**

```
Closed pull request #XX
```

**What happened:** The PR is now closed. If you refresh the PR page in your browser, you will see it says "Closed" in purple. The changes were never merged into `main`. The practice file does not exist on the `main` branch.

**Check:** Go to the PR page in your browser. It should say "Closed" and NOT "Merged."

---

## 11. Delete the Remote Branch

The PR is closed, but the branch `jamie/github-practice` still exists on GitHub. Clean up after yourself.

**Type this:**

```
git push origin --delete jamie/github-practice
```

**You should see:**

```
To https://github.com/JamieDR/WIYS-Refactoring_2026.git
 - [deleted]         jamie/github-practice
```

**What happened:** You told GitHub to delete the remote copy of the branch. It is gone from the GitHub website now.

**Check:** Go to https://github.com/JamieDR/WIYS-Refactoring_2026 and click the branch dropdown. `jamie/github-practice` should no longer be in the list.

---

## 12. Delete the Local Branch

The remote branch is gone, but you still have the branch in your Codespace. Let's clean that up too.

**First, switch back to master:**

```
git checkout master
```

**You should see:**

```
Switched to branch 'master'
```

**Now delete the practice branch:**

```
git branch -d jamie/github-practice
```

**You should see:**

```
Deleted branch jamie/github-practice (was xxxxxxx).
```

**What happened:** You deleted the local copy of the branch. You had to switch off it first -- git will not let you delete the branch you are currently on (like trying to pick up the rug you are standing on).

**Check:**

```
git branch
```

You should see `master` (and possibly other branches), but NOT `jamie/github-practice`. It is fully cleaned up, both locally and on GitHub.

---

## 13. The Full Picture

Here is the complete workflow you just did. This is the same workflow Claude does every session when making changes to your codebase:

```
 You (in Codespace)                          GitHub (website)
 ==================                          ================

 1. git checkout -b branch-name
    Create a branch to work on

 2. Edit files
    Make your changes

 3. git add <files>
    Stage changes for commit

 4. git commit -m "message"
    Save a snapshot locally

 5. git push -u origin branch-name  -------> Branch appears on GitHub
    Upload to GitHub

 6. gh pr create                    -------> PR appears on GitHub
    Open a pull request

                                             7. Review the PR
                                             Look at the diff, discuss

                                             8. Merge (or close)
                                             Apply changes to main

 9. git push origin --delete branch -------> Branch removed from GitHub
    Clean up remote branch

10. git checkout master
    git branch -d branch-name
    Clean up local branch
```

**Every time you see Claude run commands in a session, this is what is happening.** Now you know what each step does and why.

---

## What You Learned

- [ ] `git push` sends your local commits to GitHub
- [ ] `origin` is the nickname for your GitHub remote
- [ ] `-u` tells git to remember the branch connection for future pushes
- [ ] You can verify your push worked by checking the branch on GitHub.com
- [ ] `gh pr create` opens a pull request from the terminal
- [ ] A PR shows the diff -- green lines are additions, red lines are removals
- [ ] Pushing more commits to the same branch updates the PR automatically
- [ ] Closing a PR means "nevermind." Merging means "apply these changes."
- [ ] `git push origin --delete` removes a remote branch
- [ ] `git branch -d` removes a local branch (switch off it first)
- [ ] The full workflow: Edit, Stage, Commit, Push, PR, Review, Merge, Clean up

---

**Next:** [Lab 04](lab-04-reading-code.md) -- Reading and understanding code (diffs, git log, blame)

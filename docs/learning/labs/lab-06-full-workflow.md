# Lab 06: The Full Workflow — Solo

You have learned the terminal, git, GitHub, reading code, diffs, and navigation across five labs. This is the graduation exercise. You are going to do the complete developer workflow from start to finish, on a real change, with minimal hand-holding.

The change is small and useful: adding a "Last reviewed" date to the bottom of CLAUDE.md. But the workflow is the real thing — the same sequence you have watched Claude do in every single session.

**Prerequisites:** Labs 01-05 completed. Terminal open at `/home/user/WIYS-Refactoring_2026`.

---

## Part 1: The Challenge

Here is what you are going to do:

1. Start from a clean `master` branch
2. Create a new branch with a good name
3. Edit CLAUDE.md to add a "Last reviewed" line at the very bottom
4. Check your change
5. Stage it
6. Commit it with a clear message
7. Push it to GitHub
8. Create a pull request with a proper title and description
9. Verify the PR looks right on GitHub
10. Close the practice PR and clean up after yourself

Ten steps. You have done every single one of these before, in earlier labs. The difference: this time, the instructions do not spell out the commands for you. You recall them. If you get stuck, open the hint.

---

## Part 2: Do It Yourself

### Step 1: Get to a clean starting point

Switch to `master` and pull the latest code from GitHub. You want to start from a known-good state.

Try it from memory first.

<details>
<summary>Hint</summary>

```
git checkout master && git pull origin main
```

After this, `git status` should say "nothing to commit, working tree clean."

</details>

**Check:** You should be on `master` with no uncommitted changes.

---

### Step 2: Create your branch

Pick a descriptive name. The branch naming convention in this project is `jamie/<short-description>`. The name should make the change obvious at a glance.

<details>
<summary>Hint</summary>

```
git checkout -b jamie/add-reviewed-date
```

</details>

**Check:** `git branch` should show your new branch with an asterisk next to it.

---

### Step 3: Make the change

Open CLAUDE.md and add this line at the very bottom of the file:

```
Last reviewed: 2026-02-19
```

Use whatever editor you are comfortable with.

<details>
<summary>Hint</summary>

```
nano CLAUDE.md
```

Scroll to the bottom (Ctrl+End or hold the down arrow), add the line, then save (Ctrl+O, Enter) and exit (Ctrl+X).

Or, if you prefer a one-liner:

```
echo "" >> CLAUDE.md && echo "Last reviewed: 2026-02-19" >> CLAUDE.md
```

</details>

**Check:** `tail -3 CLAUDE.md` should show your new line at the bottom.

---

### Step 4: Check what changed

Look at the diff to make sure you only changed what you intended to change. Nothing more, nothing less.

<details>
<summary>Hint</summary>

```
git diff
```

You should see one or two green lines (the blank line and the "Last reviewed" line) and nothing else.

</details>

**Check:** The diff shows only your addition at the bottom of CLAUDE.md. No accidental changes anywhere else.

---

### Step 5: Stage the change

Add the changed file to the staging area.

<details>
<summary>Hint</summary>

```
git add CLAUDE.md
```

Then run `git status` to confirm the file is green under "Changes to be committed."

</details>

**Check:** `git status` shows CLAUDE.md in green. Nothing else is staged.

---

### Step 6: Commit with a good message

Write a commit message that explains *what* you did. Keep it short and clear.

<details>
<summary>Hint</summary>

```
git commit -m "Add last-reviewed date to CLAUDE.md"
```

</details>

**Check:** The output says `1 file changed` and your commit message appears in `git log --oneline -1`.

---

### Step 7: Push to GitHub

Send your branch and commit to the remote.

<details>
<summary>Hint</summary>

```
git push -u origin jamie/add-reviewed-date
```

</details>

**Check:** The output says `[new branch]` and shows your branch name. No errors.

---

### Step 8: Create a pull request

Use the `gh` command to create a PR. Give it a proper title (short, describes the change) and a body that explains why the change is useful.

<details>
<summary>Hint</summary>

```
gh pr create --title "Add last-reviewed date to CLAUDE.md" --body "Adds a 'Last reviewed' date at the bottom of CLAUDE.md so we can track when the briefing document was last checked for accuracy."
```

</details>

**Check:** The command prints a URL. Copy it.

---

### Step 9: Verify on GitHub

Open the PR URL in your browser. Look at three things:

1. **The title and description** -- do they make sense?
2. **The "Files changed" tab** -- does the diff show only the line you added?
3. **The base branch** -- the PR should be merging into `main`

This is what you do every time Claude opens a PR for you. Now you know exactly what you are looking at.

---

### Step 10: Close the PR and clean up

This was practice, so close the PR without merging. Then delete the remote branch, switch back to master, and delete the local branch.

Four commands. Try them all from memory.

<details>
<summary>Hint</summary>

```
gh pr close --comment "Practice PR for Lab 06 - closing without merging"
```

```
git push origin --delete jamie/add-reviewed-date
```

```
git checkout master
```

```
git branch -D jamie/add-reviewed-date
```

</details>

**Check:** `git branch` shows only `master`. `gh pr list` does not show your PR. Everything is clean.

---

## Part 3: What Claude Does That You Just Did

Every session, you watch Claude run commands in the terminal. Here is the mapping between what you just did and what Claude does:

| When Claude says...                          | That is...     |
|----------------------------------------------|----------------|
| "Let me create a branch for this"            | **Step 2** -- `git checkout -b claude/some-branch-name` |
| "I'll make the change now"                   | **Step 3** -- editing the file |
| "Let me verify the diff"                     | **Step 4** -- `git diff` to check only the intended change was made |
| "I'll commit this"                           | **Steps 5-6** -- `git add` then `git commit` |
| "Pushing to GitHub"                          | **Step 7** -- `git push` |
| A PR link appears for you to review          | **Step 8** -- `gh pr create` |
| "You can review the PR at this URL"          | **Step 9** -- Claude is asking you to do what you just did: check the diff |
| After you merge, Claude cleans up            | **Step 10** -- deleting the branch |

Nothing mysterious. Nothing hidden. The same ten steps, every time.

---

## Part 4: Graduation Checklist

Check off what you can now do. Be honest with yourself -- if something feels shaky, go back and redo that lab.

**Terminal (Lab 01):**
- [ ] Navigate the file system with `pwd`, `ls`, `cd`
- [ ] Read files with `cat` and `head`
- [ ] Use tab completion and command history

**Git basics (Lab 02):**
- [ ] Check the state of the repo with `git status`
- [ ] Stage files with `git add`
- [ ] Commit snapshots with `git commit`
- [ ] View history with `git log`
- [ ] Create and switch branches

**GitHub workflow (Lab 03):**
- [ ] Push branches to GitHub
- [ ] Create pull requests from the terminal
- [ ] Read a PR diff on GitHub
- [ ] Close PRs and clean up branches (local and remote)

**Reading code (Labs 04-05):**
- [ ] Read a diff and understand what changed
- [ ] Use `git log` and `git blame` to understand history
- [ ] Read JavaScript syntax well enough to follow what a function does
- [ ] Navigate unfamiliar code by searching for function names

**The full workflow (this lab):**
- [ ] Execute the complete branch-to-PR cycle without step-by-step instructions
- [ ] Understand what Claude is doing when you see terminal commands in a session

---

## Part 5: What Comes Next

You are not a passenger anymore. Here is what this unlocks for you.

**Reviewing Claude's PRs with real understanding.**
When Claude opens a PR and says "you can review this at [URL]," you now know exactly what to look at. The "Files changed" tab is the diff. Green lines are additions, red lines are removals. You can read the code, understand the changes, and ask informed questions before clicking merge.

**Making small changes yourself.**
Documentation fixes, config values, simple text changes -- you can do these with the exact workflow you just practiced. Create a branch, make the edit, commit, push, PR. You do not need Claude for everything anymore.

**Production code changes (with one extra step).**
For changes to the actual Apps Script code in `src/main.gs`, the workflow is the same with one addition: before merging, test the change by running `clasp push` to deploy it to the Apps Script environment and verify it works. The git workflow is identical -- you just add a verification step.

**The reference docs are useful now.**
The files at `docs/learning/terminal-and-git.md` and `docs/learning/javascript-syntax-basics.md` were written as reference material. Before the labs, they were just words on a page. Now you have the hands-on context to actually use them as lookup references when you need to remember a specific command or syntax.

---

You went from watching Claude run commands to running them yourself. That is a real skill that you built by doing, not by reading. Every professional developer learned the same way -- by typing commands, making mistakes, and building muscle memory.

The workflow never changes. Branch, edit, stage, commit, push, PR, review, merge, clean up. Whether it is a one-line documentation fix or a 500-line feature, the steps are the same. You know them now.

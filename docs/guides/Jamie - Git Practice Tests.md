# Git Practice Tests

**Rules:**
- Do these AFTER the walkthrough, not before.
- Do them yourself. Don't ask Claude for help. If you're stuck, look it up in the lesson guide.
- Say your answers out loud or type them in a scratch file before running the command to check.
- The point isn't to get them all right — it's to find out what you actually know vs. what you think you know.

---

## Test 1: Reading Comprehension (No typing — just read and answer)

Run each command, then answer the question **before moving to the next one.**

### 1a.
```bash
git status
```
**Question:** Are there any uncommitted changes right now? How do you know?

---

### 1b.
```bash
git log --oneline -5
```
**Question:** What was the most recent commit about? Who made it?

---

### 1c.
```bash
git branch
```
**Question:** What branch are you on? Are there other branches listed?

---

### 1d.
```bash
git log --oneline -10
```
**Question:** Pick any commit from the list. Based on the message alone, can you tell what it changed? If the message is unclear, what would a better message be?

---

## Test 2: Predict Before You Run

For each scenario, **write down what you think the output will look like BEFORE you run the command.** Then run it and compare.

### 2a.
You haven't changed anything since the last commit.
**Predict:** What will `git status` say?
**Now run it.** Were you right?

---

### 2b.
Open the file `docs/guides/Jamie - Git Essentials Lesson.md` in the editor. Add a blank line at the very bottom. Save the file. Don't do anything else.

**Predict:** What will `git status` say now? Will the file be red or green?
**Now run `git status`.** Were you right?

---

### 2c.
**Predict:** What will `git diff` show? Describe it before you run it.
**Now run `git diff`.** Were you right?

---

### 2d.
Now run:
```bash
git add "docs/guides/Jamie - Git Essentials Lesson.md"
```
**Predict:** What will `git status` say now? What color will the file be?
**Now run `git status`.** Were you right?

---

### 2e.
**Predict:** If you run `git diff` now, will it show anything? Why or why not?
**Now run `git diff`.** Were you right?

**Follow-up:** What command would show you the staged changes instead?

---

## Test 3: Do It Yourself (Full workflow, no hand-holding)

Complete each task using only Git commands. Check your work after each step.

### 3a. The full commit cycle
1. Create a new file: `docs/guides/jamie-test-file.md` with any content you want (even just "hello")
2. Check the status — confirm Git sees the new file
3. Stage the file
4. Check the status again — confirm it's staged
5. Commit with a meaningful message
6. Check the log — confirm your commit is at the top
7. Delete the test file and commit that deletion:
   ```bash
   rm docs/guides/jamie-test-file.md
   git add docs/guides/jamie-test-file.md
   git commit -m "Remove test file after Git practice"
   ```

---

### 3b. Unstage a file
1. Open `docs/guides/Jamie - Git Essentials Lesson.md` and add a comment at the bottom: `<!-- Jamie was here -->`
2. Stage it with `git add`
3. Check status — confirm it's green/staged
4. Now **unstage it** (undo the `git add`, without losing the edit)
5. Check status — confirm it's back to red/unstaged
6. Undo the edit itself: `git restore "docs/guides/Jamie - Git Essentials Lesson.md"` (this throws away the change)
7. Check status — confirm everything is clean

---

### 3c. Branch operations
1. Make sure you're on `main` (switch if you're not)
2. Pull the latest from GitHub
3. Create a new branch called `jamie/git-practice`
4. Confirm you're on the new branch
5. Switch back to `main`
6. Confirm you're back on `main`
7. Delete the practice branch: `git branch -d jamie/git-practice`

---

## Test 4: Troubleshooting Scenarios

These are "what would you do" questions. Think through the answer, then check with Claude.

### 4a.
You just ran `git commit -m "Fix bug"` but realize the message is bad. You haven't pushed yet. What do you do?

*(Hint: look up `git commit --amend`)*

---

### 4b.
You staged a file by accident (`git add secrets.env`). You haven't committed yet. How do you unstage it without losing the file?

---

### 4c.
You run `git status` and see a file in red that you didn't change. What's your first step to figure out what happened?

---

### 4d.
You try to `git pull` and get a message about "merge conflicts." What does this mean in plain English?

*(Don't try to resolve one yet — just explain what's happening.)*

---

## Scoring

This isn't graded. But be honest with yourself:

- **Tests 1 & 2:** If you got most predictions right, you understand the model. If not, re-read the lesson — the concepts aren't solid yet.
- **Test 3:** If you completed all tasks without looking anything up, you're ready to use Git independently. If you needed the guide, that's fine — you know where to find the answers.
- **Test 4:** If you could reason through these, you're building real troubleshooting instinct. If not, no problem — these are the kind of things you learn by hitting them in real situations.

---

## After You're Done

Tell Claude how it went. Be specific about what was confusing. That feedback goes into the developer log and shapes what we focus on next.

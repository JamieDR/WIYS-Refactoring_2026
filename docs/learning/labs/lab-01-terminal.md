# Lab 01: Terminal Basics

You will learn to navigate your project's files using the terminal. Every concept has a hands-on exercise -- you type something, you see something, you understand something. Open your Codespace terminal (the panel at the bottom of the screen) and let's go.

---

## 1. What Is a Terminal?

The terminal is the text panel at the bottom of your Codespace. Instead of clicking folders and files in the sidebar, you type short commands and press Enter. The computer types back the answer. That is the entire concept.

**Type this:**

```
echo "hello terminal"
```

**You should see:**

```
hello terminal
```

**What happened:** You told the computer to print the words "hello terminal" back to you. `echo` just means "repeat this back to me." Not useful on its own, but it proves the terminal is listening.

---

## 2. pwd -- Where Am I?

`pwd` stands for "print working directory." A directory is just a folder. This command tells you which folder you are currently sitting in.

**Type this:**

```
pwd
```

**You should see:**

```
/home/user/WIYS-Refactoring_2026
```

**What happened:** The terminal told you your current location. `/home/user/WIYS-Refactoring_2026` is the full path to your project folder -- like a street address for where you are in the file system.

**Check:** If your output matches the path above, you are in the right place. If it shows something different, type `cd /home/user/WIYS-Refactoring_2026` and try `pwd` again.

---

## 3. ls -- What's in This Folder?

`ls` stands for "list." It shows you the files and folders in your current location.

**Type this:**

```
ls
```

**You should see something like:**

```
CLAUDE.md  Original Codebase_Feb7 Version  README.md  docs  python  src  tools
```

**What happened:** `ls` listed everything in your project's root folder. The items without extensions (like `docs`, `python`, `src`, `tools`) are folders. The ones with extensions (like `CLAUDE.md`, `README.md`) are files.

**Now try:**

```
ls docs
```

**You should see:**

```
CHANGELOG.md  TODO.md  architecture  developer-log  guides  learning  session-notes.md
```

**What happened:** You looked inside the `docs` folder without leaving your current location. You just put the folder name after `ls`.

**Check:** You should see `CHANGELOG.md`, `TODO.md`, and several folders including `learning`. If you do, you are reading the project correctly.

---

## 4. ls With a Path -- Look Inside Folders Without Going There

You can chain folder names together with `/` to look deeper into the project.

**Type this:**

```
ls src
```

**You should see:**

```
appsscript.json  main.gs
```

**What happened:** You looked inside the `src` folder. `main.gs` is the big monolith file -- all 16,400 lines of the WIYS codebase. `appsscript.json` is the Apps Script configuration file.

**Now try:**

```
ls docs/learning
```

**You should see:**

```
github-the-website.md  javascript-syntax-basics.md  labs  sessions-3-4-concepts.md  terminal-and-git.md
```

**What happened:** You looked two levels deep -- inside `docs`, then inside `learning` -- all from the project root. The `labs` folder is where this file lives.

**Check:** You should see `labs` in that listing. That is the folder you are reading from right now.

---

## 5. ls -la -- See Hidden Files and Details

Some files start with a dot (like `.git`). These are hidden files. Regular `ls` does not show them. The `-la` flags mean: `-l` for "long format" (show details) and `-a` for "all" (include hidden files).

**Type this:**

```
ls -la
```

**You should see something like:**

```
total 590
drwxr-xr-x 8 root root   4096 ...  .
drwxr-xr-x 3 root root   4096 ...  ..
-rw-r--r-- 1 root root     98 ...  .clasp.json
-rw-r--r-- 1 root root    332 ...  .claspignore
drwxr-xr-x 2 root root   4096 ...  .devcontainer
drwxr-xr-x 8 root root   4096 ...  .git
-rw-r--r-- 1 root root    301 ...  .gitignore
-rw-r--r-- 1 root root   7215 ...  CLAUDE.md
-rw-r--r-- 1 root root 560325 ...  Original Codebase_Feb7 Version
...
```

**What happened:** Now you can see hidden files that were invisible before. The important ones:

- `.git/` -- this is where Git stores the entire history of the project. You never go in here manually.
- `.clasp.json` -- tells clasp which Apps Script project to connect to.
- `.gitignore` -- tells Git which files to NOT track.

**What those columns mean (left to right):** permissions, link count, owner, group, file size in bytes, date modified, file name. You do not need to memorize this -- just know that the number before the date is the file size.

**Check:** You should see `.git` and `.clasp.json` in the output. Those were hidden before.

---

## 6. cd -- Move Into a Folder

`cd` stands for "change directory." It moves you into a different folder.

**Type this:**

```
cd docs
```

**You should see:** Nothing. No output means it worked. (The terminal only talks back when something goes wrong or when you ask it a question.)

**Now verify where you are:**

```
pwd
```

**You should see:**

```
/home/user/WIYS-Refactoring_2026/docs
```

**Now list what's here:**

```
ls
```

**You should see:**

```
CHANGELOG.md  TODO.md  architecture  developer-log  guides  learning  session-notes.md
```

**What happened:** You moved from the project root into the `docs` folder. Now `ls` shows the contents of `docs` because that is your current location.

**Check:** Your `pwd` output should end with `/docs`.

---

## 7. cd .. -- Go Back Up One Level

`..` means "the parent folder" -- the folder that contains the one you are in.

**Type this:**

```
cd ..
```

**Now verify:**

```
pwd
```

**You should see:**

```
/home/user/WIYS-Refactoring_2026
```

**What happened:** You moved back up from `docs` to the project root. `..` always means "one folder up."

**Now try going two levels deep and coming back:**

```
cd docs/learning
```

```
pwd
```

**You should see:**

```
/home/user/WIYS-Refactoring_2026/docs/learning
```

**Now come back to the project root:**

```
cd ../..
```

```
pwd
```

**You should see:**

```
/home/user/WIYS-Refactoring_2026
```

**What happened:** `../..` means "up one, then up one more." You went from `docs/learning` back to the project root in one command.

**Check:** Your final `pwd` should show `/home/user/WIYS-Refactoring_2026`.

---

## 8. cd With a Full Path -- Jump Anywhere

Instead of moving one folder at a time, you can jump directly to any location by typing the full path.

**First, move somewhere deep:**

```
cd docs/developer-log
```

```
pwd
```

**You should see:**

```
/home/user/WIYS-Refactoring_2026/docs/developer-log
```

**Now jump straight back to the project root:**

```
cd /home/user/WIYS-Refactoring_2026
```

```
pwd
```

**You should see:**

```
/home/user/WIYS-Refactoring_2026
```

**What happened:** A path starting with `/` is called an "absolute path" -- it is the full address, like a GPS coordinate. It works no matter where you currently are. A path without a leading `/` (like `docs/learning`) is a "relative path" -- it only works relative to where you are standing.

**Now try:** This shortcut takes you to your home directory:

```
cd ~
```

```
pwd
```

**You should see:**

```
/home/user
```

**Go back to the project:**

```
cd /home/user/WIYS-Refactoring_2026
```

**Check:** You should be back at `/home/user/WIYS-Refactoring_2026`.

---

## 9. Tab Completion -- Let the Terminal Type for You

You do not have to type full file or folder names. Start typing and press the Tab key. The terminal will finish the word for you.

**Type this (but do NOT press Enter yet):**

```
ls CL
```

**Now press the Tab key.**

**You should see:** The terminal completes it to `ls CLAUDE.md` (or fills in as much as it can).

**Press Enter now** to run the completed command.

**Now try this -- type the following and press Tab:**

```
cd do
```

**You should see:** It completes to `cd docs`.

**Press Enter**, then go back:

```
cd ..
```

**What happened:** Tab completion saves you from typing full names and prevents typos. If nothing happens when you press Tab, it means there are multiple matches -- press Tab twice quickly to see all the options.

**Now try this -- type `ls d` and press Tab twice:**

```
ls d
```

**You should see a list of everything starting with 'd':** `docs/` (and possibly others). If there is only one match, it completes automatically. If there are multiple, it shows you the choices.

**Check:** If pressing Tab auto-completed a file or folder name for you, it is working.

---

## 10. Reading Files -- cat and head

`cat` prints an entire file to the terminal. For short files this is fine. For long files, you will want `head` which shows just the first few lines.

**Type this:**

```
head -5 CLAUDE.md
```

**You should see the first 5 lines of CLAUDE.md:**

```
# WIYS Refactoring Project -- Claude Briefing Document

## What This Is
A Google Apps Script production system for "When In Your State" (wheninyourstate.com).
It manages the full editorial pipeline: article drafting -> image sourcing -> WordPress publishing.
```

**What happened:** `head -5` means "show me the first 5 lines." The number after the dash controls how many lines you see.

**Now try reading more:**

```
head -20 CLAUDE.md
```

**You should see** the first 20 lines of the briefing document, including the section about Jamie.

**Now try `cat` on a short file:**

```
cat .clasp.json
```

**You should see:**

```json
{"scriptId":"1282XkiH9YKT9QVZiyyjVQYR8UeyHOWnAuErF1j9mpzve68OWfvaHHyqv","rootDir":"src"}
```

**What happened:** `cat` dumped the entire file contents to the terminal. This file is tiny, so it works great. If you ran `cat` on `main.gs` (16,400 lines), your terminal would flood with text. That is when you use `head` instead.

**Check:** You should have seen the contents of both files. If you see "No such file or directory," make sure you are in the project root (`cd /home/user/WIYS-Refactoring_2026`).

---

## 11. clear -- Clean Up the Screen

After running a bunch of commands, your terminal gets cluttered. `clear` wipes the screen.

**Type this:**

```
clear
```

**You should see:** A clean, empty terminal. Your command history is not gone -- you just cannot see it anymore. Scroll up if you need to find previous output.

**What happened:** `clear` is purely visual. It does not delete anything, change your location, or affect your files. It just gives you a fresh screen.

**Check:** Your terminal should look empty. Type `pwd` to confirm you are still in the same place -- `clear` does not move you.

---

## 12. Up Arrow -- Repeat Previous Commands

You do not need to retype commands. The up arrow key scrolls through your command history.

**Type this:**

```
pwd
```

```
ls
```

```
ls docs
```

**Now press the Up Arrow key once.**

**You should see:** `ls docs` appears on the command line (your most recent command).

**Press Up Arrow again.**

**You should see:** `ls` appears (the command before that).

**Press Up Arrow one more time.**

**You should see:** `pwd` appears.

**Press Down Arrow** to go forward through history. **Press Enter** on any command to run it again.

**What happened:** The terminal remembers every command you have typed. Up arrow goes backward through the history, down arrow goes forward. This is one of the biggest time-savers in the terminal.

**Check:** If pressing up arrow showed you previous commands, it is working.

---

## 13. Mini-Challenge: Putting It All Together

Here is the challenge. Try to do it from memory before looking at the answers.

**Starting from the project root** (`/home/user/WIYS-Refactoring_2026`):

1. Navigate to `docs/learning/`
2. List the files there
3. Read the first 10 lines of this lab file (it is at `labs/lab-01-terminal.md`)
4. Get back to the project root using a single command
5. Confirm you are back at the project root

Take a minute and try it. The answers are below.

---

**Answers:**

```
cd docs/learning
```

```
ls
```

You should see: `github-the-website.md  javascript-syntax-basics.md  labs  sessions-3-4-concepts.md  terminal-and-git.md`

```
head -10 labs/lab-01-terminal.md
```

You should see the title and first few lines of this file.

```
cd /home/user/WIYS-Refactoring_2026
```

```
pwd
```

You should see: `/home/user/WIYS-Refactoring_2026`

**Alternative for step 4:** You could also use `cd ../..` since `docs/learning` is two levels below the project root.

---

## What You Learned

- [ ] `pwd` -- print where you are
- [ ] `ls` -- list files and folders in your current location
- [ ] `ls <path>` -- list files in a specific folder without going there
- [ ] `ls -la` -- list all files including hidden ones, with details
- [ ] `cd <folder>` -- move into a folder
- [ ] `cd ..` -- move up one level
- [ ] `cd /full/path` -- jump to any location
- [ ] Tab -- auto-complete file and folder names
- [ ] `head -N <file>` -- read the first N lines of a file
- [ ] `cat <file>` -- print an entire file
- [ ] `clear` -- clean up the terminal screen
- [ ] Up/Down arrows -- scroll through command history

These twelve things cover about 80% of what you will do in the terminal day-to-day. The rest you pick up as you need it.

---

**Next:** [Lab 02](lab-02.md) (coming soon)

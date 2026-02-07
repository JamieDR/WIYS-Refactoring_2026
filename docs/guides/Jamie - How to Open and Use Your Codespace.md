# Jamie's Setup Guide: Working on WIYS from Anywhere

Hey Jamie — this guide gets you from zero to a working cloud development environment.
You only need to do this once. After that, you just open a browser tab.

**New to the terminal / command line?** Read [Jamie - What is a Terminal and How to Type Commands.md](<Jamie - What is a Terminal and How to Type Commands.md>) first. It explains what a terminal is, what all the symbols mean, and how commands work.

---

## Step 1: Open a GitHub Codespace

1. Go to https://github.com/JamieDR/WIYS-Refactoring_2026
2. Click the green **"<> Code"** button (near the top right of the file list)
3. Click the **"Codespaces"** tab (not the "Local" tab)
4. Click **"Create codespace on main"**
5. Wait 1-2 minutes. A VS Code editor will open in your browser.
6. You'll see a message that says "clasp installed" in the terminal at the bottom. That means the auto-setup worked.

**What just happened:** GitHub created a temporary cloud computer, installed all the tools we need (Node.js, Python, clasp), and opened your project in a code editor — all in your browser.

---

## Step 2: Connect clasp to Your Google Account

This lets clasp talk to your Google Apps Script project.

1. In the Codespace, click the **Terminal** at the bottom of the screen
2. Type this command and press Enter:
   ```
   clasp login --no-localhost
   ```
3. It will give you a URL. Click that URL (or copy-paste it into a browser tab).
4. Log in with the Google account that owns the Apps Script project.
5. Google will show you a code. Copy it.
6. Go back to the Codespace terminal and paste the code. Press Enter.
7. You should see: "Authorization successful."

**What just happened:** You gave clasp permission to upload/download code from your Google Apps Script project. This is a one-time login per Codespace.

**Why `--no-localhost`:** Normally clasp opens a browser window on your computer. Since we're in a cloud environment, there's no "local computer," so we use this flag to do it with a code instead.

---

## Step 3: Verify It Works

In the terminal, type:
```
clasp pull
```

This downloads the current code from your Apps Script project into the `src/` folder. If it works, you'll see files appear.

Then try:
```
clasp push
```

This uploads the code from `src/` back to Google. If it says "Pushed", you're good.

---

## Step 4: Your Daily Workflow

### Starting work:
1. Go to https://github.com/JamieDR/WIYS-Refactoring_2026
2. Click **"<> Code"** → **"Codespaces"** → click your existing Codespace (or create a new one)

### Editing code:
1. Edit files in the `src/` folder
2. Save the file (Ctrl+S or Cmd+S)
3. In the terminal, run `clasp push` to upload changes to Google Apps Script

### Saving your work to GitHub:
1. Click the **Source Control** icon in the left sidebar (it looks like a branch/fork)
2. You'll see your changed files listed
3. Type a short message describing what you changed (e.g., "Split WordPress functions into separate file")
4. Click the checkmark to **commit**
5. Click **"Sync Changes"** to push to GitHub

### Testing changes:
1. After running `clasp push`, go to your Google Sheet
2. Refresh the page
3. Test the feature you changed

---

## Troubleshooting

### "clasp: command not found"
This means clasp didn't get installed automatically. Install it manually by typing this and pressing Enter:
```
npm install -g @google/clasp
```
What this means: "Hey npm (the package installer), install the package called @google/clasp, and make it available globally (-g means everywhere on this computer)."

Wait for it to finish (you'll see text scrolling, then the cursor comes back). Then try `clasp login --no-localhost` again.

### "Not logged in"
Run: `clasp login --no-localhost` and follow the steps again.

### "Script ID not found"
Make sure the `.clasp.json` file exists in the project root and has the correct Script ID.

### "Permission denied" when pushing
You might not be logged into the correct Google account. Run `clasp logout` then `clasp login --no-localhost` again.

### Codespace is slow or frozen
Close the tab, go back to GitHub, and click on your Codespace to reopen it. If it's still broken, delete it and create a new one (your code is safe on GitHub).

---

## Important Notes

- **Never edit code in the Google Apps Script browser editor anymore.** Always use the Codespace + clasp. This ensures GitHub stays in sync.
- **Always commit and push before closing your Codespace.** Codespaces get deleted after inactivity. Your code on GitHub is permanent; the Codespace is temporary.
- **If you see "merge conflict"** — don't panic. Ask Claude for help. It just means two changes touched the same line and Git needs you to pick which one to keep.

# Git: Sync Forked Repository

### Prerequisites
Run this command once in your terminal to link the original repository as an upstream remote:
```bash
git remote add upstream https://github.com
```
*(Verify your setup by running `git remote -v`)*

---

### Sync Routine (Standard Git)
Run these commands in order whenever you want to update your fork:

1. **Fetch upstream changes:**
   ```bash
   git fetch upstream
   ```
2. **Switch to default branch:**
   ```bash
   git checkout main
   ```
3. **Merge the updates:**
   ```bash
   git merge upstream/main
   ```
4. **Push to your GitHub fork:**
   ```bash
   git push origin main
   ```

---

### Alternate: Sync via GitHub CLI
If you use the `gh` tool, run this single command to sync your repository automatically:
```bash
gh repo sync YOUR_USERNAME/YOUR_FORKED_REPO
```

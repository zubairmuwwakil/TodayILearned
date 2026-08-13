# Git: Setup New Repository

### Option 1: Create a Brand New Local Repository
Use this if you have code on your computer that you want to put on a blank GitHub repository.

1. **Initialize Git in your project folder:**
   ```bash
   git init
   ```
2. **Add all files to staging:**
   ```bash
   git add .
   ```
3. **Create your first commit:**
   ```bash
   git commit -m "Initial commit"
   ```
4. **Rename your default branch to main:**
   ```bash
   git branch -M main
   ```
5. **Link your local repository to GitHub:**
   ```bash
   git remote add origin https://github.com
   ```
6. **Push your code to GitHub:**
   ```bash
   git push -u origin main
   ```

---

### Option 2: Clone an Existing GitHub Repository
Use this if the repository already exists on GitHub and you want to download it to your computer.

```bash
git clone https://github.com
```

---

### Option 3: Quick Setup via GitHub CLI
If you use the `gh` tool, you can create the online repository and initialize your local files all at once:

```bash
gh repo create YOUR_REPOSITORY_NAME --public --clone
```
*(Replace `--public` with `--private` if you want a hidden repository).*

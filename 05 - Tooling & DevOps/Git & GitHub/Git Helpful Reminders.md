
# gitignore

## Ignore specific folders (add a trailing slash)
node_modules/
target/
build/
dist/

## Ignore specific files by exact name
.env
.env.local
.DS_Store

## Ignore all files with a specific extension (using the * wildcard)
*.log
*.sqlite
*.class

## Ignore files in a specific directory
logs/*.log

## Exceptions (using the ! symbol)
Ignore all .txt files...
*.txt
...except for this specific one
!important-notes.txt


## Already Tracked Files 

### To untrack a single file:
git rm --cached .env

### To untrack an entire directory:
git rm -r --cached node_modules/

### After untracking, commit the changes:
git commit -m "Stop tracking sensitive/unnecessary files"
# git add 

## git add .

stages all files in repo (project) 


## git add (filename) 

stages a specific file

## git add folder/

stages a specified folder 
## Override gitignore 

git add -f example.log
-f flag means force flag 
# git commit -m " "

adds a message to all files that are in staging area
files that are in staging area are from git add 

## git commit -am " " (bundles git add )

-a flag bundles add and commit into 
only works for files already being tracked 
meaning newly created files wont work 
skips the git add 

## git commit --amend  (fixing a mistake )

--amend is a flag 
allows you to edit your existing commit message and stage anything else 
so flow is stage other files (git add )
then run amend command 


# git branch 

shows the current list of branches on your computer and the *  signifies the branch you are currently "standing" in 

## git branch "chicken"

creates a new branch named chicken dont use quotes
*note* you remain in your current branch

## git switch chicken 

allows you to switch into another branch 
any adds or commits will apply to this branch now

## git switch -c chickme

-c flag means create 
combination of creating and switching into a new branch 
git checkout -b login-page (same thing as above)

## git branch -d chicken 

this deletes a branch but you must not be standing in that branch

_(Note the lowercase `-d`)._ Git will only let you delete the branch if all of its changes have already been safely merged into your main code. If you have unmerged commits inside that branch, Git will block the deletion and warn you that you are about to lose work.

-D flag will force delete even if not merged
# git reset 

git reset myfile.txt 

it unstages a file 

## git reset --soft HEAD~1

- **What it does:** Erases the last commit, but takes all the code from that commit and puts it in your Staging Area.
    
- **When to use it:** You committed too early and just want to add a few more things, or you want to fix your commit message.
**Option 2: `--mixed` (The Default Undo)**

Bash


## git reset HEAD~1 


_(If you don't type a flag, Git assumes you mean `--mixed`)._

- **What it does:** Erases the last commit, and puts all the code back into your Working Directory (unstaged). You have to run `git add` again to stage it.
    
- **When to use it:** You want to completely reorganize how you group your commits.
    

**Option 3: `--hard` (The Destructor)**

Bash


## git reset --hard HEAD~1


- **What it does:** Erases the last commit **AND permanently deletes all the code** changes you made in it. Your files revert exactly to how they looked at the older commit.
    
- **When to use it:** Your recent code is completely broken, you hate it, and you want to throw it in the trash and start over from the last good save. _(Warning: You cannot get `--hard` deleted code back easily)._

# git status

## What it tells you

When you run it, Git will scan your project and sort your files into three distinct lists (often color-coded in your terminal):

1. **Changes to be committed (Usually Green):** These are the files sitting in your Staging Area. You have already run `git add` on them, and they are fully prepped and ready for your next `git commit`.
    
2. **Changes not staged for commit (Usually Red):** These are files that Git is already tracking, and it noticed you made changes to them. However, they are still in your Working Directory. You need to run `git add` to move them to the Staging Area.
    
3. **Untracked files (Usually Red):** These are brand new files that Git has never seen before. Git is politely ignoring them until you explicitly tell it to watch them using `git add`.

# Unusual 

## pager error

use git --no-pager (command)

## Upstream 

-u 
# Flags 

--force for pushing 

# git push 

# git 
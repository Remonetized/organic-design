# GitBan CLI Workflow

Git alone cannot assign issues, add labels, or open pull requests. Use `gh` alongside Git so terminal work triggers the same board automation as IDE buttons.

## Requirements

- `git`
- GitHub CLI: `gh`
- authenticated `gh` session with access to the repository

Check auth:

```powershell
gh auth status
```

## Start An Issue

Use the helper:

```powershell
.\scripts\gitban-start.ps1 -Issue 42
```

What it does:

- checks the working tree is clean
- reads the issue title and labels
- chooses a branch prefix from the `type:*` label
- syncs from `main`
- assigns the issue to you, which moves it to `In Progress`
- creates a branch like `feat-login-form-42`

Override the prefix when needed:

```powershell
.\scripts\gitban-start.ps1 -Issue 42 -Prefix bug
```

## Mark Blocked Or Unblocked

```powershell
.\scripts\gitban-block.ps1 -Issue 42
.\scripts\gitban-block.ps1 -Issue 42 -Clear
```

These commands add or remove `status: blocked`, which moves the issue between `Blocked` and `In Progress`.

## Mark Hotfix

```powershell
.\scripts\gitban-hotfix.ps1 -Issue 42
```

This adds `type: hotfix`, which moves the issue to `Hotfix`.

## Open A Pull Request

From the issue branch:

```powershell
.\scripts\gitban-pr.ps1 -Issue 42
```

What it does:

- pushes the current branch
- opens a PR against `main`
- includes `Closes #42` in the body, which lets GitHub link the PR to the issue
- triggers the Project automation that moves the linked issue to `In Review`

Open a draft PR:

```powershell
.\scripts\gitban-pr.ps1 -Issue 42 -Draft
```

## Manual Equivalent

The helpers are convenience wrappers. The same workflow can be done manually:

```powershell
gh issue edit 42 --add-assignee "@me"
git switch main
git pull --ff-only origin main
git switch -c feat/login-form-42
git push -u origin feat/login-form-42
gh pr create --base main --head feat/login-form-42 --title "Add login form" --body "Closes #42"
```


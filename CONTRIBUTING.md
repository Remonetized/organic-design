# Contributing With GitBan:Flow

## Start Work

1. Pick a ready issue from `Backlog`.
2. Assign it to yourself.
3. Create a branch from the latest `main`.

With the helper scripts:

```powershell
.\scripts\gitban-start.ps1 -Issue 123
```

Manual equivalent:

```bash
git checkout main
git pull
git checkout -b feat/short-description-123
```

## Branch Naming

Branch prefixes are optional. Default branch names created by GitHub or an IDE are allowed.

Useful manual prefixes:

- `feat/` for features.
- `bug/` for bug fixes.
- `hot/` for urgent hotfixes.
- `ch/` for chores or refactors.
- `sp/` for spikes or experiments.

The PR body should include `Closes #123`; that link matters more than the branch name.

## Pull Requests

- Include `Closes #123` in the pull request body.
- Keep the PR focused on one issue.
- Explain verification clearly.
- Use squash merge after approval and passing checks.

From an issue branch, the helper creates a linked PR:

```powershell
.\scripts\gitban-pr.ps1 -Issue 123
```

## Review

Review for correctness first, then clarity, maintainability, and consistency with project conventions.

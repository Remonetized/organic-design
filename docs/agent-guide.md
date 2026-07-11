# GitBan Agent Guide

This guide is for AI coding agents and automation helpers working inside a GitBan:Flow repository.

## Operating Rules

- Treat GitHub Issues as the work queue.
- Prefer small branches that map to one issue.
- Prefer including the issue number in the branch name, but do not block default GitHub or IDE branch names.
- Open pull requests with a closing reference such as `Closes #123`.
- Keep board movement automatic where possible; use labels as workflow commands.
- Do not bypass review or required checks.

## Picking Up Work

1. Choose a ready issue from `Backlog` or `Hotfix`.
2. Assign the issue to yourself if appropriate.
3. Create a branch from the latest `main`.
4. Keep commits focused and explain verification in the PR.

Optional branch examples:

```text
feat/auth-form-42
bug/login-redirect-17
hot/payment-timeout-88
ch/update-actions-12
sp/search-api-options-31
```

## Labels As Commands

- Add `status: blocked` only when work cannot proceed because of a dependency, access problem, unclear requirement, external decision, or similar blocker.
- Remove `status: blocked` when work can continue.
- Add `type: hotfix` for live or operational repair work that should be pulled ahead of comparable backlog work.

Testing labels are expectations, not board movement:

- `test: required`
- `test: automated`
- `test: manual`
- `test: not needed`

## When Blocked

If you mark work as blocked, leave a comment that names:

- what is blocked
- what is needed to unblock it
- who or what can provide the answer

## Pull Request Expectations

- Keep changes small enough to review comfortably.
- Link the issue.
- Add or update tests when behaviour changes.
- Explain what was tested and what was not tested.
- Leave follow-up work as new issues instead of expanding the PR indefinitely.

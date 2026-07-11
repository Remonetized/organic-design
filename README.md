# GitBan:Flow Repository Template

This repository is a forkable starting point for GitBan:Flow projects: issue-first work, branch-based execution, pull request review, and GitHub Projects automation.

## What This Template Provides

- GitHub Projects v2 automation for the core board flow.
- Issue and pull request templates that keep work traceable.
- Optional branch naming guidance aligned to GitBan:Flow.
- A manual label bootstrap workflow for standard issue labels.
- Contributor docs for humans and AI agents working in the repository.
- Smoke-test and security guidance for copied projects.

## Board Flow

Create a GitHub Project v2 board with a single-select field named `GitBan Status` and these options:

```text
Backlog
Hotfix
In Progress
Blocked
In Review
Done
Merge Log
```

Optional date fields:

```text
Start date
End date
Target date
```

The workflows in `.github/workflows` automate this flow:

| Trigger | Automation |
| --- | --- |
| Issue opened or reopened | Add issue to the project and move it to `Backlog` |
| Issue assigned | Add issue if needed, move it to `In Progress`, set `Start date` if empty |
| Pull request opened or marked ready | Move linked closing issues to `In Review` |
| Pull request review requests changes | Move linked closing issues back to `In Progress` |
| Pull request review is approved | Move linked closing issues to `In Review` |
| Pull request merged | Move linked closing issues to `Done`, set `End date`, add the PR to `Merge Log` |
| Issue closed | Move issue to `Done`, set `End date` and `Target date` if empty |
| Issue labelled `status: blocked` | Move issue to `Blocked` |
| `status: blocked` removed | Move issue back to `In Progress` |
| Issue labelled `type: hotfix` | Move issue to `Hotfix` |

The `GitBan Reset Smoke Test` workflow can reset issue #1, or another chosen issue, back to `Backlog` for setup testing.

## Required GitHub Setup

1. Create or choose a GitHub Project v2 board.
2. Add the fields and statuses listed above.
3. Create a personal access token with access to the repository and project.
4. Add the token as a repository secret named `GITBAN_PROJECT_TOKEN` or `GITBAN_PAT`.
5. Add repository variables:

| Variable | Example | Notes |
| --- | --- | --- |
| `GITBAN_PROJECT_NUMBER` | `1` | Required. The visible project number. |
| `GITBAN_PROJECT_OWNER` | `your-org-or-user` | Optional. Defaults to the repository owner. |
| `GITBAN_PROJECT_OWNER_TYPE` | `organization` | Optional. Use `user` for user-owned projects. |

Optional override variables:

| Variable | Default |
| --- | --- |
| `GITBAN_STATUS_FIELD` | `GitBan Status` |
| `GITBAN_BACKLOG_STATUS` | `Backlog` |
| `GITBAN_IN_PROGRESS_STATUS` | `In Progress` |
| `GITBAN_BLOCKED_STATUS` | `Blocked` |
| `GITBAN_HOTFIX_STATUS` | `Hotfix` |
| `GITBAN_IN_REVIEW_STATUS` | `In Review` |
| `GITBAN_DONE_STATUS` | `Done` |
| `GITBAN_MERGE_LOG_STATUS` | `Merge Log` |
| `GITBAN_START_DATE_FIELD` | `Start date` |
| `GITBAN_END_DATE_FIELD` | `End date` |
| `GITBAN_TARGET_DATE_FIELD` | `Target date` |

The workflows accept `GITBAN_PROJECT_TOKEN`, `GITBAN_PAT`, or the legacy secret name `BRANCHFLOW_PAT`.

For user-owned Projects v2 boards, a classic PAT with `repo`, `project`, and `workflow` scopes is currently the most reliable option.

Run the `GitBan Bootstrap Labels` workflow once from the Actions tab to create the default `type:*` and `priority:*` labels.

GitHub also creates a built-in `Status` field with `Todo`, `In Progress`, and `Done`. Leave it alone unless you prefer to manage the board manually. The automation uses `GitBan Status` so copied template projects can be configured consistently from the CLI.

## Documentation

- `CHANGELOG.md`: notable template changes.
- `docs/gitban-flow.md`: operating guide and methodology.
- `docs/project-setup.md`: GitHub Project setup.
- `docs/cli-workflow.md`: terminal commands that trigger the same automation as IDE actions.
- `docs/testing-strategy.md`: testing architecture and CI guidance for forks.
- `docs/smoke-test.md`: verification checklist for copied projects.
- `docs/agent-guide.md`: guidance for AI agents and automation helpers.
- `docs/roadmap.md`: parked v2 ideas and future improvements.
- `SECURITY.md`: project token and secret guidance.

## Labels That Drive Automation

These labels are treated as workflow commands:

| Label | Result |
| --- | --- |
| `status: blocked` | Move issue to `Blocked` |
| remove `status: blocked` | Move issue back to `In Progress` |
| `type: hotfix` | Move issue to `Hotfix` |

Testing labels are advisory, not automated:

```text
test: required
test: automated
test: manual
test: not needed
```

## Daily Workflow

1. Pick an issue from `Backlog`.
2. Assign it to yourself. The project item moves to `In Progress`.
3. Create a branch from `main`.

CLI helper:

```powershell
.\scripts\gitban-start.ps1 -Issue 42
```

Manual equivalent:

```bash
git checkout main
git pull
git checkout -b feat/short-description-42
```

4. Commit focused changes and push the branch.
5. Open a pull request with `Closes #42`.

CLI helper:

```powershell
.\scripts\gitban-pr.ps1 -Issue 42
```

6. Review, pass checks, and squash merge.

## Branch Naming

Branch naming is guidance, not a gate. Use whatever keeps the work small and traceable. If the IDE or GitHub creates a default branch name from the issue, that is fine.

When naming manually, including the issue number is helpful:

| Prefix | Purpose | Example |
| --- | --- | --- |
| `feat/` | Feature | `feat/navbar-42` |
| `bug/` | Bug fix | `bug/login-redirect-17` |
| `hot/` | Hotfix | `hot/fix-crash-202` |
| `ch/` | Chore or refactor | `ch/update-deps-310` |
| `sp/` | Spike or experiment | `sp/prototype-api-12` |

The PR body should still include `Closes #123`; that link matters more than the branch name.

## Template Checklist

After duplicating this repository:

- Rename the repository.
- Create the GitHub Project v2 board.
- Add `GITBAN_PROJECT_TOKEN`.
- Add `GITBAN_PROJECT_NUMBER`.
- Confirm the board field names match this README.
- Disable default Project workflows that update status, except `Auto-add sub-issues to project` if wanted.
- Run the label bootstrap workflow.
- Replace the placeholder CI commands with project-specific lint, test, and build commands.
- Follow `docs/smoke-test.md` to verify the board moves.
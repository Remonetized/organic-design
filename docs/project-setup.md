# GitHub Project Automation Setup

Use this guide after forking or duplicating the template.

## 1. Create The Project

Create a GitHub Project v2 owned by either the repository owner, a user account, or an organisation.

Add a single-select field:

```text
GitBan Status
```

Add these options:

```text
Backlog
Hotfix
In Progress
Blocked
In Review
Done
Merge Log
```

Optionally add date fields:

```text
Start date
End date
Target date
```

For the roadmap/Gantt view, use `Start date` and `Target date` as the schedule fields. `End date` is useful as the actual completion field once work closes.

GitHub Projects creates a built-in `Status` field by default. This template uses a custom `GitBan Status` field because the built-in field cannot be deleted or fully reshaped through the GitHub CLI/API.

## Views

Create two views in the GitHub Projects UI:

- Kanban view: board layout, grouped by `GitBan Status`.
- Roadmap view: roadmap layout, using `Start date` and `Target date`.

The CLI can create and link the project, fields, variables, and items. GitHub does not currently expose reliable CLI/API commands for creating these saved view layouts.

## 2. Create The Token

Create a personal access token that can read and write the project and access the repository.

For user-owned Projects v2 boards, the token must be able to access the user project as well as the repository. A classic PAT with `repo`, `project`, and `workflow` scopes is currently the most reliable option. If a workflow log says `Could not resolve to a ProjectV2 with the number ...`, the secret is present but the token cannot see that project.

Add it to repository secrets as:

```text
GITBAN_PROJECT_TOKEN
```

The shorter alias also works:

```text
GITBAN_PAT
```

For compatibility with older projects, the workflows also accept:

```text
BRANCHFLOW_PAT
```

Do not paste the token into issues, pull requests, docs, or chat. Use GitHub repository secrets or `gh secret set`.

## 3. Configure Variables

Add this repository variable:

```text
GITBAN_PROJECT_NUMBER=1
```

If the project owner is different from the repository owner, add:

```text
GITBAN_PROJECT_OWNER=owner-login
```

For user-owned projects, add:

```text
GITBAN_PROJECT_OWNER_TYPE=user
```

For organisation-owned projects, use:

```text
GITBAN_PROJECT_OWNER_TYPE=organization
```

When using the CLI-created custom status field, add:

```text
GITBAN_STATUS_FIELD=GitBan Status
```

Optional explicit status variables:

```text
GITBAN_BACKLOG_STATUS=Backlog
GITBAN_HOTFIX_STATUS=Hotfix
GITBAN_IN_PROGRESS_STATUS=In Progress
GITBAN_BLOCKED_STATUS=Blocked
GITBAN_IN_REVIEW_STATUS=In Review
GITBAN_DONE_STATUS=Done
GITBAN_MERGE_LOG_STATUS=Merge Log
```

## 4. Disable Conflicting Project Workflows

GitHub Projects can add built-in workflows that update the built-in `Status` field. This template uses `GitBan Status` instead, so keep one source of truth.

Recommended default:

- Keep `Auto-add sub-issues to project` enabled if you use sub-issues.
- Disable built-in workflows that move status on issue, PR, review, close, merge, or item-added events.

## 5. Smoke Test

1. Open a test issue. It should be added to `Backlog`.
2. Assign the issue to yourself. It should move to `In Progress`.
3. Add `status: blocked`. The issue should move to `Blocked`.
4. Remove `status: blocked`. The issue should move back to `In Progress`.
5. Add `type: hotfix`. The issue should move to `Hotfix`.
6. Open a PR that includes `Closes #<issue-number>`. The issue should move to `In Review`.
7. Request changes on the PR if you can test that path. The issue should move back to `In Progress`.
8. Approve the PR. The issue should move to `In Review`.
9. Merge the PR. The issue should move to `Done`, and the PR should appear in `Merge Log`.

## Troubleshooting

- If the workflow cannot find the project, check `GITBAN_PROJECT_NUMBER`, owner, and owner type.
- If the workflow says it cannot resolve `ProjectV2`, check that the token has project access for the user or organisation that owns the board.
- If status updates fail, check the `GitBan Status` field and option names exactly match the configured names.
- If automation cannot authenticate, confirm one of `GITBAN_PROJECT_TOKEN`, `GITBAN_PAT`, or `BRANCHFLOW_PAT` exists as an Actions secret.
- If date updates are skipped, confirm the fields are date fields, not text fields.
- If a PR does not move an issue, confirm the PR title or body includes a closing keyword such as `Closes #123`.

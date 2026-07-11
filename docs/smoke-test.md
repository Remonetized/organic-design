# GitBan Smoke Test

Use this checklist after copying the template into a new project or changing Project/token settings.

Issue #1 can be kept as a reusable smoke-test issue. Run the `GitBan Reset Smoke Test` workflow to reopen it, remove transient workflow labels, clear assignees, clear date fields, and move it back to `Backlog`.

## Before You Start

- `GITBAN_PAT` or `GITBAN_PROJECT_TOKEN` is set as an Actions secret.
- `GITBAN_PROJECT_NUMBER` is set.
- `GITBAN_PROJECT_OWNER_TYPE` is `user` or `organization`.
- `GITBAN_STATUS_FIELD` matches the board field, usually `GitBan Status`.
- Built-in Project workflows that update status are disabled.

## Issue Flow

1. Create a test issue.
2. Confirm the issue appears on the Project with `GitBan Status = Backlog`.
3. Assign the issue to yourself.
4. Confirm `GitBan Status = In Progress` and `Start date` is set.
5. Add `status: blocked`.
6. Confirm `GitBan Status = Blocked`.
7. Remove `status: blocked`.
8. Confirm `GitBan Status = In Progress`.
9. Add `type: hotfix`.
10. Confirm `GitBan Status = Hotfix`.
11. Close the issue.
12. Confirm `GitBan Status = Done`, `End date` is set, and `Target date` is set if empty.

## Pull Request Flow

1. Reopen or create a test issue.
2. Create a branch, such as `ch/smoke-test-1` or a default branch name from GitHub/your IDE.
3. Open a pull request with `Closes #<issue-number>`.
4. Confirm the linked issue moves to `In Review`.
5. Request changes if you can test that path.
6. Confirm the linked issue moves back to `In Progress`.
7. Approve the PR.
8. Confirm the linked issue moves to `In Review`.
9. Merge the PR.
10. Confirm the linked issue moves to `Done` and the PR appears in `Merge Log`.

## Common Failures

- `Input required and not supplied: github-token`: the expected secret is missing or empty.
- `Could not resolve to a ProjectV2`: the token cannot see the Project, or the owner/type/number is wrong.
- `Status option not found`: the board status option does not exactly match the configured variable.
- Issue does not move on PR events: the PR must include a closing reference such as `Closes #123`.
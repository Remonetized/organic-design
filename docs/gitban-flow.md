# GitBan:Flow Operating Guide

GitBan:Flow is a Git-centred project management framework. The repository is the source of truth for planning, development, review, and delivery.

## Principles

- **Issue-first development:** every meaningful task starts as a GitHub Issue.
- **Branch-based execution:** each issue gets a descriptive branch that includes the issue number.
- **Pull request review:** changes enter `main` through reviewed PRs.
- **Automation over admin:** project board status changes are handled by GitHub Actions.
- **Distributed responsibility:** contributors wear the roles needed to keep flow moving.
- **Process as code:** workflow rules, labels, and docs are versioned and improved through the repository.

## Roles

- **Developer:** picks up issues, creates branches, writes code, updates tests and docs.
- **Reviewer:** reviews pull requests for correctness, clarity, and maintainability.
- **Integrator:** merges approved PRs and keeps `main` stable.
- **Issue Manager:** clarifies, labels, prioritises, and breaks down work.
- **Discussion Facilitator:** keeps decisions and open questions visible.

Roles are hats, not titles. One person or AI agent can hold several hats at different points in the project.

## Living Framework

GitBan:Flow is meant to change as the project learns. Treat process updates like product updates:

- propose changes in issues or pull requests
- keep automation and documentation aligned
- prefer small workflow changes that can be tested
- remove ceremony when it stops helping the work

## Issue Structure

Good issues are small enough to finish, test, and review. Use:

- A clear title.
- Context and intent.
- Acceptance criteria.
- Links to related issues, discussions, or designs.
- Labels for type and priority.

Use subtasks for small internal steps. Convert a subtask into a new issue when it needs a separate branch, owner, review, or discussion thread.

## Board Flow

```text
Hotfix / Backlog -> In Progress -> In Review -> Done -> Merge Log
```

- `Backlog`: accepted but unstarted work.
- `Hotfix`: live or operational repair work that should be pulled ahead of ordinary backlog work at the same priority level.
- `In Progress`: assigned work with active development.
- `Blocked`: work that cannot proceed without an external decision, dependency, access, or clarification.
- `In Review`: a linked PR is open or ready for review.
- `Done`: the issue is closed or its linked PR has merged.
- `Merge Log`: merged pull requests retained as a delivery trail.

`Blocked` is an exception lane. It is not another name for review. Use the `status: blocked` label when work cannot keep moving through the normal flow.

## Automation Labels

- `status: blocked`: move the issue to `Blocked`.
- Removing `status: blocked`: move the issue back to `In Progress`.
- `type: hotfix`: move the issue to `Hotfix`.

Testing labels describe verification expectations and do not move the board:

- `test: required`: further testing is necessary.
- `test: automated`: automated tests should be added or updated.
- `test: manual`: manual validation is expected.
- `test: not needed`: no further testing is required.

## Pull Request Rules

- Link the issue with `Closes #123` in the PR body.
- Keep changes focused.
- Add or update tests when behaviour changes.
- Wait for required checks and review before merge.
- Prefer squash merge for a readable `main` history.

## Definition of Done

An issue is done when:

- Acceptance criteria are met.
- Tests and checks pass.
- Documentation is updated where needed.
- The PR is reviewed and merged.
- The issue is closed and the board reflects completion.

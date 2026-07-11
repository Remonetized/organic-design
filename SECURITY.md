# Security Notes

## GitHub Project Token

GitHub Projects v2 automation usually needs a token beyond the default `GITHUB_TOKEN`.

Store the token as an Actions secret named one of:

```text
GITBAN_PROJECT_TOKEN
GITBAN_PAT
BRANCHFLOW_PAT
```

Prefer `GITBAN_PROJECT_TOKEN` for new projects.

## Token Access

The token must be able to:

- read the repository
- read issues and pull requests
- read and write the GitHub Project v2 board

For user-owned Projects v2 boards, fine-grained tokens may not always resolve the project through Actions. A classic token with `repo`, `project`, and `workflow` scopes is often the practical fallback.

Do not paste tokens into issues, pull requests, documentation, or chat. Set them through GitHub repository secrets or:

```powershell
gh secret set GITBAN_PROJECT_TOKEN --repo OWNER/REPO
```

## Rotation

Rotate the project token when:

- a contributor with token access leaves
- the token was pasted into the wrong place
- automation logs suggest unauthorized access
- the project moves to a new owner or organisation

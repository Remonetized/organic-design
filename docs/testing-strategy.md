# Testing Strategy

GitBan:Flow does not prescribe a technology stack. Each fork owns its test tools, but should expose predictable CI checks and clear verification expectations.

## Standard CI Check Names

Use these job names across forks:

```text
ci / lint
ci / test
ci / build
```

The commands behind those checks can vary by project. The names should stay stable so branch protection and contributor habits do not need to change every time the stack changes.

## Placeholder Workflow

The template includes:

```text
.github/workflows/ci.yml
```

By default it only echoes placeholder messages. Replace those steps with project-specific commands.

Examples:

```yaml
- name: Install dependencies
  run: npm ci

- name: Run tests
  run: npm test
```

or:

```yaml
- name: Install dependencies
  run: pip install -r requirements.txt

- name: Run tests
  run: pytest
```

## Testing Labels

Use labels to make verification expectations visible:

- `test: required`: further testing is necessary.
- `test: automated`: automated tests should be added or updated.
- `test: manual`: manual validation is expected.
- `test: not needed`: no further testing is required.

These labels are advisory. They do not move the board.

## Pull Request Verification

Every PR should explain what was tested.

Good verification notes:

```text
- npm test
- manually checked login and logout in Chrome
- no automated tests added because this only updates README copy
```

Weak verification notes:

```text
- seems fine
- not tested
```

If testing is not needed, say why.

## Branch Protection

Once a fork has real checks, consider requiring:

- pull requests before merge
- `ci / lint`
- `ci / test`
- `ci / build`
- resolved conversations
- at least one approval

Do not require placeholder checks as a substitute for real project tests. Replace the placeholder commands first.


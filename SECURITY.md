# Security Policy

Rora is a colour theme. Most of what ships here is inert data — hex values in
JSON, YAML, and plain-text config. But three things in this repo are executed or
installed on your machine, and those are worth taking seriously.

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Use GitHub's private reporting instead:

> **[Report a vulnerability →](https://github.com/TruStorey/rora-theme/security/advisories/new)**
> (Security tab → Advisories → Report a vulnerability)

This opens a private thread visible only to you and the maintainers. If you'd
rather use email, write to **tech@neonmumbles.com** with `SECURITY` in the
subject.

Please include what you found, which file or artifact it affects, and how to
reproduce it. A proof of concept helps but is not required.

**What to expect:** an acknowledgement within about 7 days, and an assessment
within 30. This is a small hobby project maintained in spare time — there is no
paid on-call rotation and no bounty programme, but genuine reports will be taken
seriously and credited in the fix unless you prefer otherwise.

## Supported versions

Only the current `main` branch is supported. Fixes ship forward; there are no
backports or long-term support branches. For the VS Code extension, only the
latest published version of `apps/vscode/rora.vsix` is supported.

## In scope

These are the parts of the repo that can actually affect a user's system:

| Artifact | Why it matters |
|----------|----------------|
| [`apps/gnome-terminal/install.sh`](apps/gnome-terminal/install.sh) | A shell script users download and run. Command injection, unsafe `dconf` writes, or clobbering profiles it does not own all count — it is documented as non-destructive, so any case where it isn't is a bug worth reporting. |
| [`apps/vscode/rora.vsix`](apps/vscode/rora.vsix) | A pre-built extension package installed into VS Code. A mismatch between the `.vsix` and the source it claims to be built from is a legitimate supply-chain concern — see below. |
| [`apps/home-assistant/themes/rora.yaml`](apps/home-assistant/themes/rora.yaml) | Loaded into a Home Assistant instance. Anything that could escape being pure theme variables is in scope. |

Also in scope: any content in this repo that could be used to compromise the
repository itself — leaked credentials in history, a malicious workflow, or a
tampered release artifact.

### On the committed `.vsix`

`apps/vscode/rora.vsix` is a build artifact committed to the repo so it can be
installed directly from a URL. It is built from `apps/vscode/` with
`vsce package`, and it should always match that source. You can verify it:

```bash
unzip -p apps/vscode/rora.vsix extension/themes/rora-color-theme.json \
  | diff - apps/vscode/themes/rora-color-theme.json && echo "matches source"
```

If that diff is ever non-empty, treat it as a security report and tell us — a
committed binary that disagrees with its source is exactly the thing worth
flagging.

## Out of scope

- **Colour contrast and readability.** Real accessibility concerns are very
  welcome, but as a normal issue — not a security report.
- **Aesthetic disagreements** about the palette.
- **Vulnerabilities in VS Code, Ghostty, Sublime Text, GNOME Terminal, Windows
  Terminal, or Home Assistant themselves.** Report those to their maintainers.
  If a Rora theme file *triggers* such a bug, we do want to know.
- **The Rora website.** It lives in a separate repository. Send site reports to
  the same address above and they'll be routed.

## Verifying what you install

Every install path in this repo fetches a plain-text file from
`raw.githubusercontent.com/TruStorey/rora-theme/main/...`. Nothing is minified
or obfuscated, and the only executable is `install.sh`.

By design, no install instruction in this repo pipes a download straight into a
shell — the GNOME Terminal script is downloaded to a file first, precisely so
you can read it before running it. Please do read it. If you ever find docs here
telling you to `curl … | bash`, that is itself a bug worth reporting.

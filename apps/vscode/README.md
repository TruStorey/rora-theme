# Rora for VS Code

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

## Install

Not yet on the Marketplace. A prebuilt, installable `rora.vsix` is
committed to the repo, so you can install straight from GitHub — no
clone, no Node, no build.

> Do **not** copy files into `~/.vscode/extensions/` by hand. Modern VS
> Code (1.85+) treats `extensions.json` as the source of truth and
> quarantines hand-dropped folders into `.obsolete` on every launch.
> Always install via the VSIX so VS Code registers it properly.

### Option 1 — install from GitHub (recommended)

```bash
curl -L -o /tmp/rora.vsix \
  https://raw.githubusercontent.com/TruStorey/rora-theme/main/apps/vscode/rora.vsix
code --install-extension /tmp/rora.vsix
```

Restart VS Code, then **Preferences: Color Theme** → **Rora**. Verify:

```bash
code --list-extensions | grep -i rora      # -> rora-theme.rora
```

No `code` command? Open VS Code → Command Palette → **Shell Command:
Install 'code' command in PATH**. Or install through the GUI instead:
download
[`apps/vscode/rora.vsix`](https://github.com/TruStorey/rora-theme/raw/main/apps/vscode/rora.vsix),
then Command Palette → **Extensions: Install from VSIX…**.

To update later, re-run the two commands above — `--install-extension`
overwrites the installed copy.

### Option 2 — from a local clone

```bash
git clone https://github.com/TruStorey/rora-theme.git
code --install-extension rora-theme/apps/vscode/rora.vsix
```

### Option 3 — rebuild the VSIX yourself

If you've edited the theme, repackage before installing:

```bash
cd apps/vscode
pnpm run package          # -> rora.vsix  (runs @vscode/vsce)
code --install-extension rora.vsix
```

Commit the regenerated `rora.vsix` so the GitHub copy stays current.

### Option 4 — symlink for live development (code-server / older builds)

Picks up edits on reload without repackaging. Works on code-server and
pre-1.85 VS Code; desktop VS Code 1.85+ will quarantine it (see note
above) — use the VSIX there instead.

```bash
ln -sfn "$PWD/apps/vscode" "$HOME/.vscode/extensions/rora-theme.rora"
```

```powershell
# Windows (PowerShell, admin)
New-Item -ItemType SymbolicLink `
  -Path "$env:USERPROFILE\.vscode\extensions\rora-theme.rora" `
  -Target (Resolve-Path .\apps\vscode)
```

## What's themed

- The full workbench (activity bar, side bar, tabs, status bar, panels,
  menus, notifications, settings).
- Editor UI (cursor, selection, line highlight, indent guides, bracket
  pair colorisation, gutter, overview ruler, minimap).
- Syntax via TextMate scopes — keywords in Violet, strings in Rosa,
  functions in Aurora, types in Polar, comments in Mist.
- Semantic highlighting tokens (TypeScript, Python, Rust, etc.) mapped
  to the same palette.
- The integrated terminal — ANSI colours match the Rora Windows Terminal
  scheme one-for-one.

## Palette

See [`docs/rora-palette.md`](../../docs/rora-palette.md) for the full
reference.

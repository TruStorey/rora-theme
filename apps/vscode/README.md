# Rora for VS Code

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

## Install

Rora isn't on the Marketplace yet, but a prebuilt `rora.vsix` lives in
the repo — install straight from GitHub, no clone or build required.

### Option 1 — from the command line (recommended)

```bash
curl -L -o /tmp/rora.vsix \
  https://raw.githubusercontent.com/TruStorey/rora-theme/main/apps/vscode/rora.vsix
code --install-extension /tmp/rora.vsix
```

No `code` command on your PATH? Open VS Code → Command Palette →
**Shell Command: Install 'code' command in PATH**, then re-run.

### Option 2 — from the GUI

1. Download
   [`rora.vsix`](https://github.com/TruStorey/rora-theme/raw/main/apps/vscode/rora.vsix).
2. In VS Code, open the Command Palette (`Ctrl/Cmd + Shift + P`).
3. Run **Extensions: Install from VSIX…** and pick the downloaded file.

### Apply

Restart VS Code, then open the Command Palette and run **Preferences:
Color Theme** → **Rora**.

Verify from the shell:

```bash
code --list-extensions | grep -i rora      # -> rora-theme.rora
```

To update later, repeat your install step — `--install-extension`
overwrites the existing copy.

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

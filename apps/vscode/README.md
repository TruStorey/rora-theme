# Rora for VS Code

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

## Install (local)

Not yet on the Marketplace. The reliable way to install on **desktop VS
Code** is the prebuilt `.vsix` — modern VS Code (1.85+) quarantines
hand-dropped extension folders, so use one of the methods below rather
than copying files into `~/.vscode/extensions`.

### Option 1 — install the prebuilt VSIX (recommended)

A ready-to-install `rora.vsix` ships in this folder:

```bash
code --install-extension apps/vscode/rora.vsix
```

Or from the command palette: **Extensions: Install from VSIX…** → pick
`rora.vsix`. Restart VS Code, then **Preferences: Color Theme** → **Rora**.

### Option 2 — rebuild the VSIX yourself

```bash
cd apps/vscode
pnpm run package          # -> rora.vsix  (runs @vscode/vsce)
code --install-extension rora.vsix
```

### Option 3 — symlink for live development (code-server / older builds)

Picks up edits on reload without repackaging. Works on code-server and
older VS Code; desktop VS Code 1.85+ may quarantine it (see note above).

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

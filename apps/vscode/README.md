# Rora for VS Code

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

## Install (local)

While the extension isn't yet published to the Marketplace, you can install
it directly from this folder.

### Option 1 — symlink into your extensions directory

```bash
# macOS / Linux
ln -s "$PWD/apps/vscode" "$HOME/.vscode/extensions/rora-theme.rora-0.1.1"
```

```powershell
# Windows (PowerShell, admin)
New-Item -ItemType SymbolicLink `
  -Path "$env:USERPROFILE\.vscode\extensions\rora-theme.rora-0.1.1" `
  -Target (Resolve-Path .\apps\vscode)
```

Restart VS Code. Open the command palette and run **Preferences: Color
Theme**, then choose **Rora**.

### Option 2 — package and install a `.vsix`

```bash
pnpm dlx @vscode/vsce package
code --install-extension rora-0.1.1.vsix
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

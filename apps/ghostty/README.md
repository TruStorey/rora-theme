# Rora for Ghostty

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

The ANSI palette, cursor, and selection match the Rora Windows Terminal
scheme and VS Code integrated terminal one-for-one, so the theme reads
identically across every terminal you use.

## Install

### Option 1 — symlink into Ghostty's themes directory

```bash
mkdir -p ~/.config/ghostty/themes
ln -sfn "$PWD/apps/ghostty/themes/rora" ~/.config/ghostty/themes/rora
```

Then add this line to `~/.config/ghostty/config`:

```ini
theme = rora
```

### Option 2 — point Ghostty straight at the file

No copy needed; reference it by absolute path in
`~/.config/ghostty/config`:

```ini
theme = /home/trustorey/vscode/rora-theme/apps/ghostty/themes/rora
```

## Apply

Reload the config with `Cmd/Ctrl + Shift + ,`, or fully restart Ghostty.

## Palette

| Slot          | Colour    | Name        |
| ------------- | --------- | ----------- |
| background    | `#12101c` | Abyss       |
| foreground    | `#eddeff` | Starlight   |
| cursor        | `#f06cb8` | Rosa        |
| selection     | `#231f35` | Twilight    |
| red           | `#f06cb8` | Rosa        |
| green         | `#72f0c8` | Aurora      |
| yellow        | `#d97fff` | Nebula      |
| blue          | `#7ec8f4` | Polar       |
| magenta       | `#b59eff` | Violet      |
| cyan          | `#c084fc` | Dusk Rose   |

See [`docs/rora-palette.md`](../../docs/rora-palette.md) for the full
reference.

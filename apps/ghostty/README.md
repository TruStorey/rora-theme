# Rora for Ghostty

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

The ANSI palette, cursor, and selection match the Rora Windows Terminal
scheme and VS Code integrated terminal one-for-one, so the theme reads
identically across every terminal you use.

## Install

Drop the `rora` theme file into Ghostty's user themes directory, then
reference it from your config.

### 1. Download the theme

```bash
mkdir -p ~/.config/ghostty/themes
curl -fsSL -o ~/.config/ghostty/themes/rora \
  https://raw.githubusercontent.com/TruStorey/rora-theme/main/apps/ghostty/themes/rora
```

The config directory differs on macOS:

| Platform        | Themes directory                                          |
| --------------- | --------------------------------------------------------- |
| Linux           | `~/.config/ghostty/themes/`                               |
| macOS           | `~/Library/Application Support/com.mitchellh.ghostty/themes/` |

### 2. Enable it

Add this line to your Ghostty config (`~/.config/ghostty/config` on
Linux, `~/Library/Application Support/com.mitchellh.ghostty/config` on
macOS):

```ini
theme = rora
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

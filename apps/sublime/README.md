# Rora for Sublime Text

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

Two files ship here:

- **`Rora.sublime-color-scheme`** — the editor surface and syntax. The
  background sits on Twilight `#231f35` to match the lifted Rora VS Code
  editor; scopes use the same palette as every other Rora app.
- **`Rora.sublime-theme`** — the UI chrome (sidebar, tabs, status bar,
  panels, quick panel, autocomplete, scrollbars). It `extends`
  `Default.sublime-theme`, so it only recolours — all layout, sizing,
  and behaviour stay stock.

Use them together for the full look, or just the color scheme if you
prefer your current UI theme.

## Install

### Option 1 — symlink into your User package

```bash
# Sublime Text 4 (Linux)
mkdir -p ~/.config/sublime-text/Packages/User
ln -sfn "$PWD/apps/sublime/Rora.sublime-color-scheme" \
  ~/.config/sublime-text/Packages/User/Rora.sublime-color-scheme
ln -sfn "$PWD/apps/sublime/Rora.sublime-theme" \
  ~/.config/sublime-text/Packages/User/Rora.sublime-theme
```

Paths for other platforms:

| Platform        | User package directory                                            |
| --------------- | ----------------------------------------------------------------- |
| Linux (ST4)     | `~/.config/sublime-text/Packages/User/`                           |
| Linux (ST3)     | `~/.config/sublime-text-3/Packages/User/`                         |
| macOS           | `~/Library/Application Support/Sublime Text/Packages/User/`       |
| Windows         | `%APPDATA%\Sublime Text\Packages\User\`                           |

### Option 2 — copy the files

Drop both `Rora.sublime-color-scheme` and `Rora.sublime-theme` into that
same `Packages/User/` directory by hand.

## Apply

- **Preferences → Select Color Scheme…** → **Rora**
- **Preferences → Select Theme…** → **Rora**

Or set both directly in your settings:

```json
{
  "color_scheme": "Packages/User/Rora.sublime-color-scheme",
  "theme": "Rora.sublime-theme"
}
```

## Palette

| Slot          | Colour    | Name      |
| ------------- | --------- | --------- |
| background    | `#231f35` | Twilight  |
| foreground    | `#eddeff` | Starlight |
| caret         | `#f06cb8` | Rosa      |
| selection     | Violet @ 33% alpha | Violet |
| keyword       | `#b59eff` | Violet    |
| string        | `#f06cb8` | Rosa      |
| function      | `#72f0c8` | Aurora    |
| type / class  | `#7ec8f4` | Polar     |
| number        | `#d97fff` | Nebula    |
| comment       | `#7a7096` | Mist (italic) |

See [`docs/rora-palette.md`](../../docs/rora-palette.md) for the full
reference.

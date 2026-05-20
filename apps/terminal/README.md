# Rora for Windows Terminal

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

This is the reference Rora terminal palette — Ghostty, GNOME Terminal,
and the VS Code integrated terminal all match these ANSI slots
one-for-one.

## Install

Windows Terminal stores schemes inside its `settings.json`. Paste the
Rora scheme into the `schemes` array, then point a profile at it.

### 1. Open settings.json

Windows Terminal → drop-down arrow next to the tabs → **Settings**.
At the bottom-left, click **Open JSON file** (or `Ctrl + Shift + ,`).

### 2. Add the Rora scheme

Inside the top-level `"schemes": [ ... ]` array, paste this object
alongside the existing entries:

```jsonc
{
    "name": "Rora",
    "background":         "#12101c",
    "foreground":         "#eddeff",
    "cursorColor":        "#f06cb8",
    "selectionBackground":"#231f35",
    "black":   "#0d0b14",
    "red":     "#f06cb8",
    "green":   "#72f0c8",
    "yellow":  "#d97fff",
    "blue":    "#7ec8f4",
    "purple":  "#b59eff",
    "cyan":    "#c084fc",
    "white":   "#eddeff",
    "brightBlack":  "#4e4468",
    "brightRed":    "#f89ece",
    "brightGreen":  "#9df5dc",
    "brightYellow": "#e6b0ff",
    "brightBlue":   "#a8dcf8",
    "brightPurple": "#cdb8ff",
    "brightCyan":   "#d4aeff",
    "brightWhite":  "#ffffff"
}
```

The same JSON lives in
[`rora.terminal-theme.jsonc`](./rora.terminal-theme.jsonc) if you'd
rather copy it from the repo.

### 3. Apply it to a profile

Either edit `settings.json` directly:

```jsonc
"profiles": {
    "defaults": {
        "colorScheme": "Rora"
    }
}
```

…or use the Settings UI: **Profiles → Defaults → Appearance → Color
scheme → Rora**. Setting it on `defaults` applies Rora to every
profile; set it on an individual profile to scope it to just one.

Save the file — Windows Terminal picks up the change on the next new
tab.

## Showcase

Run [`rora-showcase.ps1`](./rora-showcase.ps1) in a Rora-themed tab to
see the full ANSI palette and styling in action.

## Palette

| Slot          | Colour    | Name      |
| ------------- | --------- | --------- |
| background    | `#12101c` | Abyss     |
| foreground    | `#eddeff` | Starlight |
| cursor        | `#f06cb8` | Rosa      |
| selection     | `#231f35` | Twilight  |
| red           | `#f06cb8` | Rosa      |
| green         | `#72f0c8` | Aurora    |
| yellow        | `#d97fff` | Nebula    |
| blue          | `#7ec8f4` | Polar     |
| purple        | `#b59eff` | Violet    |
| cyan          | `#c084fc` | Dusk Rose |

See [`docs/rora-palette.md`](../../docs/rora-palette.md) for the full
reference.

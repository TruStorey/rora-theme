# Rora for GNOME Terminal

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

This targets **GNOME Terminal**, the default terminal on Ubuntu 24.04
LTS. GNOME Terminal has no theme-file format — colours live in a dconf
profile — so the theme ships as an install script that creates a
profile named **Rora**.

The palette, cursor, and selection match the Rora Windows Terminal
scheme, Ghostty theme, and VS Code integrated terminal one-for-one.

## Install

Requires `dconf` (preinstalled on Ubuntu; otherwise
`sudo apt install dconf-cli`).

The script is **non-destructive** — it adds a new "Rora" profile and
leaves your existing profiles and default untouched. Re-running updates
the same profile instead of duplicating it.

### From GitHub (no clone)

```bash
curl -fsSL https://raw.githubusercontent.com/TruStorey/rora-theme/main/apps/gnome-terminal/install.sh -o /tmp/rora-gnome.sh
bash /tmp/rora-gnome.sh            # add --default to also make it the default
```

(Pull the script down and glance at it before running — it only writes
`org.gnome.terminal` dconf keys, nothing else.)

### From a local clone

```bash
git clone https://github.com/TruStorey/rora-theme.git
bash rora-theme/apps/gnome-terminal/install.sh
```

## Apply

GNOME Terminal → ☰ menu → **Preferences** → select **Rora**.

To make it the default for new windows, either pick it in Preferences
and **Set as default**, or re-run the script with `--default`:

```bash
bash install.sh --default
```

## Uninstall

Preferences → **Rora** → the ⋮ menu → **Delete Profile**. Your other
profiles are unaffected.

## Palette

| Slot       | Colour    | Name      |
| ---------- | --------- | --------- |
| background | `#12101C` | Abyss     |
| foreground | `#EDDEFF` | Starlight |
| cursor     | `#F06CB8` | Rosa      |
| highlight  | `#231F35` | Twilight  |
| red        | `#F06CB8` | Rosa      |
| green      | `#72F0C8` | Aurora    |
| yellow     | `#D97FFF` | Nebula    |
| blue       | `#7EC8F4` | Polar     |
| magenta    | `#B59EFF` | Violet    |
| cyan       | `#C084FC` | Dusk Rose |

See [`docs/rora-palette.md`](../../docs/rora-palette.md) for the full
reference.

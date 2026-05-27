# Rora for Home Assistant

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

One theme ships here: **`themes/rora.yaml`**. It covers the full Home
Assistant surface — sidebar, header, cards, forms, sliders, switches,
the YAML/Jinja editor, energy panel colours, and the 14 graph hues used
by history charts. The same theme applies to admin pages and Lovelace
dashboards; there is no separate dashboard variant.

It maps the modern `ha-color-*` design tokens, the legacy
`primary-color`/`card-background-color`/`state-*` aliases, and the
per-domain state colours, so it works correctly with first-party HA
panels and the common community card libraries (Mushroom, Bubble,
Button Card, Mini Graph, etc.).

## Install

Home Assistant loads themes from a `themes/` folder inside your
configuration directory. The path depends on your install
([find it here](https://www.home-assistant.io/docs/configuration/#to-find-the-configuration-directory)) —
on HA OS / Supervised it's typically `/config/`.

### 1. Tell HA to load themes from a folder

Add this under `frontend:` in your `configuration.yaml` (if it's not
already there):

```yaml
frontend:
  themes: !include_dir_merge_named themes
```

Restart Home Assistant once after adding this line.

### 2. Drop the file in

Linux / macOS — adjust the path to your HA config directory:

```bash
HA_CONFIG=/config                                  # or wherever yours lives
mkdir -p "$HA_CONFIG/themes"
curl -fsSL -o "$HA_CONFIG/themes/rora.yaml" \
  https://raw.githubusercontent.com/TruStorey/rora-theme/main/apps/home-assistant/themes/rora.yaml
```

Or download
[`themes/rora.yaml`](https://raw.githubusercontent.com/TruStorey/rora-theme/main/apps/home-assistant/themes/rora.yaml)
by hand and drop it into your `themes/` folder.

### 3. Reload themes

**Developer Tools → Actions** → run `frontend.reload_themes`. (No
restart needed once HA is already watching the folder.)

## Apply

**Profile → Browser settings → Theme** → select **Rora**.

To use Rora on a specific dashboard only (and keep the default theme
elsewhere), edit the dashboard's raw config and add at the top:

```yaml
theme: Rora
```

## Palette

| Slot                          | Colour    | Name      |
| ----------------------------- | --------- | --------- |
| Page background               | `#12101c` | Abyss     |
| Card background               | `#1a1728` | Dusk      |
| Sidebar & header              | `#0d0b14` | Void      |
| Primary text                  | `#eddeff` | Starlight |
| Secondary text                | `#a89cc8` | Veil      |
| Primary / accent / active     | `#b59eff` | Violet    |
| Lights (on)                   | `#e8d5a3` | Moonlight |
| Climate — heat                | `#f06cb8` | Rosa      |
| Climate — cool                | `#5ab4e8` | Glacier   |
| Success / locked              | `#4dd9b0` | Boreal    |
| Warning                       | `#e8d5a3` | Moonlight |
| Error                         | `#f06cb8` | Rosa      |
| Info / links                  | `#7ec8f4` | Polar     |

See [`docs/rora-palette.md`](../../docs/rora-palette.md) for the full
reference.

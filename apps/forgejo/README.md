# Rora for Forgejo

A cosy, calm dark theme — vivid aurora accents against a deep arctic night.

One theme ships here today: **`theme-rora-borealis.css`**, the Borealis
variant. Same palette and identical syntax colours as base Rora, with the
workbench accents recoloured — Boreal green carries links, active tabs,
buttons, and the logo; Violet is reserved for selection and highlight
surfaces; Dusk Pink marks reactions and removed lines.

It covers the full Forgejo surface — navbar, repo headers, issues and pull
requests, the diff viewer, labels and badges, forms, tooltips, the Actions
log console (16 ANSI slots), and Markdown rendering. Syntax highlighting is
included as explicit Chroma rules, because Forgejo hardcodes token colours
rather than reading them from CSS variables.

Tested against **Forgejo 15.x**.

## Install

Forgejo serves custom CSS from `public/assets/css/` inside its custom
directory. The path depends on your install — it's printed as **Custom File
Root Path** on `/admin` in the web UI, or as `CustomPath` in
`forgejo --help`. Common locations:

| Install                     | Custom directory                |
| --------------------------- | ------------------------------- |
| Package / binary (Linux)    | `/var/lib/forgejo/custom`       |
| Container image             | `/data/gitea`                   |
| Built from source           | `./custom` next to the binary   |

### 1. Drop the file in

```bash
FORGEJO_CUSTOM=/var/lib/forgejo/custom          # or wherever yours lives
mkdir -p "$FORGEJO_CUSTOM/public/assets/css"
curl -fsSL -o "$FORGEJO_CUSTOM/public/assets/css/theme-rora-borealis.css" \
  https://raw.githubusercontent.com/TruStorey/rora-theme/main/apps/forgejo/theme-rora-borealis.css
```

Keep the `theme-` prefix — Forgejo derives the theme's name from the
filename, so `theme-rora-borealis.css` becomes the theme `rora-borealis`.

If Forgejo runs as its own user, make sure it can read the file:

```bash
chown forgejo:forgejo "$FORGEJO_CUSTOM/public/assets/css/theme-rora-borealis.css"
```

### 2. Register it in `app.ini`

Add `rora-borealis` to the `THEMES` list, and optionally make it the
default for new users:

```ini
[ui]
THEMES = forgejo-auto,forgejo-light,forgejo-dark,rora-borealis
DEFAULT_THEME = rora-borealis
```

### 3. Restart Forgejo

```bash
sudo systemctl restart forgejo        # or: docker compose restart forgejo
```

## Apply

**Your avatar → Settings → Appearance → Theme** → select **Rora Borealis**,
then **Update Theme**.

`DEFAULT_THEME` only applies to users who haven't picked a theme themselves,
so existing accounts still need to choose it once.

Not showing up in the list? Check the filename still starts with `theme-`,
that the name in `THEMES` matches it exactly minus the prefix and extension,
and hard-reload the page (`Ctrl/Cmd + Shift + R`) — Forgejo fingerprints
assets aggressively.

## Palette

| Slot                              | Colour    | Name       |
| --------------------------------- | --------- | ---------- |
| Page background                   | `#12101c` | Abyss      |
| Box headers · panels              | `#1a1728` | Dusk       |
| Navbar · footer · menus · console | `#0d0b14` | Void       |
| Buttons                           | `#231f35` | Twilight   |
| Borders · active line             | `#2e2a45` | Horizon    |
| Primary text                      | `#eddeff` | Starlight  |
| Secondary text                    | `#a89cc8` | Veil       |
| Muted text                        | `#7a7096` | Mist       |
| Placeholders                      | `#5c5175` | Haze       |
| Primary · links · logo · success  | `#4dd9b0` | Boreal     |
| Selection · highlight surfaces    | `#b59eff` | Violet     |
| Reactions · removed lines         | `#e86fa8` | Dusk Pink  |
| Error · strings                   | `#f06cb8` | Rosa       |
| Warning · caret · moved lines     | `#e8d5a3` | Moonlight  |
| Info                              | `#7ec8f4` | Polar      |
| Git · modified                    | `#d4bc82` | Dusk Gold  |

See [`docs/rora-palette.md`](../../docs/rora-palette.md) for the full
reference.

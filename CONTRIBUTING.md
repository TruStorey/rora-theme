# Contributing to Rora

Thanks for looking. Rora is one palette ported across six apps, and almost
everything here follows from that one fact.

## The one rule

**[`docs/rora-palette.md`](docs/rora-palette.md) is the source of truth.**

Every port under [`apps/`](apps) hardcodes its own copy of the palette in
whatever format that app wants — JSON, YAML, JSONC, plain text. There is no
build step that generates them, which means a colour change is a change to
*every* file that uses it. A pull request that changes a hex in one port and
not the others will be asked to finish the job.

If you're changing how a colour is *used* in one app (say, the VS Code
breadcrumb background), that's local and fine. If you're changing what a
colour *is*, it ripples.

## Repo layout

| Path | What it is |
|------|-----------|
| [`apps/vscode/`](apps/vscode) | VS Code extension — manifest, two theme JSONs, and a committed `rora.vsix` |
| [`apps/terminal/`](apps/terminal) | Windows Terminal fragment — **the reference ANSI palette** |
| [`apps/ghostty/`](apps/ghostty) | Ghostty theme file |
| [`apps/gnome-terminal/`](apps/gnome-terminal) | `install.sh` writing a dconf profile |
| [`apps/sublime/`](apps/sublime) | Sublime Text colour scheme + UI theme |
| [`apps/home-assistant/`](apps/home-assistant) | Home Assistant `rora.yaml` |
| [`docs/`](docs) | Palette reference, generated swatches, poster |
| [`scripts/`](scripts) | Palette asset generator · VS Code variant generator |

The Rora **website is not in this repo** — it lives separately. Nothing here
needs Node, npm, or a package manager, and it should stay that way.

### The shared ANSI palette

Windows Terminal, Ghostty, GNOME Terminal, and the VS Code integrated terminal
all map the same 16 ANSI slots. `apps/terminal/rora.terminal-theme.jsonc` is the
reference — if you change an ANSI colour, change it in all four, or Rora stops
looking like one theme when you move between terminals.

## Making a palette change

1. Edit the table in `docs/rora-palette.md`.
2. Regenerate the swatch images and the poster:
   ```bash
   python3 scripts/gen-palette-assets.py
   ```
   Standard library only — no dependencies to install.
3. Propagate the new value to every port under `apps/` that uses it.
   `grep -ri '<old-hex>' apps/` will find them all.
4. Test the ports you can (see below) and say in the PR which ones you couldn't.

Nobody has all six apps installed. Being explicit about what you tested and
what you didn't is genuinely more useful than pretending.

## Testing a port

Each app's README has full install steps — those are the same steps a user
follows, so they're the honest test. A few shortcuts for development:

- **VS Code** — symlink the extension folder into your extensions directory
  instead of repackaging on every edit:
  ```bash
  ln -sfn "$PWD/apps/vscode" ~/.vscode/extensions/rora-theme.rora-dev
  ```
  Restart VS Code, then **Preferences: Color Theme → Rora**. Reload the window
  (`Developer: Reload Window`) to pick up edits to the theme JSON.
- **Ghostty / Sublime / Home Assistant** — copy or symlink the theme file into
  the config directory listed in that app's README; all three reload without a
  full restart in most cases.
- **GNOME Terminal** — run `bash apps/gnome-terminal/install.sh`. It's
  non-destructive and re-running updates the same profile rather than
  duplicating it, so it's safe to iterate on.
- **Windows Terminal** — [`apps/terminal/rora-showcase.ps1`](apps/terminal/rora-showcase.ps1)
  prints a sample of the palette in situ, which makes ANSI slot changes obvious.

## VS Code theme variants

`apps/vscode/themes/rora-color-theme.json` is the base theme and the one you
edit. **`rora-borealis-color-theme.json` is generated — don't hand-edit it.**
VS Code has no theme inheritance, so a variant has to be a full copy; rather
than maintain two 670-line files by hand, Borealis is the base plus a table of
24 workbench overrides living in
[`scripts/gen-vscode-variants.py`](scripts/gen-vscode-variants.py).

After any change to the base theme, or to the override table:

```bash
python3 scripts/gen-vscode-variants.py
```

To confirm the committed variants aren't stale (exits non-zero with a diff if
they are):

```bash
python3 scripts/gen-vscode-variants.py --check
```

Borealis differs from Rora in the `colors` block only — `tokenColors` and
`semanticTokenColors` are copied through, so the two themes are always
syntax-identical. A change that should apply to *both* themes goes in the base;
a change that is Borealis-only goes in the override table.

## The VS Code `.vsix`

`apps/vscode/rora.vsix` is a build artifact that is deliberately committed, so
people can install without a clone. **If you change the VS Code theme, you must
repackage it**, or the file users download will silently disagree with the
source:

```bash
python3 scripts/gen-vscode-variants.py   # regenerate variants first
cd apps/vscode
# bump "version" in package.json first
pnpm dlx @vscode/vsce package --out rora.vsix
```

Bump the patch version whenever the packaged contents change — an artifact whose
contents changed under an unchanged version number is worse than no artifact.
Verify the result matches its source:

```bash
for t in rora-color-theme rora-borealis-color-theme; do
  unzip -p apps/vscode/rora.vsix "extension/themes/$t.json" \
    | diff - "apps/vscode/themes/$t.json" && echo "matches source: $t"
done
```

## Commits

Lowercase prefix, then a short description of the effect:

```
new:      a theme, a feature, a port
fix:      corrected behaviour or a wrong colour
docs:     README / palette / guide changes
chore:    version bumps, housekeeping
refactor: moving things without changing them
```

Real examples from the log:

```
new: Rora GNOME Terminal theme (Ubuntu 24.04)
fix: match non-editor selection to the editor in VS Code
docs: lead VS Code install with GitHub VSIX method
```

## Adding a new port

Very welcome. To match the others, a port needs:

- `apps/<app>/` containing the theme in that app's native format
- an `apps/<app>/README.md` with an `## Install` heading, a no-clone install
  path using a `raw.githubusercontent.com` URL, and an `## Apply` section
- the full palette mapped — not just backgrounds and text; comments, selection,
  cursor, and diff/status colours are what make it feel like Rora
- a row added to the table in the root [README](README.md)
- if it has a terminal, the shared ANSI palette above

## Reporting problems

- **Bugs, wrong colours, contrast and readability** — open an issue.
- **Security issues** — don't open an issue; see [SECURITY.md](SECURITY.md).

Contrast complaints are welcome as normal issues. Rora is a low-contrast theme
by design, but "by design" and "unreadable" are different things and the line is
worth arguing about.

## Licence

By contributing you agree your work is licensed under the [MIT Licence](LICENSE).

#!/usr/bin/env python3
"""Generate the palette swatch SVGs and the palette poster.

`docs/rora-palette.md` is the source of truth: this script reads the colour
tables out of it and writes

    docs/swatches/<hex>.svg   one chip per colour, used inline in the tables
    docs/rora-palette.svg     the poster shown in the README

Run it after changing any hex value:

    python3 scripts/gen-palette-assets.py

Standard library only — this repo deliberately has no toolchain.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PALETTE_MD = ROOT / "docs" / "rora-palette.md"
SWATCH_DIR = ROOT / "docs" / "swatches"
POSTER = ROOT / "docs" / "rora-palette.svg"

# Groups to draw in the poster, keyed by the heading they live under.
POSTER_GROUPS = [
    ("Backgrounds", "the night sky"),
    ("Foreground", "starlight to silence"),
    ("Aurora accents", "cool spectrum"),
    ("Moonlight", "the one warm note"),
]

# Poster colours, drawn from the palette itself.
CANVAS = "#12101c"      # Abyss
CHIP_STROKE = "#2e2a45"  # Horizon
NAME_FILL = "#eddeff"    # Starlight
HEX_FILL = "#7a7096"     # Mist
GROUP_FILL = "#a89cc8"   # Veil

SANS = "ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"
MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"

ROW = re.compile(r"^\|\s*(?:!\[[^\]]*\]\([^)]*\)\s*\|\s*)?([^|]+?)\s*\|.*?`(#[0-9a-fA-F]{6})`")
HEADING = re.compile(r"^##\s+(.+?)\s*(?:—|$)")


def parse_palette() -> list[tuple[str, list[tuple[str, str]]]]:
    """Return [(heading, [(name, hex), ...]), ...] in document order."""
    groups: list[tuple[str, list[tuple[str, str]]]] = []
    heading = ""
    for line in PALETTE_MD.read_text(encoding="utf-8").splitlines():
        h = HEADING.match(line)
        if h:
            heading = h.group(1).strip()
            groups.append((heading, []))
            continue
        m = ROW.match(line)
        if m and groups:
            name, hex_value = m.group(1).strip(), m.group(2).lower()
            if name.lower() in {"name", "state"}:  # table header row
                continue
            groups[-1][1].append((name, hex_value))
    return groups


def write_swatches(groups) -> int:
    SWATCH_DIR.mkdir(parents=True, exist_ok=True)
    seen: set[str] = set()
    for _, colours in groups:
        for name, hex_value in colours:
            if hex_value in seen:
                continue
            seen.add(hex_value)
            svg = (
                f'<svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" '
                f'viewBox="0 0 48 24" role="img" aria-label="{name} {hex_value}">'
                f'<title>{name} {hex_value}</title>'
                f'<rect x="0.75" y="0.75" width="46.5" height="22.5" rx="5" '
                f'fill="{hex_value}" stroke="#8b8b8b" stroke-opacity="0.45" '
                f'stroke-width="1.5"/>'
                f"</svg>\n"
            )
            (SWATCH_DIR / f"{hex_value.lstrip('#')}.svg").write_text(svg, encoding="utf-8")
    return len(seen)


def esc(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def write_poster(groups) -> None:
    wanted = dict(POSTER_GROUPS)
    blocks = [
        (heading, wanted[key], colours)
        for heading, colours in groups
        for key in [heading.split(" — ")[0]]
        if key in wanted and colours
    ]

    pad, chip_w, gap, chip_h = 32, 73, 9, 44
    width = pad * 2 + chip_w * 10 + gap * 9

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{{height}}" '
        f'viewBox="0 0 {width} {{height}}" role="img" '
        f'aria-label="The Rora palette">',
        "<title>The Rora palette</title>",
        f'<rect width="{width}" height="{{height}}" rx="14" fill="{CANVAS}"/>',
    ]

    y = pad + 10
    for heading, tagline, colours in blocks:
        title = heading.split(" — ")[0]
        parts.append(
            f'<text x="{pad}" y="{y}" font-family="{SANS}" font-size="13" '
            f'font-weight="600" fill="{NAME_FILL}">{esc(title)}'
            f'<tspan fill="{GROUP_FILL}" font-weight="400"> · {esc(tagline)}</tspan></text>'
        )
        top = y + 14
        for i, (name, hex_value) in enumerate(colours):
            x = pad + i * (chip_w + gap)
            parts.append(
                f'<rect x="{x}" y="{top}" width="{chip_w}" height="{chip_h}" rx="7" '
                f'fill="{hex_value}" stroke="{CHIP_STROKE}"/>'
            )
            parts.append(
                f'<text x="{x}" y="{top + chip_h + 17}" font-family="{SANS}" '
                f'font-size="11.5" fill="{NAME_FILL}">{esc(name)}</text>'
            )
            parts.append(
                f'<text x="{x}" y="{top + chip_h + 31}" font-family="{MONO}" '
                f'font-size="10" fill="{HEX_FILL}">{hex_value}</text>'
            )
        y = top + chip_h + 31 + 34

    height = y - 34 + pad
    parts.append("</svg>")
    POSTER.write_text("\n".join(parts).format(height=height) + "\n", encoding="utf-8")


def main() -> None:
    groups = parse_palette()
    count = write_swatches(groups)
    write_poster(groups)
    named = sum(len(c) for _, c in groups)
    print(f"{count} unique colours ({named} table rows incl. aliases)")
    print(f"wrote {count} swatches to {SWATCH_DIR.relative_to(ROOT)}/")
    print(f"wrote poster to {POSTER.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

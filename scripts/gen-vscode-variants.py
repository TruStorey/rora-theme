#!/usr/bin/env python3
"""Generate the VS Code theme variants from the base Rora theme.

`apps/vscode/themes/rora-color-theme.json` is the source of truth: this script
reads it, applies a small table of workbench colour overrides, and writes

    apps/vscode/themes/rora-borealis-color-theme.json

VS Code has no theme inheritance, so a variant has to be a full copy of the
theme. Rather than hand-maintain two 670-line files, the variants are generated
and committed — the committed file is what ships in the `.vsix`, so installing
still needs no build step.

Run it after changing anything in the base theme:

    python3 scripts/gen-vscode-variants.py

Or check that the committed variants are in sync (non-zero exit if not):

    python3 scripts/gen-vscode-variants.py --check

Only the `colors` block differs. `tokenColors` and `semanticTokenColors` are
copied through untouched — the variants differ in chrome, never in syntax.

Standard library only — this repo deliberately has no toolchain.
"""

from __future__ import annotations

import difflib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "apps" / "vscode" / "themes"
BASE = THEMES / "rora-color-theme.json"

# Palette colours used by the variants, for reference while reading the tables
# below. Every one of these is already in docs/rora-palette.md.
AURORA = "#72f0c8"         # Aurora — functions · the green
AURORA_BRIGHT = "#9df5dc"  # Aurora bright
TUNDRA = "#38c4a8"         # Tundra — dimmed green
ROSA = "#f06cb8"           # Rosa — strings · the pink
DUSK_PINK = "#e86fa8"      # Dusk Pink — deprecated · removed

# Borealis: violet keeps selection and focus, green marks where you are, pink
# marks how many.
BOREALIS = {
    # Active indicators — "where you are".
    "tab.activeBorderTop": AURORA,
    "tab.unfocusedActiveBorderTop": TUNDRA,
    "activityBar.activeBorder": AURORA,
    "panelTitle.activeBorder": AURORA,
    "progressBar.background": AURORA,
    "welcomePage.progress.foreground": AURORA,
    "breadcrumb.activeSelectionForeground": AURORA,
    # Badges — "how many".
    "badge.background": ROSA,
    "activityBarBadge.background": ROSA,
    "extensionBadge.remoteBackground": ROSA,
    "statusBarItem.remoteBackground": ROSA,
    # Rosa is the badge colour now, so the error state moves one step along the
    # pinks to stay distinguishable from a count. Error *foregrounds* stay Rosa.
    "statusBarItem.errorBackground": DUSK_PINK,
    # Matches and highlights. Green reads brighter than violet at equal alpha,
    # so the washes drop a step to keep the text on top of them readable.
    "list.highlightForeground": AURORA,
    "list.filterMatchBackground": f"{AURORA}22",
    "list.filterMatchBorder": f"{AURORA}66",
    "editor.findMatchBackground": f"{AURORA}55",
    "editor.findMatchHighlightBackground": f"{AURORA}33",
    "minimap.findMatchHighlight": f"{AURORA}aa",
    "editorOverviewRuler.findMatchForeground": AURORA,
    "pickerGroup.foreground": AURORA,
    "editorSuggestWidget.highlightForeground": AURORA,
    "editorSuggestWidget.focusHighlightForeground": AURORA_BRIGHT,
    "peekViewEditor.matchHighlightBackground": f"{AURORA}33",
    "peekViewResult.matchHighlightBackground": f"{AURORA}33",
}

# (filename, theme name, overrides)
VARIANTS = [
    ("rora-borealis-color-theme.json", "Rora Borealis", BOREALIS),
]


def render(name: str, overrides: dict[str, str]) -> str:
    """Return the variant theme JSON, built from the base."""
    theme = json.loads(BASE.read_text(encoding="utf-8"))
    theme["name"] = name

    unknown = sorted(k for k in overrides if k not in theme["colors"])
    if unknown:
        raise SystemExit(
            f"{name}: override keys not present in the base theme: "
            + ", ".join(unknown)
        )

    # Assigning in place keeps the base file's key order.
    theme["colors"].update(overrides)
    return json.dumps(theme, indent=2, ensure_ascii=False) + "\n"


def check() -> int:
    stale = 0
    for filename, name, overrides in VARIANTS:
        path = THEMES / filename
        want = render(name, overrides)
        have = path.read_text(encoding="utf-8") if path.exists() else ""
        if have == want:
            print(f"in sync: {path.relative_to(ROOT)}")
            continue
        stale += 1
        print(f"STALE: {path.relative_to(ROOT)}")
        sys.stdout.writelines(
            difflib.unified_diff(
                have.splitlines(keepends=True),
                want.splitlines(keepends=True),
                fromfile="committed",
                tofile="generated",
            )
        )
    if stale:
        print(f"\n{stale} variant(s) out of date — run gen-vscode-variants.py")
    return 1 if stale else 0


def main() -> None:
    if "--check" in sys.argv[1:]:
        raise SystemExit(check())

    for filename, name, overrides in VARIANTS:
        path = THEMES / filename
        path.write_text(render(name, overrides), encoding="utf-8")
        print(f"wrote {name} ({len(overrides)} overrides) to {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

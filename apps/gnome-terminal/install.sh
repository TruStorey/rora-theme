#!/usr/bin/env bash
#
# Rora — GNOME Terminal (Ubuntu 24.04 LTS default terminal)
#
# Creates or updates a profile named "Rora". Non-destructive: your
# existing profiles are left untouched and the default profile is not
# changed. Re-running is safe — it updates the same Rora profile rather
# than creating duplicates.
#
#   bash install.sh              # install / update the Rora profile
#   bash install.sh --default    # ...and make Rora the default profile
#
set -euo pipefail

PROFILE_NAME="Rora"
BASE="/org/gnome/terminal/legacy/profiles:"

# Rora palette — matches the Windows Terminal / Ghostty / VS Code
# integrated terminal one-for-one.
BACKGROUND="#12101C" # Abyss
FOREGROUND="#EDDEFF" # Starlight
CURSOR_BG="#F06CB8"  # Rosa
CURSOR_FG="#12101C"  # Abyss
HL_BG="#231F35"      # Twilight
HL_FG="#EDDEFF"      # Starlight
PALETTE="['#0D0B14', '#F06CB8', '#72F0C8', '#D97FFF', '#7EC8F4', '#B59EFF', '#C084FC', '#EDDEFF', '#4E4468', '#F89ECE', '#9DF5DC', '#E6B0FF', '#A8DCF8', '#CDB8FF', '#D4AEFF', '#FFFFFF']"

set_default=false
[ "${1:-}" = "--default" ] && set_default=true

if ! command -v dconf >/dev/null 2>&1; then
  echo "dconf not found. Install it with:  sudo apt install dconf-cli" >&2
  exit 1
fi

# Reuse an existing Rora profile if one exists (idempotent).
uuid=""
for key in $(dconf list "$BASE/" 2>/dev/null | grep '^:' || true); do
  id="${key#:}"
  id="${id%/}"
  name="$(dconf read "$BASE/:$id/visible-name" 2>/dev/null || true)"
  if [ "$name" = "'$PROFILE_NAME'" ]; then
    uuid="$id"
    break
  fi
done

# Otherwise mint a new UUID and append it to the profile list.
if [ -z "$uuid" ]; then
  uuid="$(cat /proc/sys/kernel/random/uuid)"
  list="$(dconf read "$BASE/list" 2>/dev/null || true)"
  case "$list" in
    "" | "@as []" | "[]") list="['$uuid']" ;;
    *) list="${list%]}, '$uuid']" ;;
  esac
  dconf write "$BASE/list" "$list"
fi

p="$BASE/:$uuid"
dconf write "$p/visible-name"               "'$PROFILE_NAME'"
dconf write "$p/use-theme-colors"           "false"
dconf write "$p/background-color"           "'$BACKGROUND'"
dconf write "$p/foreground-color"           "'$FOREGROUND'"
dconf write "$p/bold-color-same-as-fg"      "true"
dconf write "$p/cursor-colors-set"          "true"
dconf write "$p/cursor-background-color"    "'$CURSOR_BG'"
dconf write "$p/cursor-foreground-color"    "'$CURSOR_FG'"
dconf write "$p/highlight-colors-set"       "true"
dconf write "$p/highlight-background-color" "'$HL_BG'"
dconf write "$p/highlight-foreground-color" "'$HL_FG'"
dconf write "$p/palette"                    "$PALETTE"

if [ "$set_default" = true ]; then
  dconf write "$BASE/default" "'$uuid'"
  echo "Rora installed and set as the default profile (UUID $uuid)."
else
  echo "Rora profile installed (UUID $uuid)."
  echo "Select it: GNOME Terminal → ☰ → Preferences → 'Rora'."
  echo "Make it default: re-run with  bash install.sh --default"
fi

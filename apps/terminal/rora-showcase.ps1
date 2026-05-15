# ─────────────────────────────────────────────
#  Rora — Colour Showcase
#  Run in Windows Terminal with the Rora scheme
#  active to see the theme in action.
# ─────────────────────────────────────────────

$ESC = [char]27

function FG($code, $label, $hex) {
    Write-Host -NoNewline "$ESC[${code}m  ██  $ESC[0m "
    Write-Host -NoNewline "$ESC[${code}m${label}$ESC[0m"
    Write-Host "  $hex"
}

function Divider($label) {
    Write-Host ""
    Write-Host "  $ESC[2m── $label $ESC[0m"
    Write-Host ""
}

# ── Header ────────────────────────────────────
Write-Host ""
Write-Host "  $ESC[1m$ESC[35mRora$ESC[0m"
Write-Host "  $ESC[2m─────────────────────────────────────────$ESC[0m"
Write-Host ""

# ── Palette swatches ──────────────────────────
Write-Host "  $ESC[2mStandard colours (ANSI 0-7)$ESC[0m"
Write-Host ""
FG 30 "Black      Void"        "#0d0b14"
FG 31 "Red        Rosa"        "#f06cb8"
FG 32 "Green      Aurora"      "#72f0c8"
FG 33 "Yellow     Nebula"      "#d97fff"
FG 34 "Blue       Polar"       "#7ec8f4"
FG 35 "Purple     Violet"      "#b59eff"
FG 36 "Cyan       Dusk Rose"   "#c084fc"
FG 37 "White      Starlight"   "#eddeff"

Write-Host ""
Write-Host "  $ESC[2mBright colours (ANSI 8-15)$ESC[0m"
Write-Host ""
FG 90 "Bright Black   Shadow"       "#4e4468"
FG 91 "Bright Red     Rosa Light"   "#f89ece"
FG 92 "Bright Green   Aurora Light" "#9df5dc"
FG 93 "Bright Yellow  Nebula Light" "#e6b0ff"
FG 94 "Bright Blue    Polar Light"  "#a8dcf8"
FG 95 "Bright Purple  Violet Light" "#cdb8ff"
FG 96 "Bright Cyan    Dusk Rose Lt" "#d4aeff"
FG 97 "Bright White   Pure White"   "#ffffff"

Write-Host ""
Write-Host "  $ESC[2mAll 16 background blocks$ESC[0m"
Write-Host ""
Write-Host -NoNewline "  "
foreach ($c in 40,41,42,43,44,45,46,47) {
    Write-Host -NoNewline "$ESC[${c}m    $ESC[0m"
}
Write-Host ""
Write-Host -NoNewline "  "
foreach ($c in 100,101,102,103,104,105,106,107) {
    Write-Host -NoNewline "$ESC[${c}m    $ESC[0m"
}
Write-Host ""

# ── Git status ────────────────────────────────
Divider "git status"

Write-Host "  On branch $ESC[35mfeature/rora-theme$ESC[0m"
Write-Host "  Your branch is ahead of $ESC[36m'origin/main'$ESC[0m by $ESC[33m3$ESC[0m commits."
Write-Host ""
Write-Host "  Changes to be committed:"
Write-Host "  $ESC[2m(use ``git restore --staged <file>`` to unstage)$ESC[0m"
Write-Host "        $ESC[32mnew file:$ESC[0m   themes/rora.json"
Write-Host "        $ESC[32mnew file:$ESC[0m   themes/rora-showcase.ps1"
Write-Host "        $ESC[32mmodified:$ESC[0m   README.md"
Write-Host ""
Write-Host "  Changes not staged for commit:"
Write-Host "        $ESC[31mmodified:$ESC[0m   package.json"
Write-Host "        $ESC[31mdeleted:$ESC[0m    themes/old-dark.json"
Write-Host ""
Write-Host "  Untracked files:"
Write-Host "        $ESC[90mscreenshots/$ESC[0m"

# ── npm install ───────────────────────────────
Divider "npm install"

Write-Host "  $ESC[32madded$ESC[0m 312 packages in $ESC[33m4.2s$ESC[0m"
Write-Host ""
Write-Host "  $ESC[33m3$ESC[0m packages are looking for funding"
Write-Host "    run $ESC[36mnpm fund$ESC[0m for details"
Write-Host ""
Write-Host "  found $ESC[32m0$ESC[0m vulnerabilities"

# ── Build output ──────────────────────────────
Divider "npm run build"

Write-Host "  $ESC[2m> rora@1.0.0 build$ESC[0m"
Write-Host "  $ESC[2m> tsc && vite build$ESC[0m"
Write-Host ""
Write-Host "  $ESC[34mvite$ESC[0m $ESC[2mv5.2.0$ESC[0m building for production..."
Write-Host "  $ESC[32mv$ESC[0m 142 modules transformed."
Write-Host "  $ESC[2mdist/index.html$ESC[0m                   $ESC[37m1.23 kB$ESC[0m"
Write-Host "  $ESC[2mdist/assets/index-DxYmE9Ik.css$ESC[0m   $ESC[37m14.82 kB$ESC[0m $ESC[2m| gzip:$ESC[0m  $ESC[32m3.91 kB$ESC[0m"
Write-Host "  $ESC[2mdist/assets/index-Bh3nWqLp.js$ESC[0m    $ESC[37m87.44 kB$ESC[0m $ESC[2m| gzip:$ESC[0m $ESC[32m28.12 kB$ESC[0m"
Write-Host "  $ESC[32mv$ESC[0m built in $ESC[33m1.84s$ESC[0m"

# ── Errors and warnings ───────────────────────
Divider "errors and warnings"

Write-Host "  $ESC[31merror$ESC[0m $ESC[2mTS2304:$ESC[0m Cannot find name $ESC[36m'AuroraConfig'$ESC[0m."
Write-Host "  $ESC[2m  src/theme/rora.ts:12:18$ESC[0m"
Write-Host ""
Write-Host "  $ESC[33mwarn$ESC[0m  $ESC[2mESLint:$ESC[0m $ESC[37m'palette'$ESC[0m is assigned but never used."
Write-Host "  $ESC[2m  src/tokens.ts:34:7$ESC[0m"
Write-Host ""
Write-Host "  $ESC[32minfo$ESC[0m  Server running at $ESC[36mhttp://localhost:$ESC[1m5173$ESC[0m"
Write-Host "  $ESC[90mdebug$ESC[0m Watching for file changes..."

# ── Directory listing ─────────────────────────
Divider "directory tree"

Write-Host "  $ESC[34m.$ESC[0m"
Write-Host "  $ESC[34m|-- src/$ESC[0m"
Write-Host "  $ESC[34m|   |-- themes/$ESC[0m"
Write-Host "  $ESC[34m|   |   |-- $ESC[37mrora.json$ESC[0m"
Write-Host "  $ESC[34m|   |   `-- $ESC[90mrora.bak.json$ESC[0m"
Write-Host "  $ESC[34m|   |-- $ESC[36mtokens.ts$ESC[0m"
Write-Host "  $ESC[34m|   `-- $ESC[36mindex.ts$ESC[0m"
Write-Host "  $ESC[34m|-- $ESC[37mpackage.json$ESC[0m"
Write-Host "  $ESC[34m|-- $ESC[37mREADME.md$ESC[0m"
Write-Host "  $ESC[34m`-- $ESC[90m.gitignore$ESC[0m"

# ── Test runner ───────────────────────────────
Divider "test runner (vitest)"

Write-Host "  $ESC[2mrora$ESC[0m $ESC[35m>$ESC[0m vitest run"
Write-Host ""
Write-Host "  $ESC[2m RUN  v1.6.0$ESC[0m"
Write-Host ""
Write-Host "  $ESC[32m v $ESC[0msrc/palette.test.ts $ESC[90m(12ms)$ESC[0m"
Write-Host "  $ESC[32m v $ESC[0msrc/contrast.test.ts $ESC[90m(8ms)$ESC[0m"
Write-Host "  $ESC[31m x $ESC[0msrc/tokens.test.ts $ESC[90m(23ms)$ESC[0m"
Write-Host ""
Write-Host "  $ESC[31m tokens > should map shadow to line numbers$ESC[0m"
Write-Host "  $ESC[2m  Expected:$ESC[0m $ESC[32m'#4e4468'$ESC[0m"
Write-Host "  $ESC[2m  Received:$ESC[0m $ESC[31m'#6b5f88'$ESC[0m"
Write-Host ""
Write-Host "  $ESC[2mTest Files$ESC[0m  $ESC[31m1 failed$ESC[0m $ESC[90m|$ESC[0m $ESC[32m2 passed$ESC[0m $ESC[90m(3)$ESC[0m"
Write-Host "  $ESC[2m     Tests$ESC[0m  $ESC[31m1 failed$ESC[0m $ESC[90m|$ESC[0m $ESC[32m23 passed$ESC[0m $ESC[90m(24)$ESC[0m"
Write-Host "  $ESC[2m  Duration$ESC[0m  $ESC[33m892ms$ESC[0m"

# ── Docker ────────────────────────────────────
Divider "docker ps"

Write-Host "  $ESC[2mCONTAINER ID   IMAGE              COMMAND                STATUS$ESC[0m"
Write-Host "  $ESC[36ma3f82bc91d04$ESC[0m   $ESC[37mnginx:alpine$ESC[0m       $ESC[2m`"/docker-entryp..`"$ESC[0m   $ESC[32mUp 2 hours$ESC[0m"
Write-Host "  $ESC[36mb7c541fa2e10$ESC[0m   $ESC[37mpostgres:16$ESC[0m        $ESC[2m`"docker-entrypoint`"$ESC[0m   $ESC[32mUp 2 hours$ESC[0m"
Write-Host "  $ESC[36m09d3e2a81cc7$ESC[0m   $ESC[37mrora-dev:latest$ESC[0m    $ESC[2m`"npm run dev`"$ESC[0m         $ESC[32mUp 43 minutes$ESC[0m"
Write-Host "  $ESC[36m4f1a09bc3321$ESC[0m   $ESC[37mredis:7$ESC[0m            $ESC[2m`"docker-entrypoint`"$ESC[0m   $ESC[31mExited (1) 5 min ago$ESC[0m"

# ── SSH / ping ────────────────────────────────
Divider "ping"

Write-Host "  Pinging $ESC[36mgithub.com$ESC[0m [$ESC[33m140.82.121.4$ESC[0m]:"
Write-Host "  Reply from $ESC[33m140.82.121.4$ESC[0m: bytes=$ESC[37m32$ESC[0m time=$ESC[32m14ms$ESC[0m TTL=$ESC[90m55$ESC[0m"
Write-Host "  Reply from $ESC[33m140.82.121.4$ESC[0m: bytes=$ESC[37m32$ESC[0m time=$ESC[32m13ms$ESC[0m TTL=$ESC[90m55$ESC[0m"
Write-Host "  Reply from $ESC[33m140.82.121.4$ESC[0m: bytes=$ESC[37m32$ESC[0m time=$ESC[33m28ms$ESC[0m TTL=$ESC[90m55$ESC[0m"
Write-Host "  Reply from $ESC[33m140.82.121.4$ESC[0m: bytes=$ESC[37m32$ESC[0m time=$ESC[31m142ms$ESC[0m TTL=$ESC[90m55$ESC[0m"
Write-Host ""
Write-Host "  Ping statistics for $ESC[36m140.82.121.4$ESC[0m:"
Write-Host "    Packets: Sent=$ESC[37m4$ESC[0m, Received=$ESC[32m4$ESC[0m, Lost=$ESC[32m0$ESC[0m $ESC[90m(0% loss)$ESC[0m"

# ── Footer ────────────────────────────────────
Write-Host ""
Write-Host "  $ESC[2m─────────────────────────────────────────$ESC[0m"
Write-Host "  $ESC[2mRora$ESC[0m"
Write-Host ""
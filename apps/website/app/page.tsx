import { readFileSync } from "node:fs";
import path from "node:path";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { palette, totalSwatches } from "@/lib/palette";
import { highlight } from "@/lib/highlight";
import { SAMPLES } from "@/lib/samples";

const TERMINAL_SCHEME = readFileSync(
  path.resolve(process.cwd(), "../terminal/rora.terminal-theme.jsonc"),
  "utf-8",
);

export default async function Home() {
  const [tsHtml, pyHtml, jsonHtml, terminalHtml] = await Promise.all([
    highlight(SAMPLES.typescript, "typescript"),
    highlight(SAMPLES.python, "python"),
    highlight(SAMPLES.json, "json"),
    highlight(TERMINAL_SCHEME, "json"),
  ]);

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <AuroraBackdrop />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
        <Hero />
        <Palette />
        <CodeShowcase tsHtml={tsHtml} pyHtml={pyHtml} jsonHtml={jsonHtml} />
        <Install schemeRaw={TERMINAL_SCHEME} schemeHtml={terminalHtml} />
        <Footer />
      </div>
    </main>
  );
}

function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #b59eff 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-20 -left-32 h-96 w-[40rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #72f0c8 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-40 top-72 h-96 w-[36rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #f06cb8 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-start gap-6 pt-14 pb-12 sm:pt-20 sm:pb-16">
      <Badge
        variant="outline"
        className="border-rora-horizon bg-rora-dusk/60 text-rora-veil backdrop-blur"
      >
        <Sparkles className="size-3 text-rora-aurora" />
        v1 · {totalSwatches} colours
      </Badge>

      <h1 className="text-6xl font-semibold tracking-tight text-rora-starlight sm:text-7xl">
        Rora
      </h1>

      <p className="max-w-2xl text-balance text-lg text-rora-veil sm:text-xl">
        A cosy, calm dark theme — vivid aurora accents against a deep arctic
        night. The background holds itself. The colour is a gift on top.
      </p>
    </section>
  );
}

function Palette() {
  return (
    <section className="py-14">
      <SectionHeader
        eyebrow="The palette"
        title="Twenty-three colours, four moods"
        description="Each colour earns its place. Backgrounds hold the night sky. Foregrounds fade from starlight into shadow. Aurora accents arc across the cool spectrum. One warm note keeps the room lit."
      />

      <div className="mt-12 space-y-12">
        {palette.map((group) => (
          <div key={group.title}>
            <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight">
                {group.title}
              </h3>
              <p className="text-sm text-rora-veil">{group.tagline}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {group.swatches.map((s) => (
                <Card
                  key={s.hex}
                  className="overflow-hidden p-0 transition-transform hover:-translate-y-0.5"
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: s.hex }}
                  />
                  <div className="space-y-1 p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium">{s.name}</span>
                      <code className="font-mono text-[11px] text-rora-veil">
                        {s.hex}
                      </code>
                    </div>
                    <p className="text-xs text-rora-mist">{s.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type CodeShowcaseProps = {
  tsHtml: string;
  pyHtml: string;
  jsonHtml: string;
};

function CodeShowcase({ tsHtml, pyHtml, jsonHtml }: CodeShowcaseProps) {
  const panels: Array<{ label: string; html: string }> = [
    { label: "TypeScript", html: tsHtml },
    { label: "Python", html: pyHtml },
    { label: "JSON", html: jsonHtml },
  ];

  return (
    <section className="py-14">
      <SectionHeader
        eyebrow="In code"
        title="How it feels on a working file"
        description="Strings sing in rosa. Keywords settle into violet. Comments fall back to mist. Types glow polar. The palette earns the screen-time you give it."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {panels.map((p) => (
          <Card
            key={p.label}
            className="overflow-hidden p-0 ring-1 ring-rora-horizon/60"
          >
            <div className="flex items-center justify-between border-b border-rora-horizon/60 bg-rora-dusk/80 px-4 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-rora-veil">
                {p.label}
              </span>
              <span className="size-2 rounded-full bg-rora-aurora/70" />
            </div>
            <div
              className="rora-shiki overflow-x-auto px-4 py-4 text-[13px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p.html }}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}

type InstallProps = {
  schemeRaw: string;
  schemeHtml: string;
};

function Install({ schemeRaw, schemeHtml }: InstallProps) {
  return (
    <section className="py-14">
      <SectionHeader
        eyebrow="Install"
        title="Start with the terminal"
        description="Drop the scheme into Windows Terminal's settings.json and pick it from the colour-scheme menu. VS Code and JetBrains packages are next."
      />

      <Card className="mt-10 overflow-hidden p-0 ring-1 ring-rora-horizon/60">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rora-horizon/60 bg-rora-dusk/80 px-5 py-3">
          <div>
            <p className="text-sm font-medium">Windows Terminal scheme</p>
            <p className="text-xs text-rora-veil">
              Paste into the <code className="font-mono text-rora-veil">schemes</code> array in your Windows
              Terminal settings.
            </p>
          </div>
          <CopyButton value={schemeRaw} label="Copy scheme" variant="default" />
        </div>
        <div
          className="rora-shiki max-h-[26rem] overflow-auto px-5 py-4 text-[13px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: schemeHtml }}
        />
      </Card>

      <p className="mt-6 text-sm text-rora-mist">
        VS Code · JetBrains · iTerm2 — coming.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-12 mb-12 border-t border-rora-horizon/60 pt-10 text-sm text-rora-mist">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Rora · Borealis · Polaris · Solstice · Equinox — variants on the way.
        </p>
        <p>
          A dark theme for the cosy, the focused, and the permanently
          night-mode.
        </p>
      </div>
    </footer>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-rora-aurora">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base text-rora-veil">{description}</p>
    </div>
  );
}

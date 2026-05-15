import { readFileSync } from "node:fs";
import path from "node:path";
import { Sparkles, Terminal, Code2, Briefcase, MonitorDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { SectionHeader } from "@/components/section-header";
import { totalSwatches } from "@/lib/palette";
import { highlight } from "@/lib/highlight";
import { SAMPLES } from "@/lib/samples";

const TERMINAL_SCHEME = readFileSync(
  path.resolve(process.cwd(), "../terminal/rora.terminal-theme.jsonc"),
  "utf-8",
);

export default async function Home() {
  const [tsHtml, pyHtml, jsonHtml] = await Promise.all([
    highlight(SAMPLES.typescript, "typescript"),
    highlight(SAMPLES.python, "python"),
    highlight(SAMPLES.json, "json"),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
      <Hero tsHtml={tsHtml} pyHtml={pyHtml} jsonHtml={jsonHtml} />
      <Apps />
    </div>
  );
}

type HeroProps = {
  tsHtml: string;
  pyHtml: string;
  jsonHtml: string;
};

function Hero({ tsHtml, pyHtml, jsonHtml }: HeroProps) {
  const panels = [
    { label: "TypeScript", html: tsHtml },
    { label: "Python", html: pyHtml },
    { label: "JSON", html: jsonHtml },
  ];

  return (
    <section className="flex flex-col gap-10 pt-10 pb-12 sm:pt-14 sm:pb-16">
      <div className="flex flex-col items-start gap-6">
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
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
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

type App = {
  name: string;
  blurb: string;
  Icon: typeof Terminal;
  status: "available" | "coming";
  action?: { kind: "copy-terminal" };
};

const apps: App[] = [
  {
    name: "Windows Terminal",
    blurb: "Drop-in colour scheme for Windows Terminal.",
    Icon: Terminal,
    status: "available",
    action: { kind: "copy-terminal" },
  },
  {
    name: "VS Code",
    blurb: "Editor theme extension.",
    Icon: Code2,
    status: "coming",
  },
  {
    name: "JetBrains",
    blurb: "IntelliJ / PyCharm / WebStorm.",
    Icon: Briefcase,
    status: "coming",
  },
  {
    name: "iTerm2",
    blurb: "macOS terminal colour preset.",
    Icon: MonitorDot,
    status: "coming",
  },
];

function Apps() {
  return (
    <section className="py-14">
      <SectionHeader
        eyebrow="Apps"
        title="Editors and terminals"
        description="Rora ships first as a Windows Terminal scheme. Editor and JetBrains packages are on the way — same palette, same hierarchy, fewer surprises."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map((app) => (
          <AppCard key={app.name} app={app} />
        ))}
      </div>
    </section>
  );
}

function AppCard({ app }: { app: App }) {
  const { Icon, name, blurb, status, action } = app;
  const available = status === "available";

  return (
    <Card
      className={`flex h-full flex-col gap-4 p-5 transition-colors ${
        available
          ? "ring-1 ring-rora-horizon/60"
          : "border-dashed bg-rora-dusk/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-lg ${
            available
              ? "bg-rora-violet/15 text-rora-violet"
              : "bg-rora-twilight text-rora-veil"
          }`}
        >
          <Icon className="size-5" />
        </div>
        <Badge
          variant={available ? "default" : "outline"}
          className={
            available
              ? ""
              : "border-rora-horizon bg-transparent text-rora-mist"
          }
        >
          {available ? "Available" : "Coming"}
        </Badge>
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-rora-starlight">{name}</h3>
        <p className="mt-1 text-sm text-rora-veil">{blurb}</p>
      </div>
      {action?.kind === "copy-terminal" ? (
        <CopyButton
          value={TERMINAL_SCHEME}
          label="Copy scheme"
          variant="secondary"
          size="sm"
          className="self-start"
        />
      ) : null}
    </Card>
  );
}

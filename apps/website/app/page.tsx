import { readFileSync } from "node:fs";
import path from "node:path";
import { AppsGrid } from "@/components/apps-grid";
import { CodeCarousel, type Slide } from "@/components/code-carousel";
import { HeroText } from "@/components/hero-text";
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

  const slides: Slide[] = [
    { language: "TypeScript", filename: "theme.ts", html: tsHtml },
    { language: "Python", filename: "theme.py", html: pyHtml },
    { language: "JSON", filename: "theme.json", html: jsonHtml },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
      <section className="flex flex-col gap-12 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <HeroText totalSwatches={totalSwatches} />
        <CodeCarousel slides={slides} />
      </section>

      <section className="py-14">
        <SectionHeader
          eyebrow="Apps"
          title="Editors and terminals"
          description="Rora ships first as a Windows Terminal scheme. Editor and JetBrains packages are on the way — same palette, same hierarchy, fewer surprises."
        />
        <div className="mt-10">
          <AppsGrid terminalScheme={TERMINAL_SCHEME} />
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { palette, totalSwatches } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Palette · Rora",
  description: `The full Rora palette — ${totalSwatches} colours across backgrounds, foregrounds, aurora accents, and one warm note.`,
};

export default function PalettePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 sm:px-8 sm:pt-14 sm:pb-16">
      <SectionHeader
        eyebrow="The palette"
        title={`${totalSwatches} colours, four moods`}
        description="Each colour earns its place. Backgrounds hold the night sky. Foregrounds fade from starlight into shadow. Aurora accents arc across the cool spectrum. One warm note keeps the room lit."
      />

      <div className="mt-12 space-y-12">
        {palette.map((group) => (
          <section key={group.title}>
            <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-rora-starlight">
                {group.title}
              </h2>
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
          </section>
        ))}
      </div>
    </div>
  );
}

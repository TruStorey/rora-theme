import { cn } from "@/lib/utils";

type Props = {
  filename: string;
  language: string;
  html: string;
  className?: string;
};

export function CodeScreenshot({ filename, language, html, className }: Props) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-rora-dusk ring-1 ring-rora-horizon/70",
        "shadow-[0_30px_80px_-20px_rgba(181,158,255,0.35),0_10px_40px_-12px_rgba(114,240,200,0.18)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(181,158,255,0.18), transparent 60%)",
        }}
      />

      <div className="flex items-center justify-between gap-3 border-b border-rora-horizon/60 bg-rora-twilight/70 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rora-rosa" />
          <span className="size-2.5 rounded-full bg-rora-moonlight" />
          <span className="size-2.5 rounded-full bg-rora-aurora" />
        </div>
        <span className="font-mono text-xs text-rora-veil">{filename}</span>
        <span className="rounded-md border border-rora-horizon/60 bg-rora-dusk/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-rora-veil">
          {language}
        </span>
      </div>

      <div
        className="rora-shiki overflow-x-auto px-5 py-5 text-[13px] leading-relaxed sm:text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

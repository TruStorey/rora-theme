"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Braces,
  Code2,
  Ghost,
  House,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type App = {
  name: string;
  blurb: string;
  Icon: LucideIcon;
  status: "available" | "coming";
  viewUrl?: string;
};

export function AppsGrid() {
  const reduceMotion = useReducedMotion();

  const apps: App[] = [
    {
      name: "Windows Terminal",
      blurb: "Drop-in colour scheme for Windows Terminal.",
      Icon: Terminal,
      status: "available",
      viewUrl:
        "https://github.com/TruStorey/rora-theme/tree/main/apps/terminal#install",
    },
    {
      name: "VS Code",
      blurb: "Editor + integrated terminal, with semantic highlighting.",
      Icon: Code2,
      status: "available",
      viewUrl:
        "https://github.com/TruStorey/rora-theme/tree/main/apps/vscode#install",
    },
    {
      name: "Ghostty",
      blurb: "GPU-accelerated terminal colour theme.",
      Icon: Ghost,
      status: "available",
      viewUrl:
        "https://github.com/TruStorey/rora-theme/tree/main/apps/ghostty#install",
    },
    {
      name: "Sublime Text",
      blurb: "Colour scheme plus a matching UI theme.",
      Icon: Braces,
      status: "available",
      viewUrl:
        "https://github.com/TruStorey/rora-theme/tree/main/apps/sublime#install",
    },
    {
      name: "Home Assistant",
      blurb: "Full UI + dashboard theme — cards, sidebar, charts, editor.",
      Icon: House,
      status: "available",
      viewUrl:
        "https://github.com/TruStorey/rora-theme/tree/main/apps/home-assistant#install",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {apps.map((app, i) => {
        const available = app.status === "available";
        const Icon = app.Icon;
        return (
          <motion.div
            key={app.name}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : i * 0.06,
            }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
          >
            <Card
              className={cn(
                "flex h-full flex-col gap-4 p-5 transition-colors",
                available
                  ? "ring-1 ring-rora-horizon/60 hover:ring-rora-violet/70"
                  : "border-dashed bg-rora-dusk/40",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg",
                    available
                      ? "bg-rora-violet/15 text-rora-violet"
                      : "bg-rora-twilight text-rora-veil",
                  )}
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
                <h3 className="text-base font-semibold text-rora-starlight">
                  {app.name}
                </h3>
                <p className="mt-1 text-sm text-rora-veil">{app.blurb}</p>
              </div>
              {app.viewUrl ? (
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="self-start gap-2"
                >
                  <a href={app.viewUrl} target="_blank" rel="noreferrer">
                    Install guide
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ) : null}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

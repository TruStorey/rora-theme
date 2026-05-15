"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  totalSwatches: number;
};

export function HeroText({ totalSwatches }: Props) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="flex flex-col items-start gap-6">
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ duration: 0.5, ease, delay: 0 }}
      >
        <Badge
          variant="outline"
          className="border-rora-horizon bg-rora-dusk/60 text-rora-veil backdrop-blur"
        >
          <Sparkles className="size-3 text-rora-aurora" />
          v1 · {totalSwatches} colours
        </Badge>
      </motion.div>

      <motion.h1
        initial={initial}
        animate={animate}
        transition={{ duration: 0.6, ease, delay: 0.08 }}
        className="text-6xl font-semibold tracking-tight text-rora-aurora sm:text-7xl"
      >
        Rora <span className="text-rora-starlight">Theme</span>
      </motion.h1>

      <motion.p
        initial={initial}
        animate={animate}
        transition={{ duration: 0.6, ease, delay: 0.16 }}
        className="max-w-2xl text-balance text-lg text-rora-veil sm:text-xl"
      >
        A cosy, calm dark theme — vivid aurora accents against a deep arctic
        night. The background holds itself. The colour is a gift on top.
      </motion.p>
    </div>
  );
}

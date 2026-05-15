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
    <div className="flex flex-col items-center gap-6 text-center">
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
        className="text-6xl font-semibold tracking-tight sm:text-7xl"
      >
        <motion.span
          aria-hidden
          className="inline-block bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #b59eff 0%, #c084fc 11%, #d97fff 22%, #f06cb8 33%, #e86fa8 44%, #7ec8f4 55%, #5ab4e8 66%, #72f0c8 77%, #4dd9b0 88%, #38c4a8 100%)",
            backgroundSize: "300% 100%",
            backgroundPosition: "0% 50%",
          }}
          animate={
            reduceMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%"] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 22,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        >
          Rora
        </motion.span>
        <span className="sr-only">Rora</span>{" "}
        <span className="text-rora-starlight">Theme</span>
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

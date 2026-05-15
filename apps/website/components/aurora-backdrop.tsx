"use client";

import { motion, useReducedMotion } from "motion/react";

type Blob = {
  color: string;
  className: string;
  drift: { x: number; y: number };
  duration: number;
};

const BLOBS: Blob[] = [
  {
    color: "#b59eff",
    className:
      "absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl",
    drift: { x: 30, y: 24 },
    duration: 18,
  },
  {
    color: "#72f0c8",
    className:
      "absolute top-20 -left-32 h-96 w-[40rem] rounded-full opacity-25 blur-3xl",
    drift: { x: 40, y: -28 },
    duration: 22,
  },
  {
    color: "#f06cb8",
    className:
      "absolute -right-40 top-72 h-96 w-[36rem] rounded-full opacity-25 blur-3xl",
    drift: { x: -36, y: 32 },
    duration: 24,
  },
];

export function AuroraBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={b.className}
          style={{
            background: `radial-gradient(closest-side, ${b.color} 0%, transparent 70%)`,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, b.drift.x, 0],
                  y: [0, b.drift.y, 0],
                }
          }
          transition={{
            duration: b.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
}

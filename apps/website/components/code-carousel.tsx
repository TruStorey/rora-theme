"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useReducedMotion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CodeScreenshot } from "@/components/code-screenshot";
import { cn } from "@/lib/utils";

export type Slide = {
  language: string;
  filename: string;
  html: string;
};

type Props = {
  slides: Slide[];
};

export function CodeCarousel({ slides }: Props) {
  const reduceMotion = useReducedMotion();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const handler = () => setCurrent(api.selectedScrollSnap());
    api.on("select", handler);
    return () => {
      api.off("select", handler);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        opts={{ align: "center", loop: true }}
        plugins={
          reduceMotion
            ? []
            : [
                Autoplay({
                  delay: 5500,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]
        }
        setApi={(a) => setApi(a)}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {slides.map((s, i) => (
            <CarouselItem key={s.language} className="pl-4">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={
                  current === i
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0.55, scale: 0.97 }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-3xl"
              >
                <CodeScreenshot
                  filename={s.filename}
                  language={s.language}
                  html={s.html}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex -left-2 lg:-left-6" />
        <CarouselNext className="hidden sm:flex -right-2 lg:-right-6" />
      </Carousel>

      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.language}
            type="button"
            aria-label={`Show ${s.language}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              current === i
                ? "w-8 bg-rora-violet"
                : "w-2.5 bg-rora-horizon hover:bg-rora-veil",
            )}
          />
        ))}
      </div>
    </div>
  );
}

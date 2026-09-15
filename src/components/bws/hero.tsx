"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Slideshow } from "@/lib/types";
import { resolveSlideshowImage } from "@/lib/bws";

export function Hero({ slideshows }: { slideshows: Slideshow[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slideshows.length;

  const goTo = useCallback(
    (i: number) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  if (count === 0) return null;

  const active = slideshows[index];
  const activeHref = active.link || active.url || null;

  return (
    <section className="mx-auto max-w-8xl px-4 sm:px-6 pt-4 sm:pt-6">
      <div
        className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[192/71] w-full">
          {slideshows.map((s, i) => {
            const src = resolveSlideshowImage(s.image);
            return (
              <div
                key={s.id}
                aria-hidden={i !== index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={src}
                  alt={s.judul || `Slideshow ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Slide sebelumnya"
              className="absolute left-3 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Slide berikutnya"
              className="absolute right-3 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
              {slideshows.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Ke slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {activeHref && (
          <a href={activeHref} target={activeHref.startsWith("http") ? "_blank" : undefined} className="absolute inset-0 z-10" aria-label="Buka tautan slideshow">
            <span className="sr-only">Buka tautan</span>
          </a>
        )}
      </div>
    </section>
  );
}

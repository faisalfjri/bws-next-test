"use client";

import * as React from "react";
import Image from "next/image";
import type { Slideshow } from "@/lib/types";
import { resolveSlideshowImage } from "@/lib/bws";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function Hero({ slideshows }: { slideshows: Slideshow[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = slideshows.length;

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Autoplay every 5s, pause on hover
  React.useEffect(() => {
    if (paused || !api || count <= 1) return;
    const t = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(t);
  }, [paused, api, count]);

  if (count === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-4 sm:pt-6">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Carousel opts={{ align: "center", loop: true }} setApi={setApi}>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100">
            <CarouselContent className="ml-0">
              {slideshows.map((s, i) => {
                const src = resolveSlideshowImage(s.image);
                const href = s.link || s.url || null;
                const img = (
                  <Image
                    src={src}
                    alt={s.judul || `Slideshow ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                );
                return (
                  <CarouselItem key={s.id} className="basis-full pl-0">
                    <div className="relative aspect-[192/71] w-full">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="block h-full w-full"
                        >
                          {img}
                        </a>
                      ) : (
                        img
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {count > 1 && (
              <>
                <div className="absolute left-3 top-1/2 z-20 -translate-y-1/2">
                  <CarouselPrevious className="static h-9 w-9 translate-none border-0 bg-black/30 text-white backdrop-blur hover:bg-black/50 hover:text-white" />
                </div>
                <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2">
                  <CarouselNext className="static h-9 w-9 translate-none border-0 bg-black/30 text-white backdrop-blur hover:bg-black/50 hover:text-white" />
                </div>
                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
                  {slideshows.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => api?.scrollTo(i)}
                      aria-label={`Ke slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
}

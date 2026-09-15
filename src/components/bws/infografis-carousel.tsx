"use client";

import * as React from "react";
import Image from "next/image";
import type { ProductItem } from "@/lib/types";
import { resolveProductImage } from "@/lib/bws";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function InfografisCarousel({ items }: { items: ProductItem[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = items.length;

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

  if (count === 0) {
    return <p className="text-sm text-gray-400">Belum ada infografis.</p>;
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel opts={{ align: "center", loop: true }} setApi={setApi}>
        <CarouselContent>
          {items.map((p, i) => (
            <CarouselItem key={p.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <figure
                onClick={() => api?.scrollTo(i)}
                className={`cursor-pointer rounded-2xl border bg-white p-2.5 transition ${
                i === index
                  ? "border-sky-200"
                  : "border-gray-100 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="relative aspect-[1791/2532] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={resolveProductImage(p.image)}
                    alt={p.nama}
                    fill
                    className="object-cover"
                    unoptimized
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
                <figcaption className="px-1 pt-2 pb-1 text-xs font-semibold text-gray-800 line-clamp-2">
                  {p.nama}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {items.map((p, i) => (
              <button
                key={p.id}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ke infografis ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-sky-700" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="mr-1 text-xs tabular-nums text-gray-400">
              {index + 1} / {count}
            </span>
            <CarouselPrevious className="static h-9 w-9 translate-none" />
            <CarouselNext className="static h-9 w-9 translate-none bg-gray-900 text-white hover:bg-gray-700 hover:text-white" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

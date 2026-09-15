"use client";

import { useEffect, useState } from "react";

function formatClock(now: Date, opts?: { short?: boolean }): string {
  const datePart = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: opts?.short ? "short" : "long",
    year: "numeric",
  }).format(now);

  let h = now.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const parts = [h, now.getMinutes()];
  // Sembunyikan detik di mobile
  if (!opts?.short) parts.push(now.getSeconds());
  const timePart = parts.map((n) => String(n).padStart(2, "0")).join(":");

  return `${datePart} | ${timePart} ${ampm}`;
}

export function TopBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#1c3a66] text-white">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between gap-2 pl-4 sm:pl-6">
        <p className="flex min-w-0 items-center py-2 text-xs font-medium tracking-wide sm:text-sm">
          <a
            href="https://pu.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#f7b500]"
          >
            PUPR
          </a>
          <span className="mx-2 opacity-60">|</span>
          <a
            href="https://sda.pu.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#f7b500]"
          >
            Dirjen SDA
          </a>
        </p>
        <p className="flex shrink-0 items-center bg-[#f7b500] px-3 text-[10px] font-semibold text-[#1c3a66] tabular-nums sm:px-5 sm:text-xs">
          {now ? (
            <>
              <span className="sm:hidden">{formatClock(now, { short: true })}</span>
              <span className="hidden sm:inline">{formatClock(now)}</span>
            </>
          ) : (
            "—"
          )}
        </p>
      </div>
      <div className="h-1 bg-[#f7b500]" />
    </div>
  );
}

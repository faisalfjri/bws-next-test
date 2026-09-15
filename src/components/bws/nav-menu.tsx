"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";

export function menuHref(m: MenuItem): string {
  if (m.url?.startsWith("http")) return m.url;
  // Top-level "Berita" menu uses url "article(s)" -> public archive route
  if (m.url === "article" || m.url === "articles") return "/articles";
  if (m.url) return `/${m.url.replace(/^\/+/, "")}`;
  // Static pages (profil, faq, ...) resolve via the [...slug] CMS route
  // which tries page -> product -> article detail APIs.
  if (m.slug) return `/${m.slug}`;
  return "/query";
}

// Only external links may open a new tab; internal menu links
// (including parents that toggle submenus) always stay in the same tab,
// regardless of the `target` value from the API.
export function menuTarget(m: MenuItem): "_blank" | undefined {
  const href = menuHref(m);
  return m.target === "_blank" && /^https?:\/\//.test(href) ? "_blank" : undefined;
}

function hasChildren(m: MenuItem): boolean {
  return (m.children_recursive?.length ?? 0) > 0;
}

function Chevron({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ---------- Desktop: recursive hover dropdown + flyout (hover intent) ---------- */

// Delay before a submenu opens / closes so passing the mouse over
// doesn't instantly pop every nested level open.
const OPEN_DELAY = 150;
const CLOSE_DELAY = 250;

function DesktopItem({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
  const children = item.children_recursive ?? [];
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (open) return;
    openTimer.current = setTimeout(() => setOpen(true), OPEN_DELAY);
  };

  const handleLeave = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (!open) return;
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  // Parent with submenu: click opens/toggles the submenu instead of navigating.
  const handleClick = (e: React.MouseEvent) => {
    if (!hasChildren(item)) return;
    e.preventDefault();
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen((v) => !v);
  };

  if (depth === 0) {
    return (
      <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <Link
          href={menuHref(item)}
          target={menuTarget(item)}
          onClick={handleClick}
          aria-expanded={hasChildren(item) ? open : undefined}
          className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          {item.judul}
          {hasChildren(item) && <Chevron className="h-3 w-3 opacity-60" />}
        </Link>
        {hasChildren(item) && (
          <div
            className={`absolute left-0 top-full w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl transition ${
              open
                ? "visible translate-y-0 opacity-100"
                : "invisible pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            {children.map((c) => (
              <DesktopItem key={c.id} item={c} depth={1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={menuHref(item)}
        target={menuTarget(item)}
        onClick={handleClick}
        aria-expanded={hasChildren(item) ? open : undefined}
        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      >
        <span className="min-w-0 flex-1 line-clamp-2">{item.judul}</span>
        {hasChildren(item) && <Chevron className="h-3.5 w-3.5 shrink-0 opacity-50" />}
      </Link>
      {hasChildren(item) && (
        <div
          className={`absolute left-full top-0 w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl transition ${
            open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
          }`}
        >
          {children.map((c) => (
            <DesktopItem key={c.id} item={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function DesktopNav({ menus }: { menus: MenuItem[] }) {
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {menus.map((m) => (
        <DesktopItem key={m.id} item={m} depth={0} />
      ))}
    </nav>
  );
}

/* ---------- Mobile: hamburger + nested accordion ---------- */

function MobileItem({
  item,
  depth = 0,
  expanded,
  onToggle,
}: {
  item: MenuItem;
  depth?: number;
  expanded: Set<number>;
  onToggle: (id: number) => void;
}) {
  const children = item.children_recursive ?? [];
  const isOpen = expanded.has(item.id);

  return (
    <div className={depth > 0 ? "ml-3 border-l border-gray-100 pl-2" : ""}>
      <div className="flex items-center gap-1">
        {hasChildren(item) ? (
          <button
            onClick={() => onToggle(item.id)}
            aria-expanded={isOpen}
            className={`flex flex-1 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium ${
              depth === 0 ? "text-gray-900" : "text-gray-600"
            } hover:bg-gray-50`}
          >
            {item.judul}
            <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>
              <Chevron className="h-4 w-4 text-gray-400" />
            </span>
          </button>
        ) : (
          <Link
            href={menuHref(item)}
            target={menuTarget(item)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium ${
              depth === 0 ? "text-gray-900" : "text-gray-600"
            } hover:bg-gray-50`}
          >
            {item.judul}
          </Link>
        )}
      </div>
      {hasChildren(item) && isOpen && (
        <div className="mt-1 space-y-1 pb-1">
          {children.map((c) => (
            <MobileItem key={c.id} item={c} depth={depth + 1} expanded={expanded} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileNav({ menus }: { menus: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-gray-100 bg-white shadow-xl">
          <div className="mx-auto max-h-[70vh] max-w-7xl space-y-1 overflow-y-auto px-4 py-3">
            {menus.map((m) => (
              <MobileItem key={m.id} item={m} expanded={expanded} onToggle={toggle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

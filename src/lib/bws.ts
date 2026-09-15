import type { Article, WebsiteResponse } from "@/lib/types";

const API_BASE = "https://sisda.bwssumatera1.net/api";
// Single ImageKit base for article/relative storage paths:
// https://ik.imagekit.io/faisalfjri/sisda/storage/
export const IMAGEKIT_STORAGE = "https://ik.imagekit.io/faisalfjri/sisda/storage";
// Backend base for product images:
// https://backend.bwssumatera1.net/images/products
export const BACKEND_PRODUCT_IMAGES = "https://backend.bwssumatera1.net/images/products";
// Backend base for slideshow images:
// https://backend.bwssumatera1.net/images/slideshows
export const BACKEND_SLIDESHOW_IMAGES = "https://backend.bwssumatera1.net/images/slideshows";

export function resolveImage(src: string | undefined | null): string {
  if (!src) return "/next.svg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const clean = src.replace(/^\/+/, "").replace(/^storage\//, "");
  return `${IMAGEKIT_STORAGE}/${clean}`;
}

export function resolveArticleImage(src: string | undefined | null): string {
  return resolveImage(src);
}

export function resolveSlideshowImage(src: string | undefined | null): string {
  if (!src) return "/next.svg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const clean = src.replace(/^\/+/, "").replace(/^storage\//, "").replace(/^slideshows?\//, "");
  return `${BACKEND_SLIDESHOW_IMAGES}/${clean}`;
}

export function resolveProductImage(src: string | undefined | null): string {
  if (!src) return "/next.svg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const clean = src.replace(/^\/+/, "").replace(/^storage\//, "").replace(/^produks?\//, "").replace(/^products?\//, "");
  return `${BACKEND_PRODUCT_IMAGES}/${clean}`;
}

export function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getWebsite(): Promise<WebsiteResponse | null> {
  return fetchJson<WebsiteResponse>("/website");
}

export async function getLatestArticles(): Promise<Article[]> {
  const data = await fetchJson<Article[]>("/articles/latest");
  return data ?? [];
}

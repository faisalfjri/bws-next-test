import type {
  Article,
  WebsiteCategoryResponse,
  WebsitePageDetail,
  WebsitePageResponse,
  WebsiteResponse,
  WebsiteArticleDetailResponse,
} from "@/lib/types";

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
// ImageKit base for static page images:
// https://ik.imagekit.io/faisalfjri/backend/images/pages/
export const PAGE_IMAGES = "https://ik.imagekit.io/faisalfjri/backend/images/pages";

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

export function resolvePageImage(src: string | undefined | null): string {
  if (!src) return "/next.svg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const clean = src.replace(/^\/+/, "").replace(/^pages\//, "");
  return `${PAGE_IMAGES}/${clean}`;
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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 120 },
      signal: controller.signal,
    });
    clearTimeout(timeout);
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

export async function getWebsitePage(slug: string): Promise<WebsitePageDetail | null> {
  const data = await fetchJson<WebsitePageResponse>(
    `/website/page/${encodeURIComponent(slug)}`
  );
  return data?.article ?? null;
}

export async function getWebsitePageMenus(slug: string): Promise<WebsitePageResponse | null> {
  return fetchJson<WebsitePageResponse>(`/website/page/${encodeURIComponent(slug)}`);
}

export async function getWebsiteProduct(slug: string): Promise<WebsitePageDetail | null> {
  const data = await fetchJson<WebsitePageResponse>(
    `/website/product/${encodeURIComponent(slug)}`
  );
  return data?.article ?? null;
}

export async function getWebsiteArticleDetail(
  slug: string
): Promise<WebsitePageDetail | null> {
  const data = await fetchJson<WebsitePageResponse>(
    `/website/article/${encodeURIComponent(slug)}`
  );
  return data?.article ?? null;
}

export async function getWebsiteArticleDetailFull(
  slug: string
): Promise<WebsiteArticleDetailResponse | null> {
  return fetchJson<WebsiteArticleDetailResponse>(
    `/website/article/${encodeURIComponent(slug)}`
  );
}

export async function getWebsiteCategory(
  alias: string
): Promise<WebsiteCategoryResponse | null> {
  return fetchJson<WebsiteCategoryResponse>(
    `/website/category/${encodeURIComponent(alias)}`
  );
}

export function pageTitle(a: WebsitePageDetail): string {
  return a.judul ?? a.title ?? a.nama ?? "Halaman";
}

export function pageBody(a: WebsitePageDetail): string {
  return a.isi ?? a.content ?? a.deskripsi ?? "";
}

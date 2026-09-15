"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  Article,
  CmsContent,
  MenuItem,
  WebsiteArticle,
  WebsiteArticleDetailResponse,
  WebsitePageDetail,
  WebsiteResponse,
  WebsitePageResponse,
  WebsiteCategoryResponse,
} from "@/lib/types";

const API_BASE = "https://sisda.bwssumatera1.net/api";

async function fetchJson<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function useWebsite() {
  return useQuery<WebsiteResponse | null>({
    queryKey: ["website"],
    queryFn: () => fetchJson<WebsiteResponse>("/website"),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useLatestArticles() {
  return useQuery<Article[]>({
    queryKey: ["articles", "latest"],
    queryFn: () => fetchJson<Article[]>("/articles/latest"),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useWebsitePageMenus(slug: string) {
  return useQuery<WebsitePageResponse | null>({
    queryKey: ["website", "page", slug],
    queryFn: () =>
      fetchJson<WebsitePageResponse>(`/website/page/${encodeURIComponent(slug)}`),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useWebsiteProduct(slug: string) {
  return useQuery<WebsitePageResponse | null>({
    queryKey: ["website", "product", slug],
    queryFn: () =>
      fetchJson<WebsitePageResponse>(`/website/product/${encodeURIComponent(slug)}`),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useWebsiteArticleDetail(slug: string) {
  return useQuery<WebsitePageResponse | null>({
    queryKey: ["website", "article", slug],
    queryFn: () =>
      fetchJson<WebsitePageResponse>(`/website/article/${encodeURIComponent(slug)}`),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useWebsiteArticleDetailFull(slug: string) {
  return useQuery<WebsiteArticleDetailResponse | null>({
    queryKey: ["website", "article-full", slug],
    queryFn: () =>
      fetchJson<WebsiteArticleDetailResponse>(
        `/website/article/${encodeURIComponent(slug)}`
      ),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useWebsiteCategory(alias: string) {
  return useQuery<WebsiteCategoryResponse | null>({
    queryKey: ["website", "category", alias],
    queryFn: () =>
      fetchJson<WebsiteCategoryResponse>(
        `/website/category/${encodeURIComponent(alias)}`
      ),
    staleTime: 2 * 60 * 1000,
    retry: 2,
  });
}

export function useCmsContent(segments: string[]) {
  const key = segments[segments.length - 1];

  const categoryQuery = useWebsiteCategory(
    segments[0] === "article-category" && segments[1] ? segments[1] : ""
  );
  const pageQuery = useWebsitePageMenus(key);
  const productQuery = useWebsiteProduct(key);
  const articleQuery = useWebsiteArticleDetail(key);

  const isCategoryRoute = segments[0] === "article-category" && segments[1];

  // Category route
  if (isCategoryRoute) {
    return {
      content: categoryQuery.data
        ? ({
            kind: "category" as const,
            title: categoryQuery.data.title ?? "Kategori",
            articles: categoryQuery.data.articles?.data ?? [],
            menus: categoryQuery.data.menus ?? [],
          } satisfies CmsContent)
        : null,
      isLoading: categoryQuery.isLoading,
      isError: categoryQuery.isError,
    };
  }

  // Page route (highest priority)
  if (pageQuery.data?.article) {
    return {
      content: {
        kind: "page" as const,
        detail: pageQuery.data.article,
        menus: pageQuery.data.menus ?? [],
        latest: pageQuery.data.articles?.data ?? [],
      } satisfies CmsContent,
      isLoading: pageQuery.isLoading,
      isError: pageQuery.isError,
    };
  }

  // Product route
  if (productQuery.data?.article) {
    return {
      content: {
        kind: "product" as const,
        detail: productQuery.data.article,
      } satisfies CmsContent,
      isLoading: productQuery.isLoading,
      isError: productQuery.isError,
    };
  }

  // Article route
  if (articleQuery.data?.article) {
    return {
      content: {
        kind: "article" as const,
        detail: articleQuery.data.article,
      } satisfies CmsContent,
      isLoading: articleQuery.isLoading,
      isError: articleQuery.isError,
    };
  }

  const isLoading =
    categoryQuery.isLoading || pageQuery.isLoading || productQuery.isLoading || articleQuery.isLoading;
  const isError =
    categoryQuery.isError || pageQuery.isError || productQuery.isError || articleQuery.isError;

  return { content: null, isLoading, isError };
}

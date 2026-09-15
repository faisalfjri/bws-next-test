"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ArticlesResponse } from "@/lib/types";
import { ArticleCard } from "@/components/article-card";
import { ArticleGridSkeleton } from "@/components/article-card-skeleton";
import api from "@/lib/api";

const fetchArticles = async ({ pageParam = "/articles" }: { pageParam?: string }): Promise<ArticlesResponse> => {
  const { data } = await api.get<ArticlesResponse>(pageParam);
  return data;
};

export default function QueryPage() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["articles-query"],
    queryFn: fetchArticles,
    initialPageParam: "/articles",
    getNextPageParam: (lastPage) => {
      if (!lastPage.next_page_url) return undefined;
      const url = new URL(lastPage.next_page_url);
      const path = url.pathname.replace(/^\/api/, "");
      return path + url.search;
    },
  });

  const articles = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="min-h-screen bg-white">
      <motion.section
        className="mx-auto max-w-8xl px-4 sm:px-6 pt-12 sm:pt-20 pb-10 sm:pb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block mb-4 rounded-full bg-green-50 px-4 py-1.5 text-xs font-medium text-green-600">
          React Query
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          BWS Sumatera I
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 px-2">
          Menggunakan <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">@tanstack/react-query</code> dengan infinite query
        </p>
      </motion.section>

      <section className="mx-auto max-w-8xl px-4 sm:px-6 pb-16 sm:pb-20">
        {isLoading ? (
          <ArticleGridSkeleton />
        ) : (
          <div className="grid gap-6 sm:gap-x-8 sm:gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} priority={index < 6} />
            ))}
          </div>
        )}
      </section>

      <div ref={sentinelRef} className="pb-10 sm:pb-12 text-center">
        {isFetchingNextPage && (
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        )}
        {!hasNextPage && articles.length > 0 && (
          <p className="text-sm text-gray-400">Semua artikel sudah dimuat</p>
        )}
      </div>
    </main>
  );
}

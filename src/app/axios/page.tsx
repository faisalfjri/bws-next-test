"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Article, ArticlesResponse } from "@/lib/types";
import { ArticleCard } from "@/components/article-card";
import { ArticleGridSkeleton } from "@/components/article-card-skeleton";
import api from "@/lib/api";

export default function AxiosPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const load = async (url: string) => {
    setLoading(true);
    try {
      const { data } = await api.get<ArticlesResponse>(url);
      setArticles((prev) => {
        const ids = new Set(prev.map((a) => a.id));
        return [...prev, ...data.data.filter((a) => !ids.has(a.id))];
      });
      if (data.next_page_url) {
        const parsed = new URL(data.next_page_url);
        const path = parsed.pathname.replace(/^\/api/, "");
        setNextUrl(path + parsed.search);
      } else {
        setNextUrl(null);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      load("/articles");
    }
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl && !loading) {
          load(nextUrl);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [nextUrl, loading]);

  const isInitialLoad = articles.length === 0 && loading;

  return (
    <main className="min-h-screen bg-white">
      <motion.section
        className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-20 pb-10 sm:pb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block mb-4 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-600">
          Axios
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          BWS Sumatera I
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 px-2">
          Menggunakan <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">axios</code> untuk HTTP request
        </p>
      </motion.section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 sm:pb-20">
        {isInitialLoad ? (
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
        {loading && !isInitialLoad && (
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        )}
        {!nextUrl && articles.length > 0 && (
          <p className="text-sm text-gray-400">Semua artikel sudah dimuat</p>
        )}
      </div>
    </main>
  );
}

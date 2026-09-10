"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "@/lib/types";
import api from "@/lib/api";
import { ArticleDetailSkeleton } from "@/components/article-detail-skeleton";

const fetchArticle = async (slug: string): Promise<Article> => {
  const { data } = await api.get<Article>(`/articles/${slug}`);
  return data;
};

export function ArticleDetail({ slug }: { slug: string }) {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticle(slug),
  });

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Artikel Tidak Ditemukan</h1>
          <Link href="/" className="mt-4 inline-block text-sm text-gray-500 hover:text-gray-900 transition">
            Kembali ke beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition mb-6 sm:mb-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </motion.div>

        <motion.header
          className="space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-xs sm:text-sm text-gray-500">
            {article.publishedAt} &middot; {article.readTime}
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight text-gray-900">
            {article.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            {article.excerpt}
          </p>
        </motion.header>

        <motion.div
          className="mt-6 sm:mt-8 overflow-hidden rounded-xl sm:rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            unoptimized
            priority
          />
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10 prose prose-gray max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-img:rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}

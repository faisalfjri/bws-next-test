"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { formatDate, resolveArticleImage } from "@/lib/bws";
import { useWebsiteArticleDetailFull } from "@/lib/hooks";
import { ArticleDetailSkeleton } from "@/components/article-detail-skeleton";

export function ArticleDetail({ slug }: { slug: string }) {
  const { data, isLoading, error } = useWebsiteArticleDetailFull(slug);

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (error || !data?.article) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Artikel Tidak Ditemukan</h1>
          <Link href="/articles" className="mt-4 inline-block text-sm text-gray-500 hover:text-gray-900 transition">
            Kembali ke semua berita
          </Link>
        </div>
      </main>
    );
  }

  const article = data.article;
  const beritaLainnya = (data.articles?.data ?? []).filter((a) => a.slug !== slug).slice(0, 3);
  const img = resolveArticleImage(article.image);

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/articles"
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
          {article.categories && (
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-sky-700">
              {article.categories.name}
            </p>
          )}
          <p className="text-xs sm:text-sm text-gray-500">
            {formatDate(article.created_at)}
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight text-gray-900">
            {article.judul}
          </h1>
        </motion.header>

        <motion.div
          className="mt-6 sm:mt-8 overflow-hidden rounded-xl sm:rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={img}
            alt={article.judul}
            width={1200}
            height={900}
            className="aspect-5/3 w-full h-auto object-cover"
            unoptimized
            priority
          />
        </motion.div>
        {article.image_caption && (
          <p className="mt-2 text-center text-xs text-gray-400">{article.image_caption}</p>
        )}

        <motion.div
          className="mt-8 sm:mt-10 prose prose-gray max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-img:rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: article.isi }}
        />
      </article>

      {beritaLainnya.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-12 sm:pb-16">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Berita Lainnya
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beritaLainnya.map((a) => (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="group block rounded-3xl bg-gray-50 p-2.5 transition-all duration-300 hover:ring ring-gray-100 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200">
                  <Image
                    src={resolveArticleImage(a.image)}
                    alt={a.judul}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="px-1.5 pt-3 pb-1.5">
                  <p className="text-[11px] text-gray-500">
                    {a.categories?.name ?? "Berita"} &middot; {formatDate(a.created_at)}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
                    {a.judul}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

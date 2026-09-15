import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Article } from "@/lib/types";

export function ArticleCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="group block rounded-3xl bg-gray-50 p-2.5 sm:p-3 transition-all duration-300 hover:ring ring-gray-100 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
      >
        <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gray-200">
          <Image
            src={article.image}
            alt={article.title}
            width={640}
            height={400}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            unoptimized
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </div>
        <div className="px-1 pt-2.5 sm:pt-3 pb-1.5 sm:pb-2 space-y-1 sm:space-y-1.5">
          <p className="text-xs sm:text-[13px] text-gray-500">
            {article.publishedAt} &middot; {article.readTime}
          </p>
          <h2 className="text-base sm:text-[17px] font-semibold leading-snug text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-gray-500 line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

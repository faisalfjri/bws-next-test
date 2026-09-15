import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { WebsiteArticle } from "@/lib/types";
import { formatDate, resolveArticleImage } from "@/lib/bws";

export function NewsGrid({ articles }: { articles: WebsiteArticle[] }) {
  if (articles.length === 0) return null;
  const [headline, ...rest] = articles;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-14">
      <div className="mb-5 sm:mb-6 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">Kabar Balai</p>
          <h2 className="mt-1 text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Berita Terkini
          </h2>
        </div>
        <Link href="/articles" className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-900">
          Semua berita <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
        <Link
          href={`/articles/${headline.slug}`}
          className="group block rounded-2xl sm:rounded-3xl bg-gray-50 p-2.5 sm:p-3 transition-all duration-300 hover:ring ring-gray-100 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-200">
            <Image
              src={resolveArticleImage(headline.image)}
              alt={headline.judul}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              unoptimized
            />
          </div>
          <div className="px-1 sm:px-2 pt-3 sm:pt-4 pb-1 sm:pb-2">
            <p className="text-xs text-gray-500">
              {headline.categories?.name ?? "Berita"} &middot; {formatDate(headline.created_at)}
            </p>
            <h3 className="mt-1 break-words text-base sm:text-xl font-bold leading-snug text-gray-900 group-hover:text-gray-600 line-clamp-2">
              {headline.judul}
            </h3>
            {headline.metadesc && (
              <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">{headline.metadesc}</p>
            )}
          </div>
        </Link>

        <div className="grid gap-4 sm:grid-cols-2">
          {rest.slice(0, 4).map((a) => (
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
      </div>
    </section>
  );
}

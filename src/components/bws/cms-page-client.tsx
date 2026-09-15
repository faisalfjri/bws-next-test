"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/bws/site-header";
import { SiteFooter } from "@/components/bws/site-footer";
import { useCmsContent, useWebsite } from "@/lib/hooks";
import {
  formatDate,
  pageBody,
  pageTitle,
  resolveArticleImage,
  resolvePageImage,
  resolveProductImage,
} from "@/lib/bws";
import type { WebsiteArticle, WebsitePageDetail } from "@/lib/types";

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-xs text-gray-400">
      <Link href="/" className="shrink-0 hover:text-gray-700">
        Beranda
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0" />
      <span className="truncate font-medium text-gray-600">{title}</span>
    </nav>
  );
}

function DetailBody({
  detail,
  imageKind = "article",
}: {
  detail: WebsitePageDetail;
  imageKind?: "article" | "product" | "page";
}) {
  const title = pageTitle(detail);
  const body = pageBody(detail);
  const img = detail.image
    ? imageKind === "product"
      ? resolveProductImage(detail.image)
      : imageKind === "page"
        ? resolvePageImage(detail.image)
        : resolveArticleImage(detail.image)
    : null;

  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumb title={title} />
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-sky-700">
        {detail.categories?.name ?? "Halaman"}
      </p>
      <h1 className="mt-1 break-words text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-gray-900">
        {title}
      </h1>
      {detail.updated_at && (
        <p className="mt-3 text-xs text-gray-400">
          Diperbarui {formatDate(detail.updated_at)}
        </p>
      )}

      {img && (
        <div className="relative mt-6 sm:mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
          <Image src={img} alt={title} fill className="object-cover" unoptimized />
        </div>
      )}
      {detail.image_caption && (
        <p className="mt-2 text-center text-xs text-gray-400">{detail.image_caption}</p>
      )}

      {detail.iframe && (
        <div className="relative mt-6 sm:mt-8 aspect-video overflow-hidden rounded-2xl bg-gray-100">
          <iframe
            src={detail.iframe}
            title={title}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        </div>
      )}

      {body ? (
        <div
          className="prose prose-gray mt-6 sm:mt-8 max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-img:rounded-xl prose-a:text-sky-700"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      ) : (
        !img &&
        !detail.iframe && (
          <p className="mt-6 text-sm text-gray-400">Konten halaman belum tersedia.</p>
        )
      )}

      {detail.categories && (
        <div className="mt-8">
          <Link
            href={detail.slug ? `/articles/${detail.slug}` : "/articles"}
            className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:underline"
          >
            Baca selengkapnya <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </article>
  );
}

function LatestList({ latest }: { latest: WebsiteArticle[] }) {
  if (latest.length === 0) return null;
  return (
    <section className="mx-auto mt-12 sm:mt-16 max-w-3xl">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
        Berita Lainnya
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.slice(0, 3).map((a) => (
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
  );
}

export function CmsPageClient({ slug }: { slug: string[] }) {
  const { content, isLoading, isError } = useCmsContent(slug);
  const { data: website } = useWebsite();

  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-clip bg-white">
        <SiteHeader menus={[]} />
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-sky-600" />
            <p className="mt-4 text-sm text-gray-400">Memuat halaman…</p>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  if (isError || !content) {
    return (
      <main className="min-h-screen overflow-x-clip bg-white">
        <SiteHeader menus={[]} />
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">404</h1>
            <p className="mt-2 text-sm text-gray-500">Halaman tidak ditemukan.</p>
            <Link href="/" className="mt-4 inline-block text-sm text-sky-700 hover:underline">
              Kembali ke beranda
            </Link>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const menus =
    (content.kind === "page" || content.kind === "category") && content.menus.length > 0
      ? content.menus
      : (website?.menus ?? []);

  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader menus={menus} visitorCount={website?.visitorCount ?? 0} />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 py-8 sm:py-12">
        {content.kind === "category" ? (
          <div className="mx-auto max-w-6xl">
            <Breadcrumb title={content.title} />
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-sky-700">
              Kategori
            </p>
            <h1 className="mt-1 text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
              {content.title}
            </h1>
            {content.articles.length === 0 ? (
              <p className="mt-6 text-sm text-gray-400">Belum ada artikel di kategori ini.</p>
            ) : (
              <div className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {content.articles.map((a) => (
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
            )}
          </div>
        ) : (
          <>
            <DetailBody
              detail={content.detail}
              imageKind={content.kind === "product" ? "product" : content.kind === "page" ? "page" : "article"}
            />
            {content.kind === "page" && <LatestList latest={content.latest} />}
          </>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}

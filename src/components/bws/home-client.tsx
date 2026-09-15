"use client";

import { SiteHeader } from "@/components/bws/site-header";
import { Hero } from "@/components/bws/hero";
import { NewsGrid } from "@/components/bws/news-grid";
import { InfoSections } from "@/components/bws/info-sections";
import { SiteFooter } from "@/components/bws/site-footer";
import { useWebsite } from "@/lib/hooks";

export function HomeClient() {
  const { data: website, isLoading, isError } = useWebsite();

  const menus = website?.menus ?? [];
  const slideshows = website?.slideshows ?? [];
  const articles = website?.articles.data ?? [];
  const pengumumans = website?.pengumumans.data ?? [];
  const visitorCount = website?.visitorCount ?? 0;

  if (isLoading) {
    return (
      <main className="min-h-screen overflow-x-clip bg-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-sky-600" />
            <p className="mt-4 text-sm text-gray-400">Memuat data…</p>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen overflow-x-clip bg-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">Gagal memuat data. Coba muat ulang halaman.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader menus={menus} visitorCount={visitorCount} />
      <Hero slideshows={slideshows} />
      <NewsGrid articles={articles} />
      <InfoSections
        pengumumans={pengumumans}
        dataPeta={website?.dataPeta ?? []}
        dataInfografis={website?.dataInfografis ?? []}
        dataPejabat={[]}
        visitorCount={visitorCount}
        counts={website?.counts ?? {}}
        totalVotes={website?.totalVotes ?? 0}
      />
      <SiteFooter />
    </main>
  );
}

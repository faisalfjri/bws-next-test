import type { Metadata } from "next";
import { SiteHeader } from "@/components/bws/site-header";
import { SiteFooter } from "@/components/bws/site-footer";
import { ArticleArchive } from "@/components/bws/article-archive";
import { getWebsite } from "@/lib/bws";

export const metadata: Metadata = {
  title: "Semua Berita - BWS Sumatera I",
  description:
    "Arsip semua berita dan informasi terkini Balai Wilayah Sungai Sumatera I.",
};

export default async function ArticleIndexPage() {
  const website = await getWebsite();

  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader menus={website?.menus ?? []} visitorCount={website?.visitorCount ?? 0} />
      <ArticleArchive />
      <SiteFooter />
    </main>
  );
}

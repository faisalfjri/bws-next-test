import type { Metadata } from "next";
import { SiteHeader } from "@/components/bws/site-header";
import { SiteFooter } from "@/components/bws/site-footer";
import { ArticleDetail } from "@/components/article-detail";
import { getWebsite } from "@/lib/bws";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} - BWS Sumatera I`,
    description: "Informasi terkini seputar irigasi dan pengelolaan sumber daya air",
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const website = await getWebsite();

  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader menus={website?.menus ?? []} visitorCount={website?.visitorCount ?? 0} />
      <ArticleDetail slug={slug} />
      <SiteFooter />
    </main>
  );
}

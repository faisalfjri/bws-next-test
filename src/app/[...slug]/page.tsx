import type { Metadata } from "next";
import { CmsPageClient } from "@/components/bws/cms-page-client";
import {
  getWebsiteArticleDetail,
  getWebsiteCategory,
  getWebsitePageMenus,
  getWebsiteProduct,
  pageTitle,
} from "@/lib/bws";
import type { CmsContent } from "@/lib/types";

type SlugParams = { slug: string[] };

async function resolveContent(segments: string[]): Promise<CmsContent> {
  if (segments.length === 0) return null;

  if (segments[0] === "article-category" && segments[1]) {
    const cat = await getWebsiteCategory(segments[1]);
    if (!cat) return null;
    return {
      kind: "category",
      title: cat.title ?? "Kategori",
      articles: cat.articles?.data ?? [],
      menus: cat.menus ?? [],
    };
  }

  const key = segments[segments.length - 1];

  const pageRes = await getWebsitePageMenus(key);
  if (pageRes?.article) {
    return {
      kind: "page",
      detail: pageRes.article,
      menus: pageRes.menus ?? [],
      latest: pageRes.articles?.data ?? [],
    };
  }

  const product = await getWebsiteProduct(key);
  if (product) return { kind: "product", detail: product };

  const article = await getWebsiteArticleDetail(key);
  if (article) return { kind: "article", detail: article };

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<SlugParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await resolveContent(slug);
  if (!content) return { title: "Halaman Tidak Ditemukan - BWS Sumatera I" };
  const title =
    content.kind === "category" ? content.title : pageTitle(content.detail);
  return {
    title: `${title} - BWS Sumatera I`,
    description: "Balai Wilayah Sungai Sumatera I - Kementerian Pekerjaan Umum",
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<SlugParams>;
}) {
  const { slug } = await params;
  return <CmsPageClient slug={slug} />;
}

import type { Metadata } from "next";
import { ArticleDetail } from "@/components/article-detail";

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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} />;
}

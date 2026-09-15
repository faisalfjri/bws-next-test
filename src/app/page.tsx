import type { Metadata } from "next";
import { SiteHeader } from "@/components/bws/site-header";
import { Hero } from "@/components/bws/hero";
import { NewsGrid } from "@/components/bws/news-grid";
import { InfoSections } from "@/components/bws/info-sections";
import { SiteFooter } from "@/components/bws/site-footer";
import { getWebsite } from "@/lib/bws";

export const metadata: Metadata = {
    title: "BWS Sumatera I - Berita Irigasi & Sumber Daya Air",
    description:
        "Berita terkini Balai Wilayah Sungai Sumatera I: irigasi, sungai, bendungan, dan pengelolaan sumber daya air.",
};

export default async function Home() {
    const website = await getWebsite();

    const menus = website?.menus ?? [];
    const slideshows = website?.slideshows ?? [];
    const articles = website?.articles.data ?? [];
    const pengumumans = website?.pengumumans.data ?? [];
    const visitorCount = website?.visitorCount ?? 0;

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

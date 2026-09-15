import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/bws/site-header";
import { SiteFooter } from "@/components/bws/site-footer";
import { MapSection } from "@/components/bws/map-section";
import { getWebsite } from "@/lib/bws";

export const metadata: Metadata = {
  title: "Lokasi Kantor - BWS Sumatera I",
  description:
    "Alamat dan lokasi kantor Balai Wilayah Sungai Sumatera I di Jln. Ir. Mohd. Thaher No. 14, Lueng Bata, Banda Aceh.",
};

export default async function LokasiKantorPage() {
  const website = await getWebsite();
  const menus = website?.menus ?? [];

  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      <SiteHeader menus={menus} visitorCount={website?.visitorCount ?? 0} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">
          Profil
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Lokasi Kantor
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
          Balai Wilayah Sungai Sumatera I — Jln. Ir. Mohd. Thaher No. 14, Lueng Bata,
          Banda Aceh, Aceh 23247.
        </p>

        <div className="relative mt-6 overflow-hidden rounded-3xl">
          <MapSection />
          <Link
            href="https://www.google.com/maps/search/5.540462960669106,95.33682907383437"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-sky-800"
          >
            Dapatkan Arahan
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

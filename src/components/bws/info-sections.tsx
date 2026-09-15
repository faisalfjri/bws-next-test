import Image from "next/image";
import Link from "next/link";
import type { Pengumuman, ProductItem } from "@/lib/types";
import { formatDate, resolveProductImage } from "@/lib/bws";
import { InfografisCarousel } from "@/components/bws/infografis-carousel";

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/pupr.sda.sumatera1", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/pupr_sda_sumatera1", Icon: InstagramIcon },
  { label: "X", href: "https://twitter.com/pupr_sda_sum1", Icon: XIcon },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">{kicker}</p>
      <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
  );
}

export function InfoSections({
  pengumumans,
  dataPeta,
  dataInfografis,
  dataPejabat,
  visitorCount,
  counts,
  totalVotes,
}: {
  pengumumans: Pengumuman[];
  dataPeta: ProductItem[];
  dataInfografis: ProductItem[];
  dataPejabat: ProductItem[];
  visitorCount: number;
  counts: Record<string, number>;
  totalVotes: number;
}) {
  return (
    <div className="border-t border-gray-100 bg-gray-50/60">
      <section className="mx-auto grid max-w-7xl gap-8 lg:gap-10 px-4 sm:px-6 py-8 sm:py-14 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-1">
          <SectionTitle kicker="Informasi" title="Pengumuman" />
          <div className="space-y-3">
            {pengumumans.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/articles/${p.slug}`}
                className="block rounded-2xl border border-gray-100 bg-white p-4 transition hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
              >
                <p className="text-[11px] text-gray-400">{formatDate(p.created_at)}</p>
                <h3 className="mt-1 text-sm font-semibold leading-snug text-gray-900 line-clamp-2">
                  {p.judul}
                </h3>
              </Link>
            ))}
            {pengumumans.length === 0 && (
              <p className="text-sm text-gray-400">Belum ada pengumuman.</p>
            )}
          </div>

          <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-sky-950 p-4 sm:p-5 text-white">
            <p className="text-xs uppercase tracking-widest text-sky-300">Statistik</p>
            <p className="mt-2 text-2xl font-bold tabular-nums">
              {visitorCount.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-sky-200">Total kunjungan website</p>
            <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
              {Object.entries(counts).slice(0, 4).map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-sky-200">{k}</span>
                  <span className="font-semibold tabular-nums">{v}</span>
                </div>
              ))}
              <p className="pt-1 text-[11px] text-sky-300">{totalVotes} suara kepuasan</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Ikuti Kami
            </p>
            <div className="mt-3 flex items-center gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition hover:bg-sky-700 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-2 space-y-8 sm:space-y-10">
          <div>
            <SectionTitle kicker="Wilayah Sungai" title="Peta WS Kewenangan" />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
              {dataPeta.slice(0, 4).map((p) => (
                <div key={p.id} className="min-w-0 rounded-2xl border border-gray-100 bg-white p-2 sm:p-2.5">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={resolveProductImage(p.image)}
                      alt={p.nama}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="px-1 pt-2 pb-1 text-xs font-semibold text-gray-800 line-clamp-2">{p.nama}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle kicker="Edukasi" title="Infografis" />
            <InfografisCarousel items={dataInfografis} />
          </div>

          {dataPejabat.length > 0 && (
            <div>
              <SectionTitle kicker="Profil" title="Pejabat Balai" />
              <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:max-w-md sm:grid-cols-2">
                {dataPejabat.slice(0, 2).map((p) => (
                  <div key={p.id} className="min-w-0 rounded-2xl border border-gray-100 bg-white p-3 text-center">
                    <div className="relative mx-auto aspect-square w-20 sm:w-24 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={resolveProductImage(p.image)}
                        alt={p.nama}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-900">{p.nama}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

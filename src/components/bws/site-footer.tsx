import Image from "next/image";
import Link from "next/link";

const LOGO_URL = "https://ik.imagekit.io/faisalfjri/logo-balai.svg";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 py-8 sm:py-10 grid gap-6 sm:gap-8 sm:grid-cols-3">
        <div>
          <p className="flex items-center">
            <Image
              src={LOGO_URL}
              alt="Logo BWS Sumatera I"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-gray-500">
            Balai Wilayah Sungai Sumatera I — unit pelaksana teknis Kementerian Pekerjaan Umum
            bidang pengelolaan sumber daya air di Aceh dan Sumatera Utara.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Navigasi</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/" className="block text-gray-600 hover:text-gray-900">Beranda</Link>
            <Link href="/articles" className="block text-gray-600 hover:text-gray-900">Arsip Berita</Link>
            <Link href="/query/fetch" className="block text-gray-600 hover:text-gray-900">Demo Fetch</Link>
            <Link href="/query/axios" className="block text-gray-600 hover:text-gray-900">Demo Axios</Link>
            <Link href="/query/react-query" className="block text-gray-600 hover:text-gray-900">Demo React Query</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Kontak</p>
          <p className="mt-3 text-sm text-gray-600">
            Banda Aceh, Provinsi Aceh
            <br />
            <a href="https://sisda.bwssumatera1.net" target="_blank" className="text-sky-700 hover:underline">
              sisda.bwssumatera1.net
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 py-4 text-[11px] text-gray-400">
          Data bersumber dari API SISDA BWS Sumatera I &middot; Dibangun dengan Next.js
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { MenuItem } from "@/lib/types";
import { DesktopNav, MobileNav } from "@/components/bws/nav-menu";

const LOGO_URL = "https://ik.imagekit.io/faisalfjri/logo-balai.svg";

export function SiteHeader({ menus, visitorCount }: { menus: MenuItem[]; visitorCount: number }) {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-sky-950 text-sky-100">
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-2 px-4 sm:px-6 py-2 text-[11px] sm:text-xs">
          <p className="min-w-0 flex-1 truncate font-medium tracking-wide">
            Balai Wilayah Sungai Sumatera I &middot; Kementerian Pekerjaan Umum
          </p>
          <p className="hidden sm:block tabular-nums">
            {visitorCount > 0 ? `${visitorCount.toLocaleString("id-ID")} kunjungan` : ""}
          </p>
        </div>
      </div>
      <div className="relative border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-3 px-4 sm:px-6 py-3">
          <Link href="/" className="flex min-w-0 items-center" aria-label="Beranda BWS Sumatera I">
            <Image
              src={LOGO_URL}
              alt="Logo BWS Sumatera I"
              width={160}
              height={40}
              className="h-10 w-auto shrink-0 object-contain"
              priority
            />
          </Link>
          <DesktopNav menus={menus} />
          <MobileNav menus={menus} />
        </div>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import { HomeClient } from "@/components/bws/home-client";

export const metadata: Metadata = {
  title: "BWS Sumatera I - Berita Irigasi & Sumber Daya Air",
  description:
    "Berita terkini Balai Wilayah Sungai Sumatera I: irigasi, sungai, bendungan, dan pengelolaan sumber daya air.",
};

export default function Home() {
  return <HomeClient />;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BWS Sumatera I - Berita",
  description: "Informasi terkini seputar irigasi dan pengelolaan sumber daya air",
};

export default function QueryLayout({ children }: LayoutProps<"/query">) {
  return <>{children}</>;
}

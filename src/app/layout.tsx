import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "BWS Sumatera I - Balai Wilayah Sungai Sumatera I",
  description: "Berita terkini seputar irigasi, sungai, dan pengelolaan sumber daya air BWS Sumatera I",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="id"
            className={cn("h-full", "antialiased", jakarta.variable, "font-sans", inter.variable)}
        >
            <body className="min-h-full flex flex-col">
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}

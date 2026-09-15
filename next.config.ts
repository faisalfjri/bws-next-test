import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "standalone",
  reactCompiler: true,
  // External BWS API can be slow; allow more time for static prerender.
  staticPageGenerationTimeout: 180,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sisda.bwssumatera1.net" },
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "backend.bwssumatera1.net" },
    ],
  },
};

export default nextConfig;

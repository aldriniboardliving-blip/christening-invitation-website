import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static output for Cloudflare Pages.
  output: "export",
  trailingSlash: true,
  images: {
    // Cloudflare Pages serves the exported files directly; no Image Optimization
    // server is available in a static export.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

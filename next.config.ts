import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keystatic's GitHub App setup redirects to 127.0.0.1; Next 16 blocks that origin in dev by default.
  allowedDevOrigins: ["127.0.0.1"],
  // Inline the (small) stylesheet so it is not a render-blocking request.
  experimental: { inlineCss: true },
};

export default config;

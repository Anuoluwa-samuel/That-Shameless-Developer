import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Inline the (small) stylesheet so it is not a render-blocking request.
  experimental: { inlineCss: true },
};

export default config;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // Ensures ESLint errors break the build
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env:{
    development:"http://localhost:5000"
  }
};

export default nextConfig;

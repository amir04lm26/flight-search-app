import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ui-avatars.com", "cdn.alibaba.ir"],
  },
};

export default nextConfig;

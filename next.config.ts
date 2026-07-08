import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // reactStrictMode: false,
  /* config options here */
    images: {
        unoptimized: process.env.NODE_ENV === "development",
        remotePatterns: [
            new URL('http://localhost:8080/uploads/products/**'),
        ],
    },

    experimental: {
        serverActions: {
            bodySizeLimit: "5mb",
        }
    }
};

export default nextConfig;

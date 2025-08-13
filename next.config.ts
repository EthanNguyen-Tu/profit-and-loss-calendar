import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/profit-and-loss-calendar",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;


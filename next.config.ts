import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    rewrites: async () => [{
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*'
    }]
};

export default nextConfig;

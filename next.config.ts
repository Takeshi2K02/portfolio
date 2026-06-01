import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.template.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stgpcdgqeswikavprnbp.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

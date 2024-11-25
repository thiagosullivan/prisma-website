/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "juhtqaqhlkodhkbmiajh.supabase.co",
      },
    ],
  },
};

export default nextConfig;

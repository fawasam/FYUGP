/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "192.168.1.7", "192.168.1.37", "http:192.168.1.37"],
  },
};

export default nextConfig;

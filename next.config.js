/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Remove basePath and assetPrefix if they exist
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;

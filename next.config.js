/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Add basePath if you're not deploying to root domain
  // basePath: '',
  assetPrefix: "/",
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;

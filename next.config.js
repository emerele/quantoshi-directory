/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: "./", // Add this line
  trailingSlash: true,
  reactStrictMode: true,
};
module.exports = nextConfig;

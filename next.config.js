/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: "",
  assetPrefix: "",
  reactStrictMode: true,
  distDir: "out",
  cleanDistDir: true,
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // This will build HTML files with trailing slashes
  // Making /category/market-data/ instead of /category/market-data
};

module.exports = nextConfig;

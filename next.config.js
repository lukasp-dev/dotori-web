/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;

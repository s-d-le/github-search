/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  transpilePackages: ["ui-components"],
};

module.exports = nextConfig;

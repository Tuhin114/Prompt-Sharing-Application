/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "storyblok-cdn.photoroom.com",
      "cdn.vectorstock.com",
      "https://randomuser.me/",
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;

await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    domains: ["picsum.photos", "cdn.pixabay.com"],
  },
};

export default nextConfig;

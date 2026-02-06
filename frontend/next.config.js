/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'source.unsplash.com', 'images.unsplash.com'],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8000/api',
  }
};

module.exports = nextConfig;

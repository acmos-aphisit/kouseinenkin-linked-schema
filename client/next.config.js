/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/kouseinenkin-linked-schema' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
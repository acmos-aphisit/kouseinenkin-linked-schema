/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/kouseinenkin-linked-schema' : '',
  images: {
    unoptimized: true,
  },
  // Allows production builds to successfully complete even if the project has type errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optionally ignore ESLint errors during build as well
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
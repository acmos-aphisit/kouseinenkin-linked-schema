/** @type {import('next').NextConfig} */

// GitHub Pages serves project sites from /<repo-name>/, so when this is
// deployed there we need Next's asset paths prefixed with the repo name.
// Set NEXT_PUBLIC_BASE_PATH in the deploy workflow (see
// .github/workflows/deploy.yml) — leave it empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

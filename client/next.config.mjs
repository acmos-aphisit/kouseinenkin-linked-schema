/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Required if deploying to a project page (e.g. username.github.io/project_name)
  basePath: process.env.NODE_ENV === 'production' ? '/project_name' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
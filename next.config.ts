import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    SITE_URL: process.env.SITE_URL,
  },

  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;

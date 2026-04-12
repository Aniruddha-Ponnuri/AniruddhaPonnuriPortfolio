import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    SITE_URL: process.env.SITE_URL,
    PROFILE_NAME: process.env.PROFILE_NAME,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    PHONE: process.env.PHONE,
    LOCATION: process.env.LOCATION,
    GITHUB_PROFILE_URL: process.env.GITHUB_PROFILE_URL,
    LINKEDIN_URL: process.env.LINKEDIN_URL,
    INSTAGRAM_URL: process.env.INSTAGRAM_URL,
    MAPS_URL: process.env.MAPS_URL,
    RESUME_URL: process.env.RESUME_URL,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
    ANALYTICS_ID: process.env.ANALYTICS_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    // Build CSP directives
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for Next.js
      "style-src 'self' 'unsafe-inline'", // Required for styled-jsx and inline styles
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.github.com https://api.groq.com",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ];

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspDirectives.join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
  // Enable production source maps for better debugging (optional)
  productionBrowserSourceMaps: false,
  // Compress responses
  compress: true,
  // Optimize for production
  poweredByHeader: false,
};

export default nextConfig;

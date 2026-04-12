import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GITHUB_USERNAME:
      process.env.NEXT_PUBLIC_GITHUB_USERNAME || process.env.PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || process.env.PUBLIC_APP_URL,
    NEXT_PUBLIC_PROFILE_NAME:
      process.env.NEXT_PUBLIC_PROFILE_NAME || process.env.PUBLIC_PROFILE_NAME,
    NEXT_PUBLIC_CONTACT_EMAIL:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_PHONE:
      process.env.NEXT_PUBLIC_PHONE || process.env.PUBLIC_PHONE,
    NEXT_PUBLIC_LOCATION:
      process.env.NEXT_PUBLIC_LOCATION || process.env.PUBLIC_LOCATION,
    NEXT_PUBLIC_GITHUB_PROFILE_URL:
      process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL || process.env.PUBLIC_GITHUB_PROFILE_URL,
    NEXT_PUBLIC_LINKEDIN_URL:
      process.env.NEXT_PUBLIC_LINKEDIN_URL || process.env.PUBLIC_LINKEDIN_URL,
    NEXT_PUBLIC_INSTAGRAM_URL:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || process.env.PUBLIC_INSTAGRAM_URL,
    NEXT_PUBLIC_MAPS_URL:
      process.env.NEXT_PUBLIC_MAPS_URL || process.env.PUBLIC_MAPS_URL,
    NEXT_PUBLIC_RESUME_URL:
      process.env.NEXT_PUBLIC_RESUME_URL || process.env.PUBLIC_RESUME_URL,
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

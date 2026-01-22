/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '54.80.119.79',
        port: '8000',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;

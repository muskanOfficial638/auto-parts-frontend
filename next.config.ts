/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.autopartsxchange.co.za',
      
      },
    ],
  },
};

module.exports = nextConfig;

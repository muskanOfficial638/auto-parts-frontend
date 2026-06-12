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
    outputFileTracingIncludes: {
    "/*": [
      "./node_modules/@sparticuz/chromium/**/*",
      "./node_modules/puppeteer-core/**/*",
    ],
  },
};

module.exports = nextConfig;
